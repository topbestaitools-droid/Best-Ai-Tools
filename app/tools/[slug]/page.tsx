import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tools } from "@/lib/mock-tools";
import { ToolHero } from "@/components/tool-hero";
import { Button } from "@/components/ui/button";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return {};

  const ogImage =
    `/api/og/tool?` +
    new URLSearchParams({
      name: tool.name,
      tagline: tool.tagline,
      theme: tool.heroTheme,
      pricing: tool.pricing,
      logoUrl: tool.logoUrl
    }).toString();

  return {
    title: `${tool.name} — AIAdvisor.tools`,
    description: tool.description || tool.tagline,
    openGraph: {
      title: tool.name,
      description: tool.tagline,
      images: [{ url: ogImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.tagline,
      images: [ogImage]
    }
  };
}

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default function ToolDetailPage({ params }: Props) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return notFound();

  return (
    <div className="space-y-6">
      {/* Hero section with dynamic OG image */}
      <ToolHero tool={tool} />

      {/* Overview section */}
      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-2 text-muted">
          {tool.description ||
            "This is placeholder content. Next: reviews, alternatives, AI matcher."}
        </p>
      </section>

      {/* Visit website CTA */}
      <div className="flex gap-3">
        <a href={tool.website} target="_blank" rel="noreferrer">
          <Button>Visit website ↗</Button>
        </a>
      </div>
    </div>
  );
}
