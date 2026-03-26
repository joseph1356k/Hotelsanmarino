import {
  devDefaultContactInfo,
  devDefaultHomeSections,
  devDefaultPlans,
  devDefaultRooms,
  devDefaultSiteSettings,
  devDefaultTestimonials,
  devDefaultWhatsappCtas,
} from "@/content/dev-content";
import {
  contactInfoSchema,
  homeSectionSchema,
  planSchema,
  roomImageSchema,
  roomSchema,
  siteSettingsSchema,
  testimonialSchema,
  whatsappCtaSchema,
  amenitySchema,
} from "@/lib/validations/domain";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  assertOrThrow,
  ContentInfrastructureError,
  isDevelopmentContentFallbackEnabled,
  MissingContentError,
} from "@/lib/content/runtime";
import type {
  ContactInfo,
  HomeSection,
  Plan,
  RoomWithRelations,
  SiteSettings,
  Testimonial,
  WhatsappCta,
} from "@/types/domain";

export interface PublicSiteContent {
  siteSettings: SiteSettings;
  contactInfo: ContactInfo;
  whatsappCtas: WhatsappCta[];
  homeSections: HomeSection[];
  rooms: RoomWithRelations[];
  plans: Plan[];
  testimonials: Testimonial[];
}

function getDevDefaultContent(): PublicSiteContent {
  return {
    siteSettings: devDefaultSiteSettings,
    contactInfo: devDefaultContactInfo,
    whatsappCtas: devDefaultWhatsappCtas,
    homeSections: devDefaultHomeSections,
    rooms: devDefaultRooms,
    plans: devDefaultPlans,
    testimonials: devDefaultTestimonials,
  };
}

function shouldAllowDevFallback() {
  return isDevelopmentContentFallbackEnabled();
}

function handleDevelopmentFallback(error: Error): PublicSiteContent {
  if (!shouldAllowDevFallback()) {
    throw error;
  }

  return getDevDefaultContent();
}

function validateRooms(rawRooms: unknown[]): RoomWithRelations[] {
  return rawRooms.map((room) => {
    const parsedRoom = roomSchema.parse(room);
    const candidate = room as {
      room_images?: unknown[];
      room_amenities?: Array<{ amenities?: unknown[] | null }>;
    };

    const images = (candidate.room_images ?? []).map((item) =>
      roomImageSchema.parse(item),
    );

    const amenities = (candidate.room_amenities ?? [])
      .flatMap((entry) => {
        if (!entry.amenities) {
          return [];
        }

        return Array.isArray(entry.amenities) ? entry.amenities : [entry.amenities];
      })
      .map((item) => amenitySchema.parse(item));

    return {
      ...parsedRoom,
      images,
      amenities,
    };
  });
}

export async function getPublicSiteContent(): Promise<PublicSiteContent> {
  if (!isSupabaseConfigured()) {
    return handleDevelopmentFallback(
      new ContentInfrastructureError(
        "Supabase is not configured. Production must not serve editable content from local defaults.",
      ),
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const [
      siteSettingsResult,
      contactResult,
      ctasResult,
      homeResult,
      roomsResult,
      plansResult,
      testimonialsResult,
    ] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", "default").maybeSingle(),
      supabase.from("contact_info").select("*").eq("id", "default").maybeSingle(),
      supabase.from("whatsapp_ctas").select("*").order("display_order"),
      supabase
        .from("home_sections")
        .select("*")
        .eq("status", "published")
        .order("display_order"),
      supabase
        .from("rooms")
        .select("*, room_images(*), room_amenities(amenities(*))")
        .neq("status", "hidden")
        .order("display_order"),
      supabase
        .from("plans")
        .select("*")
        .eq("status", "published")
        .order("display_order"),
      supabase
        .from("testimonials")
        .select("*")
        .eq("status", "published")
        .order("display_order"),
    ]);

    const queryErrors = [
      siteSettingsResult.error,
      contactResult.error,
      ctasResult.error,
      homeResult.error,
      roomsResult.error,
      plansResult.error,
      testimonialsResult.error,
    ].filter(Boolean);

    if (queryErrors.length > 0) {
      throw new ContentInfrastructureError(
        `Supabase query failed for public content: ${queryErrors
          .map((error) => error?.message)
          .join(" | ")}`,
      );
    }

    assertOrThrow(
      siteSettingsResult.data,
      () =>
        new MissingContentError(
          "site_settings.default is required and missing from the database.",
        ),
    );
    assertOrThrow(
      contactResult.data,
      () =>
        new MissingContentError(
          "contact_info.default is required and missing from the database.",
        ),
    );
    assertOrThrow(
      (ctasResult.data ?? []).length > 0,
      () =>
        new MissingContentError(
          "At least one whatsapp_cta is required for the public site.",
        ),
    );
    assertOrThrow(
      (homeResult.data ?? []).length > 0,
      () =>
        new MissingContentError(
          "At least one published home_section is required for the public site.",
        ),
    );
    assertOrThrow(
      (homeResult.data ?? []).some((section) => section.key === "hero"),
      () =>
        new MissingContentError(
          "The published home_sections set must include a hero block.",
        ),
    );

    return {
      siteSettings: siteSettingsSchema.parse(siteSettingsResult.data),
      contactInfo: contactInfoSchema.parse(contactResult.data),
      whatsappCtas: whatsappCtaSchema.array().parse(ctasResult.data ?? []),
      homeSections: homeSectionSchema.array().parse(homeResult.data ?? []),
      rooms: validateRooms(roomsResult.data ?? []),
      plans: planSchema.array().parse(plansResult.data ?? []),
      testimonials: testimonialSchema.array().parse(testimonialsResult.data ?? []),
    };
  } catch (error) {
    if (
      error instanceof ContentInfrastructureError ||
      error instanceof MissingContentError
    ) {
      return handleDevelopmentFallback(error);
    }

    return handleDevelopmentFallback(
      new ContentInfrastructureError("Unexpected error while loading public content."),
    );
  }
}

export async function getRoomBySlug(slug: string) {
  const content = await getPublicSiteContent();
  return content.rooms.find((room) => room.slug === slug) ?? null;
}
