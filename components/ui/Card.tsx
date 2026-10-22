"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Use "bege" em seções brancas e "branco" em seções bege. */
  fundo?: "branco" | "bege";
  borda?: "caramelo" | "terracota";
  className?: string;
};

const fundos = { branco: "bg-branco", bege: "bg-bege" };
const bordas = { caramelo: "border-b-caramelo", terracota: "border-b-terracota" };

/** Card com borda inferior de 3px, sombra quente e spotlight que segue o cursor no desktop. */
export function Card({ children, fundo = "branco", borda = "caramelo", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function aoMover(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={aoMover}
      className={`spotlight relative rounded-3xl border border-bege-escuro border-b-[3px] shadow-quente transition-[translate,box-shadow] duration-500 ease-premium pointer-fine:hover:-translate-y-1 pointer-fine:hover:shadow-quente-lg ${fundos[fundo]} ${bordas[borda]} ${className}`}
    >
      {children}
    </div>
  );
}
