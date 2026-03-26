"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/admin": {
    title: "Resumen operativo",
    description: "Vista de control para editar contenido clave y revisar el estado general.",
  },
  "/admin/habitaciones": {
    title: "Habitaciones",
    description: "Inventario, visibilidad, destacados y acceso rapido a media y amenidades.",
  },
  "/admin/planes": {
    title: "Planes",
    description: "Gestion de ofertas editoriales y su orden de despliegue.",
  },
  "/admin/testimonios": {
    title: "Testimonios",
    description: "Prueba social editable con orden y publicacion.",
  },
  "/admin/home": {
    title: "Home",
    description: "Edicion de bloques clave del inicio sin page builder complejo.",
  },
  "/admin/contacto": {
    title: "Contacto y WhatsApp",
    description: "Configuracion comercial y operativa del canal principal del sitio.",
  },
  "/admin/configuracion": {
    title: "Configuracion",
    description: "Ajustes globales de marca y SEO basico del sitio.",
  },
  "/admin/media": {
    title: "Media",
    description: "Biblioteca operativa de assets y referencias persistidas.",
  },
};

function getMatchedMeta(pathname: string) {
  const match =
    Object.keys(pageMeta)
      .sort((a, b) => b.length - a.length)
      .find((route) => pathname === route || pathname.startsWith(`${route}/`)) ?? "/admin";

  return pageMeta[match];
}

export function AdminHeader() {
  const pathname = usePathname();
  const meta = getMatchedMeta(pathname);
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin">Admin</Link>
        {segments.slice(1).map((segment, index) => (
          <div key={`${segment}-${index}`} className="flex items-center gap-2">
            <ChevronRight className="size-4" />
            <span className="capitalize">{segment.replace(/-/g, " ")}</span>
          </div>
        ))}
      </div>
      <div className="rounded-[1.5rem] border border-border/80 bg-card px-6 py-5 shadow-[0_14px_40px_rgba(29,43,46,0.06)]">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Admin workspace
        </p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl">{meta.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {meta.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
