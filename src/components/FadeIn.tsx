'use client';

import { MotionConfig, motion } from 'framer-motion';

/* 화면에 들어올 때 한 번만 살짝 올라온다. 움직임 줄이기를 켠 사람에게는 위치 이동 없이 투명도만 바뀐다. */
export function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 0.8, 0.26, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
