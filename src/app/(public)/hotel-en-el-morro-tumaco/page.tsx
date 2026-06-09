import type { Metadata } from "next";
import { LocalSeoLanding } from "@/components/marketing/local-seo-landing";
import { localSeoPages } from "@/content/commercial-content";
import { getPublicSiteContent } from "@/lib/content/public-content";

const page = localSeoPages["hotel-en-el-morro-tumaco"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: [page.keyword, "El Morro Tumaco", "Hotel San Marino Tumaco"],
};

export default async function HotelEnElMorroTumacoPage() {
  const content = await getPublicSiteContent();
  const primaryCta =
    content.whatsappCtas.find((cta) => cta.is_primary) ?? content.whatsappCtas[0] ?? null;

  return (
    <LocalSeoLanding
      page={page}
      phoneNumber={primaryCta?.phone_number ?? content.contactInfo.whatsapp_number}
    />
  );
}
