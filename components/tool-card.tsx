import Link from "next/link";
import { Pill } from "@/components/ui/pill";

export type ToolCardProps = {
  slug: string;
  name: string;
  tagline: string;
  pricing: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
};

export function ToolCard({ slug, name, tagline, pricing, tags = [], featured }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold group-hover:text-accent transition">{name}</h3>
        <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
          {pricing}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted line-clamp-2">{tagline}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <Pill key={tag} variant="soft">{tag}</Pill>
        ))}
      </div>
      {featured && (
        <div className="mt-3 text-xs text-accent">★ Featured</div>
      )}
    </Link>
  );
}

export default ToolCard;
