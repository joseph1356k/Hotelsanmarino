import Link from "next/link";
import { adminNavigation } from "@/lib/constants/site";
import type { AdminUser } from "@/types/domain";

export function AdminSidebar({ admin }: { admin: AdminUser }) {
  return (
    <aside className="panel h-fit p-5">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Admin</p>
        <p className="font-semibold">{admin.full_name ?? admin.email}</p>
      </div>
      <nav className="mt-6 flex flex-col gap-2 text-sm">
        {adminNavigation.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl px-3 py-2 hover:bg-muted">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
