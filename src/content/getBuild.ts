import { builds } from './builds';
import type { Build } from './types';

export function getBuildBySlug(slug: string): Build | undefined {
  return builds.find((b) => b.slug === slug);
}

export function getAllBuildSlugs(): string[] {
  return builds.map((b) => b.slug);
}

/** period에 적힌 연월을 모두 뽑는다. 연도만 쓰면 1월로 본다. */
function marks(period: string): number[] {
  return [...period.matchAll(/(\d{4})(?:\.\s*(\d{1,2}))?/g)].map(
    (m) => Number(m[1]) * 12 + Number(m[2] ?? 1),
  );
}

/* '진행중'이 가리키는 시점. 빌드 시각을 읽으면 정렬이 시간에 따라 흔들리므로,
   데이터에 적힌 가장 늦은 연월을 현재로 본다. 새 프로젝트를 추가하면 함께 따라 올라간다. */
const NOW = Math.max(...builds.flatMap((b) => marks(b.period)));

/** 처음 손댄 연월. 표기 예: '2022. 12 ~ 2023. 7, 2026. 7' → 2022. 12 */
export function startOf(period: string): number {
  return marks(period)[0] ?? 0;
}

/** 마지막 구간에 착수한 연월. 쉼표로 구간을 나눠 적으므로 마지막 조각의 첫 연월을 본다.
    표기 예: '2022. 12 ~ 2023. 7, 2026. 7' → 2026. 7 */
export function latestPhaseStartOf(period: string): number {
  const phases = period.split(',');
  return marks(phases[phases.length - 1])[0] ?? startOf(period);
}

/** 마지막으로 손댄 연월. '진행중'과 '현재'는 아직 끝나지 않았다는 뜻이라 현재로 본다. */
export function lastActivityOf(period: string): number {
  const all = marks(period);
  const end = all.length ? Math.max(...all) : 0;
  return /진행중|현재/.test(period) ? Math.max(end, NOW) : end;
}

/* Projects 목록 정렬 — 마지막 활동 연월 기준 내림차순, 같으면 마지막 구간에 늦게 착수한 쪽을 앞에 둔다.
   시작 연월만 보면 오래전에 시작해 지금까지 이어 온 프로젝트일수록 아래로 밀린다.
   오래 운영하다 최근에 다시 손댄 프로젝트가 대표적인 경우라 마지막 활동을 기준으로 삼았고,
   동률을 시작 연월로 가르면 같은 이유로 재구축 프로젝트가 또 밀려서 마지막 착수 시점을 본다. */
export function getBuildsByRecencyDesc(): Build[] {
  return [...builds].sort(
    (a, b) =>
      lastActivityOf(b.period) - lastActivityOf(a.period) ||
      latestPhaseStartOf(b.period) - latestPhaseStartOf(a.period),
  );
}
