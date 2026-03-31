import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { PlanCard } from "@/components/marketing/plan-card";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function PlansPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Planes"
        title="Planes editables, mejor contados y listos para conversarse directo."
        description="La capa comercial de planes ya no se siente provisional: tiene imagen, jerarquia y una salida clara a WhatsApp."
        imageSrc={coastalScenes.aerial.src}
        imageAlt={coastalScenes.aerial.alt}
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Consultar planes"
          />
        }
        aside={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="mist-panel px-5 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Planes activos
              </p>
              <p className="mt-3 text-4xl text-primary">{content.plans.length}</p>
            </div>
            <div className="mist-panel px-5 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Cierre comercial
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
              eyebrow="Campanas"
              title="Una vitrina mas util para escapadas, paquetes y ofertas futuras."
              description="La pagina se apoya en DB real, pero ya tiene un lenguaje mas fuerte para presentar cualquier plan sin verse vacia."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Uso comercial
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/84">
                Aqui pueden vivir campañas, escapadas o activaciones del hotel sin
                depender de un checkout o una reserva automatica.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {content.plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 90}>
              <PlanCard plan={plan} primaryCta={primaryCta} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="WhatsApp"
        title="Si un plan te interesa, el paso real es escribir."
        description="No hay checkout ni reserva automatica. Esta fase prioriza una conversacion rapida para revisar el plan correcto."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Hablar por WhatsApp"
          />
        }
      />
    </div>
  );
}
