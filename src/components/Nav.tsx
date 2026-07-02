import Link from 'next/link';

export function Nav() {
  return (
    <nav className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[688px] items-center px-4 py-4">
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
