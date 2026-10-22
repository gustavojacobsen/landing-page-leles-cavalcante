import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { hero } from "@/lib/content";
import { comDestaque } from "@/lib/texto";
import { Button, LinkWhatsApp } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Parallax } from "@/components/ui/Parallax";

const atraso = (ms: number) => ({ "--atraso": `${ms}ms` }) as CSSProperties;

/**
 * Server component. A entrada é em CSS puro (`entrada`), e o H1 e a foto nunca começam
 * invisíveis, para não atrasar o LCP. Ilhas client: Button e Parallax.
 */
export function Hero() {
  return (
    <section id="topo" aria-labelledby="hero-titulo" className="grain relative overflow-hidden bg-bege pt-28 pb-20 md:pt-36 lg:flex lg:min-h-svh lg:items-center lg:pt-32 lg:pb-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-16">
        <div className="relative z-10">
          <div className="entrada">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1 id="hero-titulo" className="titulo-h1 mt-6 text-marrom">
            {hero.titulo.map((linha, i) => (
              <span key={i} className="block">
                {comDestaque(linha, "text-marrom")}
              </span>
            ))}
          </h1>

          <p className="entrada mt-6 max-w-xl text-[1.0625rem] text-tinta-suave sm:text-lg md:text-xl" style={atraso(120)}>
            {hero.subtitulo}
          </p>

          <div
            className="entrada mt-9 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:gap-8 md:mt-10"
            style={atraso(220)}
          >
            <Button origem="hero" className="w-full sm:w-auto">{hero.cta}</Button>
            <a
              href="#especialidades"
              className="group inline-flex items-center justify-center gap-2 self-center font-semibold sm:self-auto text-marrom underline decoration-bege-escuro decoration-1 underline-offset-8 transition-colors hover:decoration-caramelo"
            >
              {hero.linkSecundario}
              <ArrowDown aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Celular e tablet: foto no arco. Desktop (lg+): foto sangrando por toda a metade direita, com degradê para o bege. */}
        <div className="relative mx-auto w-full max-w-md md:max-w-xl lg:static lg:max-w-none">
          <div className="relative h-[400px] w-full overflow-hidden bg-bege-escuro shadow-quente-lg max-lg:arco sm:h-[460px] md:h-[560px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[56%] lg:bg-transparent lg:shadow-none">
            <Parallax>
              <Image
                src="/images/hero-equipe.jpg"
                alt={hero.imagemAlt}
                fill
                preload
                fetchPriority="high"
                quality={90}
                // Foto 3:2 em "cover" numa área mais alta que larga: a largura renderizada
                // acompanha a ALTURA (≈ 1,5 × altura + margem do parallax), não a largura da coluna.
                sizes="(min-width: 1024px) 160vh, (min-width: 768px) 900px, 640px"
                className="object-cover object-[45%_center] lg:object-[66%_center]"
              />
            </Parallax>

            {/* Degradês (só desktop): esquerda funde com o texto, base com a faixa, topo dá leitura ao header */}
            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              <div className="absolute inset-y-0 left-0 w-[34%] bg-linear-to-r from-bege from-25% via-bege/60 via-55% to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-bege via-bege/40 to-transparent" />
              <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-bege/50 to-transparent" />
            </div>
          </div>

          {/* Card de vidro: também é um CTA de WhatsApp */}
          <div
            className="entrada absolute -bottom-6 left-4 z-10 md:left-8 lg:bottom-16 lg:left-[calc(50%+4rem)]"
            style={atraso(400)}
          >
            <LinkWhatsApp
              origem="hero"
              className="block rounded-2xl border border-branco/60 bg-branco/75 px-5 py-4 shadow-quente-lg backdrop-blur-md transition-[translate,background-color,box-shadow] duration-300 ease-premium hover:-translate-y-0.5 hover:bg-branco/90"
            >
              <span className="block font-display text-lg leading-snug text-marrom">{hero.cardVidro.titulo}</span>
              <span className="mt-1 block text-sm text-tinta-suave">{hero.cardVidro.texto}</span>
            </LinkWhatsApp>
          </div>
        </div>
      </div>
    </section>
  );
}
