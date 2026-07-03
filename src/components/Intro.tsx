import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Intro() {
  return (
    <FadeIn delay={0.05}>
      <section className="pt-10">
        <h2 className="text-[15px] font-semibold text-neutral-900">About</h2>
        <div className="mt-4 space-y-4">
          {profile.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-[1.6] text-neutral-600">
              {p}
            </p>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
