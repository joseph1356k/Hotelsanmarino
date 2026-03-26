import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminMediaPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media library</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Bucket principal: `hotel-media` en Supabase Storage.</p>
        <p>Las referencias persistentes viven en `media_assets`.</p>
        <p>Las entidades pueden resolver fallback automático por tipo si no tienen media real.</p>
      </CardContent>
    </Card>
  );
}
