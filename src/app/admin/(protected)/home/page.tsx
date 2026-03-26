import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AdminHomePage() {
  const { homeSections } = await getPublicSiteContent();

  return (
    <div className="grid gap-4">
      {homeSections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Clave: {section.key}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
