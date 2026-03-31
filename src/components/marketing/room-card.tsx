import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { resolveEntityImage } from "@/lib/media";
import { cn, formatCurrency } from "@/lib/utils";
import type { RoomWithRelations, WhatsappCta } from "@/types/domain";
import { WhatsappCta as WhatsappButton } from "@/components/marketing/whatsapp-cta";

export function RoomCard({
  room,
  primaryCta,
  className,
}: {
  room: RoomWithRelations;
  primaryCta?: WhatsappCta | null;
  className?: string;
}) {
  return (
    <article className={cn("premium-card group overflow-hidden", className)}>
      <div className="relative aspect-[5/4] overflow-hidden bg-muted">
        <Image
          src={resolveEntityImage("room", room.primary_image)}
          alt={room.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,79,95,0.02)_0%,rgba(24,79,95,0.18)_40%,rgba(17,47,59,0.7)_100%)]" />

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary">
          <span className="size-1.5 rounded-full bg-[var(--coral)]" />
          {room.is_featured ? "Destacada" : "Habitacion"}
        </div>

        <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-[#102f3c]/82 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
          <Users className="size-3.5 text-[var(--sun)]" />
          {room.capacity} personas
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="max-w-xl rounded-[26px] bg-[#102f3c]/74 p-4 backdrop-blur-md">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/62">
              San Marino
            </p>
            <h3 className="mt-2 text-4xl leading-[0.92]">{room.name}</h3>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6 md:p-7">
        <p className="max-w-xl text-[0.98rem] leading-7 text-foreground/76">
          {room.short_description}
        </p>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity.id}
              className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {amenity.name}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-5 border-t border-border/70 pt-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-muted-foreground">
              Tarifa referencial
            </p>
            <p className="mt-2 text-3xl text-primary">{formatCurrency(room.price)}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/habitaciones/${room.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-white px-5 py-3 text-sm font-semibold text-primary transition duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              Conocer habitacion
              <ArrowRight className="size-4" />
            </Link>
            {primaryCta ? (
              <WhatsappButton
                phoneNumber={primaryCta.phone_number}
                message={`${primaryCta.message} para ${room.name}`}
                label="Consultar"
                variant="default"
              />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
