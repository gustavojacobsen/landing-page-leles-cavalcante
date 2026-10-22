"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  antes: string;
  depois: string;
  alt: string;
  sizes?: string;
};

const PASSO = 5;

/** Comparador antes/depois com alça arrastável (mouse, touch e teclado ← →). */
export function BeforeAfterSlider({ antes, depois, alt, sizes = "(min-width: 768px) 50vw, 100vw" }: Props) {
  const [pos, setPos] = useState(50);
  const areaRef = useRef<HTMLDivElement>(null);
  const arrastando = useRef(false);

  function moverPara(clientX: number) {
    const r = areaRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }

  function aoPressionar(e: PointerEvent<HTMLDivElement>) {
    arrastando.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    moverPara(e.clientX);
  }

  function aoTeclar(e: KeyboardEvent<HTMLDivElement>) {
    const mapa: Record<string, number> = {
      ArrowLeft: pos - PASSO,
      ArrowDown: pos - PASSO,
      ArrowRight: pos + PASSO,
      ArrowUp: pos + PASSO,
      Home: 0,
      End: 100,
    };
    if (!(e.key in mapa)) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, mapa[e.key])));
  }

  return (
    <figure className="m-0">
      <div
        ref={areaRef}
        data-slider-antes-depois
        onPointerDown={aoPressionar}
        onPointerMove={(e) => arrastando.current && moverPara(e.clientX)}
        onPointerUp={() => (arrastando.current = false)}
        onPointerCancel={() => (arrastando.current = false)}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-3xl bg-bege-escuro select-none"
      >
        <Image src={depois} alt={`${alt}: depois`} fill sizes={sizes} className="object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={antes} alt={`${alt}: antes`} fill sizes={sizes} className="object-cover" draggable={false} />
        </div>

        <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-marrom/80 px-3 py-1 text-xs font-semibold tracking-wide text-branco uppercase backdrop-blur-sm">
          Antes
        </span>
        <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-branco/85 px-3 py-1 text-xs font-semibold tracking-wide text-marrom uppercase backdrop-blur-sm">
          Depois
        </span>

        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-branco" style={{ left: `${pos}%` }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label={`Comparar antes e depois: ${alt}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% mostrando o antes`}
            aria-orientation="horizontal"
            onKeyDown={aoTeclar}
            className="pointer-events-auto absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-branco text-marrom shadow-quente-lg"
          >
            <span aria-hidden className="flex">
              <ChevronLeft className="-mr-1 size-4" strokeWidth={2} />
              <ChevronRight className="-ml-1 size-4" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
