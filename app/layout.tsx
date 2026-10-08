import type { Metadata, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import './globals.css';
import { site } from '@/content/site';
import { organizationLd } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { BackToTop } from '@/components/BackToTop';
import { JsonLd } from '@/components/seo/JsonLd';

const display = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | HVAC Services in New York City`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image' },
  robots:
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
      ? { index: false, follow: false }
      : undefined,
};

export const viewport: Viewport = {
  themeColor: '#faf7f2',
  colorScheme: 'light',
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
};

const isProduction = process.env.VERCEL_ENV === 'production';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={display.variable}>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="progress" aria-hidden="true" />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <BackToTop />
        <JsonLd data={organizationLd()} />
        {isProduction && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
