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
      "Opciones practicas para viajes individuales, escapadas cortas y estadias de dos personas.",
  },
  {
    key: "familias",
    title: "Familias y grupos pequenos",
    description:
      "Formatos con mas capacidad para compartir la estadia con comodidad y sin perder claridad al elegir.",
  },
  {
    key: "grupos",
    title: "Grupos amplios",
    description:
      "Una opcion multiple para resolver varias camas en un mismo ambiente cuando el viaje se mueve en grupo.",
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
      "Una opcion sencilla y fresca para viajar solo con una estancia comoda y bien resuelta.",
    description:
      "Pensada para quien viaja por su cuenta y quiere un espacio practico para descansar bien, moverse con facilidad y resolver su estadia sin complicaciones.",
    idealFor: "Viajes individuales, trabajo y escapadas cortas.",
    layoutNote: "Formato individual con ventilacion y ambiente funcional.",
    tags: ["1 persona", "Ventilador", "Viaje individual"],
    images: [
      roomDemoImageLibrary.guestRoom,
      roomDemoImageLibrary.hotelOpenWindow,
      roomDemoImageLibrary.hotelTwin01,
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
      "Una alternativa para dos personas que prefieren una estadia ventilada y facil de llevar.",
    description:
      "Ideal para quienes buscan una habitacion comoda para dos, con un ambiente practico, amable y pensado para quedarse con mas tranquilidad cerca de El Morro.",
    idealFor: "Parejas, amigos o visitas de paso.",
    layoutNote: "Formato doble con ventilador y distribucion comoda.",
    tags: ["2 personas", "Ventilador", "Doble"],
    images: [
      roomDemoImageLibrary.hotelTwin01,
      roomDemoImageLibrary.guestRoom,
      roomDemoImageLibrary.hotelOpenWindow,
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
      "La opcion mas versatil para dos personas, con aire acondicionado y una sensacion mas fresca durante la estadia.",
    description:
      "Es una de las categorias mas practicas para elegir en pareja o en viaje compartido. Da una sensacion mas controlada del ambiente y una estadia comoda para descansar bien.",
    idealFor: "Parejas, amigos y estancias donde el aire acondicionado es prioridad.",
    layoutNote: "Habitacion doble con aire acondicionado.",
    tags: ["2 personas", "Aire acondicionado", "Doble"],
    images: [
      roomDemoImageLibrary.hotelTwin02,
      roomDemoImageLibrary.hotelTwin03,
      roomDemoImageLibrary.guestRoom,
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
      "Una opcion para dos con una presencia mas amplia y una cama protagonista.",
    description:
      "Pensada para quienes quieren descansar con mas holgura, aire acondicionado y un formato que se siente un poco mas especial desde que entras.",
    idealFor: "Parejas o estadias de dos personas que buscan mas amplitud.",
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
      "Una configuracion comoda para tres personas, con dos camas y una sensacion mas fresca.",
    description:
      "Da un buen punto medio entre capacidad y comodidad para viajes familiares o de amigos que necesitan compartir habitacion sin que la decision se sienta improvisada.",
    idealFor: "Pequenas familias, amigos o viaje de tres personas.",
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
      "Una habitacion para cuatro personas con formato practico y ambiente ventilado.",
    description:
      "Funciona bien para familias o grupos pequenos que quieren compartir la estadia en una opcion clara, comoda y facil de comparar con el resto del inventario.",
    idealFor: "Familias pequenas o grupos de cuatro.",
    layoutNote: "Capacidad para cuatro con ventilador y distribucion funcional.",
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
      "Capacidad para cuatro con aire acondicionado y una sensacion mas resuelta para viajes compartidos.",
    description:
      "Es una opcion util cuando viajan varias personas y prefieren una habitacion que combine capacidad, orden y una mejor sensacion termica durante la estadia.",
    idealFor: "Familias y grupos pequenos que priorizan aire acondicionado.",
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
      "Una alternativa amplia para grupos de cinco personas con una estadia ventilada y practica.",
    description:
      "Permite resolver visitas familiares o compartidas en una sola categoria, con un formato pensado para alojar mas personas sin perder claridad al elegir.",
    idealFor: "Familias grandes o grupos de amigos.",
    layoutNote: "Capacidad para cinco con ventilador.",
    tags: ["5 personas", "Ventilador", "Grupo pequeno"],
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
      "Capacidad para cinco personas con aire acondicionado y una presencia mas fresca para el grupo.",
    description:
      "Cuando el viaje es de varios y la prioridad es compartir comodo, esta categoria ayuda a resolver la estancia con mejor sensacion de clima y espacio.",
    idealFor: "Familias o grupos de cinco que prefieren aire acondicionado.",
    layoutNote: "Capacidad para cinco con aire acondicionado.",
    tags: ["5 personas", "Aire acondicionado", "Grupo pequeno"],
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
      "La opcion para seis personas cuando el viaje pide una sola habitacion amplia y bien resuelta.",
    description:
      "Es una categoria puntual dentro del hotel, util para familias numerosas o grupos pequenos que quieren mantenerse juntos en una sola reserva de habitacion.",
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
      "Una opcion para dos con una presentacion mas amplia y una sensacion un poco mas reservada.",
    description:
      "La Mini Suite ofrece una estancia de dos personas con un tono mas especial, pensada para quienes quieren mas amplitud visual y una experiencia un poco mas cuidada.",
    idealFor: "Parejas o estadias donde importa el ambiente.",
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
      "La categoria mas especial para dos dentro del inventario actual del hotel.",
    description:
      "La Junior Suite se siente mas protagonista desde el primer vistazo. Es una opcion para dos personas que quieren una estadia con un poco mas de presencia y comodidad.",
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
    name: "Habitacion Multiple 6 Camarotes",
    category: "grupos",
    climate: "aire",
    style: "multiple",
    capacity: 12,
    count: 1,
    summary:
      "Una alternativa multiple para grupos que necesitan muchas camas dentro de un mismo ambiente.",
    description:
      "Pensada para grupos grandes, delegaciones o viajes compartidos donde resolver el alojamiento en un solo espacio ayuda a mantener la logistica mas simple.",
    idealFor: "Grupos amplios, equipos o viajes compartidos.",
    layoutNote: "Seis camarotes, capacidad para doce y ambiente multiple.",
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
