import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { contactCopy, cta, site } from '@/content/site';
import type { Photo as PhotoData } from '@/content/assets';
import { Container, Eyebrow, Photo } from '@/components/ui';
import { InquiryForm } from './InquiryForm';

export function Inquiry({
  as: Heading = 'h2',
  defaultService,
  photo,
}: {
  as?: 'h1' | 'h2';
  defaultService?: string;
  /** Optional portrait shown under the contact details on large screens. */
  photo?: PhotoData;
}) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28 py-24 sm:py-36">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{cta.primary}</Eyebrow>
          <Heading id="contact-title" className="display t-1 mt-6">
            {contactCopy.heading}
            <span className="accent">.</span>
          </Heading>
          <p className="lead mt-6 max-w-md" data-speakable>
            {contactCopy.lead} {cta.call}
          </p>

          <ul className="mt-10 grid gap-3">
            <li>
              <a href={site.phoneHref} className="card lift flex min-h-16 items-center gap-4 px-5 py-4">
                <Phone size={20} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-muted">Call us</span>
                  <span className="text-lg font-semibold">{site.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="card lift flex min-h-16 items-center gap-4 px-5 py-4"
              >
                <Mail size={20} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                <span>
                  <span className="block text-sm text-muted">Email</span>
                  <span className="font-semibold break-all">{site.email}</span>
                </span>
              </a>
            </li>
            <li className="card flex items-center gap-4 px-5 py-4">
              <MapPin size={20} strokeWidth={1.6} className="shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-sm text-muted">Based in Brooklyn, serving all of NYC</span>
                <span className="font-semibold">
                  {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
              </span>
            </li>
          </ul>
          <p className="mt-6 flex gap-3 text-[0.95rem] text-muted">
            <Clock size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            {contactCopy.support}
          </p>
          {photo && (
            <Photo photo={photo} sizes="480px" className="mt-10 hidden aspect-[4/5] max-w-sm lg:block" />
          )}
        </div>

        <InquiryForm defaultService={defaultService} />
      </Container>
    </section>
  );
}
