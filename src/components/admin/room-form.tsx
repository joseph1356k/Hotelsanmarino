import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Amenity, Room, RoomImage } from "@/types/domain";

export function RoomForm({
  title,
  action,
  room,
  amenities,
  selectedAmenityIds = [],
  roomImages = [],
}: {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  room?: Room | null;
  amenities: Amenity[];
  selectedAmenityIds?: string[];
  roomImages?: RoomImage[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          {room ? <input type="hidden" name="room_id" value={room.id} /> : null}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input name="name" defaultValue={room?.name ?? ""} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input name="slug" defaultValue={room?.slug ?? ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Precio</label>
              <Input name="price" type="number" defaultValue={room?.price ?? 0} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Capacidad</label>
              <Input
                name="capacity"
                type="number"
                defaultValue={room?.capacity ?? 2}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <select
                name="status"
                defaultValue={room?.status ?? "available"}
                className="flex h-11 w-full rounded-2xl border bg-background px-4 text-sm"
              >
                <option value="available">available</option>
                <option value="maintenance">maintenance</option>
                <option value="hidden">hidden</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Orden</label>
              <Input
                name="display_order"
                type="number"
                defaultValue={room?.display_order ?? 1}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripcion corta</label>
            <Textarea
              name="short_description"
              defaultValue={room?.short_description ?? ""}
              className="min-h-24"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripcion larga</label>
            <Textarea
              name="long_description"
              defaultValue={room?.long_description ?? ""}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">SEO title</label>
              <Input name="seo_title" defaultValue={room?.seo_title ?? ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SEO description</label>
              <Input name="seo_description" defaultValue={room?.seo_description ?? ""} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={room?.is_featured ?? false}
            />
            Habitacion destacada
          </label>

          <div className="space-y-3">
            <p className="text-sm font-medium">Amenidades relacionadas</p>
            <div className="grid gap-2 md:grid-cols-3">
              {amenities.map((amenity) => (
                <label key={amenity.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="amenity_ids"
                    value={amenity.id}
                    defaultChecked={selectedAmenityIds.includes(amenity.id)}
                  />
                  {amenity.name}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Subir imagenes</p>
            <Input name="images" type="file" accept="image/*" multiple />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="set_first_as_primary" />
              Marcar la primera subida como imagen principal
            </label>
            {roomImages.length > 0 ? (
              <p className="text-xs text-muted-foreground">
                Esta habitacion ya tiene {roomImages.length} imagen(es) asociadas.
              </p>
            ) : null}
          </div>

          <Button type="submit">Guardar habitacion</Button>
        </form>
      </CardContent>
    </Card>
  );
}
