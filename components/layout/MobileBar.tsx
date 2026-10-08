import Link from 'next/link';
import { Phone } from 'lucide-react';

import { cta, site } from '@/content/site';

/** Phone-only bottom bar: the two actions HVAC visitors need most. No JavaScript. */
export function MobileBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="glass fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-2 rounded-full p-1.5 sm:hidden"
    >
      <a href={site.phoneHref} className="btn btn-ghost btn-sm flex-1 bg-white">
        <Phone size={16} strokeWidth={1.75} aria-hidden="true" /> Call
      </a>
      <Link href="/contact" className="btn btn-primary btn-sm flex-[1.4]">
        {cta.primary}
      </Link>
    </nav>
  );
}
