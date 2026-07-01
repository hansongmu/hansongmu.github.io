import { Intro } from '@/components/Intro';
import { BuildList } from '@/components/BuildList';
import { SectionDivider } from '@/components/SectionDivider';
import { builds } from '@/content/builds';

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[688px] px-4">
      <Intro />
      <SectionDivider />
      <BuildList builds={builds} />
    </div>
  );
}
