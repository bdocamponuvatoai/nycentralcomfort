import { cta } from '@/content/site';
import { photos } from '@/content/assets';
import { services } from '@/content/services';
import { pageMetadata, webPageLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageIntro } from '@/components/sections/PageIntro';
import { ServicesGrid } from '@/components/sections/Home';
import { Inquiry } from '@/components/sections/Inquiry';
import { Button } from '@/components/ui';

const description =
  'AC installation, heating and cooling, ductwork, maintenance and repair, indoor air quality and cooling tower services in New York City.';

export const metadata = pageMetadata({ title: 'Our Services', description, path: '/services' });

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          ...webPageLd('CollectionPage', '/services', 'Our Services', description),
          hasPart: services.map((s) => ({ '@type': 'Service', name: s.name })),
        }}
      />
      <PageIntro
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Our Services' },
        ]}
        eyebrow="Our services"
        title="Our professional heating"
        accent="& cooling services."
        lead="At NY Central Comfort, we are dedicated to providing high-quality HVAC services tailored to meet your needs."
        banner={photos.bannerServices}
        className="pb-0 sm:pb-0"
      >
        <Button href="/contact">{cta.primary}</Button>
      </PageIntro>
      <ServicesGrid heading={false} />
      <Inquiry />
    </>
  );
}
