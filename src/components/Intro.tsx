import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Intro() {
  return (
    <FadeIn delay={0.05}>
      <section id="about" className="scroll-mt-24">
        <h2 className="text-xl font-bold tracking-[-0.015em] text-ink">About</h2>
        <div className="mt-3 space-y-3">
          {profile.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-[1.7] text-sub">
              {p}
            </p>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
