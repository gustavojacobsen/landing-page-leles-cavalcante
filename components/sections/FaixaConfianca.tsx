import { faixaConfianca } from "@/lib/content";
import { Marquee } from "@/components/ui/Marquee";

/** Faixa em marrom com os diferenciais em loop. O padding inferior extra fica sob os cantos arredondados de Resultados. */
export function FaixaConfianca() {
  return (
    <section aria-label="Diferenciais da clínica" className="bg-marrom pt-5 pb-15 text-sm font-medium tracking-wide text-bege md:text-base">
      <Marquee itens={faixaConfianca} />
    </section>
  );
}
