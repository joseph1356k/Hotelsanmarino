import {
  fallbackContactInfo,
  fallbackHomeSections,
  fallbackPlans,
  fallbackRooms,
  fallbackSiteSettings,
  fallbackTestimonials,
  fallbackWhatsappCtas,
} from "@/content/fallbacks";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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

export async function getPublicSiteContent(): Promise<PublicSiteContent> {
  if (!isSupabaseConfigured()) {
    return {
      siteSettings: fallbackSiteSettings,
      contactInfo: fallbackContactInfo,
      whatsappCtas: fallbackWhatsappCtas,
      homeSections: fallbackHomeSections,
      rooms: fallbackRooms,
      plans: fallbackPlans,
      testimonials: fallbackTestimonials,
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const [siteSettingsResult, contactResult, ctasResult, homeResult, roomsResult, plansResult, testimonialsResult] =
      await Promise.all([
        supabase.from("site_settings").select("*").eq("id", "default").single(),
        supabase.from("contact_info").select("*").eq("id", "default").single(),
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

    const rooms =
      roomsResult.data?.map((room) => ({
        ...room,
        images: room.room_images ?? [],
        amenities:
          room.room_amenities?.flatMap(
            (entry: { amenities: unknown[] | null }) => entry.amenities ?? [],
          ) ?? [],
      })) ?? fallbackRooms;

    return {
      siteSettings: (siteSettingsResult.data as SiteSettings | null) ?? fallbackSiteSettings,
      contactInfo: (contactResult.data as ContactInfo | null) ?? fallbackContactInfo,
      whatsappCtas: (ctasResult.data as WhatsappCta[] | null) ?? fallbackWhatsappCtas,
      homeSections: (homeResult.data as HomeSection[] | null) ?? fallbackHomeSections,
      rooms: rooms as RoomWithRelations[],
      plans: (plansResult.data as Plan[] | null) ?? fallbackPlans,
      testimonials:
        (testimonialsResult.data as Testimonial[] | null) ?? fallbackTestimonials,
    };
  } catch {
    return {
      siteSettings: fallbackSiteSettings,
      contactInfo: fallbackContactInfo,
      whatsappCtas: fallbackWhatsappCtas,
      homeSections: fallbackHomeSections,
      rooms: fallbackRooms,
      plans: fallbackPlans,
      testimonials: fallbackTestimonials,
    };
  }
}

export async function getRoomBySlug(slug: string) {
  const content = await getPublicSiteContent();
  return content.rooms.find((room) => room.slug === slug) ?? null;
}
