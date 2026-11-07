import type { AiEntry } from '@/content/getAiWork';
import { AiMark } from './AiMark';
import { BuildListItem } from './BuildListItem';
import { FadeIn } from './FadeIn';

/* Projects 와 목록 모양은 같지만, 항목이 두 소스에서 오고 이름도
   프로젝트명이 아니라 그 안에서 한 AI 작업이라 별도 컴포넌트로 둔다.
   배경이나 큰 카드 없이 제목 앞 표식과 왼쪽 목차의 파랑으로만 구분한다. */
export function AiList({ entries }: { entries: AiEntry[] }) {
  return (
    <section id="ai" className="scroll-mt-24">
      <FadeIn>
        <h2 className="flex items-center gap-[7px] text-xl font-bold tracking-[-0.015em] text-ink">
          <AiMark size={20} reveal />
          AI
        </h2>
      </FadeIn>
      <ul className="-mx-3.5 mt-4 space-y-2">
        {entries.map(({ build, basePath }, i) => (
          <BuildListItem key={build.slug} build={build} basePath={basePath} index={i} withPartOf />
        ))}
      </ul>
    </section>
  );
}
