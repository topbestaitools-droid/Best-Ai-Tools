// lib/seo-generator.ts

/**
 * Automatically generates SEO metadata for AI tool pages.
 */

export interface ToolSEOData {
  name: string;
  tagline: string;
  description?: string;
  category: string;
  pricing: string;
  slug: string;
}

export function generateToolMetadata(tool: ToolSEOData) {
  const title = `${tool.name} — AI Tool Review & Pricing | AIAdvisor.tools`;
  const description =
    tool.description ||
    `${tool.name}: ${tool.tagline} Pricing: ${tool.pricing}. Browse our directory of ${tool.category} AI tools.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article" as const,
    },
    twitter: {
      card: "summary" as const,
      title,
      description,
    },
  };
}

export function generateCategoryMetadata(category: string, count: number) {
  return {
    title: `Best ${category} AI Tools (${count} tools) | AIAdvisor.tools`,
    description: `Discover the best ${category} AI tools. Compare features, pricing, and reviews.`,
  };
}
