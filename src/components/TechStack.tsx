import { techStack } from '@/content/techStack';
import { FadeIn } from './FadeIn';

export function TechStack() {
  return (
    <FadeIn delay={0.15}>
      <section className="pt-3">
        <h2 className="text-[15px] font-semibold text-neutral-900">Tech</h2>
        <div className="mt-4 space-y-2">
          {techStack.map((group) => (
            <div key={group.category} className="flex items-baseline">
              <span className="w-32 shrink-0 text-sm text-neutral-400">
                {group.category}
              </span>
              <span className="text-sm leading-[1.6] text-neutral-600">
                {group.items.join(' · ')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
