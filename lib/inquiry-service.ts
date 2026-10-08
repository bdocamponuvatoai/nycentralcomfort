import { formToObject, inquirySchema, type Inquiry, type InquiryField, type InquiryState } from './schema.ts';

export type InquiryGateway = {
  configured(): boolean;
  allowed(): Promise<boolean>;
  send(inquiry: Inquiry): Promise<boolean>;
};

export const messages = {
  success: "Thank you. Your request has been sent. We'll get back to you shortly.",
  invalid: 'Please check the highlighted fields.',
  notConfigured:
    'Our online form is not connected yet, so your message was not sent. Please call (646) 509-9678 or email info@nycentralcomfort.net.',
  tooMany: 'Too many requests from this connection. Please wait a little or call (646) 509-9678.',
  failed: 'We could not send your message right now. Please try again, or call (646) 509-9678.',
} as const;

/** Submissions faster than this after the form appeared are treated as bots. */
export const MIN_FILL_MS = 2500;

/**
 * Honeypot → validate → time trap → configured → rate limit → send. Success only when the provider confirms.
 * Validation runs before the time trap so a person who submits an incomplete form quickly always sees
 * real field errors, never a silent "received".
 */
export async function processInquiry(
  formData: FormData,
  gateway: InquiryGateway,
  now = Date.now(),
): Promise<InquiryState> {
  const values = formToObject(formData);

  // Bots fill the hidden "website" field. Pretend success, send nothing.
  const honeypot = formData.get('website');
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return { status: 'success', message: messages.success };
  }

  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    const errors: Partial<Record<InquiryField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as InquiryField;
      errors[key] ??= key === 'services' ? 'Please choose from the listed services.' : issue.message;
    }
    return { status: 'error', message: messages.invalid, errors, values };
  }

  // Time trap: the browser records when the form appeared. A complete, valid form sent within a couple of
  // seconds is a bot. Pretend success, send nothing.
  const started = Number(formData.get('started'));
  if (Number.isFinite(started) && started > 0 && now - started < MIN_FILL_MS) {
    return { status: 'success', message: messages.success };
  }

  if (!gateway.configured()) return { status: 'error', message: messages.notConfigured, values };

  try {
    if (!(await gateway.allowed())) return { status: 'error', message: messages.tooMany, values };
  } catch {
    return { status: 'error', message: messages.failed, values };
  }

  try {
    const delivered = await gateway.send(parsed.data);
    if (!delivered) return { status: 'error', message: messages.failed, values };
  } catch {
    return { status: 'error', message: messages.failed, values };
  }

  return { status: 'success', message: messages.success };
}
