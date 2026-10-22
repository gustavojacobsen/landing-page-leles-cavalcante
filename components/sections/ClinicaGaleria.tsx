"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { sobre } from "@/lib/content";
import { Lightbox } from "@/components/ui/Lightbox";

// Mosaico (bento): 4 colunas no desktop, 2 no celular. A ordem segue `sobre.fotos`.
const blocos = ["col-span-2 row-span-2", "col-span-2", "row-span-2", "row-span-2", "", ""];

/** Galeria da clínica em mosaico; clicar em qualquer foto abre o visualizador em tela cheia. */
export function ClinicaGaleria() {
  const [aberto, setAberto] = useState<number | null>(null);
  const fechar = useCallback(() => setAberto(null), []);

  return (
    <>
      <ul className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]">
        {sobre.fotos.map((f, i) => (
          <li key={f.src} className={blocos[i] ?? ""}>
            <button
              type="button"
              onClick={() => setAberto(i)}
              aria-label={`Ampliar foto: ${f.rotulo}`}
              className="group relative block size-full cursor-zoom-in overflow-hidden rounded-3xl bg-bege-escuro shadow-quente"
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes={blocos[i]?.includes("col-span-2") ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                quality={90}
                style={{ objectPosition: f.posicao }}
                className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
              />
              {/* Rótulo: sempre visível no celular; no desktop aparece no hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-marrom-escuro/75 to-transparent p-4 pt-10 text-left transition-opacity duration-500 ease-premium md:p-5 md:pt-14 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-focus-visible:opacity-100"
              >
                <span className="text-sm font-semibold text-branco md:text-base">{f.rotulo}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-branco/85 text-marrom">
                  <Maximize2 className="size-4" strokeWidth={1.8} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        itens={sobre.fotos.map((f) => ({ src: f.src, alt: f.alt, legenda: f.rotulo }))}
        indice={aberto}
        onFechar={fechar}
        onMudar={setAberto}
      />
    </>
  );
}
