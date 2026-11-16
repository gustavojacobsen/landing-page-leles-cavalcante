import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { clinica, enderecoCompleto, especialidades, site } from "@/lib/content";
import { jsonLd } from "@/lib/jsonld";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Rastreamento } from "@/components/Rastreamento";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  display: "swap",
});

// Serifada clássica em caixa alta, no mesmo desenho do letreiro da clínica (logo).
// Arquivo local (fonte variável, latin): o next/font/google falha ao baixar a Cinzel no Turbopack.
const cinzel = localFont({
  src: "./fonts/cinzel-latin.woff2",
  variable: "--font-cinzel",
  weight: "400 900",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.titulo,
  description: site.descricao,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: clinica.nome,
    title: site.titulo,
    description: site.descricao,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: `${clinica.nome}: ${especialidades.map((e) => e.nome).join(", ")}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.titulo,
    description: site.descricao,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F5EFE6", // bege
};

// JSON-LD Dentist (LocalBusiness)
const dentistaJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinica.nome,
  url: site.url,
  image: `${site.url}/images/og.jpg`,
  telephone: `+55${clinica.telefoneDigitos}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${clinica.endereco.rua}, ${clinica.endereco.complemento} - ${clinica.endereco.predio}`,
    addressLocality: clinica.cidade,
    addressRegion: clinica.uf,
    postalCode: clinica.endereco.cep,
    addressCountry: "BR",
  },
  ...(clinica.geo && {
    geo: { "@type": "GeoCoordinates", latitude: clinica.geo.lat, longitude: clinica.geo.lng },
  }),
  openingHoursSpecification: clinica.horarios.flatMap((h) =>
    h.periodos.map((p) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dias,
      opens: p.abre,
      closes: p.fecha,
    })),
  ),
  ...(clinica.instagram && { sameAs: [`https://instagram.com/${clinica.instagram}`] }),
  description: `${especialidades.map((e) => e.nome).join(", ")} em ${enderecoCompleto}`,
  availableService: especialidades.map((e) => ({ "@type": "MedicalProcedure", name: e.nome })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable} ${cinzel.variable}`}>
      {/* suppressHydrationWarning: extensões do navegador (ex.: ColorZilla) injetam atributos no <body> */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(dentistaJsonLd) }}
        />

        {/*
          GTM e Meta Pixel: os IDs ficam em `lib/content.ts` → `tracking`.
          Os scripts carregam assim que a página abre (<Rastreamento />), sem aviso de cookies.
          Enquanto os IDs estiverem vazios, nada é carregado:
            tracking.gtmId       = "GTM-XXXXXXX"
            tracking.metaPixelId = "000000000000000"
        */}

        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-marrom focus:px-5 focus:py-3 focus:text-branco"
        >
          Pular para o conteúdo
        </a>

        <Providers>
          <ScrollProgress />
          {children}
          <WhatsAppFloat />
          <Rastreamento />
        </Providers>
      </body>
    </html>
  );
}
