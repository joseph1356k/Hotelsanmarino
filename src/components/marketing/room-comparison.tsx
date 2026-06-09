"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Snowflake, Users, Wind } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import type { RoomCatalogClimate, RoomCatalogItem } from "@/content/room-catalog";
import { cn } from "@/lib/utils";

type TravelNeed = "pareja" | "familia" | "grupo" | "trabajo";
type ClimatePreference = "cualquiera" | RoomCatalogClimate;

const travelNeeds: Array<{ value: TravelNeed; label: string }> = [
  { value: "pareja", label: "Pareja" },
  { value: "familia", label: "Familia" },
  { value: "grupo", label: "Grupo" },
  { value: "trabajo", label: "Trabajo" },
];

const climateOptions: Array<{ value: ClimatePreference; label: string }> = [
  { value: "cualquiera", label: "Cualquiera" },
  { value: "aire", label: "Aire" },
  { value: "ventilador", label: "Ventilador" },
];

function scoreRoom(room: RoomCatalogItem, guests: number, need: TravelNeed) {
  let score = Math.max(0, 20 - Math.abs(room.capacity - guests) * 3);

  if (room.capacity >= guests) {
    score += 12;
  }

  if (need === "pareja" && (room.style === "suite" || room.capacity === 2)) {
    score += 8;
  }

  if (need === "familia" && room.category === "familias") {
    score += 8;
  }

  if (need === "grupo" && (room.category === "grupos" || room.capacity >= 5)) {
    score += 8;
  }

  if (need === "trabajo" && room.capacity <= 2) {
    score += 5;
  }

  return score;
}

function getClimateLabel(climate: RoomCatalogClimate) {
  return climate === "aire" ? "Aire acondicionado" : "Ventilador";
}

export function RoomComparison({
  rooms,
  phoneNumber,
}: {
  rooms: RoomCatalogItem[];
  phoneNumber: string;
}) {
  const [guests, setGuests] = useState(2);
  const [need, setNeed] = useState<TravelNeed>("pareja");
  const [climate, setClimate] = useState<ClimatePreference>("cualquiera");

  const recommendedRooms = useMemo(() => {
    return rooms
      .filter((room) => room.capacity >= guests)
      .filter((room) => climate === "cualquiera" || room.climate === climate)
      .sort((left, right) => scoreRoom(right, guests, need) - scoreRoom(left, guests, need))
      .slice(0, 3);
  }, [climate, guests, need, rooms]);

  const fallbackRooms = recommendedRooms.length > 0 ? recommendedRooms : rooms.slice(0, 3);

  return (
    <section className="section-shell pt-0">
      <Reveal>
        <div className="overflow-hidden rounded-[24px] bg-[#1f2a30] text-white shadow-[0_32px_100px_rgba(21,59,82,0.18)]">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="border-b border-white/12 p-5 md:p-7 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">
                Comparador rápido
              </p>
              <h2 className="mt-4 text-[2.4rem] leading-[0.94] sm:text-5xl">
                Dime cómo viajas y compara opciones.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/72">
                Esto no reemplaza la disponibilidad real, pero ayuda a llegar a WhatsApp
                con una decisión más clara.
              </p>

              <div className="mt-6 grid gap-4">
                <label className="grid gap-2 text-sm font-semibold text-white">
                  Personas
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={guests}
                    onChange={(event) =>
                      setGuests(Math.min(12, Math.max(1, Number(event.target.value) || 1)))
                    }
                    className="h-12 rounded-[12px] border border-white/14 bg-white px-4 text-sm text-foreground outline-none transition focus:border-[var(--marine-mist)]"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-white">
                  Tipo de viaje
                  <select
                    value={need}
                    onChange={(event) => setNeed(event.target.value as TravelNeed)}
                    className="h-12 rounded-[12px] border border-white/14 bg-white px-4 text-sm text-foreground outline-none transition focus:border-[var(--marine-mist)]"
                  >
                    {travelNeeds.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-semibold text-white">
                  Clima
                  <select
                    value={climate}
                    onChange={(event) => setClimate(event.target.value as ClimatePreference)}
                    className="h-12 rounded-[12px] border border-white/14 bg-white px-4 text-sm text-foreground outline-none transition focus:border-[var(--marine-mist)]"
                  >
                    {climateOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="bg-[#f7f3ec] p-4 text-foreground md:p-6">
              <div className="grid gap-4 xl:grid-cols-3">
                {fallbackRooms.map((room, index) => {
                  const ClimateIcon = room.climate === "aire" ? Snowflake : Wind;

                  return (
                    <article
                      key={room.slug}
                      className={cn(
                        "flex h-full flex-col rounded-[18px] border border-[#d8cbbb] bg-[#fffaf2] p-5 shadow-[0_18px_56px_rgba(21,59,82,0.07)]",
                        index === 0 && "ring-2 ring-[var(--coral)]/35",
                      )}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--mangrove)]">
                        {index === 0 ? "Mejor encaje" : "Alternativa"}
                      </p>
                      <h3 className="mt-4 text-3xl leading-none text-primary">
                        {room.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-foreground/72">
                        {room.summary}
                      </p>

                      <div className="mt-5 grid gap-2 text-sm">
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/6 px-3 py-2 text-primary">
                          <Users className="size-4" />
                          Hasta {room.capacity} personas
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/6 px-3 py-2 text-primary">
                          <ClimateIcon className="size-4" />
                          {getClimateLabel(room.climate)}
                        </span>
                      </div>

                      <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Uso ideal
                      </p>
                      <p className="mt-2 flex-1 text-sm leading-7 text-foreground/78">
                        {room.idealFor}
                      </p>

                      <TrackedWhatsappCta
                        phoneNumber={phoneNumber}
                        message={`Hola, quiero consultar disponibilidad para Hotel San Marino en Tumaco. Me interesa comparar la habitación ${room.name} para ${guests} personas.`}
                        label={
                          <>
                            Consultar
                            <ArrowRight className="size-4" />
                          </>
                        }
                        size="sm"
                        variant={index === 0 ? "default" : "secondary"}
                        trackingSource="comparador_habitaciones"
                        trackingLabel="Consultar desde comparador"
                        trackingDetail={room.name}
                        className="mt-5 w-full"
                      />
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
