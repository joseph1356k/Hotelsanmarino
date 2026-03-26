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

export const trustHighlights = [
  "En El Morro",
  "Cerca del mar",
  "Atencion directa",
  "WhatsApp sin intermediarios",
];

export const valuePillars: MarketingPillar[] = [
  {
    title: "Descanso claro",
    description:
      "Habitaciones presentadas con orden, informacion directa y una experiencia de estadia sin ruido innecesario.",
  },
  {
    title: "Ubicacion con contexto",
    description:
      "San Marino conecta la comodidad del hotel con la vida costera de El Morro y el ritmo propio de Tumaco.",
  },
  {
    title: "Trato cercano",
    description:
      "El contacto comercial ocurre por WhatsApp para responder rapido, sin pasos falsos ni procesos que no suman.",
  },
];

export const restaurantHighlights = [
  "Desayuno, almuerzo y cena en el mismo hotel",
  "Cocina de mar con camarones, pescado y langostino",
  "Servicio pensado para huespedes y visitas locales",
];

export const servicesCatalog: MarketingService[] = [
  {
    title: "WiFi",
    description: "Conexion estable para estadias de descanso o viajes de trabajo.",
    icon: Wifi,
  },
  {
    title: "Piscina",
    description: "Un punto de respiro para bajar el ritmo despues de playa o ciudad.",
    icon: Waves,
  },
  {
    title: "Gym",
    description: "Espacio funcional para mantener la rutina durante la estadia.",
    icon: Dumbbell,
  },
  {
    title: "Parqueadero",
    description: "Acceso practico para quienes llegan con vehiculo propio.",
    icon: ParkingCircle,
  },
  {
    title: "Restaurante",
    description: "Cocina de mar y servicio diario sin salir del hotel.",
    icon: Fish,
  },
  {
    title: "Zonas comunes",
    description: "Espacios tranquilos para conversar, esperar o simplemente descansar.",
    icon: Landmark,
  },
  {
    title: "Desayuno gratis",
    description: "Una salida simple para empezar el dia con mas calma.",
    icon: Coffee,
  },
  {
    title: "Tienda 24 horas",
    description: "Apoyo practico para necesidades rapidas a cualquier hora.",
    icon: ShoppingBag,
  },
  {
    title: "Lavanderia",
    description: "Soporte util para estadias mas largas o itinerarios exigentes.",
    icon: Shirt,
  },
  {
    title: "Decoraciones romanticas",
    description: "Montajes puntuales para ocasiones especiales, coordinados directamente.",
    icon: HeartHandshake,
  },
  {
    title: "Salon de eventos",
    description: "Espacio disponible para reuniones y encuentros de formato controlado.",
    icon: ConciergeBell,
  },
  {
    title: "Tours con terceros",
    description: "Orientacion para planes complementarios sin convertir el hotel en operador turistico.",
    icon: MapPinned,
  },
];

export const liveElMorroSection: MarketingSplitSection = {
  eyebrow: "Vive El Morro",
  title: "El Morro se vive aqui",
  description:
    "San Marino no vende una fantasia ajena al territorio. Presenta una forma comoda, clara y cercana de quedarse donde el mar, la ciudad y la vida local se encuentran.",
  points: [
    "Cercania al mar sin ruido visual ni promesas exageradas",
    "Hospitalidad directa y tono mas humano que corporativo",
    "Un punto de partida confiable para conocer Tumaco con calma",
  ],
};

export const aboutNarrative = {
  intro:
    "Hotel San Marino nace desde una idea simple: quedarse bien en El Morro deberia sentirse claro, comodo y cercano.",
  story:
    "La propuesta combina una operacion ordenada con una presentacion mas cuidada que la media. No se trata de lujo falso. Se trata de descanso bien resuelto, atencion directa y una experiencia que reconoce el valor del territorio.",
  pillars: [
    {
      title: "Hospitalidad cercana",
      description:
        "Una relacion mas humana con el huesped, con respuestas claras y contacto directo cuando importa.",
      icon: MessageCircleMore,
    },
    {
      title: "Comodidad bien presentada",
      description:
        "Espacios, servicios y habitaciones que se entienden rapido y se muestran con criterio editorial.",
      icon: BedDouble,
    },
    {
      title: "Calma con identidad",
      description:
        "Un tono visual y narrativo que toma del Pacifico su pausa, su luz y su honestidad.",
      icon: MoonStar,
    },
  ],
};

export const locationContext = [
  {
    title: "El Morro como referencia",
    description:
      "La ubicacion se presenta como una base comoda para moverse entre playa, ciudad y encuentros cotidianos de Tumaco.",
    icon: MapPinned,
  },
  {
    title: "Contacto directo para llegar",
    description:
      "Si necesitas confirmar una referencia puntual o una indicacion de llegada, el canal correcto es WhatsApp.",
    icon: ShieldCheck,
  },
  {
    title: "Ritmo local",
    description:
      "El hotel busca acompañar el entorno con mas claridad y mejor presentacion, no competir con el territorio.",
    icon: Sparkles,
  },
];
