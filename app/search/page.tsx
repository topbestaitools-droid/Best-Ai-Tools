import { SearchBox } from "@/components/search-box";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">Search AI Tools</h2>
        <p className="text-muted">
          Find tools by name, use case, or keyword. Explore 40+ tools or{" "}
          <a href="/tools" className="text-accent hover:underline">browse by category</a>.
        </p>
      </header>
      <SearchBox />
    </div>
  );
}
