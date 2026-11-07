import { techStack } from '@/content/techStack';
import { techIcons } from './techIcons';
import { FadeIn } from './FadeIn';

export function TechStack() {
  return (
    <FadeIn>
      <section id="tech" className="scroll-mt-24">
        <h2 className="text-xl font-bold tracking-[-0.015em] text-ink">Tech</h2>
        <div className="mt-4 space-y-3">
          {techStack.map((group) => (
            <div key={group.category} className="flex items-baseline">
              <span className="w-[136px] shrink-0 text-sm text-mute">
                {group.category}
              </span>
              <span className="flex flex-wrap gap-x-4 gap-y-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 text-sm leading-[1.6] text-sub"
                  >
                    {techIcons[item] && (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden
                        className="h-4 w-4 shrink-0"
                        fill={techIcons[item].color}
                      >
                        <path d={techIcons[item].path} />
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
