import Link from 'next/link';
import type { Build } from '@/content/types';

export function BuildListItem({
  build,
  basePath = '/projects',
  withPartOf = false,
}: {
  build: Build;
  basePath?: string;
  /** AI 섹션에서만 켠다. 제목 뒤에 이 작업이 속한 시스템을 회색으로 덧붙인다. */
  withPartOf?: boolean;
}) {
  return (
    <Link
      href={`${basePath}/${build.slug}`}
      className="group flex h-8 items-center justify-between gap-4"
    >
      {withPartOf && build.partOf ? (
        /* 'AI 작업 · 그 작업을 한 시스템'. 가운뎃점은 ::after 로 붙여 텍스트에 섞지 않는다 */
        <span className="flex min-w-0 items-baseline">
          <span className="shrink-0 text-sm font-medium text-neutral-900 after:mx-1.5 after:font-normal after:text-neutral-300 after:content-['·'] group-hover:text-neutral-500">
            {build.title}
          </span>
          <span className="truncate text-sm text-neutral-400">{build.partOf.title}</span>
        </span>
      ) : (
        <span className="truncate text-sm font-medium text-neutral-900 group-hover:text-neutral-500">
          {build.title}
        </span>
      )}
      {/* 기간이 없는 항목은 오른쪽을 비운다 */}
      {build.period && (
        <span className="shrink-0 text-sm leading-[1.5] text-neutral-400">{build.period}</span>
      )}
    </Link>
  );
}
