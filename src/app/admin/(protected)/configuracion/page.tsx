import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateSiteSettingsAction } from "@/lib/actions/admin";
import { getAdminSiteSettings } from "@/lib/content/admin-content";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { notice, error } = await searchParams;
  const siteSettings = await getAdminSiteSettings();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Sitio"
        title="Configuracion general"
        description="Ajustes globales de marca y metadatos que afectan varias superficies del sitio."
      />
      <AdminNotice notice={notice} error={error} />
      <Card>
        <CardHeader>
          <CardTitle>Marca y SEO basico</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSiteSettingsAction} className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <Input name="site_name" defaultValue={siteSettings.site_name} required />
              <Input name="site_tagline" defaultValue={siteSettings.site_tagline} required />
              <Input name="seo_title" defaultValue={siteSettings.seo_title ?? ""} />
            </div>
            <div className="space-y-4">
              <Textarea
                name="seo_description"
                defaultValue={siteSettings.seo_description ?? ""}
                className="min-h-28"
              />
              <Input name="logo_path" defaultValue={siteSettings.logo_path ?? ""} />
              <Input
                name="default_share_image"
                defaultValue={siteSettings.default_share_image ?? ""}
              />
            </div>
            <div className="lg:col-span-2">
              <Button type="submit">Guardar configuracion</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
