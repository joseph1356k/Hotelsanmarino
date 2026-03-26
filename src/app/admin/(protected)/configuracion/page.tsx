import { AdminNotice } from "@/components/admin/admin-notice";
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
      <AdminNotice notice={notice} error={error} />
      <Card>
        <CardHeader>
          <CardTitle>Configuracion del sitio</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateSiteSettingsAction} className="space-y-4">
            <Input name="site_name" defaultValue={siteSettings.site_name} required />
            <Input name="site_tagline" defaultValue={siteSettings.site_tagline} required />
            <Input name="seo_title" defaultValue={siteSettings.seo_title ?? ""} />
            <Textarea
              name="seo_description"
              defaultValue={siteSettings.seo_description ?? ""}
            />
            <Input name="logo_path" defaultValue={siteSettings.logo_path ?? ""} />
            <Input
              name="default_share_image"
              defaultValue={siteSettings.default_share_image ?? ""}
            />
            <Button type="submit">Guardar configuracion</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
