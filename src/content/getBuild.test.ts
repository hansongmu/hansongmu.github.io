import { describe, it, expect } from 'vitest';
import {
  getBuildBySlug,
  getAllBuildSlugs,
  getBuildsByRecencyDesc,
  lastActivityOf,
  startOf,
  latestPhaseStartOf,
} from './getBuild';

describe('getBuildBySlug', () => {
  it('returns the build matching the slug', () => {
    const build = getBuildBySlug('ai-platform');
    expect(build?.title).toBe('사내 AI 플랫폼');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getBuildBySlug('does-not-exist')).toBeUndefined();
  });
});

describe('getAllBuildSlugs', () => {
  it('returns every build slug', () => {
    const slugs = getAllBuildSlugs();
    expect(slugs).toContain('expense-management');
    expect(slugs).toContain('oneplace');
    expect(slugs).toContain('patent-management');
    expect(slugs).toContain('bi');
    expect(slugs).toContain('ai-platform');
    expect(slugs).toContain('attendance');
    expect(slugs).toContain('payroll');
    expect(slugs).toHaveLength(13);
  });
});

describe('lastActivityOf', () => {
  it('reads the end of a closed range', () => {
    expect(lastActivityOf('2026. 5 ~ 2026. 7')).toBe(2026 * 12 + 7);
  });

  it('reads a single month', () => {
    expect(lastActivityOf('2026. 8')).toBe(2026 * 12 + 8);
  });

  it('takes the latest month when a period lists several ranges', () => {
    expect(lastActivityOf('2022. 12 ~ 2023. 7, 2026. 7')).toBe(2026 * 12 + 7);
  });

  it('ranks an unfinished project above ones that already ended', () => {
    expect(lastActivityOf('2023. 4 ~ 진행중')).toBeGreaterThan(
      lastActivityOf('2025. 10 ~ 2025. 12'),
    );
  });

  /* '진행중'은 데이터에 적힌 가장 늦은 연월과 같은 급으로 본다.
     이번 달에 끝난 작업이 이번 달에도 하고 있는 작업보다 뒤로 밀리지 않게 하려는 것. */
  it('treats an unfinished project as level with the latest month in the data', () => {
    expect(lastActivityOf('2023. 4 ~ 진행중')).toBe(
      lastActivityOf('2023. 2 ~ 2023. 7, 2026. 8'),
    );
  });
});

describe('startOf', () => {
  it('reads the first month even when later ranges follow', () => {
    expect(startOf('2022. 12 ~ 2023. 7, 2026. 7')).toBe(2022 * 12 + 12);
  });
});

describe('getBuildsByRecencyDesc', () => {
  it('sorts builds by last activity, newest first', () => {
    const last = getBuildsByRecencyDesc().map((b) => lastActivityOf(b.period));
    expect(last).toEqual([...last].sort((a, b) => b - a));
  });

  it('puts a rebuilt project above ones that ended earlier', () => {
    const order = getBuildsByRecencyDesc().map((b) => b.slug);
    /* 특허관리는 재구축 시점(2026. 7)이 마지막 활동이라 2025년에 끝난 CRM보다 앞선다 */
    expect(order.indexOf('patent-management')).toBeLessThan(order.indexOf('crm'));
  });

  it('breaks ties by the later phase start', () => {
    const ordered = getBuildsByRecencyDesc();
    for (let i = 1; i < ordered.length; i++) {
      const prev = ordered[i - 1];
      const cur = ordered[i];
      if (lastActivityOf(prev.period) !== lastActivityOf(cur.period)) continue;
      expect(latestPhaseStartOf(prev.period)).toBeGreaterThanOrEqual(
        latestPhaseStartOf(cur.period),
      );
    }
  });

  /* 이번 달에 재구축을 끝낸 인사카드가, 예전부터 이어 오며 이번 달에도 손댄 PMS보다 앞에 온다 */
  it('leads with the most recently started work', () => {
    const order = getBuildsByRecencyDesc().map((b) => b.slug);
    expect(order.indexOf('personnel-card')).toBeLessThan(order.indexOf('pms'));
  });
});

describe('latestPhaseStartOf', () => {
  it('reads the start of the last phase', () => {
    expect(latestPhaseStartOf('2023. 2 ~ 2023. 7, 2026. 8')).toBe(2026 * 12 + 8);
  });

  it('falls back to the only start when there is a single phase', () => {
    expect(latestPhaseStartOf('2023. 4 ~ 진행중')).toBe(2023 * 12 + 4);
  });
});
