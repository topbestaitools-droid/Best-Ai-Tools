import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/auth/"]
      },
      {
        userAgent: "GPTBot",
        disallow: "/"
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/"
      }
    ],
    sitemap: "https://aiadvisor.tools/sitemap.xml",
    host: "https://aiadvisor.tools"
  };
}
