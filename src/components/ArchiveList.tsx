import type { Build } from '@/content/types';
import { BuildListItem } from './BuildListItem';
import { FadeIn } from './FadeIn';

export function ArchiveList({ items }: { items: Build[] }) {
  return (
    <FadeIn delay={0.2}>
      <section className="pt-3">
        <h2 className="text-[15px] font-semibold text-neutral-900">Archive</h2>
        <div className="mt-4 divide-y divide-neutral-200">
          {items.map((item) => (
            <div key={item.slug} className="py-1">
              <BuildListItem build={item} basePath="/archive" />
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
