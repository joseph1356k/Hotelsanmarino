import { AiAnswerSection } from "@/components/marketing/ai-answer-section";
import { JsonLdScript } from "@/components/marketing/json-ld-script";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { RoomComparison } from "@/components/marketing/room-comparison";
import { RoomCatalogExperience } from "@/components/marketing/room-catalog-experience";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import {
  roomCatalog,
  roomCatalogOverview,
  roomDemoImageLibrary,
} from "@/content/room-catalog";
import {
  buildBreadcrumbJsonLd,
  buildRoomItemListJsonLd,
  getAiAnswersByIds,
} from "@/content/ai-answer-content";
import { getPublicSiteContent } from "@/lib/content/public-content";

const roomsAiAnswers = getAiAnswersByIds([
  "habitacion-para-familias",
  "habitacion-para-parejas",
  "habitacion-para-grupos",
  "viaje-trabajo-hotel-tumaco",
  "consultar-disponibilidad-precios",
  "como-reservar-por-whatsapp",
]);

export default async function RoomsPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Habitaciones", path: "/habitaciones" },
    ]),
    buildRoomItemListJsonLd(roomCatalog),
  ];

  return (
    <div className="pb-16 md:pb-24">
      <JsonLdScript data={jsonLd} />

      <PageHero
        eyebrow="Habitaciones"
        title="Elige la habitación que mejor va con tu viaje."
        description="Revisa por capacidad, tipo de clima y formato. Abre cada opción, mira fotos más grandes y escribe por WhatsApp cuando encuentres la indicada."
        imageSrc={roomDemoImageLibrary.hotelWoodKing}
        imageAlt="Referencia visual de una habitación del Hotel San Marino"
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Hablar sobre habitaciones"
            trackingSource="habitaciones_hero"
            trackingLabel="Hablar sobre habitaciones"
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
              eyebrow="Cómo recorrerlas"
              title="Una vista más clara para comparar, elegir y consultar mejor."
              description="Organizamos las habitaciones por tipo de viaje y clima para que encuentres más rápido la opción que te sirve."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Antes de escribir
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/84">
                Abre cada habitación para ver fotos más grandes, capacidad, tipo de clima y cuántas opciones de ese formato tiene hoy el hotel.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <AiAnswerSection
        id="respuestas-habitaciones"
        eyebrow="Respuestas sobre habitaciones"
        title="Decide por capacidad, intención y disponibilidad real."
        description="Las respuestas están escritas para resolver dudas puntuales antes de abrir WhatsApp o comparar el catálogo completo."
        answers={roomsAiAnswers}
        phoneNumber={whatsappPhone}
        trackingSource="habitaciones_respuestas"
        ctaLabel="Consultar habitación"
        variant="sand"
      />

      <RoomComparison rooms={roomCatalog} phoneNumber={whatsappPhone} />

      <RoomCatalogExperience rooms={roomCatalog} phoneNumber={whatsappPhone} />
    </div>
  );
}
