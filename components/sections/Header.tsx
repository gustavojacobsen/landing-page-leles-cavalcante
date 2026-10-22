"use client";

import { useEffect, useState } from "react";
import { m, useMotionValueEvent, useScroll } from "motion/react";
import { clinica, header } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scrollspy: id da seção que ocupa o meio da tela (ou null). */
function useSecaoAtiva(ids: string[]) {
  const [ativa, setAtiva] = useState<string | null>(null);
  const chave = ids.join("|");

  useEffect(() => {
    const secoes = chave
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setAtiva(e.target.id);
          else setAtiva((atual) => (atual === e.target.id ? null : atual));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, [chave]);

  return ativa;
}

/**
 * Header inteligente: transparente no topo; após 80px vira vidro e fica mais baixo;
 * some ao rolar para baixo e volta ao rolar para cima. Só anima transform e opacity.
 */
export function Header() {
  const { scrollY } = useScroll();
  const [rolado, setRolado] = useState(false);
  const [oculto, setOculto] = useState(false);
  const ativa = useSecaoAtiva(header.links.map((l) => l.href.slice(1)));

  useMotionValueEvent(scrollY, "change", (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setRolado(y > 80);
    setOculto(y > 240 && y > anterior);
  });

  return (
    <m.header
      animate={{ y: oculto ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 h-20"
    >
      {/* Camada de vidro: 64px de altura, aparece por opacidade */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-16 border-b border-bege-escuro/70 bg-branco/70 shadow-quente backdrop-blur-md transition-opacity duration-500 ease-premium ${rolado ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`container-site relative flex h-20 items-center justify-between gap-6 transition-transform duration-500 ease-premium ${rolado ? "-translate-y-2" : ""}`}
      >
        <a href="#topo" aria-label={`${clinica.nome}, voltar ao início`} className="shrink-0">
          <Logo
            className={`origin-left text-[0.95rem] transition-transform duration-500 ease-premium sm:text-lg md:text-xl ${rolado ? "scale-90" : ""}`}
          />
        </a>

        <nav aria-label="Seções da página" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.9375rem] font-medium text-tinta lg:gap-9">
            {header.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={ativa === l.href.slice(1) ? "true" : undefined}
                  className="group relative py-2 transition-colors hover:text-caramelo aria-[current]:text-marrom"
                >
                  {l.rotulo}
                  {/* Sublinhado: cresce no hover e fica fixo na seção visível */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-caramelo transition-transform duration-500 ease-premium group-hover:scale-x-100 group-aria-[current]:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button origem="header" tamanho="compacto">
          {header.cta}
        </Button>
      </div>
    </m.header>
  );
}
