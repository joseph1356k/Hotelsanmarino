import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { publicNavigation } from "@/lib/constants/site";
import { SocialLinks } from "@/components/marketing/social-links";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
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
    <footer className="mt-20 bg-[var(--footer)] text-white">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.1fr_0.8fr_1.1fr]">
        <div className="space-y-5">
          <div>
            <p className="font-serif text-4xl leading-none">San Marino</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/86">
              {siteSettings.site_tagline}
            </p>
          </div>
          <div className="space-y-3 text-sm text-white/88">
            <p className="inline-flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {contactInfo.address}
                <br />
                {contactInfo.city}
              </span>
            </p>
            <p className="inline-flex items-center gap-3">
              <Phone className="size-4 shrink-0" />
              <span>{contactInfo.phone}</span>
            </p>
            <p className="inline-flex items-center gap-3">
              <Clock3 className="size-4 shrink-0" />
              <span>
                Check-in {contactInfo.check_in_time ?? "--"} - Check-out{" "}
                {contactInfo.check_out_time ?? "--"}
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">
            Navegacion
          </p>
          <div className="grid gap-3 text-sm text-white/88">
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[var(--sun-soft)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.28em] text-white/55">
            WhatsApp
          </p>
          <p className="max-w-sm text-sm leading-6 text-white/86">
            La conversacion comercial ocurre aqui: una via directa, clara y sin
            formularios publicos.
          </p>
          <WhatsappCta
            phoneNumber={whatsappPhone}
            message={whatsappMessage}
            label={whatsappLabel}
            className="bg-[var(--coral)] text-white hover:bg-[var(--accent-hover)]"
          />
          <div className="pt-2">
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/55">
              Redes sociales
            </p>
            <SocialLinks variant="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
