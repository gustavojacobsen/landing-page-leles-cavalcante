import { depoimentos } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { DepoimentosCarrossel } from "./DepoimentosCarrossel";

/** Só é renderizada no build de produção quando `depoimentosReais` for true (ver app/page.tsx). */
export function Depoimentos({ rascunho = false }: { rascunho?: boolean }) {
  return (
    <section aria-labelledby="depoimentos-titulo" className="sobreposta secao bg-branco">
      <div className="container-site">
        {rascunho && (
          <p className="mx-auto mb-10 w-fit rounded-full border border-dashed border-terracota px-4 py-1.5 text-xs font-semibold text-terracota uppercase tracking-wider">
            Em desenvolvimento: depoimentos placeholder, não aparece em produção
          </p>
        )}
        <div className="flex flex-col items-center text-center">
          <Eyebrow>{depoimentos.eyebrow}</Eyebrow>
          <SectionTitle id="depoimentos-titulo" texto={depoimentos.titulo} className="mt-5" />
        </div>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <DepoimentosCarrossel itens={depoimentos.itens} link={depoimentos.linkGoogle} />
      </Reveal>
    </section>
  );
}
