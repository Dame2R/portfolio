export interface Service {
  number: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Full-Stack Development',
    description: 'End-to-end web applications — from database schema to pixel-perfect frontend. TypeScript throughout, tested, deployed.',
  },
  {
    number: '02',
    title: 'Product Management',
    description: 'Discovery to delivery. User research, roadmap prioritisation, stakeholder alignment, and sprint facilitation.',
  },
  {
    number: '03',
    title: 'Motion & Interaction Design',
    description: 'GSAP-powered animations, scroll sequences, and micro-interactions that feel like the product was built by Apple.',
  },
  {
    number: '04',
    title: 'Performance Engineering',
    description: 'Core Web Vitals optimisation, lazy loading, image pipelines, and bundle analysis. Sub-second TTFB.',
  },
  {
    number: '05',
    title: 'Design Systems',
    description: 'Component libraries in Figma + code, token pipelines, and documentation that designers and engineers both love.',
  },
];
