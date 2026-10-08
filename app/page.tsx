import { site } from '@/content/site';
import { pageMetadata, webPageLd } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  Facts,
  Hero,
  Mission,
  ProjectsPreview,
  ServicesGrid,
  Welcome,
  WhyUs,
} from '@/components/sections/Home';
import { Inquiry } from '@/components/sections/Inquiry';
import { Faq } from '@/components/sections/Faq';
import { Process } from '@/components/sections/Process';

export const metadata = pageMetadata({ description: site.description, path: '/' });

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageLd('WebPage', '/', site.name, site.description)} />
      <Hero />
      <Facts />
      <Welcome />
      <ServicesGrid />
      <Mission />
      <Process />
      <WhyUs />
      <ProjectsPreview />
      <Faq />
      <Inquiry />
    </>
  );
}
