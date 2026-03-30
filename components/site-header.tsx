import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="font-bold tracking-tight text-lg">
        <span className="text-accent">Best</span>
        <span className="text-text">AI</span>
        <span className="text-primary">Tools</span>
      </Link>

      <nav className="flex items-center gap-2">
        <Link href="/tools"><Button variant="ghost">Tools</Button></Link>
        <Link href="/search"><Button variant="ghost">Search</Button></Link>
        <Link href="/dashboard/affiliate"><Button variant="ghost">Affiliates</Button></Link>
        <Link href="/auth/signin"><Button variant="secondary">Sign In</Button></Link>
      </nav>
    </header>
  );
}
