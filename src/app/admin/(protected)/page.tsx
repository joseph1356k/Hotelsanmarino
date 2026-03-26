import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSummary } from "@/lib/content/admin-content";

export default async function AdminDashboardPage() {
  const summary = await getAdminSummary();

  return (
    <section className="space-y-6">
      <AdminPageHeader
        eyebrow="Control"
        title="Resumen del panel"
        description="Accesos directos y estado operativo del contenido principal del sitio."
      />
      {summary.warnings.length > 0 ? (
        <Card className="border-destructive/40">
          <CardHeader><CardTitle>Warnings</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {summary.warnings.map((warning) => (
              <p key={warning}>{warning}</p>
            ))}
          </CardContent>
        </Card>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Habitaciones" value={summary.roomsCount} helper="Inventario total" />
        <AdminStatCard label="Destacadas" value={summary.featuredRooms} helper="Visibles con prioridad" />
        <AdminStatCard label="Planes" value={summary.plansCount} helper="Contenido comercial" />
        <AdminStatCard label="Testimonios" value={summary.testimonialsCount} helper="Prueba social cargada" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Salud del contenido</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Habitaciones ocultas</p>
              <p className="mt-2 text-3xl font-semibold">{summary.hiddenRooms}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Sin imagen principal</p>
              <p className="mt-2 text-3xl font-semibold">{summary.roomsMissingPrimaryImage}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">Secciones home publicadas</p>
              <p className="mt-2 text-3xl font-semibold">{summary.publishedHomeSections}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-sm text-muted-foreground">CTAs de WhatsApp</p>
              <p className="mt-2 text-3xl font-semibold">{summary.whatsappCtasCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accesos rapidos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              { href: "/admin/habitaciones", label: "Gestionar habitaciones" },
              { href: "/admin/home", label: "Editar home" },
              { href: "/admin/contacto", label: "Configurar contacto" },
              { href: "/admin/media", label: "Revisar media" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-border/80 px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
