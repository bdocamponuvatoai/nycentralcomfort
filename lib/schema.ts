import { z } from 'zod';

import { serviceIds } from '../content/service-ids.ts';

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(100, 'Please keep your name under 100 characters.')
    // No line breaks or angle brackets: the name is used in the email subject line.
    .regex(/^[^\r\n<>]+$/, 'Please use letters only in your name.'),
  email: z.string().trim().max(200).pipe(z.email('Please enter a valid email address.')),
  phone: z
    .string()
    .trim()
    .max(30, 'Please check the phone number.')
    .refine((v) => v === '' || /^[+()\d\s.-]{7,}$/.test(v), 'Please check the phone number.'),
  services: z.array(z.enum(serviceIds)).max(serviceIds.length),
  message: z
    .string()
    .trim()
    .min(20, 'Please tell us a little more (at least 20 characters).')
    .max(3000, 'Please keep your message under 3000 characters.'),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export type InquiryField = keyof Inquiry;

export type InquiryState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<InquiryField, string>>;
  values?: Partial<Record<InquiryField, string | string[]>>;
};

export function formToObject(formData: FormData) {
  const text = (key: string) => {
    const v = formData.get(key);
    return typeof v === 'string' ? v : '';
  };
  return {
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    services: formData.getAll('services').filter((v): v is string => typeof v === 'string'),
    message: text('message'),
  };
}
