import { Fragment, type ReactNode } from "react";

export type Trecho = { texto: string; destaque: boolean };

/** Divide "Seu sorriso *mais natural* começa" em trechos normais e destacados. */
export function trechos(texto: string): Trecho[] {
  return texto
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((t) => (t.startsWith("*") ? { texto: t.slice(1, -1), destaque: true } : { texto: t, destaque: false }));
}

/** Texto sem os asteriscos (para aria-label, metadata e JSON-LD). */
export function textoPuro(texto: string): string {
  return texto.replace(/\*/g, "");
}

/** Renderiza o texto com a palavra-chave em itálico na cor indicada. */
export function comDestaque(texto: string, classeDestaque = "text-caramelo"): ReactNode {
  return trechos(texto).map((t, i) =>
    t.destaque ? (
      <em key={i} className={`italic ${classeDestaque}`}>
        {t.texto}
      </em>
    ) : (
      <Fragment key={i}>{t.texto}</Fragment>
    ),
  );
}
