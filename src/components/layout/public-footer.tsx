import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { publicNavigation } from "@/lib/constants/site";
import { BrandLogo } from "@/components/layout/brand-logo";
import { SocialLinks } from "@/components/marketing/social-links";
import { TrackedWhatsappCta } from "@/components/marketing/tracked-whatsapp-cta";
import type {
  ContactInfo,
  SiteSettings,
  WhatsappCta as WhatsappCtaType,
} from "@/types/domain";

export function PublicFooter({
  siteSettings,
  contactInfo,
  primaryCta,
}: {
  siteSettings: SiteSettings;
  contactInfo: ContactInfo;
  primaryCta?: WhatsappCtaType | null;
}) {
  const whatsappPhone = primaryCta?.phone_number ?? contactInfo.whatsapp_number;
  const whatsappMessage =
    primaryCta?.message ?? contactInfo.whatsapp_default_message;
  const whatsappLabel = primaryCta?.label ?? "Consultar por WhatsApp";

  return (
    <footer className="mt-0 overflow-hidden bg-[linear-gradient(180deg,#153b52_0%,#1f2a30_100%)] text-white">
      <div className="container-shell py-12 md:py-16">
        <div className="mb-10 grid gap-6 rounded-[28px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 backdrop-blur-sm sm:p-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/58">
              <span className="h-px w-10 bg-[linear-gradient(90deg,var(--sun),transparent)]" />
              <span>WhatsApp</span>
            </div>
            <h2 className="max-w-3xl text-[2.55rem] leading-[0.94] sm:text-4xl md:text-5xl">
              Ven a vivir El Morro desde San Marino.
            </h2>
            <p className="max-w-2xl text-sm leading-[1.65rem] text-white/72 md:leading-7">
              Habitaciones, planes o una referencia para llegar: te ayudamos por WhatsApp a escoger mejor.
            </p>
          </div>
          <TrackedWhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label={whatsappLabel}
            trackingSource="footer"
            trackingLabel={whatsappLabel}
            className="w-full justify-center bg-[var(--coral)] text-white hover:bg-[var(--accent-hover)] sm:w-auto"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.7fr_1fr]">
          <div className="space-y-6">
            <BrandLogo theme="light" />

            <p className="max-w-md text-base leading-7 text-white/78">
              {siteSettings.site_tagline}
            </p>

            <div className="space-y-3 text-sm text-white/82">
              <p className="inline-flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--sun)]" />
                <span>
                  {contactInfo.address}
                  <br />
                  {contactInfo.city}
                </span>
              </p>
              <p className="inline-flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[var(--sun)]" />
                <span>{contactInfo.phone}</span>
              </p>
              <p className="inline-flex items-center gap-3">
                <Clock3 className="size-4 shrink-0 text-[var(--sun)]" />
                <span>
                  Check-in {contactInfo.check_in_time ?? "--"} - Check-out{" "}
                  {contactInfo.check_out_time ?? "--"}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/52">
              Navegación
            </p>
            <div className="grid gap-3 text-sm text-white/82">
              {publicNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition hover:text-[var(--sun)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/preguntas-frecuentes"
                className="transition hover:text-[var(--sun)]"
              >
                Preguntas frecuentes
              </Link>
              <Link
                href="/datos-del-hotel"
                className="transition hover:text-[var(--sun)]"
              >
                Datos del hotel
              </Link>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/52">
              Marca y redes
            </p>
            <p className="max-w-sm text-sm leading-7 text-white/76">
              Pacífico auténtico, bien vivido: descanso, sabor local y contacto directo cuando importa.
            </p>
            <SocialLinks variant="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
