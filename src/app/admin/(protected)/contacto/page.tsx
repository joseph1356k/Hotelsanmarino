import { AdminNotice } from "@/components/admin/admin-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createWhatsappCtaAction,
  deleteWhatsappCtaAction,
  updateContactInfoAction,
  updateWhatsappCtaAction,
} from "@/lib/actions/admin";
import {
  getAdminContactInfo,
  getAdminWhatsappCtas,
} from "@/lib/content/admin-content";

export default async function AdminContactPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string; error?: string }>;
}) {
  const { notice, error } = await searchParams;
  const [contactInfo, whatsappCtas] = await Promise.all([
    getAdminContactInfo(),
    getAdminWhatsappCtas(),
  ]);

  return (
    <div className="space-y-6">
      <AdminNotice notice={notice} error={error} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informacion de contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateContactInfoAction} className="space-y-4">
              <Input name="phone" defaultValue={contactInfo.phone} required />
              <Input
                name="whatsapp_number"
                defaultValue={contactInfo.whatsapp_number}
                required
              />
              <Textarea
                name="whatsapp_default_message"
                defaultValue={contactInfo.whatsapp_default_message}
                required
              />
              <Input name="address" defaultValue={contactInfo.address} required />
              <Input name="city" defaultValue={contactInfo.city} required />
              <Input name="maps_embed_url" defaultValue={contactInfo.maps_embed_url ?? ""} />
              <Input name="email" defaultValue={contactInfo.email ?? ""} />
              <div className="grid gap-4 md:grid-cols-2">
                <Input name="check_in_time" defaultValue={contactInfo.check_in_time ?? ""} />
                <Input
                  name="check_out_time"
                  defaultValue={contactInfo.check_out_time ?? ""}
                />
              </div>
              <Button type="submit">Guardar contacto</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nuevo CTA de WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createWhatsappCtaAction} className="space-y-4">
              <Input name="key" placeholder="key" required />
              <Input name="label" placeholder="Label" required />
              <Textarea name="message" placeholder="Mensaje" required />
              <Input
                name="phone_number"
                placeholder="+573154974576"
                defaultValue="+573154974576"
                required
              />
              <Input name="display_order" type="number" defaultValue={1} required />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_primary" />
                CTA principal
              </label>
              <Button type="submit">Crear CTA</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CTAs existentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {whatsappCtas.map((cta) => (
            <form key={cta.id} action={updateWhatsappCtaAction} className="rounded-2xl border p-4">
              <input type="hidden" name="cta_id" value={cta.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Input name="key" defaultValue={cta.key} required />
                <Input name="label" defaultValue={cta.label} required />
              </div>
              <Textarea name="message" defaultValue={cta.message} required className="mt-4" />
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Input name="phone_number" defaultValue={cta.phone_number} required />
                <Input
                  name="display_order"
                  type="number"
                  defaultValue={cta.display_order}
                  required
                />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="is_primary" defaultChecked={cta.is_primary} />
                  CTA principal
                </label>
              </div>
              <div className="mt-4 flex gap-2">
                <Button type="submit">Guardar CTA</Button>
                <button
                  formAction={deleteWhatsappCtaAction}
                  type="submit"
                  className="rounded-full border px-5 py-3 text-sm font-semibold"
                >
                  Eliminar CTA
                </button>
              </div>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
