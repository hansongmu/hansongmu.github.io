# 프로젝트 페이지 스켈레톤 (이미지 로딩 + 라우트 전환) Design

**Date:** 2026-07-03
**Scope:** 프로젝트 상세 페이지(`/projects/[slug]`)의 로딩 체감 개선만. 홈의 Projects 목록(텍스트 링크, 초기 HTML에 이미 존재)은 대상 아님. 콘텐츠(`builds.ts`) 문구·이미지는 변경하지 않는다.

## 목표

프로젝트 상세로 진입할 때 두 지점의 빈 공간/깜빡임을 스켈레톤으로 채워 체감 로딩을 개선한다.

1. **이미지 로딩** — 스크린샷 124장이 로드되는 동안 정확한 자리를 미리 잡고 shimmer를 보여준 뒤 부드럽게 페이드인. (핵심)
2. **라우트 전환** — 목록 클릭 후 상세 페이지가 오는 동안 골격 스켈레톤 표시. (보조)

## 제약 / 전제

- `output: "export"` 정적 사이트. 서버 없음.
- `loading.tsx`는 서버 스트리밍이 아니라 App Router 클라이언트 내비게이션의 Suspense fallback으로 동작. 페이지가 정적 + prefetch되므로 전환이 빠를 땐 거의 안 보이고, 느린 네트워크/캐시 미스일 때 나타나는 보조 장치다. (Next 16 `loading.js` 문서 확인 완료)
- 이미지 블록 타입(`{ type:'image'; src; alt; caption? }`)에는 크기 정보가 없다 → 종횡비를 별도로 공급해야 CLS(로드 시 화면 튐)를 0으로 만들 수 있다.

## Part 1 — 이미지 로딩 스켈레톤

### 크기맵 자동 생성
- `scripts/gen-image-dims.mjs`: `public/projects/**/*.png` 를 순회하며 PNG 헤더(IHDR: width @offset16, height @offset20, big-endian uint32)에서 픽셀 크기를 읽는다. 외부 의존성 없이 `fs`만 사용.
- 산출물 `src/content/imageDims.ts`: `export const imageDims: Record<string, { w: number; h: number }>` — 키는 `/projects/...` public 절대경로(= 이미지 블록 `src`와 동일).
- 이미지 추가/교체 시 스크립트만 재실행. `builds.ts`는 손대지 않는다.
- PNG가 아닌 파일을 만나면 경고 후 건너뛴다(현재 124장 전부 PNG).

### ProjectImage 개선 (`'use client'` 유지)
- `imageDims[src]` 로 종횡비를 구해 이미지 컨테이너에 `aspect-ratio`를 인라인 지정 → 로드 전에도 정확한 높이 확보(CLS 0). 맵에 없으면 aspect 미지정(기존처럼 자연 높이, shimmer만).
- 컨테이너에 shimmer 배경. `<img>`는 `opacity-0`으로 시작, `onLoad` 시 `useState`로 `loaded=true` → `opacity-100` transition 페이드인. 로드 완료 시 shimmer 숨김.
- 라이트박스(확대 보기) 동작은 그대로 유지.
- 브라우저 캐시로 이미 로드된 이미지는 `onLoad`가 안 뛸 수 있으므로, ref의 `complete` 플래그를 마운트 시 확인해 즉시 `loaded` 처리.

### globals.css
- 기존 `image-zoom-fade-in` 옆에 `@keyframes shimmer` 1개 추가(배경 위치 이동 방식). shimmer 요소는 유틸 클래스 조합 + 이 키프레임으로 구성.

## Part 2 — 라우트 전환 스켈레톤

- `src/app/projects/[slug]/loading.tsx` (Server Component, 파라미터 없음).
- `BuildDetail` 골격을 흉내낸 정적 스켈레톤: `max-w-[688px]` 컨테이너 안에 제목 바 1개, 메타 행 3~4개(소속/역할/기간/기술), 문단 라인 몇 줄, 이미지 블록 2개 정도를 회색 shimmer 박스로 배치.
- 실제 콘텐츠 크기를 정확히 맞출 필요는 없다(내용마다 다름) — "무언가 오고 있다"를 알리는 수준.

## 비목표 (YAGNI)

- 홈 Projects 목록 스켈레톤(불필요, 초기 HTML에 존재).
- 이미지 blur-up/LQIP(저해상도 미리보기) — shimmer로 충분.
- `builds.ts`에 크기 필드 인라인 추가(맵 분리가 덜 침습적).
- 다크모드 대응(별도 과제).

## 테스트 / 검증

- 단위: `gen-image-dims.mjs`의 PNG 크기 파싱 로직을 순수 함수로 분리해 vitest로 검증(알려진 PNG 1장의 w/h 확인). 기존 `getBuild.test.ts` 스타일 준수.
- 통합: `pnpm test` 통과, `pnpm build`(export) 성공, `imageDims.ts`가 124개 항목을 담는지 확인.
- 육안: `:3002`에서 상세 페이지 진입 시 (네트워크 스로틀 하) shimmer→페이드인 및 CLS 없음 확인.
