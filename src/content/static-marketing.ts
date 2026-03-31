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
    label: "contexto costero, ciudad y mar en una misma estadia",
  },
  {
    value: "32",
    label: "habitaciones listas para mostrarse con claridad",
  },
  {
    value: "WhatsApp",
    label: "contacto comercial directo y sin intermediarios",
  },
];

export const trustHighlights = [
  "Frente al ritmo de El Morro",
  "Contacto directo con el hotel",
  "Restaurante y servicios en sitio",
  "Presentacion mas cuidada que la media",
];

export const valuePillars: MarketingPillar[] = [
  {
    title: "Primer vistazo con identidad",
    description:
      "La web presenta el hotel como una marca viva del territorio, no como una plantilla de hospedaje sin caracter.",
  },
  {
    title: "Descanso mas claro",
    description:
      "Habitaciones, servicios y contexto local se entienden rapido para que decidir no dependa de preguntas innecesarias.",
  },
  {
    title: "Hospitalidad directa",
    description:
      "La conversacion comercial se resuelve por WhatsApp: simple, humana y sin pasos falsos.",
  },
];

export const restaurantHighlights = [
  "Desayuno, almuerzo y cena sin salir del hotel",
  "Cocina de mar con pescado, camarones y langostino",
  "Una propuesta pensada para acompanar la estadia, no para recargarla",
];

export const servicesCatalog: MarketingService[] = [
  {
    title: "WiFi",
    description: "Conexion estable para estadias de descanso o viajes de trabajo.",
    icon: Wifi,
  },
  {
    title: "Piscina",
    description: "Un respiro de agua y pausa dentro del recorrido del hotel.",
    icon: Waves,
  },
  {
    title: "Gym",
    description: "Un espacio funcional para mantener rutina sin salir del ritmo del viaje.",
    icon: Dumbbell,
  },
  {
    title: "Parqueadero",
    description: "Apoyo practico para quienes llegan con vehiculo y necesitan una llegada simple.",
    icon: ParkingCircle,
  },
  {
    title: "Restaurante",
    description: "Cocina de mar y servicio diario dentro de la experiencia San Marino.",
    icon: Fish,
  },
  {
    title: "Zonas comunes",
    description: "Espacios tranquilos para esperar, conversar o bajar revoluciones.",
    icon: Landmark,
  },
  {
    title: "Desayuno gratis",
    description: "Una salida cotidiana resuelta con mas calma desde el inicio del dia.",
    icon: Coffee,
  },
  {
    title: "Tienda 24 horas",
    description: "Respuesta rapida para necesidades simples a cualquier hora.",
    icon: ShoppingBag,
  },
  {
    title: "Lavanderia",
    description: "Soporte util para estadias largas o trayectos con mas movimiento.",
    icon: Shirt,
  },
  {
    title: "Decoraciones romanticas",
    description: "Montajes puntuales para ocasiones especiales, coordinados de forma directa.",
    icon: HeartHandshake,
  },
  {
    title: "Salon de eventos",
    description: "Un formato controlado para reuniones, celebraciones y encuentros del hotel.",
    icon: ConciergeBell,
  },
  {
    title: "Tours con terceros",
    description: "Orientacion para planes complementarios sin convertir el hotel en operador turistico.",
    icon: MapPinned,
  },
];

export const liveElMorroSection: MarketingSplitSection = {
  eyebrow: "El Morro se vive aqui",
  title: "Tumaco y El Morro entran en la experiencia desde la primera mirada",
  description:
    "San Marino funciona mejor cuando se entiende como base costera: una forma comoda, clara y bien presentada de quedarse donde el territorio realmente se siente.",
  points: [
    "Fotografia grande, bloques limpios y una narrativa que conecta hotel y contexto local",
    "Una marca que no necesita lujo falso para verse mejor cuidada y mas confiable",
    "Decision mas simple: ver, comparar y escribir directo por WhatsApp",
  ],
};

export const aboutNarrative = {
  intro:
    "Hotel San Marino nace desde una idea simple: quedarse bien en El Morro deberia sentirse claro, cercano y mejor presentado.",
  story:
    "La propuesta combina una operacion ordenada con una identidad mas viva. No se trata de parecer un resort. Se trata de descanso bien resuelto, contexto costero real y una conversacion directa con el huesped.",
  pillars: [
    {
      title: "Hospitalidad cercana",
      description:
        "Una relacion mas humana con el huesped, con respuestas claras y menos friccion desde el primer contacto.",
      icon: MessageCircleMore,
    },
    {
      title: "Comodidad bien contada",
      description:
        "Habitaciones, servicios y espacios mostrados con criterio editorial para que la marca se vea pensada.",
      icon: BedDouble,
    },
    {
      title: "Calma con energia visual",
      description:
        "Una identidad que toma del Pacifico su color, su luz y su presencia, pero con un lenguaje moderno.",
      icon: MoonStar,
    },
  ],
};

export const locationContext = [
  {
    title: "El Morro como referencia real",
    description:
      "La ubicacion se presenta como una base comoda para conectar playa, ciudad y recorridos cotidianos de Tumaco.",
    icon: MapPinned,
  },
  {
    title: "Llegada clara",
    description:
      "Si hace falta confirmar una referencia puntual, el canal correcto sigue siendo WhatsApp.",
    icon: ShieldCheck,
  },
  {
    title: "Ritmo local visible",
    description:
      "El sitio refuerza el territorio con mas imagen, mas contraste y una identidad menos generica.",
    icon: Sparkles,
  },
];
