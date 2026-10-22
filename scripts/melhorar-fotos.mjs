// Amplia fotos de baixa resolução (2x, lanczos3) com redução de ruído e nitidez leves.
// Gera "<nome>-hd.jpg" ao lado do original, sem alterar o original.
// Uso: node scripts/melhorar-fotos.mjs public/images/foto1.png public/images/foto2.png ...
import sharp from "sharp";
import { parse, join } from "node:path";

const LARGURA_MAX = 2000;

for (const arquivo of process.argv.slice(2)) {
  const { dir, name } = parse(arquivo);
  const destino = join(dir, `${name}-hd.jpg`);
  const { width } = await sharp(arquivo).metadata();
  const largura = Math.min(width * 2, LARGURA_MAX);
  await sharp(arquivo)
    .median(1)
    .resize({ width: largura, kernel: "lanczos3" })
    .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.2, x1: 2, y2: 12, y3: 18 })
    .modulate({ saturation: 1.03 })
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(destino);
  console.log(`${arquivo} (${width}px) -> ${destino} (${largura}px)`);
}
