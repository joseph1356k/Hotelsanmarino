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

export const fallbackAmenities: Amenity[] = [
  {
    id: "c0f12625-6925-4f38-9916-56095ddce923",
    name: "Aire acondicionado",
    slug: "aire-acondicionado",
    icon_name: "snowflake",
    display_order: 1,
    created_at: "2026-03-26T00:00:00.000Z",
  },
  {
    id: "a0cad8d8-cc9b-4bcb-bd9f-a13f242bf3f1",
    name: "WiFi",
    slug: "wifi",
    icon_name: "wifi",
    display_order: 2,
    created_at: "2026-03-26T00:00:00.000Z",
  },
  {
    id: "c56c9c07-d790-4c58-bc6d-2eddb03d6f8a",
    name: "TV",
    slug: "tv",
    icon_name: "tv",
    display_order: 3,
    created_at: "2026-03-26T00:00:00.000Z",
  },
];

export const fallbackRooms: RoomWithRelations[] = [
  {
    id: "4e3c9d4d-77f5-4fba-a521-4ca47b3405db",
    name: "Habitación Estándar",
    slug: "habitacion-estandar",
    short_description: "Solución operativa para viajeros que priorizan descanso y ubicación.",
    long_description:
      "Habitación provisional para la fase fundacional del sitio. La arquitectura queda preparada para sustituir textos, fotos y precio por data real desde admin sin tocar código.",
    price: 180000,
    capacity: 2,
    status: "available",
    is_featured: true,
    display_order: 1,
    primary_image: "/placeholders/room.svg",
    seo_title: "Habitación Estándar | Hotel San Marino Tumaco",
    seo_description: "Habitación base editable desde admin para la nueva arquitectura del sitio.",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
    images: [
      {
        id: "7ae36933-fcf4-4f8d-976b-b4ddb52e250f",
        room_id: "4e3c9d4d-77f5-4fba-a521-4ca47b3405db",
        asset_id: null,
        storage_path: "/placeholders/room.svg",
        alt_text: "Placeholder de habitación estándar",
        is_primary: true,
        display_order: 1,
        created_at: "2026-03-26T00:00:00.000Z",
      },
    ],
    amenities: fallbackAmenities.slice(0, 2),
  },
  {
    id: "6f8f059c-2f71-4960-901e-f5966521f5f2",
    name: "Habitación Familiar",
    slug: "habitacion-familiar",
    short_description: "Configuración provisional para grupos pequeños o familias.",
    long_description:
      "Preparada para crecer hasta 32 habitaciones sin cambiar el modelo de dominio. El estado es puramente administrativo y no representa disponibilidad real.",
    price: 320000,
    capacity: 4,
    status: "available",
    is_featured: true,
    display_order: 2,
    primary_image: "/placeholders/room.svg",
    seo_title: "Habitación Familiar | Hotel San Marino Tumaco",
    seo_description: "Habitación familiar provisional orientada a edición desde base de datos.",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
    images: [
      {
        id: "44f1db1e-c3b6-4da4-9393-dac573ec3ee1",
        room_id: "6f8f059c-2f71-4960-901e-f5966521f5f2",
        asset_id: null,
        storage_path: "/placeholders/room.svg",
        alt_text: "Placeholder de habitación familiar",
        is_primary: true,
        display_order: 1,
        created_at: "2026-03-26T00:00:00.000Z",
      },
    ],
    amenities: fallbackAmenities,
  },
];

export const fallbackPlans: Plan[] = [
  {
    id: "22b94f1c-2f6d-4a66-8180-85cb487663c6",
    name: "Plan Corporativo",
    slug: "plan-corporativo",
    short_description: "Tarifa provisional para viajeros de trabajo.",
    long_description:
      "Bloque editable pensado para destacar valor comercial y derivar la conversación a WhatsApp.",
    price_label: "Desde $210.000 por noche",
    is_featured: true,
    display_order: 1,
    image_path: "/placeholders/plan.svg",
    status: "published",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
  {
    id: "4d1ebd48-f570-4697-b564-f7bcbccb3158",
    name: "Plan Escapada",
    slug: "plan-escapada",
    short_description: "Contenido inicial para estadías cortas.",
    long_description:
      "La fase 1 define estructura, validaciones y persistencia; el detalle comercial fino llega en fase 2.",
    price_label: "Consulta por WhatsApp",
    is_featured: false,
    display_order: 2,
    image_path: "/placeholders/plan.svg",
    status: "published",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    id: "4c4feb18-c263-4283-8186-b1f920a52fda",
    guest_name: "Cliente provisional",
    guest_origin: "Tumaco",
    quote:
      "La base del sitio está lista para que los testimonios se administren desde panel sin hardcodear el contenido final.",
    rating: 5,
    is_featured: true,
    display_order: 1,
    status: "published",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
];

export const fallbackHomeSections: HomeSection[] = [
  {
    id: "1d0a6ffc-0b25-4b09-bc51-f9156c5d0ea6",
    key: "hero",
    title: "Hotel San Marino Tumaco",
    subtitle: "Base comercial enfocada en conversación directa por WhatsApp.",
    body:
      "Sin reservas online en esta fase. Sin formularios públicos. La conversión central es abrir conversación con el hotel.",
    payload: {
      eyebrow: "Foundation layer",
      ctaLabel: "Consultar por WhatsApp",
    },
    status: "published",
    display_order: 1,
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
  {
    id: "8db85849-f64b-40bb-9aa5-4d7c253a1377",
    key: "featured_rooms",
    title: "Habitaciones editables desde base de datos",
    subtitle: "La arquitectura queda lista para crecer hasta 32 habitaciones.",
    body: "Cada habitación soporta amenities, imágenes relacionadas, SEO básico y orden de despliegue.",
    payload: {},
    status: "published",
    display_order: 2,
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
];

export const fallbackSiteSettings: SiteSettings = {
  id: "default",
  site_name: siteConfig.siteName,
  site_tagline: siteConfig.siteTagline,
  seo_title: "Hotel San Marino Tumaco",
  seo_description:
    "Sitio institucional con contenido editable desde Supabase y CTA comercial único vía WhatsApp.",
  logo_path: null,
  default_share_image: "/placeholders/site.svg",
  created_at: "2026-03-26T00:00:00.000Z",
  updated_at: "2026-03-26T00:00:00.000Z",
};

export const fallbackContactInfo: ContactInfo = {
  id: "default",
  phone: "+57 315 4974576",
  whatsapp_number: "+57 315 4974576",
  whatsapp_default_message: siteConfig.whatsappMessage,
  address: "Tumaco, Nariño",
  city: "Tumaco",
  maps_embed_url: null,
  email: null,
  check_in_time: "15:00",
  check_out_time: "12:00",
  created_at: "2026-03-26T00:00:00.000Z",
  updated_at: "2026-03-26T00:00:00.000Z",
};

export const fallbackWhatsappCtas: WhatsappCta[] = [
  {
    id: "d9a666fd-fd7f-4e76-97a7-386d3f132767",
    key: "primary",
    label: "Consultar por WhatsApp",
    message: siteConfig.whatsappMessage,
    phone_number: siteConfig.whatsappNumber,
    is_primary: true,
    display_order: 1,
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
];
