import { archive } from './archive';
import type { Build } from './types';

export function getArchiveBySlug(slug: string): Build | undefined {
  return archive.find((a) => a.slug === slug);
}

export function getAllArchiveSlugs(): string[] {
  return archive.map((a) => a.slug);
}

/* Archive 는 기간이 없어 연월로 정렬할 수 없다. 적어 둔 순서를 그대로 쓴다. */
export function getArchiveItems(): Build[] {
  return archive;
}
