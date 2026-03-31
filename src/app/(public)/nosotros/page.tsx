import Image from "next/image";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { aboutNarrative, coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AboutPage() {
  const content = await getPublicSiteContent();

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Nosotros"
        title="San Marino es una forma cercana de quedarse bien en El Morro."
        description={`${aboutNarrative.intro} ${aboutNarrative.story}`}
        imageSrc={coastalScenes.arch.src}
        imageAlt={coastalScenes.arch.alt}
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <Reveal className="space-y-6">
            <SectionHeading
              eyebrow="Quienes somos"
              title="Un hotel con identidad costera, atencion directa y una forma sencilla de recibirte."
              description="San Marino quiere que tu experiencia se sienta cercana, clara y bien cuidada desde el primer momento."
            />
            <div className="premium-card overflow-hidden p-3">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[26px]">
                <Image
                  src={coastalScenes.aerial.src}
                  alt={coastalScenes.aerial.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {aboutNarrative.pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={index * 90}>
                  <article className="premium-card p-6 md:p-7">
                    <div className="inline-flex size-12 items-center justify-center rounded-[24px] bg-primary/8 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-6 text-3xl leading-[0.96]">{pillar.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {pillar.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <Reveal className="space-y-5">
            <SectionHeading
              eyebrow="El Morro se vive aqui"
              title="Una estadia que se conecta mejor con Tumaco."
              description={`${content.siteSettings.site_tagline}. Queremos que desde la web hasta tu llegada todo se sienta mas claro, mas amable y mas cercano al lugar.`}
            />
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {content.testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={index * 90}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
