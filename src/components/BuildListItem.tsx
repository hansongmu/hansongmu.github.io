import Link from 'next/link';
import type { Build } from '@/content/types';

export function BuildListItem({
  build,
  basePath = '/projects',
}: {
  build: Build;
  basePath?: string;
}) {
  return (
    <Link
      href={`${basePath}/${build.slug}`}
      className="group flex h-8 items-center justify-between gap-4"
    >
      <span className="text-sm font-medium text-neutral-900 group-hover:text-neutral-500">
        {build.title}
      </span>
      {/* 기간이 없는 항목(Archive)은 오른쪽을 비운다 */}
      {build.period && (
        <span className="shrink-0 text-sm leading-[1.5] text-neutral-400">{build.period}</span>
      )}
    </Link>
  );
}
