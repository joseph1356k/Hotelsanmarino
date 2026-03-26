import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateHomeSectionAction } from "@/lib/actions/admin";
import { getAdminHomeSections } from "@/lib/content/admin-content";

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { notice, error } = await searchParams;
  const homeSections = await getAdminHomeSections();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Home sections</h2>
        <p className="text-sm text-muted-foreground">
          Edicion persistente real de titulos, cuerpo, estado y payload.
        </p>
      </div>
      <AdminNotice notice={notice} error={error} />
      <div className="grid gap-6">
        {homeSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.key}</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateHomeSectionAction} className="space-y-4">
                <input type="hidden" name="id" value={section.id} />
                <Input name="title" defaultValue={section.title} required />
                <Input name="subtitle" defaultValue={section.subtitle ?? ""} />
                <Textarea name="body" defaultValue={section.body ?? ""} />
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    name="display_order"
                    type="number"
                    defaultValue={section.display_order}
                    required
                  />
                  <select
                    name="status"
                    defaultValue={section.status}
                    className="flex h-11 w-full rounded-2xl border bg-background px-4 text-sm"
                  >
                    <option value="draft">draft</option>
                    <option value="published">published</option>
                    <option value="archived">archived</option>
                  </select>
                </div>
                <Textarea
                  name="payload_json"
                  defaultValue={JSON.stringify(section.payload, null, 2)}
                />
                <Button type="submit">Guardar seccion</Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
