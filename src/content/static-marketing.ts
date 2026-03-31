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
    alt: "Vista aerea de Tumaco y su borde costero",
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
    alt: "Contexto del hotel y su atmosfera costera",
  },
} satisfies Record<string, MarketingScene>;

export const heroMetrics = [
  {
    value: "El Morro",
    label: "mar, descanso y ciudad",
  },
  {
    value: "32",
    label: "habitaciones para elegir",
  },
  {
    value: "WhatsApp",
    label: "atencion sin vueltas",
  },
];

export const trustHighlights = [
  "En El Morro",
  "Atencion directa",
  "Restaurante en sitio",
  "Cerca del mar",
];

export const valuePillars: MarketingPillar[] = [
  {
    title: "Una estadia que entra bien por los ojos",
    description:
      "San Marino se presenta con mas identidad, mas claridad y mejor atmosfera desde la primera visita.",
  },
  {
    title: "Comodidad facil de elegir",
    description:
      "Habitaciones, servicios y ubicacion se entienden rapido para decidir con mas confianza.",
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
  "Una mesa practica para quedarse, comer bien y seguir el dia con calma",
];

export const servicesCatalog: MarketingService[] = [
  {
    title: "WiFi",
    description: "Conexion estable para descansar, responder pendientes o seguir conectado sin complicaciones.",
    icon: Wifi,
  },
  {
    title: "Piscina",
    description: "Un espacio para bajar el ritmo, refrescarte y alargar la sensacion de descanso.",
    icon: Waves,
  },
  {
    title: "Gym",
    description: "Una opcion practica para mantener tu rutina durante la estadia.",
    icon: Dumbbell,
  },
  {
    title: "Parqueadero",
    description: "Una llegada mas comoda para quienes viajan en vehiculo y quieren resolverlo todo en un solo lugar.",
    icon: ParkingCircle,
  },
  {
    title: "Restaurante",
    description: "Cocina de mar y servicio diario para que comer bien tambien haga parte de la estadia.",
    icon: Fish,
  },
  {
    title: "Zonas comunes",
    description: "Ambientes tranquilos para esperar, conversar o simplemente tomarte el tiempo con mas calma.",
    icon: Landmark,
  },
  {
    title: "Desayuno gratis",
    description: "Empezar el dia con el desayuno resuelto hace la estadia mas comoda desde temprano.",
    icon: Coffee,
  },
  {
    title: "Tienda 24 horas",
    description: "Una ayuda practica para esas necesidades de ultima hora, sin importar el momento.",
    icon: ShoppingBag,
  },
  {
    title: "Lavanderia",
    description: "Apoyo util para viajes largos, escalas o estadias con mas movimiento.",
    icon: Shirt,
  },
  {
    title: "Decoraciones romanticas",
    description: "Detalles pensados para sorprender en una fecha especial o darle otro tono a la estadia.",
    icon: HeartHandshake,
  },
  {
    title: "Salon de eventos",
    description: "Un espacio funcional para reuniones, celebraciones y encuentros con una logistica mas simple.",
    icon: ConciergeBell,
  },
  {
    title: "Tours con terceros",
    description: "Apoyo para explorar otros planes en Tumaco sin perder la sencillez del contacto directo.",
    icon: MapPinned,
  },
];

export const liveElMorroSection: MarketingSplitSection = {
  eyebrow: "El Morro se vive aqui",
  title: "Quedarse bien tambien es una forma de vivir El Morro",
  description:
    "San Marino es una base comoda para descansar, moverte con facilidad y sentir mas de cerca el ritmo de Tumaco.",
  points: [
    "Una ubicacion que te deja mas cerca del mar y del movimiento de El Morro",
    "Habitaciones claras para elegir sin enredos",
    "Un contacto directo para resolver todo por WhatsApp",
  ],
};

export const aboutNarrative = {
  intro:
    "Hotel San Marino nace de una idea simple: quedarse en El Morro deberia sentirse comodo, cercano y facil desde el primer momento.",
  story:
    "Aqui la experiencia no se vende como promesa vacia. Se vive en una atencion directa, espacios comodos y una manera mas clara de disfrutar Tumaco.",
  pillars: [
    {
      title: "Hospitalidad cercana",
      description:
        "Queremos que desde el primer mensaje sientas una atencion amable, rapida y facil de seguir.",
      icon: MessageCircleMore,
    },
    {
      title: "Comodidad bien cuidada",
      description:
        "Habitaciones, servicios y espacios pensados para que tu estadia se sienta clara y agradable.",
      icon: BedDouble,
    },
    {
      title: "Identidad costera real",
      description:
        "Tomamos del Pacifico su luz, su color y su cercania sin caer en lo tipico ni en el lujo falso.",
      icon: MoonStar,
    },
  ],
};

export const locationContext = [
  {
    title: "Llegar es facil",
    description:
      "La ubicacion del hotel te conecta con El Morro y con otros recorridos de Tumaco de una forma simple.",
    icon: MapPinned,
  },
  {
    title: "Ubicacion que da confianza",
    description:
      "Puedes revisar el punto exacto en el mapa y, si lo prefieres, pedir una referencia directa por WhatsApp.",
    icon: ShieldCheck,
  },
  {
    title: "Tumaco mas cerca",
    description:
      "La cercania con el mar y con El Morro hace parte de la experiencia desde antes de llegar.",
    icon: Sparkles,
  },
];
