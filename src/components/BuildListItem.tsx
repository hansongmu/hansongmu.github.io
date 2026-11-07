import Link from 'next/link';
import type { Build } from '@/content/types';
import { summaryOf } from '@/content/getBuild';
import { FadeIn } from './FadeIn';

const MAX_TAGS = 5;
const STAGGER = 0.06;
const MAX_STAGGER_ITEMS = 5;

export function BuildListItem({
  build,
  basePath = '/projects',
  index = 0,
  withPartOf = false,
}: {
  build: Build;
  basePath?: string;
  /** 목록 안 순서. 함께 보이는 항목이 짧은 간격을 두고 나타나게 한다. */
  index?: number;
  /** AI 섹션에서만 켠다. 기술 태그 대신 이 작업이 속한 시스템을 글자로 적는다. */
  withPartOf?: boolean;
}) {
  const tags = withPartOf ? [] : (build.tech ?? '').split(' · ').filter(Boolean).slice(0, MAX_TAGS);
  return (
    <li>
      <FadeIn delay={Math.min(index, MAX_STAGGER_ITEMS) * STAGGER}>
        <Link
          href={`${basePath}/${build.slug}`}
          className="group grid items-start gap-2.5 rounded-[14px] p-3.5 transition-[background-color,transform] duration-200 hover:bg-surface active:scale-[0.995] motion-reduce:transition-none motion-reduce:active:scale-100 sm:grid-cols-[136px_minmax(0,1fr)] sm:gap-[18px]"
        >
          <span className="block max-w-[220px] overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgba(112,115,124,0.16)] sm:max-w-none">
            {/* 정적 export: next/image 대신 일반 img 사용 */}
            <img
              src={`/thumbs/${build.slug}.webp`}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-left-top transition-transform duration-[450ms] ease-[cubic-bezier(0.22,0.8,0.26,1)] group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-semibold leading-[1.45] tracking-[-0.01em] text-ink">
              {build.title}
              <svg
                viewBox="0 0 12 12"
                aria-hidden
                className="ml-1 inline-block h-[11px] w-[11px] -translate-x-1 translate-y-1 fill-none stroke-current stroke-[1.6] opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
              >
                <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" />
              </svg>
            </span>
            {withPartOf && build.partOf && (
              <span className="block text-[13px] leading-[1.7] text-mute">{build.partOf.title}</span>
            )}
            <span className="mt-1 block text-sm leading-[1.6] text-sub">{summaryOf(build)}</span>
            {build.period && <span className="mt-[5px] block text-[13px] text-mute">{build.period}</span>}
            {tags.length > 0 && (
              <span className="mt-2.5 flex flex-wrap gap-1">
                {tags.map((t) => (
                  <span key={t} className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-sub transition-colors duration-200 group-hover:bg-white motion-reduce:transition-none">
                    {t}
                  </span>
                ))}
              </span>
            )}
          </span>
        </Link>
      </FadeIn>
    </li>
  );
}
