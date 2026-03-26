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
import { Reveal } from "@/components/marketing/reveal";
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
              className="inline-flex items-center justify-center rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-primary"
            >
              Ver habitaciones
            </Link>
          </>
        }
        aside={
          <div className="space-y-5">
            <div className="mist-panel overflow-hidden p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
                <Image
                  src={resolveEntityImage("room", heroImage)}
                  alt="Hotel San Marino Tumaco"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#153B52]/55 via-[#153B52]/18 to-transparent" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="mist-panel px-5 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Contacto
                </p>
                <p className="mt-2 text-lg font-semibold text-primary">
                  WhatsApp directo
                </p>
              </div>
              <div className="mist-panel px-5 py-4">
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
            <Reveal key={item} delay={index * 80}>
              <div className="rounded-full border border-primary/10 bg-white/82 px-5 py-3 text-center text-xs uppercase tracking-[0.24em] text-foreground/82 shadow-[0_14px_34px_rgba(16,45,63,0.05)]">
                <span className="mr-3 text-[var(--coral)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Por que San Marino"
            title={hero?.subtitle ?? "Calma con identidad, contacto directo y una estadia mejor presentada."}
            description="La propuesta no depende de frases grandilocuentes. Se sostiene en claridad, ubicacion, descanso y una presentacion mucho mas cuidada que la media."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {valuePillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 90}>
              <article className="premium-card h-full p-7">
                <div className="mb-6 h-px w-20 bg-[linear-gradient(90deg,#153b52,#5f7264)]" />
                <h3 className="text-3xl leading-none">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {pillar.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Habitaciones destacadas"
              title={featuredBlock?.title ?? "Habitaciones para elegir con calma"}
              description={
                featuredBlock?.body ??
                "Imagen, capacidad y contexto para decidir mejor, sin parecer un catalogo frio."
              }
            />
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/habitaciones"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
            >
              Ver todas
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredRooms.map((room, index) => (
            <Reveal key={room.id} delay={index * 90}>
              <RoomCard room={room} primaryCta={primaryCta} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="ocean-panel relative overflow-hidden px-6 py-8 md:px-10 md:py-10 lg:px-12">
          <div className="absolute inset-0">
            <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-white/6 blur-3xl" />
            <div className="absolute bottom-[-4rem] right-[-2rem] h-56 w-56 rounded-full bg-[var(--coral)]/8 blur-[120px]" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal className="space-y-6">
              <SectionHeading
                eyebrow={liveElMorroSection.eyebrow}
                title={liveElMorroSection.title}
                description={liveElMorroSection.description}
                className="text-white [&_p]:text-white/72 [&_p:first-child]:text-white/58 [&_h2]:text-white"
              />
              <div className="space-y-4">
                {liveElMorroSection.points.map((point, index) => (
                  <Reveal key={point} delay={index * 90}>
                    <div className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-white/7 px-5 py-4 backdrop-blur-sm">
                      <Sparkles className="mt-1 size-4 shrink-0 text-[var(--coral)]" />
                      <p className="text-sm leading-6 text-white/74">{point}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150} distance={40}>
              <div className="relative overflow-hidden rounded-[34px]">
                <Image
                  src={resolveEntityImage("room", galleryItems[1]?.src ?? heroImage)}
                  alt="Vista editorial de Hotel San Marino"
                  width={1200}
                  height={900}
                  className="aspect-[5/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#153B52]/62 via-[#153B52]/18 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="premium-card p-6">
                <Fish className="size-6 text-[var(--coral)]" />
                <h3 className="mt-5 text-3xl">Cocina de mar</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Pescado, camarones y langostino en una propuesta serena, local y
                  mejor presentada.
                </p>
              </div>
              <div className="rounded-[28px] border border-primary/8 bg-muted p-6 shadow-[0_18px_40px_rgba(16,45,63,0.06)]">
                <Waves className="size-6 text-primary" />
                <h3 className="mt-5 text-3xl">Ritmo costero</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/78">
                  Un restaurante que acompaña la estadia sin volverla pesada ni
                  artificial.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal className="order-1 space-y-6 lg:order-2" delay={120}>
            <SectionHeading
              eyebrow="Restaurante"
              title="Comer bien tambien hace parte de la estadia"
              description="San Marino suma restaurante con desayuno, almuerzo y cena para que la experiencia del hotel se sienta completa desde lo cotidiano."
            />
            <div className="space-y-3">
              {restaurantHighlights.map((item, index) => (
                <Reveal key={item} delay={index * 90}>
                  <div className="flex items-start gap-3 border-b border-border/60 py-3">
                    <Fish className="mt-1 size-4 shrink-0 text-[var(--coral)]" />
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-[rgba(238,242,241,0.72)]">
        <Reveal>
          <SectionHeading
            eyebrow="Servicios"
            title="Comodidades que ordenan mejor la estadia"
            description="Servicios pensados para que el hotel resuelva lo importante con mas claridad: descanso, apoyo practico y contacto directo cuando hace falta."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {servicesCatalog.slice(0, 8).map((service, index) => (
            <Reveal key={service.title} delay={index * 70}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,243,236,0.92)] px-4 py-2 shadow-[0_10px_22px_rgba(16,45,63,0.05)]">
              <Wifi className="size-4 text-primary" />
              WiFi
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,243,236,0.92)] px-4 py-2 shadow-[0_10px_22px_rgba(16,45,63,0.05)]">
              <ParkingCircle className="size-4 text-primary" />
              Parqueadero
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,243,236,0.92)] px-4 py-2 shadow-[0_10px_22px_rgba(16,45,63,0.05)]">
              <MapPin className="size-4 text-primary" />
              Tours con terceros
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,243,236,0.92)] px-4 py-2 shadow-[0_10px_22px_rgba(16,45,63,0.05)]">
              <MessageCircle className="size-4 text-primary" />
              Atencion directa
            </span>
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonios"
            title="Confianza desde voces reales"
            description="Una capa de prueba social limpia, creible y mejor integrada al ritmo editorial del sitio."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {content.testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 100}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Galeria"
              title="Una mirada curada a los espacios"
              description="Media real o fallback editorial, siempre con una presentacion controlada, atmosferica y lista para crecer."
            />
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/galeria"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
            >
              Ver galeria completa
            </Link>
          </Reveal>
        </div>
        <Reveal className="mt-10" delay={120}>
          <GalleryGrid items={galleryItems} limit={6} />
        </Reveal>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="space-y-5">
            <SectionHeading
              eyebrow="Ubicacion"
              title="El hotel se entiende mejor con contexto"
              description="San Marino se conecta con El Morro y Tumaco desde una idea de cercania, acceso simple y contacto directo para resolver cualquier duda de llegada."
            />
            <div className="premium-card p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Referencia base
              </p>
              <p className="mt-3 text-2xl text-primary">{content.contactInfo.address}</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Si necesitas una referencia puntual para llegar o coordinar tu
                llegada, lo mejor es escribir por WhatsApp.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="mist-panel p-8">
              <div className="aspect-[4/3] rounded-[26px] bg-muted p-6">
                <div className="flex h-full flex-col items-start justify-between rounded-[20px] border border-dashed border-primary/25 bg-[linear-gradient(180deg,rgba(238,242,241,0.74),rgba(247,243,236,0.92))] p-6">
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
          </Reveal>
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
              className="bg-[var(--coral)] text-[var(--ivory)] hover:bg-[var(--accent-hover)]"
            />
          }
        />
      </div>
    </div>
  );
}
