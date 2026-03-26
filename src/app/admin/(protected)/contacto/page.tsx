import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AdminContactPage() {
  const { contactInfo, whatsappCtas } = await getPublicSiteContent();

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Información de contacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Teléfono: {contactInfo.phone}</p>
          <p>WhatsApp: {contactInfo.whatsapp_number}</p>
          <p>Mensaje base: {contactInfo.whatsapp_default_message}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>CTAs de WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {whatsappCtas.map((cta) => (
            <p key={cta.id}>
              {cta.key}: {cta.label}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
