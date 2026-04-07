/**
 * Import script: Awesome AI Tools
 *
 * Fetches tool data from the sindresorhus/awesome list format on GitHub,
 * parses the markdown, and upserts records into the database.
 *
 * Usage:
 *   npm run import:awesome
 *
 * Environment variables:
 *   DATABASE_URL  - PostgreSQL connection string (required)
 *   GITHUB_TOKEN  - GitHub personal access token (optional, raises rate limit)
 *   DRY_RUN       - Set to "true" to skip database writes (default: false)
 */

import { PrismaClient } from "@prisma/client";
import {
  generateSlug,
  normalizeCategory,
  getClearbitLogoUrl,
  normalizePricing,
  normalizeTags,
  truncate,
} from "./utils/tool-parser";
import { validateBatch } from "./utils/validate-tool";

const prisma = new PrismaClient();
const DRY_RUN = process.env.DRY_RUN === "true";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const SOURCE = "awesome-ai-tools";
const BATCH_SIZE = 50;

// GitHub repos to fetch tool data from (awesome-list format)
const SOURCES = [
  {
    repo: "e2b-dev/awesome-ai-agents",
    file: "README.md",
    defaultCategory: "AI Agents",
  },
  {
    repo: "steven2358/awesome-generative-ai",
    file: "README.md",
    defaultCategory: "Generative AI",
  },
  {
    repo: "ai-collection/ai-collection",
    file: "README.md",
    defaultCategory: "AI",
  },
];

interface RawTool {
  name: string;
  website: string;
  description: string;
  category: string;
}

/**
 * Fetch a raw file from GitHub via the REST API.
 */
async function fetchGitHubFile(repo: string, filePath: string): Promise<string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "best-ai-tools-importer/1.0",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;
  }

  const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status} for ${repo}/${filePath}: ${response.statusText}`);
  }

  const data = (await response.json()) as { content?: string; encoding?: string };
  if (data.encoding === "base64" && data.content) {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }

  throw new Error(`Unexpected response format from GitHub for ${repo}/${filePath}`);
}

/**
 * Parse an awesome-list style markdown file and extract tool entries.
 *
 * Looks for patterns like:
 *   - [Tool Name](https://example.com) - Description of the tool.
 *   * [Tool Name](https://example.com) - Description.
 */
function parseAwesomeMarkdown(markdown: string, defaultCategory: string): RawTool[] {
  const tools: RawTool[] = [];
  const lines = markdown.split("\n");

  let currentCategory = defaultCategory;

  // Match heading lines (## Category Name or ### Sub Category)
  const headingRegex = /^#{1,4}\s+(.+)/;
  // Match list item lines with a link: - [Name](url) - description
  const listItemRegex = /^[\s*-]+\[([^\]]+)\]\((https?:\/\/[^\)]+)\)\s*[-–—]?\s*(.*)/;

  for (const line of lines) {
    const headingMatch = line.match(headingRegex);
    if (headingMatch) {
      currentCategory = headingMatch[1].trim().replace(/\s*:$/, "");
      continue;
    }

    const itemMatch = line.match(listItemRegex);
    if (itemMatch) {
      const [, name, website, description] = itemMatch;
      if (name && website) {
        tools.push({
          name: name.trim(),
          website: website.trim(),
          description: description ? description.trim() : "",
          category: currentCategory,
        });
      }
    }
  }

  return tools;
}

/**
 * Convert a RawTool into the shape needed for Prisma upsert.
 */
function buildToolRecord(raw: RawTool) {
  const slug = generateSlug(raw.name);
  const category = normalizeCategory(raw.category);
  const tagline = truncate(raw.description || raw.name, 280);
  const description = raw.description || "";
  const tags = normalizeTags([
    category.toLowerCase(),
    ...raw.category
      .split(/[\s,/]+/)
      .map((w) => w.toLowerCase())
      .filter((w) => w.length > 2),
  ]);

  return {
    slug,
    name: raw.name.trim(),
    tagline,
    description,
    website: raw.website,
    pricing: normalizePricing("Free"),
    tags,
    category,
    logoUrl: getClearbitLogoUrl(raw.website),
    source: SOURCE,
    importedAt: new Date(),
  };
}

/**
 * Upsert a batch of tools into the database.
 * Checks for existing records by slug or website to avoid duplicates.
 */
async function upsertBatch(
  tools: ReturnType<typeof buildToolRecord>[]
): Promise<{ inserted: number; updated: number; skipped: number }> {
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const tool of tools) {
    try {
      // Check if a tool with the same website already exists (different slug)
      const existingByWebsite = await prisma.tool.findFirst({
        where: { website: tool.website, slug: { not: tool.slug } },
        select: { id: true, slug: true },
      });

      if (existingByWebsite) {
        skipped++;
        continue;
      }

      const result = await prisma.tool.upsert({
        where: { slug: tool.slug },
        update: {
          name: tool.name,
          tagline: tool.tagline,
          description: tool.description,
          website: tool.website,
          pricing: tool.pricing,
          tags: tool.tags,
          category: tool.category,
          logoUrl: tool.logoUrl,
          source: tool.source,
          importedAt: tool.importedAt,
        },
        create: tool,
      });

      // Detect if it was created or updated by checking createdAt ≈ importedAt
      const wasCreated =
        Math.abs(result.createdAt.getTime() - result.updatedAt.getTime()) < 1000;
      if (wasCreated) {
        inserted++;
      } else {
        updated++;
      }
    } catch (error) {
      console.error(`  ✗ Failed to upsert '${tool.name}':`, (error as Error).message);
      skipped++;
    }
  }

  return { inserted, updated, skipped };
}

async function main() {
  console.log("🚀 Starting Awesome AI Tools import...");
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no DB writes)" : "LIVE"}`);
  console.log(`   Sources: ${SOURCES.length} repositories\n`);

  const allRawTools: RawTool[] = [];

  // Fetch and parse all sources
  for (const source of SOURCES) {
    console.log(`📥 Fetching ${source.repo}/${source.file}...`);
    try {
      const markdown = await fetchGitHubFile(source.repo, source.file);
      const tools = parseAwesomeMarkdown(markdown, source.defaultCategory);
      console.log(`   Parsed ${tools.length} raw entries`);
      allRawTools.push(...tools);
    } catch (error) {
      console.error(`   ✗ Error: ${(error as Error).message}`);
    }
  }

  console.log(`\n📊 Total raw entries: ${allRawTools.length}`);

  // Build normalized records
  const records = allRawTools.map(buildToolRecord);

  // Deduplicate by slug within this batch (keep first occurrence)
  const seenSlugs = new Set<string>();
  const deduped = records.filter((r) => {
    if (seenSlugs.has(r.slug)) return false;
    seenSlugs.add(r.slug);
    return true;
  });

  console.log(`   After slug dedup: ${deduped.length} unique tools`);

  // Validate
  const { valid, invalid, stats } = validateBatch(deduped);
  console.log(`   Validation: ${stats.valid} valid, ${stats.invalid} invalid`);

  if (invalid.length > 0) {
    console.log("\n⚠️  Skipped invalid tools:");
    invalid.slice(0, 10).forEach(({ tool, errors }) => {
      console.log(`   - ${tool.name || "(no name)"}: ${errors.join("; ")}`);
    });
    if (invalid.length > 10) {
      console.log(`   ... and ${invalid.length - 10} more`);
    }
  }

  if (DRY_RUN) {
    console.log("\n✅ Dry run complete. Sample records:");
    valid.slice(0, 3).forEach((t) => {
      console.log(`   • ${t.name} (${t.slug}) — ${t.category}`);
    });
    return;
  }

  // Insert in batches
  console.log(`\n💾 Inserting ${valid.length} tools in batches of ${BATCH_SIZE}...`);
  let totalInserted = 0;
  let totalUpdated = 0;
  let totalSkipped = 0;

  for (let i = 0; i < valid.length; i += BATCH_SIZE) {
    const batch = valid.slice(i, i + BATCH_SIZE) as ReturnType<typeof buildToolRecord>[];
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(valid.length / BATCH_SIZE);

    process.stdout.write(`   Batch ${batchNum}/${totalBatches}...`);
    const result = await upsertBatch(batch);
    totalInserted += result.inserted;
    totalUpdated += result.updated;
    totalSkipped += result.skipped;
    console.log(
      ` ✓ inserted: ${result.inserted}, updated: ${result.updated}, skipped: ${result.skipped}`
    );
  }

  console.log("\n🎉 Import complete!");
  console.log(`   Inserted : ${totalInserted}`);
  console.log(`   Updated  : ${totalUpdated}`);
  console.log(`   Skipped  : ${totalSkipped}`);
  console.log(`   Total DB : ${totalInserted + totalUpdated}`);
}

main()
  .catch((error) => {
    console.error("❌ Import failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
