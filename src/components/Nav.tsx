import Link from 'next/link';
import { profile } from '@/content/profile';

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 w-full border-b border-neutral-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[688px] items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold text-neutral-900">
          {profile.name}
        </Link>
        <a
          href="mailto:gksthdan@naver.com"
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
