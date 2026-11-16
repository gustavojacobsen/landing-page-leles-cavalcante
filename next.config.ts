import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática (pasta "out") para hospedagem compartilhada sem Node.js (Hostinger)
  output: "export",
  // Cada página vira pasta/index.html, que servidores Apache servem sem configuração extra
  trailingSlash: true,
  // Esconde o indicador "N" do Next.js no modo de desenvolvimento (erros continuam aparecendo)
  devIndicators: false,
  images: {
    // Sem servidor Node não há otimização sob demanda: as imagens são servidas como estão em /public
    unoptimized: true,
    // Os componentes usam quality={90}; sem isso o Next avisa no console em desenvolvimento
    qualities: [75, 90],
  },
};

export default nextConfig;
