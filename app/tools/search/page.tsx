"use client";

import { useState, useMemo } from "react";
import { tools } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";
import Link from "next/link";

export default function ToolSearchPage() {
  const [query, setQuery] = useState("");
  const [pricingFilter, setPricingFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return tools.filter((t) => {
      const matchesQuery = !q || (t.name + " " + t.tagline + " " + t.tags.join(" ")).toLowerCase().includes(q);
      const matchesPricing = pricingFilter === "all" || t.pricing === pricingFilter;
      return matchesQuery && matchesPricing;
    });
  }, [query, pricingFilter]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Search AI Tools</h1>
        <p className="mt-1 text-muted">Find the perfect tool for your workflow.</p>
      </header>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="flex-1 min-w-64 rounded-xl border border-border bg-panel px-4 py-2 text-text outline-none focus:border-accent"
        />
        <select
          value={pricingFilter}
          onChange={(e) => setPricingFilter(e.target.value)}
          className="rounded-xl border border-border bg-panel px-3 py-2 text-text outline-none focus:border-accent"
        >
          <option value="all">All Pricing</option>
          <option value="Free">Free</option>
          <option value="Freemium">Freemium</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <p className="text-sm text-muted">{filtered.length} tools found</p>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-medium">{t.name}</div>
                <div className="mt-1 text-sm text-muted">{t.tagline}</div>
              </div>
              <Pill>{t.pricing}</Pill>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.tags.slice(0, 3).map((tag) => (
                <Pill key={tag} variant="soft">{tag}</Pill>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
