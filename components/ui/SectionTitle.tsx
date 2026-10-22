"use client";

import { m, type Variants } from "motion/react";
import { trechos, textoPuro } from "@/lib/texto";

type Props = {
  /** Aceita *asteriscos* na palavra-chave (fica em itálico). */
  texto: string;
  className?: string;
  /** Cor do destaque (padrão: mesma cor do título, caramelo-escuro; a palavra-chave se diferencia só pelo itálico). */
  classeDestaque?: string;
  id?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.06 } },
};

const palavra: Variants = {
  oculto: { y: "110%" },
  visivel: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

/** H2 com revelação palavra por palavra, cada palavra subindo de dentro de uma máscara. */
export function SectionTitle({ texto, className = "", classeDestaque = "text-caramelo-escuro", id }: Props) {
  // Quebra em palavras preservando onde havia espaço (pontuação colada ao destaque não ganha espaço).
  const palavras: { p: string; destaque: boolean; espaco: boolean }[] = [];
  let espacoPendente = false;
  for (const t of trechos(texto)) {
    for (const parte of t.texto.split(/(\s+)/)) {
      if (!parte) continue;
      if (/^\s+$/.test(parte)) {
        espacoPendente = true;
        continue;
      }
      palavras.push({ p: parte, destaque: t.destaque, espaco: palavras.length > 0 && espacoPendente });
      espacoPendente = false;
    }
  }

  return (
    <m.h2
      id={id}
      aria-label={textoPuro(texto)}
      className={`titulo-h2 text-balance text-caramelo-escuro ${className}`}
      variants={container}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {palavras.map(({ p, destaque, espaco }, i) => (
        <span key={i} aria-hidden="true">
          {espaco ? " " : null}
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <m.span
              data-reveal
              variants={palavra}
              className={`inline-block ${destaque ? `italic pr-[0.06em] ${classeDestaque}` : ""}`}
            >
              {p}
            </m.span>
          </span>
        </span>
      ))}
    </m.h2>
  );
}
