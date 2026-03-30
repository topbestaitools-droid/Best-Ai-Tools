/**
 * Deduplicate Tools Script
 *
 * Scans the database for duplicate tools by website URL and name,
 * keeping the most recently updated record and removing the rest.
 *
 * Usage:
 *   npm run import:dedupe
 *
 * Environment variables:
 *   DATABASE_URL  - PostgreSQL connection string (required)
 *   DRY_RUN       - Set to "true" to report without deleting (default: false)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const DRY_RUN = process.env.DRY_RUN === "true";

/**
 * Normalize a website URL for comparison (strip trailing slash, lowercase host).
 */
function normalizeWebsite(url: string): string {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return `${parsed.protocol}//${parsed.hostname.toLowerCase()}${parsed.pathname.replace(/\/$/, "")}`;
  } catch {
    return url.toLowerCase().trim();
  }
}

/**
 * Normalize a tool name for comparison (lowercase, trim whitespace).
 */
function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, " ");
}

async function main() {
  console.log("🧹 Starting deduplication...");
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no deletes)" : "LIVE"}\n`);

  // Fetch all tools
  const tools = await prisma.tool.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      website: true,
      updatedAt: true,
      source: true,
      _count: { select: { reviews: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  console.log(`📊 Total tools in database: ${tools.length}`);

  // Group by normalized website
  const byWebsite = new Map<string, typeof tools>();
  for (const tool of tools) {
    const key = normalizeWebsite(tool.website);
    const group = byWebsite.get(key) ?? [];
    group.push(tool);
    byWebsite.set(key, group);
  }

  // Group by normalized name (for same-name detection)
  const byName = new Map<string, typeof tools>();
  for (const tool of tools) {
    const key = normalizeName(tool.name);
    const group = byName.get(key) ?? [];
    group.push(tool);
    byName.set(key, group);
  }

  const toDelete = new Set<string>();

  // Find website duplicates
  for (const [website, group] of byWebsite.entries()) {
    if (group.length <= 1) continue;

    // Keep the record with the most reviews; break ties by most recent updatedAt
    const sorted = [...group].sort((a, b) => {
      const reviewDiff = b._count.reviews - a._count.reviews;
      if (reviewDiff !== 0) return reviewDiff;
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

    const [keep, ...duplicates] = sorted;
    console.log(
      `   Website duplicate: ${website}\n     Keep: ${keep.slug} (${keep._count.reviews} reviews)`
    );
    duplicates.forEach((d) => {
      console.log(`     Delete: ${d.slug}`);
      toDelete.add(d.id);
    });
  }

  // Find name duplicates (that are not already marked for deletion)
  for (const [name, group] of byName.entries()) {
    const remaining = group.filter((t) => !toDelete.has(t.id));
    if (remaining.length <= 1) continue;

    const sorted = [...remaining].sort((a, b) => {
      const reviewDiff = b._count.reviews - a._count.reviews;
      if (reviewDiff !== 0) return reviewDiff;
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

    const [keep, ...duplicates] = sorted;
    console.log(
      `   Name duplicate: "${name}"\n     Keep: ${keep.slug} (${keep._count.reviews} reviews)`
    );
    duplicates.forEach((d) => {
      console.log(`     Delete: ${d.slug}`);
      toDelete.add(d.id);
    });
  }

  console.log(`\n📋 Duplicates found: ${toDelete.size}`);

  if (toDelete.size === 0) {
    console.log("✅ No duplicates found. Database is clean!");
    return;
  }

  if (DRY_RUN) {
    console.log("✅ Dry run complete. No records deleted.");
    return;
  }

  // Delete duplicates (reviews cascade automatically via FK constraint)
  const deleteResult = await prisma.tool.deleteMany({
    where: { id: { in: Array.from(toDelete) } },
  });

  console.log(`\n🎉 Deduplication complete!`);
  console.log(`   Deleted: ${deleteResult.count} duplicate tools`);
  console.log(`   Remaining: ${tools.length - deleteResult.count} tools`);
}

main()
  .catch((error) => {
    console.error("❌ Deduplication failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
