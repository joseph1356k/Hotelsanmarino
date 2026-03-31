import Link from "next/link";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { buttonVariants } from "@/components/ui/button";
import { siteMaps } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

interface LocationMapSectionProps {
  address: string;
  phoneNumber: string;
  whatsappMessage: string;
}

export function LocationMapSection({
  address,
  phoneNumber,
  whatsappMessage,
}: LocationMapSectionProps) {
  return (
    <section className="section-shell pt-10 md:pt-14">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <Reveal className="flex">
          <div className="ocean-panel relative flex w-full flex-col justify-between overflow-hidden px-6 py-7 md:px-8 md:py-9">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-36 w-36 bg-[radial-gradient(circle,rgba(248,218,102,0.22)_0%,rgba(248,218,102,0)_72%)]" />
            </div>

            <div className="relative space-y-6">
              <SectionHeading
                eyebrow="Ubicacion"
                title="Estamos en El Morro"
                description="Encuentranos en una ubicacion comoda y clara para llegar al hotel y moverte con mas facilidad entre Tumaco, playa y descanso."
                className="max-w-none [&_h2]:text-white [&_p]:text-white/78 [&_span]:text-[var(--sun-soft)]"
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                  <div className="inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-[var(--sun-soft)]">
                    <MapPin className="size-5" />
                  </div>
                  <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/62">
                    Direccion
                  </p>
                  <p className="mt-3 text-lg leading-7 text-white">{address}</p>
                </div>

                <div className="rounded-[24px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                  <div className="inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-[var(--sun-soft)]">
                    <Navigation className="size-5" />
                  </div>
                  <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/62">
                    Referencia
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/76">
                    Si necesitas una indicacion puntual, el canal mas directo sigue
                    siendo WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={siteMaps.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "justify-center",
                )}
              >
                <ExternalLink className="size-4" />
                Abrir en Google Maps
              </Link>
              <WhatsappCta
                phoneNumber={phoneNumber}
                message={whatsappMessage}
                label="Pedir referencia"
                variant="secondary"
                size="lg"
                className="justify-center border-white/24 bg-white/10 text-white hover:border-white hover:bg-white hover:text-primary"
              />
            </div>
          </div>
        </Reveal>

        <Reveal className="flex" delay={120}>
          <div className="premium-card flex w-full flex-col overflow-hidden p-3 md:p-4">
            <div className="relative min-h-[320px] w-full overflow-hidden rounded-[28px] border border-black/5 bg-[linear-gradient(180deg,rgba(24,79,95,0.02),rgba(24,79,95,0.06))] sm:min-h-[360px] lg:min-h-[100%]">
              <iframe
                title="Mapa Hotel San Marino Tumaco"
                src={siteMaps.embedSrc}
                width="100%"
                height="100%"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-col gap-4 px-2 pb-2 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary/72">
                  Google Maps
                </p>
                <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                  Mira la ubicacion exacta del hotel dentro del mapa y abre la ruta
                  completa en una pestaña nueva cuando la necesites.
                </p>
              </div>
              <Link
                href={siteMaps.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "shrink-0 justify-center",
                )}
              >
                <ExternalLink className="size-4" />
                Abrir mapa
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
