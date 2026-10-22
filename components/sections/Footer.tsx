import type { ReactNode } from "react";
import { ArrowUp, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { clinica, enderecoCompleto, header, mapa, rodape } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { LinkWhatsApp } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icones";
import { Reveal } from "@/components/ui/Reveal";
import { StatusFuncionamento } from "@/components/ui/StatusFuncionamento";

const sublinhado = "underline decoration-areia/40 underline-offset-4 transition-colors hover:decoration-areia";

/** Linha de informação: ícone em círculo + rótulo em caixa alta + conteúdo. */
function Bloco({ icone, titulo, children }: { icone: ReactNode; titulo: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 py-6 first:pt-0 last:pb-0">
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-areia/25 bg-branco/[0.04] text-areia">
        {icone}
      </span>
      <div className="min-w-0">
        <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-areia uppercase">{titulo}</p>
        <div className="mt-2 text-bege">{children}</div>
      </div>
    </div>
  );
}

/** Divisor ornamental: linha · losango · linha. */
function Ornamento() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-linear-to-r from-transparent to-areia/60" />
      <span className="size-1.5 rotate-45 bg-areia" />
      <span className="h-px w-16 bg-linear-to-l from-transparent to-areia/60" />
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contato" className="sobreposta relative overflow-hidden bg-marrom pt-20 text-bege md:pt-28">
      {/* Brilho suave no topo, para dar profundidade ao marrom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(55%_60%_at_50%_0%,color-mix(in_srgb,var(--color-areia)_14%,transparent),transparent)]"
      />

      {/* Abertura: logo + ornamento */}
      <div className="container-site relative flex flex-col items-center text-center">
        <Logo variante="claro" className="text-2xl md:text-[1.75rem]" />
        <div className="mt-7">
          <Ornamento />
        </div>
      </div>

      {/* Informações + mapa */}
      <div className="container-site relative mt-14 grid gap-12 md:mt-20 lg:grid-cols-[5fr_6fr] lg:gap-16">
        <Reveal>
          <div className="divide-y divide-areia/15">
            <Bloco icone={<MapPin aria-hidden className="size-5" strokeWidth={1.6} />} titulo="Endereço">
              <address className="not-italic leading-relaxed">{enderecoCompleto}</address>
            </Bloco>

            <Bloco icone={<Phone aria-hidden className="size-5" strokeWidth={1.6} />} titulo="Contato">
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-sm text-bege/70">Telefone</span>
                  <span>{clinica.telefoneExibicao}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-sm text-bege/70">WhatsApp</span>
                  <LinkWhatsApp origem="rodape" className={sublinhado}>
                    {clinica.whatsappExibicao}
                  </LinkWhatsApp>
                </li>
              </ul>
            </Bloco>

            <Bloco icone={<Clock aria-hidden className="size-5" strokeWidth={1.6} />} titulo="Horário">
              <ul className="space-y-1.5">
                {clinica.horarios.map((h) => (
                  <li key={h.rotulo} className="flex flex-wrap gap-x-3">
                    <span className="text-bege/70">{h.rotulo}</span>
                    <span>{h.texto}</span>
                  </li>
                ))}
              </ul>
              <StatusFuncionamento className="mt-4" />
            </Bloco>
          </div>
        </Reveal>

        {/* Cartão do mapa: mapa vivo + faixa com a clínica e o botão de rota */}
        <Reveal atraso={0.1}>
          <figure className="m-0 overflow-hidden rounded-[1.75rem] border border-areia/25 bg-marrom-escuro shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
            {/* O cartão de informações do Google fica no topo do mapa: o iframe é mais alto que a moldura
                e sobe 190px, então esse cartão fica fora da área visível (a atribuição do Google, embaixo, continua visível). */}
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-[22rem]">
              <iframe
                src={mapa.embed}
                title={`Mapa com a localização da ${clinica.nome}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-x-0 -top-[190px] block h-[calc(100%+190px)] w-full border-0 [filter:saturate(0.9)_sepia(0.08)]"
                allowFullScreen
              />
              {/* Moldura interna fina (não bloqueia cliques no mapa) */}
              <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-areia/20 ring-inset" />
            </div>
            <figcaption className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
              <div className="flex items-center gap-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-areia text-marrom">
                  <MapPin aria-hidden className="size-[1.1rem]" strokeWidth={2} />
                </span>
                <span className="leading-tight">
                  <span className="block font-display text-lg text-branco">{clinica.nome}</span>
                  <span className="mt-0.5 block text-xs tracking-wide text-bege/80">
                    {clinica.endereco.predio} · {clinica.endereco.complemento} · {clinica.cidade}
                  </span>
                </span>
              </div>
              <a
                href={mapa.rotas}
                target="_blank"
                rel="noopener noreferrer"
                className="shine inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-areia px-5 py-2.5 text-sm font-semibold text-marrom transition-colors duration-300 hover:bg-branco"
              >
                Como chegar
                <span className="sr-only"> (abre o Google Maps em nova aba)</span>
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Navegação rápida + redes + voltar ao topo */}
      <div className="container-site relative mt-16 md:mt-20">
        <div className="flex flex-col items-center gap-6 border-t border-areia/15 pt-8 md:flex-row md:justify-between">
          <nav aria-label="Links do rodapé">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm">
              {header.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-bege/80 transition-colors hover:text-areia">
                    {l.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {clinica.instagram && (
              <a
                href={`https://instagram.com/${clinica.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram @${clinica.instagram} (abre em nova aba)`}
                className="grid size-11 place-items-center rounded-full border border-areia/40 text-areia transition-colors duration-300 hover:bg-areia hover:text-marrom"
              >
                <InstagramIcon className="size-5" />
              </a>
            )}
            <LinkWhatsApp
              origem="rodape"
              className="grid size-11 place-items-center rounded-full border border-areia/40 text-areia transition-colors duration-300 hover:bg-areia hover:text-marrom"
            >
              <WhatsAppIcon className="size-5" />
            </LinkWhatsApp>
            <a
              href="#topo"
              className="group inline-flex items-center gap-2 rounded-full border border-areia/40 py-2.5 pr-4 pl-3 text-sm font-semibold text-areia transition-colors duration-300 hover:bg-areia hover:text-marrom"
            >
              <ArrowUp aria-hidden className="size-4 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5" strokeWidth={2} />
              Voltar ao topo
            </a>
          </div>
        </div>
      </div>

      {/* Barra legal */}
      <div className="relative mt-16 bg-marrom-escuro/60 md:mt-20">
        <div className="container-site flex flex-col items-center gap-2 pt-6 pb-24 text-center text-xs text-bege/75 md:flex-row md:justify-between md:pb-6 md:text-left">
          <p>
            © {rodape.ano} {clinica.nome}
          </p>
          <a href={rodape.politicaPrivacidadeUrl} className={sublinhado}>
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
