import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/marketing/section-heading";

const services = [
  "Hospedaje",
  "Atención directa por WhatsApp",
  "Soporte para contenido editable",
];

export default function ServicesPage() {
  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Servicios"
        title="Ruta pública preparada para contenido administrable"
        description="En fase 2 este bloque debe leer servicios reales desde DB si el negocio decide modelarlos como entidad separada."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service}>
            <CardHeader>
              <CardTitle>{service}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Placeholder estructural intencional. No representa el catálogo final.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
