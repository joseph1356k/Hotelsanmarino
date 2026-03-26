import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth/admin";
import { signOutAdmin } from "@/lib/actions/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container-shell grid gap-6 py-8 lg:grid-cols-[280px_1fr]">
        <AdminSidebar admin={admin} />
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Hotel San Marino
              </p>
              <h1 className="text-3xl">Panel administrativo</h1>
            </div>
            <form action={signOutAdmin}>
              <Button type="submit" variant="outline">
                Cerrar sesión
              </Button>
            </form>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
