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
    '제우스 IT팀에서 사내 시스템을 만드는 풀스택 개발자입니다. 헬프데스크와 IT 시스템 관리로 시작해, 지금은 PMS, 인사평가, CRM, AI 플랫폼 같은 전사 시스템을 개발하고 있습니다. 요구사항 분석부터 DB 모델링, UI 설계, API 구현, 배포와 운영까지 전 과정을 직접 합니다.',
    '만든 시스템은 직접 운영까지 맡습니다. 쓰는 사람이 같은 회사에 있으니 피드백이 바로 들어오고, 그러다 보니 새 기능을 붙이는 것만큼 운영 중에 깨지지 않는 구조를 고민하게 됩니다.',
    '최근에는 AI 플랫폼을 만들며 SSE 스트리밍 백엔드, FastAPI 기반 RAG 서버, LangGraph 워크플로우, 벡터 DB와 임베딩 파이프라인까지 직접 구축했습니다.',
  ],
  links: [
    { label: 'Email', href: 'mailto:gksthdan@naver.com' },
    { label: 'Phone', href: 'tel:01092110287' },
  ],
};
