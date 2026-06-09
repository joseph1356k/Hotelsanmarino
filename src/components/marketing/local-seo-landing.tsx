import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import type { LocalSeoPage } from "@/content/commercial-content";
import { destinationExperiences, experiencePackages } from "@/content/commercial-content";
import { siteMaps } from "@/lib/constants/site";

export function LocalSeoLanding({
  page,
  phoneNumber,
}: {
  page: LocalSeoPage;
  phoneNumber: string;
}) {
  return (
    <div className="pb-16 md:pb-24">
      <section className="relative min-h-[calc(82svh-var(--public-header-offset))] overflow-hidden bg-[#153b52] text-white">
        <Image
          src={page.image}
          alt={page.keyword}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,59,82,0.92)_0%,rgba(21,59,82,0.74)_48%,rgba(21,59,82,0.18)_100%)]" />
        <div className="container-shell relative flex min-h-[calc(82svh-var(--public-header-offset))] items-end pb-10 pt-14">
          <Reveal className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/62">
              {page.keyword}
            </p>
            <h1 className="mt-5 max-w-4xl text-balance text-[3.3rem] leading-[0.9] sm:text-[5rem] lg:text-[6.8rem]">
              {page.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              {page.heroText}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedWhatsappCta
                phoneNumber={phoneNumber}
                message={page.ctaMessage}
                label="Consultar disponibilidad"
                trackingSource={`seo_${page.slug}_hero`}
                trackingLabel="Consultar disponibilidad"
                className="justify-center bg-[var(--coral)] text-white hover:bg-[#ad5945]"
              />
              <Link
                href="/habitaciones"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/22 px-5 text-sm font-semibold text-white transition hover:bg-white hover:text-primary"
              >
                Ver habitaciones
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--mangrove)]">
                Por qué San Marino
              </p>
              <h2 className="mt-4 text-[2.5rem] leading-[0.94] text-primary sm:text-5xl">
                Una respuesta clara para quien busca {page.keyword}.
              </h2>
              <p className="mt-5 text-base leading-8 text-foreground/74">
                Esta página resume lo importante para decidir rápido: ubicación,
                servicios, experiencia y contacto directo.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.proof.map((item, index) => (
              <Reveal key={item} delay={index * 70}>
                <div className="h-full rounded-[16px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)]">
                  <CheckCircle2 className="size-5 text-[var(--coral)]" />
                  <p className="mt-4 text-xl font-semibold leading-7 text-primary">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9dfcf] py-16 md:py-24">
        <div className="container-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            {page.sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 90}>
                <article className="h-full rounded-[20px] border border-[#d8cbbb] bg-[#fffaf2] p-6 shadow-[0_20px_62px_rgba(21,59,82,0.08)] md:p-8">
                  <h2 className="text-[2.4rem] leading-none text-primary">{section.title}</h2>
                  <p className="mt-5 text-base leading-8 text-foreground/74">
                    {section.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-[20px] border border-[#d8cbbb] bg-white p-3 shadow-[0_22px_70px_rgba(21,59,82,0.08)]">
              <iframe
                title="Mapa Hotel San Marino Tumaco"
                src={siteMaps.embedSrc}
                loading="lazy"
                className="h-[360px] w-full rounded-[14px] border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--mangrove)]">
                Desde San Marino
              </p>
              <h2 className="text-[2.6rem] leading-[0.94] text-primary sm:text-5xl">
                El Morro como punto de partida.
              </h2>
              <div className="grid gap-3">
                {destinationExperiences.slice(0, 4).map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[14px] border border-[#d8cbbb] bg-[#fffaf2] p-4"
                  >
                    <p className="text-sm font-semibold text-primary">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--mangrove)]">
                      {item.distance}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#153b52] py-16 text-white md:py-24">
        <div className="container-shell">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
                Planes sugeridos
              </p>
              <h2 className="mt-4 text-[2.6rem] leading-[0.94] sm:text-5xl">
                Si ya sabes qué buscas, conversemos el mejor plan.
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {experiencePackages.map((item, index) => (
              <Reveal key={item.id} delay={index * 70}>
                <article className="h-full rounded-[18px] border border-white/12 bg-white/8 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/56">
                    {item.audience}
                  </p>
                  <h3 className="mt-4 text-3xl leading-none">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <TrackedWhatsappCta
              phoneNumber={phoneNumber}
              message={page.ctaMessage}
              label="Reservar por WhatsApp"
              trackingSource={`seo_${page.slug}_final`}
              trackingLabel="Reservar por WhatsApp"
              className="mt-10 bg-[var(--coral)] text-white hover:bg-[#ad5945]"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
