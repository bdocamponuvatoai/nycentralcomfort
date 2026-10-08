import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

import { cta, nav, site } from '@/content/site';
import { services } from '@/content/services';
import { Arrow, Container, Logo } from '@/components/ui';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 overflow-clip bg-stone pt-20 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:mt-32 sm:pt-24 sm:pb-0">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-muted">
              Providing reliable HVAC services in New York City for over 10 years.{' '}
              <span className="text-ink">{site.tagline}</span>
            </p>
            <Link href="/contact" className="btn btn-primary mt-8">
              {cta.primary} <Arrow />
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted">Company</h2>
            <ul className="mt-4 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted">Services</h2>
            <ul className="mt-4 space-y-1">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="inline-flex min-h-11 items-center hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-muted">Get in touch</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex min-h-11 items-center gap-3 font-semibold hover:text-accent"
                >
                  <Phone size={17} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center gap-3 hover:text-accent"
                >
                  <Mail size={17} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3 py-2.5">
                <MapPin
                  size={17}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <address className="not-italic">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-ink">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <p className="wordmark mt-6 text-center whitespace-nowrap select-none" aria-hidden="true">
        NY Central Comfort
      </p>
    </footer>
  );
}
