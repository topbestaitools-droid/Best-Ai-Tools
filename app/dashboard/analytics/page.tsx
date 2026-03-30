import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AnalyticsDashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      <header>
        <Link href="/dashboard" className="text-accent hover:underline">← Dashboard</Link>
        <h1 className="mt-4 text-3xl font-semibold">Analytics</h1>
        <p className="mt-1 text-muted">Your activity and engagement metrics</p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Page Views</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
          <p className="mt-1 text-xs text-muted">This month</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Tools Viewed</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
          <p className="mt-1 text-xs text-muted">All time</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Reviews Written</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
          <p className="mt-1 text-xs text-muted">All time</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Avg Session</div>
          <div className="mt-2 text-3xl font-semibold">0m</div>
          <p className="mt-1 text-xs text-muted">per session</p>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Top Tools Viewed</h2>
        <div className="space-y-3">
          {[
            { name: "Noted AI", views: 12 },
            { name: "DevPilot", views: 8 },
            { name: "PixelCraft", views: 5 }
          ].map((tool, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-bg border border-border/50">
              <span>{tool.name}</span>
              <span className="text-primary font-semibold">{tool.views} views</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Timeline</h2>
        <p className="text-muted">No activity recorded yet</p>
      </section>
    </div>
  );
}
