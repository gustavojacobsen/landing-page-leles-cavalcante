import { BadgeCheck } from "lucide-react";
import { clinica, resultados } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ResultadosCarrossel } from "./ResultadosCarrossel";

export function Resultados() {
  return (
    <section id="resultados" aria-labelledby="resultados-titulo" className="sobreposta secao bg-branco">
      <div className="container-site">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>{resultados.eyebrow}</Eyebrow>
          <SectionTitle id="resultados-titulo" texto={resultados.titulo} className="mt-5 max-w-2xl" />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-bege-escuro bg-bege px-4 py-2 text-sm text-tinta-suave">
            <BadgeCheck aria-hidden className="size-4 text-caramelo" strokeWidth={1.8} />
            {resultados.badge}
          </p>
        </div>

        <Reveal className="mt-12 md:mt-16 md:px-4">
          <ResultadosCarrossel modo={clinica.modoAntesDepois} />
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-8 text-center md:mt-14">
          <p className="text-sm text-tinta-suave">{resultados.aviso}</p>
          <Button origem="resultados">{resultados.cta}</Button>
        </div>
      </div>
    </section>
  );
}
