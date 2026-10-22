import { site } from "./content";

const host = new URL(site.url).host;
const hostEscapado = host.replace(/\./g, "\\u002e");

/**
 * Serializa JSON-LD para um <script type="application/ld+json">.
 *
 * - `<` vira `<` (evita fechar o <script> por engano).
 * - Os pontos do domínio viram `.`. O valor lido pelo Google é idêntico, mas o texto literal
 *   do domínio deixa de existir na página. Motivo: no endereço temporário, a Hostinger troca o domínio
 *   por outro dentro do HTML; esse texto também vai no payload do React com o tamanho em bytes anotado,
 *   e a troca desalinha o payload (React error #412), impedindo a página de iniciar.
 */
export function jsonLd(dados: unknown): string {
  return JSON.stringify(dados).replace(/</g, "\\u003c").split(host).join(hostEscapado);
}
