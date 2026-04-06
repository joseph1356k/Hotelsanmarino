"use client";

import { useEffect, useState } from "react";
import { WhatsappCta } from "@/components/marketing/whatsapp-cta";

export function WhatsappFab({
  phoneNumber,
  message,
}: {
  phoneNumber: string;
  message: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 220 || window.innerWidth >= 640);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 transition-all duration-300 md:bottom-6 md:right-6 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-[var(--coral)]/22 animate-[soft-pulse_2.6s_ease-in-out_infinite]" />
      <WhatsappCta
        phoneNumber={phoneNumber}
        message={message}
        label={
          <>
            <span className="sr-only sm:not-sr-only">WhatsApp</span>
          </>
        }
        className="relative size-12 max-w-[calc(100vw-1.5rem)] rounded-full bg-[var(--coral)] px-0 text-white shadow-[0_24px_50px_rgba(211,15,8,0.28)] transition duration-300 hover:-translate-y-[2px] hover:bg-[var(--accent-hover)] hover:shadow-[0_30px_60px_rgba(211,15,8,0.3)] sm:h-14 sm:w-auto sm:max-w-[calc(100vw-2rem)] sm:px-5"
      />
    </div>
  );
}
