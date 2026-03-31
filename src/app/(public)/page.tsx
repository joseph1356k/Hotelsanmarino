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
import { Reveal } from "@/components/marketing/reveal";
import { RoomCard } from "@/components/marketing/room-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { ServiceCard } from "@/components/marketing/service-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import {
  coastalScenes,
  heroMetrics,
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
  const roomLead = featuredRooms[0] ?? content.rooms[0] ?? null;
  const galleryItems = content.rooms.flatMap((room) =>
    room.images.map((image) => ({
      id: image.id,
      src: image.storage_path,
      alt: image.alt_text ?? room.name,
    })),
  );

  const editorialGallery = [
    { id: "scene-home", src: coastalScenes.homeHero.src, alt: coastalScenes.homeHero.alt },
    { id: "scene-air", src: coastalScenes.aerial.src, alt: coastalScenes.aerial.alt },
    { id: "scene-arch", src: coastalScenes.arch.src, alt: coastalScenes.arch.alt },
    ...galleryItems,
  ];

  return (
    <div className="overflow-hidden pb-16 md:pb-24">
      <section className="container-shell pt-3 md:pt-4">
        <div className="relative overflow-hidden rounded-[40px] border border-[#184f5f] bg-[#184f5f] shadow-[0_36px_120px_rgba(24,79,95,0.24)]">
          <Image
            src={coastalScenes.homeHero.src}
            alt={coastalScenes.homeHero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(108deg,rgba(17,47,59,0.96)_0%,rgba(24,79,95,0.86)_38%,rgba(24,79,95,0.26)_100%)]" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[-3rem] top-[-3rem] h-40 w-40 rounded-full border border-white/12 bg-white/8 blur-2xl md:h-56 md:w-56" />
            <div className="absolute bottom-[-4rem] left-[20%] h-48 w-48 rounded-full bg-[var(--coral)]/18 blur-[110px]" />
            <div className="absolute right-[10%] top-10 h-36 w-36 rounded-full bg-[var(--sun)]/12 blur-3xl" />
            <div className="absolute left-6 top-8 h-px w-24 animate-[shimmer-x_3.6s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,var(--sun),transparent)]" />
          </div>

          <div className="relative grid gap-8 px-5 py-8 sm:px-6 md:px-8 md:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12 lg:py-12">
            <Reveal className="min-w-0 space-y-6" delay={30}>
              <div className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/74">
                <span className="h-px w-12 bg-[linear-gradient(90deg,var(--coral),var(--sun))]" />
                <span>{String(hero?.payload.eyebrow ?? "Hotel San Marino")}</span>
              </div>

              <h1 className="max-w-[8.5ch] text-balance text-[3.55rem] leading-[0.88] text-white sm:max-w-[9ch] sm:text-5xl md:max-w-4xl md:text-6xl lg:text-8xl">
                {hero?.title ?? "El Morro se vive aqui"}
              </h1>

              <p className="max-w-[18rem] text-[1.02rem] leading-8 text-white/86 sm:max-w-[22rem] md:max-w-[34rem] md:text-[1.12rem] md:leading-8">
                {hero?.body ??
                  "Quedate cerca del mar, elige tu habitacion con calma y habla directo con el hotel cuando quieras avanzar."}
              </p>

              <div className="flex flex-wrap gap-3">
                <WhatsappCta
                  phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
                  message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
                  label={String(
                    hero?.payload.ctaLabel ?? primaryCta?.label ?? "Escribir por WhatsApp",
                  )}
                />
                <Link
                  href="/habitaciones"
                  className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-primary"
                >
                  Ver opciones
                </Link>
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-3">
                {heroMetrics.map((metric, index) => (
                  <Reveal key={metric.value} delay={index * 70}>
                    <div className="rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 backdrop-blur-sm">
                      <p className="text-3xl leading-none text-white">{metric.value}</p>
                      <p className="mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-white/72">
                        {metric.label}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal className="min-w-0" delay={160} distance={36}>
              <div className="grid gap-4 lg:pl-4">
                <div className="mist-panel overflow-hidden p-3">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
                    <Image
                      src={coastalScenes.arch.src}
                      alt={coastalScenes.arch.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 34vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.04),rgba(17,47,59,0.7))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/72">
                        Tumaco
                      </p>
                      <p className="mt-2 font-serif text-4xl leading-[0.92] text-white">
                        Donde el mar marca el ritmo del viaje.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="mist-panel overflow-hidden p-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[22px]">
                      <Image
                        src={resolveEntityImage("room", roomLead?.primary_image)}
                        alt={roomLead?.name ?? "Habitacion destacada"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 18vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="mist-panel flex flex-col justify-between px-5 py-5">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                        Reserva tu conversacion
                      </p>
                      <p className="mt-3 text-xl text-primary">WhatsApp directo</p>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>{content.contactInfo.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-shell pt-6 md:pt-8">
        <div className="grid gap-3 lg:grid-cols-4">
          {trustHighlights.map((item, index) => (
            <Reveal key={item} delay={index * 80}>
              <div className="rounded-full border border-primary/10 bg-white px-5 py-3 text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-foreground shadow-[0_16px_44px_rgba(24,79,95,0.06)]">
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
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="space-y-6">
            <SectionHeading
              eyebrow="San Marino"
              title={
                hero?.subtitle ??
                "Una manera mas clara y cercana de vivir San Marino."
              }
              description="Aqui encuentras una estadia comoda, una ubicacion practica y una marca que se siente mas real."
            />
            <div className="editorial-panel p-6 md:p-7">
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
                Por que elegirnos
              </p>
              <p className="mt-4 text-base leading-8 text-foreground/84">
                {featuredBlock?.body ??
                  "San Marino te acompana con comodidad, cercania y una forma facil de resolver tu viaje desde el primer mensaje."}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal className="premium-card overflow-hidden p-3" delay={60}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">
                <Image
                  src={coastalScenes.aerial.src}
                  alt={coastalScenes.aerial.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.02),rgba(17,47,59,0.46))]" />
              </div>
            </Reveal>

            <div className="grid gap-4">
              {valuePillars.map((pillar, index) => (
                <Reveal key={pillar.title} delay={index * 90}>
                  <article className="premium-card p-5">
                    <div className="mb-4 h-px w-16 bg-[linear-gradient(90deg,var(--coral),var(--sun))]" />
                    <h3 className="text-3xl leading-[0.94]">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {pillar.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Habitaciones"
              title={featuredBlock?.title ?? "Habitaciones para elegir con calma y mas confianza"}
              description="Imagen, capacidad y tarifa referencial para decidir mejor."
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
        <div className="grid gap-6 lg:grid-cols-2">
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
            <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-white/8 blur-3xl" />
            <div className="absolute bottom-[-4rem] right-0 h-48 w-48 rounded-full bg-[var(--sun)]/10 blur-[120px] md:h-56 md:w-56" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <Reveal className="space-y-6">
              <SectionHeading
                eyebrow={liveElMorroSection.eyebrow}
              title={liveElMorroSection.title}
              description={liveElMorroSection.description}
                className="text-white [&_p]:text-white/74 [&_div]:text-white/62 [&_h2]:text-white"
              />
              <div className="space-y-4">
                {liveElMorroSection.points.map((point, index) => (
                  <Reveal key={point} delay={index * 90}>
                    <div className="rounded-[24px] border border-white/10 bg-white/7 px-5 py-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <Sparkles className="mt-1 size-4 shrink-0 text-[var(--sun)]" />
                        <p className="text-sm leading-7 text-white/74">{point}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} distance={40}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-[30px] border border-white/12">
                  <Image
                    src={coastalScenes.arch.src}
                    alt={coastalScenes.arch.alt}
                    width={1000}
                    height={1200}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-[28px] border border-white/12">
                    <Image
                      src={coastalScenes.aerial.src}
                      alt={coastalScenes.aerial.alt}
                      width={1200}
                      height={900}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                  <div className="rounded-[28px] border border-white/12 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/58">
                      Contexto
                    </p>
                    <p className="mt-3 text-3xl leading-[0.94] text-white">
                      El Morro se vive aqui.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/72">
                      El territorio entra antes y la marca se siente mas propia.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.98fr] lg:items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white p-3 shadow-[0_24px_84px_rgba(24,79,95,0.08)]">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[28px]">
                <Image
                  src={coastalScenes.restaurant.src}
                  alt={coastalScenes.restaurant.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.02),rgba(17,47,59,0.46))]" />
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 space-y-6 lg:order-2" delay={120}>
            <SectionHeading
              eyebrow="Restaurante"
              title="Comer bien tambien hace parte de quedarse bien."
              description="Desayuno, almuerzo y cena dentro del hotel para que tu dia fluya con mas facilidad."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="premium-card p-6">
                <Fish className="size-6 text-[var(--coral)]" />
                <h3 className="mt-5 text-3xl leading-[0.94]">Cocina de mar</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Pescado, camarones y langostino en una propuesta sencilla y bien
                  presentada.
                </p>
              </div>
              <div className="premium-card p-6">
                <Waves className="size-6 text-primary" />
                <h3 className="mt-5 text-3xl leading-[0.94]">Sabor de estadia</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Un restaurante que acompana la estadia con servicio diario.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {restaurantHighlights.map((item, index) => (
                <Reveal key={item} delay={index * 80}>
                  <div className="flex items-start gap-3 border-b border-border/70 py-3">
                    <Fish className="mt-1 size-4 shrink-0 text-[var(--coral)]" />
                    <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Servicios"
              title="Servicios que hacen la estadia mas practica y agradable."
              description="Piscina, WiFi, parqueadero y otros apoyos para que te concentres en descansar y disfrutar."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 shadow-[0_12px_34px_rgba(24,79,95,0.05)]">
                <Wifi className="size-4 text-primary" />
                WiFi
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 shadow-[0_12px_34px_rgba(24,79,95,0.05)]">
                <ParkingCircle className="size-4 text-primary" />
                Parqueadero
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-2 shadow-[0_12px_34px_rgba(24,79,95,0.05)]">
                <MessageCircle className="size-4 text-primary" />
                Atencion directa
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {servicesCatalog.slice(0, 8).map((service, index) => (
            <Reveal key={service.title} delay={index * 70}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="space-y-6">
            <SectionHeading
              eyebrow="Testimonios"
              title="La confianza tambien se construye con experiencias reales."
              description="Lo que cuentan nuestros huespedes ayuda a entender mejor el estilo de atencion de San Marino."
            />
            <div className="ocean-panel p-6 md:p-7">
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/58">
                Lo que se siente
              </p>
              <p className="mt-4 text-3xl leading-[0.96] text-white">
                Mejor presencia y mejor lectura.
              </p>
            </div>
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

      <section className="section-shell">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              eyebrow="Galeria"
              title="Imagenes para conocer mejor el hotel y su entorno."
              description="Tumaco, El Morro y San Marino aparecen juntos para que imagines mejor tu estadia."
            />
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/galeria"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
            >
              Ver galeria
            </Link>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <GalleryGrid items={editorialGallery} limit={6} />
        </Reveal>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <Reveal className="space-y-6">
            <SectionHeading
              eyebrow="Ubicacion"
              title="La ubicacion tambien ayuda a elegir mejor."
              description="Conoce donde estamos y siente desde ahora la cercania con El Morro y Tumaco."
            />
            <div className="editorial-panel p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Donde estamos
              </p>
              <p className="mt-3 text-2xl text-primary">{content.contactInfo.address}</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Si necesitas una referencia puntual, el siguiente paso sigue siendo WhatsApp.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
              <div className="premium-card overflow-hidden p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
                  <Image
                    src={coastalScenes.aerial.src}
                    alt={coastalScenes.aerial.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 28vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mist-panel flex flex-col justify-between p-6">
                <div>
                  <MapPin className="size-6 text-primary" />
                  <p className="mt-5 text-3xl leading-[0.96] text-foreground">
                    El Morro y Tumaco mas cerca desde el primer vistazo.
                  </p>
                </div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  Ubicacion, contexto y una forma facil de llegar.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        eyebrow="WhatsApp"
        title="Si quieres avanzar con tu estadia, escribenos."
        description="Estamos listos para ayudarte por WhatsApp con habitaciones, servicios y cualquier duda sobre tu visita."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
              label={primaryCta?.label ?? "Escribir por WhatsApp"}
          />
        }
      />
    </div>
  );
}
