"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type ItemLightbox = { src: string; alt: string; legenda?: string };

type Props = {
  itens: ItemLightbox[];
  /** Índice aberto; `null` = fechado. */
  indice: number | null;
  onFechar: () => void;
  onMudar: (indice: number) => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Visualizador de imagens em tela cheia: setas, teclado (← → Esc), contador e legenda.
 * Renderizado num portal (fora dos elementos animados com transform) e pausa a rolagem da página.
 */
export function Lightbox({ itens, indice, onFechar, onMudar }: Props) {
  const aberto = indice !== null;
  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const toqueInicio = useRef<{ x: number; y: number } | null>(null);
  const montado = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (indice === null) return;
    const total = itens.length;
    const focoAnterior = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflowAnterior = html.style.overflow;

    html.style.overflow = "hidden";
    window.__lenis?.stop();
    botaoFecharRef.current?.focus();

    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
      else if (e.key === "ArrowRight") onMudar(((indice ?? 0) + 1) % total);
      else if (e.key === "ArrowLeft") onMudar(((indice ?? 0) - 1 + total) % total);
    }
    window.addEventListener("keydown", aoTeclar);

    return () => {
      window.removeEventListener("keydown", aoTeclar);
      html.style.overflow = overflowAnterior;
      window.__lenis?.start();
      focoAnterior?.focus?.();
    };
  }, [indice, itens.length, onFechar, onMudar]);

  // O portal só existe depois da hidratação (no servidor e no 1º render do cliente, nada).
  if (!montado) return null;

  const item = aberto ? itens[indice] : null;
  const varios = itens.length > 1;
  const botao =
    "grid size-12 place-items-center rounded-full border border-branco/30 bg-branco/10 text-branco backdrop-blur-sm transition-colors hover:bg-branco hover:text-marrom";

  return createPortal(
    <AnimatePresence>
      {aberto && item && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={onFechar}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-marrom-escuro/92 p-4 backdrop-blur-md md:p-10"
        >
          <button ref={botaoFecharRef} type="button" onClick={onFechar} aria-label="Fechar" className={`absolute top-[max(1rem,env(safe-area-inset-top))] right-4 md:top-6 md:right-6 ${botao}`}>
            <X aria-hidden className="size-5" strokeWidth={1.8} />
          </button>

          <m.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            // Celular: arrastar o dedo para os lados troca de foto
            onTouchStart={(e) => {
              const p = e.touches[0];
              toqueInicio.current = { x: p.clientX, y: p.clientY };
            }}
            onTouchEnd={(e) => {
              const inicio = toqueInicio.current;
              toqueInicio.current = null;
              if (!inicio || !varios) return;
              const p = e.changedTouches[0];
              const dx = p.clientX - inicio.x;
              if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(p.clientY - inicio.y)) return;
              onMudar(dx < 0 ? (indice + 1) % itens.length : (indice - 1 + itens.length) % itens.length);
            }}
            className="relative h-[68svh] w-full max-w-5xl touch-pan-y md:h-[78vh]"
          >
            <Image src={item.src} alt={item.alt} fill quality={90} sizes="(min-width: 1024px) 1024px, 100vw" className="object-contain" />
          </m.div>

          <div onClick={(e) => e.stopPropagation()} className="mt-5 flex w-full max-w-5xl items-center justify-between gap-4">
            {varios ? (
              <button type="button" onClick={() => onMudar((indice - 1 + itens.length) % itens.length)} aria-label="Imagem anterior" className={botao}>
                <ChevronLeft aria-hidden className="size-5" strokeWidth={1.8} />
              </button>
            ) : (
              <span />
            )}

            <div className="text-center text-branco">
              {item.legenda && <p className="text-sm md:text-base">{item.legenda}</p>}
              {varios && (
                <p className="mt-1 text-xs tracking-[0.2em] text-areia" aria-live="polite">
                  {String(indice + 1).padStart(2, "0")} / {String(itens.length).padStart(2, "0")}
                </p>
              )}
            </div>

            {varios ? (
              <button type="button" onClick={() => onMudar((indice + 1) % itens.length)} aria-label="Próxima imagem" className={botao}>
                <ChevronRight aria-hidden className="size-5" strokeWidth={1.8} />
              </button>
            ) : (
              <span />
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
