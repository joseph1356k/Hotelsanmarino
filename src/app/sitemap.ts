import type { MetadataRoute } from "next";
import { canonicalSiteUrl } from "@/content/ai-answer-content";
import { localSeoPages, seoLandingSlugs } from "@/content/commercial-content";
import { roomCatalog } from "@/content/room-catalog";

type SitemapEntry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const now = new Date();

const staticRoutes: SitemapEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/habitaciones", changeFrequency: "weekly", priority: 0.9 },
  { path: "/planes", changeFrequency: "weekly", priority: 0.82 },
  { path: "/vive-tumaco", changeFrequency: "monthly", priority: 0.86 },
  { path: "/servicios", changeFrequency: "monthly", priority: 0.84 },
  { path: "/galeria", changeFrequency: "monthly", priority: 0.62 },
  { path: "/nosotros", changeFrequency: "monthly", priority: 0.58 },
  { path: "/ubicacion", changeFrequency: "monthly", priority: 0.78 },
  { path: "/contacto", changeFrequency: "weekly", priority: 0.9 },
  { path: "/preguntas-frecuentes", changeFrequency: "weekly", priority: 0.88 },
  { path: "/datos-del-hotel", changeFrequency: "weekly", priority: 0.84 },
  { path: "/ai-answers.json", changeFrequency: "weekly", priority: 0.48 },
];

const localLandingRoutes: SitemapEntry[] = seoLandingSlugs.map((slug) => ({
  path: `/${localSeoPages[slug].slug}`,
  changeFrequency: "monthly",
  priority: 0.78,
}));

const roomRoutes: SitemapEntry[] = roomCatalog.map((room) => ({
  path: `/habitaciones/${room.slug}`,
  changeFrequency: "monthly",
  priority: 0.66,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...localLandingRoutes, ...roomRoutes].map((entry) => ({
    url: new URL(entry.path, canonicalSiteUrl).toString(),
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
