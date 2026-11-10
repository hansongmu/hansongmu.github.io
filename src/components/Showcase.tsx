'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, m, useInView, useReducedMotion } from 'framer-motion';
import type { Showcase as ShowcaseData, ShowcaseMedia } from '@/content/types';
import { ProjectImage } from './ProjectImage';

const ease = [0.2, 0.75, 0.2, 1] as const;
const lift = 'rounded-lg shadow-[0_14px_40px_rgba(15,23,42,0.08)]';

/* 영상은 화면에 들어오면 처음부터 돌고, 나가면 멈춘다. 한꺼번에 여러 개가 돌지 않게 하려는 것. */
function Clip({ item, loop }: { item: ShowcaseMedia; loop: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else v.pause();
  }, [inView]);
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <video
        ref={ref}
        src={item.video}
        poster={item.src}
        aria-label={item.alt}
        muted
        playsInline
        loop={loop}
        preload="none"
        className="block aspect-video w-full"
      />
    </div>
  );
}

function Stat({ value, unit, label, delay }: { value: number; unit: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const c = animate(0, value, { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value, delay]);
  return (
    <div ref={ref} className="rounded-xl bg-neutral-100/80 px-5 py-5">
      <p className="text-[28px] font-bold tabular-nums tracking-tight text-neutral-900 sm:text-[30px]">
        {n.toLocaleString('ko-KR')}
        <span className="ml-0.5 text-[15px] font-semibold text-neutral-500">{unit}</span>
      </p>
      <p className="mt-1 text-[13px] text-neutral-400">{label}</p>
    </div>
  );
}

export function Showcase({ data }: { data: ShowcaseData }) {
  // 화면이 주인공이라 본문 이미지보다 넓게 연다. 넓은 화면에서도 왼쪽 목차에는 닿지 않는 선까지.
  const breakout = 'min-[1280px]:-mx-16 min-[1440px]:-mx-36 min-[1600px]:-mx-52';
  return (
    <div className={breakout}>
      <m.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease }}
        className={lift}
      >
        <Clip item={data.hero} loop />
      </m.div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {data.stats.map((s, i) => (
          <Stat key={s.label} {...s} delay={i * 0.12} />
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {data.items.map((item) => (
          <m.div
            key={item.src}
            className={`${lift} ${item.wide ? 'sm:col-span-2' : ''}`}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, ease }}
          >
            {item.video ? <Clip item={item} loop /> : <ProjectImage src={item.src} alt={item.alt} />}
          </m.div>
        ))}
      </div>
    </div>
  );
}
