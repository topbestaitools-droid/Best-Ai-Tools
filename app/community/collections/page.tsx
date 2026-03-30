import Link from "next/link";

export default function CollectionsPage() {
  const collections = [
    {
      id: 1,
      name: "Video Creation & Editing",
      description: "All-in-one tools for creators",
      tools: 12,
      author: "Creative Pro"
    },
    {
      id: 2,
      name: "Writing & Content",
      description: "AI writing assistants and editors",
      tools: 8,
      author: "Content Master"
    },
    {
      id: 3,
      name: "Code & Development",
      description: "Programming helpers and debuggers",
      tools: 15,
      author: "Dev Community"
    }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Collections</h1>
        <p className="mt-1 text-muted">Curated lists of tools by category</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {collections.map((col) => (
          <Link key={col.id} href={`/community/collections/${col.id}`} className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition">
            <h3 className="text-lg font-semibold">{col.name}</h3>
            <p className="mt-1 text-sm text-muted">{col.description}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-muted">
              <span>{col.tools} tools</span>
              <span>by {col.author}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
