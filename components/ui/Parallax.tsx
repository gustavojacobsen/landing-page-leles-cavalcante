"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { useEfeitosDesktop } from "@/lib/hooks";

type Props = { children: ReactNode; className?: string; deslocamento?: number };

/**
 * Parallax suave (máx. 40px de deslocamento total), só no desktop.
 * O filho é ampliado levemente para nunca mostrar bordas vazias.
 */
export function Parallax({ children, className = "", deslocamento = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const ativo = useEfeitosDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-deslocamento / 2, deslocamento / 2]);

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <m.div style={ativo ? { y } : undefined} className={`absolute inset-x-0 ${ativo ? "-inset-y-6" : "inset-y-0"}`}>
        {children}
      </m.div>
    </div>
  );
}
