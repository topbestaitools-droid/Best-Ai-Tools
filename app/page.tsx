import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-panel p-8">
        <p className="text-muted">aiadvisor.tools</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Discover AI tools that actually fit your workflow.
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Search tools, compare alternatives, get AI-powered recommendations, and read community reviews.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tools"><Button>Browse tools</Button></Link>
          <Link href="/search"><Button variant="secondary">Search</Button></Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-panel p-5">
          <div className="text-lg font-medium">Semantic Search</div>
          <div className="mt-1 text-sm text-muted">Find tools by intent, not just keywords.</div>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-5">
          <div className="text-lg font-medium">AI Matcher</div>
          <div className="mt-1 text-sm text-muted">Get matched to the right tools.</div>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-5">
          <div className="text-lg font-medium">Community</div>
          <div className="mt-1 text-sm text-muted">Reviews, lists, and discussions.</div>
        </div>
      </section>
    </div>
  );
}
