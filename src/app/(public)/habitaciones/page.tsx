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
        title="Habitaciones para comparar con mas claridad y mas deseo"
        description="La pagina deja de sentirse como una lista tecnica: imagen grande, contexto visual, capacidad visible, amenidades resumidas y salida inmediata a WhatsApp."
        imageSrc={coastalScenes.aerial.src}
        imageAlt={coastalScenes.aerial.alt}
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Consultar habitaciones"
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
              title="Una parrilla pensada para recorrer y decidir mejor."
              description="Cada card concentra la informacion clave y deja ver mejor la habitacion antes de pasar al detalle."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Vista general
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/84">
                Capacidad, tarifa referencial y una lectura visual mucho mas fuerte
                para que la decision se sienta menos fria y mas confiable.
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
