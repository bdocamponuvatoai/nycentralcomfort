// Converts every master in assets-src/ into an optimised WebP in media/.
// Usage: npm run media            → all new or changed images
//        npm run media -- <name>  → only assets-src/<name>.(png|jpg)
// Files named *.original.* and logo files are skipped (untouched masters); subfolders such as
// assets-src/archive/ are ignored.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const OUT = 'media';
const WIDE = /^(h1-desktop|p-|og|w1-|nf-)/; // full-bleed images get a larger max width
const only = process.argv[2];

fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readdirSync(SRC)
  .filter((f) => /\.(png|jpe?g)$/i.test(f) && !/\.original\./.test(f) && !/^logo/.test(f))
  .filter((f) => !only || path.parse(f).name === only);

let done = 0;
for (const file of files) {
  const name = path.parse(file).name;
  const src = path.join(SRC, file);
  const out = path.join(OUT, `${name}.webp`);
  if (!only && fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(src).mtimeMs) continue;

  const maxWidth = WIDE.test(name) ? 2400 : 1800;
  const info = await sharp(src)
    .rotate()
    .resize({ width: maxWidth, height: maxWidth, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(out);
  done++;
  console.log(`${name.padEnd(26)} ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
}
console.log(done ? `\n${done} image(s) written to ${OUT}/` : 'Everything is up to date.');
