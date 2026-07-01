import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[688px] px-4 py-16">
      <div className="flex items-center justify-between border-t border-neutral-100 pt-6">
        <span className="text-xs text-neutral-400">© 2026 {profile.name}</span>
        <div className="flex gap-4">
          {profile.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-neutral-900"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
