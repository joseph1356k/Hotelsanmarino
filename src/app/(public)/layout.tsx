import type { ReactNode } from "react";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";
import { getPublicSiteContent } from "@/lib/content/public-content";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const { contactInfo } = await getPublicSiteContent();

  return (
    <>
      <PublicHeader contactInfo={contactInfo} />
      <main className="flex-1">{children}</main>
      <PublicFooter contactInfo={contactInfo} />
    </>
  );
}
