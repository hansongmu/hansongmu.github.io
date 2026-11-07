'use client';

import { useId } from 'react';
import { MotionConfig, motion } from 'framer-motion';

/* ZEUS AIP 제품에서 쓰는 AI 아이콘(ai-app AiSparkIcon)과 같은 모양과 색.
   reveal 을 켜면 처음 보일 때 한 번 돈다. 마우스를 올릴 때와 목차에서 활성화될 때의 움직임은 globals.css 가 맡는다. */
export function AiMark({ size = 16, reveal = false }: { size?: number; reveal?: boolean }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const icon = (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ai-mark-icon block">
      <path className="ai-mark-big" d="M1.526 9.885c2.66.895 3.685 1.92 4.58 4.58.145.43.745.43.89 0 .895-2.66 1.92-3.685 4.58-4.58a.468.468 0 000-.89c-2.66-.895-3.685-1.92-4.58-4.58a.468.468 0 00-.89 0c-.895 2.66-1.92 3.685-4.58 4.58a.468.468 0 000 .89z" fill={`url(#${id}lg)`} />
      <path className="ai-mark-small" d="M9.25 4.33c1.4.475 1.94 1.01 2.416 2.415a.248.248 0 00.47 0c.475-1.4 1.01-1.94 2.415-2.415a.248.248 0 000-.47c-1.4-.475-1.94-1.01-2.415-2.415a.248.248 0 00-.47 0c-.475 1.4-1.01 1.94-2.415 2.415a.248.248 0 000 .47z" fill={`url(#${id}sm)`} />
      <defs>
        <radialGradient id={`${id}lg`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(180 5.855 4.72) scale(8.31)">
          <stop stopColor="#0073ff" />
          <stop offset="1" stopColor="#3d5aff" />
        </radialGradient>
        <radialGradient id={`${id}sm`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-7.22 0 0 -7.22 14.49 4.075)">
          <stop stopColor="#0092ff" />
          <stop offset="0.48" stopColor="#0073ff" />
        </radialGradient>
      </defs>
    </svg>
  );
  if (!reveal) return <span className="ai-mark inline-block shrink-0">{icon}</span>;
  return (
    <MotionConfig reducedMotion="user">
      <motion.span
        className="ai-mark inline-block shrink-0"
        initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
        whileInView={{ scale: [0.4, 1.15, 1], rotate: [-40, 8, 0], opacity: [0, 1, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.12, times: [0, 0.6, 1], ease: [0.22, 0.8, 0.26, 1] }}
      >
        {icon}
      </motion.span>
    </MotionConfig>
  );
}
