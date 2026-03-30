import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function AdminUsersPage() {
  const user = await getCurrentUser();
  if (!user || user.email !== "admin@aiadvisor.tools") {
    redirect("/");
  }

  // Fetch users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      points: true,
      level: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-accent hover:underline">← Admin</Link>
          <h1 className="mt-4 text-3xl font-semibold">Users</h1>
          <p className="mt-1 text-muted">Manage user accounts ({users.length} total)</p>
        </div>
      </header>

      <div className="rounded-2xl border border-border bg-panel overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Level</th>
              <th className="p-4">Points</th>
              <th className="p-4">Joined</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u: Record<string, any>) => (
              <tr key={u.id} className="border-b border-border/50 hover:bg-bg transition">
                <td className="p-4 font-medium">{u.name || "Anonymous"}</td>
                <td className="p-4 text-sm text-muted">{u.email}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-primary/15 border border-primary/30">
                    Lvl {u.level}
                  </span>
                </td>
                <td className="p-4 text-primary font-semibold">{u.points}</td>
                <td className="p-4 text-sm text-muted">
                  {u.createdAt.toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button className="text-accent hover:underline text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="rounded-2xl border border-border bg-panel p-8 text-center">
          <p className="text-muted">No users found</p>
        </div>
      )}
    </div>
  );
}
