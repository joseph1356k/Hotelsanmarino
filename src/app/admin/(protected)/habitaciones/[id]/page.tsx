import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AdminRoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { rooms } = await getPublicSiteContent();
  const room = rooms.find((item) => item.id === id);

  if (!room) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>Slug: {room.slug}</p>
        <p>Estado admin: {room.status}</p>
        <p>Imagen principal: {room.primary_image ?? "fallback automático"}</p>
        <p>SEO title: {room.seo_title ?? "pendiente"}</p>
        <p>Fase 2: formulario de edición persistente contra Supabase.</p>
      </CardContent>
    </Card>
  );
}
