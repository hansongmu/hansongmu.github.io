# 한송무 포트폴리오 사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 정적 HTML 사이트를 Next.js 15 기반 미니멀 포트폴리오(자기소개 + 작업물 목록 + 작업 상세 페이지)로 전면 교체하고 GitHub Pages에 자동 배포한다.

**Architecture:** Next.js 15 App Router로 정적 사이트(`output: 'export'`)를 생성한다. 콘텐츠(프로필·작업물)는 `content/` 데이터 파일로 코드와 분리하고, UI는 역할별 컴포넌트로 나눈다. 순수 로직(데이터 조회)만 Vitest로 테스트하고, UI/레이아웃은 타입체크 + `next build` + 로컬 렌더 확인으로 검증한다. GitHub Actions가 push마다 빌드·배포한다.

**Tech Stack:** Next.js 16 (App Router, Turbopack, Tailwind v4), React 19, TypeScript, framer-motion, Vitest, pnpm, GitHub Actions.

> 참고: Task 1에서 `create-next-app@latest`가 **Next.js 16 + React 19 + Tailwind v4**를 설치함(브리프의 "15"는 참고용). 이 저장소 `AGENTS.md`가 "학습된 Next.js와 다르다"고 명시하므로, Next.js 코드를 작성하기 전 `node_modules/next/dist/docs/`의 해당 가이드를 확인할 것.

## Global Constraints

- 패키지 매니저는 **pnpm** 사용 (npm/yarn 금지).
- Next.js는 **정적 export** 로만 동작: `next.config`에 `output: 'export'`, `images.unoptimized: true`. 서버 전용 기능(API route, `dynamic = 'force-dynamic'`, 서버 액션) 사용 금지.
- 사용자 사이트(`ssong-mu.github.io`)이므로 `basePath`/`assetPrefix` 설정하지 않는다(루트 서빙).
- 콘텐츠 문구·이미지는 참고 사이트(jihoonwrks.me)에서 복제하지 않는다. 플레이스홀더 콘텐츠는 한송무 본인 정보로 채운다.
- Archive(글) 섹션은 만들지 않는다.
- 커밋은 작은 단위로 자주. 작업 브랜치는 `redesign-nextjs`.
- import alias는 `@/*` (src 디렉터리 기준).

---

### Task 1: Next.js 프로젝트 스캐폴딩 & 정적 export 설정

기존 옛 정적 파일을 제거하고, 빈 임시 디렉터리에 Next.js를 생성한 뒤 저장소로 옮긴다. (create-next-app은 비어있지 않은 디렉터리를 거부하므로 임시 디렉터리 경유.)

**Files:**
- Delete: `index.html`, `css/`, `sass/`, `js/`, `images/`, `pdf/`, `fonts/`, `prepros-6.config`, `.DS_Store`
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `.gitignore`, `postcss.config.mjs` 등 (create-next-app 생성물)
- Create: `public/.nojekyll`

**Interfaces:**
- Produces: `pnpm dev`, `pnpm build`가 동작하는 Next 15 App Router + TS + Tailwind 프로젝트. import alias `@/*` → `src/*`.

- [ ] **Step 1: 옛 정적 사이트 파일 제거**

```bash
cd /home/zeus/project/ssong-mu.github.io
git rm -r --quiet index.html css sass js images pdf fonts prepros-6.config 2>/dev/null || true
rm -f .DS_Store
git rm --quiet --cached .DS_Store 2>/dev/null || true
```

- [ ] **Step 2: 임시 디렉터리에 Next 앱 생성**

```bash
rm -rf /tmp/ssongmu-next && \
pnpm create next-app@latest /tmp/ssongmu-next \
  --ts --tailwind --app --eslint --src-dir \
  --import-alias "@/*" --no-turbopack --use-pnpm
```
Expected: `/tmp/ssongmu-next`에 Next 15 프로젝트 생성 완료 메시지.

- [ ] **Step 3: 생성물을 저장소로 이동(.git 제외)**

```bash
cd /tmp/ssongmu-next && rm -rf .git && \
cp -a ./. /home/zeus/project/ssong-mu.github.io/ && \
cd /home/zeus/project/ssong-mu.github.io && ls package.json next.config.* src/app/page.tsx
```
Expected: `package.json`, `next.config.*`, `src/app/page.tsx` 경로가 출력됨.

- [ ] **Step 4: 정적 export 설정**

`next.config.mjs`(또는 생성된 `.ts`) 내용을 아래로 교체:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 5: GitHub Pages용 .nojekyll 추가**

```bash
touch /home/zeus/project/ssong-mu.github.io/public/.nojekyll
```

- [ ] **Step 6: 의존성 설치 및 빌드 검증**

```bash
cd /home/zeus/project/ssong-mu.github.io && pnpm install && pnpm build
```
Expected: 빌드 성공, `out/` 디렉터리 생성. (`out/index.html` 존재)

```bash
ls out/index.html
```
Expected: `out/index.html` 출력.

- [ ] **Step 7: out/ 을 .gitignore에 추가하고 커밋**

`.gitignore`에 아래 줄이 없으면 추가: `/out/`

```bash
cd /home/zeus/project/ssong-mu.github.io
grep -qxF '/out/' .gitignore || echo '/out/' >> .gitignore
git add -A
git commit -m "chore: scaffold Next.js 15 with static export, remove legacy site"
```

---

### Task 2: 콘텐츠 데이터 계층 (타입 + 데이터 + 조회 헬퍼)

작업물/프로필 데이터를 코드와 분리하고, slug로 작업을 찾는 순수 함수를 테스트와 함께 만든다.

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/builds.ts`
- Create: `src/content/profile.ts`
- Create: `src/content/getBuild.ts`
- Test: `src/content/getBuild.test.ts`
- Modify: `package.json` (vitest 스크립트), `vitest.config.ts` 생성

**Interfaces:**
- Produces:
  - `type BuildBlock = { type: 'heading'; text: string } | { type: 'paragraph'; text: string } | { type: 'image'; src: string; alt: string; caption?: string }`
  - `interface Build { slug: string; title: string; category: string; org?: string; period: string; tech?: string; blocks: BuildBlock[] }`
  - `interface Profile { name: string; tagline: string; paragraphs: string[]; links: { label: string; href: string }[] }`
  - `const builds: Build[]`
  - `const profile: Profile`
  - `function getBuildBySlug(slug: string): Build | undefined`
  - `function getAllBuildSlugs(): string[]`

- [ ] **Step 1: Vitest 설치**

```bash
cd /home/zeus/project/ssong-mu.github.io && pnpm add -D vitest
```

- [ ] **Step 2: vitest 설정 및 스크립트 추가**

`vitest.config.ts` 생성:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
});
```

`package.json`의 `"scripts"`에 추가: `"test": "vitest run"`

- [ ] **Step 3: 타입 정의**

`src/content/types.ts`:

```ts
export type BuildBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface Build {
  slug: string;
  title: string;
  category: string;
  org?: string;
  period: string;
  tech?: string;
  blocks: BuildBlock[];
}

export interface Profile {
  name: string;
  tagline: string;
  paragraphs: string[];
  links: { label: string; href: string }[];
}
```

- [ ] **Step 4: 프로필 데이터 (한송무 본인 정보 플레이스홀더)**

`src/content/profile.ts`:

```ts
import type { Profile } from './types';

export const profile: Profile = {
  name: '한송무',
  tagline: '5년차 풀스택 개발자 · Seoul, Korea',
  paragraphs: [
    '반도체·디스플레이 장비 제조 기업 제우스에서 사내 시스템을 개발·운영합니다. 요구사항 분석부터 DB 모델링, UI/UX 설계, API 개발, 배포·운영까지 전 과정(End-to-End)을 직접 다룹니다.',
    'AI 플랫폼, 업무 앱 제작 플랫폼, PMS, CRM, 인사평가 등 전사 업무용 시스템을 만들었습니다. 프론트엔드는 Next.js, 백엔드는 Node.js·FastAPI, 데이터베이스는 MSSQL을 주로 사용합니다.',
    '“편함보다는 불편함을 추구하는 개발자”를 지향합니다. 개발자의 편의보다 사용자 경험을 우선하고, 유지보수성과 확장성을 고려한 구조 설계에 집중합니다.',
  ],
  links: [
    { label: 'Email', href: 'mailto:han95@globalzeus.com' },
    { label: 'GitHub', href: 'https://github.com/ssong-mu' },
  ],
};
```

- [ ] **Step 5: 작업물 데이터 (실제 프로젝트)**

> 아래 `period`/`org` 중 일부는 확인 필요 값(주석 표시). 사용자 확인 후 값 채운다.

`src/content/builds.ts`:

```ts
import type { Build } from './types';

export const builds: Build[] = [
  {
    slug: 'ai-platform',
    title: '사내 AI 플랫폼 (RAG 챗봇)',
    category: 'AI Platform',
    org: 'GlobalZeus',
    period: '2025', // TODO: 정확한 수행 기간 확인
    tech: 'Next.js · Node.js · FastAPI · LangGraph · Qdrant · Redis · MSSQL',
    blocks: [
      { type: 'heading', text: '주요 내용' },
      { type: 'paragraph', text: 'RAG(Retrieval-Augmented Generation) 기반 사내 챗봇 AI 플랫폼을 설계 및 개발했습니다.' },
      { type: 'paragraph', text: '문서 업로드 시 파싱·청킹·임베딩·벡터 DB 저장까지 자동화된 데이터 파이프라인을 구축했습니다.' },
      { type: 'paragraph', text: '일반 질의, 사내 문서 검색, 프로젝트 파일 검색, 웹 검색, 사내 업무 데이터 조회를 통합한 멀티 소스 질의 처리 구조를 설계했습니다.' },
      { type: 'paragraph', text: 'LangGraph 기반 상태형 LLM 워크플로우(Agent Flow)로 질의 유형에 따른 분기와 응답 흐름을 구현했습니다.' },
      { type: 'paragraph', text: '자연어 요청으로 docx·xlsx·pdf·pptx 등 6종 포맷 문서를 자동 생성해 채팅 메시지에 첨부하는 기능을 구현했습니다.' },
      { type: 'paragraph', text: 'SSE 기반 실시간 스트리밍 응답과 Redis Stream 기반 응답 재개 구조를 적용해, 새로고침이나 네트워크 단절 시에도 진행 중인 응답을 이어볼 수 있도록 했습니다.' },
      { type: 'heading', text: '주요 성과' },
      { type: 'paragraph', text: '프론트엔드·백엔드·RAG 서버를 연계해 문서 등록부터 검색, 응답 생성, 문서 생성까지 하나의 서비스 흐름으로 통합했습니다.' },
      { type: 'paragraph', text: '관리자 대시보드로 사용자별 사용량, 토큰 사용량, 모델별 비용, 지식별 활용 현황을 통합 확인할 수 있도록 구현했습니다.' },
      { type: 'paragraph', text: '사용자별 한도와 과금 모델 사용 제한 정책을 반영해 비용 통제·운영 관리 기반을 강화했습니다.' },
    ],
  },
  {
    slug: 'work-app-platform',
    title: '업무 앱 제작 플랫폼',
    category: 'No-Code Platform',
    org: 'GlobalZeus',
    period: '2026',
    tech: 'Next.js · Node.js · MSSQL · Redis · Socket.IO',
    blocks: [
      { type: 'heading', text: '주요 내용' },
      { type: 'paragraph', text: '그룹웨어 전환 과정에서 다우오피스 Works를 대체하기 위한 노코드 기반 사내 협업 플랫폼을 1인 풀스택으로 구축했습니다.' },
      { type: 'paragraph', text: '코드 없이 입력 양식을 설계하는 폼 빌더와, 필드 단위로 외부 DB SELECT 쿼리를 연동하는 데이터 연동 기능을 구현했습니다.' },
      { type: 'paragraph', text: '목록을 테이블·보드(칸반)로 전환하고 게이지·막대·라인·카드 차트로 시각화하는 화면을 구현했습니다.' },
      { type: 'paragraph', text: '상태 머신(워크플로우) 기반 프로세스 관리와, 저장 시 정합성 오류를 서버에서 검증하는 방어 로직을 구성했습니다.' },
      { type: 'paragraph', text: '공유 범위·역할 기반 권한·문서/앱 단위 비공개를 조합한 접근 제어를 구현했습니다.' },
      { type: 'heading', text: '주요 성과' },
      { type: 'paragraph', text: '앱 간 데이터 참조, CSV 일괄 등록(백그라운드 워커), 비동기 큐 기반 다운로드 등 운영 기능을 통합했습니다.' },
      { type: 'paragraph', text: '앱별 API Key 발급으로 외부 시스템과 연동하고, 사내 표준 결재 시스템과의 연동까지 지원해 노코드 앱을 실제 업무 흐름에 연결했습니다.' },
    ],
  },
  {
    slug: 'pms',
    title: '프로젝트 관리 시스템 (PMS)',
    category: 'Enterprise System',
    org: 'GlobalZeus',
    period: '2023 — 2025',
    tech: 'Next.js · Node.js · MSSQL · Elasticsearch · Socket.IO',
    blocks: [
      { type: 'heading', text: '주요 내용' },
      { type: 'paragraph', text: 'PMS 전반 아키텍처를 설계하고, WBS 기반 프로젝트 구조를 중심으로 보고·업무노트·산출물 관리 기능을 구현했습니다.' },
      { type: 'paragraph', text: 'ERP 연동 프로젝트 생성·관리 기능과 대시보드·설계정보·원가정보·공수정보 조회 기능을 개발했습니다.' },
      { type: 'paragraph', text: 'Elasticsearch 기반 통합 검색(보고·업무노트·댓글·첨부)을 설계·구현했습니다.' },
      { type: 'paragraph', text: 'Socket.IO를 활용한 메모 동시 작성 제어·편집 상태 표시·이탈 처리 기능을 구현했습니다.' },
      { type: 'heading', text: '주요 성과' },
      { type: 'paragraph', text: 'WBS 기반 보고·업무노트·산출물 관리를 중심으로 프로젝트 수행 이력을 체계적으로 관리할 수 있는 구조를 구현했습니다.' },
      { type: 'paragraph', text: 'ERP 연동으로 설계·원가·공수 정보를 통합 조회하고, 통합 검색과 정기 보고 자동화로 운영 편의를 높였습니다.' },
    ],
  },
  {
    slug: 'crm',
    title: '고객 관계 관리 시스템 (CRM)',
    category: 'Enterprise System',
    org: 'GlobalZeus',
    period: '2024', // TODO: 정확한 수행 기간 확인
    tech: 'Next.js · Node.js · MSSQL',
    blocks: [
      { type: 'heading', text: '주요 내용' },
      { type: 'paragraph', text: '거래처·담당자·영업 프로젝트·영업 활동 중심의 CRM 시스템 화면과 기능을 설계하고 구현했습니다.' },
      { type: 'paragraph', text: '거래처 정보·담당자 그룹·영업 프로젝트·활동 이력을 공통으로 확인할 수 있는 재사용 가능한 UI 컴포넌트 구조를 설계했습니다.' },
      { type: 'paragraph', text: '거래처별 영업 활동과 구성원 일정을 월간·주간 캘린더로 시각화했습니다.' },
      { type: 'paragraph', text: 'ERP 데이터 연동으로 거래처별 매출·견적·품목·장비·AS·실적 현황을 조회할 수 있는 기능을 개발했습니다.' },
      { type: 'heading', text: '주요 성과' },
      { type: 'paragraph', text: '거래처·담당자·프로젝트·활동을 하나의 흐름으로 연결해 데이터 관리 일관성을 높였습니다.' },
      { type: 'paragraph', text: '공통 리스트·상세 패널·태스크바 등 재사용 화면 구조를 적용해 기능 확장과 유지보수 효율을 개선했습니다.' },
    ],
  },
  {
    slug: 'hr-evaluation',
    title: '인사평가 시스템',
    category: 'Enterprise System',
    org: 'GlobalZeus',
    period: '2023 — 2024',
    tech: 'Next.js · Node.js · MSSQL',
    blocks: [
      { type: 'heading', text: '주요 내용' },
      { type: 'paragraph', text: '목표 기반 인사평가 체계의 시스템 구조를 설계하고 UI/UX를 기획·구현했습니다.' },
      { type: 'paragraph', text: '사업부·그룹·팀·개인 단위로 연결되는 계층형 목표 설정 및 성과 관리 화면을 설계·개발했습니다.' },
      { type: 'paragraph', text: '목표별 최종 성과 입력과 가중치 반영 자동 점수 산정 로직을 구현했습니다.' },
      { type: 'paragraph', text: '부서별 상대평가·절대평가를 구분한 종합평가와 평가 등급 자동 부여 기능을 개발했습니다.' },
      { type: 'heading', text: '주요 성과' },
      { type: 'paragraph', text: '목표 설정부터 성과 관리·업적평가·역량평가·종합평가·등급 부여까지 이어지는 인사평가 프로세스를 시스템화했습니다.' },
      { type: 'paragraph', text: '목표별 가중치 반영 자동 점수 산정으로 평가 산식의 일관성과 운영 효율을 높였습니다.' },
    ],
  },
  {
    slug: 'visit-reservation',
    title: '방문 예약 시스템',
    category: 'Enterprise System',
    org: 'GlobalZeus',
    period: '2024', // TODO: 정확한 수행 기간 확인
    tech: 'Next.js · Node.js · MSSQL',
    blocks: [
      { type: 'heading', text: '주요 내용' },
      { type: 'paragraph', text: '임직원 승인 절차 기반의 출입 관리를 위해 방문예약 시스템 화면과 기능을 설계하고 개발했습니다.' },
      { type: 'paragraph', text: '신청 유형에 따라 교육 이수·서약서 작성·QR 코드 발급으로 이어지는 프로세스를 구현했습니다.' },
      { type: 'paragraph', text: '임직원 신청자와 비회원 방문객을 구분해 각각의 신청·조회·처리 흐름을 반영했습니다.' },
      { type: 'paragraph', text: '경비실·키오스크 환경에서 방문 현황·QR 확인·카드 배포 및 회수 상태를 관리하는 화면을 개발했습니다.' },
      { type: 'heading', text: '주요 성과' },
      { type: 'paragraph', text: '방문 신청→교육·서약→승인→출입 확인까지 이어지는 전체 방문 관리 프로세스를 하나의 시스템으로 통합했습니다.' },
      { type: 'paragraph', text: '방문 유형별 교육·서약·카드 발급 정책을 다르게 적용할 수 있는 구조로 운영 유연성을 높였습니다.' },
    ],
  },
  {
    slug: 'attendance',
    title: '근태현황 및 이상치 소명 시스템',
    category: 'Enterprise System',
    org: 'GlobalZeus',
    period: '2025. 1 — 2025. 3',
    tech: 'Node.js · EJS · MSSQL',
    blocks: [
      { type: 'heading', text: '주요 내용' },
      { type: 'paragraph', text: '선택적 근로제 도입에 맞춰 누락·이상 근무 데이터를 체계적으로 관리하는 시스템을 1인 풀스택으로 구축했습니다.' },
      { type: 'paragraph', text: '관리자가 일일이 확인하는 대신 “임직원 셀프 소명 → 자동 집계 → 부서장 자동 보고” 흐름으로 설계했습니다.' },
      { type: 'paragraph', text: '이상치 정의·분석 로직과 유형별 발생 빈도·추이를 차트로 시각화한 근태 대시보드를 구현했습니다.' },
      { type: 'heading', text: '주요 성과' },
      { type: 'paragraph', text: '소명 데이터를 집계해 근태 보고서를 자동 생성하고, 매월 1일 cron으로 부서장에게 자동 발송되도록 구현했습니다.' },
      { type: 'paragraph', text: '관리자 부담을 줄이면서 이상 근무를 체계적으로 추적·관리할 수 있는 구조를 마련했습니다.' },
    ],
  },
];
```

- [ ] **Step 6: 실패하는 테스트 작성**

`src/content/getBuild.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { getBuildBySlug, getAllBuildSlugs } from './getBuild';

describe('getBuildBySlug', () => {
  it('returns the build matching the slug', () => {
    const build = getBuildBySlug('sample-project');
    expect(build?.title).toBe('Sample Project');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getBuildBySlug('does-not-exist')).toBeUndefined();
  });
});

describe('getAllBuildSlugs', () => {
  it('returns every build slug', () => {
    const slugs = getAllBuildSlugs();
    expect(slugs).toContain('sample-project');
    expect(slugs).toContain('second-project');
    expect(slugs).toHaveLength(2);
  });
});
```

- [ ] **Step 7: 테스트 실패 확인**

```bash
pnpm test
```
Expected: FAIL — `getBuild` 모듈/함수가 없어서 import 에러.

- [ ] **Step 8: 조회 헬퍼 구현**

`src/content/getBuild.ts`:

```ts
import { builds } from './builds';
import type { Build } from './types';

export function getBuildBySlug(slug: string): Build | undefined {
  return builds.find((b) => b.slug === slug);
}

export function getAllBuildSlugs(): string[] {
  return builds.map((b) => b.slug);
}
```

- [ ] **Step 9: 테스트 통과 확인**

```bash
pnpm test
```
Expected: PASS (3 tests).

- [ ] **Step 10: 커밋**

```bash
git add -A
git commit -m "feat: add content data layer with typed builds/profile and lookup helpers"
```

---

### Task 3: 공통 셸 컴포넌트 (Nav, Footer, SectionDivider) + 루트 레이아웃

전 페이지 공통 골격과 폰트·기본 스타일을 잡는다.

**Files:**
- Create: `src/components/Nav.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/SectionDivider.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `profile` (`@/content/profile`) — Footer가 `profile.links`, `Nav`가 `profile.name` 사용.
- Produces: `<Nav />`, `<Footer />`, `<SectionDivider />` (모두 props 없음). 중앙 컬럼 래퍼 클래스 `mx-auto w-full max-w-[688px] px-4`.

- [ ] **Step 1: 전역 스타일 & 폰트(Pretendard)**

`src/app/globals.css` 상단을 아래로 교체(Tailwind 지시어 유지, Pretendard CDN 로드):

```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-text: #1a1a1a;
  --color-muted: #8a8a8a;
}

html { -webkit-font-smoothing: antialiased; }
body {
  font-family: 'Pretendard', system-ui, sans-serif;
  color: var(--color-text);
  background: #ffffff;
}
```

> 참고: 설치된 Tailwind가 v4라 `@tailwind` 대신 `@import "tailwindcss";` 한 줄만 있을 수 있다. 그 경우 기존 첫 줄을 유지하고 그 위에 Pretendard `@import`만 추가한다. (`@import`는 파일 최상단에 있어야 함.)

- [ ] **Step 2: SectionDivider 구현**

`src/components/SectionDivider.tsx`:

```tsx
export function SectionDivider() {
  return <hr className="my-8 border-t border-neutral-200" />;
}
```

- [ ] **Step 3: Nav 구현**

`src/components/Nav.tsx`:

```tsx
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
          href="mailto:han95@globalzeus.com"
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Footer 구현**

`src/components/Footer.tsx`:

```tsx
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
```

- [ ] **Step 5: 루트 레이아웃에 Nav/Footer 연결 + 메타데이터**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: '한송무 — Portfolio',
  description: 'Interface designer & developer based in Seoul, Korea',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: 타입체크 & 빌드 검증**

```bash
cd /home/zeus/project/ssong-mu.github.io && npx tsc --noEmit && pnpm build
```
Expected: 타입 에러 없음, 빌드 성공.

- [ ] **Step 7: 커밋**

```bash
git add -A
git commit -m "feat: add Nav, Footer, SectionDivider and wire root layout"
```

---

### Task 4: 메인 페이지 (Intro + BuildList)

메인 페이지에 자기소개와 작업 목록을 렌더한다.

**Files:**
- Create: `src/components/Intro.tsx`
- Create: `src/components/BuildListItem.tsx`
- Create: `src/components/BuildList.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile` (`@/content/profile`), `builds` (`@/content/builds`), `Build` 타입, `SectionDivider`.
- Produces: `<Intro />`(props 없음), `<BuildList builds={builds} />`, `<BuildListItem build={build} />`.

- [ ] **Step 1: Intro 구현**

`src/components/Intro.tsx`:

```tsx
import { profile } from '@/content/profile';

export function Intro() {
  return (
    <section className="pt-16">
      <h1 className="text-lg font-bold text-neutral-900">{profile.name}</h1>
      <p className="mt-1 text-sm text-neutral-500">{profile.tagline}</p>
      <div className="mt-6 space-y-4">
        {profile.paragraphs.map((p, i) => (
          <p key={i} className="text-[15px] leading-[1.8] text-neutral-800">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: BuildListItem 구현**

`src/components/BuildListItem.tsx`:

```tsx
import Link from 'next/link';
import type { Build } from '@/content/types';

export function BuildListItem({ build }: { build: Build }) {
  return (
    <Link
      href={`/builds/${build.slug}`}
      className="flex items-center justify-between py-3 group"
    >
      <span className="text-sm text-neutral-900 group-hover:text-blue-600">
        {build.title}
      </span>
      <span className="text-sm text-neutral-400">{build.period}</span>
    </Link>
  );
}
```

- [ ] **Step 3: BuildList 구현**

`src/components/BuildList.tsx`:

```tsx
import type { Build } from '@/content/types';
import { BuildListItem } from './BuildListItem';

export function BuildList({ builds }: { builds: Build[] }) {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-neutral-900">Builds</h2>
      <div className="mt-2 divide-y divide-neutral-100">
        {builds.map((b) => (
          <BuildListItem key={b.slug} build={b} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 메인 페이지 조립**

`src/app/page.tsx`:

```tsx
import { Intro } from '@/components/Intro';
import { BuildList } from '@/components/BuildList';
import { SectionDivider } from '@/components/SectionDivider';
import { builds } from '@/content/builds';

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[688px] px-4">
      <Intro />
      <SectionDivider />
      <BuildList builds={builds} />
    </div>
  );
}
```

- [ ] **Step 5: 타입체크 & 빌드 검증**

```bash
cd /home/zeus/project/ssong-mu.github.io && npx tsc --noEmit && pnpm build
```
Expected: 성공. `out/index.html`에 "한송무", "Builds", "Sample Project" 문자열 포함.

```bash
grep -l "Sample Project" out/index.html
```
Expected: `out/index.html` 출력.

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "feat: build main page with intro and builds list"
```

---

### Task 5: 작업 상세 페이지 `/builds/[slug]`

작업 상세를 블록 순서대로 렌더하고, 모든 slug를 정적 생성한다.

**Files:**
- Create: `src/components/BuildDetail.tsx`
- Create: `src/app/builds/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getBuildBySlug`, `getAllBuildSlugs` (`@/content/getBuild`), `Build`/`BuildBlock` 타입.
- Produces: 정적 생성된 상세 페이지. `generateStaticParams()`가 `{ slug }[]` 반환.

- [ ] **Step 1: BuildDetail 구현**

`src/components/BuildDetail.tsx`:

```tsx
import type { Build } from '@/content/types';

export function BuildDetail({ build }: { build: Build }) {
  return (
    <article className="mx-auto w-full max-w-[688px] px-4 pt-16">
      <header>
        <h1 className="text-lg font-bold text-neutral-900">{build.title}</h1>
        <p className="mt-1 text-sm text-neutral-500">
          {[build.category, build.org, build.period].filter(Boolean).join(' · ')}
        </p>
        {build.tech && (
          <p className="mt-1 text-xs text-neutral-400">{build.tech}</p>
        )}
      </header>

      <div className="mt-10 space-y-6">
        {build.blocks.map((block, i) => {
          if (block.type === 'heading') {
            return (
              <h2 key={i} className="text-[15px] font-semibold text-neutral-900">
                {block.text}
              </h2>
            );
          }
          if (block.type === 'paragraph') {
            return (
              <p key={i} className="text-[15px] leading-[1.8] text-neutral-800">
                {block.text}
              </p>
            );
          }
          return (
            <figure key={i}>
              {/* 정적 export: next/image 대신 일반 img 사용 */}
              <img src={block.src} alt={block.alt} className="w-full rounded-md" />
              {block.caption && (
                <figcaption className="mt-2 text-center text-xs text-neutral-400">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </article>
  );
}
```

- [ ] **Step 2: 상세 라우트 + 정적 생성**

`src/app/builds/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { getBuildBySlug, getAllBuildSlugs } from '@/content/getBuild';
import { BuildDetail } from '@/components/BuildDetail';

export function generateStaticParams() {
  return getAllBuildSlugs().map((slug) => ({ slug }));
}

export default async function BuildPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) notFound();
  return <BuildDetail build={build} />;
}
```

- [ ] **Step 3: 빌드로 정적 생성 검증**

```bash
cd /home/zeus/project/ssong-mu.github.io && npx tsc --noEmit && pnpm build
ls out/builds/sample-project/index.html out/builds/second-project/index.html
```
Expected: 두 상세 페이지 HTML 파일이 모두 생성됨.

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "feat: add build detail pages with static params generation"
```

---

### Task 6: 등장 애니메이션 + 반응형 마감

framer-motion으로 은은한 등장 애니메이션을 넣고 모바일 여백을 다듬는다.

**Files:**
- Create: `src/components/FadeIn.tsx`
- Modify: `src/components/Intro.tsx`, `src/components/BuildList.tsx`, `src/components/BuildDetail.tsx`

**Interfaces:**
- Consumes: `framer-motion`.
- Produces: `<FadeIn>{children}</FadeIn>` — 마운트 시 아래에서 위로 fade-in 하는 클라이언트 래퍼.

- [ ] **Step 1: framer-motion 설치**

```bash
cd /home/zeus/project/ssong-mu.github.io && pnpm add framer-motion
```

- [ ] **Step 2: FadeIn 래퍼 구현 (클라이언트 컴포넌트)**

`src/components/FadeIn.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

export function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: 메인 섹션에 FadeIn 적용**

`src/components/Intro.tsx`의 최상위 `<section>`을 `<FadeIn>`으로 감싼다(‎import 추가). `src/components/BuildList.tsx`의 최상위 `<section>`도 `<FadeIn delay={0.1}>`으로 감싼다.

예 — Intro.tsx:

```tsx
import { profile } from '@/content/profile';
import { FadeIn } from './FadeIn';

export function Intro() {
  return (
    <FadeIn>
      <section className="pt-16">
        {/* 기존 내용 그대로 */}
        <h1 className="text-lg font-bold text-neutral-900">{profile.name}</h1>
        <p className="mt-1 text-sm text-neutral-500">{profile.tagline}</p>
        <div className="mt-6 space-y-4">
          {profile.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-[1.8] text-neutral-800">
              {p}
            </p>
          ))}
        </div>
      </section>
    </FadeIn>
  );
}
```

- [ ] **Step 4: 상세 페이지 헤더에 FadeIn 적용**

`src/components/BuildDetail.tsx`의 `<header>`를 `<FadeIn>`으로 감싼다(import 추가). 나머지 구조는 유지.

- [ ] **Step 5: 타입체크 & 빌드 검증**

```bash
cd /home/zeus/project/ssong-mu.github.io && npx tsc --noEmit && pnpm build
```
Expected: 성공.

- [ ] **Step 6: 로컬 렌더 육안 확인(선택, 사용자와 함께)**

```bash
pnpm dev
```
브라우저에서 `http://localhost:3000` 접속 → 메인/상세 이동 및 애니메이션 확인 후 Ctrl+C.

- [ ] **Step 7: 커밋**

```bash
git add -A
git commit -m "feat: add subtle fade-in animations with framer-motion"
```

---

### Task 7: GitHub Actions로 Pages 자동 배포

push(main) 시 정적 빌드 후 GitHub Pages로 배포하는 워크플로를 추가한다.

**Files:**
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `pnpm build` 결과물 `out/`.
- Produces: main 브랜치 push 시 Pages 배포.

- [ ] **Step 1: 워크플로 작성**

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 워크플로 YAML 유효성 확인**

```bash
cd /home/zeus/project/ssong-mu.github.io && python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml')); print('YAML OK')"
```
Expected: `YAML OK`.

- [ ] **Step 3: 커밋**

```bash
git add -A
git commit -m "ci: add GitHub Actions workflow for Pages deployment"
```

- [ ] **Step 4: (사용자 수행) 저장소 Pages 설정**

GitHub 저장소 → Settings → Pages → **Source: GitHub Actions** 로 지정.
이후 `redesign-nextjs`를 `main`에 병합(또는 PR)하면 배포가 트리거된다.

---

## 배포/병합 안내 (구현 완료 후)

- 모든 태스크 완료 후 `redesign-nextjs` → `main` 병합 여부는 `superpowers:finishing-a-development-branch` 로 결정한다.
- 첫 배포 전 GitHub Pages Source를 "GitHub Actions"로 바꿔야 워크플로 배포가 동작한다(Task 7 Step 4).
