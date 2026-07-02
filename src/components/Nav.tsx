import Link from 'next/link';
import { ProgressiveBlur } from './ProgressiveBlur';

export function Nav() {
  return (
    <nav className="fixed top-0 z-10 h-20 w-full">
      <ProgressiveBlur />
      <div className="relative flex w-full items-center px-4 py-4">
        <Link
          href="/"
          className="flex h-7 items-center rounded-lg px-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100"
        >
          Index
        </Link>
      </div>
    </nav>
  );
}
