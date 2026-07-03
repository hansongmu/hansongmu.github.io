import { careers } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Career() {
  return (
    <FadeIn delay={0.08}>
      <section className="pt-3">
        <h2 className="text-[15px] font-semibold text-neutral-900">Career</h2>
        <div className="mt-4 space-y-6">
          {careers.map((c) => (
            <div key={c.company}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {c.logo && (
                    // 정적 export: next/image 대신 일반 img 사용
                    <img src={c.logo} alt={`${c.company} 로고`} className="h-5 w-auto" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {c.company}
                      <span className="ml-2 font-normal text-neutral-500">{c.role}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">{c.companyDescription}</p>
                  </div>
                </div>
                <span className="shrink-0 text-sm leading-[1.5] text-neutral-400">
                  {c.period}
                </span>
              </div>
              <ul className="mt-3 space-y-1">
                {c.bullets.map((b) => (
                  <li key={b} className="text-sm leading-[1.6] text-neutral-600">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
