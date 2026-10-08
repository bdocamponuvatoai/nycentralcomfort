import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { Legal } from '@/components/sections/Legal';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How NY Central Comfort handles the information you share through this website (draft).',
  path: '/privacy',
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <Legal title="Privacy Policy" path="/privacy">
      <h2>What we collect</h2>
      <p>
        When you send a request through our contact form we receive your name, email address, optional phone
        number, the services you selected and your message. We use this only to reply to you and to provide
        the service you ask about.
      </p>
      <h2>How we store it</h2>
      <p>
        Form messages are delivered to our business email inbox through an email delivery provider. We do not
        sell or rent your information.
      </p>
      <h2>Analytics</h2>
      <p>We may use privacy-friendly, cookie-free analytics to understand which pages are visited.</p>
      <h2>Contact</h2>
      <p>
        Questions about your information? Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
        <a href={site.phoneHref}>{site.phone}</a>.
      </p>
    </Legal>
  );
}
