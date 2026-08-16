import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArchiveBySlug, getAllArchiveSlugs } from '@/content/getArchive';
import { BuildDetail } from '@/components/BuildDetail';
import { SITE_URL } from '@/content/site';

export function generateStaticParams() {
  return getAllArchiveSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getArchiveBySlug(slug);
  if (!item) return {};
  const firstParagraph = item.blocks.find((b) => b.type === 'paragraph');
  const title = `${item.title} - 한송무`;
  const description = firstParagraph
    ? `${firstParagraph.text.slice(0, 120)}…`
    : item.category;
  return {
    title,
    description,
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/archive/${slug}/`,
      title,
      description,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getArchiveBySlug(slug);
  if (!item) notFound();
  return <BuildDetail build={item} />;
}
