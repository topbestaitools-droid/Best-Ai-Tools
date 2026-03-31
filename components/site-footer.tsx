import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-medium text-text">
            <span className="text-accent">AI</span>Advisor.tools
          </p>
          <p className="mt-0.5">The most comprehensive AI tools directory.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/tools" className="hover:text-text">Browse Tools</Link>
          <Link href="/submit" className="hover:text-text">Submit a Tool</Link>
          <Link href="/community" className="hover:text-text">Community</Link>
          <Link href="/legal/privacy" className="hover:text-text">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-text">Terms</Link>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted/60">
        © {new Date().getFullYear()} AIAdvisor.tools. Some links are affiliate links — we may earn a commission at no extra cost to you.
      </p>
    </footer>
  );
}

