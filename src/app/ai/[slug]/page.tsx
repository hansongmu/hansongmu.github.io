import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAiWorkBySlug, getAllAiWorkSlugs } from '@/content/getAiWork';
import { BuildDetail } from '@/components/BuildDetail';
import { SITE_URL } from '@/content/site';

export function generateStaticParams() {
  return getAllAiWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const build = getAiWorkBySlug(slug);
  if (!build) return {};
  const firstParagraph = build.blocks.find((b) => b.type === 'paragraph');
  const title = `${build.title} - 한송무`;
  const description = firstParagraph
    ? `${firstParagraph.text.slice(0, 120)}…`
    : build.category;
  // 루트 layout 의 openGraph 는 사이트 공통값이라, 상세 링크를 공유하면 제목이
  // "한송무 - Portfolio" 로 뜬다. 페이지별로 덮어써야 프로젝트명이 보인다.
  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/ai/${slug}/`,
      title,
      description,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = getAiWorkBySlug(slug);
  if (!build) notFound();
  return <BuildDetail build={build} />;
}
