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
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/92 shadow-[0_14px_34px_rgba(24,79,95,0.04)] backdrop-blur-xl">
      <div className="hidden border-b border-white/10 bg-primary md:block">
        <div className="container-shell flex items-center justify-between gap-4 py-2 text-[11px] text-white/84">
          <p className="min-w-0 truncate uppercase tracking-[0.32em]">
            {contactInfo.city} · {siteSettings.site_tagline}
          </p>
          <a
            href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
            className="inline-flex shrink-0 items-center gap-2 text-white transition hover:text-[var(--sun)]"
          >
            <Phone className="size-3.5" />
            {contactInfo.phone}
          </a>
        </div>
      </div>

      <div className="container-shell grid grid-cols-[auto_1fr] items-center gap-3 py-3 md:gap-4 md:py-4 lg:grid-cols-[auto_1fr_auto]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:border-primary hover:text-primary lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" className="group block w-[156px] md:w-[168px] xl:w-[182px]">
            <p className="font-serif text-[2.25rem] leading-[0.84] text-primary md:text-[2.45rem]">
              San Marino
            </p>
            <p className="mt-1 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-foreground/72 transition group-hover:text-primary">
              Hotel en El Morro
            </p>
          </Link>
        </div>

        <nav className="hidden min-w-0 items-center justify-center gap-4 lg:flex xl:gap-6">
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
                  "relative py-2 text-[0.79rem] font-semibold uppercase tracking-[0.16em] text-foreground transition hover:text-primary xl:text-[0.84rem]",
                  isActive && "text-[var(--coral)]",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-[1px] h-[2px] bg-[var(--coral)] transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <WhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label={
              <>
                <span className="xl:hidden">WhatsApp</span>
                <span className="hidden xl:inline">{whatsappLabel}</span>
              </>
            }
            size="sm"
            className="px-3 xl:px-4"
          />
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-primary/12 bg-[linear-gradient(180deg,#184f5f_0%,#112f3b_100%)] lg:hidden">
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
                      "rounded-[22px] border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/86 transition hover:border-white/22 hover:bg-white/8 hover:text-white",
                      isActive && "border-white/24 bg-white text-[var(--coral)]",
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
