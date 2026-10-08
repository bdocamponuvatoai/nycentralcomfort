import { about, site } from '@/content/site';
import { services } from '@/content/services';
import { projects } from '@/content/projects';
import { absolute } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const body = `# ${site.name}

> ${site.description}

- Phone: ${site.phone}
- Email: ${site.email}
- Address: ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}
- Area served: ${site.areaServed}

## About
${about.intro}

## Services
${services.map((s) => `- [${s.name}](${absolute(`/services/${s.id}`)}): ${s.body}`).join('\n')}

## Completed projects
${projects.map((p) => `- ${p.location}: ${p.description}`).join('\n')}

## Pages
- [About](${absolute('/about')})
- [Gallery](${absolute('/gallery')})
- [Contact](${absolute('/contact')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
