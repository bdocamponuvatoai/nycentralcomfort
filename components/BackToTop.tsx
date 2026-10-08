'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { cx } from '@/components/ui';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cx(
        'glass fixed right-4 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] sm:bottom-6 z-40 grid size-12 place-items-center rounded-full transition-[opacity,translate] duration-500 sm:right-6 sm:size-14',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp size={20} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
