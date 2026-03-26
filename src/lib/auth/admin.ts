import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminUser } from "@/types/domain";

export async function getAdminUser(): Promise<AdminUser | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: adminProfile, error } = await supabase
    .from("admin_users")
    .select("id, email, full_name, role, created_at, updated_at")
    .eq("id", user.id)
    .single();

  if (error) {
    return null;
  }

  return (adminProfile as AdminUser | null) ?? null;
}

export async function requireAdmin() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
