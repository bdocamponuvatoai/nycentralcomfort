import { photos, type Photo } from './assets';

// "How it works". Steps restate what the current site says (free quotes by phone, certified
// technicians, doing the job right the first time, regular maintenance and annual inspections).
// Confirm the wording with the client before launch.
export type Step = { title: string; body: string; photo: Photo };

export const steps: Step[] = [
  {
    title: 'Request a quote',
    body: 'Call (646) 509-9678 or send the form. Tell us about your home or building and what you need. Quotes are free.',
    photo: photos.stepAssess,
  },
  {
    title: 'Plan the right system',
    body: 'A certified technician reviews your space and recommends the right solution for comfort, efficiency and budget.',
    photo: photos.stepPlan,
  },
  {
    title: 'Install or repair',
    body: 'Our team does the work with high-quality workmanship and a commitment to doing the job right the first time.',
    photo: photos.stepInstall,
  },
  {
    title: 'Keep it running',
    body: 'Regular maintenance and annual inspections keep your system efficient and help prevent breakdowns.',
    photo: photos.stepMaintain,
  },
];
