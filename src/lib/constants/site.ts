export const siteConfig = {
  siteName: "Hotel San Marino Tumaco",
  siteTagline: "Estadía frente al Pacífico con operación simple y contenido editable.",
  whatsappNumber: "+573154974576",
  whatsappMessage: "Hola, quiero consultar disponibilidad",
} as const;

export const publicNavigation = [
  { href: "/", label: "Inicio" },
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/planes", label: "Planes" },
  { href: "/servicios", label: "Servicios" },
  { href: "/galeria", label: "Galería" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/ubicacion", label: "Ubicación" },
  { href: "/contacto", label: "Contacto" },
];

export const adminNavigation = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/habitaciones", label: "Habitaciones" },
  { href: "/admin/planes", label: "Planes" },
  { href: "/admin/testimonios", label: "Testimonios" },
  { href: "/admin/home", label: "Home" },
  { href: "/admin/configuracion", label: "Configuración" },
  { href: "/admin/contacto", label: "Contacto" },
  { href: "/admin/media", label: "Media" },
];
