import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function ContactPage() {
  const { contactInfo, whatsappCtas } = await getPublicSiteContent();
  const primaryCta = whatsappCtas.find((cta) => cta.is_primary) ?? whatsappCtas[0] ?? null;

  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Contacto"
        title="Contacto operativo sin formularios"
        description="Esta fase elimina formularios publicos por decision de producto. El CTA comercial unico es WhatsApp."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Canales activos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Telefono: {contactInfo.phone}</p>
            <p>Ciudad: {contactInfo.city}</p>
            <p>Check-in: {contactInfo.check_in_time}</p>
            <p>Check-out: {contactInfo.check_out_time}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="font-sans">WhatsApp como canal principal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-primary-foreground/80">
              Mensaje base: {primaryCta?.message ?? contactInfo.whatsapp_default_message}
            </p>
            <WhatsappCta
              phoneNumber={primaryCta?.phone_number ?? contactInfo.whatsapp_number}
              message={primaryCta?.message ?? contactInfo.whatsapp_default_message}
              label={primaryCta?.label ?? "Consultar por WhatsApp"}
              className="bg-card text-foreground hover:bg-card/90"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
