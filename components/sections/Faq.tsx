import { Plus } from 'lucide-react';

import { faqs } from '@/content/faq';
import { faqLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container, Eyebrow } from '@/components/ui';

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-surface py-24 sm:py-36">
      <JsonLd data={faqLd(faqs)} />
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq-title" className="display t-1 mt-6" data-reveal>
            Good to <span className="accent">know.</span>
          </h2>
          <p className="lead mt-6 max-w-sm">
            Straight answers about our services, the areas we cover and how to get a quote.
          </p>
        </div>

        <div className="border-t border-line">
          {faqs.map((f, i) => (
            <details key={f.q} name="faq" className="acc group border-b border-line" open={i === 0}>
              <summary className="flex min-h-20 items-center gap-5 py-6">
                <span
                  className="w-8 shrink-0 text-sm font-semibold text-accent tabular-nums"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="flex-1 text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold tracking-[-0.02em]">
                  {f.q}
                </h3>
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--line)] group-open:bg-pop group-open:shadow-none"
                  aria-hidden="true"
                >
                  <Plus size={18} strokeWidth={1.75} className="plus" />
                </span>
              </summary>
              <p className="max-w-2xl pr-14 pb-7 pl-13 leading-relaxed text-muted" data-speakable>
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
