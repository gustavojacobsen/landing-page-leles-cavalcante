import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string };

/** Texto pequeno em caixa alta com traço fino à esquerda. A cor vem de `className` (padrão: tinta-suave). */
export function Eyebrow({ children, className = "text-tinta-suave" }: Props) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] md:text-[0.8125rem] ${className}`}>
      <span aria-hidden className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}
