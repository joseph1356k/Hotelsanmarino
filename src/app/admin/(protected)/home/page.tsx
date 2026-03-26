import { AdminNotice } from "@/components/admin/admin-notice";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateHomeSectionAction } from "@/lib/actions/admin";
import { getAdminHomeSections } from "@/lib/content/admin-content";

const sectionHints: Record<string, string> = {
  hero: "Bloque principal del home. Controla el mensaje inicial y el copy de CTA.",
  featured_rooms:
    "Bloque que contextualiza el modulo de habitaciones destacadas en la home.",
};

export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { notice, error } = await searchParams;
  const homeSections = await getAdminHomeSections();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Sitio"
        title="Editor del home"
        description="Cada bloque se presenta con contexto para que el admin entienda que esta modificando y por que importa."
      />
      <AdminNotice notice={notice} error={error} />
      <div className="grid gap-6">
        {homeSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.key}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {sectionHints[section.key] ?? "Bloque editable del home."}
              </p>
            </CardHeader>
            <CardContent>
              <form action={updateHomeSectionAction} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <input type="hidden" name="id" value={section.id} />
                <div className="space-y-4">
                  <Input name="title" defaultValue={section.title} required />
                  <Input name="subtitle" defaultValue={section.subtitle ?? ""} />
                  <Textarea name="body" defaultValue={section.body ?? ""} />
                </div>
                <div className="space-y-4">
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
                    className="min-h-44 font-mono text-xs"
                  />
                  <Button type="submit">Guardar bloque</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
