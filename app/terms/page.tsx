import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { Legal } from '@/components/sections/Legal';

export const metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: 'Terms for using the NY Central Comfort website (draft).',
  path: '/terms',
  noindex: true,
});

export default function TermsPage() {
  return (
    <Legal title="Terms & Conditions" path="/terms">
      <h2>Using this website</h2>
      <p>
        This website gives general information about the HVAC services offered by {site.name}. It is not a
        binding offer. Quotes, scope, pricing and warranties are confirmed in writing for each job.
      </p>
      <h2>Quotes</h2>
      <p>
        Free quotes are estimates based on the information provided and may change after an on-site
        assessment.
      </p>
      <h2>Photos</h2>
      <p>
        Project photos show work completed by our team. Some illustrative images on this site are
        representative scenes, not specific customer jobs.
      </p>
      <h2>Contact</h2>
      <p>
        {site.name}, {site.address.street}, {site.address.city}, {site.address.region}{' '}
        {site.address.postalCode}. <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </Legal>
  );
}
