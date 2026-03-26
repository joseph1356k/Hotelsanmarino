import type { ReactNode } from "react";
import { AdminHeader } from "@/components/layout/admin-header";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth/admin";
import { signOutAdmin } from "@/lib/actions/auth";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef2f1_0%,#f7f3ec_38%,#f7f3ec_100%)]">
      <div className="container-shell grid gap-6 py-6 lg:grid-cols-[300px_1fr] lg:py-8">
        <AdminSidebar admin={admin} />
        <div className="space-y-6">
          <div className="mist-panel px-5 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Hotel San Marino Tumaco
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Panel interno para contenido, media y configuracion del sitio.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-white px-4 py-2 text-sm text-muted-foreground shadow-[0_10px_24px_rgba(16,45,63,0.06)]">
                  {admin.full_name ?? admin.email}
                </div>
                <form action={signOutAdmin}>
                  <Button type="submit" variant="outline">
                    Cerrar sesion
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <AdminHeader />
          <div className="space-y-6 pb-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
