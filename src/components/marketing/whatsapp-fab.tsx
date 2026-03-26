"use client";

import { WhatsappCta } from "@/components/marketing/whatsapp-cta";

export function WhatsappFab({
  phoneNumber,
  message,
}: {
  phoneNumber: string;
  message: string;
}) {
  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-7 md:right-7">
      <WhatsappCta
        phoneNumber={phoneNumber}
        message={message}
        label="WhatsApp"
        className="h-14 rounded-full bg-[var(--coral)] px-5 text-white hover:bg-[var(--coral)]/92"
      />
    </div>
  );
}
