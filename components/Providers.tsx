"use client";

import { useEffect, type ReactNode } from "react";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import Lenis from "lenis";

declare global {
  interface Window {
    /** Instância do Lenis, para pausar a rolagem quando um modal (ex.: Lightbox) estiver aberto. */
    __lenis?: Lenis;
  }
}

/** Scroll suave com Lenis: só em desktop (pointer: fine) e sem prefers-reduced-motion. */
function SmoothScroll() {
  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;
    // Âncoras ficam com o <AncorasPrecisas />, que calcula a posição exata
    const lenis = new Lenis({ autoRaf: true, anchors: false, lerp: 0.1 });
    window.__lenis = lenis;
    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}

/**
 * Links internos (#secao): alinham o início da seção exatamente no topo da tela, sem mostrar
 * a faixa da seção anterior. Seções `.sobreposta` sobem 2,5rem sobre a anterior; essa sobra é descontada.
 * O padding superior das seções já deixa espaço para o header.
 */
function AncorasPrecisas() {
  useEffect(() => {
    function destino(id: string) {
      if (id === "topo") return 0;
      const el = document.getElementById(id);
      if (!el) return null;
      const sobreposicao = Math.max(0, -parseFloat(getComputedStyle(el).marginTop) || 0);
      return Math.max(0, el.getBoundingClientRect().top + window.scrollY + sobreposicao);
    }

    function irPara(id: string, suave: boolean) {
      const y = destino(id);
      if (y === null) return false;
      if (window.__lenis) window.__lenis.scrollTo(y, { immediate: !suave });
      else window.scrollTo({ top: y, behavior: suave ? "smooth" : "auto" });
      return true;
    }

    function aoClicar(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;
      if (irPara(id, !window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
        e.preventDefault();
        history.replaceState(null, "", `#${id}`);
      }
    }

    document.addEventListener("click", aoClicar);
    // Entrou pelo link já com #secao: corrige a posição depois do carregamento
    const inicial = window.location.hash.slice(1);
    const t = inicial ? window.setTimeout(() => irPara(inicial, false), 50) : 0;
    return () => {
      document.removeEventListener("click", aoClicar);
      window.clearTimeout(t);
    };
  }, []);
  return null;
}

/** Marca no <html> que o React iniciou. Sem essa marca, o CSS revela todo o conteúdo animado (ver globals.css). */
function MarcaHidratado() {
  useEffect(() => {
    document.documentElement.setAttribute("data-hidratado", "");
  }, []);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <MarcaHidratado />
        <SmoothScroll />
        <AncorasPrecisas />
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
