import Link from "next/link";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createPlanAction,
  deletePlanAction,
  updatePlanAction,
} from "@/lib/actions/admin";
import { getAdminPlanById, getAdminPlans } from "@/lib/content/admin-content";

function PlanForm({
  action,
  plan,
}: {
  action: (formData: FormData) => void | Promise<void>;
  plan?: Awaited<ReturnType<typeof getAdminPlanById>>;
}) {
  return (
    <form action={action} className="space-y-4">
      {plan ? <input type="hidden" name="plan_id" value={plan.id} /> : null}
      <Input name="name" placeholder="Nombre" defaultValue={plan?.name ?? ""} required />
      <Input name="slug" placeholder="slug" defaultValue={plan?.slug ?? ""} />
      <Textarea
        name="short_description"
        placeholder="Descripcion corta"
        defaultValue={plan?.short_description ?? ""}
        className="min-h-24"
        required
      />
      <Textarea
        name="long_description"
        placeholder="Descripcion larga"
        defaultValue={plan?.long_description ?? ""}
        required
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          name="price_label"
          placeholder="Label precio"
          defaultValue={plan?.price_label ?? ""}
        />
        <Input
          name="display_order"
          type="number"
          placeholder="Orden"
          defaultValue={plan?.display_order ?? 1}
          required
        />
        <Input
          name="image_path"
          placeholder="Ruta o URL imagen"
          defaultValue={plan?.image_path ?? ""}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <select
          name="status"
          defaultValue={plan?.status ?? "published"}
          className="flex h-11 w-full rounded-2xl border bg-background px-4 text-sm"
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
          <option value="archived">archived</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={plan?.is_featured ?? false}
          />
          Plan destacado
        </label>
      </div>
      <Button type="submit">{plan ? "Actualizar plan" : "Crear plan"}</Button>
    </form>
  );
}

export default async function AdminPlansPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string; edit?: string }>;
}) {
  const { notice, error, edit } = await searchParams;
  const [plans, currentPlan] = await Promise.all([
    getAdminPlans(),
    edit ? getAdminPlanById(edit) : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Planes</h2>
        <p className="text-sm text-muted-foreground">CRUD real persistente para planes.</p>
      </div>
      <AdminNotice notice={notice} error={error} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Listado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="rounded-2xl border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{plan.name}</p>
                    <p className="text-sm text-muted-foreground">{plan.short_description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/planes?edit=${plan.id}`} className="rounded-full border px-4 py-2 text-sm font-semibold">
                      Editar
                    </Link>
                    <form action={deletePlanAction}>
                      <input type="hidden" name="plan_id" value={plan.id} />
                      <Button type="submit" variant="outline">
                        Eliminar
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{currentPlan ? "Editar plan" : "Nuevo plan"}</CardTitle>
          </CardHeader>
          <CardContent>
            <PlanForm action={currentPlan ? updatePlanAction : createPlanAction} plan={currentPlan} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
