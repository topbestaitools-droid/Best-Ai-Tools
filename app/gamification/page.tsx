import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function GamificationPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Your Achievements</h1>
        <p className="mt-1 text-muted">Earn badges and unlock achievements</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Total Points</div>
          <div className="mt-2 text-4xl font-semibold text-accent">0</div>
          <p className="mt-1 text-xs text-muted">Keep exploring to earn more</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Current Level</div>
          <div className="mt-2 text-4xl font-semibold text-primary">1</div>
          <p className="mt-1 text-xs text-muted">250 points to next level</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Badges Earned</div>
          <div className="mt-2 text-4xl font-semibold">0</div>
          <p className="mt-1 text-xs text-muted">Keep contributing</p>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Available Badges</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "First Review", icon: "⭐", desc: "Write your first review" },
            { name: "Tool Expert", icon: "🧠", desc: "Write 10 reviews" },
            { name: "Community Helper", icon: "🤝", desc: "Reply to 5 discussions" },
            { name: "Trending Finder", icon: "🔥", desc: "Find a tool before it trends" },
            { name: "Collector", icon: "📚", desc: "Create 3 collections" },
            { name: "All-Star", icon: "⭐", desc: "Reach level 10" }
          ].map((badge, i) => (
            <div key={i} className="rounded-xl border border-border/50 bg-bg p-4 text-center opacity-60">
              <div className="text-3xl">{badge.icon}</div>
              <div className="mt-2 font-semibold">{badge.name}</div>
              <p className="mt-1 text-xs text-muted">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
        <p className="text-muted">No achievements yet. Start contributing!</p>
      </section>
    </div>
  );
}
