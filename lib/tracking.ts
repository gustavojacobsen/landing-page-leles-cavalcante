import type { OrigemCTA } from "./content";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

/** Dispara o evento de lead em todo clique de CTA. GTM e Pixel só existem após o aceite de cookies. */
export function trackLead(origem: OrigemCTA) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event: "lead_whatsapp", origem });
  window.fbq?.("track", "Lead", { content_name: origem });
}
