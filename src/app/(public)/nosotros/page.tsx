import { PageHero } from "@/components/marketing/page-hero";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { aboutNarrative } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AboutPage() {
  const content = await getPublicSiteContent();

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Nosotros"
        title="Hospitalidad cercana, mejor presentada"
        description={`${aboutNarrative.intro} ${aboutNarrative.story}`}
      />

      <section className="section-shell">
        <div className="grid gap-6 lg:grid-cols-3">
          {aboutNarrative.pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="rounded-[28px] border border-white/70 bg-white/80 p-7 shadow-[0_18px_40px_rgba(16,45,63,0.08)]"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-6 text-3xl">{pillar.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--mangrove)]">
              El Morro se vive aqui
            </p>
            <h2 className="text-balance text-4xl md:text-5xl">
              Una forma de quedarse mejor conectada con Tumaco
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              {content.siteSettings.site_tagline}. El sitio y el hotel comparten
              la misma idea: bajar friccion, elevar presentacion y sostener una
              conversacion clara con quien quiere quedarse.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {content.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
