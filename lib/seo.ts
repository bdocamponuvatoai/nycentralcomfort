import type { Metadata } from 'next';

import { site } from '@/content/site';
import { services, type Service } from '@/content/services';
import { projects } from '@/content/projects';
import { photos } from '@/content/assets';
import type { Faq } from '@/content/faq';

export const absolute = (path = '/') => new URL(path, site.url).toString();

export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: {
  title?: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | HVAC Services in New York City`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: 'en_US',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: ['/opengraph-image'] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

const businessId = absolute('/#business');

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HVACBusiness',
        '@id': businessId,
        name: site.name,
        url: site.url,
        logo: absolute('/icon.png'),
        image: [absolute(photos.heroDesktop.src.src), ...projects.map((p) => absolute(p.cover.src.src))],
        description: site.description,
        slogan: site.tagline,
        telephone: '+1-646-509-9678',
        email: site.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        areaServed: { '@type': 'City', name: site.areaServed },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-646-509-9678',
          email: site.email,
          contactType: 'customer service',
          areaServed: 'US-NY',
          availableLanguage: 'en',
        },
        knowsAbout: services.map((s) => s.name),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'HVAC services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.name, url: absolute(`/services/${s.id}`) },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': absolute('/#website'),
        url: site.url,
        name: site.name,
        publisher: { '@id': businessId },
        inLanguage: 'en-US',
      },
    ],
  };
}

export function webPageLd(type: string, path: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    url: absolute(path),
    name,
    description,
    isPartOf: { '@id': absolute('/#website') },
    about: { '@id': businessId },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['[data-speakable]'] },
  };
}

export function breadcrumbLd(items: { href: string; label: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: absolute(item.href),
    })),
  };
}

export function serviceLd(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.body,
    url: absolute(`/services/${service.id}`),
    serviceType: service.name,
    provider: { '@id': businessId },
    areaServed: { '@type': 'City', name: site.areaServed },
    image: absolute(service.photo.src.src),
  };
}

export function faqLd(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Gallery: each completed project as a CreativeWork with its real photos. */
export function projectsLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Completed projects',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: `${p.title}: ${p.description}`,
        url: absolute(`/gallery#${p.id}`),
        locationCreated: { '@type': 'Place', name: p.location },
        creator: { '@id': businessId },
        image: [p.cover, ...p.album].map((ph) => ({
          '@type': 'ImageObject',
          contentUrl: absolute(ph.src.src),
          caption: ph.alt,
          width: ph.src.width,
          height: ph.src.height,
        })),
      },
    })),
  };
}
