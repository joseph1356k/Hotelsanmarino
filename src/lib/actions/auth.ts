"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { adminLoginSchema } from "@/lib/validations/admin-auth";

export interface AuthActionState {
  error?: string;
}

export async function signInAdmin(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Configura las variables de entorno de Supabase para habilitar el login admin.",
    };
  }

  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Credenciales inválidas." };
  }

  const supabase = await createSupabaseServerClient();
  const { error: signInError, data } = await supabase.auth.signInWithPassword(
    parsed.data,
  );

  if (signInError || !data.user) {
    return { error: "No fue posible iniciar sesión con esas credenciales." };
  }

  const { data: adminProfile } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", data.user.id)
    .single();

  if (!adminProfile) {
    await supabase.auth.signOut();
    return { error: "El usuario autenticado no está autorizado como admin." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}
