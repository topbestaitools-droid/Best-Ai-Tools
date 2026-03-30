import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Community</h1>
        <p className="mt-1 text-muted">Connect with other AI enthusiasts, share reviews, and discover tools together.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/community/reviews" className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition">
          <div className="text-2xl">⭐</div>
          <h3 className="mt-2 text-lg font-semibold">Tool Reviews</h3>
          <p className="mt-1 text-sm text-muted">Read and write reviews for AI tools.</p>
        </Link>

        <Link href="/community/collections" className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition">
          <div className="text-2xl">📚</div>
          <h3 className="mt-2 text-lg font-semibold">Collections</h3>
          <p className="mt-1 text-sm text-muted">Curated tool collections by category.</p>
        </Link>

        <Link href="/community/discussions" className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition">
          <div className="text-2xl">💬</div>
          <h3 className="mt-2 text-lg font-semibold">Discussions</h3>
          <p className="mt-1 text-sm text-muted">Join conversations about AI tools.</p>
        </Link>
      </div>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Leaderboard</h2>
        <p className="mt-2 text-muted">Top contributors this month</p>
        
        <div className="mt-4 space-y-3">
          {[
            { rank: 1, name: "Sarah Chen", points: 1250 },
            { rank: 2, name: "Alex Rodriguez", points: 980 },
            { rank: 3, name: "Jordan Smith", points: 856 }
          ].map((user) => (
            <div key={user.rank} className="flex items-center justify-between p-3 rounded-xl bg-bg border border-border">
              <div className="flex items-center gap-3">
                <div className="text-lg font-semibold text-accent">#{user.rank}</div>
                <div>{user.name}</div>
              </div>
              <div className="text-primary font-semibold">{user.points} pts</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
