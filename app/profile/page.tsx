import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <header>
        <Link href="/dashboard" className="text-accent hover:underline">← Back</Link>
        <h1 className="mt-4 text-3xl font-semibold">Profile</h1>
      </header>

      <div className="rounded-2xl border border-border bg-panel p-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-semibold">
            {user.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="mt-1 text-muted">{user.email}</p>
            <div className="mt-4">
              <Link href="/profile/edit"><Button variant="secondary">Edit Profile</Button></Link>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <div className="font-medium">Email Notifications</div>
              <p className="text-sm text-muted">Get updates about new tools</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div>
              <div className="font-medium">Weekly Digest</div>
              <p className="text-sm text-muted">Receive tool recommendations</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Marketing Emails</div>
              <p className="text-sm text-muted">New features and announcements</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Statistics</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted">Member Since</div>
            <div className="mt-1 font-semibold">March 2026</div>
          </div>
          <div>
            <div className="text-sm text-muted">Reputation Score</div>
            <div className="mt-1 font-semibold">0 pts</div>
          </div>
        </div>
      </section>
    </div>
  );
}
