"use client";

import type { ReactNode } from "react";
import { m, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const item = (atraso = 0): Variants => ({
  oculto: { opacity: 0, y: 16 },
  visivel: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: atraso } },
});

const grupo = (atraso = 0): Variants => ({
  oculto: {},
  visivel: { transition: { staggerChildren: 0.08, delayChildren: atraso } },
});

type Props = {
  children: ReactNode;
  className?: string;
  /** Com `stagger`, os filhos diretos devem ser <RevealItem> e entram com 80ms de diferença. */
  stagger?: boolean;
  atraso?: number;
};

/** Fade + translateY(16px) ao entrar na tela, uma única vez. */
export function Reveal({ children, className, stagger = false, atraso = 0 }: Props) {
  return (
    <m.div
      data-reveal={stagger ? undefined : true}
      className={className}
      variants={stagger ? grupo(atraso) : item(atraso)}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </m.div>
  );
}

const variantesItem = item();

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.div data-reveal variants={variantesItem} className={className}>
      {children}
    </m.div>
  );
}
