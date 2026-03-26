import { fallbackPlans, fallbackRooms, fallbackTestimonials } from "@/content/fallbacks";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AdminSummary {
  roomsCount: number;
  featuredRooms: number;
  plansCount: number;
  testimonialsCount: number;
  supabaseConfigured: boolean;
}

export async function getAdminSummary(): Promise<AdminSummary> {
  if (!isSupabaseConfigured()) {
    return {
      roomsCount: fallbackRooms.length,
      featuredRooms: fallbackRooms.filter((room) => room.is_featured).length,
      plansCount: fallbackPlans.length,
      testimonialsCount: fallbackTestimonials.length,
      supabaseConfigured: false,
    };
  }

  const supabase = await createSupabaseServerClient();
  const [rooms, featuredRooms, plans, testimonials] = await Promise.all([
    supabase.from("rooms").select("*", { count: "exact", head: true }),
    supabase.from("rooms").select("*", { count: "exact", head: true }).eq("is_featured", true),
    supabase.from("plans").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
  ]);

  return {
    roomsCount: rooms.count ?? 0,
    featuredRooms: featuredRooms.count ?? 0,
    plansCount: plans.count ?? 0,
    testimonialsCount: testimonials.count ?? 0,
    supabaseConfigured: true,
  };
}
