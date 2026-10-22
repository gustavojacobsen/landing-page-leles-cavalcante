"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";

type Item = { pergunta: string; resposta: string };

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accordion acessível com apenas um item aberto por vez. */
export function Accordion({ itens }: { itens: Item[] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="space-y-3">
      {itens.map((item, i) => {
        const estaAberto = aberto === i;
        const idBotao = `${base}-botao-${i}`;
        const idPainel = `${base}-painel-${i}`;
        return (
          <div key={item.pergunta} className="rounded-2xl border border-bege-escuro bg-branco">
            <h3 className="font-sans text-base font-semibold tracking-normal text-marrom md:text-lg">
              <button
                id={idBotao}
                type="button"
                aria-expanded={estaAberto}
                aria-controls={idPainel}
                onClick={() => setAberto(estaAberto ? null : i)}
                className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left md:px-8 md:py-6"
              >
                <span>{item.pergunta}</span>
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full border border-bege-escuro text-caramelo transition-transform duration-500 ease-premium ${estaAberto ? "rotate-45" : ""}`}
                >
                  <Plus className="size-4" strokeWidth={2} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {estaAberto && (
                <m.div
                  id={idPainel}
                  role="region"
                  aria-labelledby={idBotao}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-tinta-suave md:px-8 md:pb-7">{item.resposta}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
