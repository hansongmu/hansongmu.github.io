import type { Build } from '@/content/types';
import { BuildListItem } from './BuildListItem';
import { FadeIn } from './FadeIn';

export function BuildList({ builds }: { builds: Build[] }) {
  return (
    <FadeIn delay={0.15}>
      <section className="pt-3">
        <h2 className="text-[15px] font-semibold text-neutral-900">Projects</h2>
        <div className="mt-4 divide-y divide-neutral-200">
          {builds.map((b) => (
            <div key={b.slug} className="py-1">
              <BuildListItem build={b} />
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
