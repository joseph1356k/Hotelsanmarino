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
      <span className="absolute inset-0 rounded-full bg-[var(--coral)]/22 animate-[soft-pulse_2.6s_ease-in-out_infinite]" />
      <WhatsappCta
        phoneNumber={phoneNumber}
        message={message}
        label={
          <>
            <span className="sr-only sm:not-sr-only">WhatsApp</span>
          </>
        }
        className="relative size-12 max-w-[calc(100vw-1.5rem)] rounded-full bg-[var(--coral)] px-0 text-white shadow-[0_24px_50px_rgba(211,15,8,0.28)] hover:bg-[var(--accent-hover)] sm:h-14 sm:w-auto sm:max-w-[calc(100vw-2rem)] sm:px-5"
      />
    </div>
  );
}
