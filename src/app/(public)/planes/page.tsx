import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { PlanCard } from "@/components/marketing/plan-card";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function PlansPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;
  const whatsappMessage = primaryCta?.message ?? content.contactInfo.whatsapp_default_message;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Planes"
        title="Planes pensados para que tu visita tenga un motivo extra."
        description="Descubre opciones para escapadas, viajes de trabajo o estadías con más contexto, y conversemos la mejor alternativa para ti."
        imageSrc={coastalScenes.aerial.src}
        imageAlt={coastalScenes.aerial.alt}
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label="Preguntar por planes"
            trackingSource="planes_hero"
            trackingLabel="Preguntar por planes"
          />
        }
        aside={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="mist-panel px-5 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Opciones disponibles
              </p>
              <p className="mt-3 text-4xl text-primary">{content.plans.length}</p>
            </div>
            <div className="mist-panel px-5 py-5">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                Atención directa
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
              eyebrow="Escapadas y opciones"
              title="Una forma simple de encontrar un plan que vaya con tu viaje."
              description="Aquí reunimos ideas para quedarte, celebrar o resolver una visita con más facilidad."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Para que te sirva
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/84">
                Si algún plan te interesa, lo revisamos contigo por WhatsApp y te
                ayudamos a ver la opción que mejor encaja.
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
        title="Si un plan te llama la atención, conversemos."
        description="Escríbenos por WhatsApp y te contamos detalles, condiciones y la mejor forma de aprovecharlo."
        actions={
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label="Consultar este plan"
            trackingSource="planes_cta_final"
            trackingLabel="Consultar este plan"
          />
        }
      />
    </div>
  );
}
