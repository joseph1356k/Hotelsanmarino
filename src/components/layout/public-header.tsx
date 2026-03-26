"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { publicNavigation } from "@/lib/constants/site";
import { cn } from "@/lib/utils";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import type {
  ContactInfo,
  SiteSettings,
  WhatsappCta as WhatsappCtaType,
} from "@/types/domain";

export function PublicHeader({
  siteSettings,
  contactInfo,
  primaryCta,
}: {
  siteSettings: SiteSettings;
  contactInfo: ContactInfo;
  primaryCta?: WhatsappCtaType | null;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const whatsappPhone = primaryCta?.phone_number ?? contactInfo.whatsapp_number;
  const whatsappMessage =
    primaryCta?.message ?? contactInfo.whatsapp_default_message;
  const whatsappLabel = primaryCta?.label ?? "Consultar por WhatsApp";

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="border-b border-border/60 bg-white/45">
        <div className="container-shell hidden items-center justify-between py-2 text-xs text-muted-foreground md:flex">
          <p className="tracking-[0.24em] uppercase">
            {contactInfo.city} · {siteSettings.site_tagline}
          </p>
          <a
            href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Phone className="size-3.5" />
            {contactInfo.phone}
          </a>
        </div>
      </div>
      <div className="container-shell flex items-center justify-between gap-4 py-4 md:py-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border bg-white/80 text-foreground transition hover:bg-white lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <Link href="/" className="group space-y-0.5">
            <p className="font-serif text-3xl leading-none tracking-[0.02em] text-primary">
              San Marino
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground transition group-hover:text-foreground">
              Hotel en El Morro
            </p>
          </Link>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {publicNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <WhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label={whatsappLabel}
            size="sm"
          />
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-border/70 bg-background lg:hidden">
          <div className="container-shell space-y-4 py-5">
            <nav className="grid gap-2">
              {publicNavigation.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl border border-transparent px-4 py-3 text-sm uppercase tracking-[0.18em] text-muted-foreground transition hover:border-border hover:bg-white/70 hover:text-foreground",
                      isActive && "border-border bg-white text-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <WhatsappCta
              phoneNumber={whatsappPhone}
              message={whatsappMessage}
              label={whatsappLabel}
              className="w-full justify-center"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
