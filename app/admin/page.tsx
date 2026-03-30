import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  
  // TODO: Check if user is admin
  if (!user || user.email !== "admin@aiadvisor.tools") {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="mt-1 text-muted">Manage users, tools, and platform content</p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Total Users</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
          <p className="mt-1 text-xs text-muted">All time</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Total Tools</div>
          <div className="mt-2 text-3xl font-semibold">6</div>
          <p className="mt-1 text-xs text-muted">In database</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Total Reviews</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
          <p className="mt-1 text-xs text-muted">This month</p>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Active Sessions</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
          <p className="mt-1 text-xs text-muted">Right now</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/admin/users" className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition">
          <div className="text-2xl">👥</div>
          <h3 className="mt-2 text-lg font-semibold">Users</h3>
          <p className="mt-1 text-sm text-muted">Manage user accounts and permissions</p>
        </Link>

        <Link href="/admin/tools" className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition">
          <div className="text-2xl">🛠️</div>
          <h3 className="mt-2 text-lg font-semibold">Tools</h3>
          <p className="mt-1 text-sm text-muted">Add, edit, or delete AI tools</p>
        </Link>

        <Link href="/admin/reviews" className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition">
          <div className="text-2xl">⭐</div>
          <h3 className="mt-2 text-lg font-semibold">Reviews</h3>
          <p className="mt-1 text-sm text-muted">Moderate and manage reviews</p>
        </Link>
      </div>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted">No recent activity</p>
      </section>
    </div>
  );
}
