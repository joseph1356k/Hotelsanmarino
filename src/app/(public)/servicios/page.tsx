import Image from "next/image";
import { AiAnswerSection } from "@/components/marketing/ai-answer-section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLdScript } from "@/components/marketing/json-ld-script";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import { restaurantMenuHighlights } from "@/content/commercial-content";
import {
  coastalScenes,
  restaurantHighlights,
  servicesCatalog,
} from "@/content/static-marketing";
import {
  buildBreadcrumbJsonLd,
  buildItemListJsonLd,
  getAiAnswersByIds,
} from "@/content/ai-answer-content";
import { getPublicSiteContent } from "@/lib/content/public-content";

const servicesAiAnswers = getAiAnswersByIds([
  "hotel-con-piscina-en-tumaco",
  "hotel-con-restaurante-en-tumaco",
  "menu-del-dia-restaurante",
  "hotel-con-parqueadero-en-tumaco",
  "hotel-con-gimnasio-en-tumaco",
  "recepcion-24-horas",
]);

export default async function ServicesPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;
  const whatsappMessage = primaryCta?.message ?? content.contactInfo.whatsapp_default_message;
  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Servicios", path: "/servicios" },
    ]),
    buildItemListJsonLd({
      name: "Servicios de Hotel San Marino Tumaco",
      description:
        "Servicios disponibles para una estadía cómoda en El Morro: restaurante, piscina, gimnasio, parqueadero y apoyos de viaje.",
      items: servicesCatalog.map((service) => ({
        name: service.title,
        description: service.description,
        path: "/servicios",
      })),
    }),
  ];

  return (
    <div className="pb-16 md:pb-24">
      <JsonLdScript data={jsonLd} />

      <PageHero
        eyebrow="Servicios"
        title="Todo lo que hace tu estadía más cómoda, en un solo lugar."
        description="Desde el restaurante hasta los servicios del día a día, San Marino reúne lo que necesitas para quedarte con más calma."
        imageSrc={coastalScenes.arch.src}
        imageAlt={coastalScenes.arch.alt}
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label="Preguntar por servicios"
            trackingSource="servicios_hero"
            trackingLabel="Preguntar por servicios"
          />
        }
        aside={
          <div className="mist-panel p-6">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
              Restaurante
            </p>
            <h2 className="mt-4 text-4xl leading-[0.94] text-primary">Cocina de mar</h2>
            <div className="mt-5 space-y-3">
              {restaurantHighlights.map((item) => (
                <p key={item} className="text-sm leading-7 text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>
        }
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <Reveal className="space-y-6">
            <SectionHeading
              eyebrow="Operación"
              title="Servicios pensados para que disfrutes más y te preocupes menos."
              description="Cada espacio y cada apoyo suman comodidad para que tu paso por San Marino se sienta más fácil."
            />
            <div className="premium-card overflow-hidden p-3">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[26px]">
                <Image
                  src={coastalScenes.restaurant.src}
                  alt={coastalScenes.restaurant.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {servicesCatalog.map((service, index) => (
              <Reveal key={service.title} delay={index * 60}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-8 rounded-[24px] bg-[#153b52] p-5 text-white shadow-[0_32px_100px_rgba(21,59,82,0.18)] md:p-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
                Restaurante
              </p>
              <h2 className="mt-4 text-[2.7rem] leading-[0.94] sm:text-5xl">
                Menú del día, sabor local y comida sin salir del hotel.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/74">
                El restaurante es una extensión del descanso: resuelve desayuno,
                almuerzo, cena o una comida familiar cuando el día pide bajar el ritmo.
              </p>
              <TrackedWhatsappCta
                phoneNumber={whatsappPhone}
                message="Hola, quiero preguntar por el menú del día en Hotel San Marino Tumaco."
                label="Preguntar por menú del día"
                trackingSource="servicios_menu"
                trackingLabel="Preguntar por menú del día"
                className="mt-7 bg-[var(--coral)] text-white hover:bg-[#ad5945]"
              />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {restaurantMenuHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="h-full rounded-[18px] border border-white/12 bg-white/8 p-5">
                    <Icon className="size-6 text-[var(--marine-mist)]" />
                    <h3 className="mt-4 text-3xl leading-none text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/70">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <AiAnswerSection
        id="respuestas-servicios"
        eyebrow="Respuestas sobre servicios"
        title="Servicios explicados como respuestas, no como una lista suelta."
        description="Este bloque deja claro qué puede afirmar el hotel y qué conviene confirmar por WhatsApp antes de viajar."
        answers={servicesAiAnswers}
        phoneNumber={whatsappPhone}
        trackingSource="servicios_respuestas"
        ctaLabel="Consultar servicio"
        variant="ivory"
      />

      <CtaBanner
        eyebrow="WhatsApp"
        title="Si quieres confirmar un servicio o coordinar algo especial, escríbenos."
        description="Por WhatsApp podemos ayudarte a resolver detalles, horarios y solicitudes de manera rápida."
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label="Hablar sobre servicios"
            trackingSource="servicios_cta_final"
            trackingLabel="Hablar sobre servicios"
          />
        }
      />
    </div>
  );
}
