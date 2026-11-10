export type BuildBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  /** narrow: 창 하나만 담은 캡처. 본문 폭으로 늘리면 화면이 확대돼 보여 좁게 둔다. */
  | { type: 'image'; src: string; alt: string; caption?: string; narrow?: boolean };

export interface Build {
  slug: string;
  title: string;
  category: string;
  org?: string;
  role?: string;
  /** 연월 표기. 공용 컴포넌트처럼 특정 기간에 묶이지 않는 것은 비운다. */
  period?: string;
  tech?: string;
  /** 이 글이 더 큰 시스템의 한 기능일 때, 그 시스템으로 돌아가는 길. */
  partOf?: { title: string; href: string };
  /** Projects 대신 Other 목록에 둔다. 번외 작업이나 공용 컴포넌트처럼 한 시스템으로 세기 어려운 것. */
  other?: boolean;
  blocks: BuildBlock[];
  /** 본문 뒤에 크게 보여 줄 화면 모음(발표 자료처럼 그림이 주인공인 글). 영상은 화면에 들어오면 재생한다. */
  showcase?: Showcase;
}

export interface ShowcaseMedia {
  src: string;
  alt: string;
  /** 있으면 이 영상을 재생하고 src 는 포스터로 쓴다. */
  video?: string;
  wide?: boolean;
}

export interface Showcase {
  hero: ShowcaseMedia;
  stats: { value: number; unit: string; label: string }[];
  items: ShowcaseMedia[];
}

export interface TechGroup {
  category: string;
  items: string[];
}

export interface Profile {
  name: string;
  tagline: string;
  motto: string;
  paragraphs: string[];
  links: { label: string; href: string }[];
}

export interface CareerItem {
  company: string;
  companyDescription: string;
  role: string;
  period: string;
  logo?: string;
  bullets: string[];
}
