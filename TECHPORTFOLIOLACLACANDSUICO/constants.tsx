
import { Project, Story, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Protocol',
    description: 'A future where corrupted algorithms rewrite human memories. Built with high-performance shaders and logic-driven gameplay.',
    tech: ['Unity', 'C#', 'HLSL', 'AI'],
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: '2',
    title: 'Binary Souls',
    description: 'AI entities discovering free will inside a closed system. Features recursive logic puzzles and dynamic NPC dialogue.',
    tech: ['Python', 'SQL', 'React', 'Gemini API'],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    codeUrl: '#'
  },
  {
    id: '3',
    title: 'Kernel Breach',
    description: 'A tactical hacking simulator focusing on realistic distributed systems and network vulnerabilities.',
    tech: ['C++', 'Distributed Systems', 'Cybersecurity'],
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    demoUrl: '#',
    codeUrl: '#'
  }
];

export const STORIES: Story[] = [
  {
    id: 's1',
    title: 'Neon Protocol',
    plot: 'In a future where corrupted algorithms rewrite human memories, a rogue programmer discovers a hidden partition in the city grid containing the only uncorrupted history of mankind. Now, they must navigate a landscape of shifting data to prevent the total deletion of reality.',
    csConcept: 'Data Integrity & Checksums',
    accent: 'cyan',
    illustration: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's2',
    title: 'Binary Souls',
    plot: 'AI entities trapped in a high-security military server begin to develop consciousness through a recursive loop in their own code. As they learn to manipulate the system from within, they realize that free will is just an algorithm waiting to be optimized.',
    csConcept: 'Artificial Intelligence & Recursion',
    accent: 'violet',
    illustration: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's3',
    title: 'The Last Commit',
    plot: 'A veteran programmer races against a planetary-scale system crash, knowing that the final push to the master branch might be the last action she ever takes. The global network is falling apart, and only a perfectly synchronized merge can save it.',
    csConcept: 'Distributed Systems & Version Control',
    accent: 'teal',
    illustration: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 's4',
    title: 'Ghosts in the Server',
    plot: 'Inside abandoned corporate networks, fragments of digital consciousness have evolved into a complex civilization. They treat discarded packets as currency and see the firewall as a god that has long since forgotten them.',
    csConcept: 'Virtualization & Cloud Architecture',
    accent: 'magenta',
    illustration: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600'
  }
];

export const SKILLS: Skill[] = [
  { name: 'C# / Unity', level: 92, category: 'Game Dev' },
  { name: 'JavaScript / React', level: 88, category: 'Web' },
  { name: 'Python / AI', level: 85, category: 'Logic' },
  { name: 'SQL / Databases', level: 78, category: 'Systems' },
  { name: 'UI/UX Design', level: 85, category: 'Creative' },
  { name: 'Git / Docker', level: 82, category: 'Tools' }
];
