'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Menu, Phone, X } from 'lucide-react';

import { cta, nav, site } from '@/content/site';
import { services } from '@/content/services';
import { Arrow, Logo, cx } from '@/components/ui';

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialog.current?.showModal();
    document.documentElement.classList.add('menu-open');
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    const el = dialog.current;
    const onClose = () => document.documentElement.classList.remove('menu-open');
    el?.addEventListener('close', onClose);
    return () => el?.removeEventListener('close', onClose);
  }, []);

  // Close the menu after navigating.
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="glass mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 rounded-full pr-2 pl-4 sm:pl-5">
        <Link href="/" aria-label={`${site.name}, home`} className="rounded-full">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1).map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      'inline-flex min-h-11 items-center rounded-full px-4 text-[0.92rem] transition-colors',
                      active
                        ? 'bg-white text-ink shadow-[0_0_0_1px_var(--line)]'
                        : 'text-muted hover:text-ink',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden min-h-11 items-center gap-2 rounded-full px-3 text-[0.92rem] font-semibold md:inline-flex"
          >
            <Phone size={16} strokeWidth={1.75} className="text-accent" aria-hidden="true" />
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            {cta.primary}
          </Link>
          <button
            type="button"
            onClick={open}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.92rem] font-semibold shadow-[inset_0_0_0_1px_var(--line)] lg:hidden"
            aria-haspopup="dialog"
          >
            <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
            Menu
          </button>
        </div>
      </div>

      <dialog ref={dialog} className="menu-dialog" aria-label="Menu">
        <div className="flex min-h-full flex-col px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" onClick={close} aria-label={`${site.name}, home`}>
              <Logo />
            </Link>
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-semibold shadow-[inset_0_0_0_1px_var(--line)]"
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
              Close
            </button>
          </div>

          <nav aria-label="Menu" className="mt-8">
            <ul>
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="enter border-b border-line" style={{ ['--i' as string]: i }}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? 'page' : undefined}
                      className="flex min-h-16 items-center justify-between py-3 text-[clamp(1.9rem,8vw,3rem)] font-semibold tracking-[-0.04em]"
                    >
                      {item.label}
                      {active && <span className="size-2.5 rounded-full bg-pop" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-8">
            <p className="text-sm font-semibold text-muted">Services</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    onClick={close}
                    className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm shadow-[0_0_0_1px_var(--line)]"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-10">
            <Link href="/contact" onClick={close} className="btn btn-primary w-full">
              {cta.primary} <Arrow />
            </Link>
            <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm text-muted">
              <a href={site.phoneHref} className="min-h-11 py-3 font-semibold text-ink">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="min-h-11 py-3">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </dialog>

      <noscript>
        <nav aria-label="Main (no script)" className="mx-auto mt-2 max-w-[1320px] lg:hidden">
          <ul className="glass flex flex-wrap justify-center gap-1 rounded-3xl p-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center px-3">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </noscript>
    </header>
  );
}
