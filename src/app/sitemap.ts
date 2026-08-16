import type { MetadataRoute } from 'next';
import { getAllBuildSlugs } from '@/content/getBuild';
import { getAllArchiveSlugs } from '@/content/getArchive';
import { SITE_URL } from '@/content/site';

// output: 'export' 라 빌드 시 out/sitemap.xml 로 생성된다.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    ...getAllBuildSlugs().map((slug) => ({
      // trailingSlash: true 설정과 실제 경로를 맞춘다.
      url: `${SITE_URL}/projects/${slug}/`,
      lastModified: now,
      priority: 0.8,
    })),
    ...getAllArchiveSlugs().map((slug) => ({
      url: `${SITE_URL}/archive/${slug}/`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
