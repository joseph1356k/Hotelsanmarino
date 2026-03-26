import Image from "next/image";
import Link from "next/link";
import {
  Fish,
  MapPin,
  MessageCircle,
  ParkingCircle,
  Sparkles,
  Waves,
  Wifi,
} from "lucide-react";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { PageHero } from "@/components/marketing/page-hero";
import { RoomCard } from "@/components/marketing/room-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import {
  liveElMorroSection,
  restaurantHighlights,
  servicesCatalog,
  trustHighlights,
  valuePillars,
} from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";
import { resolveEntityImage } from "@/lib/media";

export default async function HomePage() {
  const content = await getPublicSiteContent();
  const hero = content.homeSections.find((section) => section.key === "hero");
  const featuredBlock = content.homeSections.find(
    (section) => section.key === "featured_rooms",
  );
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const featuredRooms = content.rooms.filter((room) => room.is_featured).slice(0, 4);
  const galleryItems = content.rooms.flatMap((room) =>
    room.images.map((image) => ({
      id: image.id,
      src: image.storage_path,
      alt: image.alt_text ?? room.name,
    })),
  );
  const heroImage =
    featuredRooms[0]?.primary_image ??
    content.siteSettings.default_share_image ??
    galleryItems[0]?.src ??
    null;

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow={String(hero?.payload.eyebrow ?? "Hotel San Marino")}
        title={hero?.title ?? "El Morro se vive aqui"}
        description={
          hero?.body ??
          "Una estadia clara, comoda y cercana para vivir El Morro con mejor presentacion, atencion directa y contacto simple por WhatsApp."
        }
        actions={
          <>
            <WhatsappCta
              phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
              message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
              label={String(
                hero?.payload.ctaLabel ?? primaryCta?.label ?? "Consultar por WhatsApp",
              )}
            />
            <Link
              href="/habitaciones"
              className="inline-flex items-center justify-center rounded-full border border-primary/18 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/35 hover:bg-primary hover:text-primary-foreground"
            >
              Ver habitaciones
            </Link>
          </>
        }
        aside={
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-[0_20px_60px_rgba(16,45,63,0.08)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                <Image
                  src={resolveEntityImage("room", heroImage)}
                  alt="Hotel San Marino Tumaco"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102d3f]/55 via-transparent to-transparent" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] bg-secondary px-5 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Contacto
                </p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  WhatsApp directo
                </p>
              </div>
              <div className="rounded-[24px] bg-white/80 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Ubicacion
                </p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  {content.contactInfo.city}
                </p>
              </div>
            </div>
          </div>
        }
      />

      <section className="container-shell pt-8 md:pt-10">
        <div className="grid gap-3 md:grid-cols-4">
          {trustHighlights.map((item, index) => (
            <div
              key={item}
              className="rounded-full border border-border/70 bg-white/72 px-5 py-3 text-center text-xs uppercase tracking-[0.24em] text-foreground/82"
            >
              <span className="mr-3 text-[var(--coral)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Por que San Marino"
          title={hero?.subtitle ?? "Calma con identidad, sin vueltas innecesarias"}
          description="La promesa no es llenar de promesas el sitio. Es mostrar con claridad una estadia bien resuelta, con mejor contexto, mejor ritmo y una salida comercial directa."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {valuePillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[28px] border border-white/70 bg-white/78 p-7 shadow-[0_18px_40px_rgba(16,45,63,0.08)]"
            >
              <h3 className="text-3xl leading-none">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Habitaciones destacadas"
            title={featuredBlock?.title ?? "Encuentra una forma simple de elegir"}
            description={
              featuredBlock?.body ??
              "Habitaciones mostradas con imagen, capacidad y detalles claros para decidir sin friccion."
            }
          />
          <Link
            href="/habitaciones"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
          >
            Ver todas
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} primaryCta={primaryCta} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={liveElMorroSection.eyebrow}
              title={liveElMorroSection.title}
              description={liveElMorroSection.description}
            />
            <div className="space-y-4">
              {liveElMorroSection.points.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-[24px] bg-white/70 px-5 py-4"
                >
                  <Sparkles className="mt-1 size-4 shrink-0 text-[var(--coral)]" />
                  <p className="text-sm leading-6 text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[34px]">
            <Image
              src={resolveEntityImage("room", galleryItems[1]?.src ?? heroImage)}
              alt="Vista editorial de Hotel San Marino"
              width={1200}
              height={900}
              className="aspect-[5/4] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#102d3f]/60 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-white/75 p-6 shadow-[0_18px_40px_rgba(16,45,63,0.08)]">
                <Fish className="size-6 text-[var(--coral)]" />
                <h3 className="mt-5 text-3xl">Cocina de mar</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Pescado, camarones y langostino en una propuesta sencilla,
                  cercana y bien presentada.
                </p>
              </div>
              <div className="rounded-[28px] bg-secondary p-6">
                <Waves className="size-6 text-primary" />
                <h3 className="mt-5 text-3xl">Ritmo costero</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/78">
                  Un restaurante que acompaña la estadia sin volverla ruidosa.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 space-y-6 lg:order-2">
            <SectionHeading
              eyebrow="Restaurante"
              title="Comer bien tambien hace parte de la estadia"
              description="San Marino suma restaurante con desayuno, almuerzo y cena para que la experiencia del hotel se sienta completa desde lo cotidiano."
            />
            <div className="space-y-3">
              {restaurantHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border-b border-border/60 py-3"
                >
                  <Fish className="mt-1 size-4 shrink-0 text-[var(--coral)]" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Servicios"
          title="Comodidades que ordenan mejor la estadia"
          description="Servicios pensados para que el hotel resuelva lo importante con mas claridad: descanso, apoyo practico y contacto directo cuando hace falta."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {servicesCatalog.slice(0, 8).map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
            <Wifi className="size-4 text-primary" />
            WiFi
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
            <ParkingCircle className="size-4 text-primary" />
            Parqueadero
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
            <MapPin className="size-4 text-primary" />
            Tours con terceros
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
            <MessageCircle className="size-4 text-primary" />
            Atencion directa
          </span>
        </div>
      </section>

      <section className="section-shell">
        <SectionHeading
          eyebrow="Testimonios"
          title="Confianza desde voces reales"
          description="Los testimonios se administran desde DB y sostienen una idea simple: el sitio debe transmitir confianza sin volverse grandilocuente."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {content.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Galeria"
            title="Una mirada limpia a los espacios"
            description="Media real o fallback editorial, siempre con una presentacion controlada y lista para crecer."
          />
          <Link
            href="/galeria"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
          >
            Ver galeria completa
          </Link>
        </div>
        <div className="mt-10">
          <GalleryGrid items={galleryItems} limit={6} />
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-5">
            <SectionHeading
              eyebrow="Ubicacion"
              title="El hotel se entiende mejor con contexto"
              description="San Marino se conecta con El Morro y Tumaco desde una idea de cercania, acceso simple y contacto directo para resolver cualquier duda de llegada."
            />
            <div className="rounded-[28px] bg-white/78 p-6 shadow-[0_18px_40px_rgba(16,45,63,0.08)]">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Referencia base
              </p>
              <p className="mt-3 text-2xl text-primary">{content.contactInfo.address}</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Si necesitas una referencia puntual para llegar o coordinar tu
                llegada, lo mejor es escribir por WhatsApp.
              </p>
            </div>
          </div>
          <div className="rounded-[34px] border border-white/70 bg-white/78 p-8 shadow-[0_18px_40px_rgba(16,45,63,0.08)]">
            <div className="aspect-[4/3] rounded-[26px] bg-muted p-6">
              <div className="flex h-full flex-col items-start justify-between rounded-[20px] border border-dashed border-primary/25 bg-[linear-gradient(180deg,rgba(21,59,82,0.06),rgba(95,114,100,0.08))] p-6">
                <MapPin className="size-8 text-primary" />
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Tumaco · El Morro
                  </p>
                  <p className="max-w-sm text-lg leading-7 text-foreground/86">
                    Bloque de mapa preparado para usar `maps_embed_url` desde DB
                    cuando el dato editorial este disponible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16 md:pb-24">
        <CtaBanner
          eyebrow="WhatsApp"
          title="La forma mas directa de seguir la conversacion"
          description="Sin formularios publicos. Sin reserva falsa. Si quieres revisar habitaciones, planes o llegar mejor orientado, el siguiente paso es WhatsApp."
          actions={
            <WhatsappCta
              phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
              message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
              label={primaryCta?.label ?? "Consultar por WhatsApp"}
              className="bg-white text-primary hover:bg-white/92"
            />
          }
        />
      </div>
    </div>
  );
}
