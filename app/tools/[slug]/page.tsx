import { notFound } from "next/navigation";
import Image from "next/image";
import { tools } from "@/lib/mock-tools";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — AIAdvisor.tools`,
    description: tool.tagline,
    openGraph: {
      images: [
        {
          url: `/api/og/tool?name=${encodeURIComponent(tool.name)}&tagline=${encodeURIComponent(tool.tagline)}&pricing=${encodeURIComponent(tool.pricing)}&tags=${encodeURIComponent(tool.tags.join(","))}`,
          width: 1200,
          height: 630
        }
      ]
    }
  };
}

export default function ToolDetailPage({ params }: Props) {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return notFound();

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border"
        style={{
          background: "linear-gradient(135deg, #070A12 0%, #0B1224 60%, #0D1A3A 100%)"
        }}
      >
        {/* Neon glow blobs */}
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(124,92,255,0.6) 0%, transparent 70%)",
            filter: "blur(50px)"
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,255,0.5) 0%, transparent 70%)",
            filter: "blur(40px)"
          }}
        />

        {/* Subtle grid lines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(27,43,82,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(27,43,82,0.35) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        {/* Hero content */}
        <div className="relative flex flex-col gap-5 p-8 sm:p-10">
          {/* Logo + name row */}
          <div className="flex items-center gap-5">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-bg/60 backdrop-blur-sm">
              {tool.logoUrl ? (
                <Image
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5"
                  unoptimized
                />
              ) : (
                <span className="text-3xl">🤖</span>
              )}
            </div>

            <div>
              <h1
                className="text-3xl font-semibold tracking-tight text-text"
                style={{ textShadow: "0 0 40px rgba(124,92,255,0.4)" }}
              >
                {tool.name}
              </h1>
              <p className="mt-1 text-muted">{tool.tagline}</p>
            </div>

            <div className="ml-auto">
              <Pill>{tool.pricing}</Pill>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <Pill key={tag} variant="soft">
                {tag}
              </Pill>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a href={tool.website} target="_blank" rel="noreferrer">
              <Button>Visit website ↗</Button>
            </a>
            <a
              href={`/api/og/tool?name=${encodeURIComponent(tool.name)}&tagline=${encodeURIComponent(tool.tagline)}&pricing=${encodeURIComponent(tool.pricing)}&tags=${encodeURIComponent(tool.tags.join(","))}`}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost">Share image ↗</Button>
            </a>
          </div>
        </div>
      </div>

      {/* Overview section */}
      <section className="rounded-2xl border border-border bg-panel p-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-2 text-muted">
          This is placeholder content. Next: reviews, alternatives, AI matcher.
        </p>
      </section>
    </div>
  );
}
