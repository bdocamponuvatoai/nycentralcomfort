import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';

// Pages are statically generated, so scripts cannot carry a per-request nonce. 'unsafe-inline' is limited
// to scripts Next.js inlines; no third-party origins are allowed apart from Vercel analytics.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  },
];

// The previous site (static HTML template) used .html URLs. Permanent redirects keep their rankings
// and any saved links working.
const legacyPages: [string, string][] = [
  ['/index.html', '/'],
  ['/about.html', '/about'],
  ['/service.html', '/services'],
  ['/services.html', '/services'],
  ['/contact.html', '/contact'],
  ['/gallery.html', '/gallery'],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      ...legacyPages.map(([source, destination]) => ({ source, destination, permanent: true })),
      // Old image and video URLs from the template site (indexed by image search) → the gallery.
      { source: '/img/:path*', destination: '/gallery', permanent: true },
      { source: '/audio/:path*', destination: '/services', permanent: true },
    ];
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
