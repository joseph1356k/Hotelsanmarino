import type { ReactNode } from "react";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { WhatsappFab } from "@/components/marketing/whatsapp-fab";
import { getPublicSiteContent } from "@/lib/content/public-content";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { siteSettings, contactInfo, whatsappCtas } = await getPublicSiteContent();
  const primaryCta =
    whatsappCtas.find((cta) => cta.is_primary) ?? whatsappCtas[0] ?? null;

  return (
    <>
      <PublicHeader
        siteSettings={siteSettings}
        contactInfo={contactInfo}
        primaryCta={primaryCta}
      />
      <main className="flex-1">{children}</main>
      <WhatsappFab
        phoneNumber={primaryCta?.phone_number ?? contactInfo.whatsapp_number}
        message={primaryCta?.message ?? contactInfo.whatsapp_default_message}
      />
      <PublicFooter
        siteSettings={siteSettings}
        contactInfo={contactInfo}
        primaryCta={primaryCta}
      />
    </>
  );
}
