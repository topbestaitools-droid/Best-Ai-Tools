"use client";

import { useMemo, useState } from "react";
import { searchTools, CATEGORIES } from "@/lib/mock-tools";
import Link from "next/link";
import { Pill } from "@/components/ui/pill";

export function SearchBox() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return searchTools("").slice(0, 6);
    return searchTools(query).slice(0, 12);
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

      {q && (
        <p className="mt-2 text-xs text-muted">{results.length} results</p>
      )}

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {results.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="rounded-xl border border-border p-4 hover:border-accent/60 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-medium">{t.name}</div>
              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
                {t.pricing}
              </span>
            </div>
            <div className="mt-1 text-sm text-muted">{t.tagline}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.tags.slice(0, 3).map((tag) => (
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
