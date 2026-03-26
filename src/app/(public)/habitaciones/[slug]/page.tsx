import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Users } from "lucide-react";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Reveal } from "@/components/marketing/reveal";
import { RoomCard } from "@/components/marketing/room-card";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
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

  const relatedRooms = content.rooms
    .filter((item) => item.id !== room.id)
    .slice(0, 2);
  const galleryImages = room.images.length > 0 ? room.images : [];

  return (
    <div className="pb-16 md:pb-24">
      <section className="container-shell pt-10 md:pt-14">
        <Reveal>
          <Link
            href="/habitaciones"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary transition hover:text-[var(--coral)]"
          >
            <ArrowLeft className="size-4" />
            Volver a habitaciones
          </Link>
        </Reveal>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--mangrove)]">
              Habitacion
            </p>
            <h1 className="text-balance text-5xl leading-[0.95] md:text-6xl">
              {room.name}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              {room.short_description}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-foreground">
                <Users className="size-4 text-primary" />
                Hasta {room.capacity} personas
              </div>
              <div className="rounded-full bg-white/84 px-4 py-2 text-sm text-muted-foreground">
                Estado administrativo: {room.status}
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <aside className="ocean-panel p-6 md:p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-white/58">
                Tarifa referencial
              </p>
              <p className="mt-3 text-4xl text-[var(--ivory)]">
                {formatCurrency(room.price)}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/72">
                Esta web no muestra disponibilidad real ni reserva online. Si quieres
                revisar la habitacion, el siguiente paso es WhatsApp.
              </p>
              <div className="mt-6">
                <WhatsappCta
                  phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
                  message={`${primaryCta?.message ?? content.contactInfo.whatsapp_default_message} para ${room.name}`}
                  label="Consultar esta habitacion"
                  className="w-full justify-center"
                />
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-[34px] bg-muted md:col-span-2 lg:col-span-7">
            <Image
              src={resolveEntityImage("room", room.primary_image)}
              alt={room.name}
              width={1400}
              height={1000}
              className="aspect-[5/4] h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102d3f]/34 via-transparent to-transparent" />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-5">
            {(galleryImages.length > 0
              ? galleryImages
              : [
                  {
                    id: "fallback-image",
                    storage_path: room.primary_image,
                    alt_text: room.name,
                  },
                ]
            )
              .slice(0, 4)
              .map((image, index) => (
                <Reveal
                  key={image.id}
                  delay={index * 90}
                  className="relative overflow-hidden rounded-[28px] bg-muted"
                >
                  <Image
                    src={resolveEntityImage("room", image.storage_path)}
                    alt={image.alt_text ?? room.name}
                    width={900}
                    height={720}
                    className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-6">
            <div className="premium-card p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Amenidades
              </p>
              <div className="mt-5 grid gap-3">
                {room.amenities.map((amenity, index) => (
                  <Reveal key={amenity.id} delay={index * 70}>
                    <div className="inline-flex items-center gap-3">
                      <Check className="size-4 text-[var(--mangrove)]" />
                      <span className="text-sm leading-6 text-foreground/86">
                        {amenity.name}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="space-y-6" delay={120}>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Descripcion
              </p>
              <p className="mt-4 text-lg leading-8 text-foreground/88">
                {room.long_description}
              </p>
            </div>
            <div className="mist-panel p-7">
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Lo esencial
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Capacidad</p>
                  <p className="mt-2 text-2xl text-primary">{room.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tarifa</p>
                  <p className="mt-2 text-2xl text-primary">{formatCurrency(room.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Canal</p>
                  <p className="mt-2 text-2xl text-primary">WhatsApp</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {relatedRooms.length > 0 ? (
        <section className="section-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--mangrove)]">
                  Otras habitaciones
                </p>
                <h2 className="text-4xl md:text-5xl">Tambien podria interesarte</h2>
              </div>
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
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {relatedRooms.map((relatedRoom, index) => (
              <Reveal key={relatedRoom.id} delay={index * 90}>
                <RoomCard room={relatedRoom} primaryCta={primaryCta} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBanner
        className="pb-0"
        eyebrow="WhatsApp"
        title="Si esta habitacion te encaja, la conversacion sigue por WhatsApp"
        description="Te respondemos de forma directa para revisar detalles, resolver dudas y orientar la mejor opcion para tu estadia."
        actions={
          <WhatsappCta
            phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
            message={`${primaryCta?.message ?? content.contactInfo.whatsapp_default_message} para ${room.name}`}
            label="Hablar por WhatsApp"
            className="bg-[var(--coral)] text-[var(--ivory)] hover:bg-[var(--accent-hover)]"
          />
        }
      />
    </div>
  );
}
