import { Header } from '@/components/Header';
import { Intro } from '@/components/Intro';
import { Career } from '@/components/Career';
import { BuildList } from '@/components/BuildList';
import { AiList } from '@/components/AiList';
import { ArchiveList } from '@/components/ArchiveList';
import { TechStack } from '@/components/TechStack';
import { SectionDivider } from '@/components/SectionDivider';
import { getProjectBuilds } from '@/content/getBuild';
import { getAiEntries } from '@/content/getAiWork';
import { getArchiveItems } from '@/content/getArchive';

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[688px] px-4">
      <Header />
      <Intro />
      <SectionDivider />
      <Career />
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <AiList entries={getAiEntries()} />
      <SectionDivider />
      <BuildList builds={getProjectBuilds()} delay={0.18} />
      <SectionDivider />
      <ArchiveList items={getArchiveItems()} />
    </div>
  );
}
