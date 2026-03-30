import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function AdminToolsPage() {
  const user = await getCurrentUser();
  if (!user || user.email !== "admin@aiadvisor.tools") {
    redirect("/");
  }

  // Fetch tools
  const tools = await prisma.tool.findMany({
    include: {
      reviews: { select: { id: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-accent hover:underline">← Admin</Link>
          <h1 className="mt-4 text-3xl font-semibold">Tools</h1>
          <p className="mt-1 text-muted">Manage AI tools ({tools.length} total)</p>
        </div>
        <Link href="/admin/tools/new"><Button>Add Tool</Button></Link>
      </header>

      <div className="rounded-2xl border border-border bg-panel overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted">
              <th className="p-4">Tool Name</th>
              <th className="p-4">Pricing</th>
              <th className="p-4">Reviews</th>
              <th className="p-4">Tags</th>
              <th className="p-4">Added</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool: Record<string, any>) => (
              <tr key={tool.id} className="border-b border-border/50 hover:bg-bg transition">
                <td className="p-4 font-medium">{tool.name}</td>
                <td className="p-4 text-sm">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-accent/15 border border-accent/30">
                    {tool.pricing}
                  </span>
                </td>
                <td className="p-4 text-primary font-semibold">{tool.reviews.length}</td>
                <td className="p-4 text-sm text-muted">{tool.tags.join(", ")}</td>
                <td className="p-4 text-sm text-muted">
                  {tool.createdAt.toLocaleDateString()}
                </td>
                <td className="p-4 space-x-2">
                  <Link href={`/admin/tools/${tool.id}/edit`} className="text-accent hover:underline text-sm">Edit</Link>
                  <button className="text-muted hover:text-text text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tools.length === 0 && (
        <div className="rounded-2xl border border-border bg-panel p-8 text-center">
          <p className="text-muted">No tools found</p>
        </div>
      )}
    </div>
  );
}
