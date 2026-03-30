import { SearchBox } from "@/components/search-box";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">Semantic Search</h2>
        <p className="text-muted">
          MVP UI now. Next: embeddings + vector search.
        </p>
      </header>
      <SearchBox />
    </div>
  );
}
