import Link from "next/link";
import { publicNavigation } from "@/lib/constants/site";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";
import type { ContactInfo } from "@/types/domain";

export function PublicHeader({ contactInfo }: { contactInfo: ContactInfo }) {
  return (
    <header className="border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="container-shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="text-lg font-semibold uppercase tracking-[0.2em]">
          San Marino
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          {publicNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <WhatsappCta
          phoneNumber={contactInfo.whatsapp_number}
          message={contactInfo.whatsapp_default_message}
        />
      </div>
    </header>
  );
}
