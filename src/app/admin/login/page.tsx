import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminUser } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const admin = await getAdminUser();

  if (admin) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Acceso admin</CardTitle>
          <CardDescription>
            Login básico con Supabase Auth y whitelist de `admin_users`.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminLoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
