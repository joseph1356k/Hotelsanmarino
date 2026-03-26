import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AdminPlansPage() {
  const { plans } = await getPublicSiteContent();

  return (
    <div className="grid gap-4">
      {plans.map((plan) => (
        <Card key={plan.id}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {plan.short_description}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
