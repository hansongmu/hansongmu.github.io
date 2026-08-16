import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Header() {
  return (
    <FadeIn>
      <header className="pt-16">
        <h1 className="text-[17px] font-bold leading-[1.7] text-neutral-900">
          {profile.name}
        </h1>
        <p className="text-sm leading-[1.6] text-neutral-500">{profile.tagline}</p>
      </header>
    </FadeIn>
  );
}
