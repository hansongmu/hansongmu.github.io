import Link from 'next/link';
import type { Build } from '@/content/types';

export function BuildListItem({ build }: { build: Build }) {
  return (
    <Link
      href={`/builds/${build.slug}`}
      className="flex items-center justify-between py-3 group"
    >
      <span className="text-sm text-neutral-900 group-hover:text-blue-600">
        {build.title}
      </span>
      <span className="text-sm text-neutral-400">{build.period}</span>
    </Link>
  );
}
