export type BuildBlock =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface Build {
  slug: string;
  title: string;
  category: string;
  org?: string;
  role?: string;
  /** 연월 표기. Archive 항목처럼 특정 기간에 묶이지 않는 것은 비운다. */
  period?: string;
  tech?: string;
  blocks: BuildBlock[];
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
