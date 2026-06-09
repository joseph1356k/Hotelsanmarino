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
    name: "Escapada al Morro",
    slug: "escapada-al-morro",
    short_description: "Una salida corta para dormir en El Morro y moverte fácil por Tumaco.",
    long_description:
      "Incluye orientación para elegir habitación, desayuno, piscina y recomendaciones para vivir El Morro con más calma.",
    price_label: "Consulta por WhatsApp",
    is_featured: true,
    display_order: 1,
    image_path: "/images/tumaco/arco-morro.jpg",
    status: "published",
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
  {
    id: "4d1ebd48-f570-4697-b564-f7bcbccb3158",
    name: "Tumaco en Pareja",
    slug: "tumaco-en-pareja",
    short_description: "Una estadía para dos con descanso, restaurante y detalles opcionales.",
    long_description:
      "Pensado para parejas que quieren una habitación cómoda, una experiencia más cuidada y reserva directa sin vueltas.",
    price_label: "Consulta por WhatsApp",
    is_featured: false,
    display_order: 2,
    image_path: "/images/rooms-demo/hotel-wood-king.jpg",
    status: "published",
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
  {
    id: "9313788f-89e7-4ce4-99f8-fbdf498cc418",
    name: "Pacífico en Familia",
    slug: "pacifico-en-familia",
    short_description: "Habitaciones por capacidad, piscina y comida cercana para viajar en familia.",
    long_description:
      "Una forma práctica de elegir habitación familiar, resolver desayuno o comidas dentro del hotel y disfrutar zonas comunes.",
    price_label: "Consulta por WhatsApp",
    is_featured: false,
    display_order: 3,
    image_path: "/images/rooms-demo/hotel-twin-03.jpg",
    status: "published",
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
  {
    id: "1503281b-9166-48d5-b8d6-8cbf8f3ad945",
    name: "Sabor y Mar",
    slug: "sabor-y-mar",
    short_description: "Restaurante, costa y una estadía cómoda para vivir Tumaco con sabor local.",
    long_description:
      "Pensado para quienes quieren preguntar por el menú del día, quedarse cerca del mar y combinar descanso con gastronomía del Pacífico.",
    price_label: "Consulta por WhatsApp",
    is_featured: false,
    display_order: 4,
    image_path: "/images/fallbacks/plan-fallback.jpg",
    status: "published",
    created_at: fallbackTimestamp,
    updated_at: fallbackTimestamp,
  },
];

export const devDefaultTestimonials: Testimonial[] = [
  {
    id: "4c4feb18-c263-4283-8186-b1f920a52fda",
    guest_name: "Huésped local",
    guest_origin: "Tumaco",
    quote:
      "La atención fue rápida y el hotel se siente bien ubicado para disfrutar El Morro con calma.",
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
    title: "El Morro se vive aquí",
    subtitle: "Cerca del mar, con atención directa y una forma más cómoda de quedarte en El Morro.",
    body:
      "Hospédate cerca del mar y descubre Tumaco desde una estadía cómoda, cálida y con sabor local.",
    payload: {
      eyebrow: "Hotel San Marino",
      ctaLabel: "Reservar por WhatsApp",
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
    subtitle: "Comodidad, capacidad y contexto para encontrar la opción que mejor te queda.",
    body:
      "Cada habitación muestra lo esencial para ayudarte a decidir con confianza antes de escribir al hotel.",
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
    "Hotel San Marino Tumaco: hotel en El Morro cerca al mar, con piscina, restaurante, parqueadero y reserva directa por WhatsApp.",
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
  address: "El Morro, Tumaco, Nariño",
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
