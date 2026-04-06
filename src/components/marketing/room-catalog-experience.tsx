"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Users,
  Wind,
  X,
} from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { Button } from "@/components/ui/button";
import {
  roomCatalogGroups,
  type RoomCatalogClimate,
  type RoomCatalogGroupKey,
  type RoomCatalogItem,
  type RoomCatalogStyle,
} from "@/content/room-catalog";
import { cn } from "@/lib/utils";

type RoomFilterKey =
  | "all"
  | RoomCatalogGroupKey
  | RoomCatalogClimate
  | Extract<RoomCatalogStyle, "suite">;

const roomFilterOptions: Array<{ key: RoomFilterKey; label: string }> = [
  { key: "all", label: "Todas" },
  { key: "solo-pareja", label: "Solo y pareja" },
  { key: "familias", label: "Familias" },
  { key: "grupos", label: "Grupos" },
  { key: "aire", label: "Con aire" },
  { key: "ventilador", label: "Con ventilador" },
  { key: "suite", label: "Suites" },
];

function getClimateMeta(climate: RoomCatalogClimate) {
  return climate === "aire"
    ? { label: "Aire acondicionado", Icon: Snowflake }
    : { label: "Ventilador", Icon: Wind };
}

function getCapacityLabel(capacity: number) {
  return `${capacity} ${capacity === 1 ? "persona" : "personas"}`;
}

function getInventoryLabel(count: number) {
  return `${count} ${
    count === 1 ? "habitacion de este tipo" : "habitaciones de este tipo"
  }`;
}

function matchesFilter(room: RoomCatalogItem, filter: RoomFilterKey) {
  if (filter === "all") {
    return true;
  }

  if (filter === "suite") {
    return room.style === "suite";
  }

  if (filter === "aire" || filter === "ventilador") {
    return room.climate === filter;
  }

  return room.category === filter;
}

function getFilterHeading(filter: RoomFilterKey) {
  return roomFilterOptions.find((item) => item.key === filter)?.label ?? "Habitaciones";
}

function RoomCatalogCard({
  room,
  onOpen,
}: {
  room: RoomCatalogItem;
  onOpen: (room: RoomCatalogItem) => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const climateMeta = getClimateMeta(room.climate);

  const stopPreview = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setImageIndex(0);
  };

  const startPreview = () => {
    if (room.images.length <= 1 || intervalRef.current) {
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % room.images.length);
    }, 1100);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => onOpen(room)}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
      className="group premium-card interactive-frame block w-full overflow-hidden text-left"
    >
      <div className="relative aspect-[4/4.25] overflow-hidden bg-muted sm:aspect-[5/4]">
        {room.images.map((src, index) => (
          <Image
            key={`${room.slug}-${src}`}
            src={src}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-cover transition duration-700 ease-out",
              index === imageIndex ? "scale-[1.02] opacity-100" : "scale-[1.06] opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.04)_0%,rgba(17,47,59,0.18)_38%,rgba(17,47,59,0.76)_100%)]" />

        <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-4 sm:gap-3 sm:p-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-[#112f3b]/72 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm sm:text-[0.68rem] sm:tracking-[0.2em]">
            <climateMeta.Icon className="size-3.5 text-[var(--sun)]" />
            {climateMeta.label}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[0.68rem] sm:tracking-[0.2em]">
            <span className="size-1.5 rounded-full bg-[var(--coral)]" />
            {room.count} en inventario
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
          <div className="max-w-xl rounded-[22px] bg-[#102f3c]/78 p-3.5 backdrop-blur-md transition duration-500 group-hover:translate-y-[-2px] sm:rounded-[26px] sm:p-4">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/58 sm:text-[0.68rem] sm:tracking-[0.28em]">
              {room.idealFor}
            </p>
            <h3 className="mt-2 text-[2rem] leading-[0.92] sm:text-[2.4rem]">{room.name}</h3>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-primary">
            <Users className="size-4" />
            {getCapacityLabel(room.capacity)}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-3 py-1.5">
            <BedDouble className="size-4 text-[var(--coral)]" />
            {room.layoutNote}
          </span>
        </div>

        <p className="max-w-xl text-[0.95rem] leading-[1.65rem] text-foreground/80 sm:text-[0.98rem] sm:leading-7">
          {room.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {room.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border/70 pt-4 sm:pt-5">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
              Ver mejor
            </p>
            <p className="mt-2 text-base text-primary sm:text-lg">
              Fotos, detalles y WhatsApp directo
            </p>
          </div>
          <div className="flex items-center gap-2">
            {room.images.map((src, index) => (
              <span
                key={`${room.slug}-dot-${src}`}
                className={cn(
                  "size-2 rounded-full transition duration-300",
                  index === imageIndex ? "bg-[var(--coral)]" : "bg-primary/18",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function RoomCatalogModal({
  room,
  phoneNumber,
  onClose,
}: {
  room: RoomCatalogItem | null;
  phoneNumber: string;
  onClose: () => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!room) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, room]);

  useEffect(() => {
    if (!room || room.images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % room.images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [room]);

  if (!room) {
    return null;
  }

  const climateMeta = getClimateMeta(room.climate);
  const activeImage = room.images[activeImageIndex] ?? room.images[0];

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#08161d]/74 px-0 py-0 backdrop-blur-md sm:px-4 sm:py-6 md:px-6 lg:px-10"
      onClick={onClose}
    >
      <div className="mx-auto flex min-h-full max-w-6xl items-center">
        <div
          className="relative w-full overflow-hidden rounded-none border border-white/16 bg-white shadow-[0_40px_120px_rgba(8,22,29,0.34)] sm:rounded-[36px]"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-20 inline-flex size-11 items-center justify-center rounded-full border border-border bg-white/94 text-primary shadow-[0_18px_40px_rgba(8,22,29,0.14)] transition hover:border-primary hover:text-[var(--coral)] sm:right-4 sm:top-4"
            aria-label="Cerrar habitacion"
          >
            <X className="size-5" />
          </button>

          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="border-b border-border/70 p-3 md:p-4 lg:border-b-0 lg:border-r">
              <div className="relative aspect-[4/4.5] overflow-hidden rounded-[24px] bg-muted sm:aspect-[5/4] sm:rounded-[28px]">
                <Image
                  src={activeImage}
                  alt={room.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,47,59,0.02),rgba(17,47,59,0.38))]" />

                {room.images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((current) =>
                          current === 0 ? room.images.length - 1 : current - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#112f3b]/68 text-white backdrop-blur transition hover:bg-[#112f3b]/84"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIndex((current) => (current + 1) % room.images.length)
                      }
                      className="absolute right-4 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#112f3b]/68 text-white backdrop-blur transition hover:bg-[#112f3b]/84"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-white sm:p-5">
                  <div className="rounded-[22px] bg-[#102f3c]/72 px-4 py-3 backdrop-blur-md sm:rounded-[24px]">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/62 sm:text-[0.68rem] sm:tracking-[0.28em]">
                      {room.idealFor}
                    </p>
                    <p className="mt-2 text-[2rem] leading-[0.92] sm:text-4xl">{room.name}</p>
                  </div>
                  <div className="hidden rounded-full border border-white/18 bg-[#102f3c]/72 px-4 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-white/72 backdrop-blur md:inline-flex">
                    {activeImageIndex + 1}/{room.images.length}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2.5 md:grid-cols-5 md:gap-3">
                {room.images.map((src, index) => (
                  <button
                    key={`${room.slug}-thumb-${src}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-[20px] border bg-muted transition duration-300",
                      index === activeImageIndex
                        ? "border-primary shadow-[0_18px_40px_rgba(24,79,95,0.14)]"
                        : "border-border hover:border-primary/40",
                    )}
                    aria-label={`Ver imagen ${index + 1} de ${room.name}`}
                  >
                    <Image
                      src={src}
                      alt={room.name}
                      fill
                      sizes="(max-width: 1024px) 30vw, 10vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 sm:p-6 md:p-8">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-primary/5 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
                    <climateMeta.Icon className="size-3.5" />
                    {climateMeta.label}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground">
                    <Users className="size-3.5 text-[var(--coral)]" />
                    {getCapacityLabel(room.capacity)}
                  </span>
                </div>

                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.3em] text-muted-foreground">
                    Habitacion
                  </p>
                  <h2 className="mt-4 text-balance text-[2.6rem] leading-[0.92] text-foreground sm:text-[3.15rem]">
                    {room.name}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-foreground/78 sm:mt-4 sm:text-lg sm:leading-8">
                    {room.summary}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="mist-panel px-5 py-5">
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                      Inventario del hotel
                    </p>
                    <p className="mt-3 text-3xl text-primary">{room.count}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {getInventoryLabel(room.count)}
                    </p>
                  </div>
                  <div className="mist-panel px-5 py-5">
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                      Distribucion
                    </p>
                    <p className="mt-3 text-xl text-primary">{room.layoutNote}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {room.idealFor}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.3em] text-muted-foreground">
                    Sobre esta opcion
                  </p>
                  <p className="text-[0.98rem] leading-7 text-foreground/82 sm:text-base sm:leading-8">
                    {room.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {room.tags.map((tag) => (
                    <span
                      key={`${room.slug}-${tag}`}
                      className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 space-y-4 border-t border-border/70 pt-5 sm:mt-8 sm:pt-6">
                <WhatsappCta
                  phoneNumber={phoneNumber}
                  message={`Hola, quiero consultar la habitacion ${room.name}`}
                  label="Consultar esta habitacion"
                  className="w-full justify-center"
                />
                <p className="text-sm leading-7 text-muted-foreground">
                  La disponibilidad se confirma directamente por WhatsApp. Aqui solo te mostramos el inventario por tipo de habitacion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoomCatalogExperience({
  rooms,
  phoneNumber,
}: {
  rooms: RoomCatalogItem[];
  phoneNumber: string;
}) {
  const [activeFilter, setActiveFilter] = useState<RoomFilterKey>("all");
  const [selectedRoom, setSelectedRoom] = useState<RoomCatalogItem | null>(null);
  const filteredRooms = rooms.filter((room) => matchesFilter(room, activeFilter));

  return (
    <>
      <section className="section-shell pt-6 md:pt-10">
        <Reveal>
          <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            <div className="flex min-w-max items-center gap-3">
              {roomFilterOptions.map((filter) => (
                <Button
                  key={filter.key}
                  type="button"
                  variant={activeFilter === filter.key ? "default" : "secondary"}
                  size="sm"
                  className="h-10 px-4 sm:h-11 sm:px-5"
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </Reveal>

        {activeFilter === "all" ? (
          <div className="mt-8 space-y-14 md:mt-10 md:space-y-16">
            {roomCatalogGroups.map((group, groupIndex) => {
              const groupRooms = rooms.filter((room) => room.category === group.key);

              return (
                <section key={group.key} className="space-y-8">
                  <Reveal delay={groupIndex * 80}>
                    <div className="grid gap-4 border-b border-border/70 pb-5 md:grid-cols-[0.92fr_1.08fr] md:items-end">
                      <div>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--coral)]">
                          {group.title}
                        </p>
                        <h2 className="mt-3 text-[2.45rem] leading-[0.92] text-foreground sm:text-5xl">
                          {group.title}
                        </h2>
                      </div>
                      <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                  </Reveal>

                  <div className="grid gap-5 xl:grid-cols-2">
                    {groupRooms.map((room, roomIndex) => (
                      <Reveal key={room.slug} delay={roomIndex * 60}>
                        <RoomCatalogCard room={room} onOpen={setSelectedRoom} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 space-y-7 md:mt-10 md:space-y-8">
            <Reveal>
              <div className="grid gap-4 border-b border-border/70 pb-5 md:grid-cols-[0.92fr_1.08fr] md:items-end">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[var(--coral)]">
                    Filtro activo
                  </p>
                  <h2 className="mt-3 text-[2.45rem] leading-[0.92] text-foreground sm:text-5xl">
                    {getFilterHeading(activeFilter)}
                  </h2>
                </div>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                  {filteredRooms.length} opciones para revisar con fotos, capacidad, clima y salida directa a WhatsApp.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5 xl:grid-cols-2">
              {filteredRooms.map((room, roomIndex) => (
                <Reveal key={room.slug} delay={roomIndex * 60}>
                  <RoomCatalogCard room={room} onOpen={setSelectedRoom} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>

      <RoomCatalogModal
        key={selectedRoom?.slug ?? "room-modal"}
        room={selectedRoom}
        phoneNumber={phoneNumber}
        onClose={() => setSelectedRoom(null)}
      />
    </>
  );
}
