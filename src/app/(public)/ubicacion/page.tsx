import { Compass, Landmark, MapPin } from "lucide-react";
import { LocationMapSection } from "@/components/marketing/location-map-section";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { coastalScenes, locationContext } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function LocationPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  const locationHighlights = [
    {
      title: "Hotel San Marino",
      description:
        "Una referencia clara para ubicarte rapido dentro del ritmo de El Morro.",
      icon: Landmark,
    },
    {
      title: "Google Maps integrado",
      description:
        "Puedes revisar la ubicacion exacta sin salir del sitio y abrir la ruta completa cuando lo necesites.",
      icon: Compass,
    },
    {
      title: "Llegada directa",
      description:
        "Si necesitas apoyo puntual para llegar, la salida correcta sigue siendo WhatsApp.",
      icon: MapPin,
    },
  ];

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Ubicacion"
        title="Estamos en El Morro"
        description="Una ubicacion clara para llegar con mas facilidad al hotel y moverte entre Tumaco, playa y descanso sin perder referencia."
        imageSrc={coastalScenes.aerial.src}
        imageAlt={coastalScenes.aerial.alt}
      />

      <LocationMapSection
        address={content.contactInfo.address}
        phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
        whatsappMessage={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
      />

      <section className="section-shell pt-4">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Contexto"
              title="Llegar bien tambien hace parte de la experiencia."
              description="La ubicacion no se presenta como un dato suelto. Se muestra con mas referencia, lectura territorial y una salida clara cuando necesitas orientacion."
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {locationHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 80}>
                  <article className="premium-card h-full p-6">
                    <div className="inline-flex size-11 items-center justify-center rounded-[22px] bg-primary/8 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-5 text-2xl leading-[1]">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {locationContext.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 70}>
                <article className="mist-panel h-full p-6">
                  <div className="inline-flex size-11 items-center justify-center rounded-[22px] bg-primary/8 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="mt-5 text-2xl leading-[1]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
