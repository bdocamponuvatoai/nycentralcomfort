import type { StaticImageData } from 'next/image';

import h1Desktop from '@/media/h1-desktop.webp';
import h1Mobile from '@/media/h1-mobile.webp';
import s1 from '@/media/s1-ac-installation.webp';
import s2 from '@/media/s2-heating-cooling.webp';
import s3 from '@/media/s3-ductwork.webp';
import s4 from '@/media/s4-maintenance-repair.webp';
import s5 from '@/media/s5-air-quality.webp';
import s6 from '@/media/s6-cooling-tower.webp';
import p1 from '@/media/project1.webp';
import p1a from '@/media/project1-1.webp';
import p1b from '@/media/project1-2.webp';
import p1c from '@/media/project1-3.webp';
import p1d from '@/media/project1-4.webp';
import p1e from '@/media/project1-5.webp';
import p1f from '@/media/project1-6.webp';
import p2a from '@/media/project2-2.webp';
import p2b from '@/media/project2-4.webp';
import p2c from '@/media/project2-6.webp';
import p2d from '@/media/project2-7.webp';
import p2e from '@/media/project2-9.webp';
import p2f from '@/media/project2-10.webp';
import p3 from '@/media/project3.webp';
import p3a from '@/media/project3-7.webp';
import p3b from '@/media/project3-10.webp';
import p3c from '@/media/project3-11.webp';
import p3d from '@/media/project3-8.webp';
import p3e from '@/media/project3-2.webp';
import p3f from '@/media/project3-4.webp';
import p3g from '@/media/project3-5.webp';
import miniSplit from '@/media/real-minisplit.webp';
import e1 from '@/media/e1-team.webp';
import c1 from '@/media/c1-quote.webp';
import w1 from '@/media/w1-projects.webp';
import nf from '@/media/nf-empty.webp';
import m1 from '@/media/m1-assess.webp';
import m2 from '@/media/m2-plan.webp';
import m3 from '@/media/m3-install.webp';
import m4 from '@/media/m4-maintain.webp';
import pAbout from '@/media/p-about.webp';
import pServices from '@/media/p-services.webp';
import pGallery from '@/media/p-gallery.webp';
import pContact from '@/media/p-contact.webp';
import d1 from '@/media/s1-detail.webp';
import d2 from '@/media/s2-detail.webp';
import d3 from '@/media/s3-detail.webp';
import d4 from '@/media/s4-detail.webp';
import d5 from '@/media/s5-detail.webp';
import d6 from '@/media/s6-detail.webp';

export type Photo = { src: StaticImageData; alt: string };

const photo = (src: StaticImageData, alt: string): Photo => ({ src, alt });

export const photos = {
  heroDesktop: photo(
    h1Desktop,
    'A technician on a step ladder levels a white ductless mini-split above tall windows in a sunlit New York living room.',
  ),
  heroMobile: photo(
    h1Mobile,
    'A technician on a step ladder fits a white ductless mini-split on the wall of a bright apartment.',
  ),
  acInstallation: photo(
    s1,
    'A technician in orange gloves connects the line set on a new outdoor condensing unit on a brick terrace.',
  ),
  heatingCooling: photo(
    s2,
    'A technician kneels to service a wall-hung boiler with copper piping in a bright, white mechanical room.',
  ),
  ductwork: photo(
    s3,
    'A technician on a ladder fixes silver spiral ductwork to the ceiling of a bright loft office with tall windows.',
  ),
  maintenance: photo(
    s4,
    'A technician tests the inside of an open outdoor AC unit with a multimeter in a sunny backyard.',
  ),
  airQuality: photo(
    s5,
    'A technician fits a fresh white air filter into a return-air grille in a bright hallway.',
  ),
  coolingTower: photo(
    s6,
    'A technician in a hard hat inspects an open cooling tower on a New York rooftop on a clear morning.',
  ),
  realMiniSplit: photo(
    miniSplit,
    'NY Central Comfort technicians installing ductless mini-splits in a newly finished, sunlit home.',
  ),
  team: photo(
    e1,
    'A technician carrying a tool bag and a coil of line set walks up a sunlit brownstone street.',
  ),
  quote: photo(c1, 'A technician with a tool bag and shoe covers is welcomed into a sunlit Brooklyn home.'),
  rooftop: photo(
    w1,
    'A neat row of newly installed condensing units on a Manhattan rooftop, with the skyline beyond.',
  ),
  emptyWall: photo(
    nf,
    'An empty ivory wall with a mounting bracket waiting for a mini-split, a tool bag on the floor.',
  ),
  stepAssess: photo(
    m1,
    'A technician sketches a floor plan on a tablet while a homeowner points at the wall.',
  ),
  stepPlan: photo(
    m2,
    'Hands drawing a room layout on a tablet on a sunlit kitchen table beside a coffee and tape measure.',
  ),
  stepInstall: photo(
    m3,
    'Gloved hands tightening a copper line set connection on a mini-split with a torque wrench.',
  ),
  stepMaintain: photo(
    m4,
    'A technician closes the service panel of a clean outdoor unit on a rooftop at sunset.',
  ),
  bannerAbout: photo(
    pAbout,
    'Three technicians carrying tool bags walk across a Manhattan rooftop toward a row of HVAC units.',
  ),
  bannerServices: photo(
    pServices,
    'A technician reaches into a neatly organised work van full of fittings, filters and gauges.',
  ),
  bannerGallery: photo(
    pGallery,
    'A finished, spotless mechanical room with a new air handling unit and insulated ductwork.',
  ),
  bannerContact: photo(
    pContact,
    'A bright, comfortable New York living room with a white mini-split above the sofa.',
  ),
} as const;

export const serviceDetails = {
  'ac-installation': photo(d1, 'Close-up of a white ductless mini-split on an ivory wall in warm sunlight.'),
  'heating-cooling': photo(d2, 'A hand turns a minimal round thermostat on a warm ivory wall.'),
  ductwork: photo(d3, 'Close-up of a sealed spiral duct joint with aviation snips resting on top.'),
  'maintenance-repair': photo(d4, 'A manifold gauge set connected to the service valves of an outdoor unit.'),
  'indoor-air-quality': photo(d5, 'Gloved hands hold a fresh white pleated air filter in soft window light.'),
  'cooling-towers': photo(
    d6,
    'Water flows over the fill media of an open cooling tower as a technician takes a sample.',
  ),
} as const;

export type ProjectPhotos = { cover: Photo; album: Photo[] };

export const projectPhotos: Record<'broadway-1776' | 'broadway-512' | 'queens-school', ProjectPhotos> = {
  'broadway-1776': {
    cover: photo(
      p1,
      'New silver spiral ductwork and supply grilles across a bright office floor at 1776 Broadway.',
    ),
    album: [
      photo(p1a, 'Spiral ductwork running along a white office ceiling beside tall windows.'),
      photo(p1c, 'Ductwork branching to supply grilles above glass-walled offices.'),
      photo(p1d, 'A long duct run over an open office with new partitions.'),
      photo(p1e, 'Supply grilles and spiral duct above an office kitchen area.'),
      photo(p1b, 'A ceiling-mounted supply grille and duct over a bright office corner.'),
      photo(p1f, 'Finished ductwork over an open office floor during fit-out.'),
    ],
  },
  'broadway-512': {
    cover: photo(p2a, 'The crew moving a new HVAC unit through a bright office at 512 Broadway.'),
    album: [
      photo(p2b, 'A technician on a ladder connecting a ceiling-hung replacement unit.'),
      photo(p2c, 'Technicians working on a new ceiling-hung unit on ladders.'),
      photo(p2d, 'A new unit hung from steel supports under the ceiling.'),
      photo(p2e, 'A replacement unit and ductwork suspended from the ceiling.'),
      photo(p2f, 'A replacement unit mounted on strut channel under the ceiling.'),
    ],
  },
  'queens-school': {
    cover: photo(p3, 'Rows of new VRF outdoor units on the school roof at 90-20 191 St, Queens.'),
    album: [
      photo(p3a, 'An outdoor unit on the school roof overlooking the Queens neighbourhood.'),
      photo(p3b, 'Insulated rooftop ductwork running along the school building.'),
      photo(p3c, 'Two outdoor units mounted on the roof parapet wall.'),
      photo(p3d, 'Insulated ductwork rising along the brick wall to the roof.'),
      photo(p3e, 'New refrigerant piping and ductwork above a classroom ceiling.'),
      photo(p3f, 'Ductwork and piping above the new ceiling grid.'),
      photo(p3g, 'A wall-mounted controller installed in a classroom.'),
    ],
  },
};
