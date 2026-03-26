import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function AdminTestimonialsPage() {
  const { testimonials } = await getPublicSiteContent();

  return (
    <div className="grid gap-4">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id}>
          <CardHeader>
            <CardTitle>{testimonial.guest_name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {testimonial.quote}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
