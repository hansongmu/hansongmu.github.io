import type { Build } from '@/content/types';
import { BuildListItem } from './BuildListItem';

export function BuildList({ builds }: { builds: Build[] }) {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-neutral-900">Builds</h2>
      <div className="mt-2 divide-y divide-neutral-100">
        {builds.map((b) => (
          <BuildListItem key={b.slug} build={b} />
        ))}
      </div>
    </section>
  );
}
