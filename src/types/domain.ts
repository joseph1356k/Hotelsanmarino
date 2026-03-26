export type EntityStatus = "draft" | "published" | "archived";
export type RoomAdminStatus = "available" | "maintenance" | "hidden";
export type MediaEntityType =
  | "room"
  | "plan"
  | "testimonial"
  | "home"
  | "site"
  | "contact";

export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin";
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  price: number;
  capacity: number;
  status: RoomAdminStatus;
  is_featured: boolean;
  display_order: number;
  primary_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoomImage {
  id: string;
  room_id: string;
  asset_id: string | null;
  storage_path: string | null;
  alt_text: string | null;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface Amenity {
  id: string;
  name: string;
  slug: string;
  icon_name: string | null;
  display_order: number;
  created_at: string;
}

export interface RoomAmenity {
  room_id: string;
  amenity_id: string;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  price_label: string | null;
  is_featured: boolean;
  display_order: number;
  image_path: string | null;
  status: EntityStatus;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  guest_name: string;
  guest_origin: string | null;
  quote: string;
  rating: number;
  is_featured: boolean;
  display_order: number;
  status: EntityStatus;
  created_at: string;
  updated_at: string;
}

export interface HomeSection {
  id: string;
  key: string;
  title: string;
  subtitle: string | null;
  body: string | null;
  payload: Record<string, unknown>;
  status: EntityStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  site_tagline: string;
  seo_title: string | null;
  seo_description: string | null;
  logo_path: string | null;
  default_share_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  phone: string;
  whatsapp_number: string;
  whatsapp_default_message: string;
  address: string;
  city: string;
  maps_embed_url: string | null;
  email: string | null;
  check_in_time: string | null;
  check_out_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  entity_type: MediaEntityType;
  entity_id: string | null;
  bucket: string;
  storage_path: string;
  mime_type: string | null;
  alt_text: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
  updated_at: string;
}

export interface WhatsappCta {
  id: string;
  key: string;
  label: string;
  message: string;
  phone_number: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface RoomWithRelations extends Room {
  images: RoomImage[];
  amenities: Amenity[];
}
