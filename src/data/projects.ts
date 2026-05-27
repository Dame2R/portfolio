export interface Project {
  title: string;
  year: number;
  description: string;
  stack: string[];
  url: string;
}

export const projects: Project[] = [
  {
    title: 'FundU',
    year: 2026,
    description: 'Construction services platform — service pages, before/after gallery, and lead form for F&U Abriss und Bautechnik.',
    stack: ['Astro', 'GSAP', 'Tailwind'],
    url: 'https://fu-bautechnik.de',
  },
  {
    title: 's-clean',
    year: 2025,
    description: 'Cleaning services site with Netlify Forms, animated sections, and a mobile-first layout.',
    stack: ['Astro', 'React', 'Tailwind', 'Netlify'],
    url: 'https://s-clean.netlify.app',
  },
  {
    title: 'uUndD',
    year: 2025,
    description: 'Bilingual DE/EN property services site with GSAP scroll sequences and editorial layout.',
    stack: ['Astro', 'React', 'GSAP', 'Tailwind'],
    url: 'https://uundd.netlify.app',
  },
  {
    title: 'Partscloud',
    year: 2026,
    description: 'Auto parts marketplace landing page. Zero dependencies, sub-50KB total payload.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://partscloud.netlify.app',
  },
];
