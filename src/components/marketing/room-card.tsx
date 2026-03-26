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
    <article
      className={cn(
        "premium-card group overflow-hidden",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={resolveEntityImage("room", room.primary_image)}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#153B52]/58 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/88 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-primary">
          {room.is_featured ? "Destacada" : "Habitacion"}
        </div>
      </div>
      <div className="space-y-6 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-3xl leading-none">{room.name}</h3>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              {room.short_description}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground">
            <Users className="size-3.5" />
            {room.capacity} personas
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {room.amenities.slice(0, 3).map((amenity) => amenity.name).join(" · ")}
        </p>

        <div className="flex flex-col gap-4 border-t border-border/70 pt-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Tarifa referencial
            </p>
            <p className="mt-2 text-2xl font-semibold text-primary">
              {formatCurrency(room.price)}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/habitaciones/${room.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-3 text-sm font-semibold text-primary transition duration-300 hover:border-primary/35 hover:bg-primary hover:text-primary-foreground"
            >
              Ver habitacion
              <ArrowRight className="size-4" />
            </Link>
            {primaryCta ? (
              <WhatsappButton
                phoneNumber={primaryCta.phone_number}
                message={`${primaryCta.message} para ${room.name}`}
                label="WhatsApp"
                variant="secondary"
              />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
