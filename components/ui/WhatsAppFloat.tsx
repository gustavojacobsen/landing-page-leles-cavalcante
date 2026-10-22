"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { X } from "lucide-react";
import { waLink } from "@/lib/whatsapp";
import { trackLead } from "@/lib/tracking";
import { WhatsAppIcon } from "./Icones";

const EASE = [0.22, 1, 0.36, 1] as const;
const CHAVE_BALAO = "leles-balao-whatsapp";

function balaoJaVisto() {
  try {
    return sessionStorage.getItem(CHAVE_BALAO) === "1";
  } catch {
    return false;
  }
}

function marcarBalaoVisto() {
  try {
    sessionStorage.setItem(CHAVE_BALAO, "1");
  } catch {
    // sem storage: o balão pode reaparecer, sem problema
  }
}

/**
 * Botão flutuante: aparece após 400px de rolagem, com um anel de pulso a cada ~6s.
 * Um balão de convite aparece uma única vez por visita, some sozinho e pode ser fechado.
 */
export function WhatsAppFloat() {
  const { scrollY } = useScroll();
  const [visivel, setVisivel] = useState(false);
  const [balao, setBalao] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisivel(y > 400));

  useEffect(() => {
    if (!visivel || balaoJaVisto()) return;
    const mostrar = setTimeout(() => {
      setBalao(true);
      marcarBalaoVisto();
    }, 2500);
    const esconder = setTimeout(() => setBalao(false), 2500 + 8000);
    return () => {
      clearTimeout(mostrar);
      clearTimeout(esconder);
    };
  }, [visivel]);

  return (
    <AnimatePresence>
      {visivel && (
        <m.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex items-end gap-3 md:right-8 md:bottom-8"
        >
          <AnimatePresence>
            {balao && (
              <m.div
                role="status"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative mb-2 max-w-[15rem] origin-bottom-right rounded-2xl rounded-br-md border border-bege-escuro bg-branco py-3 pr-9 pl-4 shadow-quente-lg"
              >
                <p className="text-sm font-semibold text-marrom">Ficou com alguma dúvida?</p>
                <p className="mt-0.5 text-xs text-tinta-suave">Fale com a nossa equipe pelo WhatsApp.</p>
                <button
                  type="button"
                  onClick={() => setBalao(false)}
                  aria-label="Fechar aviso"
                  className="absolute top-2 right-2 grid size-6 place-items-center rounded-full text-tinta-suave transition-colors hover:bg-bege hover:text-marrom"
                >
                  <X aria-hidden className="size-3.5" strokeWidth={2} />
                </button>
              </m.div>
            )}
          </AnimatePresence>

          <a
            href={waLink("flutuante")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackLead("flutuante");
              setBalao(false);
            }}
            aria-label="Conversar pelo WhatsApp (abre em nova aba)"
            className="relative grid size-14 shrink-0 place-items-center rounded-full bg-marrom text-branco shadow-quente-lg transition-colors hover:bg-marrom-escuro md:size-16"
          >
            <span aria-hidden className="pulso absolute inset-0 rounded-full border-2 border-caramelo opacity-0" />
            <WhatsAppIcon className="size-7" />
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
