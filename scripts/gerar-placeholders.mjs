// Gera imagens placeholder em /public/images.
// Nunca sobrescreve um arquivo existente: para usar a foto real, basta substituir o arquivo.
// Uso: npm run placeholders

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const BEGE_ESCURO = "#E8DCCB";
const MARROM = "#4A3228";
const BRANCO = "#FFFFFF";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const pasta = join(raiz, "public", "images");
mkdirSync(pasta, { recursive: true });

const n = (i) => String(i).padStart(2, "0");
const seis = Array.from({ length: 6 }, (_, i) => n(i + 1));


/** [nome, largura, altura] */
const jpgs = [
  ["hero-equipe.jpg", 1200, 1500], // 4:5
  ...seis.map((i) => [`antes-${i}.jpg`, 1200, 900]), // 4:3 (modo slider)
  ...seis.map((i) => [`depois-${i}.jpg`, 1200, 900]), // 4:3 (modo slider)
  ["og.jpg", 1200, 630],
];

const logoSvg = (cor) => `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="48" viewBox="0 0 320 48" role="img" aria-label="Leles Cavalcanti Odontologia">
  <text x="0" y="32" font-family="Georgia, 'Times New Roman', serif" font-size="24" fill="${cor}">Leles Cavalcanti <tspan font-style="italic">Odontologia</tspan></text>
</svg>
`;

const svgs = [
  ["logo.svg", logoSvg(MARROM)],
  ["logo-claro.svg", logoSvg(BRANCO)],
];

let criados = 0;
let mantidos = 0;

for (const [nome, w, h] of jpgs) {
  const destino = join(pasta, nome);
  if (existsSync(destino)) {
    mantidos++;
    continue;
  }
  const fonte = Math.round(Math.min(w, h) / 14);
  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect x="24" y="24" width="${w - 48}" height="${h - 48}" fill="none" stroke="${MARROM}" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="12 10"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fonte}" fill="${MARROM}">${nome}</text>
    <text x="50%" y="${h / 2 + fonte * 1.4}" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(fonte * 0.5)}" fill="${MARROM}" fill-opacity="0.7">${w} × ${h}</text>
  </svg>`);
  await sharp({ create: { width: w, height: h, channels: 3, background: BEGE_ESCURO } })
    .composite([{ input: overlay }])
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(destino);
  criados++;
}

for (const [nome, conteudo] of svgs) {
  const destino = join(pasta, nome);
  if (existsSync(destino)) {
    mantidos++;
    continue;
  }
  writeFileSync(destino, conteudo);
  criados++;
}

console.log(`Placeholders: ${criados} criado(s), ${mantidos} já existia(m) e foi(ram) mantido(s).`);
