---
name: writing-commit-messages
description: Use when writing a git commit message or staging a commit in this repository. Defines the Conventional-Commits-based Korean commit convention (type, scope, subject/body rules) used by the hansongmu portfolio. Keywords: commit, 커밋, commit message, 커밋 메시지, conventional commits, 컨벤션.
---

# Writing Commit Messages

## Overview

이 저장소의 커밋은 **Conventional Commits**(Angular 계열) 골격에 한국어 개조식 제목을 얹는다. 토스·카카오·당근·네이버 등 국내 팀이 공통으로 수렴하는 형태(타입 프리픽스 + What/Why 본문)를 따른다. 회사별 고유 규칙이 아니라 이들이 공유하는 표준을 이 저장소에 맞게 고정한 것.

**핵심 원칙:** 제목은 *무엇을* 바꿨는지 한 줄로, 본문은 *왜* 바꿨는지. 구현 방법(How)은 diff가 말한다.

## Format

```
<type>(<scope>): <제목>
                         ← 빈 줄
<본문: 왜 바꿨는지. 72자에서 줄바꿈>
                         ← 빈 줄
<footer: BREAKING CHANGE / Refs #NN (선택)>
```

`(scope)`·본문·footer는 모두 선택. 제목만 필수.

## Types

| type | 언제 |
|------|------|
| `feat` | 사용자에게 보이는 새 기능 |
| `fix` | 버그·사실오류 수정 |
| `content` | 포트폴리오 콘텐츠 변경 — 본문 카피, 프로젝트 서술, 스크린샷, 다이어그램 (이 저장소 특화) |
| `docs` | 코드 외 문서·설계 스펙·계획 변경 |
| `style` | 동작 변화 없는 포맷·공백·따옴표 |
| `refactor` | 동작 변화 없는 코드 구조 개선 |
| `perf` | 성능 개선 |
| `test` | 테스트 추가·수정 |
| `build` | 빌드 시스템·의존성(next, tailwind 등) |
| `ci` | GitHub Actions 등 CI 설정 |
| `chore` | 위에 안 맞는 잡무(스캐폴딩, .gitignore) |
| `revert` | 이전 커밋 되돌리기 |

## Scope (선택)

변경이 한 영역에 한정될 때 소문자로. 이 저장소 관례: 프로젝트 slug나 섹션명 — `home`, `about`, `projects`, `crm`, `bi`, `expense`, `patent`, `ai-platform` 등.

## 제목 규칙

- `type(scope): ` 뒤 한 칸. type·scope는 **영문 소문자**.
- **50자 이내**. 넘으면 본문으로 내린다.
- **끝에 마침표(.) 금지.**
- 한국어는 **개조식(명사형 종결)**: "추가", "수정", "제거", "정리". 영어면 **명령형**: "add", "fix", "remove".
- **모호어 금지**: "내용 수정", "업데이트", "버그 수정"만 덜렁 쓰지 않는다. 무엇이 어떻게 바뀌었는지 특정한다.
- 언어는 **한국어 우선**, 기술 용어·코드 식별자·수치는 영문 그대로. 한 제목 안에서 섞더라도 자연스럽게.
- 부가 설명을 제목에 붙일 땐 쉼표를 쓴다(대시(—) 남발 금지).

## 본문 규칙 (맥락이 필요할 때만)

- 제목과 본문 사이 **빈 줄 1개**.
- **72자에서 줄바꿈**.
- **What과 Why**를 쓴다. How(구현 절차)는 코드가 말하므로 지양.
- 판단 근거, 트레이드오프, 되돌린 이유 등 diff만으로 안 보이는 맥락을 남긴다.

## Breaking change / Footer

- 하위호환이 깨지면 콜론 앞에 `!`: `feat(projects)!: ...`, 또는 footer에 `BREAKING CHANGE: 설명`.
- 이슈 참조가 필요하면 footer에 `Refs #12`.

## Gitmoji

이 저장소는 **이모지를 쓰지 않는다.** 텍스트 타입 프리픽스만.

## Examples

```
content(crm): 스크린샷 재캡처, 민감정보 블러 강화

거래처 담당자 이름과 개인 연락처가 노출돼, 이름·전화번호
텍스트 노드에 blur를 주입해 다시 캡처했다. 회사명은 유지.
```

```
fix(projects): 특허 시스템 최초 구축 시점을 2022.12로 정정

git 히스토리상 최초 커밋이 2022년이라 기간 표기를 맞췄다.
```

Bad → Good:

| Bad | Good |
|-----|------|
| `Skill 내 내용 수정` | `docs: 스킬 CSS 설명 보강` |
| `docs: 내용 수정` | `docs: 배포 절차에 gh 멀티 계정 주의 추가` |
| `Initial commit` | `chore: 저장소 초기화` |
| `update stuff.` | `content(about): 소개 문단을 사실 위주로 정리` |

## Common Mistakes

- **타입 없이 시작** (`Skill 내 내용 수정`) → 항상 `type:` 으로 연다.
- **모호한 제목** (`내용 수정`, `업데이트`) → 무엇이 바뀌었는지 특정한다.
- **제목 끝 마침표.**
- **본문에 How만 나열** → 왜 그렇게 했는지로 바꾼다.
- **한 커밋에 무관한 변경 섞기** → 논리 단위로 쪼갠다.

## 기존 커밋을 이 스타일로 바꾸려면

이미 푸시된 커밋 메시지를 고치면 **해시가 바뀌고 force-push가 필요**하다(협업 저장소면 사전 합의 필수). 방법:
- 최근 N개만: `git rebase -i HEAD~N` → 해당 줄을 `reword`.
- 루트까지 전체: `git rebase -i --root`, 또는 비대화형으로 `git filter-repo --message-callback` / `git filter-branch --msg-filter`.
- 안전 확인: 임시 클론에서 먼저 리라이트→`git log` 확인 후 원본 적용.
