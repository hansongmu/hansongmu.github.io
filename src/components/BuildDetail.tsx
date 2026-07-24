import type { Build } from '@/content/types';
import { FadeIn } from './FadeIn';
import { ProjectImage } from './ProjectImage';
import { SectionIndex } from './SectionIndex';

function headingId(text: string, index: number) {
  const slug = text.trim().replace(/\s+/g, '-');
  return slug.length > 0 ? slug : `section-${index}`;
}

type ImageBlock = Extract<Build['blocks'][number], { type: 'image' }>;
type Segment =
  | { kind: 'block'; block: Build['blocks'][number]; key: number }
  | { kind: 'images'; items: { block: ImageBlock; key: number }[] };

/* 연속된 이미지 블록을 하나의 그리드 묶음으로 그룹핑 */
function toSegments(blocks: Build['blocks']): Segment[] {
  const segments: Segment[] = [];
  blocks.forEach((block, i) => {
    if (block.type === 'image') {
      const last = segments[segments.length - 1];
      if (last?.kind === 'images') {
        last.items.push({ block, key: i });
      } else {
        segments.push({ kind: 'images', items: [{ block, key: i }] });
      }
    } else {
      segments.push({ kind: 'block', block, key: i });
    }
  });
  return segments;
}

export function BuildDetail({ build }: { build: Build }) {
  const sections = build.blocks
    .map((block, i) =>
      block.type === 'heading' ? { id: headingId(block.text, i), text: block.text } : null,
    )
    .filter((s): s is { id: string; text: string } => s !== null);

  const segments = toSegments(build.blocks);

  return (
    <article className="mx-auto w-full max-w-[688px] px-4 pt-16">
      <SectionIndex items={sections} />
      <FadeIn>
        <header>
          <h1 className="text-[17px] font-bold leading-[1.7] text-neutral-900">
            {build.title}
          </h1>
          <dl className="mt-6 space-y-2.5 text-sm">
            {build.org && (
              <div className="flex items-center">
                <dt className="w-14 shrink-0 text-neutral-400">소속</dt>
                <dd className="flex items-center">
                  {/* 정적 export: next/image 대신 일반 img 사용. 로고가 회사명을 대신한다. */}
                  <img src="/zeus.svg" alt={`${build.org} 로고`} className="h-[18px] w-auto" />
                </dd>
              </div>
            )}
            {build.role && (
              <div className="flex">
                <dt className="w-14 shrink-0 text-neutral-400">역할</dt>
                <dd className="text-neutral-600">{build.role}</dd>
              </div>
            )}
            <div className="flex">
              <dt className="w-14 shrink-0 text-neutral-400">기간</dt>
              <dd className="text-neutral-600">{build.period}</dd>
            </div>
            {build.tech && (
              <div className="flex">
                <dt className="w-14 shrink-0 text-neutral-400">기술</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {build.tech.split(' · ').map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </header>
      </FadeIn>

      <div className="mt-10 space-y-6">
        {segments.map((seg) => {
          if (seg.kind === 'images') {
            // 큰 화면에서는 본문 폭을 넘어 살짝 넓게 — 좌측 목차와 겹치지 않는 선까지
            const breakout = 'xl:-mx-16 min-[1536px]:-mx-28';
            if (seg.items.length === 1) {
              const { block, key } = seg.items[0];
              return (
                <div key={key} className={breakout}>
                  <ProjectImage src={block.src} alt={block.alt} caption={block.caption} />
                </div>
              );
            }
            // 연속 이미지는 그리드로 — 4장 이상이면 3열로 더 촘촘하게
            const cols = seg.items.length >= 4 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';
            return (
              <div key={seg.items[0].key} className={`grid gap-3 ${cols} ${breakout}`}>
                {seg.items.map(({ block, key }) => (
                  <ProjectImage key={key} src={block.src} alt={block.alt} caption={block.caption} />
                ))}
              </div>
            );
          }
          const { block, key } = seg;
          if (block.type === 'heading') {
            // space-y-6(v4: 자식 mb 24px)를 mb-5가 덮어써 아래 20px — 위는 이전 형제 mb 24px + pt-2 = 32px
            return (
              <h2
                key={key}
                id={headingId(block.text, key)}
                className="mb-5 pt-2 scroll-mt-20 text-[16px] font-semibold text-neutral-900"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === 'subheading') {
            return (
              <h3 key={key} className="pt-2 text-sm font-medium text-neutral-800">
                {block.text}
              </h3>
            );
          }
          if (block.type === 'paragraph') {
            return (
              <p key={key} className="text-[15px] leading-[1.6] text-neutral-600">
                {block.text}
              </p>
            );
          }
          return null;
        })}
      </div>
    </article>
  );
}
