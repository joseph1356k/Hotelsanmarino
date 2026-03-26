import Link from "next/link";
import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createTestimonialAction,
  deleteTestimonialAction,
  updateTestimonialAction,
} from "@/lib/actions/admin";
import {
  getAdminTestimonialById,
  getAdminTestimonials,
} from "@/lib/content/admin-content";

function TestimonialForm({
  action,
  testimonial,
}: {
  action: (formData: FormData) => void | Promise<void>;
  testimonial?: Awaited<ReturnType<typeof getAdminTestimonialById>>;
}) {
  return (
    <form action={action} className="space-y-4">
      {testimonial ? (
        <input type="hidden" name="testimonial_id" value={testimonial.id} />
      ) : null}
      <Input
        name="guest_name"
        placeholder="Autor"
        defaultValue={testimonial?.guest_name ?? ""}
        required
      />
      <Input
        name="guest_origin"
        placeholder="Origen o contexto"
        defaultValue={testimonial?.guest_origin ?? ""}
      />
      <Textarea
        name="quote"
        placeholder="Testimonio"
        defaultValue={testimonial?.quote ?? ""}
        required
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          name="rating"
          type="number"
          min={1}
          max={5}
          defaultValue={testimonial?.rating ?? 5}
          required
        />
        <Input
          name="display_order"
          type="number"
          defaultValue={testimonial?.display_order ?? 1}
          required
        />
        <select
          name="status"
          defaultValue={testimonial?.status ?? "published"}
          className="flex h-11 w-full rounded-2xl border bg-background px-4 text-sm"
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
          <option value="archived">archived</option>
        </select>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_featured"
          defaultChecked={testimonial?.is_featured ?? false}
        />
        Destacado
      </label>
      <Button type="submit">
        {testimonial ? "Actualizar testimonio" : "Crear testimonio"}
      </Button>
    </form>
  );
}

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string; edit?: string }>;
}) {
  const { notice, error, edit } = await searchParams;
  const [testimonials, currentTestimonial] = await Promise.all([
    getAdminTestimonials(),
    edit ? getAdminTestimonialById(edit) : Promise.resolve(null),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl">Testimonios</h2>
        <p className="text-sm text-muted-foreground">CRUD real persistente para testimonios.</p>
      </div>
      <AdminNotice notice={notice} error={error} />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Listado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="rounded-2xl border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{testimonial.guest_name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.quote}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/testimonios?edit=${testimonial.id}`} className="rounded-full border px-4 py-2 text-sm font-semibold">
                      Editar
                    </Link>
                    <form action={deleteTestimonialAction}>
                      <input type="hidden" name="testimonial_id" value={testimonial.id} />
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
            <CardTitle>
              {currentTestimonial ? "Editar testimonio" : "Nuevo testimonio"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TestimonialForm
              action={currentTestimonial ? updateTestimonialAction : createTestimonialAction}
              testimonial={currentTestimonial}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
