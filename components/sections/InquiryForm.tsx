'use client';

import { useActionState, useEffect, useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

import { submitInquiry } from '@/app/actions/inquiry';
import { services } from '@/content/services';
import type { InquiryField, InquiryState } from '@/lib/schema';
import { Arrow, cx } from '@/components/ui';

const initial: InquiryState = { status: 'idle' };

export function InquiryForm({ defaultService }: { defaultService?: string }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  // When the form first appeared (kept across server round-trips). Feeds the server-side time trap.
  const startedAt = useRef(0);
  const stampStarted = (el: HTMLInputElement | null) => {
    if (!el) return;
    startedAt.current ||= Date.now();
    el.value = String(startedAt.current);
  };

  const err = (f: InquiryField) => state.errors?.[f];
  const val = (f: InquiryField) => {
    const v = state.values?.[f];
    return typeof v === 'string' ? v : undefined;
  };
  const chosen = (id: string) => {
    const v = state.values?.services;
    return Array.isArray(v) ? v.includes(id) : id === defaultService;
  };

  useEffect(() => {
    if (state.status === 'error' && state.errors) {
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
    } else if (state.status !== 'idle') {
      noticeRef.current?.focus();
    }
  }, [state]);

  if (state.status === 'success') {
    return (
      <div ref={noticeRef} tabIndex={-1} role="status" className="card p-8 sm:p-10">
        <CheckCircle2 size={40} strokeWidth={1.4} className="text-ok" aria-hidden="true" />
        <p className="t-3 mt-6">Request received.</p>
        <p className="mt-3 text-muted">{state.message}</p>
      </div>
    );
  }

  const describedBy = (f: InquiryField, hint?: boolean) =>
    [hint && `${f}-hint`, err(f) && `${f}-error`].filter(Boolean).join(' ') || undefined;

  // Re-mount the form after a server round-trip so returned values show as defaults.
  const formKey = JSON.stringify(state.values ?? {});

  return (
    <form key={formKey} ref={formRef} action={action} noValidate className="card p-6 sm:p-10">
      {state.status === 'error' && state.message && (
        <div
          ref={noticeRef}
          tabIndex={-1}
          role="alert"
          className="mb-6 rounded-2xl bg-[rgb(179_38_30/0.07)] px-5 py-4 text-[0.95rem] text-danger"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            defaultValue={val('name')}
            aria-invalid={err('name') ? true : undefined}
            aria-describedby={describedBy('name')}
          />
          {err('name') && (
            <p id="name-error" className="error">
              {err('name')}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={val('email')}
            aria-invalid={err('email') ? true : undefined}
            aria-describedby={describedBy('email')}
          />
          {err('email') && (
            <p id="email-error" className="error">
              {err('email')}
            </p>
          )}
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="phone">
            Phone <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={val('phone')}
            aria-invalid={err('phone') ? true : undefined}
            aria-describedby={describedBy('phone')}
          />
          {err('phone') && (
            <p id="phone-error" className="error">
              {err('phone')}
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-6" aria-describedby={err('services') ? 'services-error' : undefined}>
        <legend className="mb-3 text-[0.86rem] font-semibold">What do you need help with?</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <label key={s.id} className="chip-check">
              <input type="checkbox" name="services" value={s.id} defaultChecked={chosen(s.id)} />
              <span>{s.name}</span>
            </label>
          ))}
        </div>
        {err('services') && (
          <p id="services-error" className="mt-2 text-sm text-danger">
            {err('services')}
          </p>
        )}
      </fieldset>

      <div className="field mt-6">
        <label htmlFor="message">Your message</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={3000}
          defaultValue={val('message')}
          aria-invalid={err('message') ? true : undefined}
          aria-describedby={describedBy('message', true)}
        />
        <p id="message-hint" className="hint">
          Tell us about your home or building, the system and what is happening.
        </p>
        {err('message') && (
          <p id="message-error" className="error">
            {err('message')}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="started" ref={stampStarted} />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We reply by email or phone. No spam, ever.</p>
        <button type="submit" disabled={pending} className={cx('btn btn-primary', pending && 'opacity-70')}>
          {pending ? 'Sending…' : 'Send Message'}
          {!pending && <Arrow />}
        </button>
      </div>
    </form>
  );
}
