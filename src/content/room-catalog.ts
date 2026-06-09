export type RoomCatalogGroupKey = "solo-pareja" | "familias" | "grupos";
export type RoomCatalogClimate = "ventilador" | "aire";
export type RoomCatalogStyle = "estandar" | "suite" | "multiple";

export interface RoomCatalogItem {
  slug: string;
  name: string;
  category: RoomCatalogGroupKey;
  climate: RoomCatalogClimate;
  style: RoomCatalogStyle;
  capacity: number;
  count: number;
  summary: string;
  description: string;
  idealFor: string;
  layoutNote: string;
  tags: string[];
  images: string[];
}

export const roomCatalogGroups: Array<{
  key: RoomCatalogGroupKey;
  title: string;
  description: string;
}> = [
  {
    key: "solo-pareja",
    title: "Solo y pareja",
    description:
      "Opciones prácticas para viajes individuales, escapadas cortas y estadías de dos personas.",
  },
  {
    key: "familias",
    title: "Familias y grupos pequeños",
    description:
      "Formatos con más capacidad para compartir la estadía con comodidad y sin perder claridad al elegir.",
  },
  {
    key: "grupos",
    title: "Grupos amplios",
    description:
      "Una opción múltiple para resolver varias camas en un mismo ambiente cuando el viaje se mueve en grupo.",
  },
];

export const roomDemoImageLibrary = {
  guestRoom: "/images/rooms-demo/guest-room-interior.jpg",
  hotelOpenWindow: "/images/rooms-demo/hotel-open-window.jpg",
  hotelWoodKing: "/images/rooms-demo/hotel-wood-king.jpg",
  hotelTwin01: "/images/rooms-demo/hotel-twin-01.jpg",
  hotelTwin02: "/images/rooms-demo/hotel-twin-02.jpg",
  hotelTwin03: "/images/rooms-demo/hotel-twin-03.jpg",
  hostelBunk: "/images/rooms-demo/hostel-bunk-homey.jpg",
  hostelDormitory: "/images/rooms-demo/hostel-dormitory.jpg",
  hostelGuestBedroom: "/images/rooms-demo/hostel-guest-bedroom.jpg",
  hostelInterior: "/images/rooms-demo/hostel-interior-view.jpg",
} as const;

export const roomCatalog: RoomCatalogItem[] = [
  {
    slug: "sencilla-solitaria-ventilador",
    name: "Sencilla Solitaria",
    category: "solo-pareja",
    climate: "ventilador",
    style: "estandar",
    capacity: 1,
    count: 5,
    summary:
      "Una opción sencilla y fresca para viajar solo con una estancia cómoda y bien resuelta.",
    description:
      "Pensada para quien viaja por su cuenta y quiere un espacio práctico para descansar bien, moverse con facilidad y resolver su estadía sin complicaciones.",
    idealFor: "Viajes individuales, trabajo y escapadas cortas.",
    layoutNote: "Formato individual con ventilación y ambiente funcional.",
    tags: ["1 persona", "Ventilador", "Viaje individual"],
    images: [
      roomDemoImageLibrary.hotelOpenWindow,
      roomDemoImageLibrary.hotelWoodKing,
      roomDemoImageLibrary.hotelTwin03,
    ],
  },
  {
    slug: "doble-ventilador",
    name: "Doble Ventilador",
    category: "solo-pareja",
    climate: "ventilador",
    style: "estandar",
    capacity: 2,
    count: 5,
    summary:
      "Una alternativa para dos personas que prefieren una estadía ventilada y fácil de llevar.",
    description:
      "Ideal para quienes buscan una habitación cómoda para dos, con un ambiente práctico, amable y pensado para quedarse con más tranquilidad cerca de El Morro.",
    idealFor: "Parejas, amigos o visitas de paso.",
    layoutNote: "Formato doble con ventilador y distribución cómoda.",
    tags: ["2 personas", "Ventilador", "Doble"],
    images: [
      roomDemoImageLibrary.hotelWoodKing,
      roomDemoImageLibrary.hotelOpenWindow,
      roomDemoImageLibrary.hotelTwin03,
    ],
  },
  {
    slug: "doble-aire-acondicionado",
    name: "Doble Aire Acondicionado",
    category: "solo-pareja",
    climate: "aire",
    style: "estandar",
    capacity: 2,
    count: 7,
    summary:
      "La opción más versátil para dos personas, con aire acondicionado y una sensación más fresca durante la estadía.",
    description:
      "Es una de las categorías más prácticas para elegir en pareja o en viaje compartido. Da una sensación más controlada del ambiente y una estadía cómoda para descansar bien.",
    idealFor: "Parejas, amigos y estancias donde el aire acondicionado es prioridad.",
    layoutNote: "Habitación doble con aire acondicionado.",
    tags: ["2 personas", "Aire acondicionado", "Doble"],
    images: [
      roomDemoImageLibrary.hotelOpenWindow,
      roomDemoImageLibrary.hotelWoodKing,
      roomDemoImageLibrary.hotelTwin03,
    ],
  },
  {
    slug: "king-aire-acondicionado",
    name: "King Aire Acondicionado",
    category: "solo-pareja",
    climate: "aire",
    style: "estandar",
    capacity: 2,
    count: 2,
    summary:
      "Una opción para dos con una presencia más amplia y una cama protagonista.",
    description:
      "Pensada para quienes quieren descansar con más holgura, aire acondicionado y un formato que se siente un poco más especial desde que entras.",
    idealFor: "Parejas o estadías de dos personas que buscan más amplitud.",
    layoutNote: "Formato king para dos con aire acondicionado.",
    tags: ["2 personas", "King", "Aire acondicionado"],
    images: [
      roomDemoImageLibrary.hotelWoodKing,
      roomDemoImageLibrary.hotelOpenWindow,
      roomDemoImageLibrary.hotelTwin03,
    ],
  },
  {
    slug: "triple-2-camas-aire-acondicionado",
    name: "Triple 2 Camas Aire Acondicionado",
    category: "familias",
    climate: "aire",
    style: "estandar",
    capacity: 3,
    count: 2,
    summary:
      "Una configuración cómoda para tres personas, con dos camas y una sensación más fresca.",
    description:
      "Da un buen punto medio entre capacidad y comodidad para viajes familiares o de amigos que necesitan compartir habitación sin que la decisión se sienta improvisada.",
    idealFor: "Pequeñas familias, amigos o viaje de tres personas.",
    layoutNote: "Dos camas, capacidad para tres y aire acondicionado.",
    tags: ["3 personas", "2 camas", "Aire acondicionado"],
    images: [
      roomDemoImageLibrary.hotelTwin02,
      roomDemoImageLibrary.hotelTwin03,
      roomDemoImageLibrary.hotelOpenWindow,
    ],
  },
  {
    slug: "cuadruple-ventilador",
    name: "Cuadruple Ventilador",
    category: "familias",
    climate: "ventilador",
    style: "estandar",
    capacity: 4,
    count: 2,
    summary:
      "Una habitación para cuatro personas con formato práctico y ambiente ventilado.",
    description:
      "Funciona bien para familias o grupos pequeños que quieren compartir la estadía en una opción clara, cómoda y fácil de comparar con el resto del inventario.",
    idealFor: "Familias pequeñas o grupos de cuatro.",
    layoutNote: "Capacidad para cuatro con ventilador y distribución funcional.",
    tags: ["4 personas", "Ventilador", "Compartida"],
    images: [
      roomDemoImageLibrary.hotelTwin01,
      roomDemoImageLibrary.hotelTwin02,
      roomDemoImageLibrary.hostelGuestBedroom,
    ],
  },
  {
    slug: "cuadruple-aire-acondicionado",
    name: "Cuadruple Aire Acondicionado",
    category: "familias",
    climate: "aire",
    style: "estandar",
    capacity: 4,
    count: 2,
    summary:
      "Capacidad para cuatro con aire acondicionado y una sensación más resuelta para viajes compartidos.",
    description:
      "Es una opción útil cuando viajan varias personas y prefieren una habitación que combine capacidad, orden y una mejor sensación térmica durante la estadía.",
    idealFor: "Familias y grupos pequeños que priorizan aire acondicionado.",
    layoutNote: "Formato para cuatro personas con aire acondicionado.",
    tags: ["4 personas", "Aire acondicionado", "Compartida"],
    images: [
      roomDemoImageLibrary.hotelTwin03,
      roomDemoImageLibrary.hotelTwin02,
      roomDemoImageLibrary.hostelGuestBedroom,
    ],
  },
  {
    slug: "quintuple-ventilador",
    name: "Quintuple Ventilador",
    category: "familias",
    climate: "ventilador",
    style: "estandar",
    capacity: 5,
    count: 2,
    summary:
      "Una alternativa amplia para grupos de cinco personas con una estadía ventilada y práctica.",
    description:
      "Permite resolver visitas familiares o compartidas en una sola categoría, con un formato pensado para alojar más personas sin perder claridad al elegir.",
    idealFor: "Familias grandes o grupos de amigos.",
    layoutNote: "Capacidad para cinco con ventilador.",
    tags: ["5 personas", "Ventilador", "Grupo pequeño"],
    images: [
      roomDemoImageLibrary.hostelGuestBedroom,
      roomDemoImageLibrary.hostelInterior,
      roomDemoImageLibrary.hotelTwin01,
    ],
  },
  {
    slug: "quintuple-aire-acondicionado",
    name: "Quintuple Aire Acondicionado",
    category: "familias",
    climate: "aire",
    style: "estandar",
    capacity: 5,
    count: 2,
    summary:
      "Capacidad para cinco personas con aire acondicionado y una presencia más fresca para el grupo.",
    description:
      "Cuando el viaje es de varios y la prioridad es compartir cómodo, esta categoría ayuda a resolver la estancia con mejor sensación de clima y espacio.",
    idealFor: "Familias o grupos de cinco que prefieren aire acondicionado.",
    layoutNote: "Capacidad para cinco con aire acondicionado.",
    tags: ["5 personas", "Aire acondicionado", "Grupo pequeño"],
    images: [
      roomDemoImageLibrary.hostelGuestBedroom,
      roomDemoImageLibrary.hotelTwin03,
      roomDemoImageLibrary.hostelInterior,
    ],
  },
  {
    slug: "sextuple-aire-acondicionado",
    name: "Sextuple Aire Acondicionado",
    category: "familias",
    climate: "aire",
    style: "estandar",
    capacity: 6,
    count: 1,
    summary:
      "La opción para seis personas cuando el viaje pide una sola habitación amplia y bien resuelta.",
    description:
      "Es una categoría puntual dentro del hotel, útil para familias numerosas o grupos pequeños que quieren mantenerse juntos en una sola reserva de habitación.",
    idealFor: "Familias grandes o grupos de seis personas.",
    layoutNote: "Capacidad para seis con aire acondicionado.",
    tags: ["6 personas", "Aire acondicionado", "Amplia"],
    images: [
      roomDemoImageLibrary.hostelInterior,
      roomDemoImageLibrary.hostelGuestBedroom,
      roomDemoImageLibrary.hotelTwin03,
    ],
  },
  {
    slug: "mini-suite",
    name: "Mini Suite",
    category: "solo-pareja",
    climate: "aire",
    style: "suite",
    capacity: 2,
    count: 2,
    summary:
      "Una opción para dos con una presentación más amplia y una sensación un poco más reservada.",
    description:
      "La Mini Suite ofrece una estancia de dos personas con un tono más especial, pensada para quienes quieren más amplitud visual y una experiencia un poco más cuidada.",
    idealFor: "Parejas o estadías donde importa el ambiente.",
    layoutNote: "Suite compacta para dos personas.",
    tags: ["2 personas", "Suite", "Aire acondicionado"],
    images: [
      roomDemoImageLibrary.hotelWoodKing,
      roomDemoImageLibrary.hotelOpenWindow,
      roomDemoImageLibrary.guestRoom,
    ],
  },
  {
    slug: "junior-suite",
    name: "Junior Suite",
    category: "solo-pareja",
    climate: "aire",
    style: "suite",
    capacity: 2,
    count: 1,
    summary:
      "La categoría más especial para dos dentro del inventario actual del hotel.",
    description:
      "La Junior Suite se siente más protagonista desde el primer vistazo. Es una opción para dos personas que quieren una estadía con un poco más de presencia y comodidad.",
    idealFor: "Parejas o visitas especiales de dos personas.",
    layoutNote: "Suite para dos con mejor amplitud visual.",
    tags: ["2 personas", "Junior Suite", "Aire acondicionado"],
    images: [
      roomDemoImageLibrary.hotelWoodKing,
      roomDemoImageLibrary.hotelTwin02,
      roomDemoImageLibrary.guestRoom,
    ],
  },
  {
    slug: "habitacion-multiple-6-camarotes",
    name: "Habitación Múltiple 6 Camarotes",
    category: "grupos",
    climate: "aire",
    style: "multiple",
    capacity: 12,
    count: 1,
    summary:
      "Una alternativa múltiple para grupos que necesitan muchas camas dentro de un mismo ambiente.",
    description:
      "Pensada para grupos grandes, delegaciones o viajes compartidos donde resolver el alojamiento en un solo espacio ayuda a mantener la logística más simple.",
    idealFor: "Grupos amplios, equipos o viajes compartidos.",
    layoutNote: "Seis camarotes, capacidad para doce y ambiente múltiple.",
    tags: ["12 personas", "6 camarotes", "Grupo amplio"],
    images: [
      roomDemoImageLibrary.hostelBunk,
      roomDemoImageLibrary.hostelDormitory,
      roomDemoImageLibrary.hostelInterior,
    ],
  },
];

export const roomCatalogOverview = {
  totalTypes: roomCatalog.length,
  totalInventory: roomCatalog.reduce((total, room) => total + room.count, 0),
  capacityRange: {
    min: Math.min(...roomCatalog.map((room) => room.capacity)),
    max: Math.max(...roomCatalog.map((room) => room.capacity)),
  },
};
