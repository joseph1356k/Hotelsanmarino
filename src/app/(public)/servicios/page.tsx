import Image from "next/image";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import {
  coastalScenes,
  restaurantHighlights,
  servicesCatalog,
} from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function ServicesPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Servicios"
        title="Servicios mostrados con mas caracter y mejor lectura comercial."
        description="La pagina ya no es una lista plana: servicios, restaurante y apoyos del hotel entran en una composicion mas viva y mejor conectada con la marca."
        imageSrc={coastalScenes.arch.src}
        imageAlt={coastalScenes.arch.alt}
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Consultar servicios"
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
              eyebrow="Operacion"
              title="Servicios que hacen la estadia mas comoda sin quitarle identidad."
              description="Lo util del hotel ahora se presenta con mas orden visual y con mejor relacion entre texto, imagen y accion."
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

      <CtaBanner
        eyebrow="WhatsApp"
        title="Si quieres confirmar un servicio o coordinar algo especial."
        description="Lo mas util sigue siendo escribir directo. WhatsApp concentra la conversacion comercial y operativa de esta fase."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Consultar servicios"
          />
        }
      />
    </div>
  );
}
