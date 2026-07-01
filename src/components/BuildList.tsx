import type { Build } from '@/content/types';
import { BuildListItem } from './BuildListItem';
import { FadeIn } from './FadeIn';

export function BuildList({ builds }: { builds: Build[] }) {
  return (
    <FadeIn delay={0.1}>
      <section>
        <h2 className="text-[15px] font-semibold text-neutral-900">Builds</h2>
        <div className="mt-2 divide-y divide-neutral-100">
          {builds.map((b) => (
            <BuildListItem key={b.slug} build={b} />
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
