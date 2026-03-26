import Link from "next/link";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changeRoomStatusAction, deleteRoomAction, toggleRoomFeaturedAction } from "@/lib/actions/admin";
import { getAdminRooms } from "@/lib/content/admin-content";
import { formatCurrency } from "@/lib/utils";

export default async function AdminRoomsPage({
  searchParams,
}: {
  searchParams: Promise<{
    notice?: string;
    error?: string;
    q?: string;
    status?: string;
    featured?: string;
  }>;
}) {
  const { notice, error, q, status, featured } = await searchParams;
  const rooms = await getAdminRooms();

  const normalizedQuery = q?.trim().toLowerCase() ?? "";
  const filteredRooms = rooms.filter((room) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      room.name.toLowerCase().includes(normalizedQuery) ||
      room.slug.toLowerCase().includes(normalizedQuery);
    const matchesStatus = !status || status === "all" || room.status === status;
    const matchesFeatured =
      !featured ||
      featured === "all" ||
      (featured === "featured" ? room.is_featured : !room.is_featured);

    return matchesQuery && matchesStatus && matchesFeatured;
  });

  return (
    <section className="space-y-6">
      <AdminPageHeader
        eyebrow="Contenido"
        title="Habitaciones"
        description="Busca, filtra y opera el inventario sin entrar a cada detalle para tareas simples."
        actionLabel="Nueva habitacion"
        actionHref="/admin/habitaciones/nueva"
      />

      <AdminNotice notice={notice} error={error} />

      <Card>
        <CardHeader>
          <CardTitle>Filtro rapido</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.8fr_auto]">
            <input
              type="search"
              name="q"
              placeholder="Buscar por nombre o slug"
              defaultValue={q ?? ""}
              className="flex h-11 w-full rounded-2xl border bg-background px-4 text-sm"
            />
            <select
              name="status"
              defaultValue={status ?? "all"}
              className="flex h-11 w-full rounded-2xl border bg-background px-4 text-sm"
            >
              <option value="all">Todos los estados</option>
              <option value="available">available</option>
              <option value="maintenance">maintenance</option>
              <option value="hidden">hidden</option>
            </select>
            <select
              name="featured"
              defaultValue={featured ?? "all"}
              className="flex h-11 w-full rounded-2xl border bg-background px-4 text-sm"
            >
              <option value="all">Todas</option>
              <option value="featured">Destacadas</option>
              <option value="regular">No destacadas</option>
            </select>
            <Button type="submit">Aplicar</Button>
          </form>
        </CardContent>
      </Card>

      {filteredRooms.length === 0 ? (
        <AdminEmptyState
          title="No hay habitaciones que coincidan"
          description="Ajusta los filtros o crea una nueva habitacion para seguir administrando el inventario."
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Listado operativo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="hidden grid-cols-[1.6fr_0.8fr_0.7fr_0.8fr_0.8fr_1.2fr] gap-4 px-4 text-xs uppercase tracking-[0.18em] text-muted-foreground lg:grid">
              <span>Habitacion</span>
              <span>Precio</span>
              <span>Cap.</span>
              <span>Estado</span>
              <span>Orden</span>
              <span>Acciones</span>
            </div>
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="grid gap-4 rounded-[1.25rem] border border-border/80 bg-background/70 p-4 lg:grid-cols-[1.6fr_0.8fr_0.7fr_0.8fr_0.8fr_1.2fr] lg:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{room.name}</p>
                    {room.is_featured ? (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{room.slug}</p>
                </div>
                <p className="text-sm font-medium">{formatCurrency(room.price)}</p>
                <p className="text-sm text-muted-foreground">{room.capacity} pax</p>
                <form action={changeRoomStatusAction}>
                  <input type="hidden" name="room_id" value={room.id} />
                  <div className="flex gap-2">
                    <select
                      name="status"
                      defaultValue={room.status}
                      className="flex h-10 w-full rounded-2xl border bg-background px-3 text-sm"
                    >
                      <option value="available">available</option>
                      <option value="maintenance">maintenance</option>
                      <option value="hidden">hidden</option>
                    </select>
                    <Button type="submit" variant="outline" size="sm">
                      Aplicar
                    </Button>
                  </div>
                </form>
                <p className="text-sm text-muted-foreground">#{room.display_order}</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/habitaciones/${room.id}`}
                    className="rounded-full border px-4 py-2 text-sm font-semibold"
                  >
                    Editar
                  </Link>
                  <form action={toggleRoomFeaturedAction}>
                    <input type="hidden" name="room_id" value={room.id} />
                    <input
                      type="hidden"
                      name="current_value"
                      value={room.is_featured ? "true" : "false"}
                    />
                    <Button type="submit" variant="outline">
                      {room.is_featured ? "Quitar" : "Destacar"}
                    </Button>
                  </form>
                  <form action={deleteRoomAction}>
                    <input type="hidden" name="room_id" value={room.id} />
                    <input type="hidden" name="room_slug" value={room.slug} />
                    <Button type="submit" variant="outline">
                      Eliminar
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </section>
  );
}
