export const siteConfig = {
  siteName: "Hotel San Marino Tumaco",
  siteTagline: "El Morro se vive aqui",
  whatsappNumber: "+573154974576",
  whatsappMessage: "Hola, quiero consultar disponibilidad",
} as const;

export const publicNavigation = [
  { href: "/", label: "Inicio" },
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/planes", label: "Planes" },
  { href: "/servicios", label: "Servicios" },
  { href: "/galeria", label: "Galeria" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/ubicacion", label: "Ubicacion" },
  { href: "/contacto", label: "Contacto" },
];

export const adminNavigation = [
  { href: "/admin", label: "Resumen", group: "Control" },
  { href: "/admin/habitaciones", label: "Habitaciones", group: "Contenido" },
  { href: "/admin/planes", label: "Planes", group: "Contenido" },
  { href: "/admin/testimonios", label: "Testimonios", group: "Contenido" },
  { href: "/admin/home", label: "Home", group: "Sitio" },
  { href: "/admin/contacto", label: "Contacto", group: "Sitio" },
  { href: "/admin/configuracion", label: "Configuracion", group: "Sitio" },
  { href: "/admin/media", label: "Media", group: "Recursos" },
];
