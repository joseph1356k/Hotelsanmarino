import type { ReactNode } from "react";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { getPublicSiteContent } from "@/lib/content/public-content";

export const dynamic = "force-dynamic";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const { contactInfo, whatsappCtas } = await getPublicSiteContent();
  const primaryCta = whatsappCtas.find((cta) => cta.is_primary) ?? whatsappCtas[0] ?? null;

  return (
    <>
      <PublicHeader contactInfo={contactInfo} primaryCta={primaryCta} />
      <main className="flex-1">{children}</main>
      <PublicFooter contactInfo={contactInfo} primaryCta={primaryCta} />
    </>
  );
}
