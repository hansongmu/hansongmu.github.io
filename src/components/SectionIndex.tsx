'use client';

import { useEffect, useState } from 'react';
import { AiMark } from './AiMark';

export interface SectionIndexItem {
  id: string;
  text: string;
  /** 홈 목차의 AI 항목. 파란 글자와 선, AI 표식으로 늘 구분된다. */
  accent?: boolean;
}

export function SectionIndex({
  items,
  variant = 'fixed',
}: {
  items: SectionIndexItem[];
  /** fixed: 상세 글의 왼쪽 여백에 뜨는 작은 목차. inline: 홈의 고정 칼럼 안에 놓는 큰 목차. */
  variant?: 'fixed' | 'inline';
}) {
  const inline = variant === 'inline';
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
    <aside className={inline ? 'mt-14 hidden lg:block' : 'fixed left-8 top-1/2 hidden -translate-y-1/2 xl:block'}>
      <ul className={inline ? '' : 'space-y-2'}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={`flex items-center transition-colors ${inline ? 'gap-3.5 py-[9px] text-sm' : 'gap-2 text-[13px] leading-[1.6]'} ${
                  item.accent
                    ? `ai-nav font-semibold text-point ${active ? 'is-active' : ''}`
                    : active
                      ? `font-medium ${inline ? 'text-ink' : 'text-neutral-800'}`
                      : `${inline ? 'text-neutral-400 hover:text-ink' : 'text-neutral-400 hover:text-neutral-600'}`
                }`}
              >
                <span
                  className={
                    inline
                      ? `h-[1.5px] rounded-full transition-[width,background-color] duration-300 ease-out motion-reduce:transition-none ${active ? 'w-[60px]' : 'w-7'} ${
                          item.accent ? 'bg-point' : active ? 'bg-ink' : 'bg-neutral-300'
                        }`
                      : `h-0.5 w-3 rounded-full transition-colors ${active ? 'bg-neutral-700' : 'bg-neutral-300'}`
                  }
                />
                {item.accent ? (
                  <span className="inline-flex items-center gap-[5px]">
                    <AiMark size={15} />
                    {item.text}
                  </span>
                ) : (
                  item.text
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
