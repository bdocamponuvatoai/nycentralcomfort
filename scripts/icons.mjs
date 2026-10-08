// Builds favicons from the house mark (orange flame / blue snowflake) on warm ivory.
import sharp from 'sharp';

const mark = (fill = true) => `
  <defs><clipPath id="h"><path d="M24 3.5 45.5 21.5H41V45H7V21.5H2.5Z"/></clipPath></defs>
  <g clip-path="url(#h)"><rect width="48" height="48" fill="#2f7de1"/><path d="M0 0H48V12L0 40Z" fill="#ff800f"/></g>
  <path d="M31 11c3.6 2.7 4.6 6.8 1.9 9.6-1.2 1.3-3.1 1.6-4.4.7 1.9-.4 2.8-2 2.4-3.7-.4-1.9-1.9-2.6-1.6-5 .3 1.3 1 2 1.7 2-.6-1.2-.6-2.4 0-3.6Z" fill="#fff"/>
  <g stroke="#fff" stroke-width="1.6" stroke-linecap="round"><path d="M15 28.5v11M10.2 31.2l9.6 5.6M19.8 31.2l-9.6 5.6"/><path d="M13.4 29.5 15 31l1.6-1.5M13.4 38.5 15 37l1.6 1.5"/></g>`;

const tile = (size, pad, radius) => {
  const inner = size - pad * 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#faf7f2"/>
  <svg x="${pad}" y="${pad}" width="${inner}" height="${inner}" viewBox="0 0 48 48">${mark()}</svg></svg>`);
};

await sharp(tile(512, 56, 112))
  .png()
  .toFile('app/icon.png');
await sharp(tile(180, 22, 0))
  .png()
  .toFile('app/apple-icon.png');
await sharp(tile(512, 110, 0))
  .png()
  .toFile('public/maskable.png');
await sharp(tile(512, 56, 112))
  .png()
  .toFile('public/icon.png');
console.log('icons written');
