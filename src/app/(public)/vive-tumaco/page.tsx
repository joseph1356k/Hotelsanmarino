import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import { destinationExperiences, experiencePackages } from "@/content/commercial-content";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";
import { siteMaps } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Vive Tumaco desde San Marino | El Morro se vive aquí",
  description:
    "Planes, experiencias y recomendaciones para vivir Tumaco desde Hotel San Marino en El Morro: playa, gastronomía, atardecer, pareja, familia y recorridos aliados.",
  keywords: [
    "vive Tumaco",
    "El Morro Tumaco",
    "planes en Tumaco",
    "hotel en El Morro Tumaco",
    "Hotel San Marino Tumaco",
  ],
};

export default async function ViveTumacoPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Vive Tumaco"
        title="Pacífico que se vive, no solo se mira."
        description="Usa San Marino como base para caminar hacia El Morro, comer con sabor local, descansar en la piscina y preguntar por recorridos aliados."
        imageSrc={coastalScenes.arch.src}
        imageAlt={coastalScenes.arch.alt}
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message="Hola, quiero recomendaciones para vivir Tumaco desde Hotel San Marino."
            label="Pedir recomendación"
            trackingSource="vive_tumaco_hero"
            trackingLabel="Pedir recomendación"
          />
        }
        aside={
          <div className="mist-panel p-6">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
              Base del viaje
            </p>
            <h2 className="mt-4 text-4xl leading-[0.94] text-primary">El Morro</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Mar, restaurante, piscina, habitaciones por capacidad y contacto directo
              para decidir mejor cada momento del viaje.
            </p>
          </div>
        }
      />

      <section className="section-shell">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Desde San Marino"
              title="Una guía simple para imaginar tu día en Tumaco."
              description="Agrupamos los planes por intención: caminar, comer, descansar, compartir o pedir orientación para recorridos aliados."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Recomendación humana
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/84">
                No vendemos rutas genéricas. Te orientamos por WhatsApp según fecha,
                grupo, clima y disponibilidad de aliados.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {destinationExperiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 60}>
                <article className="group h-full overflow-hidden rounded-[18px] border border-[#d8cbbb] bg-[#fffaf2] shadow-[0_20px_62px_rgba(21,59,82,0.08)]">
                  <div className="relative aspect-[5/3] overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="inline-flex items-center gap-2 rounded-full bg-primary/6 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mangrove)]">
                      <Icon className="size-3.5 text-[var(--coral)]" />
                      {item.distance}
                    </p>
                    <h2 className="mt-4 text-3xl leading-none text-primary">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-foreground/72">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-[#153b52] py-16 text-white md:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-[20px] border border-white/14 bg-white/8 p-3">
                <iframe
                  title="Mapa de Hotel San Marino y El Morro"
                  src={content.contactInfo.maps_embed_url ?? siteMaps.embedSrc}
                  loading="lazy"
                  className="h-[420px] w-full rounded-[14px] border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
            <Reveal className="space-y-6" delay={100}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
                Ubicación viva
              </p>
              <h2 className="text-[2.7rem] leading-[0.94] sm:text-5xl">
                Llegar, preguntar y moverte con más confianza.
              </h2>
              <p className="text-base leading-8 text-white/74">
                La ubicación del hotel funciona como punto de partida: El Morro,
                playa, gastronomía, atardecer y recorridos aliados se conversan mejor
                cuando tienes una base clara.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[16px] border border-white/12 bg-white/8 p-4">
                  <MapPin className="size-5 text-[var(--marine-mist)]" />
                  <p className="mt-3 text-sm text-white/76">Referencia de llegada</p>
                </div>
                <div className="rounded-[16px] border border-white/12 bg-white/8 p-4">
                  <MessageCircle className="size-5 text-[var(--marine-mist)]" />
                  <p className="mt-3 text-sm text-white/76">Planes por WhatsApp</p>
                </div>
              </div>
              <TrackedWhatsappCta
                phoneNumber={whatsappPhone}
                message="Hola, quiero preguntar por recorridos aliados y recomendaciones desde Hotel San Marino."
                label="Preguntar por recorridos"
                trackingSource="vive_tumaco_recorridos"
                trackingLabel="Preguntar por recorridos"
                className="bg-[var(--coral)] text-white hover:bg-[#ad5945]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Planes que encajan"
            title="Elige una intención y conversemos disponibilidad."
            description="Los paquetes se ajustan por WhatsApp según fechas, personas y habitación disponible."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {experiencePackages.map((item, index) => (
            <Reveal key={item.id} delay={index * 70}>
              <article className="flex h-full flex-col rounded-[18px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_20px_62px_rgba(21,59,82,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                  {item.audience}
                </p>
                <h2 className="mt-4 text-3xl leading-none text-primary">{item.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-foreground/72">
                  {item.description}
                </p>
                <TrackedWhatsappCta
                  phoneNumber={whatsappPhone}
                  message={item.whatsappMessage}
                  label="Consultar plan"
                  size="sm"
                  trackingSource="vive_tumaco_plan"
                  trackingLabel="Consultar plan"
                  trackingDetail={item.title}
                  className="mt-5 w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/planes"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
          >
            Ver todos los planes
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
