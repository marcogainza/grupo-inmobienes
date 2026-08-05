// Script de un solo uso: recomprime las imágenes fuente más pesadas de
// public/, manteniendo el mismo nombre/formato (no requiere tocar código).
// Reduce dimensiones a lo máximo que realmente se muestra en pantalla —
// next/image ya sirve versiones optimizadas al vuelo, pero un archivo
// fuente más liviano reduce el trabajo de esa optimización y el peso del
// repositorio.
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "..", "public");

// Imágenes usadas como fondo grande (Hero, full-width): mantener buena
// resolución. El resto son fotos del mosaico o catálogo, mostradas pequeñas.
const FULL_WIDTH_BACKGROUNDS = new Set([
  "terreno-0.png",
  "empresa-0.jpg",
  "local-0.jpg",
]);

const MAX_WIDTH_BACKGROUND = 1920;
const MAX_WIDTH_PHOTO = 900;

async function optimize(file) {
  const fullPath = path.join(PUBLIC_DIR, file);
  const before = statSync(fullPath).size;

  const isBackground = FULL_WIDTH_BACKGROUNDS.has(file);
  const maxWidth = isBackground ? MAX_WIDTH_BACKGROUND : MAX_WIDTH_PHOTO;

  const image = sharp(fullPath);
  const metadata = await image.metadata();
  if (!metadata.width || metadata.width <= maxWidth) {
    return { file, before, after: before, skipped: true };
  }

  const buffer = await image
    .resize({ width: maxWidth, withoutEnlargement: true })
    .toBuffer();

  // Solo sobrescribe si de verdad se redujo el tamaño.
  if (buffer.length < before) {
    await sharp(buffer).toFile(fullPath + ".tmp");
    const fs = await import("node:fs/promises");
    await fs.rename(fullPath + ".tmp", fullPath);
    return { file, before, after: buffer.length, skipped: false };
  }
  return { file, before, after: before, skipped: true };
}

const targets = readdirSync(PUBLIC_DIR).filter((f) =>
  /\.(png|jpe?g)$/i.test(f)
);

const results = [];
for (const file of targets) {
  results.push(await optimize(file));
}

let totalBefore = 0;
let totalAfter = 0;
for (const r of results) {
  totalBefore += r.before;
  totalAfter += r.after;
  const beforeKb = (r.before / 1024).toFixed(0);
  const afterKb = (r.after / 1024).toFixed(0);
  console.log(
    `${r.skipped ? "  =" : "  ↓"} ${r.file}: ${beforeKb}KB -> ${afterKb}KB`
  );
}
console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
);
