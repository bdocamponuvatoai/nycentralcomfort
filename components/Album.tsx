'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { Photo } from '@/content/assets';

/** Photo grid. Each tile links to the full image (works without JS); with JS it opens a lightbox. */
export function Album({ photos, title }: { photos: Photo[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = photos[index]!;

  const open = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex(i);
    dialog.current?.showModal();
  };
  const step = (d: number) => setIndex((i) => (i + d + photos.length) % photos.length);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {photos.map((p, i) => (
          <li key={p.src.src} data-reveal>
            <a href={p.src.src} onClick={open(i)} className="lift block rounded-[1.4rem]">
              <span className="sr-only">
                Open photo {i + 1} of {photos.length} from {title}:{' '}
              </span>
              <span className="photo block aspect-[4/3] rounded-[1.4rem]">
                <Image
                  src={p.src}
                  alt={p.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 420px, 50vw"
                  className="h-full w-full object-cover"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${title} photos`}
        className="m-auto h-dvh max-h-none w-full max-w-none bg-[rgb(250_247_242/0.97)] p-0 backdrop:bg-[rgb(11_22_56/0.25)]"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        <div className="flex h-full flex-col p-4 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-muted" aria-live="polite">
              {title} · {index + 1} / {photos.length}
            </p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-semibold shadow-[0_0_0_1px_var(--line)]"
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" /> Close
            </button>
          </div>
          <figure className="relative mt-4 min-h-0 flex-1">
            <Image
              key={current.src.src}
              src={current.src}
              alt={current.alt}
              placeholder="blur"
              sizes="100vw"
              className="h-full w-full rounded-2xl object-contain"
            />
          </figure>
          <p className="mt-4 text-center text-sm text-muted">{current.alt}</p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="grid size-12 place-items-center rounded-full bg-white shadow-[0_0_0_1px_var(--line)]"
            >
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="grid size-12 place-items-center rounded-full bg-white shadow-[0_0_0_1px_var(--line)]"
            >
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
