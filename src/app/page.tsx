import { Header } from '@/components/Header';
import { Intro } from '@/components/Intro';
import { Career } from '@/components/Career';
import { BuildList } from '@/components/BuildList';
import { AiList } from '@/components/AiList';
import { TechStack } from '@/components/TechStack';
import { SectionIndex } from '@/components/SectionIndex';
import { getOtherBuilds, getProjectBuilds } from '@/content/getBuild';
import { getAiEntries } from '@/content/getAiWork';
import { profile } from '@/content/profile';

const SECTIONS = [
  { id: 'about', text: 'About' },
  { id: 'ai', text: 'AI', accent: true },
  { id: 'career', text: 'Career' },
  { id: 'tech', text: 'Tech' },
  { id: 'projects', text: 'Projects' },
  { id: 'other', text: 'Other' },
];

export default function Home() {
  return (
    <div data-home className="mx-auto w-full max-w-[1184px] px-6 lg:flex lg:gap-10 lg:px-10">
      <div className="pt-16 lg:sticky lg:top-0 lg:h-screen lg:w-[42%] lg:shrink-0 lg:py-20">
        <Header />
        <SectionIndex items={SECTIONS} variant="inline" />
      </div>
      <div className="min-w-0 flex-1 space-y-[72px] pb-20 pt-14 lg:py-20">
        <Intro />
        <AiList entries={getAiEntries()} />
        <Career />
        <TechStack />
        <BuildList builds={getProjectBuilds()} id="projects" />
        <BuildList builds={getOtherBuilds()} id="other" title="Other" />
        <p className="text-[13px] text-neutral-400">© 2026 {profile.name}</p>
      </div>
    </div>
  );
}
