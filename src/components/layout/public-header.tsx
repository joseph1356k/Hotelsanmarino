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
    <header className="sticky top-0 z-50 border-b border-border bg-white/94 backdrop-blur-xl">
      <div className="border-b border-primary/10 bg-primary">
        <div className="container-shell hidden items-center justify-between py-1.5 text-[11px] text-white/84 md:flex">
          <p className="tracking-[0.24em] uppercase">
            {contactInfo.city} - {siteSettings.site_tagline}
          </p>
          <a
            href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 text-white transition-colors hover:text-[var(--sun-soft)]"
          >
            <Phone className="size-3.5" />
            {contactInfo.phone}
          </a>
        </div>
      </div>

      <div className="container-shell flex items-center justify-between gap-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:border-primary hover:text-primary lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" className="group space-y-0.5">
            <p className="font-serif text-3xl leading-none tracking-[0.02em] text-primary">
              San Marino
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground transition group-hover:text-primary">
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
                  "relative text-sm tracking-[0.16em] uppercase text-foreground transition-colors hover:text-primary",
                  isActive && "text-[var(--coral)]",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-2 h-0.5 bg-[var(--coral)] transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
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
        <div className="border-t border-primary/10 bg-[linear-gradient(180deg,#0f5f8f_0%,#0b4c73_100%)] lg:hidden">
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
                      "rounded-2xl border border-white/8 px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/72 transition hover:border-white/20 hover:bg-white/8 hover:text-white",
                      isActive && "border-white/18 bg-white text-[var(--coral)]",
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
