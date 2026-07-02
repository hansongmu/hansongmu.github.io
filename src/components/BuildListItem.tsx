import Link from 'next/link';
import type { Build } from '@/content/types';

export function BuildListItem({ build }: { build: Build }) {
  return (
    <Link
      href={`/projects/${build.slug}`}
      className="group flex h-8 items-center justify-between"
    >
      <span className="flex items-center gap-1">
        <span className="text-sm font-medium text-neutral-900 group-hover:text-neutral-500">
          {build.title}
        </span>
        {build.isNew && (
          <span className="text-sm text-neutral-600">
            <span className="font-medium">· </span>New
          </span>
        )}
      </span>
      <span className="text-sm leading-[1.5] text-neutral-400">{build.period}</span>
    </Link>
  );
}
