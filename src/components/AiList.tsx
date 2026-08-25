import type { AiEntry } from '@/content/getAiWork';
import { BuildListItem } from './BuildListItem';
import { FadeIn } from './FadeIn';

/* Projects 와 목록 모양은 같지만, 항목이 두 소스에서 오고 이름도
   프로젝트명이 아니라 그 안에서 한 AI 작업이라 별도 컴포넌트로 둔다. */
export function AiList({ entries }: { entries: AiEntry[] }) {
  return (
    <FadeIn delay={0.15}>
      <section className="pt-3">
        <h2 className="text-[15px] font-semibold text-neutral-900">AI</h2>
        <div className="mt-4 divide-y divide-neutral-200">
          {entries.map(({ build, basePath }) => (
            <div key={build.slug} className="py-1">
              <BuildListItem build={build} basePath={basePath} withPartOf />
            </div>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
