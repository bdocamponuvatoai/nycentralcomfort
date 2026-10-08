import Link from 'next/link';
import { getImageProps } from 'next/image';
import { Check, Phone } from 'lucide-react';

import { photos } from '@/content/assets';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { about, cta, facts, hero, site, welcome } from '@/content/site';
import { Arrow, Button, Container, Eyebrow, IconBadge, Photo, cx } from '@/components/ui';

/**
 * Photo-first hero: the full image fills the first screen and the copy sits on its bright, empty wall.
 * A soft ivory wash (not a glow) keeps the navy text at full contrast on every frame.
 * Phones use the portrait crop with the wash from the top; larger screens use the landscape crop
 * with the wash from the left.
 */
export function Hero() {
  const shared = { alt: photos.heroDesktop.alt, fetchPriority: 'high', loading: 'eager' } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...shared, src: photos.heroDesktop.src, sizes: '100vw' });
  const {
    props: { srcSet: mobile },
  } = getImageProps({ ...shared, src: photos.heroMobile.src, sizes: '100vw' });
  const { props: img } = getImageProps({ ...shared, src: photos.heroDesktop.src, sizes: '100vw' });

  return (
    <section aria-labelledby="hero-title" className="px-3 pt-[5.25rem] sm:px-5 sm:pt-24">
      <div className="photo enter-photo relative mx-auto flex min-h-[calc(100svh-6.5rem)] max-w-[1480px] flex-col rounded-[1.75rem] sm:rounded-[2.25rem] lg:min-h-[min(calc(100svh-7rem),54rem)]">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktop} sizes="100vw" />
          <source srcSet={mobile} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...img} className="absolute inset-0 h-full w-full object-cover object-top lg:object-center" />
        </picture>
        <div className="hero-wash absolute inset-0" aria-hidden="true" />

        <div className="relative flex flex-1 flex-col justify-end px-5 pt-10 pb-6 sm:px-10 sm:pb-10 lg:justify-center lg:px-16 lg:py-14">
          <div className="max-w-[34rem] lg:max-w-[38rem]">
            <Eyebrow className="enter">{hero.eyebrow}</Eyebrow>
            <h1 id="hero-title" className="display t-hero mt-5" data-speakable>
              {hero.lines.map((line, i) => (
                <span
                  key={line}
                  className={cx('enter block', i === hero.accentLine && 'accent')}
                  style={{ ['--i' as string]: i + 1 }}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p
              className="lead enter mt-6 max-w-md text-ink/80"
              style={{ ['--i' as string]: 5 }}
              data-speakable
            >
              {hero.lead}
            </p>
            <div className="enter mt-8 flex flex-wrap gap-3" style={{ ['--i' as string]: 6 }}>
              <Button href="/contact">{cta.primary}</Button>
              <a href={site.phoneHref} className="btn btn-ghost hidden bg-white/70 sm:inline-flex">
                <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> {site.phone}
              </a>
            </div>
          </div>

          <ul className="enter mt-7 flex flex-wrap gap-2 lg:mt-12" style={{ ['--i' as string]: 7 }}>
            {hero.assurances.map((a) => (
              <li
                key={a}
                className="glass flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[0.8rem] font-medium sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm"
              >
                <Check size={16} strokeWidth={2} className="text-accent" aria-hidden="true" />
                {a}
              </li>
            ))}
            <li className="glass hidden min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium sm:flex lg:ml-auto">
              <span className="size-2 rounded-full bg-ok" aria-hidden="true" />
              {hero.badge}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Facts() {
  return (
    <section aria-label="At a glance" className="py-14 sm:py-20">
      <Container>
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              data-reveal
              className={cx(
                'px-1 sm:px-6',
                i % 2 === 1 && 'border-l border-line pl-5',
                i > 1 && 'lg:border-l lg:border-line lg:pl-6',
                i === 0 && 'sm:pl-0',
              )}
            >
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-2 text-[clamp(1.5rem,2.6vw,2.3rem)] font-semibold tracking-[-0.04em]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function Welcome() {
  return (
    <section aria-labelledby="welcome-title" className="bg-surface py-24 sm:py-36">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <Eyebrow>{welcome.eyebrow}</Eyebrow>
          <h2 id="welcome-title" className="display t-1 mt-6" data-reveal>
            {welcome.heading[0]} <span className="accent">{welcome.heading[1]}</span>
          </h2>
          <p className="lead mt-8 max-w-xl" data-speakable>
            {welcome.body}
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {welcome.points.map((p) => (
              <li key={p.title} className="card-stone p-6" data-reveal>
                <span
                  className="inline-grid size-9 place-items-center rounded-full bg-pop text-pop-fg"
                  aria-hidden="true"
                >
                  <Check size={18} strokeWidth={2} />
                </span>
                <p className="mt-5 font-semibold">{p.title}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <Photo
          photo={photos.realMiniSplit}
          sizes="(min-width: 1024px) 600px, 100vw"
          className="aspect-[1216/640]"
        />
      </Container>
    </section>
  );
}

export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section
      aria-labelledby={heading ? 'services-title' : undefined}
      aria-label={heading ? undefined : 'All services'}
      className="py-24 sm:py-36"
    >
      <Container>
        {heading && (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>Our services</Eyebrow>
              <h2 id="services-title" className="display t-1 mt-6" data-reveal>
                Professional heating <span className="accent">&amp; cooling services.</span>
              </h2>
            </div>
            <Link href="/services" className="link-arrow shrink-0">
              {cta.secondary} <Arrow />
            </Link>
          </div>
        )}

        <ul className={cx('grid gap-5 md:grid-cols-2 lg:grid-cols-12', heading && 'mt-14 sm:mt-20')}>
          {services.map((s, i) => {
            const wide = i < 2;
            return (
              <li key={s.id} className={cx(wide ? 'lg:col-span-6' : 'lg:col-span-3')} data-reveal>
                <Link
                  href={`/services/${s.id}`}
                  className="card lift group flex h-full flex-col overflow-clip p-3"
                  aria-label={`${s.name}: ${s.short}`}
                >
                  <Photo
                    photo={s.photo}
                    reveal={false}
                    sizes={
                      wide
                        ? '(min-width: 1024px) 640px, (min-width: 768px) 50vw, 100vw'
                        : '(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw'
                    }
                    className={cx('rounded-[1.4rem]', wide ? 'aspect-[16/10]' : 'aspect-[4/3]')}
                  />
                  <div className="flex flex-1 flex-col px-4 pt-6 pb-4 sm:px-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="t-3">{s.name}</h3>
                      <IconBadge icon={s.icon} className="size-11 shrink-0" />
                    </div>
                    <p className="mt-3 text-muted">{s.short}</p>
                    <span className="link-arrow mt-auto pt-6 text-[0.95rem] group-hover:text-accent">
                      Learn more <Arrow />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function Mission() {
  return (
    <section aria-labelledby="mission-title" className="bg-surface py-24 sm:py-40">
      <Container>
        <Eyebrow>Our mission</Eyebrow>
        <h2 id="mission-title" className="display t-2 mt-8 max-w-5xl" data-reveal>
          {about.missionShort[0]} <span className="accent">{about.missionShort[1]}</span>
        </h2>
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v) => (
            <li key={v.title} className="card-stone p-7" data-reveal>
              <IconBadge icon={v.icon} kind="value" className="bg-white" />
              <h3 className="mt-8 text-[1.1rem] font-semibold tracking-[-0.02em]">{v.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ProjectsPreview() {
  return (
    <section aria-labelledby="work-title" className="py-24 sm:py-36">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Eyebrow>Completed projects</Eyebrow>
            <h2 id="work-title" className="display t-1 mt-6" data-reveal>
              Real work, <span className="accent">across New York.</span>
            </h2>
          </div>
          <Link href="/gallery" className="link-arrow shrink-0">
            View the gallery <Arrow />
          </Link>
        </div>

        <ul className="mt-14 grid gap-5 sm:mt-20 md:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id} data-reveal style={{ animationDelay: `${i * 80}ms` }}>
              <Link href={`/gallery#${p.id}`} className="card lift group block p-3">
                <Photo
                  photo={p.cover}
                  reveal={false}
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="aspect-[3/4] rounded-[1.4rem]"
                />
                <div className="px-4 pt-6 pb-4">
                  <p className="text-sm text-muted">{p.type}</p>
                  <h3 className="t-3 mt-1">{p.location}</h3>
                  <p className="mt-2 text-muted">{p.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="bg-surface py-24 sm:py-36">
      <Container>
        <div className="card-stone grid items-center gap-10 overflow-clip p-3 lg:grid-cols-2">
          <Photo
            photo={photos.rooftop}
            sizes="(min-width: 1024px) 640px, 100vw"
            className="aspect-[1586/992] rounded-[1.6rem]"
          />
          <div className="px-5 pb-8 sm:px-8 lg:py-10 lg:pr-14 lg:pl-4">
            <Eyebrow>Why choose us</Eyebrow>
            <h2 id="why-title" className="display t-2 mt-6" data-reveal>
              Choosing us means <span className="accent">peace of mind.</span>
            </h2>
            <p className="lead mt-6" data-speakable>
              {about.whyUs}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="ghost">
                About us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
