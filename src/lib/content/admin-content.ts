import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  Amenity,
  ContactInfo,
  HomeSection,
  Plan,
  Room,
  RoomImage,
  SiteSettings,
  Testimonial,
  WhatsappCta,
} from "@/types/domain";

export interface AdminSummary {
  roomsCount: number;
  featuredRooms: number;
  hiddenRooms: number;
  roomsMissingPrimaryImage: number;
  plansCount: number;
  testimonialsCount: number;
  publishedHomeSections: number;
  whatsappCtasCount: number;
  supabaseConfigured: boolean;
  warnings: string[];
}

export async function getAdminSummary(): Promise<AdminSummary> {
  if (!isSupabaseConfigured()) {
    return {
      roomsCount: 0,
      featuredRooms: 0,
      hiddenRooms: 0,
      roomsMissingPrimaryImage: 0,
      plansCount: 0,
      testimonialsCount: 0,
      publishedHomeSections: 0,
      whatsappCtasCount: 0,
      supabaseConfigured: false,
      warnings: [
        "Supabase is not configured. Admin data cannot be trusted until the database is connected.",
      ],
    };
  }

  const supabase = await createSupabaseServerClient();
  const [rooms, featuredRooms, hiddenRooms, roomsMissingPrimaryImage, plans, testimonials, publishedHomeSections, whatsappCtas] = await Promise.all([
    supabase.from("rooms").select("*", { count: "exact", head: true }),
    supabase
      .from("rooms")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase
      .from("rooms")
      .select("*", { count: "exact", head: true })
      .eq("status", "hidden"),
    supabase
      .from("rooms")
      .select("*", { count: "exact", head: true })
      .is("primary_image", null),
    supabase.from("plans").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase
      .from("home_sections")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("whatsapp_ctas").select("*", { count: "exact", head: true }),
  ]);

  const warnings = [
    rooms.error?.message,
    featuredRooms.error?.message,
    hiddenRooms.error?.message,
    roomsMissingPrimaryImage.error?.message,
    plans.error?.message,
    testimonials.error?.message,
    publishedHomeSections.error?.message,
    whatsappCtas.error?.message,
  ].filter(Boolean) as string[];

  return {
    roomsCount: rooms.count ?? 0,
    featuredRooms: featuredRooms.count ?? 0,
    hiddenRooms: hiddenRooms.count ?? 0,
    roomsMissingPrimaryImage: roomsMissingPrimaryImage.count ?? 0,
    plansCount: plans.count ?? 0,
    testimonialsCount: testimonials.count ?? 0,
    publishedHomeSections: publishedHomeSections.count ?? 0,
    whatsappCtasCount: whatsappCtas.count ?? 0,
    supabaseConfigured: true,
    warnings,
  };
}

export async function getAdminRooms() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("rooms")
    .select("*, room_images(count)")
    .order("display_order");

  return (data ?? []) as (Room & { room_images: { count: number }[] })[];
}

export async function getAdminRoomById(roomId: string) {
  const supabase = await createSupabaseServerClient();
  const [roomResult, amenitiesResult, roomImagesResult] = await Promise.all([
    supabase.from("rooms").select("*").eq("id", roomId).single(),
    supabase
      .from("room_amenities")
      .select("amenity_id")
      .eq("room_id", roomId),
    supabase
      .from("room_images")
      .select("*")
      .eq("room_id", roomId)
      .order("display_order"),
  ]);

  const room = roomResult.data as Room | null;
  const roomImages = (roomImagesResult.data ?? []) as RoomImage[];

  return {
    room,
    selectedAmenityIds: (amenitiesResult.data ?? []).map((item) => item.amenity_id),
    roomImages,
  };
}

export async function getAmenities() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("amenities").select("*").order("display_order");
  return (data ?? []) as Amenity[];
}

export async function getAdminPlans() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("plans").select("*").order("display_order");
  return (data ?? []) as Plan[];
}

export async function getAdminPlanById(planId: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("plans").select("*").eq("id", planId).single();
  return (data as Plan | null) ?? null;
}

export async function getAdminTestimonials() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order");
  return (data ?? []) as Testimonial[];
}

export async function getAdminTestimonialById(testimonialId: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", testimonialId)
    .single();
  return (data as Testimonial | null) ?? null;
}

export async function getAdminHomeSections() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("home_sections")
    .select("*")
    .order("display_order");
  return (data ?? []) as HomeSection[];
}

export async function getAdminSiteSettings() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "default")
    .single();
  return data as SiteSettings;
}

export async function getAdminContactInfo() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("contact_info")
    .select("*")
    .eq("id", "default")
    .single();
  return data as ContactInfo;
}

export async function getAdminWhatsappCtas() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("whatsapp_ctas")
    .select("*")
    .order("display_order");
  return (data ?? []) as WhatsappCta[];
}

export async function getAdminMediaAssets(entityType?: string, entityId?: string) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("media_assets").select("*").order("created_at", { ascending: false });

  if (entityType) {
    query = query.eq("entity_type", entityType);
  }

  if (entityId) {
    query = query.eq("entity_id", entityId);
  }

  const { data } = await query.limit(50);
  return data ?? [];
}
