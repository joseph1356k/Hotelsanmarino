import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { getRoomBySlug } from "@/lib/content/public-content";
import { resolveEntityImage } from "@/lib/media";
import { formatCurrency } from "@/lib/utils";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <section className="container-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Image
            src={resolveEntityImage("room", room.primary_image)}
            alt={room.name}
            width={1200}
            height={900}
            className="aspect-[4/3] w-full rounded-[var(--radius)] border object-cover"
          />
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity) => (
              <Badge key={amenity.id} variant="secondary">
                {amenity.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Badge>{room.status}</Badge>
          <h1 className="text-4xl">{room.name}</h1>
          <p className="text-lg text-muted-foreground">{room.long_description}</p>
          <div className="panel p-6">
            <p className="text-sm text-muted-foreground">Tarifa referencial</p>
            <p className="mt-2 text-3xl font-semibold">{formatCurrency(room.price)}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Estado administrativo únicamente. No existe lógica de disponibilidad ni reservas en esta fase.
            </p>
            <div className="mt-6">
              <WhatsappCta
                phoneNumber="+573154974576"
                message="Hola, quiero consultar disponibilidad"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
