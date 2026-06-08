import type {
  Amenity,
  ContactInfo,
  HomeSection,
  Plan,
  RoomWithRelations,
  SiteSettings,
  Testimonial,
  WhatsappCta,
} from "@/types/domain";
import { siteConfig } from "@/lib/constants/site";
import { roomCatalog } from "@/content/room-catalog";

const fallbackTimestamp = "2026-03-26T00:00:00.000Z";

function fallbackUuid(group: number, index: number, child = 0) {
  return `00000000-${String(group).padStart(4, "0")}-4000-8000-${String(
    index * 100 + child,
  ).padStart(12, "0")}`;
}

// Fallback defaults. Supabase remains the editable production source of truth.
export const devDefaultAmenities: Amenity[] = [
  {
    id: "c0f12625-6925-4f38-9916-56095ddce923",
    name: "Aire acondicionado",
    slug: "aire-acondicionado",
    icon_name: "snowflake",
    display_order: 1,
    created_at: fallbackTimestamp,
  },
  {
    id: "a0cad8d8-cc9b-4bcb-bd9f-a13f242bf3f1",
    name: "WiFi",
    slug: "wifi",
    icon_name: "wifi",
    display_order: 2,
    created_at: fallbackTimestamp,
  },
  {
    id: "c56c9c07-d790-4c58-bc6d-2eddb03d6f8a",
    name: "TV",
    slug: "tv",
    icon_name: "tv",
    display_order: 3,
    created_at: fallbackTimestamp,
  },
  {
    id: "f4e0ab09-f9ab-4f1a-9c6a-2b5d4b7ab101",
    name: "Bano privado",
    slug: "bano-privado",
    icon_name: "bath",
    display_order: 4,
    created_at: fallbackTimestamp,
  },
  {
    id: "cb0dfc11-eac1-4c06-b693-c9d315f7e4a1",
    name: "Ventilador",
    slug: "ventilador",
    icon_name: "fan",
    display_order: 5,
    created_at: fallbackTimestamp,
  },
];

function getFallbackRoomAmenities(climate: "ventilador" | "aire") {
  const climateSlug =
    climate === "aire" ? "aire-acondicionado" : "ventilador";

  return devDefaultAmenities.filter((amenity) =>
    ["wifi", "tv", "bano-privado", climateSlug].includes(amenity.slug),
  );
}

export const devDefaultRooms: RoomWithRelations[] = roomCatalog.map(
  (catalogRoom, index) => {
    const roomId = fallbackUuid(1, index + 1);
    const primaryImage =
      catalogRoom.images[0] ?? "/images/fallbacks/room-fallback.jpg";

    return {
      id: roomId,
      name: catalogRoom.name,
      slug: catalogRoom.slug,
      short_description: catalogRoom.summary,
      long_description: `${catalogRoom.description} ${catalogRoom.layoutNote}`,
      price: 0,
      capacity: catalogRoom.capacity,
      status: "available",
      is_featured: index < 4,
      display_order: index + 1,
      primary_image: primaryImage,
      seo_title: `${catalogRoom.name} | Hotel San Marino Tumaco`,
      seo_description: `${catalogRoom.name} en Hotel San Marino Tumaco.`,
      created_at: fallbackTimestamp,
      updated_at: fallbackTimestamp,
      images: catalogRoom.images.map((image, imageIndex) => ({
        id: fallbackUuid(2, index + 1, imageIndex + 1),
        room_id: roomId,
        asset_id: null,
        storage_path: image,
        alt_text: catalogRoom.name,
        is_primary: imageIndex === 0,
        display_order: imageIndex + 1,
        created_at: fallbackTimestamp,
      })),
      amenities: getFallbackRoomAmenities(catalogRoom.climate),
    };
  },
);

export const devDefaultPlans: Plan[] = [
  {
    id: "22b94f1c-2f6d-4a66-8180-85cb487663c6",
    name: "Plan Corporativo",
    slug: "plan-corporativo",
    short_description: "Una opcion comoda para viajes de trabajo con atencion directa y una estadia bien resuelta.",
    long_description:
      "Pensado para quienes viajan por trabajo y quieren resolver alojamiento, descanso y atencion sin perder tiempo.",
    price_label: "Desde $210.000 por noche",
    is_featured: true,
    display_order: 1,
    image_path: "/images/fallbacks/plan-fallback.jpg",
    status: "published",
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
  {
    id: "4d1ebd48-f570-4697-b564-f7bcbccb3158",
    name: "Plan Escapada",
    slug: "plan-escapada",
    short_description: "Una escapada corta para cambiar de ritmo y quedarte cerca del mar.",
    long_description:
      "Una opcion pensada para una salida breve, con una experiencia clara y la facilidad de resolver todo por WhatsApp.",
    price_label: "Consulta por WhatsApp",
    is_featured: false,
    display_order: 2,
    image_path: "/images/fallbacks/plan-fallback.jpg",
    status: "published",
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
];

export const devDefaultTestimonials: Testimonial[] = [
  {
    id: "4c4feb18-c263-4283-8186-b1f920a52fda",
    guest_name: "Huesped local",
    guest_origin: "Tumaco",
    quote:
      "La atencion fue rapida y el hotel se siente bien ubicado para disfrutar El Morro con calma.",
    rating: 5,
    is_featured: true,
    display_order: 1,
    status: "published",
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
];

export const devDefaultHomeSections: HomeSection[] = [
  {
    id: "1d0a6ffc-0b25-4b09-bc51-f9156c5d0ea6",
    key: "hero",
    title: "El Morro se vive aqui",
    subtitle: "Cerca del mar, con atencion directa y una forma mas comoda de quedarte en El Morro.",
    body:
      "Descubre una forma mas clara de quedarte en El Morro, con habitaciones bien presentadas y contacto directo con el hotel.",
    payload: {
      eyebrow: "Hotel San Marino",
      ctaLabel: "Consultar por WhatsApp",
    },
    status: "published",
    display_order: 1,
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
  {
    id: "8db85849-f64b-40bb-9aa5-4d7c253a1377",
    key: "featured_rooms",
    title: "Habitaciones para elegir con calma",
    subtitle: "Comodidad, capacidad y contexto para encontrar la opcion que mejor te queda.",
    body:
      "Cada habitacion muestra lo esencial para ayudarte a decidir con confianza antes de escribir al hotel.",
    payload: {},
    status: "published",
    display_order: 2,
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
];

export const devDefaultSiteSettings: SiteSettings = {
  id: "default",
  site_name: siteConfig.siteName,
  site_tagline: siteConfig.siteTagline,
  seo_title: "Hotel San Marino Tumaco",
  seo_description:
    "Hotel San Marino Tumaco: una forma clara y cercana de vivir El Morro con contacto directo por WhatsApp.",
  logo_path: null,
  default_share_image: "/images/fallbacks/site-fallback.jpg",
  created_at: fallbackTimestamp,
  updated_at: fallbackTimestamp,
};

export const devDefaultContactInfo: ContactInfo = {
  id: "default",
  phone: "+57 315 4974576",
  whatsapp_number: "+57 315 4974576",
  whatsapp_default_message: siteConfig.whatsappMessage,
  address: "Tumaco, Narino",
  city: "Tumaco",
  maps_embed_url: null,
  email: null,
  check_in_time: "15:00",
  check_out_time: "12:00",
  created_at: fallbackTimestamp,
  updated_at: fallbackTimestamp,
};

export const devDefaultWhatsappCtas: WhatsappCta[] = [
  {
    id: "d9a666fd-fd7f-4e76-97a7-386d3f132767",
    key: "primary",
    label: "Escribir por WhatsApp",
    message: siteConfig.whatsappMessage,
    phone_number: siteConfig.whatsappNumber,
    is_primary: true,
    display_order: 1,
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
];
