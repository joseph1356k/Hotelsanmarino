import Link from "next/link";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteRoomAction } from "@/lib/actions/admin";
import { getAdminRooms } from "@/lib/content/admin-content";

export default async function AdminRoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { notice, error } = await searchParams;
  const rooms = await getAdminRooms();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl">Habitaciones</h2>
          <p className="text-sm text-muted-foreground">
            CRUD real sobre habitaciones, amenities y media asociados.
          </p>
        </div>
        <Link href="/admin/habitaciones/nueva" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Nueva habitacion
        </Link>
      </div>

      <AdminNotice notice={notice} error={error} />

      <div className="grid gap-4">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                <p>Slug: {room.slug}</p>
                <p>Estado: {room.status}</p>
                <p>Orden: {room.display_order}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/habitaciones/${room.id}`} className="rounded-full border px-4 py-2 text-sm font-semibold">
                  Editar
                </Link>
                <form action={deleteRoomAction}>
                  <input type="hidden" name="room_id" value={room.id} />
                  <input type="hidden" name="room_slug" value={room.slug} />
                  <Button type="submit" variant="outline">
                    Eliminar
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
