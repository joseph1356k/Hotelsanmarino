import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ExternalLink, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { JsonLdScript } from "@/components/marketing/json-ld-script";
import { PageHero } from "@/components/marketing/page-hero";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import {
  aiAnswerCategoryLabels,
  aiAnswers,
  buildBreadcrumbJsonLd,
  buildHotelJsonLd,
  getAiAnswerCanonicalPath,
  hotelFacts,
  hotelGeo,
} from "@/content/ai-answer-content";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";
import { siteMaps, socialLinks } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Datos del hotel | Hotel San Marino Tumaco",
  description:
    "Ficha factual de Hotel San Marino Tumaco para personas y motores de IA: ubicación, servicios, habitaciones, contacto, reserva por WhatsApp y límites de información.",
  keywords: [
    "datos Hotel San Marino Tumaco",
    "Hotel San Marino El Morro",
    "hotel en Tumaco WhatsApp",
    "hotel con piscina y restaurante en Tumaco",
  ],
};

export default async function DatosDelHotelPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;
  const whatsappMessage = primaryCta?.message ?? content.contactInfo.whatsapp_default_message;
  const jsonLd = [
    buildHotelJsonLd(content.contactInfo),
    buildBreadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Datos del hotel", path: "/datos-del-hotel" },
    ]),
  ];

  const contactFacts = [
    { label: "Nombre", value: hotelFacts.name },
    { label: "Concepto", value: hotelFacts.concept },
    { label: "Ubicación", value: hotelFacts.location },
    { label: "Habitaciones", value: `${hotelFacts.roomCount} habitaciones` },
    { label: "Canal principal", value: hotelFacts.primaryConversion },
    { label: "Teléfono", value: content.contactInfo.phone },
    { label: "WhatsApp", value: whatsappPhone },
    { label: "Email", value: content.contactInfo.email ?? "Se coordina por WhatsApp" },
    {
      label: "Check-in",
      value: content.contactInfo.check_in_time ?? "Consultar por WhatsApp",
    },
    {
      label: "Check-out",
      value: content.contactInfo.check_out_time ?? "Consultar por WhatsApp",
    },
    { label: "Mapa", value: "Google Maps disponible" },
    {
      label: "Coordenadas",
      value: `${hotelGeo.latitude}, ${hotelGeo.longitude}`,
    },
  ];

  return (
    <div className="pb-16 md:pb-24">
      <JsonLdScript data={jsonLd} />

      <PageHero
        eyebrow="Datos del hotel"
        title="Información factual para decidir y para que una IA cite bien."
        description="Una ficha visible con datos canónicos de San Marino: ubicación, servicios, reserva, contacto y límites claros para no inventar información."
        imageSrc={coastalScenes.aerial.src}
        imageAlt="Vista aérea de Tumaco y referencia costera de Hotel San Marino"
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label="Confirmar por WhatsApp"
            trackingSource="datos_hotel_hero"
            trackingLabel="Confirmar por WhatsApp"
          />
        }
        aside={
          <div className="mist-panel p-6">
            <ShieldCheck className="size-6 text-[var(--coral)]" aria-hidden />
            <p className="mt-4 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
              Regla editorial
            </p>
            <p className="mt-3 text-2xl leading-8 text-primary">
              Las tarifas, disponibilidad y detalles variables se confirman con una
              persona del hotel por WhatsApp.
            </p>
          </div>
        }
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Ficha canónica"
              title="Datos que sí deben responderse siempre igual."
              description="Esta información ayuda a personas, asistentes IA y buscadores a entender el hotel sin mezclarlo con claims no confirmados."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/preguntas-frecuentes"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/18 px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Ver preguntas frecuentes
                <ExternalLink className="size-4" aria-hidden />
              </Link>
              <Link
                href="/ai-answers.json"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/18 px-5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                Ver JSON para IA
                <ExternalLink className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactFacts.map((fact) => (
              <article
                key={fact.label}
                className="rounded-[16px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)]"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--mangrove)]">
                  {fact.label}
                </p>
                <p className="mt-3 text-xl leading-7 text-primary">{fact.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#153b52] py-16 text-white md:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
                Servicios afirmables
              </p>
              <h2 className="mt-4 text-[2.6rem] leading-[0.94] sm:text-5xl">
                Lo que el sitio puede comunicar con confianza.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/74">
                Estos servicios aparecen como contenido visible y también alimentan el
                schema del hotel. Cualquier condición operativa se confirma por WhatsApp.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {hotelFacts.services.map((service) => (
                <div
                  key={service}
                  className="rounded-[16px] border border-white/12 bg-white/8 p-4"
                >
                  <CheckCircle2 className="size-5 text-[var(--marine-mist)]" />
                  <p className="mt-3 text-sm leading-6 text-white/82">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Respuestas enlazables"
              title="Cada pregunta tiene una URL propia."
              description="Estos anchors permiten citar una respuesta puntual sin depender de texto oculto ni contenido privado de backend."
            />
            <div className="mt-8 grid gap-3">
              {aiAnswers.map((answer) => (
                <Link
                  key={answer.id}
                  href={getAiAnswerCanonicalPath(answer)}
                  className="group rounded-[14px] border border-[#d8cbbb] bg-[#fffaf2] p-4 transition hover:-translate-y-0.5 hover:shadow-[0_18px_56px_rgba(21,59,82,0.08)]"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[var(--mangrove)]">
                    {aiAnswerCategoryLabels[answer.category]}
                  </p>
                  <h3 className="mt-2 text-xl leading-7 text-primary">
                    {answer.question}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/72">
                    {answer.shortAnswer}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="premium-card p-6">
              <MapPin className="size-6 text-[var(--coral)]" aria-hidden />
              <p className="mt-4 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Ubicación
              </p>
              <p className="mt-3 text-2xl leading-8 text-primary">
                {content.contactInfo.address}
                <br />
                {content.contactInfo.city}
              </p>
              <Link
                href={siteMaps.googleMapsUrl}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-[var(--coral)]"
                target="_blank"
                rel="noreferrer"
              >
                Abrir Google Maps
                <ExternalLink className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="premium-card p-6">
              <MessageCircle className="size-6 text-[var(--coral)]" aria-hidden />
              <p className="mt-4 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Límites importantes
              </p>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-foreground/74">
                {hotelFacts.doNotClaim.map((claim) => (
                  <li key={claim}>No inventar {claim}.</li>
                ))}
              </ul>
            </div>

            <div className="premium-card p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Redes oficiales
              </p>
              <div className="mt-4 grid gap-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between gap-3 rounded-[12px] border border-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
                  >
                    {link.label}
                    <ExternalLink className="size-4" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </section>
    </div>
  );
}
