import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFeaturedTools, CATEGORIES } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";

export default function HomePage() {
  const featured = getFeaturedTools().slice(0, 6);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="rounded-2xl border border-border bg-panel px-8 py-14 text-center">
        <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs text-accent mb-4">
          🚀 20,000+ AI tools · Updated daily
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Find the right AI tool{" "}
          <span className="text-accent">for your workflow</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted text-lg">
          Search, compare, and discover the best AI tools across writing,
          design, coding, marketing, and 20+ more categories.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/tools">
            <Button>Browse All Tools</Button>
          </Link>
          <Link href="/search">
            <Button variant="secondary">🔍 Semantic Search</Button>
          </Link>
          <Link href="/submit">
            <Button variant="ghost">Submit a Tool</Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { value: "20,000+", label: "AI Tools Listed" },
          { value: "20+", label: "Categories" },
          { value: "Free", label: "Always Free to Browse" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-panel p-5 text-center"
          >
            <div className="text-3xl font-semibold text-accent">{stat.value}</div>
            <div className="mt-1 text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Tools */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">Featured Tools</h2>
          <Link href="/tools" className="text-sm text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold group-hover:text-accent transition">
                  {tool.name}
                </h3>
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
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="mb-5 text-2xl font-semibold">Browse by Category</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat}
              href={`/tools?category=${encodeURIComponent(cat)}`}
              className="rounded-xl border border-border bg-panel px-4 py-3 text-sm hover:border-accent/60 hover:text-accent transition"
            >
              {cat}
            </Link>
          ))}
        </div>
        <div className="mt-3 text-center">
          <Link href="/tools" className="text-sm text-muted hover:text-accent transition">
            See all {CATEGORIES.length} categories →
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-panel p-5">
          <div className="text-2xl mb-2">🔍</div>
          <div className="text-lg font-medium">Semantic Search</div>
          <div className="mt-1 text-sm text-muted">
            Find tools by intent, not just keywords. Tell us what you need to
            do, and we&apos;ll find the right tools.
          </div>
          <Link href="/search" className="mt-3 inline-block text-sm text-accent hover:underline">
            Try search →
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-5">
          <div className="text-2xl mb-2">🤖</div>
          <div className="text-lg font-medium">AI Matcher</div>
          <div className="mt-1 text-sm text-muted">
            Answer a few questions and get personalized tool recommendations
            tailored to your workflow.
          </div>
          <Link href="/matcher" className="mt-3 inline-block text-sm text-accent hover:underline">
            Find my tools →
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-5">
          <div className="text-2xl mb-2">👥</div>
          <div className="text-lg font-medium">Community</div>
          <div className="mt-1 text-sm text-muted">
            Read reviews, browse curated collections, and join discussions with
            other AI enthusiasts.
          </div>
          <Link href="/community" className="mt-3 inline-block text-sm text-accent hover:underline">
            Join community →
          </Link>
        </div>
      </section>

      {/* Submit CTA */}
      <section className="rounded-2xl border border-border bg-panel p-8 text-center">
        <h2 className="text-2xl font-semibold">Know an AI tool we&apos;re missing?</h2>
        <p className="mt-2 text-muted max-w-lg mx-auto">
          Help the community discover great AI tools by submitting them to our
          directory. It&apos;s free and takes less than 2 minutes.
        </p>
        <Link href="/submit" className="mt-5 inline-flex items-center rounded-xl border border-primary/40 bg-primary/20 px-6 py-3 text-sm font-medium hover:bg-primary/30 transition">
          Submit a Tool →
        </Link>
      </section>
    </div>
  );
}

