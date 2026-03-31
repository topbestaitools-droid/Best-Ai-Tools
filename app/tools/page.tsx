import Link from "next/link";
import { tools, CATEGORIES, type Tool } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold group-hover:text-accent transition">{tool.name}</h3>
        <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
          {tool.pricing}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted line-clamp-2">{tool.tagline}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tool.tags.slice(0, 3).map((tag) => (
          <Pill key={tag} variant="soft">{tag}</Pill>
        ))}
      </div>
      {tool.featured && (
        <div className="mt-3 text-xs text-accent">★ Featured</div>
      )}
    </Link>
  );
}

export default function ToolsPage({
  searchParams,
}: {
  searchParams?: { category?: string; pricing?: string; q?: string };
}) {
  const category = searchParams?.category || "";
  const pricing = searchParams?.pricing || "";
  const query = (searchParams?.q || "").toLowerCase();

  const filtered = tools.filter((t) => {
    if (category && t.category !== category) return false;
    if (pricing && t.pricing !== pricing) return false;
    if (query) {
      const haystack = [t.name, t.tagline, t.category, ...t.tags].join(" ").toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">AI Tools Directory</h1>
        <p className="mt-1 text-muted">
          Browse {tools.length}+ AI tools across {CATEGORIES.length} categories
        </p>
      </header>

      {/* Filters */}
      <form className="flex flex-wrap gap-3">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search tools…"
          className="rounded-xl border border-border bg-panel px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <select
          name="category"
          defaultValue={category}
          className="rounded-xl border border-border bg-panel px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          name="pricing"
          defaultValue={pricing}
          className="rounded-xl border border-border bg-panel px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="">Any Pricing</option>
          <option value="Free">Free</option>
          <option value="Freemium">Freemium</option>
          <option value="Paid">Paid</option>
        </select>
        <button
          type="submit"
          className="rounded-xl border border-border bg-primary/20 px-4 py-2 text-sm hover:bg-primary/30 transition"
        >
          Filter
        </button>
        {(category || pricing || query) && (
          <Link
            href="/tools"
            className="rounded-xl border border-border px-4 py-2 text-sm text-muted hover:border-border/80 transition"
          >
            Clear
          </Link>
        )}
      </form>

      <p className="text-sm text-muted">{filtered.length} tools found</p>

      {/* Tool Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-border bg-panel p-10 text-center">
          <p className="text-muted">No tools match your filters.</p>
          <Link href="/tools" className="mt-3 inline-block text-accent hover:underline text-sm">
            Clear filters
          </Link>
        </div>
      )}

      {/* Submit CTA */}
      <section className="rounded-2xl border border-border bg-panel p-6 text-center">
        <p className="font-medium">Know an AI tool that&apos;s not listed?</p>
        <p className="mt-1 text-sm text-muted">Help the community by submitting it.</p>
        <Link
          href="/submit"
          className="mt-4 inline-flex items-center rounded-xl border border-accent/40 bg-accent/15 px-5 py-2 text-sm hover:bg-accent/25 transition"
        >
          Submit a Tool →
        </Link>
      </section>
    </div>
  );
}
