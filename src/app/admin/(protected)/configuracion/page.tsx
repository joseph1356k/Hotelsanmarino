import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AdminSettingsPage() {
  const { siteSettings } = await getPublicSiteContent();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración del sitio</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Nombre: {siteSettings.site_name}</p>
        <p>Tagline: {siteSettings.site_tagline}</p>
        <p>SEO title: {siteSettings.seo_title}</p>
        <p>Share image: {siteSettings.default_share_image}</p>
      </CardContent>
    </Card>
  );
}
