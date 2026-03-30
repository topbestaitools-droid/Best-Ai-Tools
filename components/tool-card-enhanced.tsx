"use client";

import Link from "next/link";
import type { MockTool } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";

const THEME_ACCENT: Record<string, string> = {
  violet: "hover:border-[#7C5CFF]/60 hover:shadow-[0_0_24px_rgba(124,92,255,0.25)]",
  cyan:   "hover:border-[#00E5FF]/60 hover:shadow-[0_0_24px_rgba(0,229,255,0.22)]",
  green:  "hover:border-[#00FF94]/60 hover:shadow-[0_0_24px_rgba(0,255,148,0.22)]",
  orange: "hover:border-[#FF8C00]/60 hover:shadow-[0_0_24px_rgba(255,140,0,0.22)]",
  pink:   "hover:border-[#FF4DB8]/60 hover:shadow-[0_0_24px_rgba(255,77,184,0.22)]",
  blue:   "hover:border-[#4D9FFF]/60 hover:shadow-[0_0_24px_rgba(77,159,255,0.22)]"
};

export function ToolCardEnhanced({ tool }: { tool: MockTool }) {
  const hoverClass = THEME_ACCENT[tool.heroTheme] ?? THEME_ACCENT.violet;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group flex items-start gap-4 rounded-2xl border border-border bg-panel p-5 transition-all duration-300 hover:scale-[1.01] ${hoverClass}`}
    >
      {/* Logo */}
      <div className="relative flex-shrink-0 h-12 w-12 overflow-hidden rounded-xl border border-border bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tool.logoUrl}
          alt={`${tool.name} logo`}
          className="h-full w-full object-contain p-1"
          loading="lazy"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            const parent = el.parentElement;
            if (parent) {
              parent.innerHTML =
                `<span class="flex h-full w-full items-center justify-center text-xl">🤖</span>`;
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold leading-tight group-hover:text-text transition-colors">
              {tool.name}
            </div>
            <div className="mt-0.5 text-sm text-muted line-clamp-2">{tool.tagline}</div>
          </div>
          <Pill>{tool.pricing}</Pill>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 3).map((tag) => (
            <Pill key={tag} variant="soft">
              {tag}
            </Pill>
          ))}
        </div>
      </div>
    </Link>
  );
}
