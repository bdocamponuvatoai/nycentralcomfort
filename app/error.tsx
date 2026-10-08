'use client';

import { useEffect } from 'react';

import { site } from '@/content/site';
import { Container, Eyebrow } from '@/components/ui';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-40 pb-16 sm:pt-52">
      <Container>
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="display t-1 mt-6 max-w-4xl">
          We hit a snag <span className="accent">on our side.</span>
        </h1>
        <p className="lead mt-6 max-w-xl">
          Please try again. If it keeps happening, call us at{' '}
          <a href={site.phoneHref} className="inline-link text-ink">
            {site.phone}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className="btn btn-primary mt-10">
          Try again
        </button>
      </Container>
    </section>
  );
}
