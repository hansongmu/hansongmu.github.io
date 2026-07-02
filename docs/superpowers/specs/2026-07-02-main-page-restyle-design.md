# 메인 페이지 구조 개편 (jihoonwrks.me 스타일 차용) Design

**Date:** 2026-07-02
**Scope:** 메인 페이지 구조·스타일만. Archive 섹션, 검색, 멀티 페이지 네비게이션은 만들지 않는다. 콘텐츠(문구·이미지)는 참고 사이트에서 복제하지 않고 기존 데이터를 유지한다.

## 변경 사항

### Nav
- 이름/Contact 링크 제거.
- 왼쪽에 `Index` 탭 하나 — 알약(pill) 형태(`rounded-lg`), 14px medium, 활성색 진한 회색(neutral-800), 호버 시 옅은 배경. 추후 페이지가 늘면 회색 비활성 탭으로 확장.
- sticky + backdrop blur 유지.

### Header (신규 컴포넌트)
- nav 아래 별도 헤더: 이름(17px bold) + 태그라인(14px, neutral-500).
- 기존 `Intro`에 있던 이름/태그라인을 이동.

### Today 섹션
- `Intro`를 "Today" 섹션 제목 + 소개 문단들로 재구성.

### Builds 섹션
- `Build` 타입에 `isNew?: boolean` 추가.
- 항목: 제목(14px medium) + `· New` 뱃지(가장 최근 프로젝트인 업무 앱 제작 플랫폼에만), 오른쪽 기간(14px, neutral-400).
- TBD(클릭 불가) 항목은 만들지 않음.

### 상세 페이지 섹션 인덱스 (추가 요청)
- 참고 사이트의 ContentIndex.Map(라인 목차)을 차용하되, 접힌 상태가 아닌 **항상 펼쳐진 상태**로.
- `SectionIndex` 클라이언트 컴포넌트: 화면 왼쪽 고정(xl 이상에서만 표시), heading 블록 목록을 라인 + 라벨로 렌더.
- IntersectionObserver 스크롤 스파이로 현재 섹션 강조 (활성: neutral-800 / 비활성: neutral-400).
- heading `h2`에 텍스트 기반 앵커 id 부여, sticky nav 고려해 `scroll-mt` 적용.

### Footer
- 왼쪽 `© 2026 한송무`(13px, neutral-400), 오른쪽 Email · Phone 링크를 세로 구분선으로 나열.
- GitHub 링크 제거 (profile.links에서 삭제).

## 후속 반영 (사용자 피드백)

- 섹션 인덱스: IntersectionObserver → 스크롤 기반(읽기 선 통과 마지막 헤딩 + 페이지 끝 도달 시 마지막 섹션) 방식으로 교체. 클릭 시 즉시 활성화.
- Nav: `Index` 탭을 화면 왼쪽 끝으로. 균일 blur 대신 참고 사이트 방식의 프로그레시브 블러(위로 갈수록 강해지는 8겹, 최대 5px) + 스크롤 연동 페이드 인(framer-motion `useScroll`).
- 메인에 Tech 섹션 추가 — 카테고리는 노션 기술 문서의 `유형` 분류(Frontend/Backend/Infra & Database/AI Frameworks/Tools) 그대로. 노션 내보내기에 페이지 아이콘은 없어 텍스트로만 표시.
- Builds → **Projects** 로 명칭 변경(섹션 제목 + `/projects/[slug]` 라우트).
- 프로젝트 기간을 노션 문서의 실제 진행 기간으로 교체하고 종료 시점 기준 최신순 정렬.
- 프로필: 태그라인에서 "Seoul, Korea" 제거, 소개에서 회사명("제우스") 제거.

## 검증
- `pnpm test`, `npx tsc --noEmit`, `pnpm build` 통과.
- dev 서버에서 메인/상세 페이지 육안 확인.
