import { MapPin } from 'lucide-react';

import { projects } from '@/content/projects';
import { photos } from '@/content/assets';
import { pageMetadata, projectsLd, webPageLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageIntro } from '@/components/sections/PageIntro';
import { Inquiry } from '@/components/sections/Inquiry';
import { Album } from '@/components/Album';
import { Container, Photo, cx } from '@/components/ui';

const description =
  'Completed projects by NY Central Comfort, including HVAC installations and unit replacements for commercial buildings and schools in New York City.';

export const metadata = pageMetadata({ title: 'Gallery', description, path: '/gallery' });

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={webPageLd('CollectionPage', '/gallery', 'Completed Projects', description)} />
      <JsonLd data={projectsLd()} />
      <PageIntro
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/gallery', label: 'Gallery' },
        ]}
        eyebrow="Gallery"
        title="Completed"
        accent="projects."
        lead="Real installations and replacements by our own crew, from Manhattan office floors to a school rooftop in Queens."
        banner={photos.bannerGallery}
      />

      {projects.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          aria-labelledby={`${p.id}-title`}
          className={cx('scroll-mt-28 py-16 sm:py-24', i % 2 === 1 && 'bg-surface')}
        >
          <Container>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
              <div>
                <p className="text-sm font-semibold text-accent">
                  Project {i + 1} · {p.type}
                </p>
                <h2 id={`${p.id}-title`} className="display t-2 mt-4">
                  {p.title}
                </h2>
                <p className="mt-5 flex items-center gap-2 text-muted">
                  <MapPin size={17} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                  {p.location}
                </p>
                <p className="lead mt-3">{p.description}</p>
              </div>
              <Photo
                photo={p.cover}
                sizes="(min-width: 1024px) 760px, 100vw"
                className="mx-auto max-h-[80vh] w-full"
                style={{
                  aspectRatio: `${p.cover.src.width} / ${p.cover.src.height}`,
                  maxWidth: `calc(80vh * ${p.cover.src.width / p.cover.src.height})`,
                }}
                eager={i === 0}
              />
            </div>
            <div className="mt-6 sm:mt-8">
              <Album photos={p.album} title={p.title} />
            </div>
          </Container>
        </section>
      ))}

      <Inquiry />
    </>
  );
}
