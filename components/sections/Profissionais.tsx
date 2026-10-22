import Image from "next/image";
import { secaoProfissionais } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

const dourado = "bg-linear-to-b from-ouro-luz via-ouro-claro to-ouro bg-clip-text text-transparent";

/**
 * Apresentação editorial dos dois profissionais:
 * foto com moldura fina deslocada + assinatura dourada (como o letreiro dos consultórios),
 * texto e CTA. Os lados alternam no desktop.
 */
export function Profissionais() {
  return (
    <section id="profissionais" aria-labelledby="profissionais-titulo" className="secao relative overflow-hidden bg-branco">
      <div className="container-site">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>{secaoProfissionais.eyebrow}</Eyebrow>
          <SectionTitle id="profissionais-titulo" texto={secaoProfissionais.titulo} className="mt-5" />
        </div>

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {secaoProfissionais.perfis.map((p, i) => {
            const invertido = i % 2 === 1;
            return (
              <article key={p.nome} className="relative grid items-center gap-14 md:grid-cols-12 md:gap-8">
                {/* Foto */}
                <Reveal
                  className={`relative mx-auto w-full max-w-sm md:col-span-5 md:max-w-none ${invertido ? "md:order-2 md:col-start-8" : "md:col-start-1"}`}
                >
                  <div className="relative max-md:mr-3">
                    {/* Moldura fina deslocada */}
                    <div
                      aria-hidden
                      className={`absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] border border-marrom/70 md:translate-y-6 ${invertido ? "md:-translate-x-6" : "md:translate-x-6"}`}
                    />
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-bege-escuro shadow-quente-lg">
                      <Parallax>
                        <Image
                          src={p.foto}
                          alt={p.fotoAlt}
                          fill
                          quality={90}
                          sizes="(min-width: 1280px) 520px, (min-width: 768px) 42vw, 400px"
                          className="object-cover object-top"
                        />
                      </Parallax>
                      {/* Degradê + assinatura dourada, como as letras na parede dos consultórios */}
                      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-marrom-escuro/85 via-marrom-escuro/35 to-transparent" />
                      <p aria-hidden className="absolute inset-x-0 bottom-6 text-center font-logo leading-none">
                        <span className={`block text-[0.7rem] font-semibold tracking-[0.5em] ${dourado}`}>
                          {p.tratamento.toUpperCase()}
                        </span>
                        <span className={`mt-2 block text-2xl font-semibold tracking-[0.08em] md:text-[1.65rem] ${dourado}`}>
                          {p.nomeSemTitulo.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </div>
                </Reveal>

                {/* Texto */}
                <Reveal
                  className={`relative md:col-span-6 ${invertido ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}
                >
                    <p className="relative text-xs font-semibold tracking-[0.2em] text-caramelo uppercase">
                      {p.areas.join("  ·  ")}
                    </p>

                    <h3 className="relative mt-4 font-display text-[2.5rem] leading-[1.05] md:text-[3.25rem]">
                      <span className="block text-[0.5em] text-caramelo italic">{p.tratamento}</span>
                      {p.nomeSemTitulo}
                    </h3>
                    <p className="mt-3 text-sm tracking-wide text-tinta-suave">{p.cro}</p>

                    <div aria-hidden className="mt-7 flex items-center gap-3">
                      <span className="h-px w-12 bg-caramelo" />
                      <span className="size-1.5 rotate-45 bg-caramelo" />
                    </div>
                    <p className="mt-7 max-w-xl text-lg leading-relaxed text-tinta">{p.texto}</p>


                    <div className="mt-10">
                      <Button origem={p.origem}>{p.cta}</Button>
                    </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
