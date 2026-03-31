import Image from "next/image";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { coastalScenes, locationContext } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function LocationPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Ubicacion"
        title="El Morro y Tumaco ahora entran al sitio con mucho mas contexto."
        description="La pagina de ubicacion refuerza cercania, referencia y una lectura territorial mas clara desde la primera pantalla."
        imageSrc={coastalScenes.aerial.src}
        imageAlt={coastalScenes.aerial.alt}
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="space-y-6">
            <SectionHeading
              eyebrow="Llegada"
              title="Una referencia visual y operativa mejor resuelta."
              description="El usuario entiende mejor donde esta el hotel y que hacer si necesita una indicacion puntual."
            />

            <div className="premium-card overflow-hidden p-3">
              {content.contactInfo.maps_embed_url ? (
                <iframe
                  title="Mapa Hotel San Marino"
                  src={content.contactInfo.maps_embed_url}
                  className="aspect-[5/4] w-full rounded-[26px] border"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="relative aspect-[5/4] overflow-hidden rounded-[26px]">
                  <Image
                    src={coastalScenes.arch.src}
                    alt={coastalScenes.arch.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.08),rgba(17,47,59,0.6))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/88 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary">
                      <MapPin className="size-4" />
                      Mapa pendiente desde DB
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          <div className="space-y-5">
            <div className="editorial-panel p-6 md:p-7">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Direccion base
              </p>
              <p className="mt-3 text-3xl leading-[0.96] text-primary">
                {content.contactInfo.address}
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Si quieres confirmar la forma mas simple de llegar, escribe directo
                al hotel por WhatsApp.
              </p>
            </div>

            <div className="grid gap-4">
              {locationContext.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 80}>
                    <article className="premium-card p-6">
                      <div className="inline-flex size-11 items-center justify-center rounded-[22px] bg-primary/8 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h2 className="mt-5 text-3xl leading-[0.96]">{item.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <WhatsappCta
              phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
              message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
              label="Pedir referencia por WhatsApp"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
