import { Header } from '@/components/Header';
import { Intro } from '@/components/Intro';
import { Career } from '@/components/Career';
import { BuildList } from '@/components/BuildList';
import { TechStack } from '@/components/TechStack';
import { SectionDivider } from '@/components/SectionDivider';
import { builds } from '@/content/builds';

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
      <BuildList builds={builds} />
    </div>
  );
}
