import type { CareerItem, Profile } from './types';

export const careers: CareerItem[] = [
  {
    company: '제우스',
    companyDescription: '반도체와 디스플레이 장비 제조 기업',
    role: 'IT 운영, 사내 시스템 개발',
    period: '2018. 10 ~ 현재',
    logo: '/zeus.svg',
    bullets: ['사내 시스템 개발 및 운영', 'IT 시스템 및 보안 솔루션 운영'],
  },
];

export const profile: Profile = {
  name: '한송무',
  tagline: '5년차 풀스택 개발자',
  paragraphs: [
    '대학에서 전자공학을 전공하고, 우연한 기회로 제우스 IT 팀에 합류했습니다. 전공과는 다른 분야였지만 어릴 적부터 컴퓨터를 다루는 것을 좋아한 덕분에 빠르게 적응할 수 있었습니다.',
    '입사 초기에는 헬프데스크와 IT 시스템 관리로 사내 IT 환경을 익혔고, 이후 PMS, 인사평가, CRM, AI 플랫폼 등 주요 시스템 개발로 업무 범위를 넓혀 왔습니다. 요구사항 분석부터 DB 모델링, UI/UX 설계, API 구현, 배포와 운영까지 전 과정을 직접 수행하며 풀스택 개발 경험을 쌓았습니다.',
    '다양한 부서와 소통하며 업무 흐름과 실사용 환경을 가까이에서 접한 덕분에, 기능 구현을 넘어 사용자 입장에서 자연스럽게 쓰이는 시스템을 고민하게 됐습니다. AI 플랫폼에서는 프론트엔드뿐 아니라 SSE 스트리밍 백엔드, FastAPI 기반 RAG 서버, LangGraph 워크플로우, 벡터 DB와 임베딩 파이프라인까지 직접 구축했고, 그 경험과 시행착오를 사내 ZEUS AI DAY에서 전사 임직원에게 발표하며 공유하기도 했습니다.',
    'IT 운영부터 업무 시스템, AI 플랫폼까지 쌓아온 경험을 바탕으로, 인접 직군과 자연스럽게 호흡을 맞추고 다양한 관점에서 의견을 보태며 팀에 기여하고 싶습니다.',
  ],
  links: [
    { label: 'Email', href: 'mailto:gksthdan@naver.com' },
    { label: 'Phone', href: 'tel:01092110287' },
  ],
};
