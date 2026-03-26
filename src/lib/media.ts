import type { MediaEntityType } from "@/types/domain";

const entityFallbackMap: Record<MediaEntityType, string> = {
  room: "/placeholders/room.svg",
  plan: "/placeholders/plan.svg",
  testimonial: "/placeholders/site.svg",
  home: "/placeholders/site.svg",
  site: "/placeholders/site.svg",
  contact: "/placeholders/site.svg",
};

export function resolveEntityImage(
  entityType: MediaEntityType,
  explicitPath?: string | null,
) {
  return explicitPath ?? entityFallbackMap[entityType];
}
