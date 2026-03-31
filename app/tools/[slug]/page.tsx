import Link from "next/link";
import { getToolBySlug, tools } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — AIAdvisor.tools`,
    description: tool.tagline,
  };
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const affiliateUrl = tool.affiliateUrl || tool.website;
  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link href="/tools" className="text-sm text-accent hover:underline">
          ← All Tools
        </Link>
      </div>

      {/* Hero */}
      <div className="rounded-2xl border border-border bg-panel p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold">{tool.name}</h1>
            <p className="mt-2 text-muted">{tool.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-right shrink-0">
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm text-muted">
              {tool.pricing}
            </span>
            {tool.featured && (
              <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs text-accent">
                ★ Featured
              </span>
            )}
          </div>
        </div>

        {tool.description && (
          <p className="mt-4 text-sm text-muted leading-relaxed">{tool.description}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <Pill key={tag} variant="soft">{tag}</Pill>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center rounded-xl border border-primary/40 bg-primary/20 px-5 py-2.5 text-sm font-medium hover:bg-primary/30 transition"
          >
            Visit {tool.name} →
          </a>
          <Link
            href={`/tools?category=${encodeURIComponent(tool.category)}`}
            className="inline-flex items-center rounded-xl border border-border bg-panel px-5 py-2.5 text-sm text-muted hover:border-border/80 transition"
          >
            More {tool.category} tools
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-border bg-panel p-6 space-y-4">
        <h2 className="font-semibold">Details</h2>
        <div className="grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <span className="text-muted">Category</span>
            <p className="mt-0.5 font-medium">{tool.category}</p>
          </div>
          <div>
            <span className="text-muted">Pricing</span>
            <p className="mt-0.5 font-medium">{tool.pricing}</p>
          </div>
          <div>
            <span className="text-muted">Website</span>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 block font-medium text-accent hover:underline truncate"
            >
              {tool.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>
      </div>

      {/* Affiliate disclaimer */}
      {tool.affiliateUrl && (
        <p className="text-xs text-muted">
          * This page contains affiliate links. We may earn a commission if you sign up through our link, at no extra cost to you.
        </p>
      )}

      {/* Related tools */}
      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="rounded-2xl border border-border bg-panel p-4 hover:border-accent/60 transition"
              >
                <div className="font-medium">{t.name}</div>
                <p className="mt-1 text-sm text-muted line-clamp-2">{t.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Submit CTA */}
      <section className="rounded-2xl border border-border bg-panel p-6 text-center">
        <p className="text-muted text-sm">
          Want to add your AI tool to this directory?
        </p>
        <Link
          href="/submit"
          className="mt-3 inline-flex items-center rounded-xl border border-accent/40 bg-accent/15 px-5 py-2 text-sm hover:bg-accent/25 transition"
        >
          Submit a Tool →
        </Link>
      </section>
    </div>
  );
}
