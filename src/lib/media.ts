import type { MediaEntityType } from "@/types/domain";

const entityFallbackMap: Record<MediaEntityType, string> = {
  room: "/images/fallbacks/room-fallback.jpg",
  plan: "/images/fallbacks/plan-fallback.jpg",
  testimonial: "/images/tumaco/arco-morro.jpg",
  home: "/images/tumaco/playa-morro.jpg",
  site: "/images/tumaco/tumaco-air.jpg",
  contact: "/images/tumaco/tumaco-air.jpg",
};

const legacyPlaceholderMap: Record<string, string> = {
  "/placeholders/room.svg": "/images/fallbacks/room-fallback.jpg",
  "/placeholders/plan.svg": "/images/fallbacks/plan-fallback.jpg",
  "/placeholders/site.svg": "/images/tumaco/tumaco-air.jpg",
  "/placeholders/gallery.svg": "/images/tumaco/playa-morro.jpg",
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
