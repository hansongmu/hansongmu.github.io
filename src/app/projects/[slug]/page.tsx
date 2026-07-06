import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBuildBySlug, getAllBuildSlugs } from '@/content/getBuild';
import { BuildDetail } from '@/components/BuildDetail';

export function generateStaticParams() {
  return getAllBuildSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) return {};
  const firstParagraph = build.blocks.find((b) => b.type === 'paragraph');
  return {
    title: `${build.title} - 한송무`,
    description: firstParagraph ? `${firstParagraph.text.slice(0, 120)}…` : build.category,
  };
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
