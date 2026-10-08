import { contactCopy } from '@/content/site';
import { pageMetadata, breadcrumbLd, webPageLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { Inquiry } from '@/components/sections/Inquiry';
import { Faq } from '@/components/sections/Faq';
import { photos } from '@/content/assets';
import { Breadcrumbs, Container, Photo } from '@/components/ui';

const description =
  'Get in touch with NY Central Comfort for air conditioning and heating services in New York City. Call (646) 509-9678 for a free quote.';

export const metadata = pageMetadata({ title: 'Contact Us', description, path: '/contact' });

const crumbs = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact Us' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageLd('ContactPage', '/contact', 'Contact NY Central Comfort', contactCopy.lead)} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <div className="pt-32 sm:pt-40">
        <Container>
          <Breadcrumbs items={crumbs} />
        </Container>
      </div>
      <div className="-mt-12 sm:-mt-20">
        <Inquiry as="h1" photo={photos.quote} />
      </div>
      <Container>
        <Photo
          photo={photos.bannerContact}
          sizes="(min-width: 1320px) 1280px, 100vw"
          style={{ aspectRatio: `${photos.bannerContact.src.width} / ${photos.bannerContact.src.height}` }}
        />
      </Container>
      <div className="h-24 sm:h-36" aria-hidden="true" />
      <Faq />
    </>
  );
}
