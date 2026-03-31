import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Users } from "lucide-react";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { RoomCard } from "@/components/marketing/room-card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { coastalScenes } from "@/content/static-marketing";
import { getPublicSiteContent } from "@/lib/content/public-content";
import { resolveEntityImage } from "@/lib/media";
import { formatCurrency } from "@/lib/utils";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getPublicSiteContent();
  const room = content.rooms.find((item) => item.slug === slug) ?? null;
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  if (!room) {
    notFound();
  }

  const relatedRooms = content.rooms.filter((item) => item.id !== room.id).slice(0, 2);
  const galleryImages =
    room.images.length > 0
      ? room.images
      : [
          {
            id: "fallback-image",
            storage_path: room.primary_image,
            alt_text: room.name,
            room_id: room.id,
            asset_id: null,
            is_primary: true,
            display_order: 0,
            created_at: room.created_at,
          },
        ];

  return (
    <div className="pb-16 md:pb-24">
      <section className="container-shell pt-6">
        <Reveal>
          <Link
            href="/habitaciones"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
          >
            <ArrowLeft className="size-4" />
            Volver a habitaciones
          </Link>
        </Reveal>
      </section>

      <PageHero
        className="mt-3"
        eyebrow="Habitacion"
        title={room.name}
        description={room.short_description}
        imageSrc={resolveEntityImage("room", room.primary_image)}
        imageAlt={room.name}
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={`${primaryCta?.message ?? content.contactInfo.whatsapp_default_message} para ${room.name}`}
                label="Quiero esta habitacion"
          />
        }
        aside={
          <aside className="mist-panel space-y-5 p-6 md:p-7">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Tarifa referencial
              </p>
              <p className="mt-3 text-4xl text-primary">{formatCurrency(room.price)}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/6 px-4 py-2 text-sm text-primary">
                <Users className="size-4" />
                Hasta {room.capacity} personas
              </div>
              <div className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm text-muted-foreground">
                Atencion directa
              </div>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              Si esta opcion te interesa, escribenos por WhatsApp y te ayudamos a
              revisar detalles, tarifas y disponibilidad.
            </p>
          </aside>
        }
      />

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-[34px] bg-muted lg:col-span-7">
            <Image
              src={resolveEntityImage("room", room.primary_image)}
              alt={room.name}
              width={1400}
              height={1000}
              className="aspect-[5/4] h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.02),rgba(17,47,59,0.46))]" />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-5">
            {galleryImages.slice(0, 4).map((image, index) => (
              <Reveal
                key={image.id}
                delay={index * 70}
                className="relative overflow-hidden rounded-[28px] bg-muted"
              >
                <Image
                  src={resolveEntityImage("room", image.storage_path)}
                  alt={image.alt_text ?? room.name}
                  width={900}
                  height={720}
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.04]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6">
            <SectionHeading
              eyebrow="Amenidades"
              title="Lo que necesitas para una estadia comoda."
              description="Conoce lo esencial de la habitacion antes de dar el siguiente paso."
            />

            <div className="premium-card p-6 md:p-7">
              <div className="grid gap-3">
                {room.amenities.map((amenity, index) => (
                  <Reveal key={amenity.id} delay={index * 60}>
                    <div className="inline-flex items-center gap-3">
                      <Check className="size-4 text-[var(--coral)]" />
                      <span className="text-sm leading-7 text-foreground/86">
                        {amenity.name}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="premium-card overflow-hidden p-3">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[26px]">
                <Image
                  src={coastalScenes.arch.src}
                  alt={coastalScenes.arch.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.06),rgba(17,47,59,0.54))]" />
              </div>
            </div>
          </Reveal>

          <Reveal className="space-y-6" delay={120}>
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Sobre esta habitacion
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/88">
                {room.long_description}
              </p>
            </div>

            <div className="editorial-panel p-6 md:p-7">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
                Lo esencial
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Capacidad</p>
                  <p className="mt-2 text-3xl text-primary">{room.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tarifa</p>
                  <p className="mt-2 text-3xl text-primary">{formatCurrency(room.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Canal</p>
                  <p className="mt-2 text-3xl text-primary">WhatsApp</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {relatedRooms.length > 0 ? (
        <section className="section-shell">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Otras habitaciones"
                title="Si quieres comparar, aqui tienes otras opciones."
                description="Explora mas habitaciones del hotel y encuentra la que mejor se ajuste a tu plan."
              />
            </Reveal>
            <Reveal delay={120}>
              <Link
                href="/habitaciones"
                className="text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
              >
                Ver mas habitaciones
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {relatedRooms.map((relatedRoom, index) => (
              <Reveal key={relatedRoom.id} delay={index * 90}>
                <RoomCard room={relatedRoom} primaryCta={primaryCta} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBanner
        eyebrow="WhatsApp"
        title="Si esta habitacion es para ti, escribenos."
        description="Te ayudamos a resolver dudas, revisar disponibilidad y avanzar de forma directa por WhatsApp."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={`${primaryCta?.message ?? content.contactInfo.whatsapp_default_message} para ${room.name}`}
            label="Escribir ahora"
          />
        }
      />
    </div>
  );
}
