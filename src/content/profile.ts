import type { CareerItem, Profile } from './types';

export const careers: CareerItem[] = [
  {
    company: '제우스',
    companyDescription: '반도체 및 디스플레이 장비 제조 기업',
    role: 'IT 운영, 사내 시스템 개발',
    period: '2018. 10 ~ 현재',
    logo: '/zeus.svg',
    bullets: ['사내 시스템 개발 및 운영', 'IT 시스템 및 보안 솔루션 운영'],
  },
];

export const profile: Profile = {
  name: '한송무',
  tagline: '5년차 풀스택 개발자',
  motto: '편함보다는 불편함을 추구하는 개발자가 되겠습니다.',
  paragraphs: [
    '반도체 장비 회사에서 사내 시스템 개발을 담당하며 AI 플랫폼, CRM, PMS, 인사평가 시스템 등 전사 업무용 시스템을 개발하였습니다.',
    '단순한 기능 구현에 그치지 않고, 더 나은 사용자 경험을 위해 편함보다 고민과 불편함을 선택하는 개발자가 되고자 합니다.',
  ],
  strengths: [
    { label: '자기주도적 개발 환경 구축', text: '독학으로 사내 개발 환경을 구축하고, 서비스 개발 기반을 마련했습니다.' },
    { label: '전 과정 개발 경험 (End-to-End)', text: '요구사항 분석부터 DB 모델링, UI/UX 설계, API 개발, 배포 및 운영까지 사내 시스템 개발의 전 과정을 경험했습니다.' },
    { label: '구조 설계 및 아키텍처', text: '유지보수성과 확장성을 고려한 구조 설계에 집중하며, 안정적인 시스템 운영을 지향합니다.' },
    { label: '사용자 중심 개발', text: '개발자의 편의보다 사용자 경험을 우선하며, 더 나은 구조와 사용성을 위해 지속적으로 고민하고 개선합니다.' },
    { label: '지속적인 기술 도전', text: '새로운 기술과 도구를 적극적으로 탐색하고, 실제 프로젝트에 적용하며 더 나은 개발 방식을 고민합니다.' },
  ],
  links: [
    { label: 'Email', href: 'mailto:gksthdan@naver.com' },
    { label: 'Phone', href: 'tel:01092110287' },
  ],
};
