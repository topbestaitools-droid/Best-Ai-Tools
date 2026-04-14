import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} BestAI-Tools.com — The best AI tools directory</p>
        <div className="flex gap-4">
          <Link href="/legal/privacy" className="hover:text-text">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-text">Terms</Link>
          <Link href="/dashboard/affiliate" className="hover:text-text">Affiliates</Link>
          <Link href="/tools" className="hover:text-text">Browse Tools</Link>
        </div>
      </div>
    </footer>
  );
}
