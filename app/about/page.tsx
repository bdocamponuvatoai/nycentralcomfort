import { photos } from '@/content/assets';
import { about, cta } from '@/content/site';
import { pageMetadata, webPageLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageIntro } from '@/components/sections/PageIntro';
import { Mission, ProjectsPreview, WhyUs } from '@/components/sections/Home';
import { Inquiry } from '@/components/sections/Inquiry';
import { Process } from '@/components/sections/Process';
import { Button, Container, Eyebrow, Photo } from '@/components/ui';

const description =
  'NY Central Comfort has served New York City for over a decade with HVAC services for residential and commercial clients.';

export const metadata = pageMetadata({ title: 'About Us', description, path: '/about' });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageLd('AboutPage', '/about', 'About NY Central Comfort', description)} />
      <PageIntro
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About Us' },
        ]}
        eyebrow="About NY Central Comfort"
        title="Over a decade of"
        accent="comfort in New York."
        lead={about.intro}
        banner={photos.bannerAbout}
      >
        <Button href="/services" variant="ghost">
          {cta.secondary}
        </Button>
      </PageIntro>

      <section aria-labelledby="mission-full" className="py-24 sm:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Photo photo={photos.team} sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[4/5]" />
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="mission-full" className="display t-2 mt-6">
              Comfort that is <span className="accent">built to last.</span>
            </h2>
            <div className="prose-copy mt-8 text-[1.12rem]">
              <p data-speakable>{about.mission}</p>
              <p>
                Alongside installation, repair and maintenance, we also offer{' '}
                {about.alsoOffered[0].toLowerCase()} and {about.alsoOffered[1].toLowerCase()}.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Mission />
      <Process />
      <WhyUs />
      <ProjectsPreview />
      <Inquiry />
    </>
  );
}
