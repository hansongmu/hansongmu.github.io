'use client';

import { useEffect, useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

/* ai-app ImageZoom과 동일한 라이트박스 — radix 없이 같은 룩앤필/동작을 재현 */
export function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
        {/* 정적 export: next/image 대신 일반 img 사용 */}
        <img
          src={src}
          alt={alt}
          className="w-full cursor-zoom-in"
          onClick={() => setOpen(true)}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-neutral-400">
          {caption}
        </figcaption>
      )}
      {open && (
        <div role="dialog" aria-modal="true" aria-label="이미지 확대 보기">
          <div
            className="fixed inset-0 z-[9998] cursor-pointer bg-black/80 animate-[image-zoom-fade-in_0.2s_ease-out]"
            onClick={() => setOpen(false)}
          />
          <button
            type="button"
            aria-label="닫기"
            className="fixed right-5 top-5 z-[10001] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none h-5 w-5"
            >
              <path
                d="M5.5 5.5l9 9m0-9l-9 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-[5vw] py-[5vh] outline-none"
            onClick={() => setOpen(false)}
          >
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="block h-auto w-auto max-h-[90vh] max-w-[90vw] cursor-default rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </figure>
  );
}
