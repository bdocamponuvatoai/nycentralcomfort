import { steps } from '@/content/process';
import { Container, Eyebrow, Photo } from '@/components/ui';

/** Four steps as stacking cards: each pins below the header and the next one slides over it (desktop). */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="py-24 sm:py-36">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="process-title" className="display t-1 mt-6" data-reveal>
            Simple from the <span className="accent">first call.</span>
          </h2>
        </div>

        <ol className="mt-14 grid gap-5 sm:mt-20">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="lg:sticky"
              style={{ top: `calc(6.5rem + ${i * 1.25}rem)`, zIndex: i + 1 }}
            >
              <article className="card grid items-center gap-6 p-3 sm:grid-cols-[1fr_1.1fr] lg:min-h-[26rem]">
                <div className="order-2 px-4 pb-5 sm:order-1 sm:px-8 sm:py-8 lg:px-12">
                  <p className="flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-full bg-pop text-sm font-semibold text-pop-fg tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-muted">
                      Step {i + 1} of {steps.length}
                    </span>
                  </p>
                  <h3 className="mt-8 text-[clamp(1.6rem,3vw,2.6rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-muted" data-speakable>
                    {step.body}
                  </p>
                </div>
                <Photo
                  photo={step.photo}
                  reveal={false}
                  sizes="(min-width: 640px) 600px, 100vw"
                  className="order-1 aspect-square rounded-[1.5rem] sm:order-2 sm:aspect-[4/3] lg:aspect-[5/4]"
                />
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
