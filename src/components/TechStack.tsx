import { techStack } from '@/content/techStack';
import { techIcons } from './techIcons';
import { FadeIn } from './FadeIn';

export function TechStack() {
  return (
    <FadeIn delay={0.1}>
      <section className="pt-3">
        <h2 className="text-[15px] font-semibold text-neutral-900">Tech</h2>
        <div className="mt-4 space-y-3">
          {techStack.map((group) => (
            <div key={group.category} className="flex items-baseline">
              <span className="w-32 shrink-0 text-sm text-neutral-400">
                {group.category}
              </span>
              <span className="flex flex-wrap gap-x-4 gap-y-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-sm leading-[1.6] text-neutral-600"
                  >
                    {techIcons[item] && (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0 fill-neutral-400"
                      >
                        <path d={techIcons[item]} />
                      </svg>
                    )}
                    {item}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
