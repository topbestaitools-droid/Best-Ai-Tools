import { notFound } from "next/navigation";
import { tools } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return notFound();

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-panel p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{tool.name}</h1>
            <p className="mt-2 text-muted">{tool.tagline}</p>
          </div>
          <Pill>{tool.pricing}</Pill>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <Pill key={tag} variant="soft">{tag}</Pill>
          ))}
        </div>

        <div className="mt-6">
          <a href={tool.website} target="_blank" rel="noreferrer">
            <Button>Visit website</Button>
          </a>
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-2 text-muted">
          This is placeholder content. Next: reviews, alternatives, AI matcher.
        </p>
      </section>
    </div>
  );
}
