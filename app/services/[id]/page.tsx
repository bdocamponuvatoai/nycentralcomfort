import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Phone } from 'lucide-react';

import { about, cta, site, welcome } from '@/content/site';
import { getService, services } from '@/content/services';
import { pageMetadata, serviceLd, webPageLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageIntro } from '@/components/sections/PageIntro';
import { Inquiry } from '@/components/sections/Inquiry';
import { Arrow, Button, Container, Eyebrow, IconBadge, Photo } from '@/components/ui';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const service = getService(id);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} in New York City`,
    description:
      `${service.body.split('. ')[0].replace(/\.$/, '')}. NY Central Comfort, serving all of NYC.`.slice(
        0,
        165,
      ),
    path: `/services/${service.id}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { id } = await params;
  const service = getService(id);
  if (!service) notFound();

  const others = services.filter((s) => s.id !== service.id);
  const path = `/services/${service.id}`;

  return (
    <>
      <JsonLd data={serviceLd(service)} />
      <JsonLd data={webPageLd('WebPage', path, service.name, service.short)} />
      <PageIntro
        crumbs={[
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Our Services' },
          { href: path, label: service.name },
        ]}
        eyebrow="Our services"
        title={service.name}
        lead={service.short}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#contact">{cta.primary}</Button>
          <Button href="/services" variant="ghost">
            All services
          </Button>
        </div>
      </PageIntro>

      <section aria-label={service.name}>
        <Container className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Photo
            photo={service.photo}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="aspect-[4/3]"
            eager
          />
          <div className="card p-8 sm:p-10 lg:sticky lg:top-32">
            <IconBadge icon={service.icon} />
            <p className="mt-6 text-[1.1rem] leading-relaxed" data-speakable>
              {service.body}
            </p>
            <h2 className="mt-8 text-sm font-semibold text-muted">What it includes</h2>
            <ul className="mt-4 grid gap-3">
              {service.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-3">
                  <span
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-[rgb(255_128_15/0.14)] text-accent"
                    aria-hidden="true"
                  >
                    <Check size={15} strokeWidth={2} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="why-service-title" className="pt-24 sm:pt-36">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Photo
            photo={service.detail}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="aspect-[4/5] max-lg:max-w-md"
          />
          <div>
            <Eyebrow>Why NY Central Comfort</Eyebrow>
            <h2 id="why-service-title" className="display t-2 mt-6">
              Done right <span className="accent">the first time.</span>
            </h2>
            <p className="lead mt-6 max-w-xl">{about.whyUs}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {welcome.points.map((p) => (
                <li key={p.title} className="card-stone p-6">
                  <p className="font-semibold">{p.title}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ul>
            <a href={site.phoneHref} className="btn btn-ghost mt-8">
              <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> {site.phone}
            </a>
          </div>
        </Container>
      </section>

      <section aria-labelledby="related-title" className="pt-24 sm:pt-36">
        <Container>
          <Eyebrow>One team, every system</Eyebrow>
          <h2 id="related-title" className="display t-2 mt-6 max-w-3xl">
            More ways we keep you <span className="accent">comfortable.</span>
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.id} data-reveal>
                <Link href={`/services/${s.id}`} className="card lift group flex h-full flex-col p-6">
                  <IconBadge icon={s.icon} className="size-11" />
                  <h3 className="mt-6 font-semibold tracking-[-0.02em]">{s.name}</h3>
                  <p className="mt-2 text-[0.92rem] text-muted">{s.short}</p>
                  <span className="link-arrow mt-auto pt-4 text-sm group-hover:text-accent">
                    Learn more <Arrow size={14} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Inquiry defaultService={service.id} />
    </>
  );
}
