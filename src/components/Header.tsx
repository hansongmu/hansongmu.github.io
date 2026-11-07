import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Header() {
  return (
    <FadeIn>
      <header>
        <h1 className="text-[44px] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
          {profile.name}
        </h1>
        <p className="mt-2.5 text-xl font-semibold tracking-[-0.01em] text-ink">{profile.tagline}</p>
        <p className="mt-3.5 max-w-[20em] text-base leading-[1.6] text-mute">{profile.motto}</p>
      </header>
    </FadeIn>
  );
}
