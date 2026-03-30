import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIAdvisor.tools — Find the best AI tools",
  description: "AI tools discovery, recommendations, and community reviews.",
  metadataBase: new URL("https://aiadvisor.tools")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4">
          {children}
        </div>
      </body>
    </html>
  );
}
