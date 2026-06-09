import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Coffee,
  ConciergeBell,
  Dumbbell,
  Fish,
  HeartHandshake,
  Landmark,
  MapPinned,
  MessageCircleMore,
  MoonStar,
  ParkingCircle,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  Waves,
  Wifi,
} from "lucide-react";

export interface MarketingPillar {
  title: string;
  description: string;
}

export interface MarketingService {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface MarketingSplitSection {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}

export interface MarketingScene {
  src: string;
  alt: string;
}

export const coastalScenes = {
  homeHero: {
    src: "/images/tumaco/playa-morro.jpg",
    alt: "Playa El Morro en Tumaco",
  },
  aerial: {
    src: "/images/tumaco/tumaco-air.jpg",
    alt: "Vista aérea de Tumaco y su borde costero",
  },
  arch: {
    src: "/images/tumaco/arco-morro.jpg",
    alt: "Arco del Morro en Tumaco",
  },
  restaurant: {
    src: "/images/fallbacks/plan-fallback.jpg",
    alt: "Plato de cocina de mar",
  },
  roomContext: {
    src: "/images/fallbacks/site-fallback.jpg",
    alt: "Contexto del hotel y su atmósfera costera",
  },
} satisfies Record<string, MarketingScene>;

export const heroMetrics = [
  {
    value: "El Morro",
    label: "mar, descanso y ciudad",
  },
  {
    value: "34",
    label: "habitaciones para elegir",
  },
  {
    value: "WhatsApp",
    label: "atención directa",
  },
];

export const trustHighlights = [
  "En El Morro",
  "Atención directa",
  "Restaurante en sitio",
  "Cerca del mar",
];

export const valuePillars: MarketingPillar[] = [
  {
    title: "Una estadía que entra bien por los ojos",
    description:
      "San Marino se presenta con más identidad, más claridad y mejor atmósfera desde la primera visita.",
  },
  {
    title: "Comodidad fácil de elegir",
    description:
      "Habitaciones, servicios y ubicación se entienden rápido para decidir con más confianza.",
  },
  {
    title: "Contacto directo con el hotel",
    description:
      "Cuando quieras resolver una duda o avanzar, WhatsApp te conecta sin rodeos.",
  },
];

export const restaurantHighlights = [
  "Desayuno, almuerzo y cena dentro del hotel",
  "Sabores de mar con pescado, camarones y langostino",
  "Una mesa práctica para quedarse, comer bien y seguir el día con calma",
];

export const servicesCatalog: MarketingService[] = [
  {
    title: "WiFi",
    description: "Conexión estable para descansar, responder pendientes o seguir conectado sin complicaciones.",
    icon: Wifi,
  },
  {
    title: "Piscina",
    description: "Un espacio para bajar el ritmo, refrescarte y alargar la sensación de descanso.",
    icon: Waves,
  },
  {
    title: "Gym",
    description: "Una opción práctica para mantener tu rutina durante la estadía.",
    icon: Dumbbell,
  },
  {
    title: "Parqueadero",
    description: "Una llegada más cómoda para quienes viajan en vehículo y quieren resolverlo todo en un solo lugar.",
    icon: ParkingCircle,
  },
  {
    title: "Restaurante",
    description: "Cocina de mar y servicio diario para que comer bien también haga parte de la estadía.",
    icon: Fish,
  },
  {
    title: "Zonas comunes",
    description: "Ambientes tranquilos para esperar, conversar o simplemente tomarte el tiempo con más calma.",
    icon: Landmark,
  },
  {
    title: "Desayuno gratis",
    description: "Empezar el día con el desayuno resuelto hace la estadía más cómoda desde temprano.",
    icon: Coffee,
  },
  {
    title: "Tienda 24 horas",
    description: "Una ayuda práctica para esas necesidades de última hora, sin importar el momento.",
    icon: ShoppingBag,
  },
  {
    title: "Lavandería",
    description: "Apoyo útil para viajes largos, escalas o estadías con más movimiento.",
    icon: Shirt,
  },
  {
    title: "Decoraciones románticas",
    description: "Detalles pensados para sorprender en una fecha especial o darle otro tono a la estadía.",
    icon: HeartHandshake,
  },
  {
    title: "Salón de eventos",
    description: "Un espacio funcional para reuniones, celebraciones y encuentros con una logística más simple.",
    icon: ConciergeBell,
  },
  {
    title: "Tours con terceros",
    description: "Apoyo para explorar otros planes en Tumaco sin perder la sencillez del contacto directo.",
    icon: MapPinned,
  },
];

export const liveElMorroSection: MarketingSplitSection = {
  eyebrow: "El Morro se vive aquí",
  title: "Quedarse bien también es una forma de vivir El Morro",
  description:
    "San Marino es una base cómoda para descansar, moverte con facilidad y sentir más de cerca el ritmo de Tumaco.",
  points: [
    "Una ubicación que te deja más cerca del mar y del movimiento de El Morro",
    "Habitaciones claras para elegir sin enredos",
    "Un contacto directo para resolver todo por WhatsApp",
  ],
};

export const aboutNarrative = {
  intro:
    "Hotel San Marino nace de una idea simple: quedarse en El Morro debería sentirse cómodo, cercano y fácil desde el primer momento.",
  story:
    "Aquí la experiencia no se vende como promesa vacía. Se vive en una atención directa, espacios cómodos y una manera más clara de disfrutar Tumaco.",
  pillars: [
    {
      title: "Hospitalidad cercana",
      description:
        "Queremos que desde el primer mensaje sientas una atención amable, rápida y fácil de seguir.",
      icon: MessageCircleMore,
    },
    {
      title: "Comodidad bien cuidada",
      description:
        "Habitaciones, servicios y espacios pensados para que tu estadía se sienta clara y agradable.",
      icon: BedDouble,
    },
    {
      title: "Identidad costera real",
      description:
        "Tomamos del Pacífico su luz, su color y su cercanía sin caer en lo típico ni en el lujo falso.",
      icon: MoonStar,
    },
  ],
};

export const locationContext = [
  {
    title: "Llegar es fácil",
    description:
      "La ubicación del hotel te conecta con El Morro y con otros recorridos de Tumaco de una forma simple.",
    icon: MapPinned,
  },
  {
    title: "Ubicación que da confianza",
    description:
      "Puedes revisar el punto exacto en el mapa y, si lo prefieres, pedir una referencia directa por WhatsApp.",
    icon: ShieldCheck,
  },
  {
    title: "Tumaco más cerca",
    description:
      "La cercanía con el mar y con El Morro hace parte de la experiencia desde antes de llegar.",
    icon: Sparkles,
  },
];
