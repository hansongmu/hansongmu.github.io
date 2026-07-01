import type { Build } from '@/content/types';
import { FadeIn } from './FadeIn';

export function BuildDetail({ build }: { build: Build }) {
  return (
    <article className="mx-auto w-full max-w-[688px] px-4 pt-16">
      <FadeIn>
        <header>
          <h1 className="text-lg font-bold text-neutral-900">{build.title}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            {[build.category, build.org, build.period].filter(Boolean).join(' · ')}
          </p>
          {build.tech && (
            <p className="mt-1 text-xs text-neutral-400">{build.tech}</p>
          )}
        </header>
      </FadeIn>

      <div className="mt-10 space-y-6">
        {build.blocks.map((block, i) => {
          if (block.type === 'heading') {
            return (
              <h2 key={i} className="text-[15px] font-semibold text-neutral-900">
                {block.text}
              </h2>
            );
          }
          if (block.type === 'paragraph') {
            return (
              <p key={i} className="text-[15px] leading-[1.8] text-neutral-800">
                {block.text}
              </p>
            );
          }
          return (
            <figure key={i}>
              {/* 정적 export: next/image 대신 일반 img 사용 */}
              <img src={block.src} alt={block.alt} className="w-full rounded-md" />
              {block.caption && (
                <figcaption className="mt-2 text-center text-xs text-neutral-400">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </article>
  );
}
