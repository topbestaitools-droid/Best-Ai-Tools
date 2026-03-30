import "./globals.css";
import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { structuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AIAdvisor.tools — Find the best AI tools",
  description: "AI tools discovery, recommendations, and community reviews.",
  metadataBase: new URL("https://aiadvisor.tools"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AIAdvisor.tools"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiadvisor.tools",
    siteName: "AIAdvisor.tools",
    title: "AIAdvisor.tools — Find the best AI tools",
    description: "AI tools discovery, recommendations, and community reviews.",
    images: [
      {
        url: "https://aiadvisor.tools/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AIAdvisor.tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@aiadvisor_tools",
    title: "AIAdvisor.tools",
    description: "AI tools discovery, recommendations, and community reviews.",
    images: ["https://aiadvisor.tools/og-image.jpg"]
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
        <link rel="canonical" href="https://aiadvisor.tools" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AIAdvisor" />
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
