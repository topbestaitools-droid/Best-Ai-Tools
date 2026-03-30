import Link from "next/link";
import { tools } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">Tools</h2>
        <p className="text-muted">Browse AI tools. Next: Prisma integration.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-medium">{t.name}</div>
                <div className="mt-1 text-sm text-muted">{t.tagline}</div>
              </div>
              <Pill>{t.pricing}</Pill>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.tags.slice(0, 4).map((tag) => (
                <Pill key={tag} variant="soft">{tag}</Pill>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
