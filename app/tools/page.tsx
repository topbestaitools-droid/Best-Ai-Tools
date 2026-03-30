import { tools } from "@/lib/mock-tools";
import { ToolCardEnhanced } from "@/components/tool-card-enhanced";

export const metadata = {
  title: "Browse AI Tools — AIAdvisor.tools",
  description: "Discover the best AI tools for productivity, design, video, writing, and more."
};

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">AI Tools</h2>
        <p className="text-muted">Discover tools that fit your workflow.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolCardEnhanced key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
