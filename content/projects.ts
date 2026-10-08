import { projectPhotos, type ProjectPhotos } from './assets';

// Verbatim from nycentralcomfort.net/gallery.html ("Completed Projects").
export type Project = {
  id: keyof typeof projectPhotos;
  title: string;
  location: string;
  description: string;
  type: string;
} & ProjectPhotos;

export const projects: Project[] = [
  {
    id: 'broadway-1776',
    title: '1776 Broadway',
    location: '1776 Broadway, New York',
    description: 'HVAC installation for commercial building.',
    type: 'Commercial',
    ...projectPhotos['broadway-1776'],
  },
  {
    id: 'broadway-512',
    title: '512 Broadway',
    location: '512 Broadway, New York',
    description: 'Unit Replacements',
    type: 'Commercial',
    ...projectPhotos['broadway-512'],
  },
  {
    id: 'queens-school',
    title: 'NYC Muslim School',
    location: '90-20 191 St, Queens',
    description: 'HVAC Installation',
    type: 'Education',
    ...projectPhotos['queens-school'],
  },
];
