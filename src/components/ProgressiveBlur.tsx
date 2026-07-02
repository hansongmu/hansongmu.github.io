'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

// 위로 갈수록 블러가 세지는 겹층 backdrop-filter — 참고: jihoonwrks.me 상단 블러
const LAYERS = [
  { blur: 0.0390625, stops: [0, 12.5, 25, 37.5] },
  { blur: 0.078125, stops: [12.5, 25, 37.5, 50] },
  { blur: 0.15625, stops: [25, 37.5, 50, 62.5] },
  { blur: 0.3125, stops: [37.5, 50, 62.5, 75] },
  { blur: 0.625, stops: [50, 62.5, 75, 87.5] },
  { blur: 1.25, stops: [62.5, 75, 87.5, 100] },
  { blur: 2.5, stops: [75, 87.5, 100, null] },
  { blur: 5, stops: [87.5, 100, null, null] },
];

function mask(stops: (number | null)[]) {
  const [a, b, c, d] = stops;
  const parts = [`rgba(0,0,0,0) ${a}%`, `rgb(0,0,0) ${b}%`];
  if (c !== null) parts.push(`rgb(0,0,0) ${c}%`);
  if (d !== null) parts.push(`rgba(0,0,0,0) ${d}%`);
  return `linear-gradient(to top, ${parts.join(', ')})`;
}

export function ProgressiveBlur() {
  // 최상단에서는 블러 없음 → 80px 스크롤까지 서서히 등장
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {LAYERS.map((layer) => (
        <div
          key={layer.blur}
          className="absolute inset-0"
          style={{
            maskImage: mask(layer.stops),
            WebkitMaskImage: mask(layer.stops),
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
          }}
        />
      ))}
    </motion.div>
  );
}
