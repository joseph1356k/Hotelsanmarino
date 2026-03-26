import { AdminNotice } from "@/components/admin/admin-notice";
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
      <AdminNotice notice={notice} error={error} />
      <RoomForm title="Nueva habitacion" action={createRoomAction} amenities={amenities} />
    </div>
  );
}
