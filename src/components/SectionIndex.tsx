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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      // 화면 상단 1/4 지점을 지나는 헤딩을 현재 섹션으로 취급
      { rootMargin: '-20% 0px -70% 0px' },
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
