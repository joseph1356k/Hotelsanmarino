import { z } from "zod";

export const roomStatusSchema = z.enum(["available", "maintenance", "hidden"]);
export const entityStatusSchema = z.enum(["draft", "published", "archived"]);

export const roomSchema = z.object({
  id: z.string().uuid(),
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
  created_at: z.string(),
  updated_at: z.string(),
});
