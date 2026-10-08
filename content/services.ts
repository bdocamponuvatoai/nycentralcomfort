import { photos, serviceDetails, type Photo } from './assets';
import type { ServiceId } from './service-ids';

// Descriptions are verbatim from nycentralcomfort.net/service.html.
export type ServiceIcon = 'snowflake' | 'thermometer' | 'duct' | 'wrench' | 'wind' | 'tower';

export type Service = {
  id: ServiceId;
  name: string;
  short: string;
  body: string;
  capabilities: string[];
  icon: ServiceIcon;
  photo: Photo;
  detail: Photo;
};

const list: Omit<Service, 'detail'>[] = [
  {
    id: 'ac-installation',
    name: 'AC Installation',
    short: 'Stay cool and comfortable all summer.',
    body: 'We provide professional air conditioning installation services to ensure you stay cool and comfortable during the summer months.',
    capabilities: ['Ductless mini-splits', 'Central air conditioning', 'Unit replacements'],
    icon: 'snowflake',
    photo: photos.acInstallation,
  },
  {
    id: 'heating-cooling',
    name: 'Heating & Cooling Services',
    short: 'Year-round comfort for your home or business.',
    body: 'Our heating and cooling services provide year-round comfort for your home or business. We offer expert AC installations, repairs, and maintenance to keep you cool in the summer, along with reliable heating solutions to stay warm during winter. Our team ensures your HVAC systems run efficiently with high-quality workmanship and personalized care.',
    capabilities: ['Heating installation and service', 'AC repairs', 'Seasonal maintenance'],
    icon: 'thermometer',
    photo: photos.heatingCooling,
  },
  {
    id: 'ductwork',
    name: 'Ductwork Installation',
    short: 'Custom ductwork for efficient airflow.',
    body: "Ductwork installation is a crucial component of any HVAC system, ensuring efficient airflow throughout your home or business. Our expert technicians design and install high-quality ductwork tailored to your property's layout, improving indoor air quality, optimizing energy efficiency, and enhancing overall comfort. We use durable materials and precise techniques to minimize energy loss and maintain system performance.",
    capabilities: ['Designed for your layout', 'Durable materials', 'Precise, low-loss installation'],
    icon: 'duct',
    photo: photos.ductwork,
  },
  {
    id: 'maintenance-repair',
    name: 'Maintenance & Repair',
    short: 'Systems that keep running smoothly.',
    body: 'Our experienced technicians provide regular maintenance and emergency repair services to ensure your HVAC systems are always running smoothly.',
    capabilities: ['Annual inspections', 'Emergency HVAC repairs', 'Preventive maintenance'],
    icon: 'wrench',
    photo: photos.maintenance,
  },
  {
    id: 'indoor-air-quality',
    name: 'Indoor Air Quality',
    short: 'A healthier home or office.',
    body: 'We help improve your indoor air quality with air filtration systems and regular duct cleaning, ensuring a healthier living environment for your home or office.',
    capabilities: ['Air filtration systems', 'Duct cleaning', 'Filter replacement'],
    icon: 'wind',
    photo: photos.airQuality,
  },
  {
    id: 'cooling-towers',
    name: 'Cooling Tower Services',
    short: 'Fewer breakdowns, efficient all year.',
    body: 'Our cooling tower services help prevent breakdowns and ensure your systems are functioning efficiently year-round.',
    capabilities: ['Inspections', 'Maintenance', 'Repairs'],
    icon: 'tower',
    photo: photos.coolingTower,
  },
];

export const services: Service[] = list.map((s) => ({ ...s, detail: serviceDetails[s.id] }));

export const getService = (id: string) => services.find((s) => s.id === id);
