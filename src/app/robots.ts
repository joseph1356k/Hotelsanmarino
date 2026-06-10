import type { MetadataRoute } from "next";
import { canonicalSiteUrl } from "@/content/ai-answer-content";

const aiSearchUserAgents = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-User",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      ...aiSearchUserAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/admin", "/admin/"],
      })),
    ],
    sitemap: `${canonicalSiteUrl}/sitemap.xml`,
    host: canonicalSiteUrl,
  };
}
