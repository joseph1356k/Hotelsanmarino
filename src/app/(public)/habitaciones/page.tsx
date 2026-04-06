import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { RoomCatalogExperience } from "@/components/marketing/room-catalog-experience";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import {
  roomCatalog,
  roomCatalogOverview,
  roomDemoImageLibrary,
} from "@/content/room-catalog";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function RoomsPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Habitaciones"
        title="Elige la habitacion que mejor va con tu viaje."
        description="Revisa por capacidad, tipo de clima y formato. Abre cada opcion, mira fotos mas grandes y escribe por WhatsApp cuando encuentres la indicada."
        imageSrc={roomDemoImageLibrary.hotelWoodKing}
        imageAlt="Referencia visual de una habitacion del Hotel San Marino"
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Hablar sobre habitaciones"
          />
        }
        aside={
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:grid-cols-1 lg:gap-4">
            <div className="mist-panel px-3.5 py-3.5 sm:px-5 sm:py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Tipos
              </p>
              <p className="mt-2 text-[2rem] leading-none text-primary sm:mt-3 sm:text-4xl">
                {roomCatalogOverview.totalTypes}
              </p>
            </div>
            <div className="mist-panel px-3.5 py-3.5 sm:px-5 sm:py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Inventario
              </p>
              <p className="mt-2 text-[2rem] leading-none text-primary sm:mt-3 sm:text-4xl">
                {roomCatalogOverview.totalInventory}
              </p>
            </div>
            <div className="mist-panel px-3.5 py-3.5 sm:px-5 sm:py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Capacidad
              </p>
              <p className="mt-2 text-[1.15rem] leading-tight text-primary sm:mt-3 sm:text-2xl">
                {roomCatalogOverview.capacityRange.min} a {roomCatalogOverview.capacityRange.max}
              </p>
            </div>
          </div>
        }
      />

      <section className="section-shell pb-0">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Como recorrerlas"
              title="Una vista mas clara para comparar, elegir y consultar mejor."
              description="Organizamos las habitaciones por tipo de viaje y clima para que encuentres mas rapido la opcion que te sirve."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Antes de escribir
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/84">
                Abre cada habitacion para ver fotos mas grandes, capacidad, tipo de clima y cuantas opciones de ese formato tiene hoy el hotel.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <RoomCatalogExperience
        rooms={roomCatalog}
        phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
      />
    </div>
  );
}
