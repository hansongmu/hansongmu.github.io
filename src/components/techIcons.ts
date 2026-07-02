import {
  siNextdotjs,
  siTypescript,
  siJavascript,
  siHtml5,
  siNodedotjs,
  siExpress,
  siFastapi,
  siSocketdotio,
  siEjs,
  siRedis,
  siQdrant,
  siElasticsearch,
  siNginx,
  siPodman,
  siLangchain,
  siLanggraph,
  siGit,
  siGithubactions,
  siSentry,
  siPnpm,
  siClaudecode,
  siCursor,
} from 'simple-icons';

// simple-icons에 없는 항목(상표권 사유 제외)은 제네릭 글리프로 대체
const databaseGlyph =
  'M12 2C7.58 2 4 3.79 4 6v12c0 2.21 3.58 4 8 4s8-1.79 8-4V6c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm6 14c0 .5-2.13 2-6 2s-6-1.5-6-2v-3.23C7.61 15.53 9.72 16 12 16s4.39-.47 6-1.23V18zm0-5c0 .5-2.13 2-6 2s-6-1.5-6-2V9.77C7.61 10.53 9.72 11 12 11s4.39-.47 6-1.23V13z';
const terminalGlyph =
  'M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM5.293 8.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L8.586 12 5.293 8.707zM18 17h-5a1 1 0 1 1 0-2h5a1 1 0 1 1 0 2z';

export const techIcons: Record<string, string> = {
  'Next.js': siNextdotjs.path,
  TypeScript: siTypescript.path,
  JavaScript: siJavascript.path,
  'HTML/CSS': siHtml5.path,
  'Node.js': siNodedotjs.path,
  'Express.js': siExpress.path,
  FastAPI: siFastapi.path,
  'Socket.io': siSocketdotio.path,
  EJS: siEjs.path,
  MSSQL: databaseGlyph,
  Redis: siRedis.path,
  Qdrant: siQdrant.path,
  ElasticSearch: siElasticsearch.path,
  Nginx: siNginx.path,
  Podman: siPodman.path,
  LangChain: siLangchain.path,
  LangGraph: siLanggraph.path,
  Git: siGit.path,
  'Github Actions': siGithubactions.path,
  Sentry: siSentry.path,
  pnpm: siPnpm.path,
  'Claude Code': siClaudecode.path,
  Cursor: siCursor.path,
  Codex: terminalGlyph,
};
