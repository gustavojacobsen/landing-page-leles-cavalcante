import { faq } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="grain bg-bege pt-20 pb-30 md:pt-32 md:pb-42">
      <div className="container-site grid gap-12 md:grid-cols-[2fr_3fr] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <SectionTitle id="duvidas-titulo" texto={faq.titulo} className="mt-5" />
          <div className="mt-10 hidden md:block">
            <Button origem="faq" variante="secundario">
              {faq.cta}
            </Button>
          </div>
        </div>

        <Reveal>
          <Accordion itens={faq.itens} />
          <div className="mt-10 md:hidden">
            <Button origem="faq" variante="secundario">
              {faq.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
