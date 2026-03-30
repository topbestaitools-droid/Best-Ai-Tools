import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "AIAdvisor.tools — Find the best AI tools",
  description: "AI tools discovery, recommendations, and community reviews.",
  metadataBase: new URL("https://aiadvisor.tools"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AIAdvisor.tools"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#070A12"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AIAdvisor" />
        <meta name="theme-color" content="#070A12" />
      </head>
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/service-worker.js').catch(err => {
                  console.log('SW registration failed:', err);
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
