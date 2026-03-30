import { MetadataRoute } from "next";
import { tools } from "@/lib/mock-tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aiadvisor.tools";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/matcher`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5
    }
  ];

  // Dynamic tool pages
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticPages, ...toolPages];
}
