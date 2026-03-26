import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import {
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
        title="Servicios que hacen la estadia mas simple y mas completa"
        description="Desde conectividad y zonas comunes hasta restaurante, tienda 24 horas y apoyo para planes complementarios. El objetivo es resolver con claridad, no sumar ruido."
        aside={
          <div className="rounded-[30px] bg-white/80 p-7 shadow-[0_18px_40px_rgba(16,45,63,0.08)]">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Restaurante
            </p>
            <h2 className="mt-4 text-4xl">Cocina de mar</h2>
            <div className="mt-5 space-y-3">
              {restaurantHighlights.map((item) => (
                <p key={item} className="text-sm leading-6 text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>
        }
      />

      <section className="section-shell">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {servicesCatalog.map((service, index) => (
            <Reveal key={service.title} delay={index * 70}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="WhatsApp"
        title="Si quieres confirmar un servicio o coordinar algo especial"
        description="Lo mas util es escribir directo. WhatsApp concentra la conversacion comercial y operativa de esta fase."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Consultar servicios"
            className="bg-white text-primary hover:bg-white/92"
          />
        }
      />
    </div>
  );
}
