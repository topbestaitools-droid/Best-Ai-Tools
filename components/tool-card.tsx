import Link from "next/link";
import { Pill } from "@/components/ui/pill";

interface ToolCardProps {
  tool: {
    slug: string;
    name: string;
    tagline: string;
    website: string;
    pricing: "Free" | "Freemium" | "Paid";
    tags: string[];
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-medium">{tool.name}</div>
          <div className="mt-1 text-sm text-muted">{tool.tagline}</div>
        </div>
        <Pill>{tool.pricing}</Pill>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tool.tags.slice(0, 4).map((tag) => (
          <Pill key={tag} variant="soft">{tag}</Pill>
        ))}
      </div>
    </Link>
  );
}
