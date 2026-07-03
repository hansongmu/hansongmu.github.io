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
  links: [
    { label: 'Email', href: 'mailto:gksthdan@naver.com' },
    { label: 'Phone', href: 'tel:01092110287' },
  ],
};
