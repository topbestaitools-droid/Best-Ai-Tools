import Link from "next/link";
import Image from "next/image";
import { tools } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";

export const metadata = {
  title: "AI Tools — AIAdvisor.tools",
  description: "Browse the best AI tools for every use case."
};

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">AI Tools</h2>
        <p className="text-muted">Browse the best AI tools for every use case.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="group rounded-2xl border border-border bg-panel p-5 transition hover:border-accent/60 hover:shadow-[0_0_18px_rgba(0,229,255,0.12)]"
          >
            <div className="flex items-start gap-4">
              {/* Logo / thumbnail */}
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-bg transition group-hover:shadow-[0_0_12px_rgba(124,92,255,0.4)]">
                {t.logoUrl ? (
                  <Image
                    src={t.logoUrl}
                    alt={`${t.name} logo`}
                    fill
                    sizes="48px"
                    className="object-contain p-1"
                    unoptimized
                  />
                ) : (
                  <span className="text-xl">🤖</span>
                )}
              </div>

              {/* Name + tagline */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-lg font-medium leading-tight group-hover:text-accent transition">
                    {t.name}
                  </div>
                  <Pill>{t.pricing}</Pill>
                </div>
                <div className="mt-1 text-sm text-muted line-clamp-2">{t.tagline}</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {t.tags.slice(0, 4).map((tag) => (
                <Pill key={tag} variant="soft">
                  {tag}
                </Pill>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
