import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { structuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BestAI-Tools — Discover 3,200+ AI Tools",
  description: "The most comprehensive AI tools directory. Find, compare, and discover the perfect AI tools for your workflow.",
  metadataBase: new URL("https://bestai-tools.com"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BestAI-Tools"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bestai-tools.com",
    siteName: "BestAI-Tools",
    title: "BestAI-Tools — Discover 3,200+ AI Tools",
    description: "The most comprehensive AI tools directory. Find, compare, and discover the perfect AI tools for your workflow.",
    images: [
      {
        url: "https://bestai-tools.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BestAI-Tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@bestaitools",
    title: "BestAI-Tools",
    description: "The most comprehensive AI tools directory.",
    images: ["https://bestai-tools.com/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
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
        <link rel="canonical" href="https://bestai-tools.com" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BestAI-Tools" />
        <meta name="theme-color" content="#070A12" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.organization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }}
        />
      </head>
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>

        {/* Service Worker */}
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
