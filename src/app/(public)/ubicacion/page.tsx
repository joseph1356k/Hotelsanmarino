import { SectionHeading } from "@/components/marketing/section-heading";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function LocationPage() {
  const { contactInfo } = await getPublicSiteContent();

  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Ubicación"
        title="Punto de referencia del hotel"
        description="No hay formulario de contacto. El objetivo es exponer información operativa y llevar a WhatsApp."
      />
      <div className="panel mt-10 p-6">
        <p className="text-sm text-muted-foreground">Dirección base</p>
        <p className="mt-2 text-lg font-semibold">{contactInfo.address}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          El embed real del mapa se activará cuando exista `maps_embed_url` en la base de datos.
        </p>
      </div>
    </section>
  );
}
