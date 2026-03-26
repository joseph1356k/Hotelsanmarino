import Link from "next/link";
import { publicNavigation, siteConfig } from "@/lib/constants/site";
import type { ContactInfo } from "@/types/domain";

export function PublicFooter({ contactInfo }: { contactInfo: ContactInfo }) {
  return (
    <footer className="mt-20 border-t border-border/70 bg-card">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Hotel San Marino</p>
          <p className="max-w-sm text-sm text-muted-foreground">{siteConfig.siteTagline}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Rutas públicas base</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {publicNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold">CTA comercial</p>
          <p className="text-muted-foreground">WhatsApp: {contactInfo.whatsapp_number}</p>
          <p className="text-muted-foreground">{contactInfo.whatsapp_default_message}</p>
          <p className="text-muted-foreground">Sin formularios públicos ni reservas online.</p>
        </div>
      </div>
    </footer>
  );
}
