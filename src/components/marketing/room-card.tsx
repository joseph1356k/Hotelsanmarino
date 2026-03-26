import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resolveEntityImage } from "@/lib/media";
import { formatCurrency } from "@/lib/utils";
import type { RoomWithRelations } from "@/types/domain";

export function RoomCard({ room }: { room: RoomWithRelations }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] bg-muted">
        <Image
          src={resolveEntityImage("room", room.primary_image)}
          alt={room.name}
          width={1200}
          height={900}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{room.name}</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">{room.short_description}</p>
          </div>
          <Badge variant="secondary">{room.capacity} huéspedes</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {room.amenities.map((amenity) => amenity.name).join(" · ")}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-semibold">{formatCurrency(room.price)}</p>
          <Link href={`/habitaciones/${room.slug}`} className="text-sm font-semibold text-primary">
            Ver detalle
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
