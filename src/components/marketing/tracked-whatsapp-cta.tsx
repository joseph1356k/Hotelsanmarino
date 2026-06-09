"use client";

import type { MouseEventHandler } from "react";
import {
  WhatsappCta,
  type WhatsappCtaProps,
} from "@/components/marketing/whatsapp-cta";

type TrackingValue = string | number | boolean | null | undefined;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, TrackingValue>>;
    gtag?: (
      command: "event",
      eventName: string,
      params?: Record<string, TrackingValue>,
    ) => void;
    fbq?: (
      command: "trackCustom",
      eventName: string,
      params?: Record<string, TrackingValue>,
    ) => void;
  }
}

export interface WhatsappTrackingPayload {
  source: string;
  label: string;
  phoneNumber: string;
  message: string;
  detail?: string;
}

export function trackWhatsappIntent(payload: WhatsappTrackingPayload) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    event: "whatsapp_click",
    whatsapp_source: payload.source,
    whatsapp_label: payload.label,
    whatsapp_detail: payload.detail,
    whatsapp_phone: payload.phoneNumber.replace(/\D/g, ""),
  };

  window.dataLayer?.push(eventPayload);
  window.gtag?.("event", "whatsapp_click", eventPayload);
  window.fbq?.("trackCustom", "WhatsAppClick", eventPayload);
  window.dispatchEvent(
    new CustomEvent("hotel:whatsapp-intent", {
      detail: {
        ...eventPayload,
        message: payload.message,
      },
    }),
  );
}

export function TrackedWhatsappCta({
  trackingSource,
  trackingLabel,
  trackingDetail,
  onClick,
  ...props
}: WhatsappCtaProps & {
  trackingSource: string;
  trackingLabel?: string;
  trackingDetail?: string;
}) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    trackWhatsappIntent({
      source: trackingSource,
      label:
        trackingLabel ??
        (typeof props.label === "string" ? props.label : "WhatsApp"),
      detail: trackingDetail,
      phoneNumber: props.phoneNumber,
      message: props.message,
    });

    onClick?.(event);
  };

  return <WhatsappCta {...props} onClick={handleClick} />;
}
