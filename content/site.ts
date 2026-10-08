// All copy is taken from nycentralcomfort.net. Change words here, never in components.

export const site = {
  name: 'NY Central Comfort',
  shortName: 'NY Central',
  tagline: 'Your comfort is our priority.',
  description:
    'NY Central Comfort offers trusted air conditioning and heating services across NYC: installation, repair, maintenance, ductwork and indoor air quality.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nycentralcomfort.net',
  phone: '(646) 509-9678',
  phoneHref: 'tel:+16465099678',
  email: 'info@nycentralcomfort.net',
  address: {
    street: '1870 W 3rd St',
    city: 'Brooklyn',
    region: 'NY',
    postalCode: '11223',
    country: 'US',
  },
  areaServed: 'New York City',
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact Us' },
] as const;

export const cta = {
  primary: 'Request a Quote',
  secondary: 'Explore Our Services',
  call: 'Call us today to get a free quote!',
} as const;

export const hero = {
  eyebrow: 'Heating & cooling across New York City',
  lines: ['Reliable', 'Heating & Cooling', 'Solutions for', 'Your Home'],
  accentLine: 1,
  lead: 'From repairs to annual inspections, we ensure your systems work efficiently to keep you comfortable in every season.',
  assurances: ['Free quotes', 'Certified technicians', 'Over 10 years in NYC'],
  badge: 'Homes & businesses across NYC',
} as const;

export const facts = [
  { value: '10+', label: 'Years serving New York City' },
  { value: 'All NYC', label: 'Residential and commercial clients' },
  { value: 'Certified', label: 'Expert technicians' },
  { value: 'Free', label: 'Quotes, by phone or online' },
] as const;

export const welcome = {
  eyebrow: 'Welcome to NY Central Comfort',
  heading: ['Your trusted', 'HVAC provider.'],
  body: 'At NY Central Comfort, we offer a range of services including AC installations, repairs, and maintenance. Our technicians are certified and committed to providing excellent service with a customer-focused approach.',
  points: [
    {
      title: 'Expert Technicians',
      body: 'Certified, experienced and equipped for any HVAC project, big or small.',
    },
    {
      title: 'High-Quality Services',
      body: 'Competitive pricing, timely service and a commitment to doing the job right the first time.',
    },
  ],
} as const;

export const about = {
  intro:
    'NY Central Comfort has been proudly serving New York City for over a decade, providing top-tier HVAC services for both residential and commercial clients. Our commitment to excellence, reliability, and customer satisfaction has established us as a trusted name in the industry.',
  mission:
    'Our mission is to enhance indoor comfort by delivering high-quality HVAC services that prioritize efficiency, sustainability, and affordability. We strive to exceed customer expectations through innovative solutions and exceptional service.',
  missionShort: [
    'We enhance indoor comfort with HVAC work that is',
    'efficient, sustainable and affordable.',
  ],
  values: [
    {
      icon: 'heart',
      title: 'Customer Satisfaction',
      body: 'We go the extra mile to ensure our clients are happy with our services.',
    },
    {
      icon: 'shield',
      title: 'Integrity',
      body: 'Honesty and transparency are at the core of our business practices.',
    },
    {
      icon: 'sparkles',
      title: 'Innovation',
      body: 'We adopt the latest HVAC technologies to provide superior results.',
    },
    {
      icon: 'leaf',
      title: 'Environmental Responsibility',
      body: 'Our solutions focus on energy efficiency to reduce environmental impact.',
    },
  ],
  whyUs:
    'Choosing NY Central Comfort means choosing peace of mind. Our team of certified technicians is equipped with the skills and experience to handle any HVAC project, big or small. We offer competitive pricing, timely service, and a commitment to doing the job right the first time.',
  alsoOffered: ['Emergency HVAC Repairs', 'Energy Efficiency Consultations'],
} as const;

export const contactCopy = {
  heading: 'Get in Touch',
  lead: 'Feel free to reach out to us for any inquiries or services you may need.',
  support:
    "Reach out to NY Central Comfort for all your heating and cooling service needs in New York City. We're here to help you 24/7 with any HVAC issues.",
} as const;

export type ValueIcon = (typeof about.values)[number]['icon'];
