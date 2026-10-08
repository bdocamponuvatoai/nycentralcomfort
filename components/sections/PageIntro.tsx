import type { ReactNode } from 'react';

import { breadcrumbLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import type { Photo as PhotoData } from '@/content/assets';
import { Breadcrumbs, Container, Eyebrow, Photo, cx } from '@/components/ui';

export function PageIntro({
  crumbs,
  eyebrow,
  title,
  accent,
  lead,
  children,
  className,
  banner,
}: {
  crumbs: { href: string; label: string }[];
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
  /** Wide photo under the title, shown at its native ratio. */
  banner?: PhotoData;
}) {
  return (
    <section className={cx('pt-32 pb-14 sm:pt-44 sm:pb-20', className)}>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Container>
        <div className="enter">
          <Breadcrumbs items={crumbs} />
        </div>
        <Eyebrow className="enter mt-10">{eyebrow}</Eyebrow>
        <h1 className="display t-1 mt-6 max-w-5xl" data-speakable>
          <span className="enter block" style={{ ['--i' as string]: 1 }}>
            {title}
          </span>
          {accent && (
            <span className="enter accent block" style={{ ['--i' as string]: 2 }}>
              {accent}
            </span>
          )}
        </h1>
        {lead && (
          <p className="lead enter mt-8 max-w-2xl" style={{ ['--i' as string]: 3 }} data-speakable>
            {lead}
          </p>
        )}
        {children && (
          <div className="enter mt-10" style={{ ['--i' as string]: 4 }}>
            {children}
          </div>
        )}
        {banner ? (
          <Photo
            photo={banner}
            eager
            sizes="(min-width: 1320px) 1280px, 100vw"
            className="enter-photo mt-14 sm:mt-16"
            style={{ aspectRatio: `${banner.src.width} / ${banner.src.height}` }}
            reveal={false}
          />
        ) : (
          <div className="mt-14 h-px bg-line" data-wipe aria-hidden="true" />
        )}
      </Container>
    </section>
  );
}
