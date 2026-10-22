"use client";

import type { MouseEvent, PointerEvent, ReactNode } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { CalendarCheck } from "lucide-react";
import type { OrigemCTA } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import { trackLead } from "@/lib/tracking";
import { useEfeitosDesktop } from "@/lib/hooks";
import { WhatsAppIcon } from "./Icones";

type Props = {
  children: ReactNode;
  /** Quando informado, o botão vira CTA de WhatsApp com mensagem e tracking dessa origem. */
  origem?: OrigemCTA;
  href?: string;
  variante?: "primario" | "secundario" | "claro";
  tamanho?: "normal" | "compacto";
  icone?: "whatsapp" | "calendario" | "nenhum";
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const ALCANCE_MAGNETICO = 6; // px

const base =
  "shine inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-[0.01em] " +
  "transition-[translate,background-color,color,box-shadow] duration-300 ease-premium";

const variantes = {
  primario: "bg-marrom text-branco shadow-quente hover:bg-marrom-escuro hover:-translate-y-0.5 hover:shadow-quente-lg",
  secundario: "border border-marrom text-marrom hover:bg-marrom hover:text-branco",
  // Para fundo marrom (rodapé)
  claro: "bg-branco text-marrom shadow-quente hover:bg-bege hover:-translate-y-0.5",
};

const tamanhos = {
  normal: "px-7 py-4 text-[0.95rem]",
  compacto: "px-4 py-2.5 text-sm",
};

export function Button({
  children,
  origem,
  href,
  variante = "primario",
  tamanho = "normal",
  icone = origem ? "whatsapp" : "nenhum",
  className = "",
  onClick,
}: Props) {
  const magnetico = useEfeitosDesktop();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  function aoMover(e: PointerEvent<HTMLAnchorElement>) {
    if (!magnetico) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2 * ALCANCE_MAGNETICO);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2 * ALCANCE_MAGNETICO);
  }

  function aoSair() {
    mx.set(0);
    my.set(0);
  }

  const externo = Boolean(origem);
  const Icone =
    icone === "whatsapp" ? (
      <WhatsAppIcon className={tamanho === "compacto" ? "size-4" : "size-5"} />
    ) : icone === "calendario" ? (
      <CalendarCheck aria-hidden className={tamanho === "compacto" ? "size-4" : "size-5"} strokeWidth={1.8} />
    ) : null;

  return (
    <m.a
      href={origem ? waLink(origem) : href}
      target={externo ? "_blank" : undefined}
      rel={externo ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (origem) trackLead(origem);
        onClick?.(e);
      }}
      onPointerMove={aoMover}
      onPointerLeave={aoSair}
      style={magnetico ? { x, y } : undefined}
      className={`${base} ${variantes[variante]} ${tamanhos[tamanho]} ${className}`}
    >
      {Icone}
      <span>{children}</span>
      {externo && <span className="sr-only"> (abre o WhatsApp em nova aba)</span>}
    </m.a>
  );
}

/** Link de texto para o WhatsApp, com tracking da origem. */
export function LinkWhatsApp({ origem, children, className = "" }: { origem: OrigemCTA; children: ReactNode; className?: string }) {
  return (
    <a href={waLink(origem)} target="_blank" rel="noopener noreferrer" onClick={() => trackLead(origem)} className={className}>
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
    </a>
  );
}
