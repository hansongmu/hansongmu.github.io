import type { TechGroup } from './types';

export const techStack: TechGroup[] = [
  { category: 'Frontend', items: ['Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI', 'Socket.io', 'EJS'] },
  {
    category: 'Infra & Database',
    items: ['MSSQL', 'Redis', 'Qdrant', 'ElasticSearch', 'Nginx', 'Podman'],
  },
  { category: 'AI Frameworks', items: ['LangChain', 'LangGraph'] },
  {
    category: 'Tools',
    items: ['Git', 'Github Actions', 'Sentry', 'pnpm', 'Claude Code', 'Cursor', 'Codex'],
  },
];
