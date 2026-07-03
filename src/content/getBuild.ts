import { builds } from './builds';
import type { Build } from './types';

export function getBuildBySlug(slug: string): Build | undefined {
  return builds.find((b) => b.slug === slug);
}

export function getAllBuildSlugs(): string[] {
  return builds.map((b) => b.slug);
}

/* Projects 목록 정렬 — period의 시작 연월 기준 내림차순 (표기 예: '2026. 6 ~ 현재', 연도만 쓰면 1월 취급) */
export function getBuildsByStartDesc(): Build[] {
  const start = (b: Build) => {
    const m = b.period.match(/(\d{4})(?:\.\s*(\d{1,2}))?/);
    return m ? Number(m[1]) * 12 + Number(m[2] ?? 1) : 0;
  };
  return [...builds].sort((a, b) => start(b) - start(a));
}
