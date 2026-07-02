import { notFound } from 'next/navigation';
import { getBuildBySlug, getAllBuildSlugs } from '@/content/getBuild';
import { BuildDetail } from '@/components/BuildDetail';

export function generateStaticParams() {
  return getAllBuildSlugs().map((slug) => ({ slug }));
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) notFound();
  return <BuildDetail build={build} />;
}
