export interface Tech {
  id: string;
  name: string;
  color: string;
  expertise: number;
  description: string;
  tags: string[];
}

export const stack: Tech[] = [
  {
    id: 'astro',
    name: 'ASTRO',
    color: '#FF5D01',
    expertise: 90,
    description: 'My go-to framework for content-driven sites. Islands architecture means zero JS by default — I ship blazing-fast pages without sacrificing interactivity where it matters.',
    tags: ['SSG', 'Islands', 'TypeScript', 'Zero JS'],
  },
  {
    id: 'react',
    name: 'REACT',
    color: '#61DAFB',
    expertise: 87,
    description: 'Component-first thinking. I build composable UIs with hooks, context, and strong TypeScript typing — from tiny interactive widgets to full SPAs.',
    tags: ['Hooks', 'JSX', 'Context', 'SPA'],
  },
  {
    id: 'typescript',
    name: 'TYPESCRIPT',
    color: '#3178C6',
    expertise: 85,
    description: 'Strict mode or bust. TypeScript is how I think about interfaces before implementation — it eliminates entire categories of bugs and makes refactoring fearless.',
    tags: ['Types', 'Generics', 'Strict Mode', 'DX'],
  },
  {
    id: 'gsap',
    name: 'GSAP',
    color: '#88CE02',
    expertise: 82,
    description: 'The animation layer for everything I build. ScrollTrigger, pinned sequences, timeline orchestration — GSAP is how I get from mockup to cinema.',
    tags: ['ScrollTrigger', 'Timelines', 'Scrub', 'Pin'],
  },
  {
    id: 'tailwind',
    name: 'TAILWIND',
    color: '#38BDF8',
    expertise: 92,
    description: 'Utility-first as a design system. I prototype at the speed of thought and ship consistent spacing, color, and typography tokens across every project.',
    tags: ['Utility-first', 'JIT', 'Design Tokens', 'v4'],
  },
  {
    id: 'figma',
    name: 'FIGMA',
    color: '#F24E1E',
    expertise: 78,
    description: 'Where design decisions get made before a single line of code. Component libraries, auto-layout, and prototyping keep handoff frictionless.',
    tags: ['Systems', 'Components', 'Prototyping', 'Auto Layout'],
  },
  {
    id: 'git',
    name: 'GIT',
    color: '#F05032',
    expertise: 88,
    description: 'Conventional commits, feature branches, and atomic PRs. I treat git history as documentation — every commit message tells a story.',
    tags: ['Branching', 'CI/CD', 'GitHub', 'Hooks'],
  },
  {
    id: 'nodejs',
    name: 'NODE.JS',
    color: '#339933',
    expertise: 75,
    description: 'REST APIs, build scripts, and automation. I use Node to glue together the infrastructure layer — Express endpoints, NPM workflows, and custom tooling.',
    tags: ['REST APIs', 'NPM', 'Express', 'Scripts'],
  },
  {
    id: 'netlify',
    name: 'NETLIFY',
    color: '#00C7B7',
    expertise: 85,
    description: 'Every project I build goes to Netlify. Edge functions, form handling, preview deploys, and instant rollbacks — the deployment layer disappears.',
    tags: ['Edge', 'Forms', 'CI/CD', 'Previews'],
  },
];
