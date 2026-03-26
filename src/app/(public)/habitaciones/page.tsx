import { PageHero } from "@/components/marketing/page-hero";
import { RoomCard } from "@/components/marketing/room-card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function RoomsPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Habitaciones"
        title="Habitaciones para elegir con calma y claridad"
        description="Cada opcion se muestra con imagen, capacidad, descripcion y acceso directo a WhatsApp. La idea es que comparar sea simple y que decidir tome menos friccion."
        aside={
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[26px] bg-white/80 p-5 shadow-[0_16px_40px_rgba(16,45,63,0.08)]">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Inventario
              </p>
              <p className="mt-3 text-4xl text-primary">{content.rooms.length}</p>
            </div>
            <div className="rounded-[26px] bg-secondary p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Destacadas
              </p>
              <p className="mt-3 text-4xl text-primary">
                {content.rooms.filter((room) => room.is_featured).length}
              </p>
            </div>
            <div className="rounded-[26px] bg-white/80 p-5 shadow-[0_16px_40px_rgba(16,45,63,0.08)]">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Capacidad
              </p>
              <p className="mt-3 text-2xl text-primary">2 a 4 personas</p>
            </div>
          </div>
        }
      />

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-2">
          {content.rooms.map((room) => (
            <RoomCard key={room.id} room={room} primaryCta={primaryCta} />
          ))}
        </div>
      </section>
    </div>
  );
}
