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

// Development-only defaults. These are not the production source of truth.
export const devDefaultAmenities: Amenity[] = [
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

export const devDefaultRooms: RoomWithRelations[] = [
  {
    id: "4e3c9d4d-77f5-4fba-a521-4ca47b3405db",
    name: "Habitacion Estandar",
    slug: "habitacion-estandar",
    short_description: "Una opcion comoda y clara para descansar cerca del mar.",
    long_description:
      "Fallback de desarrollo para mantener una experiencia local coherente mientras Supabase no esta configurado. En produccion, la fuente editable real debe ser la base de datos.",
    price: 180000,
    capacity: 2,
    status: "available",
    is_featured: true,
    display_order: 1,
    primary_image: "/placeholders/room.svg",
    seo_title: "Habitacion Estandar | Hotel San Marino Tumaco",
    seo_description: "Default temporal de desarrollo para validar la arquitectura.",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
    images: [
      {
        id: "7ae36933-fcf4-4f8d-976b-b4ddb52e250f",
        room_id: "4e3c9d4d-77f5-4fba-a521-4ca47b3405db",
        asset_id: null,
        storage_path: "/placeholders/room.svg",
        alt_text: "Placeholder habitacion estandar",
        is_primary: true,
        display_order: 1,
        created_at: "2026-03-26T00:00:00.000Z",
      },
    ],
    amenities: devDefaultAmenities.slice(0, 2),
  },
  {
    id: "6f8f059c-2f71-4960-901e-f5966521f5f2",
    name: "Habitacion Familiar",
    slug: "habitacion-familiar",
    short_description: "Mas espacio para estadias en grupo con una presentacion limpia.",
    long_description:
      "Fallback local de desarrollo pensado para validar la capa publica sin romper la regla DB-first del proyecto.",
    price: 320000,
    capacity: 4,
    status: "available",
    is_featured: true,
    display_order: 2,
    primary_image: "/placeholders/room.svg",
    seo_title: "Habitacion Familiar | Hotel San Marino Tumaco",
    seo_description: "Default temporal de desarrollo para validar relaciones.",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
    images: [
      {
        id: "44f1db1e-c3b6-4da4-9393-dac573ec3ee1",
        room_id: "6f8f059c-2f71-4960-901e-f5966521f5f2",
        asset_id: null,
        storage_path: "/placeholders/room.svg",
        alt_text: "Placeholder habitacion familiar",
        is_primary: true,
        display_order: 1,
        created_at: "2026-03-26T00:00:00.000Z",
      },
    ],
    amenities: devDefaultAmenities,
  },
];

export const devDefaultPlans: Plan[] = [
  {
    id: "22b94f1c-2f6d-4a66-8180-85cb487663c6",
    name: "Plan Corporativo",
    slug: "plan-corporativo",
    short_description: "Una salida practica para estadias de trabajo en Tumaco.",
    long_description:
      "Contenido temporal de desarrollo con tono de marca. La fuente editable final sigue siendo la base de datos.",
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
    short_description: "Una opcion simple para una salida corta con atencion directa.",
    long_description:
      "Fallback de desarrollo para validar la presentacion publica de planes mientras la DB no esta disponible.",
    price_label: "Consulta por WhatsApp",
    is_featured: false,
    display_order: 2,
    image_path: "/placeholders/plan.svg",
    status: "published",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
];

export const devDefaultTestimonials: Testimonial[] = [
  {
    id: "4c4feb18-c263-4283-8186-b1f920a52fda",
    guest_name: "Huesped local",
    guest_origin: "Tumaco",
    quote:
      "La presentacion del hotel se siente clara y el contacto por WhatsApp hace todo mas directo.",
    rating: 5,
    is_featured: true,
    display_order: 1,
    status: "published",
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
];

export const devDefaultHomeSections: HomeSection[] = [
  {
    id: "1d0a6ffc-0b25-4b09-bc51-f9156c5d0ea6",
    key: "hero",
    title: "El Morro se vive aqui",
    subtitle: "Calma con identidad, contacto directo y una estadia mejor presentada.",
    body:
      "Hotel San Marino propone una forma clara y cercana de quedarse en El Morro. En esta fase, la conversacion comercial ocurre por WhatsApp.",
    payload: {
      eyebrow: "Hotel San Marino",
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
    title: "Habitaciones para elegir con calma",
    subtitle: "Imagen, capacidad y contexto para decidir sin ruido.",
    body:
      "El front de desarrollo conserva una seleccion corta, pero la arquitectura ya soporta inventario, amenidades, galeria y orden de despliegue desde DB.",
    payload: {},
    status: "published",
    display_order: 2,
    created_at: "2026-03-26T00:00:00.000Z",
    updated_at: "2026-03-26T00:00:00.000Z",
  },
];

export const devDefaultSiteSettings: SiteSettings = {
  id: "default",
  site_name: siteConfig.siteName,
  site_tagline: siteConfig.siteTagline,
  seo_title: "Hotel San Marino Tumaco",
  seo_description:
    "Fallback local de desarrollo para Hotel San Marino Tumaco. En produccion el contenido debe venir de Supabase.",
  logo_path: null,
  default_share_image: "/placeholders/site.svg",
  created_at: "2026-03-26T00:00:00.000Z",
  updated_at: "2026-03-26T00:00:00.000Z",
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
  created_at: "2026-03-26T00:00:00.000Z",
  updated_at: "2026-03-26T00:00:00.000Z",
};

export const devDefaultWhatsappCtas: WhatsappCta[] = [
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
