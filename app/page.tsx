import Link from "next/link";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: "✍️", name: "Writing & Content", slug: "writing", count: 120 },
  { icon: "💻", name: "Code & Dev", slug: "code", count: 98 },
  { icon: "🖼️", name: "Image Generation", slug: "image", count: 145 },
  { icon: "🎥", name: "Video & Animation", slug: "video", count: 87 },
  { icon: "🎙️", name: "Audio & Voice", slug: "audio", count: 64 },
  { icon: "💬", name: "Chatbots & Assistants", slug: "chatbots", count: 112 },
  { icon: "🔍", name: "Search & Research", slug: "research", count: 73 },
  { icon: "📊", name: "Data & Analytics", slug: "analytics", count: 91 },
  { icon: "🎨", name: "Design & Graphics", slug: "design", count: 108 },
  { icon: "📈", name: "Marketing & SEO", slug: "marketing", count: 134 },
  { icon: "🤝", name: "Customer Service", slug: "customer-service", count: 55 },
  { icon: "🎓", name: "Education & Learning", slug: "education", count: 79 },
  { icon: "💰", name: "Finance & Business", slug: "finance", count: 67 },
  { icon: "❤️", name: "Health & Wellness", slug: "health", count: 42 },
  { icon: "🎮", name: "Gaming & Entertainment", slug: "gaming", count: 38 },
  { icon: "🔧", name: "Productivity", slug: "productivity", count: 156 },
];

const featuredTools = [
  {
    name: "ChatGPT",
    tagline: "The most powerful AI assistant for conversations and tasks.",
    pricing: "Freemium",
    website: "https://chat.openai.com",
    category: "Chatbots",
    badge: "🔥 Trending",
  },
  {
    name: "Midjourney",
    tagline: "Generate stunning images from text descriptions.",
    pricing: "Paid",
    website: "https://midjourney.com",
    category: "Image Generation",
    badge: "⭐ Top Rated",
  },
  {
    name: "GitHub Copilot",
    tagline: "AI pair programmer that helps you write code faster.",
    pricing: "Paid",
    website: "https://github.com/features/copilot",
    category: "Code & Dev",
    badge: "💎 Featured",
  },
  {
    name: "Jasper AI",
    tagline: "AI content platform for marketing teams.",
    pricing: "Paid",
    website: "https://jasper.ai",
    category: "Writing",
    badge: "🚀 Popular",
  },
  {
    name: "Runway ML",
    tagline: "AI-powered creative tools for video generation.",
    pricing: "Freemium",
    website: "https://runwayml.com",
    category: "Video",
    badge: "✨ New",
  },
  {
    name: "ElevenLabs",
    tagline: "The most realistic AI voice generator available.",
    pricing: "Freemium",
    website: "https://elevenlabs.io",
    category: "Audio",
    badge: "🎙️ Top Pick",
  },
];

const stats = [
  { value: "3,200+", label: "AI Tools" },
  { value: "50+", label: "Categories" },
  { value: "100K+", label: "Monthly Users" },
  { value: "Free", label: "Always" },
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl border border-border bg-panel px-8 py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            <span>🚀</span>
            <span>3,200+ AI Tools Curated</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            Discover the Best
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Tools
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
            The most comprehensive directory of AI tools. Find, compare, and discover the perfect AI tools for your workflow — curated from the best sources.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/tools">
              <Button className="px-6 py-3 text-base">Browse All Tools</Button>
            </Link>
            <Link href="/search">
              <Button variant="secondary" className="px-6 py-3 text-base">🔍 Search Tools</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-panel p-5 text-center">
            <div className="text-3xl font-bold text-accent">{stat.value}</div>
            <div className="mt-1 text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Categories Grid */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Browse by Category</h2>
            <p className="mt-1 text-muted">Explore AI tools organized by use case</p>
          </div>
          <Link href="/tools" className="text-accent hover:underline text-sm">
            View all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/tools?category=${cat.slug}`}
              className="group rounded-2xl border border-border bg-panel p-4 hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{cat.name}</div>
                  <div className="text-xs text-muted">{cat.count} tools</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Featured AI Tools</h2>
            <p className="mt-1 text-muted">Top-rated and trending tools this week</p>
          </div>
          <Link href="/tools" className="text-accent hover:underline text-sm">
            See all →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <a
              key={tool.name}
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-border bg-panel p-5 hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{tool.name}</span>
                    <span className="text-xs rounded-full border border-border px-2 py-0.5 text-muted">{tool.category}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{tool.tagline}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted">{tool.badge}</span>
                <span className="text-xs rounded-full border border-border px-2 py-0.5">{tool.pricing}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Affiliate / Publisher CTA */}
      <section className="rounded-3xl border border-primary/30 bg-primary/5 p-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">💰 Join Our Affiliate Program</h2>
            <p className="mt-2 text-muted max-w-lg">
              Earn commissions by promoting 3,200+ AI tools. Join publishers from Impact, ShareASale, Awin, Paddle, and more.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Impact", "ShareASale", "Awin", "Paddle", "PartnerStack"].map((p) => (
                <span key={p} className="text-xs rounded-full border border-border bg-panel px-3 py-1">{p}</span>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <Link href="/dashboard/affiliate">
              <Button className="px-6 py-3">Start Earning →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Links */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Explore More</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/search" className="rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition">
            <div className="text-lg font-medium">🔍 Semantic Search</div>
            <div className="mt-1 text-sm text-muted">Find tools by intent, not just keywords.</div>
          </Link>
          <Link href="/matcher" className="rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition">
            <div className="text-lg font-medium">🤖 AI Matcher</div>
            <div className="mt-1 text-sm text-muted">Get matched to the perfect tools for your use case.</div>
          </Link>
          <Link href="/community" className="rounded-2xl border border-border bg-panel p-5 hover:border-accent/60 transition">
            <div className="text-lg font-medium">👥 Community</div>
            <div className="mt-1 text-sm text-muted">Reviews, collections, and discussions.</div>
          </Link>
        </div>
      </section>
    </div>
  );
}
