import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AdminSummary {
  roomsCount: number;
  featuredRooms: number;
  plansCount: number;
  testimonialsCount: number;
  supabaseConfigured: boolean;
  warnings: string[];
}

export async function getAdminSummary(): Promise<AdminSummary> {
  if (!isSupabaseConfigured()) {
    return {
      roomsCount: 0,
      featuredRooms: 0,
      plansCount: 0,
      testimonialsCount: 0,
      supabaseConfigured: false,
      warnings: [
        "Supabase is not configured. Admin data cannot be trusted until the database is connected.",
      ],
    };
  }

  const supabase = await createSupabaseServerClient();
  const [rooms, featuredRooms, plans, testimonials] = await Promise.all([
    supabase.from("rooms").select("*", { count: "exact", head: true }),
    supabase
      .from("rooms")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase.from("plans").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
  ]);

  const warnings = [
    rooms.error?.message,
    featuredRooms.error?.message,
    plans.error?.message,
    testimonials.error?.message,
  ].filter(Boolean) as string[];

  return {
    roomsCount: rooms.count ?? 0,
    featuredRooms: featuredRooms.count ?? 0,
    plansCount: plans.count ?? 0,
    testimonialsCount: testimonials.count ?? 0,
    supabaseConfigured: true,
    warnings,
  };
}
