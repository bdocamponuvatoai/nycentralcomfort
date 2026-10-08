import assert from 'node:assert/strict';
import { test } from 'node:test';

import { MIN_FILL_MS, messages, processInquiry, type InquiryGateway } from '../../lib/inquiry-service.ts';
import { createMemoryLimiter } from '../../lib/ratelimit.ts';

const valid = () => {
  const f = new FormData();
  f.set('name', 'Jordan Rivera');
  f.set('email', 'jordan@example.com');
  f.set('phone', '(718) 555-0101');
  f.append('services', 'ac-installation');
  f.set('message', 'Our second-floor mini-split stopped cooling yesterday.');
  return f;
};

const gateway = (over: Partial<InquiryGateway> = {}) => {
  const sent: unknown[] = [];
  const g: InquiryGateway = {
    configured: () => true,
    allowed: async () => true,
    send: async (i) => {
      sent.push(i);
      return true;
    },
    ...over,
  };
  return { g, sent };
};

test('success only when the provider acknowledges', async () => {
  const { g, sent } = gateway();
  const r = await processInquiry(valid(), g);
  assert.equal(r.status, 'success');
  assert.equal(sent.length, 1);
});

test('validation errors never reach the provider', async () => {
  const { g, sent } = gateway();
  const f = valid();
  f.set('email', 'nope');
  f.set('message', 'short');
  const r = await processInquiry(f, g);
  assert.equal(r.status, 'error');
  assert.ok(r.errors?.email && r.errors?.message);
  assert.equal(sent.length, 0);
});

test('honeypot submissions are dropped silently', async () => {
  const { g, sent } = gateway();
  const f = valid();
  f.set('website', 'http://spam.example');
  const r = await processInquiry(f, g);
  assert.equal(r.status, 'success');
  assert.equal(sent.length, 0);
});

test('unconfigured provider fails honestly', async () => {
  const { g } = gateway({ configured: () => false });
  const r = await processInquiry(valid(), g);
  assert.equal(r.message, messages.notConfigured);
});

test('rate limiter refuses the 6th request in an hour', async () => {
  const limiter = createMemoryLimiter({ limit: 5, windowMs: 3_600_000 });
  const results = [];
  for (let i = 0; i < 6; i++) results.push(await limiter.allow('ip', 1000 + i));
  assert.deepEqual(results, [true, true, true, true, true, false]);
});

test('provider rejection keeps the input', async () => {
  const { g } = gateway({ send: async () => false });
  const r = await processInquiry(valid(), g);
  assert.equal(r.message, messages.failed);
  assert.equal(r.values?.name, 'Jordan Rivera');
});

test('limiter outage fails closed', async () => {
  const { g, sent } = gateway({
    allowed: async () => {
      throw new Error('down');
    },
  });
  const r = await processInquiry(valid(), g);
  assert.equal(r.status, 'error');
  assert.equal(sent.length, 0);
});

test('unknown service values are rejected', async () => {
  const { g } = gateway();
  const f = valid();
  f.append('services', 'roofing');
  const r = await processInquiry(f, g);
  assert.ok(r.errors?.services);
});

test('instant submissions (time trap) are dropped silently', async () => {
  const { g, sent } = gateway();
  const f = valid();
  f.set('started', '1000000');
  const r = await processInquiry(f, g, 1_000_000 + MIN_FILL_MS - 1);
  assert.equal(r.status, 'success');
  assert.equal(sent.length, 0);
});

test('a normal fill time is delivered', async () => {
  const { g, sent } = gateway();
  const f = valid();
  f.set('started', '1000000');
  await processInquiry(f, g, 1_000_000 + 30_000);
  assert.equal(sent.length, 1);
});

test('line breaks in the name (header injection) are rejected', async () => {
  const { g, sent } = gateway();
  const f = valid();
  f.set('name', 'Jordan\r\nBcc: victim@example.com');
  const r = await processInquiry(f, g);
  assert.ok(r.errors?.name);
  assert.equal(sent.length, 0);
});

test('a fast but invalid submission still gets real field errors', async () => {
  const { g, sent } = gateway();
  const f = valid();
  f.set('started', '1000000');
  f.set('name', 'J');
  const r = await processInquiry(f, g, 1_000_000 + 500);
  assert.equal(r.status, 'error');
  assert.ok(r.errors?.name);
  assert.equal(sent.length, 0);
});
