// Padroniza as fotos de antes e depois: quadrado 1600x1600, foto inteira (sem corte) sobre um fundo
// desfocado da própria foto, com ampliação lanczos3 e nitidez leve.
// Uso: node scripts/padronizar-resultados.mjs <saida-dir> <foto1> <foto2> ...
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

const LADO = 1600;
const [saida, ...arquivos] = process.argv.slice(2);
mkdirSync(saida, { recursive: true });

for (const arquivo of arquivos) {
  const nome = basename(arquivo, extname(arquivo));
  const destino = join(saida, `${nome}.jpg`);

  // Fundo: a própria foto preenchendo o quadrado, bem desfocada e levemente escurecida
  const fundo = await sharp(arquivo)
    .resize(LADO, LADO, { fit: "cover" })
    .blur(40)
    .modulate({ brightness: 0.92, saturation: 0.8 })
    .toBuffer();

  // Frente: a foto inteira, ampliada com qualidade, centralizada
  const frente = await sharp(arquivo)
    .median(1)
    .resize(LADO, LADO, { fit: "inside", kernel: "lanczos3" })
    .sharpen({ sigma: 1, m1: 0.5, m2: 2, x1: 2, y2: 10, y3: 16 })
    .toBuffer({ resolveWithObject: true });

  await sharp(fundo)
    .composite([
      {
        input: frente.data,
        left: Math.round((LADO - frente.info.width) / 2),
        top: Math.round((LADO - frente.info.height) / 2),
      },
    ])
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(destino);
  console.log(`${arquivo} -> ${destino} (${frente.info.width}x${frente.info.height} centralizada)`);
}
