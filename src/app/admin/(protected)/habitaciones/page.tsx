import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AdminRoomsPage() {
  const { rooms } = await getPublicSiteContent();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl">Habitaciones</h2>
        <p className="text-sm text-muted-foreground">
          Estado administrativo, orden de despliegue, SEO y media relacionados.
        </p>
      </div>
      <div className="grid gap-4">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardHeader><CardTitle>{room.name}</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{room.slug}</p>
              <Link href={`/admin/habitaciones/${room.id}`} className="text-sm font-semibold text-primary">
                Administrar
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
