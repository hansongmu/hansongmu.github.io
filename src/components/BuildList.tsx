import type { Build } from '@/content/types';
import { BuildListItem } from './BuildListItem';
import { FadeIn } from './FadeIn';

export function BuildList({
  builds,
  title = 'Projects',
  id,
}: {
  builds: Build[];
  title?: string;
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <FadeIn>
        <h2 className="text-xl font-bold tracking-[-0.015em] text-ink">{title}</h2>
      </FadeIn>
      <ul className="-mx-3.5 mt-4 space-y-2">
        {builds.map((b, i) => (
          <BuildListItem key={b.slug} build={b} index={i} />
        ))}
      </ul>
    </section>
  );
}
