"use client";

import Image from "next/image";
import type { MockTool } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";

const THEME_STYLES: Record<
  string,
  { gradient: string; glow: string; accent: string }
> = {
  violet: {
    gradient: "from-[#7C5CFF]/30 via-transparent to-transparent",
    glow: "shadow-[0_0_80px_rgba(124,92,255,0.35)]",
    accent: "#7C5CFF"
  },
  cyan: {
    gradient: "from-[#00E5FF]/25 via-transparent to-transparent",
    glow: "shadow-[0_0_80px_rgba(0,229,255,0.3)]",
    accent: "#00E5FF"
  },
  green: {
    gradient: "from-[#00FF94]/25 via-transparent to-transparent",
    glow: "shadow-[0_0_80px_rgba(0,255,148,0.3)]",
    accent: "#00FF94"
  },
  orange: {
    gradient: "from-[#FF8C00]/25 via-transparent to-transparent",
    glow: "shadow-[0_0_80px_rgba(255,140,0,0.3)]",
    accent: "#FF8C00"
  },
  pink: {
    gradient: "from-[#FF4DB8]/25 via-transparent to-transparent",
    glow: "shadow-[0_0_80px_rgba(255,77,184,0.3)]",
    accent: "#FF4DB8"
  },
  blue: {
    gradient: "from-[#4D9FFF]/25 via-transparent to-transparent",
    glow: "shadow-[0_0_80px_rgba(77,159,255,0.3)]",
    accent: "#4D9FFF"
  }
};

export function ToolHero({ tool }: { tool: MockTool }) {
  const theme = THEME_STYLES[tool.heroTheme] ?? THEME_STYLES.violet;

  const ogSrc =
    `/api/og/tool?` +
    new URLSearchParams({
      name: tool.name,
      tagline: tool.tagline,
      theme: tool.heroTheme,
      pricing: tool.pricing,
      logoUrl: tool.logoUrl
    }).toString();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-panel ${theme.glow} group`}
    >
      {/* Dynamic OG hero image */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
        <Image
          src={ogSrc}
          alt={`${tool.name} hero`}
          fill
          priority
          className="object-cover"
          unoptimized
        />
        {/* gradient overlay so text below reads clearly */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} pointer-events-none`}
        />
      </div>

      {/* Content below hero image */}
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Logo + name */}
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                className="h-full w-full object-contain p-1"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            <div>
              <h1 className="text-3xl font-semibold leading-tight">{tool.name}</h1>
              <p className="mt-0.5 text-muted">{tool.tagline}</p>
            </div>
          </div>

          {/* Pricing badge */}
          <Pill>{tool.pricing}</Pill>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <Pill key={tag} variant="soft">
              {tag}
            </Pill>
          ))}
          <Pill variant="soft">{tool.category}</Pill>
        </div>

        {/* Description */}
        {tool.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted">{tool.description}</p>
        )}
      </div>
    </div>
  );
}
