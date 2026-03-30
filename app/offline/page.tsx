import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">📡</div>
        <h1 className="text-3xl font-semibold">You're Offline</h1>
        <p className="text-muted">
          It looks like you've lost your internet connection. Some features may be limited.
        </p>
        
        <div className="rounded-2xl border border-border bg-panel p-4 space-y-2">
          <p className="text-sm text-muted">Available offline:</p>
          <ul className="text-left space-y-1 text-sm">
            <li>✅ Browse saved tools</li>
            <li>✅ View your profile</li>
            <li>✅ Read cached reviews</li>
            <li>❌ Write new reviews</li>
            <li>❌ Search (limited)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <Link href="/">
            <Button className="w-full">Go Home</Button>
          </Link>
          <button onClick={() => window.location.reload()} className="w-full">
            <Button variant="secondary" className="w-full">Retry Connection</Button>
          </button>
        </div>
      </div>
    </div>
  );
}
