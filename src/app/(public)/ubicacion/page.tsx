import { MapPin } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { locationContext } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function LocationPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="pb-16 md:pb-24">
      <PageHero
        eyebrow="Ubicacion"
        title="El Morro y Tumaco como contexto de la estadia"
        description="La ubicacion se presenta como una referencia de confianza. Si necesitas apoyo para llegar, el canal operativo correcto es WhatsApp."
      />

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-7 shadow-[0_18px_40px_rgba(16,45,63,0.08)]">
            {content.contactInfo.maps_embed_url ? (
              <iframe
                title="Mapa Hotel San Marino"
                src={content.contactInfo.maps_embed_url}
                className="aspect-[5/4] w-full rounded-[24px] border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex aspect-[5/4] flex-col justify-between rounded-[24px] border border-dashed border-primary/25 bg-[linear-gradient(180deg,rgba(21,59,82,0.06),rgba(95,114,100,0.08))] p-6">
                <MapPin className="size-8 text-primary" />
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Mapa pendiente desde DB
                  </p>
                  <p className="max-w-md text-lg leading-7 text-foreground/86">
                    El espacio ya esta preparado para usar `maps_embed_url` cuando
                    el dato editorial este cargado.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-5">
            <div className="rounded-[30px] bg-secondary p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Direccion base
              </p>
              <p className="mt-3 text-3xl text-primary">{content.contactInfo.address}</p>
              <p className="mt-4 text-sm leading-6 text-foreground/80">
                Si quieres confirmar una referencia puntual o la forma mas simple de
                llegar, escribe directo al hotel.
              </p>
            </div>
            <div className="grid gap-4">
              {locationContext.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-[26px] bg-white/80 p-6 shadow-[0_16px_40px_rgba(16,45,63,0.08)]"
                  >
                    <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-5 text-3xl">{item.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
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
