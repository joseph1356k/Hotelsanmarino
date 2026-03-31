import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { RoomCard } from "@/components/marketing/room-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function RoomsPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const featuredCount = content.rooms.filter((room) => room.is_featured).length;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Habitaciones"
        title="Habitaciones para descansar bien y elegir con confianza."
        description="Explora opciones para tu viaje, revisa capacidad, ambiente y amenidades, y escribenos cuando encuentres la indicada."
        imageSrc={coastalScenes.aerial.src}
        imageAlt={coastalScenes.aerial.alt}
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Ver opciones por WhatsApp"
          />
        }
        aside={
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="mist-panel px-5 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Inventario
              </p>
              <p className="mt-3 text-4xl text-primary">{content.rooms.length}</p>
            </div>
            <div className="mist-panel px-5 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Destacadas
              </p>
              <p className="mt-3 text-4xl text-primary">{featuredCount}</p>
            </div>
            <div className="mist-panel px-5 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Canal
              </p>
              <p className="mt-3 text-2xl text-primary">WhatsApp</p>
            </div>
          </div>
        }
      />

      <section className="section-shell">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Elegir"
              title="Encuentra la habitacion que mejor va con tu viaje."
              description="Cada opcion te muestra lo esencial para comparar con calma y decidir con mas seguridad."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Antes de elegir
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/84">
                Revisa capacidad, tarifa referencial y amenidades para tener una idea mas clara antes de escribirnos.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {content.rooms.map((room, index) => (
            <Reveal key={room.id} delay={index * 40}>
              <RoomCard room={room} primaryCta={primaryCta} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
