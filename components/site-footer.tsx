import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} aiadvisor.tools</p>
        <div className="flex gap-4">
          <Link href="/legal/privacy" className="hover:text-text">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-text">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
