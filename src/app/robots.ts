import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';

// output: 'export' 라 빌드 시 out/robots.txt 로 생성된다.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
