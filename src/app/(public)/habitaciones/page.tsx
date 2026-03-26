import { SectionHeading } from "@/components/marketing/section-heading";
import { RoomCard } from "@/components/marketing/room-card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function RoomsPage() {
  const { rooms } = await getPublicSiteContent();

  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Habitaciones"
        title="Inventario editorial administrable"
        description="El modelo soporta hasta 32 habitaciones, imágenes relacionadas, amenities y orden de despliegue."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}
