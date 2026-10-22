import { clinica, mensagensWhatsApp, type OrigemCTA } from "./content";

/** Link do WhatsApp com mensagem específica para cada origem de clique. */
export function waLink(origem: OrigemCTA): string {
  const numero = clinica.whatsappDigitos.replace(/\D/g, "");
  const texto = encodeURIComponent(mensagensWhatsApp[origem]);
  // Sem número configurado, o wa.me abre a escolha de contato com a mensagem pronta.
  return numero ? `https://wa.me/55${numero}?text=${texto}` : `https://wa.me/?text=${texto}`;
}
