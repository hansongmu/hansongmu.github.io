import { Fragment } from 'react';
import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[688px] px-4 pb-16 pt-28">
      <div className="h-px w-full bg-neutral-200" />
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[13px] font-medium text-neutral-400">
          © 2026 {profile.name}
        </span>
        <div className="flex items-center gap-3">
          {profile.links.map((l, i) => (
            <Fragment key={l.href}>
              {i > 0 && <span className="h-3 w-px bg-neutral-200" />}
              <a
                href={l.href}
                className="text-[13px] font-medium text-neutral-400 hover:text-neutral-900"
              >
                {l.label}
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
