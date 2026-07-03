import { describe, it, expect } from 'vitest';
import { getBuildBySlug, getAllBuildSlugs } from './getBuild';

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
    expect(slugs).toHaveLength(11);
  });
});

describe('getBuildsByStartDesc', () => {
  it('sorts builds by start date, newest first', async () => {
    const { getBuildsByStartDesc } = await import('./getBuild');
    const starts = getBuildsByStartDesc().map((b) => {
      const m = b.period.match(/(\d{4})\.\s*(\d{1,2})/)!;
      return Number(m[1]) * 12 + Number(m[2]);
    });
    const sorted = [...starts].sort((a, b) => b - a);
    expect(starts).toEqual(sorted);
  });
});
