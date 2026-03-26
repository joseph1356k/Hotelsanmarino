"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, BedDouble, MapPinned, ImageIcon, Layers3, Menu, Quote, Settings2, X } from "lucide-react";
import { adminNavigation } from "@/lib/constants/site";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/types/domain";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "/admin": LayoutDashboard,
  "/admin/habitaciones": BedDouble,
  "/admin/planes": Layers3,
  "/admin/testimonios": Quote,
  "/admin/home": LayoutDashboard,
  "/admin/contacto": MapPinned,
  "/admin/configuracion": Settings2,
  "/admin/media": ImageIcon,
};

function SidebarContent({ admin }: { admin: AdminUser }) {
  const pathname = usePathname();
  const groupedItems = Object.entries(
    adminNavigation.reduce<Record<string, typeof adminNavigation>>((acc, item) => {
      acc[item.group] ??= [];
      acc[item.group].push(item);
      return acc;
    }, {}),
  );

  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-border/80 bg-[#163136] p-5 text-white shadow-[0_20px_60px_rgba(7,27,29,0.35)]">
      <div className="space-y-2 border-b border-white/10 pb-5">
        <p className="text-xs uppercase tracking-[0.24em] text-white/55">San Marino Admin</p>
        <p className="text-lg font-semibold">{admin.full_name ?? admin.email}</p>
        <p className="text-sm text-white/60">Gestion operativa del sitio</p>
      </div>
      <div className="mt-6 space-y-6">
        {groupedItems.map(([group, items]) => (
          <div key={group} className="space-y-2">
            <p className="px-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
              {group}
            </p>
            <nav className="flex flex-col gap-1.5">
              {items.map((item) => {
                const Icon = iconMap[item.href] ?? LayoutDashboard;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-white text-[#163136]"
                        : "text-white/75 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminSidebar({ admin }: { admin: AdminUser }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex size-11 items-center justify-center rounded-full border bg-card shadow lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <div className="hidden lg:block">
        <SidebarContent admin={admin} />
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-[#0d1718]/70 backdrop-blur-sm lg:hidden">
          <div className="h-full w-[88%] max-w-sm p-4">
            <div className="relative h-full">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X className="size-5" />
              </button>
              <SidebarContent admin={admin} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
