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
    <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
      <span className="absolute inset-0 rounded-full bg-[var(--coral)]/24 animate-[soft-pulse_2.6s_ease-in-out_infinite]" />
      <WhatsappCta
        phoneNumber={phoneNumber}
        message={message}
        label="WhatsApp"
        className="relative h-14 max-w-[calc(100vw-2rem)] rounded-full bg-[var(--coral)] px-5 text-white shadow-[0_24px_44px_rgba(214,63,52,0.28)] hover:bg-[var(--accent-hover)]"
      />
    </div>
  );
}
