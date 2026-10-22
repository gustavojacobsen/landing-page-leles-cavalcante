import type { ReactNode } from "react";
import { ArrowRight, ScanFace } from "lucide-react";
import { especialidades, secaoEspecialidades, type IdEspecialidade } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { ImplanteIcon, OrtodontiaIcon, PeriodontiaIcon } from "@/components/ui/Icones";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

const icones: Record<IdEspecialidade, ReactNode> = {
  implantodontia: <ImplanteIcon className="size-7" />,
  periodontia: <PeriodontiaIcon className="size-7" />,
  ortodontia: <OrtodontiaIcon className="size-7" />,
  "harmonizacao-facial": <ScanFace aria-hidden className="size-7" strokeWidth={1.6} />,
};

/** As áreas de atuação do casal, cada uma com o profissional responsável e o seu CTA de WhatsApp. */
export function Especialidades() {
  return (
    <section id="especialidades" aria-labelledby="especialidades-titulo" className="grain secao bg-bege">
      <div className="container-site">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>{secaoEspecialidades.eyebrow}</Eyebrow>
          <SectionTitle id="especialidades-titulo" texto={secaoEspecialidades.titulo} className="mt-5" />
          <p className="mt-6 max-w-2xl text-tinta-suave">{secaoEspecialidades.subtitulo}</p>
        </div>

        {/* Celular: cards lado a lado, deslizando com o dedo (o próximo aparece na borda). Tablet+: grade. */}
        <Reveal
          stagger
          className="sem-barra -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-1 pb-5 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pt-0 md:pb-0 xl:grid-cols-4 xl:gap-5"
        >
          {especialidades.map((e) => (
            <RevealItem key={e.id} className="w-[84%] max-w-sm shrink-0 snap-start sm:w-[60%] md:w-auto md:max-w-none">
              <Card fundo="branco" borda="caramelo" className="flex h-full flex-col p-7 md:p-8 xl:p-7">
                <span className="grid size-14 place-items-center rounded-2xl bg-bege text-caramelo">{icones[e.id]}</span>

                <h3 className="mt-6 text-[1.75rem] leading-tight xl:text-[1.4rem]">{e.nome}</h3>
                <p className="mt-1.5 text-sm font-semibold text-tinta-suave">com {e.profissional.nome}</p>

                <p className="mt-4 text-tinta">{e.descricao}</p>

                <p className="mt-6 text-sm font-bold text-marrom">{secaoEspecialidades.rotuloIndicacoes}</p>
                <CheckList itens={e.indicacoes} tipo="check" className="mt-4 mb-8" />

                <div className="mt-auto">
                  <Button origem={e.id} variante="secundario" className="w-full xl:px-4 xl:text-sm">
                    {e.cta}
                  </Button>
                </div>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
        <p className="mt-1 flex items-center justify-center gap-2 text-xs font-semibold tracking-wide text-tinta-suave md:hidden">
          Deslize para ver as {especialidades.length} especialidades
          <ArrowRight aria-hidden className="size-3.5" strokeWidth={2} />
        </p>
      </div>
    </section>
  );
}
