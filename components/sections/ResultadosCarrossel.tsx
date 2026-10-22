"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { profissionais, resultados } from "@/lib/content";
import { Carousel, type EmblaOptionsType } from "@/components/ui/Carousel";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Lightbox } from "@/components/ui/Lightbox";

// No modo slider, arrastar a alça não pode arrastar o carrossel junto.
const opcoesSlider: EmblaOptionsType = {
  loop: true,
  align: "start",
  watchDrag: (_api, evento) => !(evento.target as Element).closest("[data-slider-antes-depois]"),
};

type Filtro = (typeof resultados.filtros)[number]["id"];
type Caso = (typeof resultados.casos)[number];

const nomeDe = { viviane: profissionais.dra.nome, andre: profissionais.dr.nome };

/**
 * Um paciente em formato editorial: foto grande (quadrada, padronizada) à esquerda e painel à direita
 * com número do caso, procedimento, profissional e miniaturas dos ângulos. No celular, empilha.
 * Clicar na foto abre todos os ângulos daquele paciente em tela cheia.
 */
function CardCaso({
  caso,
  numero,
  total,
  onAmpliar,
}: {
  caso: Caso;
  numero: number;
  total: number;
  onAmpliar: (foto: number) => void;
}) {
  const [vista, setVista] = useState(0);
  const foto = caso.fotos[vista];
  const varias = caso.fotos.length > 1;
  const dois = (n: number) => String(n).padStart(2, "0");

  return (
    <article className="grid overflow-hidden rounded-[2rem] border border-bege-escuro bg-branco shadow-quente md:grid-cols-[1.35fr_1fr]">
      {/* Foto */}
      <button
        type="button"
        onClick={() => onAmpliar(vista)}
        aria-label={`${resultados.ampliar}: ${foto.alt}`}
        className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-bege"
      >
        {caso.fotos.map((f, i) => (
          // Todas as vistas ficam montadas: a troca é instantânea, com um fade suave
          <Image
            key={f.src}
            src={f.src}
            alt={i === vista ? f.alt : ""}
            aria-hidden={i !== vista}
            fill
            quality={90}
            sizes="(min-width: 1024px) 600px, (min-width: 768px) 55vw, 100vw"
            loading="eager"
            className={`object-cover transition-opacity duration-500 ease-premium ${
              i === vista ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span
          aria-hidden
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-branco/90 py-2 pr-4 pl-3 text-xs font-semibold text-marrom shadow-quente backdrop-blur-sm transition-transform duration-300 ease-premium group-hover:scale-105"
        >
          <Maximize2 className="size-3.5" strokeWidth={2} />
          Ampliar
        </span>
      </button>

      {/* Painel */}
      <div className="flex flex-col p-6 md:p-8 lg:p-10">
        <p className="text-xs font-semibold tracking-[0.22em] text-caramelo uppercase">
          Caso {dois(numero)} <span className="text-tinta-suave/60">/ {dois(total)}</span>
        </p>
        <h3 className="mt-3 font-display text-[1.75rem] leading-tight md:text-[2rem]">{caso.procedimento}</h3>
        <p className="mt-1.5 text-sm text-tinta-suave">com {nomeDe[caso.de]}</p>

        <div aria-hidden className="mt-6 flex items-center gap-3">
          <span className="h-px w-10 bg-caramelo" />
          <span className="size-1.5 rotate-45 bg-caramelo" />
        </div>

        {varias ? (
          <>
            <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-tinta-suave uppercase">Ângulos</p>
            <div role="group" aria-label="Escolher o ângulo da foto" className="mt-3 grid grid-cols-3 gap-2.5">
              {caso.fotos.map((f, i) => {
                const ativo = i === vista;
                return (
                  <button
                    key={f.src}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => setVista(i)}
                    className="group/mini text-left"
                  >
                    <span
                      className={`relative block aspect-square overflow-hidden rounded-xl ring-offset-2 ring-offset-branco transition-all duration-300 ${
                        ativo ? "ring-2 ring-marrom" : "opacity-70 ring-1 ring-bege-escuro group-hover/mini:opacity-100"
                      }`}
                    >
                      <Image src={f.src} alt="" fill sizes="120px" className="object-cover" />
                    </span>
                    <span
                      className={`mt-2 block text-center text-xs font-semibold whitespace-nowrap ${ativo ? "text-marrom" : "text-tinta-suave"}`}
                    >
                      {f.rotulo}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p className="mt-6 text-sm text-tinta">{foto.rotulo}</p>
        )}

      </div>
    </article>
  );
}

export function ResultadosCarrossel({ modo }: { modo: "pares" | "slider" }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [aberto, setAberto] = useState<{ caso: number; foto: number } | null>(null);
  const fechar = useCallback(() => setAberto(null), []);
  const mudarFoto = useCallback((foto: number) => setAberto((a) => (a ? { ...a, foto } : a)), []);

  if (modo === "slider") {
    return (
      <Carousel rotulo="Antes e depois" classeSlide="basis-full md:basis-1/2" opcoes={opcoesSlider}>
        {resultados.sliders.map((s) => (
          <BeforeAfterSlider key={s.antes} antes={s.antes} depois={s.depois} alt={s.alt} />
        ))}
      </Carousel>
    );
  }

  const casos = resultados.casos.filter((c) => filtro === "todos" || c.de === filtro);
  // Só mostra o filtro de quem tem casos; com casos de um profissional só, o filtro some.
  const filtros = resultados.filtros.filter((f) => f.id === "todos" || resultados.casos.some((c) => c.de === f.id));
  const mostrarFiltro = filtros.length > 2;
  const casoAberto = aberto ? casos[aberto.caso] : null;

  return (
    <>
      {/* Filtro por profissional */}
      {mostrarFiltro && (
        <div
          role="group"
          aria-label="Filtrar resultados por profissional"
          className="sem-barra -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 md:mb-10"
        >
          {filtros.map((f) => {
            const ativo = filtro === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => setFiltro(f.id)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 sm:px-5 ${
                  ativo ? "border-marrom bg-marrom text-branco" : "border-bege-escuro bg-branco text-tinta-suave hover:border-marrom hover:text-marrom"
                }`}
              >
                {f.rotulo}
              </button>
            );
          })}
        </div>
      )}

      {/* Um caso por vez, centralizado. key = filtro: recria o carrossel com os slides certos a cada troca */}
      <Carousel key={filtro} rotulo="Antes e depois" classeSlide="basis-full" className="mx-auto max-w-5xl">
        {casos.map((c, i) => (
          <CardCaso key={c.fotos[0].src} caso={c} numero={i + 1} total={casos.length} onAmpliar={(foto) => setAberto({ caso: i, foto })} />
        ))}
      </Carousel>

      <Lightbox
        itens={(casoAberto?.fotos ?? []).map((f) => ({
          src: f.src,
          alt: f.alt,
          legenda: casoAberto ? `${casoAberto.procedimento} · ${nomeDe[casoAberto.de]} · ${f.rotulo}` : f.rotulo,
        }))}
        indice={aberto?.foto ?? null}
        onFechar={fechar}
        onMudar={mudarFoto}
      />
    </>
  );
}
