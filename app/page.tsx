import { depoimentosReais, faq } from "@/lib/content";
import { jsonLd } from "@/lib/jsonld";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { FaixaConfianca } from "@/components/sections/FaixaConfianca";
import { Resultados } from "@/components/sections/Resultados";
import { Especialidades } from "@/components/sections/Especialidades";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { SobreClinica } from "@/components/sections/SobreClinica";
import { Profissionais } from "@/components/sections/Profissionais";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

// Depoimentos placeholder aparecem só em desenvolvimento; em produção, só com depoimentos reais.
const mostrarDepoimentos = depoimentosReais || process.env.NODE_ENV !== "production";

// JSON-LD FAQPage gerado do mesmo array que alimenta o accordion.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.itens.map((item) => ({
    "@type": "Question",
    name: item.pergunta,
    acceptedAnswer: { "@type": "Answer", text: item.resposta },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }}
      />
      <Header />
      <main id="conteudo">
        <Hero />
        <FaixaConfianca />
        <Resultados />
        <Especialidades />
        {mostrarDepoimentos && <Depoimentos rascunho={!depoimentosReais} />}
        <SobreClinica />
        <Profissionais />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
