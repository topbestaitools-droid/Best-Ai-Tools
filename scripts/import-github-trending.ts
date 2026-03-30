/**
 * Import script: GitHub Trending AI Repositories (Template)
 *
 * This is a template / scaffold for future GitHub Trending scraping.
 * It fetches trending AI/ML repositories from GitHub and imports them
 * as tools in the database.
 *
 * Uses the GitHub Search API (no special token required for basic use,
 * but GITHUB_TOKEN raises the rate limit from 10/min to 30/min).
 *
 * Usage (once configured):
 *   npm run import:github-trending
 *
 * Environment variables:
 *   GITHUB_TOKEN  - GitHub personal access token (optional but recommended)
 *   DATABASE_URL  - PostgreSQL connection string (required)
 *   DRY_RUN       - Set to "true" to skip database writes (default: false)
 */

import { PrismaClient } from "@prisma/client";
import {
  generateSlug,
  normalizeCategory,
  normalizeTags,
  truncate,
} from "./utils/tool-parser";
import { validateBatch } from "./utils/validate-tool";

const prisma = new PrismaClient();
const DRY_RUN = process.env.DRY_RUN === "true";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const SOURCE = "github-trending";
const BATCH_SIZE = 50;

// GitHub Search API queries to find trending AI tools
const SEARCH_QUERIES = [
  { q: "topic:ai-tools stars:>100 pushed:>2024-01-01", category: "AI" },
  { q: "topic:llm stars:>500 pushed:>2024-01-01", category: "AI" },
  { q: "topic:generative-ai stars:>200 pushed:>2024-01-01", category: "Generative AI" },
  { q: "topic:machine-learning stars:>1000 language:python pushed:>2024-01-01", category: "Machine Learning" },
  { q: "ai assistant tool stars:>500 pushed:>2024-06-01", category: "AI" },
];

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  topics: string[];
  language: string | null;
  license: { spdx_id: string } | null;
  updated_at: string;
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubRepo[];
}

/**
 * Fetch a page of GitHub repositories matching a search query.
 */
async function searchRepos(
  query: string,
  page = 1,
  perPage = 30
): Promise<{ repos: GitHubRepo[]; totalCount: number }> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "best-ai-tools-importer/1.0",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  }

  const url =
    `https://api.github.com/search/repositories` +
    `?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}&page=${page}`;

  const response = await fetch(url, { headers });

  if (response.status === 403) {
    const resetAt = response.headers.get("X-RateLimit-Reset");
    const resetTime = resetAt ? new Date(parseInt(resetAt) * 1000).toISOString() : "unknown";
    throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}. Set GITHUB_TOKEN to increase limit.`);
  }

  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as GitHubSearchResponse;
  return { repos: data.items, totalCount: data.total_count };
}

/**
 * Determine the website URL for a repo (prefer homepage over GitHub URL).
 */
function resolveWebsite(repo: GitHubRepo): string {
  if (repo.homepage && repo.homepage.startsWith("http")) {
    return repo.homepage;
  }
  return repo.html_url;
}

/**
 * Map GitHub license to pricing string.
 */
function resolvePricing(repo: GitHubRepo): string {
  const openSourceLicenses = ["MIT", "Apache-2.0", "GPL-2.0", "GPL-3.0", "BSD-2-Clause", "BSD-3-Clause", "ISC", "MPL-2.0"];
  if (repo.license && openSourceLicenses.includes(repo.license.spdx_id)) {
    return "Free";
  }
  return "Free";
}

/**
 * Convert a GitHub repository into the shape needed for Prisma upsert.
 */
function buildToolRecord(repo: GitHubRepo, defaultCategory: string) {
  const website = resolveWebsite(repo);
  const category = normalizeCategory(
    repo.topics.find((t) => t.length > 2) ?? defaultCategory
  );
  const tags = normalizeTags([
    ...repo.topics.slice(0, 6),
    repo.language?.toLowerCase() ?? "",
  ].filter(Boolean));

  const description = repo.description ?? "";
  const name = repo.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    slug: generateSlug(name),
    name,
    tagline: truncate(description || name, 280),
    description,
    website,
    pricing: resolvePricing(repo),
    tags,
    category,
    logoUrl: null,
    rating: null,
    source: SOURCE,
    importedAt: new Date(),
  };
}

async function main() {
  console.log("🚀 Starting GitHub Trending AI import...");
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no DB writes)" : "LIVE"}`);
  console.log(`   Auth: ${GITHUB_TOKEN ? "✓ token set (higher rate limit)" : "✗ no token (10 req/min)"}\n`);

  const allRepos: { repo: GitHubRepo; category: string }[] = [];

  for (const { q, category } of SEARCH_QUERIES) {
    console.log(`📥 Query: ${q}`);
    try {
      const { repos, totalCount } = await searchRepos(q, 1, 30);
      console.log(`   Found ${repos.length} / ${totalCount} total`);
      allRepos.push(...repos.map((repo) => ({ repo, category })));
    } catch (error) {
      console.error(`   ✗ Error: ${(error as Error).message}`);
    }

    // Respectful rate limiting between queries
    await new Promise((r) => setTimeout(r, 1200));
  }

  console.log(`\n📊 Total repos fetched: ${allRepos.length}`);

  // Deduplicate by GitHub repo ID
  const seenIds = new Set<number>();
  const unique = allRepos.filter(({ repo }) => {
    if (seenIds.has(repo.id)) return false;
    seenIds.add(repo.id);
    return true;
  });

  const records = unique.map(({ repo, category }) => buildToolRecord(repo, category));

  // Deduplicate by slug
  const seenSlugs = new Set<string>();
  const deduped = records.filter((r) => {
    if (seenSlugs.has(r.slug)) return false;
    seenSlugs.add(r.slug);
    return true;
  });

  const { valid, invalid, stats } = validateBatch(deduped);
  console.log(`   Validation: ${stats.valid} valid, ${stats.invalid} invalid`);

  if (DRY_RUN) {
    console.log("\n✅ Dry run complete. Sample records:");
    valid.slice(0, 5).forEach((t) => {
      console.log(`   • ${t.name} (${t.slug}) — ${t.category}`);
    });
    return;
  }

  // Upsert in batches
  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < valid.length; i += BATCH_SIZE) {
    const batch = valid.slice(i, i + BATCH_SIZE) as ReturnType<typeof buildToolRecord>[];
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(valid.length / BATCH_SIZE);

    process.stdout.write(`   Batch ${batchNum}/${totalBatches}...`);

    for (const tool of batch) {
      try {
        const existing = await prisma.tool.findFirst({
          where: { website: tool.website, slug: { not: tool.slug } },
          select: { id: true },
        });
        if (existing) {
          skipped++;
          continue;
        }

        const result = await prisma.tool.upsert({
          where: { slug: tool.slug },
          update: { ...tool },
          create: { ...tool },
        });

        const wasCreated = Math.abs(result.createdAt.getTime() - result.updatedAt.getTime()) < 1000;
        wasCreated ? inserted++ : updated++;
      } catch (error) {
        console.error(`\n  ✗ Failed '${tool.name}':`, (error as Error).message);
        skipped++;
      }
    }

    console.log(` ✓`);
  }

  console.log("\n🎉 GitHub Trending import complete!");
  console.log(`   Inserted : ${inserted}`);
  console.log(`   Updated  : ${updated}`);
  console.log(`   Skipped  : ${skipped}`);

  invalid.slice(0, 5).forEach(({ tool, errors }) => {
    console.log(`   ⚠ Skipped '${tool.name}': ${errors.join("; ")}`);
  });
}

main()
  .catch((error) => {
    console.error("❌ Import failed:", error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
