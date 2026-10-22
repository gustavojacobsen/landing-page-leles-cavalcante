"use client";

import { useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { BadgeCheck, Star } from "lucide-react";
import { Carousel } from "@/components/ui/Carousel";
import { GoogleLogo } from "@/components/ui/Icones";

type Depoimento = { nome: string; texto: string };

const CORES_AVATAR = ["bg-terra-1", "bg-terra-2", "bg-terra-3", "bg-terra-4", "bg-terra-5", "bg-terra-6"];

function inicial(nome: string) {
  return nome.match(/\p{L}/u)?.[0]?.toUpperCase() ?? "?";
}

/** Cor derivada da letra, sempre dentro da paleta terrosa. */
function corDoAvatar(letra: string) {
  return CORES_AVATAR[letra.charCodeAt(0) % CORES_AVATAR.length];
}

function CardDepoimento({ nome, texto, link }: Depoimento & { link: string }) {
  const letra = inicial(nome);
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Avaliação de ${nome} no Google (abre em nova aba)`}
      className="group flex h-full flex-col rounded-3xl border border-bege-escuro border-b-[3px] border-b-caramelo bg-bege p-7 shadow-quente transition-[translate,box-shadow] duration-300 ease-premium hover:-translate-y-1 hover:shadow-quente-lg md:p-8"
    >
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span aria-hidden className={`grid size-12 place-items-center rounded-full text-lg font-bold text-branco ${corDoAvatar(letra)}`}>
            {letra}
          </span>
          <div>
            <p className="font-bold text-marrom">{nome}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="flex" role="img" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden className="size-4 fill-estrela text-estrela" strokeWidth={1} />
                ))}
              </span>
              <BadgeCheck aria-label="Avaliação verificada" className="size-4 fill-verificado text-branco" strokeWidth={2} />
            </div>
          </div>
        </div>
        <GoogleLogo className="size-6 shrink-0" />
      </header>
      <p className="mt-5 text-tinta">{texto}</p>
    </a>
  );
}

/**
 * Desktop: faixa em rolagem contínua que pausa no hover e no foco.
 * Mobile: swipe com 1 card e setas. Com movimento reduzido, não rola sozinha.
 */
export function DepoimentosCarrossel({ itens, link }: { itens: Depoimento[]; link: string }) {
  const [plugins] = useState(() => [
    AutoScroll({
      active: false,
      speed: 0.6,
      startDelay: 600,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
      breakpoints: {
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)": { active: true },
      },
    }),
  ]);

  return (
    <div className="container-site md:max-w-none md:px-0">
      <Carousel
        rotulo="Avaliações de pacientes no Google"
        classeSlide="basis-full md:basis-[26rem]"
        opcoes={{ loop: true, align: "start", dragFree: true, breakpoints: { "(max-width: 767px)": { dragFree: false } } }}
        plugins={plugins}
        setas="mobile"
      >
        {itens.map((d, i) => (
          <CardDepoimento key={i} {...d} link={link} />
        ))}
      </Carousel>
    </div>
  );
}
