import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DiscussionsPage() {
  const discussions = [
    {
      id: 1,
      title: "Best AI tools for content creators?",
      author: "Creative Sarah",
      replies: 24,
      views: 156,
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "How to choose between similar tools",
      author: "Decision Maker",
      replies: 18,
      views: 92,
      date: "1 day ago"
    },
    {
      id: 3,
      title: "AI tools for learning programming",
      author: "Dev Newbie",
      replies: 32,
      views: 248,
      date: "3 days ago"
    }
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Discussions</h1>
          <p className="mt-1 text-muted">Chat with the community about AI tools</p>
        </div>
        <Link href="/community/discussions/new"><Button>Start Discussion</Button></Link>
      </header>

      <div className="space-y-3">
        {discussions.map((disc) => (
          <Link key={disc.id} href={`/community/discussions/${disc.id}`} className="rounded-2xl border border-border bg-panel p-4 hover:border-accent/60 transition">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold">{disc.title}</h3>
                <p className="mt-1 text-sm text-muted">Started by {disc.author}</p>
              </div>
              <div className="text-right text-sm text-muted">
                <div>{disc.replies} replies</div>
                <div>{disc.views} views</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted">{disc.date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
