import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/marketing/section-heading";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function PlansPage() {
  const { plans } = await getPublicSiteContent();

  return (
    <section className="container-shell py-16">
      <SectionHeading
        eyebrow="Planes"
        title="Planes administrables"
        description="Contenido provisional cargado desde la capa de contenido para ser sustituido por datos reales sin rediseñar la base."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{plan.long_description}</p>
              <p className="font-semibold">{plan.price_label ?? "Consulta por WhatsApp"}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
