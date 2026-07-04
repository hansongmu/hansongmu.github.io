'use client';

import { useEffect, useRef, useState } from 'react';
import { imageDims } from '@/content/imageDims';

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

/* ai-app ImageZoom과 동일한 라이트박스 — radix 없이 같은 룩앤필/동작을 재현 */
export function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // 브라우저 캐시로 이미 로드된 이미지는 onLoad가 안 뛸 수 있으므로 마운트 시 complete 확인
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

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

  // 크기맵이 있으면 로드 전에 종횡비를 확보해 화면 튐(CLS)을 0으로 만든다
  const dim = imageDims[src];

  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50"
        style={dim ? { aspectRatio: `${dim.w} / ${dim.h}` } : undefined}
      >
        {!loaded && (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-[shimmer_1.6s_ease-in-out_infinite] bg-[length:200%_100%]"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #f5f5f5 25%, #e9e9e9 37%, #f5f5f5 63%)',
            }}
          />
        )}
        {/* 정적 export: next/image 대신 일반 img 사용 */}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full cursor-zoom-in transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
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
