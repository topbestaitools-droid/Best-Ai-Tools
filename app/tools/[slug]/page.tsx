import Link from "next/link";
import { tools } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/tools" className="text-accent hover:underline text-sm">← Back to Tools</Link>

      <div className="rounded-2xl border border-border bg-panel p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{tool.name}</h1>
            <p className="mt-2 text-muted">{tool.tagline}</p>
          </div>
          <Pill>{tool.pricing}</Pill>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <Pill key={tag} variant="soft">{tag}</Pill>
          ))}
        </div>

        <div className="mt-6">
          <a href={tool.website} target="_blank" rel="noopener noreferrer">
            <Button>Visit {tool.name} →</Button>
          </a>
        </div>
      </div>
    </div>
  );
}