/**
 * Import script: Product Hunt (Template)
 *
 * This is a template / scaffold for future Product Hunt scraping.
 * It demonstrates the expected interface and data flow for importing
 * tools from the Product Hunt API (v2 GraphQL).
 *
 * Requires:
 *   PRODUCT_HUNT_API_KEY  - Developer token from https://api.producthunt.com/v2/oauth/token
 *   DATABASE_URL          - PostgreSQL connection string
 *
 * Usage (once configured):
 *   npm run import:product-hunt
 *
 * Docs: https://api.producthunt.com/v2/docs
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
const PH_API_KEY = process.env.PRODUCT_HUNT_API_KEY;
const SOURCE = "product-hunt";
const BATCH_SIZE = 50;

const PH_API_URL = "https://api.producthunt.com/v2/api/graphql";

// GraphQL query to fetch AI-tagged posts from Product Hunt
const QUERY = `
  query($after: String, $topic: String!) {
    posts(first: 50, after: $after, topic: $topic, order: VOTES) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          tagline
          description
          website
          votesCount
          reviewsRating
          thumbnail {
            url
          }
          topics {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

interface PHPost {
  id: string;
  name: string;
  tagline: string;
  description: string | null;
  website: string;
  votesCount: number;
  reviewsRating: number;
  thumbnail: { url: string } | null;
  topics: { edges: { node: { name: string } }[] };
}

/**
 * Fetch a page of Product Hunt posts for a given topic.
 * NOTE: This function requires a valid PH_API_KEY to work.
 */
async function fetchPage(
  topic: string,
  after?: string
): Promise<{ posts: PHPost[]; hasNextPage: boolean; endCursor: string | null }> {
  if (!PH_API_KEY) {
    throw new Error(
      "PRODUCT_HUNT_API_KEY environment variable is not set. " +
        "Get your token at https://api.producthunt.com/v2/oauth/token"
    );
  }

  const response = await fetch(PH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PH_API_KEY}`,
    },
    body: JSON.stringify({
      query: QUERY,
      variables: { topic, after: after ?? null },
    }),
  });

  if (!response.ok) {
    throw new Error(`Product Hunt API error ${response.status}: ${response.statusText}`);
  }

  const json = (await response.json()) as {
    data?: {
      posts: {
        pageInfo: { hasNextPage: boolean; endCursor: string };
        edges: { node: PHPost }[];
      };
    };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(`GraphQL errors: ${json.errors.map((e) => e.message).join(", ")}`);
  }

  const data = json.data!.posts;
  return {
    posts: data.edges.map((e) => e.node),
    hasNextPage: data.pageInfo.hasNextPage,
    endCursor: data.pageInfo.endCursor ?? null,
  };
}

/**
 * Fetch all posts for a topic, paginating through all pages.
 */
async function fetchAllPosts(topic: string, maxPages = 20): Promise<PHPost[]> {
  const allPosts: PHPost[] = [];
  let cursor: string | undefined;
  let page = 0;

  while (page < maxPages) {
    console.log(`   Page ${page + 1} (cursor: ${cursor ?? "start"})...`);
    const { posts, hasNextPage, endCursor } = await fetchPage(topic, cursor);
    allPosts.push(...posts);
    page++;

    if (!hasNextPage || !endCursor) break;
    cursor = endCursor;

    // Respectful rate limiting
    await new Promise((r) => setTimeout(r, 500));
  }

  return allPosts;
}

/**
 * Convert a Product Hunt post into the shape needed for Prisma upsert.
 */
function buildToolRecord(post: PHPost) {
  const topics = post.topics.edges.map((e) => e.node.name);
  const category = normalizeCategory(topics[0] ?? "AI");
  const tags = normalizeTags(topics);

  return {
    slug: generateSlug(post.name),
    name: post.name.trim(),
    tagline: truncate(post.tagline || post.name, 280),
    description: post.description ?? "",
    website: post.website,
    pricing: "Freemium",
    tags,
    category,
    logoUrl: post.thumbnail?.url ?? null,
    rating: post.reviewsRating > 0 ? post.reviewsRating : null,
    source: SOURCE,
    importedAt: new Date(),
  };
}

async function main() {
  console.log("🚀 Starting Product Hunt import...");
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no DB writes)" : "LIVE"}`);
  console.log(`   API Key: ${PH_API_KEY ? "✓ set" : "✗ NOT SET"}\n`);

  if (!PH_API_KEY) {
    console.error(
      "❌ PRODUCT_HUNT_API_KEY is required. Set it in your .env file.\n" +
        "   See: https://api.producthunt.com/v2/oauth/token"
    );
    process.exit(1);
  }

  const topics = ["artificial-intelligence", "machine-learning", "developer-tools"];
  const allPosts: PHPost[] = [];

  for (const topic of topics) {
    console.log(`📥 Fetching topic: ${topic}...`);
    try {
      const posts = await fetchAllPosts(topic, 10);
      console.log(`   Found ${posts.length} posts`);
      allPosts.push(...posts);
    } catch (error) {
      console.error(`   ✗ Error: ${(error as Error).message}`);
    }
  }

  console.log(`\n📊 Total posts fetched: ${allPosts.length}`);

  // Deduplicate by product ID
  const seenIds = new Set<string>();
  const unique = allPosts.filter((p) => {
    if (seenIds.has(p.id)) return false;
    seenIds.add(p.id);
    return true;
  });

  const records = unique.map(buildToolRecord);
  const { valid, invalid, stats } = validateBatch(records);

  console.log(`   Validation: ${stats.valid} valid, ${stats.invalid} invalid`);

  if (DRY_RUN) {
    console.log("\n✅ Dry run complete. Sample records:");
    valid.slice(0, 3).forEach((t) => {
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

  console.log("\n🎉 Product Hunt import complete!");
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
