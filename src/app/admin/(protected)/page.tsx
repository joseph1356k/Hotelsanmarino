import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminSummary } from "@/lib/content/admin-content";

export default async function AdminDashboardPage() {
  const summary = await getAdminSummary();

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader><CardTitle>Habitaciones</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-semibold">{summary.roomsCount}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Destacadas</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-semibold">{summary.featuredRooms}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Planes</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-semibold">{summary.plansCount}</p></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Testimonios</CardTitle></CardHeader>
        <CardContent><p className="text-3xl font-semibold">{summary.testimonialsCount}</p></CardContent>
      </Card>
    </section>
  );
}
