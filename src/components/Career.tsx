import { careers } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Career() {
  return (
    <FadeIn>
      <section id="career" className="scroll-mt-24">
        <h2 className="text-xl font-bold tracking-[-0.015em] text-ink">Career</h2>
        <div className="mt-5 space-y-8">
          {careers.map((c) => (
            <div key={c.company} className="grid gap-2 sm:grid-cols-[136px_minmax(0,1fr)] sm:gap-[18px]">
              <span className="text-[13px] leading-[1.8] text-mute">{c.period}</span>
              <div>
                <p className="flex items-center gap-2 text-base font-semibold tracking-[-0.01em] text-ink">
                  {c.logo && (
                    // 정적 export: next/image 대신 일반 img 사용
                    <img src={c.logo} alt={`${c.company} 로고`} className="h-4 w-auto" />
                  )}
                  {c.role}
                </p>
                <p className="mt-0.5 text-[13px] text-mute">{c.companyDescription}</p>
                <ul className="mt-3 space-y-1">
                  {c.bullets.map((b) => (
                    <li key={b} className="text-sm leading-[1.7] text-sub">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
