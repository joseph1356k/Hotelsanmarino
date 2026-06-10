import Image from "next/image";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { AiAnswerSection } from "@/components/marketing/ai-answer-section";
import { BookingAssistant } from "@/components/marketing/booking-assistant";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLdScript } from "@/components/marketing/json-ld-script";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { SocialLinks } from "@/components/marketing/social-links";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import { experiencePackages } from "@/content/commercial-content";
import { buildBreadcrumbJsonLd, getAiAnswersByIds } from "@/content/ai-answer-content";
import { roomCatalog } from "@/content/room-catalog";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

const contactAiAnswers = getAiAnswersByIds([
  "como-reservar-por-whatsapp",
  "consultar-disponibilidad-precios",
  "donde-queda-hotel-san-marino-tumaco",
  "recepcion-24-horas",
  "hotel-con-parqueadero-en-tumaco",
  "menu-del-dia-restaurante",
]);

export default async function ContactPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;
  const whatsappMessage = primaryCta?.message ?? content.contactInfo.whatsapp_default_message;
  const jsonLd = buildBreadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" },
  ]);

  const contactBlocks = [
    {
      title: "Teléfono",
      value: content.contactInfo.phone,
      icon: Phone,
    },
    {
      title: "WhatsApp",
      value: primaryCta?.phone_number ?? content.contactInfo.whatsapp_number,
      icon: MessageCircle,
    },
    {
      title: "Dirección",
      value: content.contactInfo.address,
      icon: MapPin,
    },
    {
      title: "Email",
      value: content.contactInfo.email ?? "Se coordina por WhatsApp",
      icon: Mail,
    },
    {
      title: "Check-in",
      value: content.contactInfo.check_in_time ?? "--",
      icon: Clock3,
    },
    {
      title: "Check-out",
      value: content.contactInfo.check_out_time ?? "--",
      icon: Clock3,
    },
  ];

  return (
    <div className="pb-16 md:pb-24">
      <JsonLdScript data={jsonLd} />

      <PageHero
        eyebrow="Contacto"
        title="Habla con nosotros y resuelve tu estadía sin vueltas."
        description="Estamos para orientarte, compartir información y ayudarte a elegir la opción que mejor te quede en San Marino."
        imageSrc={coastalScenes.homeHero.src}
        imageAlt={coastalScenes.homeHero.alt}
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label={primaryCta?.label ?? "Consultar por WhatsApp"}
            trackingSource="contacto_hero"
            trackingLabel={primaryCta?.label ?? "Consultar por WhatsApp"}
          />
        }
      />

      <BookingAssistant
        rooms={roomCatalog}
        packages={experiencePackages}
        phoneNumber={whatsappPhone}
        trackingSource="reserva_guiada_contacto"
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="Contacto directo"
                title="Toda la información que necesitas para escribirnos con confianza."
                description="Teléfono, dirección, horarios y redes para que te comuniques con el hotel de la forma que te resulte más cómoda."
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {contactBlocks.map((block, index) => {
                const Icon = block.icon;
                return (
                  <Reveal key={block.title} delay={index * 60}>
                    <article className="premium-card p-6">
                      <div className="inline-flex size-11 items-center justify-center rounded-[22px] bg-primary/8 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <p className="mt-5 text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                        {block.title}
                      </p>
                      <p className="mt-3 text-lg leading-7 text-foreground/86">
                        {block.value}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="space-y-5">
            <Reveal>
              <div className="mist-panel p-6 md:p-7">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Atención por WhatsApp
                </p>
                <p className="mt-4 text-2xl leading-8 text-foreground/86">
                  Escríbenos y te ayudamos a revisar habitaciones, tarifas y cualquier duda antes de tu llegada.
                </p>
                <div className="mt-6">
                  <TrackedWhatsappCta
                    phoneNumber={whatsappPhone}
                    message={whatsappMessage}
                    label="Escribir por WhatsApp"
                    trackingSource="contacto_panel"
                    trackingLabel="Escribir por WhatsApp"
                    className="w-full justify-center"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="premium-card overflow-hidden p-3">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[26px]">
                  <Image
                    src={coastalScenes.arch.src}
                    alt={coastalScenes.arch.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.04),rgba(17,47,59,0.56))]" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="premium-card p-6 md:p-7">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                  Redes sociales
                </p>
                <p className="mt-4 text-lg leading-8 text-foreground/86">
                  Conoce más del hotel, su ambiente y el ritmo de El Morro en nuestras redes.
                </p>
                <SocialLinks className="mt-6" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AiAnswerSection
        id="respuestas-contacto"
        eyebrow="Antes de escribir"
        title="Preguntas que WhatsApp puede resolver más rápido."
        description="Estas respuestas preparan una conversación útil: fechas, número de personas, habitación, servicios y referencia de llegada."
        answers={contactAiAnswers}
        phoneNumber={whatsappPhone}
        trackingSource="contacto_respuestas"
        ctaLabel="Escribir con contexto"
        variant="ivory"
      />

      <CtaBanner
        eyebrow="Canal principal"
        title="Tu próxima conversación con San Marino empieza aquí."
        description="Escríbenos por WhatsApp y te ayudamos a resolver tu estadía de forma rápida, clara y cercana."
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label="Quiero escribir"
            trackingSource="contacto_cta_final"
            trackingLabel="Quiero escribir"
          />
        }
      />
    </div>
  );
}
