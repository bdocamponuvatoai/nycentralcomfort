// Kept free of image imports so server validation and unit tests can load it on their own.
export const serviceIds = [
  'ac-installation',
  'heating-cooling',
  'ductwork',
  'maintenance-repair',
  'indoor-air-quality',
  'cooling-towers',
] as const;

export type ServiceId = (typeof serviceIds)[number];
