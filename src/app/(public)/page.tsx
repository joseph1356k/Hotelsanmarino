import { SectionHeading } from "@/components/marketing/section-heading";
import { RoomCard } from "@/components/marketing/room-card";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function HomePage() {
  const content = await getPublicSiteContent();
  const hero = content.homeSections.find((section) => section.key === "hero");
  const primaryCta = content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <div className="subtle-grid">
      <section className="container-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <SectionHeading
            eyebrow={String(hero?.payload.eyebrow ?? "Hotel")}
            title={hero?.title ?? content.siteSettings.site_name}
            description={hero?.body ?? content.siteSettings.site_tagline}
          />
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="font-sans text-xl">
                Unico CTA comercial de esta fase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-primary-foreground/80">
                Sin formularios publicos, sin checkout y sin reservas online. La salida comercial es conversacion directa por WhatsApp.
              </p>
              <WhatsappCta
                phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
                message={primaryCta?.message ?? content.contactInfo.whatsapp_default_message}
                label={String(hero?.payload.ctaLabel ?? primaryCta?.label ?? "Consultar por WhatsApp")}
                className="bg-card text-foreground hover:bg-card/90"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="mb-8 flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Habitaciones"
            title="Base lista para escalar a 32 habitaciones"
            description="El detalle real llegara en fase 2; la estructura de contenido y relaciones ya esta definida."
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {content.rooms.filter((room) => room.is_featured).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
}
