"use client";

import { Children, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type EmblaOptionsType = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;
export type EmblaPluginType = NonNullable<Parameters<typeof useEmblaCarousel>[1]>[number];

type Props = {
  children: ReactNode;
  /** Rótulo acessível do carrossel. */
  rotulo: string;
  /** Largura de cada slide, ex.: "basis-full md:basis-1/2". */
  classeSlide?: string;
  opcoes?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  /** laterais: nas laterais no desktop e abaixo no mobile · abaixo: sempre abaixo · mobile: só no mobile, abaixo */
  setas?: "laterais" | "abaixo" | "mobile";
  className?: string;
};

export function SetaCarrossel({ direcao, onClick, rotulo }: { direcao: "anterior" | "proximo"; onClick: () => void; rotulo: string }) {
  const Icone = direcao === "anterior" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={rotulo}
      className="grid size-12 shrink-0 place-items-center rounded-full border border-marrom bg-branco/85 text-marrom backdrop-blur-sm transition-colors duration-300 hover:bg-marrom hover:text-branco"
    >
      <Icone aria-hidden className="size-5" strokeWidth={1.8} />
    </button>
  );
}

/**
 * Carrossel com Embla. Cada slide recebe `data-ativo` e a classe `group/slide`,
 * então o conteúdo pode reagir com `group-data-[ativo=true]/slide:*`.
 */
export function Carousel({
  children,
  rotulo,
  classeSlide = "basis-full",
  opcoes = { loop: true, align: "start" },
  plugins,
  setas = "laterais",
  className = "",
}: Props) {
  const [viewportRef, api] = useEmblaCarousel(opcoes, plugins);
  const [ativo, setAtivo] = useState(0);
  const slides = Children.toArray(children);

  useEffect(() => {
    if (!api) return;
    const aoSelecionar = () => setAtivo(api.selectedScrollSnap());
    api.on("select", aoSelecionar).on("reInit", aoSelecionar);
    return () => {
      api.off("select", aoSelecionar).off("reInit", aoSelecionar);
    };
  }, [api]);

  const anterior = <SetaCarrossel direcao="anterior" rotulo="Anterior" onClick={() => api?.scrollPrev()} />;
  const proximo = <SetaCarrossel direcao="proximo" rotulo="Próximo" onClick={() => api?.scrollNext()} />;

  const barraSetas = {
    laterais: "mt-8 flex justify-center gap-3 md:hidden",
    abaixo: "mt-6 flex justify-end gap-3",
    mobile: "mt-8 flex justify-center gap-3 md:hidden",
  }[setas];

  return (
    <div role="region" aria-roledescription="carrossel" aria-label={rotulo} className={`relative ${className}`}>
      <div ref={viewportRef} className="overflow-hidden">
        {/* backface-visibility + translateZ: cada slide vira uma camada própria, então o navegador só desloca
            a imagem já pintada durante o movimento (sem repintar em baixa qualidade, que deixa pixelado) */}
        <div className="-ml-4 flex touch-pan-y [backface-visibility:hidden] md:-ml-6">
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${slides.length}`}
              data-ativo={i === ativo}
              className={`group/slide min-w-0 shrink-0 grow-0 pl-4 [backface-visibility:hidden] [transform:translate3d(0,0,0)] md:pl-6 ${classeSlide}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {setas === "laterais" && (
        <>
          <div className="absolute top-1/2 -left-6 hidden -translate-y-1/2 md:block lg:-left-7">{anterior}</div>
          <div className="absolute top-1/2 -right-6 hidden -translate-y-1/2 md:block lg:-right-7">{proximo}</div>
        </>
      )}

      <div className={barraSetas}>
        {anterior}
        {proximo}
      </div>
    </div>
  );
}
