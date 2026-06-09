"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BedDouble, CalendarDays, Users } from "lucide-react";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import type { ExperiencePackage } from "@/content/commercial-content";
import type { RoomCatalogItem } from "@/content/room-catalog";
import { cn } from "@/lib/utils";

type TripType = "pareja" | "familia" | "grupo" | "trabajo" | "descanso";

const tripTypeLabels: Record<TripType, string> = {
  pareja: "Pareja",
  familia: "Familia",
  grupo: "Grupo",
  trabajo: "Trabajo",
  descanso: "Descanso",
};

const tripTypes: Array<{ value: TripType; label: string }> = [
  { value: "pareja", label: tripTypeLabels.pareja },
  { value: "familia", label: tripTypeLabels.familia },
  { value: "grupo", label: tripTypeLabels.grupo },
  { value: "trabajo", label: tripTypeLabels.trabajo },
  { value: "descanso", label: tripTypeLabels.descanso },
];

function getRecommendedRoom({
  rooms,
  guests,
  tripType,
  selectedSlug,
}: {
  rooms: RoomCatalogItem[];
  guests: number;
  tripType: TripType;
  selectedSlug: string;
}) {
  const selected = rooms.find((room) => room.slug === selectedSlug);

  if (selected) {
    return selected;
  }

  const candidates = rooms
    .filter((room) => room.capacity >= guests)
    .sort((left, right) => {
      const capacityDelta = left.capacity - right.capacity;

      if (capacityDelta !== 0) {
        return capacityDelta;
      }

      if (tripType === "pareja" || tripType === "descanso") {
        const leftSuite = left.style === "suite" ? -1 : 0;
        const rightSuite = right.style === "suite" ? -1 : 0;
        return leftSuite - rightSuite;
      }

      if (tripType === "familia") {
        const leftFamily = left.category === "familias" ? -1 : 0;
        const rightFamily = right.category === "familias" ? -1 : 0;
        return leftFamily - rightFamily;
      }

      if (tripType === "grupo") {
        const leftGroup = left.category === "grupos" ? -1 : 0;
        const rightGroup = right.category === "grupos" ? -1 : 0;
        return leftGroup - rightGroup;
      }

      return 0;
    });

  return candidates[0] ?? rooms.at(-1) ?? null;
}

function formatDateForMessage(value: string) {
  if (!value) {
    return "por definir";
  }

  return value;
}

export function BookingAssistant({
  rooms,
  packages,
  phoneNumber,
  className,
  trackingSource = "reserva_guiada",
}: {
  rooms: RoomCatalogItem[];
  packages: ExperiencePackage[];
  phoneNumber: string;
  className?: string;
  trackingSource?: string;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [tripType, setTripType] = useState<TripType>("pareja");
  const [selectedRoomSlug, setSelectedRoomSlug] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [notes, setNotes] = useState("");

  const recommendedRoom = useMemo(
    () =>
      getRecommendedRoom({
        rooms,
        guests,
        tripType,
        selectedSlug: selectedRoomSlug,
      }),
    [guests, rooms, selectedRoomSlug, tripType],
  );

  const selectedPackage = packages.find((item) => item.id === selectedPackageId);

  const whatsappMessage = [
    "Hola, quiero consultar disponibilidad para Hotel San Marino en Tumaco.",
    `Llegada: ${formatDateForMessage(checkIn)}.`,
    `Salida: ${formatDateForMessage(checkOut)}.`,
    `Personas: ${guests}.`,
    `Tipo de viaje: ${tripTypeLabels[tripType]}.`,
    `Habitación sugerida o deseada: ${recommendedRoom?.name ?? "por definir"}.`,
    selectedPackage ? `Plan de interés: ${selectedPackage.title}.` : null,
    notes.trim() ? `Comentario: ${notes.trim()}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id="reserva-guiada"
      className={cn("bg-[#102f3c] py-16 text-white md:py-24", className)}
    >
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
              Reserva guiada
            </p>
            <h2 className="mt-5 max-w-xl text-balance text-[2.7rem] leading-[0.94] sm:text-5xl lg:text-[4.8rem]">
              Cuéntanos cómo viajas y armamos el mensaje por ti.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
              El objetivo es que WhatsApp llegue con la información que el hotel necesita:
              fechas, personas, tipo de viaje, habitación y plan de interés.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[16px] border border-white/12 bg-white/8 p-4">
                <CalendarDays className="size-5 text-[var(--marine-mist)]" />
                <p className="mt-3 text-sm text-white/76">Fechas claras</p>
              </div>
              <div className="rounded-[16px] border border-white/12 bg-white/8 p-4">
                <Users className="size-5 text-[var(--marine-mist)]" />
                <p className="mt-3 text-sm text-white/76">Personas y viaje</p>
              </div>
              <div className="rounded-[16px] border border-white/12 bg-white/8 p-4">
                <BedDouble className="size-5 text-[var(--marine-mist)]" />
                <p className="mt-3 text-sm text-white/76">Habitación sugerida</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-white/14 bg-[#f7f3ec] text-foreground shadow-[0_32px_100px_rgba(0,0,0,0.18)]">
            <div className="grid gap-4 p-4 sm:grid-cols-2 md:p-6">
              <label className="grid gap-2 text-sm font-semibold text-primary">
                Llegada
                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="h-12 rounded-[12px] border border-[#d8cbbb] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primary">
                Salida
                <input
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="h-12 rounded-[12px] border border-[#d8cbbb] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primary">
                Personas
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={guests}
                  onChange={(event) =>
                    setGuests(Math.min(12, Math.max(1, Number(event.target.value) || 1)))
                  }
                  className="h-12 rounded-[12px] border border-[#d8cbbb] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primary">
                Tipo de viaje
                <select
                  value={tripType}
                  onChange={(event) => setTripType(event.target.value as TripType)}
                  className="h-12 rounded-[12px] border border-[#d8cbbb] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary"
                >
                  {tripTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primary sm:col-span-2">
                Habitación de interés
                <select
                  value={selectedRoomSlug}
                  onChange={(event) => setSelectedRoomSlug(event.target.value)}
                  className="h-12 rounded-[12px] border border-[#d8cbbb] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary"
                >
                  <option value="">Recomendar según mi viaje</option>
                  {rooms.map((room) => (
                    <option key={room.slug} value={room.slug}>
                      {room.name} - hasta {room.capacity} personas
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primary sm:col-span-2">
                Plan de interés
                <select
                  value={selectedPackageId}
                  onChange={(event) => setSelectedPackageId(event.target.value)}
                  className="h-12 rounded-[12px] border border-[#d8cbbb] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary"
                >
                  <option value="">Solo alojamiento por ahora</option>
                  {packages.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-primary sm:col-span-2">
                Comentario opcional
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Ejemplo: viajo con niños, quiero aire acondicionado o necesito parqueadero."
                  className="resize-none rounded-[12px] border border-[#d8cbbb] bg-white px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary"
                />
              </label>
            </div>

            <div className="border-t border-[#d8cbbb] bg-[#fffaf2] p-4 md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div aria-live="polite">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                    Recomendación inicial
                  </p>
                  <h3 className="mt-3 text-3xl leading-none text-primary">
                    {recommendedRoom?.name ?? "Te ayudamos a elegir por WhatsApp"}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/72">
                    {recommendedRoom
                      ? `${recommendedRoom.idealFor} Capacidad para ${recommendedRoom.capacity} personas.`
                      : "Si tu grupo supera el inventario visible, el hotel puede orientarte directamente."}
                  </p>
                </div>

                <TrackedWhatsappCta
                  phoneNumber={phoneNumber}
                  message={whatsappMessage}
                  label={
                    <>
                      Enviar consulta
                      <ArrowRight className="size-4" />
                    </>
                  }
                  trackingSource={trackingSource}
                  trackingLabel="Enviar consulta guiada"
                  trackingDetail={recommendedRoom?.name}
                  className="w-full justify-center lg:w-auto"
                />
              </div>

              <p className="mt-4 text-xs leading-6 text-muted-foreground">
                La herramienta no confirma disponibilidad automática. Prepara una consulta más
                clara para que el equipo responda mejor por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
