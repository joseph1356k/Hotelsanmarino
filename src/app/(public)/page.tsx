import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Clock3,
  Coffee,
  Fish,
  MapPin,
  MessageCircle,
  Moon,
  ParkingCircle,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
  Utensils,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { AiAnswerSection } from "@/components/marketing/ai-answer-section";
import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { BookingAssistant } from "@/components/marketing/booking-assistant";
import { JsonLdScript } from "@/components/marketing/json-ld-script";
import { Reveal } from "@/components/marketing/reveal";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import {
  destinationExperiences,
  experiencePackages,
  policyHighlights,
  restaurantMenuHighlights,
  trustFaqItems,
} from "@/content/commercial-content";
import { buildHotelJsonLd, getAiAnswersByIds } from "@/content/ai-answer-content";
import { coastalScenes } from "@/content/static-marketing";
import { roomCatalog } from "@/content/room-catalog";
import { getPublicSiteContent } from "@/lib/content/public-content";
import { siteMaps } from "@/lib/constants/site";
import { resolveEntityImage } from "@/lib/media";
import { cn, formatRoomPrice } from "@/lib/utils";
import type { RoomWithRelations, Testimonial } from "@/types/domain";

export const metadata: Metadata = {
  title: "Hotel en El Morro Tumaco | Hotel San Marino",
  description:
    "Hotel San Marino Tumaco: hotel en El Morro Tumaco cerca al mar, con piscina, restaurante, parqueadero, habitaciones familiares y reserva directa por WhatsApp.",
  keywords: [
    "hotel en Tumaco",
    "hotel en El Morro Tumaco",
    "hotel cerca al mar en Tumaco",
    "hotel con piscina en Tumaco",
    "hotel con restaurante en Tumaco",
    "Hotel San Marino Tumaco",
  ],
  openGraph: {
    title: "Hotel San Marino Tumaco | El Morro se vive aquí",
    description:
      "Hospédate cerca del mar y descubre Tumaco desde una estadía cómoda, cálida y con sabor local.",
    images: [coastalScenes.homeHero.src],
  },
};

const WHATSAPP_MESSAGE =
  "Hola, quiero consultar disponibilidad para Hotel San Marino en Tumaco.";

const trustIndicators = [
  { label: "Recepción 24h", icon: Clock3 },
  { label: "Restaurante", icon: Utensils },
  { label: "Piscina", icon: Waves },
  { label: "Parqueadero", icon: ParkingCircle },
  { label: "Cerca del mar", icon: MapPin },
] satisfies Array<{ label: string; icon: LucideIcon }>;

const dayTimeline = [
  {
    time: "Mañana",
    title: "Despierta cerca del Morro",
    text: "Empieza el día con desayuno y una ubicación que te conecta rápido con el ritmo de Tumaco.",
    icon: SunMedium,
    image: coastalScenes.homeHero.src,
  },
  {
    time: "Mediodía",
    title: "Piscina, restaurante y pausa sin afán",
    text: "Baja el ritmo, come en el hotel y deja que la estadía se sienta práctica, fresca y cercana.",
    icon: Coffee,
    image: coastalScenes.restaurant.src,
  },
  {
    time: "Tarde",
    title: "Camina hacia el mar o explora Tumaco",
    text: "El Morro, la playa y los planes aliados están cerca para vivir el Pacífico con más confianza.",
    icon: Waves,
    image: coastalScenes.arch.src,
  },
  {
    time: "Noche",
    title: "Descansa con atención 24 horas",
    text: "Vuelve al hotel, resuelve cualquier duda por recepción y termina el día con comodidad.",
    icon: Moon,
    image: coastalScenes.roomContext.src,
  },
] satisfies Array<{
  time: string;
  title: string;
  text: string;
  icon: LucideIcon;
  image: string;
}>;

const stayBenefits = [
  {
    title: "En El Morro",
    text: "Una base clara para vivir Tumaco desde uno de sus puntos más reconocibles.",
    icon: MapPin,
    image: coastalScenes.arch.src,
  },
  {
    title: "Cerca del mar",
    text: "El viaje se siente costero desde la llegada, sin promesas de lujo falso.",
    icon: Waves,
    image: coastalScenes.homeHero.src,
  },
  {
    title: "Restaurante con sabor local",
    text: "Desayuno, platos de mar y comida familiar dentro del hotel.",
    icon: Fish,
    image: coastalScenes.restaurant.src,
  },
  {
    title: "Piscina y zonas comunes",
    text: "Espacios para refrescarte, conversar y hacer una pausa sin salir.",
    icon: SunMedium,
    image: coastalScenes.roomContext.src,
  },
  {
    title: "Habitaciones para tu viaje",
    text: "Opciones para parejas, familias, grupos, trabajo y descanso.",
    icon: BedDouble,
    image: "/images/rooms-demo/hotel-wood-king.jpg",
  },
  {
    title: "Reserva directa por WhatsApp",
    text: "Sin vueltas: pregunta, confirma disponibilidad y recibe orientación humana.",
    icon: MessageCircle,
    image: coastalScenes.aerial.src,
  },
  {
    title: "Parqueadero",
    text: "Una llegada más simple cuando viajas en vehículo.",
    icon: ParkingCircle,
    image: coastalScenes.aerial.src,
  },
  {
    title: "Atención 24 horas",
    text: "Acompañamiento constante para llegar, descansar y moverte con tranquilidad.",
    icon: ShieldCheck,
    image: coastalScenes.arch.src,
  },
] satisfies Array<{
  title: string;
  text: string;
  icon: LucideIcon;
  image: string;
}>;

const experienceBlocks = [
  {
    verb: "Descansa",
    title: "Habitaciones claras para elegir sin enredos",
    text: "Capacidad, uso ideal y beneficios visibles para que la decisión no dependa de adivinar.",
    image: "/images/rooms-demo/hotel-open-window.jpg",
  },
  {
    verb: "Saborea",
    title: "Sabor local, descanso real",
    text: "El restaurante acompaña la estadía: desayuno, platos de mar y una mesa cercana para familias.",
    image: coastalScenes.restaurant.src,
  },
  {
    verb: "Respira",
    title: "Piscina, zonas comunes y una pausa costera",
    text: "La experiencia no termina en la habitación. También hay espacios para bajar el ritmo.",
    image: coastalScenes.roomContext.src,
  },
  {
    verb: "Explora",
    title: "Muévete fácil por Tumaco",
    text: "El hotel funciona como punto de partida para caminar, preguntar y descubrir planes aliados.",
    image: coastalScenes.aerial.src,
  },
] satisfies Array<{ verb: string; title: string; text: string; image: string }>;

const fallbackStories = [
  {
    headline: "Ideal para venir en familia",
    quote:
      "Una estadía práctica para compartir, descansar y moverse por Tumaco con más tranquilidad.",
    type: "Familia",
  },
  {
    headline: "Muy buena ubicación",
    quote:
      "Estar en El Morro hace que el viaje se sienta más fácil desde el primer día.",
    type: "Pareja",
  },
  {
    headline: "La atención fue excelente",
    quote:
      "El contacto directo ayuda a resolver dudas, disponibilidad y llegada sin complicaciones.",
    type: "Viajero de trabajo",
  },
  {
    headline: "El restaurante nos gustó mucho",
    quote:
      "Comer en el hotel hace que el día fluya mejor, especialmente cuando viajas con más personas.",
    type: "Grupo",
  },
];

const roomMetaBySlug = new Map(roomCatalog.map((room) => [room.slug, room]));

const homeAiAnswers = getAiAnswersByIds([
  "donde-queda-hotel-san-marino-tumaco",
  "hotel-san-marino-esta-en-el-morro",
  "hotel-con-piscina-en-tumaco",
  "hotel-con-restaurante-en-tumaco",
  "habitacion-para-familias",
  "como-reservar-por-whatsapp",
]);

function getReviewStories(testimonials: Testimonial[]) {
  if (testimonials.length === 0) {
    return fallbackStories;
  }

  const dynamicStories = testimonials.slice(0, 4).map((testimonial, index) => ({
    headline: fallbackStories[index]?.headline ?? "Una estadía que da confianza",
    quote: testimonial.quote,
    type: testimonial.guest_origin ?? fallbackStories[index]?.type ?? "Huésped",
  }));

  return [...dynamicStories, ...fallbackStories].slice(0, 4);
}

function getRoomHighlights(room: RoomWithRelations) {
  const meta = roomMetaBySlug.get(room.slug);
  const amenities = room.amenities.map((amenity) => amenity.name);
  const highlights = [
    meta?.idealFor ?? `Ideal para ${room.capacity} persona${room.capacity > 1 ? "s" : ""}`,
    `${room.capacity} huésped${room.capacity > 1 ? "es" : ""}`,
    ...(meta?.tags ?? amenities),
  ];

  return Array.from(new Set(highlights)).slice(0, 3);
}

function HomeSectionTitle({
  kicker,
  title,
  text,
  inverted = false,
}: {
  kicker?: string;
  title: string;
  text?: string;
  inverted?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", inverted && "text-white")}>
      {kicker ? (
        <p
          className={cn(
            "mb-4 text-xs font-semibold uppercase tracking-[0.24em]",
            inverted ? "text-white/62" : "text-[var(--mangrove)]",
          )}
        >
          {kicker}
        </p>
      ) : null}
      <h2 className="text-balance text-[2.35rem] leading-[0.98] sm:text-5xl lg:text-[4.8rem]">
        {title}
      </h2>
      {text ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-8 md:text-lg",
            inverted ? "text-white/76" : "text-foreground/74",
          )}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

function HomeRoomCard({
  room,
  index,
  whatsappPhone,
}: {
  room: RoomWithRelations;
  index: number;
  whatsappPhone: string;
}) {
  const meta = roomMetaBySlug.get(room.slug);
  const highlights = getRoomHighlights(room);
  const roomImage = meta?.images[0] ?? resolveEntityImage("room", room.primary_image);

  return (
    <article className="group overflow-hidden rounded-[18px] border border-[#d8cbbb] bg-[#fffaf2] shadow-[0_22px_70px_rgba(21,59,82,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(21,59,82,0.13)]">
      <div className="relative aspect-[4/3.15] overflow-hidden bg-[var(--warm-sand)]">
        <Image
          src={roomImage}
          alt={`${room.name} en Hotel San Marino Tumaco`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 38vw"
          className="object-cover transition duration-[900ms] group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="rounded-full bg-[#f7f3ec]/95 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-[0_12px_34px_rgba(31,42,48,0.08)]">
            {index === 0 ? "Recomendada" : "Habitación"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#153b52]/90 px-3 py-1.5 text-xs font-semibold text-white">
            <Users className="size-3.5 text-[var(--marine-mist)]" />
            {room.capacity}
          </span>
        </div>
      </div>
      <div className="space-y-5 p-5 md:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--mangrove)]">
            {meta?.idealFor ?? "Descanso, trabajo o viaje compartido"}
          </p>
          <h3 className="mt-3 text-[2rem] leading-none text-primary sm:text-[2.35rem]">
            {room.name}
          </h3>
        </div>
        <p className="text-sm leading-7 text-foreground/72">{room.short_description}</p>
        <div className="grid gap-2">
          {highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-start gap-2 rounded-[10px] bg-[#f1e7d8] px-3 py-2 text-sm text-foreground/78"
            >
              <Sparkles className="mt-0.5 size-3.5 shrink-0 text-[var(--coral)]" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 border-t border-[#d8cbbb] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Tarifa
            </p>
            <p className="mt-1 text-2xl text-primary">{formatRoomPrice(room.price)}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/habitaciones/${room.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/18 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              Ver detalle
              <ArrowRight className="size-4" />
            </Link>
            <TrackedWhatsappCta
              phoneNumber={whatsappPhone}
              message={`${WHATSAPP_MESSAGE} Quiero consultar ${room.name}.`}
              label="Consultar disponibilidad"
              trackingSource="habitacion_home"
              trackingLabel="Consultar disponibilidad"
              trackingDetail={room.name}
              size="sm"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;
  const whatsappPhone = primaryCta?.phone_number ?? content.contactInfo.whatsapp_number;
  const featuredRooms = content.rooms.filter((room) => room.is_featured).slice(0, 4);
  const roomLead = featuredRooms[0] ?? content.rooms[0] ?? null;
  const roomLeadMeta = roomLead ? roomMetaBySlug.get(roomLead.slug) : null;
  const roomLeadImage =
    roomLeadMeta?.images[0] ?? resolveEntityImage("room", roomLead?.primary_image);
  const reviews = getReviewStories(content.testimonials);
  const galleryItems = content.rooms.flatMap((room) =>
    room.images.map((image) => ({
      id: image.id,
      src: image.storage_path,
      alt: image.alt_text ?? room.name,
    })),
  );
  const editorialGallery = [
    { id: "morro-playa", src: coastalScenes.homeHero.src, alt: coastalScenes.homeHero.alt },
    { id: "morro-arco", src: coastalScenes.arch.src, alt: coastalScenes.arch.alt },
    { id: "tumaco-aereo", src: coastalScenes.aerial.src, alt: coastalScenes.aerial.alt },
    ...galleryItems,
  ];
  const jsonLd = buildHotelJsonLd(content.contactInfo);

  return (
    <div className="overflow-hidden">
      <JsonLdScript data={jsonLd} />

      <section className="relative min-h-[calc(100svh-var(--public-header-offset))] overflow-hidden bg-[#153b52] text-white">
        <Image
          src={coastalScenes.homeHero.src}
          alt="Vista costera de El Morro en Tumaco cerca de Hotel San Marino"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,59,82,0.92)_0%,rgba(21,59,82,0.76)_42%,rgba(21,59,82,0.16)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(21,59,82,0)_0%,#f7f3ec_100%)]" />

        <div className="container-shell relative flex min-h-[calc(100svh-var(--public-header-offset))] flex-col justify-end pb-8 pt-10 md:pb-10 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <Reveal className="max-w-5xl space-y-6" delay={80} distance={24}>
              <h1 className="max-w-[9ch] text-balance text-[3.8rem] leading-[0.88] sm:text-[5.4rem] md:text-[7rem] lg:text-[8.4rem]">
                El Morro se vive aquí
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/84 md:text-xl md:leading-9">
                Hospédate cerca del mar y descubre Tumaco desde una estadía cómoda,
                cálida y con sabor local.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedWhatsappCta
                  phoneNumber={whatsappPhone}
                  message={WHATSAPP_MESSAGE}
                  label="Reservar por WhatsApp"
                  trackingSource="hero_home"
                  trackingLabel="Reservar por WhatsApp"
                  size="lg"
                  className="justify-center bg-[var(--coral)] text-white hover:bg-[#ad5945]"
                />
                <Link
                  href="#habitaciones"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/32 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-primary"
                >
                  Ver habitaciones
                </Link>
              </div>
            </Reveal>

            <Reveal className="rounded-[18px] border border-white/18 bg-white/12 p-4 backdrop-blur-md md:p-5" delay={160}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/66">
                Pacífico auténtico, bien vivido.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {trustIndicators.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-[12px] border border-white/12 bg-white/10 px-3 py-2.5 text-sm text-white/88"
                  >
                    <Icon className="size-4 text-[var(--marine-mist)]" />
                    {label}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] py-16 md:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <Reveal className="lg:sticky lg:top-28">
              <HomeSectionTitle
                kicker="Un día en San Marino"
                title="Despierta cerca del mar, come sin afán y deja que Tumaco marque el ritmo."
                text="La experiencia está pensada como una secuencia simple: llegar, descansar, saborear, explorar y volver con confianza."
              />
              <div className="mt-8 overflow-hidden rounded-[18px] border border-[#d8cbbb] bg-white p-3 shadow-[0_24px_70px_rgba(21,59,82,0.08)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[12px]">
                  <Image
                    src={coastalScenes.arch.src}
                    alt="Arco de El Morro en Tumaco"
                    fill
                    sizes="(max-width: 1024px) 100vw, 36vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {dayTimeline.map((moment, index) => (
                <Reveal key={moment.time} delay={index * 80}>
                  <article className="grid gap-4 rounded-[18px] border border-[#d8cbbb] bg-white p-4 shadow-[0_16px_48px_rgba(21,59,82,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(21,59,82,0.1)] sm:grid-cols-[180px_1fr] md:p-5">
                    <div className="relative min-h-36 overflow-hidden rounded-[12px] bg-[var(--warm-sand)]">
                      <Image
                        src={moment.image}
                        alt={`${moment.time} en Hotel San Marino Tumaco`}
                        fill
                        sizes="(max-width: 640px) 100vw, 180px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-white">
                          <moment.icon className="size-4" />
                        </span>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                          {moment.time}
                        </p>
                      </div>
                      <h3 className="text-3xl leading-none text-primary">{moment.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-foreground/72">{moment.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] pb-16 md:pb-24">
        <div className="container-shell">
          <Reveal>
            <HomeSectionTitle
              kicker="Por qué quedarte aquí"
              title="Más que dormir: una base cálida, práctica y conectada con El Morro."
              text="San Marino combina ubicación, servicios y contacto directo para que el viaje se sienta más fácil desde antes de llegar."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stayBenefits.map(({ title, text, icon: Icon, image }, index) => (
              <Reveal key={title} delay={index * 50}>
                <article className="group h-full overflow-hidden rounded-[16px] border border-[#d8cbbb] bg-white shadow-[0_18px_54px_rgba(21,59,82,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_78px_rgba(21,59,82,0.11)]">
                  <div className="relative aspect-[5/3] overflow-hidden bg-[var(--warm-sand)]">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 24vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <Icon className="size-5 text-[var(--coral)]" />
                    <h3 className="mt-4 text-3xl leading-none text-primary">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground/70">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="habitaciones" className="bg-[#1f2a30] py-16 text-white md:py-24">
        <div className="container-shell">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <HomeSectionTitle
                kicker="Habitaciones"
                title="Elige por cómo viajas, no solo por el nombre de la habitación."
                text="Capacidad, uso ideal y beneficios clave al frente. Si dudas, WhatsApp te ayuda a escoger."
                inverted
              />
            </Reveal>
            <Reveal delay={100}>
              <Link
                href="/habitaciones"
                className="inline-flex items-center gap-2 rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-primary"
              >
                Ver todas las habitaciones
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {featuredRooms.map((room, index) => (
              <Reveal key={room.id} delay={index * 80}>
                <HomeRoomCard room={room} index={index} whatsappPhone={whatsappPhone} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingAssistant
        rooms={roomCatalog}
        packages={experiencePackages}
        phoneNumber={whatsappPhone}
        trackingSource="reserva_guiada_home"
      />

      <section className="bg-[#f7f3ec] py-16 md:py-24">
        <div className="container-shell">
          <Reveal>
            <HomeSectionTitle
              kicker="La experiencia San Marino"
              title="Descansa, saborea, respira, explora y reserva sin complicación."
              text="Los servicios se cuentan como experiencia porque así se vive el viaje: no por una lista fría, sino por lo que resuelve cada momento."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {experienceBlocks.map((block, index) => (
              <Reveal key={block.verb} delay={index * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#d8cbbb] bg-white shadow-[0_20px_62px_rgba(21,59,82,0.07)]">
                  <div className="relative aspect-[4/4.3] overflow-hidden">
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--coral)]">
                      {block.verb}
                    </p>
                    <h3 className="mt-4 text-3xl leading-none text-primary">{block.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground/72">{block.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#153b52] py-16 text-white md:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-[20px] border border-white/14 bg-white/8 p-3">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[14px]">
                  <Image
                    src={coastalScenes.restaurant.src}
                    alt="Restaurante con sabor local en Hotel San Marino Tumaco"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal className="space-y-7" delay={100}>
              <HomeSectionTitle
                kicker="Restaurante"
                title="Sabor local, descanso real."
                text="El restaurante no es un servicio suelto: es parte de quedarse bien. Desayuna sin afán, pregunta por platos de mar y resuelve la comida familiar dentro del hotel."
                inverted
              />
              <div className="grid gap-3 sm:grid-cols-3">
                {restaurantMenuHighlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-[14px] border border-white/12 bg-white/8 px-4 py-4 text-sm text-white/82"
                    >
                      <Icon className="mb-4 size-5 text-[var(--marine-mist)]" />
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-2 text-xs leading-6 text-white/66">{item.text}</p>
                    </div>
                  );
                })}
              </div>
              <TrackedWhatsappCta
                phoneNumber={whatsappPhone}
                message="Hola, quiero preguntar por el menú del día en Hotel San Marino Tumaco."
                label="Preguntar por menú del día"
                trackingSource="restaurante_home"
                trackingLabel="Preguntar por menú del día"
                className="bg-[var(--coral)] text-white hover:bg-[#ad5945]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] py-16 md:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <Reveal className="space-y-7">
              <HomeSectionTitle
                kicker="Vive Tumaco desde San Marino"
                title="Pacífico que se vive, no solo se mira."
                text="La ubicación, el restaurante, la piscina y las recomendaciones ayudan a convertir la estadía en una forma más completa de conocer Tumaco."
              />
              <div className="overflow-hidden rounded-[18px] border border-[#d8cbbb] bg-white p-3 shadow-[0_22px_70px_rgba(21,59,82,0.08)]">
                <iframe
                  title="Mapa de Hotel San Marino en Tumaco"
                  src={content.contactInfo.maps_embed_url ?? siteMaps.embedSrc}
                  loading="lazy"
                  className="h-[340px] w-full rounded-[12px] border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {destinationExperiences.slice(0, 6).map((card, index) => (
                <Reveal key={card.title} delay={index * 55}>
                  <article className="group overflow-hidden rounded-[16px] border border-[#d8cbbb] bg-white shadow-[0_18px_56px_rgba(21,59,82,0.06)]">
                    <div className="relative aspect-[5/3] overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 28vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/6 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--mangrove)]">
                        <card.icon className="size-3.5 text-[var(--coral)]" />
                        {card.distance}
                      </p>
                      <h3 className="text-3xl leading-none text-primary">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-foreground/70">{card.text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e9dfcf] py-16 md:py-24">
        <div className="container-shell">
          <Reveal>
            <HomeSectionTitle
              kicker="Confianza"
              title="Lo importante no son solo las estrellas. Es cómo se sintió la estadía."
              text="Ubicación, atención, restaurante y tranquilidad son las señales que ayudan a reservar con más seguridad."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reviews.map((review, index) => (
              <Reveal key={`${review.headline}-${index}`} delay={index * 70}>
                <article className="h-full rounded-[18px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                    {review.type}
                  </p>
                  <h3 className="mt-4 text-[2rem] leading-none text-primary">
                    {review.headline}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground/72">
                    “{review.quote}”
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="h-full rounded-[20px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)] md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                  Antes de reservar
                </p>
                <h3 className="mt-4 text-[2.4rem] leading-none text-primary">
                  Reglas claras para escribir con más confianza.
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {policyHighlights.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="rounded-[14px] bg-primary/5 p-4">
                        <Icon className="size-5 text-[var(--coral)]" />
                        <p className="mt-3 font-semibold text-primary">{item.title}</p>
                        <p className="mt-2 text-sm leading-6 text-foreground/70">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-[20px] border border-[#d8cbbb] bg-white p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)] md:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                  Preguntas frecuentes
                </p>
                <div className="mt-5 grid gap-3">
                  {trustFaqItems.map((item) => (
                    <details
                      key={item.question}
                      className="group rounded-[14px] border border-[#d8cbbb] bg-[#fffaf2] p-4"
                    >
                      <summary className="cursor-pointer list-none text-base font-semibold text-primary outline-none transition group-open:text-[var(--coral)]">
                        {item.question}
                      </summary>
                      <p className="mt-3 text-sm leading-7 text-foreground/72">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AiAnswerSection
        id="respuestas-rapidas"
        eyebrow="Respuestas puntuales"
        title="Lo que una IA y una persona deben entender sin adivinar."
        description="Respuestas cortas, visibles y alineadas con el contenido real del hotel: ubicación, servicios, habitaciones y reserva directa."
        answers={homeAiAnswers}
        phoneNumber={whatsappPhone}
        trackingSource="home_respuestas_rapidas"
        ctaLabel="Resolver por WhatsApp"
        variant="ivory"
      />

      <section className="bg-[#f7f3ec] py-16 md:py-24">
        <div className="container-shell">
          <Reveal>
            <HomeSectionTitle
              kicker="Ofertas y planes"
              title="Paquetes con intención, no nombres genéricos."
              text="Cada plan se conversa por WhatsApp para ajustarlo a fechas, número de personas y disponibilidad real."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {experiencePackages.map((plan, index) => (
              <Reveal key={plan.title} delay={index * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#d8cbbb] bg-white shadow-[0_20px_62px_rgba(21,59,82,0.07)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                      {plan.audience}
                    </p>
                    <h3 className="mt-4 text-3xl leading-none text-primary">{plan.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground/72">
                      {plan.description}
                    </p>
                    <ul className="mt-5 grid gap-2 text-sm leading-6 text-foreground/72">
                      {plan.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Sparkles className="mt-1 size-3.5 shrink-0 text-[var(--coral)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <TrackedWhatsappCta
                      phoneNumber={whatsappPhone}
                      message={plan.whatsappMessage}
                      label="Consultar paquete"
                      trackingSource="paquete_home"
                      trackingLabel="Consultar paquete"
                      trackingDetail={plan.title}
                      size="sm"
                      className="mt-6 w-full"
                    />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#153b52] py-16 text-white md:py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal className="space-y-7">
              <HomeSectionTitle
                kicker="Galería viva"
                title="Mira el hotel, sus habitaciones y el entorno como una misma experiencia."
                text="La fotografía debe contar llegada, descanso, comida y territorio. Cuando haya nuevas imágenes, este bloque debe priorizar exterior, piscina, restaurante, habitaciones limpias y detalles locales."
                inverted
              />
              <Link
                href="/galeria"
                className="inline-flex items-center gap-2 rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-primary"
              >
                Ver galería
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <GalleryGrid items={editorialGallery} limit={6} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] py-16 md:py-24">
        <div className="container-shell">
          <div className="overflow-hidden rounded-[22px] bg-[#1f2a30] text-white shadow-[0_32px_100px_rgba(21,59,82,0.18)]">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.86fr]">
              <Reveal className="p-6 md:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/58">
                  Reserva
                </p>
                <h2 className="mt-5 max-w-3xl text-balance text-[2.6rem] leading-[0.94] sm:text-5xl lg:text-[4.8rem]">
                  Ven a vivir El Morro desde San Marino
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
                  Te ayudamos por WhatsApp a escoger la habitación o plan que mejor se
                  ajuste a tu viaje.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <TrackedWhatsappCta
                    phoneNumber={whatsappPhone}
                    message={WHATSAPP_MESSAGE}
                    label="Reservar por WhatsApp"
                    trackingSource="cta_final_home"
                    trackingLabel="Reservar por WhatsApp"
                    size="lg"
                    className="justify-center bg-[var(--coral)] text-white hover:bg-[#ad5945]"
                  />
                  <Link
                    href="/ubicacion"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/18 px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-primary"
                  >
                    Ver ubicación
                  </Link>
                </div>
              </Reveal>
              <div className="relative min-h-[320px] lg:min-h-full">
                <Image
                  src={roomLeadImage}
                  alt="Habitación de Hotel San Marino Tumaco"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
