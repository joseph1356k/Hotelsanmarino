import Image from "next/image";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminMediaAssets } from "@/lib/content/admin-content";
import { resolveStoragePublicUrl } from "@/lib/storage";

const mediaFilters = [
  { key: "all", label: "Todo" },
  { key: "room", label: "Habitaciones" },
  { key: "plan", label: "Planes" },
  { key: "testimonial", label: "Testimonios" },
];

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string; type?: string }>;
}) {
  const { notice, error, type } = await searchParams;
  const mediaAssets = await getAdminMediaAssets(type && type !== "all" ? type : undefined);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Recursos"
        title="Media"
        description="Biblioteca operativa para revisar assets persistidos, su tipo y su asociacion."
      />
      <AdminNotice notice={notice} error={error} />
      <Card>
        <CardHeader>
          <CardTitle>Filtro de biblioteca</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {mediaFilters.map((filter) => (
            <a
              key={filter.key}
              href={`/admin/media?type=${filter.key}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                (type ?? "all") === filter.key
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/80 bg-card"
              }`}
            >
              {filter.label}
            </a>
          ))}
        </CardContent>
      </Card>
      {mediaAssets.length === 0 ? (
        <AdminEmptyState
          title="No hay assets para este filtro"
          description="Los uploads reales apareceran aqui una vez se carguen imagenes desde habitaciones."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mediaAssets.map((asset) => (
            <Card key={asset.id}>
              <CardContent className="space-y-4 p-4">
                <Image
                  src={
                    resolveStoragePublicUrl(asset.bucket, asset.storage_path) ??
                    "/placeholders/gallery.svg"
                  }
                  alt={asset.alt_text ?? asset.storage_path}
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full rounded-[1.25rem] border object-cover"
                />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">{asset.entity_type}</p>
                  <p className="truncate text-muted-foreground">{asset.storage_path}</p>
                  <p className="text-muted-foreground">
                    {asset.mime_type ?? "mime no informado"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
