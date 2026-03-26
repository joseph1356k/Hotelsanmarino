import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
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
          {room.images.length > 1 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {room.images.map((image) => (
                <Image
                  key={image.id}
                  src={resolveEntityImage("room", image.storage_path)}
                  alt={image.alt_text ?? room.name}
                  width={600}
                  height={450}
                  className="aspect-[4/3] w-full rounded-[var(--radius)] border object-cover"
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="space-y-6">
          <Badge>{room.status}</Badge>
          <h1 className="text-4xl">{room.name}</h1>
          <p className="text-lg text-muted-foreground">{room.long_description}</p>
          <div className="panel p-6">
            <p className="text-sm text-muted-foreground">Tarifa referencial</p>
            <p className="mt-2 text-3xl font-semibold">{formatCurrency(room.price)}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Estado administrativo unicamente. No existe logica de disponibilidad ni reservas en esta fase.
            </p>
            <div className="mt-6">
              <WhatsappCta
                phoneNumber={content.contactInfo.whatsapp_number}
                message={content.contactInfo.whatsapp_default_message}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
