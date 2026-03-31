export const siteConfig = {
  siteName: "Hotel San Marino Tumaco",
  siteTagline: "El Morro se vive aqui",
  whatsappNumber: "+573154974576",
  whatsappMessage: "Hola, quiero consultar disponibilidad",
} as const;

export const siteMaps = {
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.79378764245!2d-78.73541772576239!3d1.8253318598645862!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2d019a78f62563%3A0x441b2d404f3f769b!2sHotel%20San%20Marino!5e0!3m2!1ses!2sco!4v1774996424292!5m2!1ses!2sco",
  googleMapsUrl:
    "https://www.google.com/maps/place/Hotel+San+Marino/@1.8253319,-78.7354177,17z/data=!4m9!3m8!1s0x8e2d019a78f62563:0x441b2d404f3f769b!5m2!4m1!1i2!8m2!3d1.8253265!4d-78.7328428!16s%2Fg%2F11bxg00rgt?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
} as const;

export const socialLinks = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/hotelsanmarinotumaco/",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@sanmarinotumaco?lang=es",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/HotelSanMarino.Tumaco",
  },
] as const;

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
