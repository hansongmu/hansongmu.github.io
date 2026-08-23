import { aiWorks } from './ai';
import { getBuildBySlug } from './getBuild';
import type { Build } from './types';

export function getAiWorkBySlug(slug: string): Build | undefined {
  return aiWorks.find((w) => w.slug === slug);
}

export function getAllAiWorkSlugs(): string[] {
  return aiWorks.map((w) => w.slug);
}

export interface AiEntry {
  build: Build;
  basePath: string;
}

/* AI 섹션 목록. 순서는 연월이 아니라 여기 적은 순서를 그대로 쓴다.
   마지막 활동으로 정렬하면 둘 다 '진행중'인 AI 플랫폼과 BI 가 동률이 되어
   마지막 착수가 늦은 BI 가 앞으로 오는데, 이 자리는 최신순이 아니라 대표작을 앞세운다. */
export function getAiEntries(): AiEntry[] {
  const platform = getBuildBySlug('ai-platform');
  return [
    ...(platform ? [{ build: platform, basePath: '/projects' }] : []),
    ...aiWorks.map((build) => ({ build, basePath: '/ai' })),
  ];
}
