import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

interface ProjectCard {
  title: string;
  year: number;
  stack: string[];
  description: string;
  url: string;
}

interface Props { projects: ProjectCard[]; }

const TECH_COLORS: Record<string, string> = {
  Astro:      '#FF5D01',
  React:      '#61DAFB',
  GSAP:       '#88CE02',
  Tailwind:   '#38BDF8',
  Netlify:    '#00C7B7',
  HTML:       '#E34F26',
  CSS:        '#1572B6',
  JavaScript: '#F7DF1E',
};

export default function WorkCarousel({ projects }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Stagger card entrance
    const cards = track.querySelectorAll('.project-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 52 },
      {
        opacity: 1, y: 0,
        stagger: .1, duration: .75, ease: 'expo.out',
        scrollTrigger: { trigger: track, start: 'top 85%', once: true },
      }
    );

    // Drag to scroll
    const el = wrapRef.current!;
    let isDragging = false, startX = 0, scrollLeft = 0;
    const onDown = (e: MouseEvent) => {
      isDragging = true; startX = e.clientX; scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
    };
    const onUp = () => { isDragging = false; el.style.cursor = 'grab'; };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.clientX - startX);
    };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);

    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ overflowX: 'auto', cursor: 'grab', paddingBottom: '2rem',
        scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div
        ref={trackRef}
        className="carousel-track"
        style={{ display: 'flex', gap: '1.5rem', padding: '2rem 2.5rem', width: 'max-content' }}
      >
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ display: 'block', width: '380px', flexShrink: 0,
              textDecoration: 'none', color: 'inherit' }}
          >
            {/* Browser chrome */}
            <div style={{ background: '#2a2a28', border: '1px solid rgba(255,255,255,.07)' }}>
              <div style={{ height: '32px', background: '#1e1e1c',
                display: 'flex', alignItems: 'center', gap: '6px', padding: '0 12px' }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <span key={c} style={{ width: 10, height: 10, borderRadius: '50%',
                    background: c, display: 'block', flexShrink: 0 }} />
                ))}
                <span style={{ flex: 1, height: '18px', background: '#2e2e2c',
                  borderRadius: '2px', marginLeft: '8px' }} />
              </div>
              {/* Preview area with subtle grid */}
              <div style={{ height: '200px', background: '#1a1a18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: 'linear-gradient(rgba(61,139,101,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,139,101,.04) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                color: 'rgba(255,255,255,.12)',
                fontFamily: 'Space Mono, monospace', fontSize: '.65rem', letterSpacing: '.1em' }}>
                {p.url}
              </div>
            </div>
            {/* Card info */}
            <div style={{ padding: '1.25rem 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'baseline', marginBottom: '.5rem' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem',
                  color: 'var(--paper)', letterSpacing: '.04em' }}>{p.title}</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '.6rem',
                  color: 'rgba(243,239,228,.35)' }}>{p.year}</span>
              </div>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '.8rem',
                color: 'rgba(243,239,228,.5)', lineHeight: 1.65, marginBottom: '.875rem' }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                {p.stack.map(t => (
                  <span key={t} style={{ fontFamily: 'Space Mono, monospace', fontSize: '.58rem',
                    letterSpacing: '.1em', padding: '.22rem .6rem',
                    border: `1px solid ${TECH_COLORS[t] ?? 'rgba(255,255,255,.18)'}`,
                    color:  TECH_COLORS[t] ?? 'rgba(255,255,255,.35)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
