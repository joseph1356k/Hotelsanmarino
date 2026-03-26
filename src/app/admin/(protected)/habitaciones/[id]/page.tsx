import { notFound } from "next/navigation";
import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
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
      <AdminPageHeader
        eyebrow="Habitaciones"
        title={`Editar ${room.name}`}
        description="Organiza contenido, atributos, SEO y media desde una sola vista de trabajo."
      />
      <AdminNotice notice={notice} error={error} />
      <RoomForm
        title="Ficha de habitacion"
        action={updateRoomAction}
        room={room}
        amenities={amenities}
        selectedAmenityIds={selectedAmenityIds}
        roomImages={roomImages}
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <RoomImagesManager roomId={room.id} images={roomImages} />
        <Card>
          <CardHeader>
            <CardTitle>Resumen operativo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Slug: {room.slug}</p>
            <p>Estado admin: {room.status}</p>
            <p>Imagen principal actual: {room.primary_image ?? "fallback editorial"}</p>
            <p>Amenidades vinculadas: {selectedAmenityIds.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
