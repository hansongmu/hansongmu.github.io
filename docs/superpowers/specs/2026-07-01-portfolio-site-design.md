# 한송무 포트폴리오 사이트 — 설계 문서

- **작성일:** 2026-07-01
- **대상 저장소:** `ssong-mu.github.io` (기존 정적 HTML 사이트를 Next.js로 전면 교체)
- **작업 브랜치:** `redesign-nextjs`

## 1. 목표

한송무(디자이너/개발자)의 개인 포트폴리오 사이트를 코드로 직접 구현한다.
참고 사이트(Jihoon Yu, jihoonwrks.me)의 **미니멀한 레이아웃 구조와 무드**를 기본 틀로
따르되, 콘텐츠와 세부 디자인은 한송무 본인의 것으로 채운 **독자적인 구현**으로 만든다.
참고 사이트의 문구·이미지·에셋을 그대로 복제하지 않는다.

### 범위에 포함
- 자기소개(Intro) + 작업물(Builds) 목록이 있는 메인 페이지
- 각 작업의 상세 페이지 (이미지 + 설명)

### 범위에서 제외 (YAGNI)
- 글/블로그(Archive) 섹션 — 만들지 않는다
- CMS, 검색, 다국어, 댓글, 서버 API — 전부 제외
- 다크모드 토글 등 부가 기능 — 초기 범위 밖 (추후 확장 가능)

## 2. 기술 스택

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 15 (App Router) | 기존 프로젝트(eip2, ai-app)와 동일 스택 |
| 언어 | TypeScript | 동일 컨벤션 |
| 스타일 | Tailwind CSS | 사용자 선택 |
| 애니메이션 | framer-motion | 은은한 등장/스크롤 효과, 기존 프로젝트에서 사용 중 |
| 빌드 | 정적 export (`output: 'export'`) | GitHub Pages는 정적 호스팅 |
| 패키지 매니저 | pnpm | 기존 환경과 동일 |
| 배포 | GitHub Pages + GitHub Actions | 기존 `ssong-mu.github.io` 주소 유지, 무료 |

## 3. 레이아웃 구조 (참고 사이트에서 추출한 골격)

### 공통 셸
```
상단 고정 Nav  (이름/메뉴 + 연락처)
   ↓
중앙 정렬 좁은 컬럼 (~688px, 여백 많음, 타이포 중심)
   ↓
Footer (© 연도 + 소셜 링크)
```

### 메인 페이지 `/`
```
Header
 ├─ 이름 (한송무, 볼드)
 └─ 한 줄 소개

Intro 섹션
 ├─ 소제목 (예: "About")
 └─ 소개 문단 1~3개

── 구분선 ──

Builds 섹션
 ├─ 섹션 제목 "Builds"
 └─ 리스트 (행마다 구분선)
     └─ [작업 제목] ········ [기간]   → 클릭 시 /builds/[slug]
```

### 상세 페이지 `/builds/[slug]`
```
Title 영역
 ├─ 작업 제목
 └─ 메타 행 (분류 · 소속 · 기간)

Body (아래 블록 패턴이 n번 반복)
 ├─ 섹션 heading
 ├─ 설명 문단
 └─ 이미지 (스크린샷/다이어그램)

Footer
 └─ 다음/이전 작업 링크
```

## 4. 컴포넌트 설계 (역할별 분리)

각 컴포넌트는 하나의 명확한 책임을 가지며 props 인터페이스로만 소통한다.

| 컴포넌트 | 책임 | 주요 props |
|----------|------|-----------|
| `Nav` | 상단 고정 내비게이션 | (없음, 정적) |
| `Footer` | © 표기 + 소셜 링크 | `year`, `links` |
| `Intro` | 이름·소개·문단 렌더 | `name`, `tagline`, `paragraphs` |
| `BuildList` | 작업 목록 컨테이너 | `builds: Build[]` |
| `BuildListItem` | 목록의 한 행 (제목+기간, 링크) | `build: Build` |
| `BuildDetail` | 상세 페이지 본문 (블록 렌더) | `build: Build` |
| `SectionDivider` | 구분선 | (없음) |

## 5. 데이터 모델

작업물 데이터는 코드 안 데이터 파일 `content/builds.ts` 하나로 관리한다.
작업 추가 = 이 파일에 항목 추가 + 이미지 파일 배치.

```ts
// content/builds.ts
export type BuildBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export interface Build {
  slug: string        // URL 경로 (/builds/<slug>)
  title: string       // 작업 제목
  category: string    // 분류 (예: "Design System")
  org?: string        // 소속 (예: "flex")
  period: string      // 기간 (예: "2024. 1 — 2024. 6")
  blocks: BuildBlock[]  // 상세 본문 블록 순서대로
}

export const builds: Build[] = [ /* 항목들 */ ]
```

`Intro` 콘텐츠(이름·소개·문단)도 `content/profile.ts`로 분리해 코드와 콘텐츠를 나눈다.

## 6. 라우팅 & 정적 생성

- `/` → `app/page.tsx` : `builds` 목록을 읽어 `Intro` + `BuildList` 렌더
- `/builds/[slug]` → `app/builds/[slug]/page.tsx`
  - `generateStaticParams()` 로 모든 `slug`를 빌드 타임에 정적 생성
  - 잘못된 slug는 `notFound()` 처리
- `next.config`에 `output: 'export'` 설정 → `out/` 디렉터리에 정적 파일 생성
- 사용자 사이트(`<user>.github.io`)라 basePath 불필요 (루트에 서빙)

## 7. 스타일 방침

- Tailwind 유틸리티로 구현. 중앙 컬럼 폭·여백·타이포 스케일을 참고 사이트 무드에 맞춰 토큰화
- 폰트: Pretendard(한글 본문) + 영문 산세리프. `next/font` 또는 로컬 폰트로 로드
- framer-motion으로 페이지 진입 시 콘텐츠 블록의 은은한 fade/slide-up 등장 애니메이션
- 반응형: 모바일에서 컬럼 폭 100%, 좌우 패딩 적용

## 8. 배포 (GitHub Pages + Actions)

- `.github/workflows/deploy.yml` : push(main) 시 pnpm install → `next build`(정적 export) → `out/` 을 GitHub Pages로 배포
- GitHub 저장소 설정에서 Pages source를 "GitHub Actions"로 지정
- 기존 `ssong-mu.github.io` 주소 그대로 유지
- 정적 export이므로 `.nojekyll` 파일 포함 (Next 자산 경로의 `_` 폴더 처리)

## 9. 기존 저장소 처리

- 현재 저장소의 옛 정적 파일(`index.html`, `css/`, `sass/`, `js/`, `prepros-6.config` 등)은 제거하고 Next.js 구조로 대체
- `redesign-nextjs` 브랜치에서 작업 후 리뷰를 거쳐 `main`에 반영
- 필요 시 기존 사이트는 git 이력에 그대로 보존됨

## 10. 검증 기준 (완료 조건)

- `pnpm build`가 오류 없이 정적 export 생성
- 로컬에서 메인 페이지 + 상세 페이지 정상 렌더 및 링크 이동 확인
- 목록 항목 클릭 → 해당 상세 페이지로 라우팅
- 반응형(모바일/데스크톱) 레이아웃 확인
- GitHub Actions 워크플로로 Pages 배포 성공
