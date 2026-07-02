'use client';

import { useEffect, useState } from 'react';

export interface SectionIndexItem {
  id: string;
  text: string;
}

export function SectionIndex({ items }: { items: SectionIndexItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight > window.innerHeight;
      // 페이지 끝에 닿으면 마지막 섹션은 읽기 선까지 못 올라와도 활성화
      if (scrollable && window.innerHeight + window.scrollY >= doc.scrollHeight - 2) {
        setActiveId(headings[headings.length - 1].id);
        return;
      }
      // 읽기 선(화면 상단 1/4)을 지난 마지막 헤딩이 현재 섹션
      const line = window.innerHeight * 0.25;
      let current = headings[0].id;
      for (const el of headings) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="fixed left-8 top-1/2 hidden -translate-y-1/2 xl:block">
      <ul className="space-y-2">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`flex items-center gap-2 text-[13px] leading-[1.6] transition-colors ${
                  active
                    ? 'font-medium text-neutral-800'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <span
                  className={`h-0.5 w-3 rounded-full transition-colors ${
                    active ? 'bg-neutral-700' : 'bg-neutral-300'
                  }`}
                />
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
