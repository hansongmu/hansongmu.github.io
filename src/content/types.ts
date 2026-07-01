export type BuildBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface Build {
  slug: string;
  title: string;
  category: string;
  org?: string;
  period: string;
  tech?: string;
  blocks: BuildBlock[];
}

export interface Profile {
  name: string;
  tagline: string;
  paragraphs: string[];
  links: { label: string; href: string }[];
}
