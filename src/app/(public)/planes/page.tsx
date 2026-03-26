import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { PlanCard } from "@/components/marketing/plan-card";
import { Reveal } from "@/components/marketing/reveal";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function PlansPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Planes"
        title="Planes listos para activarse y conversarse directo"
        description="Los planes se administran desde DB y se presentan como una capa comercial flexible para campañas, escapadas o necesidades puntuales."
        aside={
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[26px] bg-white/80 p-5 shadow-[0_16px_40px_rgba(16,45,63,0.08)]">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Planes activos
              </p>
              <p className="mt-3 text-4xl text-primary">{content.plans.length}</p>
            </div>
            <div className="rounded-[26px] bg-secondary p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Cierre comercial
              </p>
              <p className="mt-3 text-2xl text-primary">WhatsApp</p>
            </div>
          </div>
        }
      />

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-2">
          {content.plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 90}>
              <PlanCard plan={plan} primaryCta={primaryCta} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow="Consultas"
        title="Si un plan te interesa, la siguiente capa es conversar"
        description="No hay checkout ni reserva automatica. Esta fase prioriza una conversacion rapida para revisar el plan correcto."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
            label="Consultar planes"
            className="bg-white text-primary hover:bg-white/92"
          />
        }
      />
    </div>
  );
}
