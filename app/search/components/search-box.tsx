"use client";

import { useMemo, useState } from "react";
import { tools } from "@/lib/mock-tools";
import Link from "next/link";
import Image from "next/image";
import { Pill } from "@/components/ui/pill";

export function SearchBox() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return tools.slice(0, 6);
    return tools
      .filter((t) => (t.name + " " + t.tagline + " " + t.tags.join(" ")).toLowerCase().includes(query))
      .slice(0, 12);
  }, [q]);

  return (
    <div className="rounded-2xl border border-border bg-panel p-5">
      <label className="text-sm text-muted">Search tools</label>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='e.g. "AI video editing", "meeting notes", "image generator"'
        className="mt-2 w-full rounded-xl border border-border bg-bg px-4 py-3 text-text outline-none focus:border-accent"
      />

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {results.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-border p-4 transition hover:border-accent/60 hover:shadow-[0_0_14px_rgba(0,229,255,0.1)]"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-bg transition group-hover:shadow-[0_0_10px_rgba(124,92,255,0.35)]">
              {t.logoUrl ? (
                <Image
                  src={t.logoUrl}
                  alt={`${t.name} logo`}
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  unoptimized
                />
              ) : (
                <span className="text-base">🤖</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium group-hover:text-accent transition">{t.name}</div>
              <div className="mt-0.5 text-sm text-muted line-clamp-1">{t.tagline}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {t.tags.slice(0, 3).map((tag) => <Pill key={tag} variant="soft">{tag}</Pill>)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

