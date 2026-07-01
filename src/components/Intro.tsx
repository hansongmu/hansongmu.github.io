import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Intro() {
  return (
    <FadeIn>
      <section className="pt-16">
        <h1 className="text-lg font-bold text-neutral-900">{profile.name}</h1>
        <p className="mt-1 text-sm text-neutral-500">{profile.tagline}</p>
        <div className="mt-6 space-y-4">
          {profile.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-[1.8] text-neutral-800">
              {p}
            </p>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
