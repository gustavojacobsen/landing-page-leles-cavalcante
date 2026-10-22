"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { AnimatePresence, m } from "motion/react";
import { cookies, tracking } from "@/lib/content";

type Consentimento = "aceito" | "recusado" | null;

const CHAVE = "leles-consentimento-cookies";
const EVENTO = "leles-consentimento";

// Store mínima sobre o localStorage (sem setState em efeito e sem erro de hidratação).
const consentimento = {
  ler(): Consentimento {
    try {
      const v = localStorage.getItem(CHAVE);
      return v === "aceito" || v === "recusado" ? v : null;
    } catch {
      return null;
    }
  },
  gravar(v: Exclude<Consentimento, null>) {
    try {
      localStorage.setItem(CHAVE, v);
    } catch {
      // navegador sem storage: a escolha vale só para esta visita
    }
    window.dispatchEvent(new Event(EVENTO));
  },
  assinar(onChange: () => void) {
    window.addEventListener(EVENTO, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENTO, onChange);
      window.removeEventListener("storage", onChange);
    };
  },
};

/** "pendente" no servidor, para o banner não aparecer antes da hidratação. */
function useConsentimento(): Consentimento | "pendente" {
  return useSyncExternalStore(consentimento.assinar, consentimento.ler, () => "pendente");
}

/** Banner LGPD (Aceitar / Recusar). GTM e Meta Pixel só carregam após o aceite. */
export function CookieBanner() {
  const escolha = useConsentimento();

  // Sem GTM nem Pixel configurados, o site não usa cookies de medição: nada de aviso.
  if (!tracking.gtmId && !tracking.metaPixelId) return null;

  return (
    <>
      {escolha === "aceito" && <Rastreamento />}

      <AnimatePresence>
        {escolha === null && (
          <m.div
            role="dialog"
            aria-live="polite"
            aria-label="Aviso de cookies"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-22 z-50 rounded-2xl border border-bege-escuro bg-branco/95 p-4 shadow-quente-lg backdrop-blur-md sm:right-auto sm:max-w-sm md:left-8 md:bottom-8"
          >
            <p className="text-sm leading-relaxed text-tinta-suave">{cookies.texto}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => consentimento.gravar("aceito")}
                className="rounded-full bg-marrom px-5 py-2 text-sm font-semibold text-branco transition-colors hover:bg-marrom-escuro"
              >
                {cookies.aceitar}
              </button>
              <button
                type="button"
                onClick={() => consentimento.gravar("recusado")}
                className="rounded-full border border-marrom px-5 py-2 text-sm font-semibold text-marrom transition-colors hover:bg-bege"
              >
                {cookies.recusar}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Scripts de marketing. Só renderiza o que tiver ID configurado em `lib/content.ts`. */
function Rastreamento() {
  const { gtmId, metaPixelId } = tracking;
  return (
    <>
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
