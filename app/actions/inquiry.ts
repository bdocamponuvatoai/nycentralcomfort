'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';

import { site } from '@/content/site';
import { services } from '@/content/services';
import { processInquiry, type InquiryGateway } from '@/lib/inquiry-service';
import { createLimiter } from '@/lib/limiter';
import type { Inquiry, InquiryState } from '@/lib/schema';

const limiter = createLimiter();

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function renderEmail(i: Inquiry) {
  const names =
    i.services.map((id) => services.find((s) => s.id === id)?.name ?? id).join(', ') || 'Not specified';
  const rows: [string, string][] = [
    ['Name', i.name],
    ['Email', i.email],
    ['Phone', i.phone || 'Not given'],
    ['Services', names],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${i.message}`;
  const html = `<div style="font-family:system-ui,sans-serif;color:#0b1638">
<h2 style="margin:0 0 16px">New quote request</h2>
<table>${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5a6178">${k}</td><td>${escape(v)}</td></tr>`).join('')}</table>
<p style="white-space:pre-wrap;margin-top:16px">${escape(i.message)}</p></div>`;
  return { text, html };
}

async function clientKey() {
  if (!process.env.VERCEL) return 'local';
  const h = await headers();
  return (h.get('x-vercel-forwarded-for') ?? h.get('x-forwarded-for') ?? 'unknown').split(',')[0]!.trim();
}

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL ?? site.email;

  const gateway: InquiryGateway = {
    configured: () => Boolean(apiKey && from && to),
    allowed: async () => limiter.allow(await clientKey()),
    send: async (inquiry) => {
      const resend = new Resend(apiKey);
      const { text, html } = renderEmail(inquiry);
      const { data, error } = await resend.emails.send({
        from: from!,
        to: [to],
        replyTo: inquiry.email,
        subject: `Quote request from ${inquiry.name}`,
        text,
        html,
      });
      return !error && Boolean(data?.id);
    },
  };

  return processInquiry(formData, gateway);
}
