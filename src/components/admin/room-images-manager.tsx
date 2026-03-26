import Image from "next/image";
import { deleteRoomImageAction, setRoomPrimaryImageAction } from "@/lib/actions/admin";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveStoragePublicUrl } from "@/lib/storage";
import type { RoomImage } from "@/types/domain";

export function RoomImagesManager({
  roomId,
  images,
}: {
  roomId: string;
  images: RoomImage[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Galeria de imagenes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {images.length === 0 ? (
          <AdminEmptyState
            title="Todavia no hay galeria"
            description="Sube imagenes desde la ficha de la habitacion para empezar a construir una galeria ordenada."
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {images.map((image, index) => (
              <div key={image.id} className="rounded-2xl border p-3">
                <Image
                  src={
                    resolveStoragePublicUrl("hotel-media", image.storage_path) ??
                    "/placeholders/room.svg"
                  }
                  alt={image.alt_text ?? "Imagen de habitacion"}
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">
                      {image.is_primary ? "Imagen principal" : `Galeria #${index + 1}`}
                    </p>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      Orden {image.display_order}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {image.storage_path ?? "Sin path"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <form action={setRoomPrimaryImageAction}>
                      <input type="hidden" name="room_id" value={roomId} />
                      <input type="hidden" name="image_id" value={image.id} />
                      <input type="hidden" name="storage_path" value={image.storage_path ?? ""} />
                      <Button type="submit" variant={image.is_primary ? "secondary" : "outline"}>
                        {image.is_primary ? "Principal actual" : "Usar como principal"}
                      </Button>
                    </form>
                    <form action={deleteRoomImageAction}>
                      <input type="hidden" name="room_id" value={roomId} />
                      <input type="hidden" name="image_id" value={image.id} />
                      <input type="hidden" name="asset_id" value={image.asset_id ?? ""} />
                      <input type="hidden" name="storage_path" value={image.storage_path ?? ""} />
                      <input
                        type="hidden"
                        name="is_primary"
                        value={image.is_primary ? "true" : "false"}
                      />
                      <Button type="submit" variant="outline">
                        Eliminar
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
