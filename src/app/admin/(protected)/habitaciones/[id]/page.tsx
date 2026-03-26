import { notFound } from "next/navigation";
import { AdminNotice } from "@/components/admin/admin-notice";
import { RoomForm } from "@/components/admin/room-form";
import { RoomImagesManager } from "@/components/admin/room-images-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateRoomAction } from "@/lib/actions/admin";
import { getAdminRoomById, getAmenities } from "@/lib/content/admin-content";

export default async function AdminRoomDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { id } = await params;
  const { notice, error } = await searchParams;
  const [{ room, selectedAmenityIds, roomImages }, amenities] = await Promise.all([
    getAdminRoomById(id),
    getAmenities(),
  ]);

  if (!room) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminNotice notice={notice} error={error} />
      <RoomForm
        title={`Editar ${room.name}`}
        action={updateRoomAction}
        room={room}
        amenities={amenities}
        selectedAmenityIds={selectedAmenityIds}
        roomImages={roomImages}
      />
      <RoomImagesManager roomId={room.id} images={roomImages} />
      <Card>
        <CardHeader>
          <CardTitle>Resumen operativo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Slug: {room.slug}</p>
          <p>Estado admin: {room.status}</p>
          <p>Imagen principal actual: {room.primary_image ?? "fallback"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
