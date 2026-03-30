import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="mt-1 text-muted">Welcome back, {user.name}</p>
        </div>
        <SignOutButton />
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Saved Tools</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Reviews Written</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
        </div>
        <div className="rounded-2xl border border-border bg-panel p-6">
          <div className="text-sm text-muted">Badges Earned</div>
          <div className="mt-2 text-3xl font-semibold">0</div>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/tools"><Button>Browse Tools</Button></Link>
          <Link href="/search"><Button variant="secondary">Search</Button></Link>
          <Link href="/profile"><Button variant="ghost">View Profile</Button></Link>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <p className="mt-2 text-muted">No activity yet. Start exploring tools!</p>
      </section>
    </div>
  );
}
