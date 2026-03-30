"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackPageView } from "@/lib/analytics";
import { usePathname } from "next/navigation";

export function AnalyticsScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    trackPageView(pathname, document.title);
  }, [pathname]);

  // Only load if GA ID is configured
  if (!process.env.NEXT_PUBLIC_GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
    </>
  );
}
