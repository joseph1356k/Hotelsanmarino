import { z } from "zod";

export const roomStatusSchema = z.enum(["available", "maintenance", "hidden"]);
export const entityStatusSchema = z.enum(["draft", "published", "archived"]);
export const uuidSchema = z.uuid();
export const isoDateSchema = z.string().datetime({ offset: true }).or(z.string().min(1));

export const roomSchema = z.object({
  id: uuidSchema,
  name: z.string().min(3).max(120),
  slug: z.string().min(3).max(160),
  short_description: z.string().min(10).max(280),
  long_description: z.string().min(20),
  price: z.number().int().nonnegative(),
  capacity: z.number().int().min(1).max(12),
  status: roomStatusSchema,
  is_featured: z.boolean(),
  display_order: z.number().int().nonnegative(),
  primary_image: z.string().nullable(),
  seo_title: z.string().max(160).nullable(),
  seo_description: z.string().max(200).nullable(),
  created_at: isoDateSchema,
  updated_at: isoDateSchema,
});

export const roomImageSchema = z.object({
  id: uuidSchema,
  room_id: uuidSchema,
  asset_id: uuidSchema.nullable(),
  storage_path: z.string().nullable(),
  alt_text: z.string().nullable(),
  is_primary: z.boolean(),
  display_order: z.number().int().nonnegative(),
  created_at: isoDateSchema,
});

export const amenitySchema = z.object({
  id: uuidSchema,
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120),
  icon_name: z.string().nullable(),
  display_order: z.number().int().nonnegative(),
  created_at: isoDateSchema,
});

export const siteSettingsSchema = z.object({
  id: z.literal("default"),
  site_name: z.string().min(3).max(140),
  site_tagline: z.string().min(3).max(220),
  seo_title: z.string().max(160).nullable(),
  seo_description: z.string().max(200).nullable(),
  logo_path: z.string().nullable(),
  default_share_image: z.string().nullable(),
  created_at: isoDateSchema,
  updated_at: isoDateSchema,
});

export const contactInfoSchema = z.object({
  id: z.literal("default"),
  phone: z.string().min(7).max(40),
  whatsapp_number: z.string().min(7).max(40),
  whatsapp_default_message: z.string().min(3).max(500),
  address: z.string().min(3).max(280),
  city: z.string().min(2).max(120),
  maps_embed_url: z.string().nullable(),
  email: z.string().nullable(),
  check_in_time: z.string().nullable(),
  check_out_time: z.string().nullable(),
  created_at: isoDateSchema,
  updated_at: isoDateSchema,
});

export const whatsappCtaSchema = z.object({
  id: uuidSchema,
  key: z.string().min(2).max(80),
  label: z.string().min(2).max(120),
  message: z.string().min(3).max(500),
  phone_number: z.string().min(7).max(40),
  is_primary: z.boolean(),
  display_order: z.number().int().nonnegative(),
  created_at: isoDateSchema,
  updated_at: isoDateSchema,
});

export const homeSectionSchema = z.object({
  id: uuidSchema,
  key: z.string().min(2).max(80),
  title: z.string().min(2).max(160),
  subtitle: z.string().max(220).nullable(),
  body: z.string().nullable(),
  payload: z.record(z.string(), z.unknown()),
  status: entityStatusSchema,
  display_order: z.number().int().nonnegative(),
  created_at: isoDateSchema,
  updated_at: isoDateSchema,
});

export const planSchema = z.object({
  id: uuidSchema,
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120),
  short_description: z.string().min(10).max(280),
  long_description: z.string().min(20),
  price_label: z.string().nullable(),
  is_featured: z.boolean(),
  display_order: z.number().int().nonnegative(),
  image_path: z.string().nullable(),
  status: entityStatusSchema,
  created_at: isoDateSchema,
  updated_at: isoDateSchema,
});

export const testimonialSchema = z.object({
  id: uuidSchema,
  guest_name: z.string().min(2).max(140),
  guest_origin: z.string().max(140).nullable(),
  quote: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5),
  is_featured: z.boolean(),
  display_order: z.number().int().nonnegative(),
  status: entityStatusSchema,
  created_at: isoDateSchema,
  updated_at: isoDateSchema,
});

export const roomMutationSchema = z.object({
  name: z.string().min(3).max(120),
  slug: z.string().min(3).max(160),
  short_description: z.string().min(10).max(280),
  long_description: z.string().min(20),
  price: z.number().int().nonnegative(),
  capacity: z.number().int().min(1).max(12),
  status: roomStatusSchema,
  is_featured: z.boolean(),
  display_order: z.number().int().nonnegative(),
  seo_title: z.string().max(160).nullable(),
  seo_description: z.string().max(200).nullable(),
  amenity_ids: z.array(uuidSchema),
});

export const planMutationSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120),
  short_description: z.string().min(10).max(280),
  long_description: z.string().min(20),
  price_label: z.string().max(120).nullable(),
  is_featured: z.boolean(),
  display_order: z.number().int().nonnegative(),
  image_path: z.string().nullable(),
  status: entityStatusSchema,
});

export const testimonialMutationSchema = z.object({
  guest_name: z.string().min(2).max(140),
  guest_origin: z.string().max(140).nullable(),
  quote: z.string().min(10).max(1000),
  rating: z.number().int().min(1).max(5),
  is_featured: z.boolean(),
  display_order: z.number().int().nonnegative(),
  status: entityStatusSchema,
});

export const homeSectionMutationSchema = z.object({
  id: uuidSchema,
  title: z.string().min(2).max(160),
  subtitle: z.string().max(220).nullable(),
  body: z.string().nullable(),
  status: entityStatusSchema,
  display_order: z.number().int().nonnegative(),
  payload_json: z.string().min(2),
});

export const siteSettingsMutationSchema = z.object({
  site_name: z.string().min(3).max(140),
  site_tagline: z.string().min(3).max(220),
  seo_title: z.string().max(160).nullable(),
  seo_description: z.string().max(200).nullable(),
  logo_path: z.string().nullable(),
  default_share_image: z.string().nullable(),
});

export const contactInfoMutationSchema = z.object({
  phone: z.string().min(7).max(40),
  whatsapp_number: z.string().min(7).max(40),
  whatsapp_default_message: z.string().min(3).max(500),
  address: z.string().min(3).max(280),
  city: z.string().min(2).max(120),
  maps_embed_url: z.string().nullable(),
  email: z.string().nullable(),
  check_in_time: z.string().nullable(),
  check_out_time: z.string().nullable(),
});

export const whatsappCtaMutationSchema = z.object({
  key: z.string().min(2).max(80),
  label: z.string().min(2).max(120),
  message: z.string().min(3).max(500),
  phone_number: z.string().min(7).max(40),
  is_primary: z.boolean(),
  display_order: z.number().int().nonnegative(),
});
