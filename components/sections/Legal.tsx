import type { ReactNode } from 'react';

import { PageIntro } from './PageIntro';
import { Container } from '@/components/ui';

export function Legal({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: '/', label: 'Home' },
          { href: path, label: title },
        ]}
        eyebrow="Draft"
        title={title}
        lead="This page is a draft template and is not legal advice. It will be replaced with copy reviewed by counsel before launch."
      />
      <Container>
        <div className="prose-copy max-w-3xl">{children}</div>
      </Container>
    </>
  );
}
