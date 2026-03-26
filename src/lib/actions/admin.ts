"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { buildRoomStoragePath } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import {
  contactInfoMutationSchema,
  homeSectionMutationSchema,
  planMutationSchema,
  roomMutationSchema,
  siteSettingsMutationSchema,
  testimonialMutationSchema,
  whatsappCtaMutationSchema,
} from "@/lib/validations/domain";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNullableString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value.length > 0 ? value : null;
}

function getNumber(formData: FormData, key: string) {
  return Number(formData.get(key) ?? 0);
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function getStringArray(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((value) => String(value))
    .filter(Boolean);
}

function adminRedirect(path: string, type: "notice" | "error", message: string): never {
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

function revalidatePublicRoutes(roomSlug?: string) {
  revalidatePath("/");
  revalidatePath("/habitaciones");
  revalidatePath("/planes");
  revalidatePath("/contacto");
  revalidatePath("/galeria");
  revalidatePath("/ubicacion");

  if (roomSlug) {
    revalidatePath(`/habitaciones/${roomSlug}`);
  }
}

async function uploadRoomFiles(roomId: string, formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const files = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (files.length === 0) {
    return;
  }

  const { data: existingPrimary } = await adminClient
    .from("room_images")
    .select("id")
    .eq("room_id", roomId)
    .eq("is_primary", true)
    .maybeSingle();
  const { data: existingImages } = await adminClient
    .from("room_images")
    .select("display_order")
    .eq("room_id", roomId)
    .order("display_order", { ascending: false })
    .limit(1);

  const shouldForcePrimary = getBoolean(formData, "set_first_as_primary");
  const currentMaxOrder = existingImages?.[0]?.display_order ?? 0;

  for (const [index, file] of files.entries()) {
    const storagePath = buildRoomStoragePath(roomId, file.name);
    const { error: uploadError } = await adminClient.storage
      .from("hotel-media")
      .upload(storagePath, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: asset, error: assetError } = await adminClient
      .from("media_assets")
      .insert({
        entity_type: "room",
        entity_id: roomId,
        bucket: "hotel-media",
        storage_path: storagePath,
        mime_type: file.type || null,
        alt_text: file.name,
      })
      .select("id")
      .single();

    if (assetError) {
      throw new Error(assetError.message);
    }

    const isPrimary = Boolean(
      (shouldForcePrimary && index === 0) || (!existingPrimary && index === 0),
    );

    if (isPrimary) {
      await adminClient
        .from("room_images")
        .update({ is_primary: false })
        .eq("room_id", roomId);
    }

    const { error: roomImageError } = await adminClient.from("room_images").insert({
      room_id: roomId,
      asset_id: asset.id,
      storage_path: storagePath,
      alt_text: file.name,
      is_primary: isPrimary,
      display_order: currentMaxOrder + index + 1,
    });

    if (roomImageError) {
      throw new Error(roomImageError.message);
    }

    if (isPrimary) {
      await adminClient
        .from("rooms")
        .update({ primary_image: storagePath })
        .eq("id", roomId);
    }
  }
}

export async function createRoomAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();

  const parsed = roomMutationSchema.safeParse({
    name: getString(formData, "name"),
    slug: slugify(getString(formData, "slug") || getString(formData, "name")),
    short_description: getString(formData, "short_description"),
    long_description: getString(formData, "long_description"),
    price: getNumber(formData, "price"),
    capacity: getNumber(formData, "capacity"),
    status: getString(formData, "status"),
    is_featured: getBoolean(formData, "is_featured"),
    display_order: getNumber(formData, "display_order"),
    seo_title: getNullableString(formData, "seo_title"),
    seo_description: getNullableString(formData, "seo_description"),
    amenity_ids: getStringArray(formData, "amenity_ids"),
  });

  if (!parsed.success) {
    adminRedirect(
      "/admin/habitaciones/nueva",
      "error",
      parsed.error.issues[0]?.message ?? "Datos invalidos.",
    );
  }

  const { amenity_ids, ...roomInput } = parsed.data;

  const { data: room, error } = await adminClient
    .from("rooms")
    .insert(roomInput)
    .select("id")
    .single();

  if (error || !room) {
    adminRedirect("/admin/habitaciones/nueva", "error", error?.message ?? "No se pudo crear la habitacion.");
  }

  if (amenity_ids.length > 0) {
    const { error: relationError } = await adminClient.from("room_amenities").insert(
      amenity_ids.map((amenityId) => ({
        room_id: room.id,
        amenity_id: amenityId,
      })),
    );

    if (relationError) {
      adminRedirect(`/admin/habitaciones/${room.id}`, "error", relationError.message);
    }
  }

  try {
    await uploadRoomFiles(room.id, formData);
  } catch (error) {
    adminRedirect(
      `/admin/habitaciones/${room.id}`,
      "error",
      error instanceof Error ? error.message : "No se pudieron subir las imagenes.",
    );
  }
  revalidatePublicRoutes(parsed.data.slug);
  revalidatePath("/admin/habitaciones");
  redirect(`/admin/habitaciones/${room.id}?notice=${encodeURIComponent("Habitacion creada.")}`);
}

export async function updateRoomAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const roomId = getString(formData, "room_id");

  const parsed = roomMutationSchema.safeParse({
    name: getString(formData, "name"),
    slug: slugify(getString(formData, "slug") || getString(formData, "name")),
    short_description: getString(formData, "short_description"),
    long_description: getString(formData, "long_description"),
    price: getNumber(formData, "price"),
    capacity: getNumber(formData, "capacity"),
    status: getString(formData, "status"),
    is_featured: getBoolean(formData, "is_featured"),
    display_order: getNumber(formData, "display_order"),
    seo_title: getNullableString(formData, "seo_title"),
    seo_description: getNullableString(formData, "seo_description"),
    amenity_ids: getStringArray(formData, "amenity_ids"),
  });

  if (!parsed.success) {
    adminRedirect(
      `/admin/habitaciones/${roomId}`,
      "error",
      parsed.error.issues[0]?.message ?? "Datos invalidos.",
    );
  }

  const { amenity_ids, ...roomInput } = parsed.data;
  const { error } = await adminClient.from("rooms").update(roomInput).eq("id", roomId);

  if (error) {
    adminRedirect(`/admin/habitaciones/${roomId}`, "error", error.message);
  }

  await adminClient.from("room_amenities").delete().eq("room_id", roomId);

  if (amenity_ids.length > 0) {
    const { error: relationError } = await adminClient.from("room_amenities").insert(
      amenity_ids.map((amenityId) => ({
        room_id: roomId,
        amenity_id: amenityId,
      })),
    );

    if (relationError) {
      adminRedirect(`/admin/habitaciones/${roomId}`, "error", relationError.message);
    }
  }

  try {
    await uploadRoomFiles(roomId, formData);
  } catch (error) {
    adminRedirect(
      `/admin/habitaciones/${roomId}`,
      "error",
      error instanceof Error ? error.message : "No se pudieron subir las imagenes.",
    );
  }
  revalidatePublicRoutes(parsed.data.slug);
  revalidatePath("/admin/habitaciones");
  adminRedirect(`/admin/habitaciones/${roomId}`, "notice", "Habitacion actualizada.");
}

export async function deleteRoomAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const roomId = getString(formData, "room_id");
  const roomSlug = getString(formData, "room_slug");

  const { data: roomAssets } = await adminClient
    .from("media_assets")
    .select("id, storage_path")
    .eq("entity_type", "room")
    .eq("entity_id", roomId);

  for (const asset of roomAssets ?? []) {
    if (asset.storage_path) {
      await adminClient.storage.from("hotel-media").remove([asset.storage_path]);
    }
  }

  await adminClient.from("media_assets").delete().eq("entity_type", "room").eq("entity_id", roomId);
  await adminClient.from("rooms").delete().eq("id", roomId);

  revalidatePublicRoutes(roomSlug);
  revalidatePath("/admin/habitaciones");
  adminRedirect("/admin/habitaciones", "notice", "Habitacion eliminada.");
}

export async function setRoomPrimaryImageAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const roomId = getString(formData, "room_id");
  const imageId = getString(formData, "image_id");
  const storagePath = getString(formData, "storage_path");

  await adminClient.from("room_images").update({ is_primary: false }).eq("room_id", roomId);
  await adminClient.from("room_images").update({ is_primary: true }).eq("id", imageId);
  await adminClient.from("rooms").update({ primary_image: storagePath }).eq("id", roomId);

  revalidatePath(`/admin/habitaciones/${roomId}`);
  adminRedirect(`/admin/habitaciones/${roomId}`, "notice", "Imagen principal actualizada.");
}

export async function deleteRoomImageAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const roomId = getString(formData, "room_id");
  const imageId = getString(formData, "image_id");
  const assetId = getString(formData, "asset_id");
  const storagePath = getString(formData, "storage_path");
  const isPrimary = getBoolean(formData, "is_primary");

  if (storagePath) {
    await adminClient.storage.from("hotel-media").remove([storagePath]);
  }

  await adminClient.from("room_images").delete().eq("id", imageId);

  if (assetId) {
    await adminClient.from("media_assets").delete().eq("id", assetId);
  }

  if (isPrimary) {
    const { data: nextImage } = await adminClient
      .from("room_images")
      .select("id, storage_path")
      .eq("room_id", roomId)
      .order("display_order")
      .maybeSingle();

    if (nextImage) {
      await adminClient.from("room_images").update({ is_primary: true }).eq("id", nextImage.id);
      await adminClient
        .from("rooms")
        .update({ primary_image: nextImage.storage_path })
        .eq("id", roomId);
    } else {
      await adminClient.from("rooms").update({ primary_image: null }).eq("id", roomId);
    }
  }

  revalidatePath(`/admin/habitaciones/${roomId}`);
  adminRedirect(`/admin/habitaciones/${roomId}`, "notice", "Imagen eliminada.");
}

export async function createPlanAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();

  const parsed = planMutationSchema.safeParse({
    name: getString(formData, "name"),
    slug: slugify(getString(formData, "slug") || getString(formData, "name")),
    short_description: getString(formData, "short_description"),
    long_description: getString(formData, "long_description"),
    price_label: getNullableString(formData, "price_label"),
    is_featured: getBoolean(formData, "is_featured"),
    display_order: getNumber(formData, "display_order"),
    image_path: getNullableString(formData, "image_path"),
    status: getString(formData, "status"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/planes", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  const { error } = await adminClient.from("plans").insert(parsed.data);

  if (error) {
    adminRedirect("/admin/planes", "error", error.message);
  }

  revalidatePath("/admin/planes");
  revalidatePath("/planes");
  adminRedirect("/admin/planes", "notice", "Plan creado.");
}

export async function updatePlanAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const planId = getString(formData, "plan_id");

  const parsed = planMutationSchema.safeParse({
    name: getString(formData, "name"),
    slug: slugify(getString(formData, "slug") || getString(formData, "name")),
    short_description: getString(formData, "short_description"),
    long_description: getString(formData, "long_description"),
    price_label: getNullableString(formData, "price_label"),
    is_featured: getBoolean(formData, "is_featured"),
    display_order: getNumber(formData, "display_order"),
    image_path: getNullableString(formData, "image_path"),
    status: getString(formData, "status"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/planes", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  const { error } = await adminClient.from("plans").update(parsed.data).eq("id", planId);

  if (error) {
    adminRedirect("/admin/planes", "error", error.message);
  }

  revalidatePath("/admin/planes");
  revalidatePath("/planes");
  adminRedirect("/admin/planes", "notice", "Plan actualizado.");
}

export async function deletePlanAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const planId = getString(formData, "plan_id");

  await adminClient.from("plans").delete().eq("id", planId);
  revalidatePath("/admin/planes");
  revalidatePath("/planes");
  adminRedirect("/admin/planes", "notice", "Plan eliminado.");
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();

  const parsed = testimonialMutationSchema.safeParse({
    guest_name: getString(formData, "guest_name"),
    guest_origin: getNullableString(formData, "guest_origin"),
    quote: getString(formData, "quote"),
    rating: getNumber(formData, "rating"),
    is_featured: getBoolean(formData, "is_featured"),
    display_order: getNumber(formData, "display_order"),
    status: getString(formData, "status"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/testimonios", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  const { error } = await adminClient.from("testimonials").insert(parsed.data);

  if (error) {
    adminRedirect("/admin/testimonios", "error", error.message);
  }

  revalidatePath("/admin/testimonios");
  adminRedirect("/admin/testimonios", "notice", "Testimonio creado.");
}

export async function updateTestimonialAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const testimonialId = getString(formData, "testimonial_id");

  const parsed = testimonialMutationSchema.safeParse({
    guest_name: getString(formData, "guest_name"),
    guest_origin: getNullableString(formData, "guest_origin"),
    quote: getString(formData, "quote"),
    rating: getNumber(formData, "rating"),
    is_featured: getBoolean(formData, "is_featured"),
    display_order: getNumber(formData, "display_order"),
    status: getString(formData, "status"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/testimonios", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  const { error } = await adminClient
    .from("testimonials")
    .update(parsed.data)
    .eq("id", testimonialId);

  if (error) {
    adminRedirect("/admin/testimonios", "error", error.message);
  }

  revalidatePath("/admin/testimonios");
  adminRedirect("/admin/testimonios", "notice", "Testimonio actualizado.");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const testimonialId = getString(formData, "testimonial_id");

  await adminClient.from("testimonials").delete().eq("id", testimonialId);
  revalidatePath("/admin/testimonios");
  adminRedirect("/admin/testimonios", "notice", "Testimonio eliminado.");
}

export async function updateHomeSectionAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();

  const parsed = homeSectionMutationSchema.safeParse({
    id: getString(formData, "id"),
    title: getString(formData, "title"),
    subtitle: getNullableString(formData, "subtitle"),
    body: getNullableString(formData, "body"),
    status: getString(formData, "status"),
    display_order: getNumber(formData, "display_order"),
    payload_json: getString(formData, "payload_json"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/home", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(parsed.data.payload_json);
  } catch {
    adminRedirect("/admin/home", "error", "Payload JSON invalido.");
  }

  const { error } = await adminClient
    .from("home_sections")
    .update({
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      body: parsed.data.body,
      status: parsed.data.status,
      display_order: parsed.data.display_order,
      payload,
    })
    .eq("id", parsed.data.id);

  if (error) {
    adminRedirect("/admin/home", "error", error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/home");
  adminRedirect("/admin/home", "notice", "Seccion del home actualizada.");
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();

  const parsed = siteSettingsMutationSchema.safeParse({
    site_name: getString(formData, "site_name"),
    site_tagline: getString(formData, "site_tagline"),
    seo_title: getNullableString(formData, "seo_title"),
    seo_description: getNullableString(formData, "seo_description"),
    logo_path: getNullableString(formData, "logo_path"),
    default_share_image: getNullableString(formData, "default_share_image"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/configuracion", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  const { error } = await adminClient
    .from("site_settings")
    .update(parsed.data)
    .eq("id", "default");

  if (error) {
    adminRedirect("/admin/configuracion", "error", error.message);
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/configuracion");
  adminRedirect("/admin/configuracion", "notice", "Configuracion actualizada.");
}

export async function updateContactInfoAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();

  const parsed = contactInfoMutationSchema.safeParse({
    phone: getString(formData, "phone"),
    whatsapp_number: getString(formData, "whatsapp_number"),
    whatsapp_default_message: getString(formData, "whatsapp_default_message"),
    address: getString(formData, "address"),
    city: getString(formData, "city"),
    maps_embed_url: getNullableString(formData, "maps_embed_url"),
    email: getNullableString(formData, "email"),
    check_in_time: getNullableString(formData, "check_in_time"),
    check_out_time: getNullableString(formData, "check_out_time"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/contacto", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  const { error } = await adminClient
    .from("contact_info")
    .update(parsed.data)
    .eq("id", "default");

  if (error) {
    adminRedirect("/admin/contacto", "error", error.message);
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/contacto");
  adminRedirect("/admin/contacto", "notice", "Informacion de contacto actualizada.");
}

export async function createWhatsappCtaAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();

  const parsed = whatsappCtaMutationSchema.safeParse({
    key: slugify(getString(formData, "key")),
    label: getString(formData, "label"),
    message: getString(formData, "message"),
    phone_number: getString(formData, "phone_number"),
    is_primary: getBoolean(formData, "is_primary"),
    display_order: getNumber(formData, "display_order"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/contacto", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  if (parsed.data.is_primary) {
    await adminClient.from("whatsapp_ctas").update({ is_primary: false }).neq("id", "");
  }

  const { error } = await adminClient.from("whatsapp_ctas").insert(parsed.data);

  if (error) {
    adminRedirect("/admin/contacto", "error", error.message);
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/contacto");
  adminRedirect("/admin/contacto", "notice", "CTA de WhatsApp creado.");
}

export async function updateWhatsappCtaAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const ctaId = getString(formData, "cta_id");

  const parsed = whatsappCtaMutationSchema.safeParse({
    key: slugify(getString(formData, "key")),
    label: getString(formData, "label"),
    message: getString(formData, "message"),
    phone_number: getString(formData, "phone_number"),
    is_primary: getBoolean(formData, "is_primary"),
    display_order: getNumber(formData, "display_order"),
  });

  if (!parsed.success) {
    adminRedirect("/admin/contacto", "error", parsed.error.issues[0]?.message ?? "Datos invalidos.");
  }

  if (parsed.data.is_primary) {
    await adminClient.from("whatsapp_ctas").update({ is_primary: false }).neq("id", ctaId);
  }

  const { error } = await adminClient
    .from("whatsapp_ctas")
    .update(parsed.data)
    .eq("id", ctaId);

  if (error) {
    adminRedirect("/admin/contacto", "error", error.message);
  }

  revalidatePublicRoutes();
  revalidatePath("/admin/contacto");
  adminRedirect("/admin/contacto", "notice", "CTA de WhatsApp actualizado.");
}

export async function deleteWhatsappCtaAction(formData: FormData) {
  await requireAdmin();
  const adminClient = createSupabaseAdminClient();
  const ctaId = getString(formData, "cta_id");

  const { count } = await adminClient
    .from("whatsapp_ctas")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) <= 1) {
    adminRedirect("/admin/contacto", "error", "Debe existir al menos un CTA de WhatsApp.");
  }

  await adminClient.from("whatsapp_ctas").delete().eq("id", ctaId);
  revalidatePublicRoutes();
  revalidatePath("/admin/contacto");
  adminRedirect("/admin/contacto", "notice", "CTA de WhatsApp eliminado.");
}
