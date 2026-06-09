import type { LucideIcon } from "lucide-react";
import {
  Clock3,
  Coffee,
  Fish,
  Heart,
  MapPin,
  MessageCircle,
  ParkingCircle,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Users,
  Utensils,
  Waves,
} from "lucide-react";
import { coastalScenes } from "@/content/static-marketing";
import { roomDemoImageLibrary } from "@/content/room-catalog";

export interface ExperiencePackage {
  id: string;
  title: string;
  audience: string;
  description: string;
  includes: string[];
  image: string;
  whatsappMessage: string;
}

export interface DestinationExperience {
  title: string;
  distance: string;
  text: string;
  image: string;
  icon: LucideIcon;
}

export interface LocalSeoPage {
  slug: string;
  keyword: string;
  title: string;
  description: string;
  heroTitle: string;
  heroText: string;
  proof: string[];
  sections: Array<{
    title: string;
    text: string;
  }>;
  ctaMessage: string;
  image: string;
}

export const experiencePackages: ExperiencePackage[] = [
  {
    id: "escapada-morro",
    title: "Escapada al Morro",
    audience: "Para una salida corta cerca del mar",
    description:
      "Una noche o fin de semana para dormir en El Morro, desayunar sin afán y moverte fácil por Tumaco.",
    includes: [
      "Habitación según disponibilidad",
      "Desayuno",
      "Piscina y zonas comunes",
      "Orientación para vivir El Morro",
    ],
    image: coastalScenes.arch.src,
    whatsappMessage:
      "Hola, quiero consultar el paquete Escapada al Morro en Hotel San Marino Tumaco.",
  },
  {
    id: "tumaco-pareja",
    title: "Tumaco en Pareja",
    audience: "Para dos personas que quieren descansar con calma",
    description:
      "Una estadía pensada para conversar, caminar cerca del mar y resolver detalles románticos sin complicación.",
    includes: [
      "Habitación doble, king o suite",
      "Decoración opcional",
      "Restaurante en el hotel",
      "Recomendaciones para plan de pareja",
    ],
    image: roomDemoImageLibrary.hotelWoodKing,
    whatsappMessage:
      "Hola, quiero consultar el paquete Tumaco en Pareja en Hotel San Marino.",
  },
  {
    id: "pacifico-familia",
    title: "Pacífico en Familia",
    audience: "Para familias que necesitan claridad y comodidad",
    description:
      "Una alternativa práctica para elegir habitación por capacidad, comer en el hotel y disfrutar la piscina.",
    includes: [
      "Habitación familiar según número de personas",
      "Desayuno",
      "Piscina",
      "Comida familiar dentro del hotel",
    ],
    image: roomDemoImageLibrary.hotelTwin03,
    whatsappMessage:
      "Hola, quiero consultar el paquete Pacífico en Familia en Hotel San Marino Tumaco.",
  },
  {
    id: "sabor-mar",
    title: "Sabor y Mar",
    audience: "Para quienes viajan por comida, descanso y costa",
    description:
      "Una forma de combinar restaurante, paseo cerca del mar y una estadía cómoda en El Morro.",
    includes: [
      "Consulta de menú del día",
      "Habitación según disponibilidad",
      "Recomendación de plan costero",
      "Reserva directa por WhatsApp",
    ],
    image: coastalScenes.restaurant.src,
    whatsappMessage:
      "Hola, quiero consultar el paquete Sabor y Mar en Hotel San Marino Tumaco.",
  },
];

export const restaurantMenuHighlights = [
  {
    title: "Desayuno sin afán",
    text: "Empieza el día con lo necesario resuelto dentro del hotel.",
    icon: Coffee,
  },
  {
    title: "Sabor de mar",
    text: "Pregunta por pescado, camarón, langostino y preparaciones del día.",
    icon: Fish,
  },
  {
    title: "Comida familiar",
    text: "Opciones prácticas para grupos, niños y viajeros que prefieren quedarse cerca.",
    icon: Utensils,
  },
];

export const trustFaqItems = [
  {
    question: "¿La reserva se confirma por WhatsApp?",
    answer:
      "Sí. Te orientamos por WhatsApp, revisamos disponibilidad real y te ayudamos a elegir habitación o plan.",
  },
  {
    question: "¿El hotel está en El Morro?",
    answer:
      "Sí. San Marino está en El Morro, una ubicación conveniente para vivir Tumaco cerca del mar.",
  },
  {
    question: "¿Hay parqueadero y recepción 24 horas?",
    answer:
      "Sí. El hotel cuenta con parqueadero y atención permanente para una llegada más tranquila.",
  },
  {
    question: "¿Puedo consultar restaurante o menú del día?",
    answer:
      "Sí. Puedes escribir por WhatsApp para preguntar por desayuno, platos locales o menú disponible.",
  },
];

export const policyHighlights = [
  {
    title: "Confirmación directa",
    text: "La disponibilidad se valida con una persona del hotel antes de cerrar tu estadía.",
    icon: MessageCircle,
  },
  {
    title: "Llegada con referencia",
    text: "Puedes pedir ubicación, indicaciones y recomendaciones para moverte en Tumaco.",
    icon: MapPin,
  },
  {
    title: "Atención permanente",
    text: "Recepción 24 horas para resolver llegada, dudas y solicitudes durante la estadía.",
    icon: Clock3,
  },
  {
    title: "Viaje más tranquilo",
    text: "Parqueadero, piscina, restaurante y habitaciones por capacidad en un solo lugar.",
    icon: ParkingCircle,
  },
];

export const destinationExperiences: DestinationExperience[] = [
  {
    title: "El Morro",
    distance: "A pocos minutos",
    text: "El punto emocional del viaje: mar, memoria local y una referencia que se siente propia.",
    image: coastalScenes.arch.src,
    icon: MapPin,
  },
  {
    title: "Playa",
    distance: "Cerca del hotel",
    text: "Una pausa para caminar, respirar y dejar que Tumaco marque el ritmo del día.",
    image: coastalScenes.homeHero.src,
    icon: Waves,
  },
  {
    title: "Gastronomía del Pacífico",
    distance: "En el hotel y alrededores",
    text: "Sabores de mar, preparaciones sencillas y una identidad que no necesita exagerarse.",
    image: coastalScenes.restaurant.src,
    icon: Fish,
  },
  {
    title: "Atardecer",
    distance: "Plan de tarde",
    text: "Un cierre de día con calma antes de volver a descansar.",
    image: coastalScenes.aerial.src,
    icon: Sunrise,
  },
  {
    title: "Plan pareja",
    distance: "Reserva directa",
    text: "Una escapada breve, cálida y fácil de coordinar por conversación directa.",
    image: roomDemoImageLibrary.hotelWoodKing,
    icon: Heart,
  },
  {
    title: "Plan familiar",
    distance: "Habitaciones múltiples",
    text: "Capacidad, comida cercana, piscina y espacios para compartir sin perder comodidad.",
    image: roomDemoImageLibrary.hotelTwin03,
    icon: Users,
  },
  {
    title: "Recorridos aliados",
    distance: "Según disponibilidad",
    text: "Pregunta al hotel por recomendaciones y aliados para explorar Tumaco con más confianza.",
    image: coastalScenes.aerial.src,
    icon: Sparkles,
  },
];

export const localSeoPages: Record<string, LocalSeoPage> = {
  "hotel-en-tumaco": {
    slug: "hotel-en-tumaco",
    keyword: "hotel en Tumaco",
    title: "Hotel en Tumaco | Hotel San Marino",
    description:
      "Hotel en Tumaco ubicado en El Morro, cerca del mar, con habitaciones familiares, piscina, restaurante, parqueadero y reserva por WhatsApp.",
    heroTitle: "Hotel en Tumaco para vivir El Morro con comodidad.",
    heroText:
      "San Marino es una base cálida y práctica para descansar, comer bien y moverte por Tumaco con más confianza.",
    proof: ["En El Morro", "34 habitaciones", "Restaurante", "Piscina", "WhatsApp directo"],
    sections: [
      {
        title: "Una estadía cerca del ritmo de Tumaco",
        text: "La ubicación permite combinar descanso, mar, restaurante y planes locales sin convertir la reserva en un proceso complicado.",
      },
      {
        title: "Habitaciones para distintos tipos de viaje",
        text: "Parejas, familias, grupos y viajeros de trabajo pueden elegir por capacidad y recibir orientación directa por WhatsApp.",
      },
    ],
    ctaMessage:
      "Hola, quiero consultar disponibilidad porque estoy buscando hotel en Tumaco.",
    image: coastalScenes.homeHero.src,
  },
  "hotel-en-el-morro-tumaco": {
    slug: "hotel-en-el-morro-tumaco",
    keyword: "hotel en El Morro Tumaco",
    title: "Hotel en El Morro Tumaco | Hotel San Marino",
    description:
      "Hospédate en El Morro Tumaco en Hotel San Marino, cerca del mar, con restaurante, piscina, parqueadero y atención por WhatsApp.",
    heroTitle: "El Morro se vive mejor cuando te quedas cerca.",
    heroText:
      "Hotel San Marino conecta descanso, ubicación y sabor local para que tu visita a El Morro sea más fácil de vivir.",
    proof: ["Ubicación en El Morro", "Cerca del mar", "Recepción 24h", "Restaurante", "Parqueadero"],
    sections: [
      {
        title: "Una base para llegar, descansar y salir",
        text: "Quedarte en El Morro reduce fricción: llegas, preguntas, descansas y puedes moverte hacia los lugares clave del viaje.",
      },
      {
        title: "Hospitalidad cercana, sin lujo falso",
        text: "La experiencia es costera, real y comercialmente clara: buenos servicios, ubicación útil y contacto humano.",
      },
    ],
    ctaMessage:
      "Hola, quiero consultar disponibilidad en Hotel San Marino porque busco hotel en El Morro Tumaco.",
    image: coastalScenes.arch.src,
  },
  "hotel-cerca-al-mar-en-tumaco": {
    slug: "hotel-cerca-al-mar-en-tumaco",
    keyword: "hotel cerca al mar en Tumaco",
    title: "Hotel cerca al mar en Tumaco | Hotel San Marino",
    description:
      "Hotel cerca al mar en Tumaco, ubicado en El Morro, con piscina, restaurante, habitaciones familiares y reserva directa por WhatsApp.",
    heroTitle: "Quédate cerca del mar y deja que Tumaco marque el ritmo.",
    heroText:
      "San Marino permite vivir una estadía costera, cómoda y conectada con El Morro sin perder facilidad al reservar.",
    proof: ["Cerca del mar", "Piscina", "Restaurante", "Planes de pareja", "Planes familiares"],
    sections: [
      {
        title: "El mar como parte de la estadía",
        text: "La experiencia no se queda en la habitación: ubicación, comida, piscina y recomendaciones hacen que el viaje se sienta más completo.",
      },
      {
        title: "Reserva directa para viajar con claridad",
        text: "WhatsApp permite confirmar detalles, disponibilidad y habitación ideal antes de llegar.",
      },
    ],
    ctaMessage:
      "Hola, quiero consultar disponibilidad porque busco hotel cerca al mar en Tumaco.",
    image: coastalScenes.homeHero.src,
  },
  "hotel-con-piscina-en-tumaco": {
    slug: "hotel-con-piscina-en-tumaco",
    keyword: "hotel con piscina en Tumaco",
    title: "Hotel con piscina en Tumaco | Hotel San Marino",
    description:
      "Hotel con piscina en Tumaco, en El Morro, con restaurante, parqueadero, habitaciones familiares y reserva por WhatsApp.",
    heroTitle: "Piscina, descanso y una base cómoda en El Morro.",
    heroText:
      "Una estadía para bajar el ritmo, compartir en zonas comunes y resolver tu viaje con servicios cercanos.",
    proof: ["Piscina", "Zonas comunes", "Habitaciones familiares", "Restaurante", "Atención 24h"],
    sections: [
      {
        title: "Una pausa dentro del hotel",
        text: "La piscina suma un momento de descanso entre playa, comida y recorridos por Tumaco.",
      },
      {
        title: "Ideal para familias y grupos",
        text: "La combinación de habitaciones por capacidad, restaurante y zonas comunes ayuda a viajar con más orden.",
      },
    ],
    ctaMessage:
      "Hola, quiero consultar disponibilidad porque busco hotel con piscina en Tumaco.",
    image: coastalScenes.roomContext.src,
  },
  "hotel-con-restaurante-en-tumaco": {
    slug: "hotel-con-restaurante-en-tumaco",
    keyword: "hotel con restaurante en Tumaco",
    title: "Hotel con restaurante en Tumaco | Hotel San Marino",
    description:
      "Hotel con restaurante en Tumaco, ubicado en El Morro, con desayuno, platos locales, piscina, parqueadero y WhatsApp directo.",
    heroTitle: "Sabor local, descanso real, todo en el mismo lugar.",
    heroText:
      "El restaurante hace parte de la estadía: desayuno, platos de mar y comida familiar sin salir del hotel.",
    proof: ["Restaurante", "Desayuno", "Platos locales", "Comida familiar", "WhatsApp menú del día"],
    sections: [
      {
        title: "Comer bien también es parte de quedarse bien",
        text: "Resolver desayuno o una comida familiar dentro del hotel hace que el día fluya mejor.",
      },
      {
        title: "Pregunta por el menú del día",
        text: "El equipo puede orientarte por WhatsApp sobre opciones disponibles y horarios del restaurante.",
      },
    ],
    ctaMessage:
      "Hola, quiero consultar disponibilidad porque busco hotel con restaurante en Tumaco.",
    image: coastalScenes.restaurant.src,
  },
};

export const seoLandingSlugs = Object.keys(localSeoPages);

export const trustSummary = [
  {
    title: "Recepción 24h",
    text: "Acompañamiento para llegada, dudas y solicitudes durante la estadía.",
    icon: Clock3,
  },
  {
    title: "Reserva humana",
    text: "Una persona te ayuda a elegir habitación, plan o menú por WhatsApp.",
    icon: ShieldCheck,
  },
  {
    title: "El Morro como base",
    text: "Ubicación pensada para vivir Tumaco con comodidad y cercanía.",
    icon: MapPin,
  },
];
