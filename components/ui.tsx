import Link from 'next/link';
import Image from 'next/image';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import {
  AirVent,
  ArrowRight,
  Factory,
  HeartHandshake,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Snowflake,
  ThermometerSun,
  Wind,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

import type { Photo as PhotoData } from '@/content/assets';
import type { ServiceIcon } from '@/content/services';
import type { ValueIcon } from '@/content/site';

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx('mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10', className)}>{children}</div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('eyebrow', className)}>{children}</p>;
}

export function Arrow({ size = 16 }: { size?: number }) {
  return (
    <span className="arrow" aria-hidden="true">
      <ArrowRight size={size} strokeWidth={1.75} />
    </span>
  );
}

type ButtonProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'sm';
  arrow?: boolean;
  className?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Link
      {...rest}
      className={cx(
        'btn',
        variant === 'primary' ? 'btn-primary' : 'btn-ghost',
        size === 'sm' && 'btn-sm',
        className,
      )}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Photo({
  photo,
  sizes,
  className,
  imgClassName,
  eager,
  reveal = true,
  style,
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Above-the-fold image: load immediately with high fetch priority (Next 16 replaces `priority`). */
  eager?: boolean;
  reveal?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className={cx('photo', className)} data-reveal-photo={reveal ? '' : undefined} style={style}>
      <Image
        src={photo.src}
        alt={photo.alt}
        sizes={sizes}
        placeholder="blur"
        loading={eager ? 'eager' : undefined}
        fetchPriority={eager ? 'high' : undefined}
        className={cx('h-full w-full object-cover', imgClassName)}
      />
    </div>
  );
}

/** Brand mark: a house split into warm orange (flame) and cool blue (snowflake), after the client logo. */
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <defs>
        <clipPath id="nyc-house">
          <path d="M24 3.5 45.5 21.5H41V45H7V21.5H2.5Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#nyc-house)">
        <rect width="48" height="48" fill="var(--sky)" />
        <path d="M0 0H48V12L0 40Z" fill="var(--pop)" />
      </g>
      <path
        d="M31 11c3.6 2.7 4.6 6.8 1.9 9.6-1.2 1.3-3.1 1.6-4.4.7 1.9-.4 2.8-2 2.4-3.7-.4-1.9-1.9-2.6-1.6-5 .3 1.3 1 2 1.7 2-.6-1.2-.6-2.4 0-3.6Z"
        fill="#fff"
      />
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
        <path d="M15 28.5v11M10.2 31.2l9.6 5.6M19.8 31.2l-9.6 5.6" />
        <path d="M13.4 29.5 15 31l1.6-1.5M13.4 38.5 15 37l1.6 1.5" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="text-[1.02rem] font-semibold tracking-[-0.03em]">NY Central</span>
        <span className="mt-0.5 text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
          Comfort
        </span>
      </span>
    </span>
  );
}

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  snowflake: Snowflake,
  thermometer: ThermometerSun,
  duct: AirVent,
  wrench: Wrench,
  wind: Wind,
  tower: Factory,
};

const valueIcons: Record<ValueIcon, LucideIcon> = {
  heart: HeartHandshake,
  shield: ShieldCheck,
  sparkles: Lightbulb,
  leaf: Leaf,
};

export function IconBadge({
  icon,
  kind = 'service',
  className,
}: {
  icon: ServiceIcon | ValueIcon;
  kind?: 'service' | 'value';
  className?: string;
}) {
  const Icon = kind === 'service' ? serviceIcons[icon as ServiceIcon] : valueIcons[icon as ValueIcon];
  return (
    <span
      className={cx(
        'inline-grid size-12 place-items-center rounded-full bg-[rgb(255_128_15/0.12)] text-accent',
        className,
      )}
      aria-hidden="true"
    >
      <Icon size={22} strokeWidth={1.5} />
    </span>
  );
}

export function Breadcrumbs({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
