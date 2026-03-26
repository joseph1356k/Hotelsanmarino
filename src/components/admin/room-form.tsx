import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveEntityImage } from "@/lib/media";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { resolveStoragePublicUrl } from "@/lib/storage";
import { formatCurrency } from "@/lib/utils";
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
  const previewImage = resolveEntityImage(
    "room",
    resolveStoragePublicUrl("hotel-media", room?.primary_image) ?? room?.primary_image,
  );

  return (
    <form action={action} className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      {room ? <input type="hidden" name="room_id" value={room.id} /> : null}

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre</label>
              <Input name="name" defaultValue={room?.name ?? ""} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug</label>
              <Input name="slug" defaultValue={room?.slug ?? ""} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Descripcion corta</label>
              <Textarea
                name="short_description"
                defaultValue={room?.short_description ?? ""}
                className="min-h-24"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Descripcion larga</label>
              <Textarea
                name="long_description"
                defaultValue={room?.long_description ?? ""}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operacion y visibilidad</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
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
              <label className="text-sm font-medium">Estado administrativo</label>
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
            <label className="flex items-center gap-2 text-sm font-medium md:col-span-2">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked={room?.is_featured ?? false}
              />
              Mostrar como habitacion destacada
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO basico</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">SEO title</label>
              <Input name="seo_title" defaultValue={room?.seo_title ?? ""} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">SEO description</label>
              <Input name="seo_description" defaultValue={room?.seo_description ?? ""} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview rapido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image
              src={previewImage}
              alt={room?.name ?? "Preview de habitacion"}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full rounded-[1.25rem] border object-cover"
            />
            <div className="rounded-[1.25rem] bg-muted/60 p-4">
              <p className="font-semibold">{room?.name ?? "Nueva habitacion"}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {room?.slug ?? "El slug se generara a partir del nombre si lo dejas vacio."}
              </p>
              <p className="mt-3 text-sm">
                {room ? formatCurrency(room.price) : "Define precio y capacidad"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenidades</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {amenities.map((amenity) => (
              <label key={amenity.id} className="flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  name="amenity_ids"
                  value={amenity.id}
                  defaultChecked={selectedAmenityIds.includes(amenity.id)}
                />
                {amenity.name}
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagen principal y galeria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input name="images" type="file" accept="image/*" multiple />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="set_first_as_primary" />
              Usar la primera imagen subida como principal
            </label>
            <p className="text-xs text-muted-foreground">
              {roomImages.length > 0
                ? `Actualmente hay ${roomImages.length} imagen(es) asociadas a esta habitacion.`
                : "Aun no hay imagenes asociadas. El sistema usara fallback editorial mientras tanto."}
            </p>
          </CardContent>
        </Card>

        <div className="sticky bottom-4 flex flex-wrap gap-3 rounded-[1.25rem] border border-border/80 bg-card/95 p-4 shadow-[0_18px_50px_rgba(29,43,46,0.12)] backdrop-blur">
          <Button type="submit">Guardar habitacion</Button>
          <Link
            href="/admin/habitaciones"
            className="inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold"
          >
            Volver al listado
          </Link>
        </div>
      </div>
    </form>
  );
}
