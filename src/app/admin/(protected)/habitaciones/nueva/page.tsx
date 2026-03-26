import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { RoomForm } from "@/components/admin/room-form";
import { createRoomAction } from "@/lib/actions/admin";
import { getAmenities } from "@/lib/content/admin-content";

export default async function AdminNewRoomPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { notice, error } = await searchParams;
  const amenities = await getAmenities();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Habitaciones"
        title="Nueva habitacion"
        description="Crea una ficha completa con atributos operativos, SEO, amenidades e imagenes iniciales."
      />
      <AdminNotice notice={notice} error={error} />
      <RoomForm title="Nueva habitacion" action={createRoomAction} amenities={amenities} />
    </div>
  );
}
