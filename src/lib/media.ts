import type { MediaEntityType } from "@/types/domain";

const entityFallbackMap: Record<MediaEntityType, string> = {
  room: "/images/fallbacks/room-fallback.jpg",
  plan: "/images/fallbacks/plan-fallback.jpg",
  testimonial: "/images/fallbacks/site-fallback.jpg",
  home: "/images/fallbacks/site-fallback.jpg",
  site: "/images/fallbacks/site-fallback.jpg",
  contact: "/images/fallbacks/site-fallback.jpg",
};

const legacyPlaceholderMap: Record<string, string> = {
  "/placeholders/room.svg": "/images/fallbacks/room-fallback.jpg",
  "/placeholders/plan.svg": "/images/fallbacks/plan-fallback.jpg",
  "/placeholders/site.svg": "/images/fallbacks/site-fallback.jpg",
  "/placeholders/gallery.svg": "/images/fallbacks/gallery-fallback.jpg",
};

export function resolveEntityImage(
  entityType: MediaEntityType,
  explicitPath?: string | null,
) {
  if (!explicitPath) {
    return entityFallbackMap[entityType];
  }

  return legacyPlaceholderMap[explicitPath] ?? explicitPath;
}
