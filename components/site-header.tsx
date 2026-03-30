import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="font-semibold tracking-tight">
        <span className="text-accent">AI</span>Advisor<span className="text-primary">.tools</span>
      </Link>

      <nav className="flex items-center gap-2">
        <Link href="/tools"><Button variant="ghost">Tools</Button></Link>
        <Link href="/search"><Button variant="ghost">Search</Button></Link>
        <Link href="/legal/privacy"><Button variant="ghost">Privacy</Button></Link>
      </nav>
    </header>
  );
}
