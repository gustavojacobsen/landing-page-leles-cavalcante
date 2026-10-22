"use client";

import { m, type Variants } from "motion/react";
import { CircleCheck, CircleX, SquareCheck } from "lucide-react";

type Props = {
  itens: string[];
  tipo?: "check" | "x" | "checkbox";
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const lista: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const icone: Variants = {
  oculto: { opacity: 0, scale: 0.4 },
  visivel: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

const icones = {
  check: { Icone: CircleCheck, cor: "text-caramelo" },
  x: { Icone: CircleX, cor: "text-terracota" },
  checkbox: { Icone: SquareCheck, cor: "text-caramelo" },
};

/** Lista em que os ícones aparecem em sequência quando entra na tela. O texto fica sempre visível. */
export function CheckList({ itens, tipo = "check", className = "" }: Props) {
  const { Icone, cor } = icones[tipo];
  return (
    <m.ul
      className={`space-y-4 ${className}`}
      variants={lista}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {itens.map((texto) => (
        <li key={texto} className="flex items-start gap-3.5">
          <m.span data-reveal variants={icone} className={`mt-0.5 shrink-0 ${cor}`}>
            <Icone aria-hidden className="size-6" strokeWidth={1.7} />
          </m.span>
          <span>{texto}</span>
        </li>
      ))}
    </m.ul>
  );
}
