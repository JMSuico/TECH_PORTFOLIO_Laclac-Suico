
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  thumbnail: string;
  demoUrl: string;
  codeUrl: string;
}

export interface Story {
  id: string;
  title: string;
  plot: string;
  csConcept: string;
  accent: 'cyan' | 'violet' | 'teal' | 'magenta';
  illustration: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}
