import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Intro() {
  return (
    <FadeIn delay={0.05}>
      <section className="pt-10">
        <h2 className="text-[15px] font-semibold text-neutral-900">About</h2>
        <blockquote className="mt-4 border-l-2 border-neutral-300 pl-4">
          <p className="text-sm font-medium leading-[1.6] text-neutral-800">
            &ldquo;{profile.motto}&rdquo;
          </p>
        </blockquote>
        <div className="mt-4 space-y-2">
          {profile.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-[1.6] text-neutral-600">
              {p}
            </p>
          ))}
        </div>
        <h3 className="mt-8 text-sm font-medium text-neutral-800">주요 경험 &amp; 강점</h3>
        <ul className="mt-3 space-y-2">
          {profile.strengths.map((s) => (
            <li key={s.label} className="text-sm leading-[1.6] text-neutral-600">
              <span className="font-medium text-neutral-800">{s.label}</span>
              <span className="text-neutral-400"> — </span>
              {s.text}
            </li>
          ))}
        </ul>
      </section>
    </FadeIn>
  );
}
