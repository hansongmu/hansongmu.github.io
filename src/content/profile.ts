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
    '제우스 IT팀에서 사내 시스템을 만드는 풀스택 개발자입니다. 헬프데스크와 IT 시스템 관리로 시작해, 지금은 PMS, 인사평가, CRM, AI 플랫폼 같은 전사 시스템을 개발하고 있습니다. 요구사항 분석부터 DB 모델링, UI 설계, API 구현, 배포와 운영까지 혼자서도 한 바퀴를 다 돌립니다.',
    '사용자가 늘 가까이에 있는 환경에서 일합니다. 만든 시스템은 직접 운영까지 맡기 때문에, 새 기능을 붙이는 것만큼 운영 중에 깨지지 않는 구조를 고민합니다. 화면 하나를 정할 때도 실제로 쓰는 사람의 업무 동선에서 출발합니다.',
    '최근에는 AI 플랫폼을 만들며 SSE 스트리밍 백엔드, FastAPI 기반 RAG 서버, LangGraph 워크플로우, 벡터 DB와 임베딩 파이프라인까지 직접 구축했습니다. 그 과정의 경험과 시행착오는 사내 ZEUS AI DAY에서 전사 임직원에게 발표했습니다.',
  ],
  links: [
    { label: 'Email', href: 'mailto:gksthdan@naver.com' },
    { label: 'Phone', href: 'tel:01092110287' },
  ],
};
