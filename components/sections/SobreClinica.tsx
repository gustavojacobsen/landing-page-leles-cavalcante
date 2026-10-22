import { sobre } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ClinicaGaleria } from "./ClinicaGaleria";

export function SobreClinica() {
  return (
    <section id="clinica" aria-labelledby="clinica-titulo" className="grain secao bg-bege">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{sobre.eyebrow}</Eyebrow>
            <SectionTitle id="clinica-titulo" texto={sobre.titulo} className="mt-5" />
            <p className="mt-5 max-w-xl text-tinta-suave">{sobre.subtitulo}</p>
          </div>
          <Reveal className="shrink-0">
            <Button origem="sobre" icone="calendario">
              {sobre.cta}
            </Button>
          </Reveal>
        </div>

        <Reveal className="mt-12 md:mt-16">
          <ClinicaGaleria />
        </Reveal>
      </div>
    </section>
  );
}
