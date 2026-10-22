"use client";

import { m, useScroll } from "motion/react";

/** Barra de progresso de leitura: 2px em caramelo, fixa no topo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-caramelo"
    />
  );
}
