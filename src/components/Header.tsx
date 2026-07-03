import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Header() {
  return (
    <FadeIn>
      <header className="pt-16">
        {/* 정적 export: next/image 대신 일반 img 사용 */}
        <img
          src="/profile.png"
          alt={`${profile.name} 프로필 사진`}
          className="mb-4 h-44 w-36 rounded-2xl border border-neutral-200 object-cover object-[center_30%]"
        />
        <h1 className="text-[17px] font-bold leading-[1.7] text-neutral-900">
          {profile.name}
        </h1>
        <p className="text-sm leading-[1.6] text-neutral-500">{profile.tagline}</p>
      </header>
    </FadeIn>
  );
}
