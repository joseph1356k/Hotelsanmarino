import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminMediaAssets } from "@/lib/content/admin-content";

export default async function AdminMediaPage() {
  const mediaAssets = await getAdminMediaAssets();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media assets recientes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        {mediaAssets.length === 0 ? (
          <p>No hay media persistida todavia.</p>
        ) : (
          mediaAssets.map((asset) => (
            <div key={asset.id} className="rounded-2xl border p-4">
              <p>{asset.entity_type}</p>
              <p>{asset.storage_path}</p>
              <p>{asset.mime_type ?? "sin mime"}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
