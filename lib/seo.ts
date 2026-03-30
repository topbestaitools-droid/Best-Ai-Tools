import { Metadata } from "next";

const baseUrl = "https://aiadvisor.tools";
const title = "AIAdvisor.tools — Find the best AI tools";
const description =
  "Discover and compare AI tools with semantic search, personalized recommendations, community reviews, and an interactive matcher.";
const image = `${baseUrl}/og-image.jpg`;

export const defaultMetadata: Metadata = {
  title,
  description,
  keywords: [
    "AI tools",
    "AI discovery",
    "tool comparison",
    "AI recommendations",
    "machine learning"
  ],
  authors: [{ name: "AIAdvisor.tools" }],
  creator: "AIAdvisor.tools",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "AIAdvisor.tools",
    title,
    description,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
    creator: "@aiadvisor_tools"
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
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": `${baseUrl}/en-US`
    }
  }
};

export function generateToolMetadata(
  tool: any
): Metadata {
  const url = `${baseUrl}/tools/${tool.slug}`;
  const toolImage = `${baseUrl}/tools/${tool.slug}/og-image.jpg`;

  return {
    title: `${tool.name} — AIAdvisor.tools`,
    description: tool.tagline,
    openGraph: {
      type: "website",
      url,
      title: tool.name,
      description: tool.tagline,
      images: [
        {
          url: toolImage,
          width: 1200,
          height: 630,
          alt: tool.name,
          type: "image/jpeg"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.tagline,
      images: [toolImage]
    },
    alternates: {
      canonical: url
    }
  };
}

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AIAdvisor.tools",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description,
    sameAs: [
      "https://twitter.com/aiadvisor_tools",
      "https://github.com/topbestaitools-droid/bestai-tools"
    ]
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: baseUrl,
    name: "AIAdvisor.tools",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
};
