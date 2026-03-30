"use client";

import { useState } from "react";
import { tools } from "@/lib/mock-tools";
import Link from "next/link";
import { Pill } from "@/components/ui/pill";

export default function SemanticSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual semantic search via embeddings API
    const q = query.toLowerCase();
    const filtered = tools.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q))
    );
    
    setResults(filtered);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Semantic Search</h1>
        <p className="mt-1 text-muted">
          Search by intent, not just keywords. "I need to edit videos" → finds video tools.
        </p>
      </header>

      <form onSubmit={handleSearch} className="rounded-2xl border border-border bg-panel p-6">
        <label className="text-sm text-muted">What do you need?</label>
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. "turn meetings into action items", "generate product photos"'
            className="flex-1 rounded-xl border border-border bg-bg px-4 py-3 text-text outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary/20 border border-primary/40 hover:bg-primary/30 transition font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-muted">Found {results.length} tools</p>
          {results.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-2xl border border-border bg-panel p-6 hover:border-accent/60 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-lg font-semibold">{tool.name}</div>
                  <div className="mt-1 text-muted">{tool.tagline}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tool.tags.slice(0, 4).map((tag: string) => (
                      <Pill key={tag} variant="soft">{tag}</Pill>
                    ))}
                  </div>
                </div>
                <Pill>{tool.pricing}</Pill>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="rounded-2xl border border-border bg-panel p-8 text-center">
          <p className="text-muted">No tools found for "{query}"</p>
          <p className="mt-2 text-sm text-muted">Try a different search term or browse all tools</p>
        </div>
      )}
    </div>
  );
}
