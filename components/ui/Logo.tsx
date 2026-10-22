import { clinica } from "@/lib/content";

type Props = {
  /** escuro: para fundos claros (header) · claro: para o rodapé marrom */
  variante?: "escuro" | "claro";
  className?: string;
};

// Dourado em degradê vertical, imitando o metal escovado do letreiro da clínica
const douradoEscuro = "bg-linear-to-b from-ouro via-ouro-escuro to-ouro-profundo";
const douradoClaro = "bg-linear-to-b from-ouro-luz via-ouro-claro to-ouro";

/**
 * Logo tipográfico no mesmo desenho do letreiro da parede:
 * serifada clássica (Cinzel) em caixa alta, nome em cima e "ODONTOLOGIA" espaçada embaixo.
 * Quando a clínica enviar o logo oficial em vetor, basta trocar este componente por <Image src="/images/logo.svg" />.
 */
export function Logo({ variante = "escuro", className = "" }: Props) {
  const palavras = clinica.nome.toUpperCase().split(" ");
  const linha2 = palavras.pop();
  const linha1 = palavras.join(" ");
  const dourado = variante === "claro" ? douradoClaro : douradoEscuro;
  const relevo = variante === "claro" ? "" : "drop-shadow-[0_1px_0_var(--color-branco)]";

  return (
    <span role="img" aria-label={clinica.nome} className={`inline-flex flex-col items-center font-logo leading-none ${relevo} ${className}`}>
      <span aria-hidden className={`${dourado} bg-clip-text text-[1.0625em] font-semibold tracking-[0.05em] text-transparent`}>
        {linha1}
      </span>
      <span
        aria-hidden
        className={`${dourado} mt-[0.32em] -mr-[0.46em] bg-clip-text text-[0.64em] font-semibold tracking-[0.46em] text-transparent`}
      >
        {linha2}
      </span>
    </span>
  );
}
