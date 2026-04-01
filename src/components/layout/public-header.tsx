"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { publicNavigation } from "@/lib/constants/site";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/layout/brand-logo";
import { SocialLinks } from "@/components/marketing/social-links";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const whatsappPhone = primaryCta?.phone_number ?? contactInfo.whatsapp_number;
  const whatsappMessage =
    primaryCta?.message ?? contactInfo.whatsapp_default_message;
  const whatsappLabel = primaryCta?.label ?? "Consultar por WhatsApp";

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      frame = window.requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
        setIsScrolled(window.scrollY > 12);
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-white/94 backdrop-blur-xl transition-all duration-300",
        isScrolled
          ? "shadow-[0_18px_48px_rgba(24,79,95,0.08)]"
          : "shadow-[0_14px_34px_rgba(24,79,95,0.05)]",
      )}
    >
      <div className="hidden border-b border-white/12 bg-[linear-gradient(90deg,#184f5f_0%,#2b6d80_100%)] md:block">
        <div className="container-shell flex items-center justify-between gap-4 py-2 text-[11px] text-white/88">
          <p className="min-w-0 truncate uppercase tracking-[0.32em]">
            {contactInfo.city} - {siteSettings.site_tagline}
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <SocialLinks variant="dark" size="compact" className="gap-2" />
            <a
              href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
              className="inline-flex shrink-0 items-center gap-2 text-white transition duration-300 hover:text-[var(--sun)]"
            >
              <Phone className="size-3.5" />
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-shell grid grid-cols-[auto_1fr] items-center gap-3 py-3 md:gap-4 md:py-4 lg:grid-cols-[minmax(210px,260px)_1fr_auto] xl:grid-cols-[minmax(228px,280px)_1fr_auto]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-white text-foreground transition duration-300 hover:border-primary hover:text-primary lg:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <BrandLogo className="max-w-full" compact />
        </div>

        <nav className="hidden min-w-0 items-center justify-center gap-3 pl-3 lg:flex xl:gap-4 xl:pl-5 2xl:gap-6 2xl:pl-8">
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
                  "relative py-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-foreground transition duration-300 hover:-translate-y-[1px] hover:text-primary xl:text-[0.79rem] xl:tracking-[0.15em] 2xl:text-[0.84rem] 2xl:tracking-[0.16em]",
                  isActive && "text-[var(--coral)]",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-[1px] h-[2px] origin-left bg-[var(--coral)] transition-all duration-300",
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
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
                <span className="2xl:hidden">WhatsApp</span>
                <span className="hidden 2xl:inline">{whatsappLabel}</span>
              </>
            }
            size="sm"
            className="px-3 transition duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_48px_rgba(211,15,8,0.24)] xl:px-4"
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
            <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/62">
                Redes sociales
              </p>
              <SocialLinks variant="dark" size="compact" className="mt-4 gap-2" />
            </div>
            <WhatsappCta
              phoneNumber={whatsappPhone}
              message={whatsappMessage}
              label={whatsappLabel}
              className="w-full justify-center"
            />
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-primary/8">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--sky)_0%,var(--coral)_58%,var(--sun)_100%)] shadow-[0_0_18px_rgba(102,182,193,0.28)] transition-[width] duration-150"
          style={{ width: `${Math.max(scrollProgress * 100, 4)}%` }}
        />
      </div>
    </header>
  );
}
