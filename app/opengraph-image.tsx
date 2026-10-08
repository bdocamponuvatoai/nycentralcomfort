import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';

import { site } from '@/content/site';

export const alt = `${site.name}: reliable heating and cooling across New York City`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  // Background: the dedicated share photo (bright wall on the left two-thirds for text).
  const photo = await sharp(await readFile(path.join(process.cwd(), 'media/og.webp')))
    .resize(1200, 630, { fit: 'cover', position: 'right' })
    .jpeg({ quality: 84 })
    .toBuffer();
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', color: '#0b1638' }}>
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img src={src} width={1200} height={630} style={{ position: 'absolute', inset: 0 }} />
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(250,247,242,0.95) 0%, rgba(250,247,242,0.85) 45%, rgba(250,247,242,0) 70%)',
        }}
      />
      <div
        style={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          width: 720,
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 700 }}>
          <div style={{ display: 'flex', width: 18, height: 18, borderRadius: 9, background: '#ff800f' }} />
          NY Central Comfort
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          <span>Reliable</span>
          <span style={{ color: '#a34b00' }}>Heating &amp; Cooling</span>
          <span>across New York City.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#3d4560' }}>{site.phone} · Free quotes</div>
      </div>
    </div>,
    size,
  );
}
