import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface Tech {
  id: string;
  name: string;
  color: string;
  expertise: number;
  description: string;
  tags: string[];
}

interface Props { techs: Tech[]; }

// Simplified brand SVG icons (inline strings)
const ICONS: Record<string, string> = {
  astro:      `<svg viewBox="0 0 128 128" fill="none"><path d="M81.5 89.7c-5.3 4.7-15.8 7.9-27.9 7.9-14.8 0-27.2-4.9-30.5-11.5-.5 2.8-.7 5.6-.7 8.4 0 17 11.5 30.8 25.7 30.8s25.7-13.8 25.7-30.8c0-1.6-.1-3.2-.3-4.8z" fill="#FF5D01" opacity=".8"/><path d="M64 2.8L24.3 72.2h79.4L64 2.8z" fill="#FF5D01"/></svg>`,
  react:      `<svg viewBox="0 0 128 128"><ellipse cx="64" cy="64" rx="56" ry="22" stroke="#61DAFB" fill="none" stroke-width="5"/><ellipse cx="64" cy="64" rx="56" ry="22" stroke="#61DAFB" fill="none" stroke-width="5" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="56" ry="22" stroke="#61DAFB" fill="none" stroke-width="5" transform="rotate(120 64 64)"/><circle cx="64" cy="64" r="10" fill="#61DAFB"/></svg>`,
  typescript: `<svg viewBox="0 0 128 128"><rect width="128" height="128" rx="8" fill="#3178C6"/><text x="14" y="90" font-family="monospace" font-size="72" fill="white" font-weight="700">TS</text></svg>`,
  gsap:       `<svg viewBox="0 0 128 128" fill="none"><circle cx="64" cy="64" r="52" stroke="#88CE02" stroke-width="5"/><path d="M32 64h64M64 32v64" stroke="#88CE02" stroke-width="5" stroke-linecap="round"/><circle cx="64" cy="64" r="18" stroke="#88CE02" stroke-width="4" fill="rgba(136,206,2,.1)"/></svg>`,
  tailwind:   `<svg viewBox="0 0 128 128" fill="none"><path d="M22 42c0-16.6 8.3-24.9 24.9-24.9 16.6 0 24.9 8.3 24.9 24.9-8.3 0-12.45-4.15-16.6-8.3C51.1 29.55 47 25.4 38.6 25.4 30.3 25.4 26.15 29.55 22 42z" fill="#38BDF8"/><path d="M22 85c0-16.6 8.3-24.9 24.9-24.9 16.6 0 24.9 8.3 24.9 24.9-8.3 0-12.45-4.15-16.6-8.3C51.1 72.55 47 68.4 38.6 68.4 30.3 68.4 26.15 72.55 22 85z" fill="#38BDF8"/><path d="M56.2 42c0-16.6 8.3-24.9 24.9-24.9 16.6 0 24.9 8.3 24.9 24.9-8.3 0-12.45-4.15-16.6-8.3-4.15-4.15-8.3-8.3-16.6-8.3S64.5 29.55 60.35 42z" fill="#38BDF8" opacity=".6"/><path d="M56.2 85c0-16.6 8.3-24.9 24.9-24.9 16.6 0 24.9 8.3 24.9 24.9-8.3 0-12.45-4.15-16.6-8.3C81.35 72.55 77.2 68.4 68.8 68.4s-12.45 4.15-16.6 16.6z" fill="#38BDF8" opacity=".6"/></svg>`,
  figma:      `<svg viewBox="0 0 128 128"><rect x="16" y="8" width="44" height="36" rx="18" fill="#F24E1E"/><rect x="16" y="46" width="44" height="36" rx="0" fill="#A259FF"/><rect x="16" y="84" width="44" height="36" rx="18" fill="#0ACF83"/><circle cx="84" cy="64" r="22" fill="#1ABCFE"/><rect x="62" y="8" width="44" height="36" rx="18" fill="#FF7262"/></svg>`,
  git:        `<svg viewBox="0 0 128 128"><path d="M124.7 58.5L69.5 3.3a11.3 11.3 0 00-16 0l-14.7 14.8 18.6 18.6a13.4 13.4 0 0117 17.1l18 18a13.4 13.4 0 11-8 7.6L67.2 62.2v44.7a13.4 13.4 0 11-11 0V60.6a13.4 13.4 0 01-7.2-17.5L31 24.7l-27.7 27.8a11.3 11.3 0 000 16L58.5 124.7a11.3 11.3 0 0016 0l50.2-50.2a11.3 11.3 0 000-16z" fill="#F05032"/></svg>`,
  nodejs:     `<svg viewBox="0 0 128 128"><path d="M64 7.3L11 38.2v61.6L64 120.7l53-20.9V38.2L64 7.3z" fill="none" stroke="#339933" stroke-width="6"/><path d="M64 30l-30 17.3v34.4L64 99l30-17.3V47.3z" fill="rgba(51,153,51,.2)" stroke="#339933" stroke-width="3"/><path d="M64 7.3v122.4M11 38.2l106 51.6" stroke="#339933" stroke-width="2" opacity=".3"/></svg>`,
  netlify:    `<svg viewBox="0 0 128 128" fill="none"><rect x="8" y="8" width="112" height="112" rx="6" stroke="#00C7B7" stroke-width="5"/><path d="M32 64h64M64 32v64" stroke="#00C7B7" stroke-width="5" stroke-linecap="round"/><circle cx="64" cy="64" r="8" fill="#00C7B7"/></svg>`,
};

export default function StackCameraStops({ techs }: Props) {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const panelRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const N = techs.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const PER_TECH = 800;

    function switchTech(from: number, to: number, dir: 1 | -1) {
      const outPanel = panelRefs.current[from];
      const inPanel  = panelRefs.current[to];
      if (!outPanel || !inPanel) return;

      gsap.to(outPanel, {
        opacity: 0, y: dir * -40, duration: .38, ease: 'power2.in',
        onComplete() { outPanel.style.display = 'none'; },
      });

      inPanel.style.display = 'flex';
      gsap.fromTo(inPanel,
        { opacity: 0, y: dir * 40 },
        { opacity: 1, y: 0, duration: .52, ease: 'expo.out' }
      );

      const bar = inPanel.querySelector<HTMLDivElement>('.exp-fill');
      if (bar) {
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = techs[to].expertise + '%'; }, 200);
      }

      section.querySelectorAll('.tl-item').forEach((el, i) => {
        el.classList.toggle('active', i === to);
      });

      if (counterRef.current) {
        counterRef.current.textContent =
          String(to + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
      }

      setActiveIdx(to);
    }

    let currentIdx = 0;

    const st = ScrollTrigger.create({
      id: 'stack-pin',
      trigger: section,
      pin: true,
      pinSpacing: true,
      start: 'top top',
      end: `+=${N * PER_TECH}`,
      onUpdate(self) {
        const newIdx = Math.min(Math.floor(self.progress * N), N - 1);
        if (newIdx !== currentIdx) {
          const dir: 1 | -1 = newIdx > currentIdx ? 1 : -1;
          switchTech(currentIdx, newIdx, dir);
          currentIdx = newIdx;
        }
        if (progressRef.current) {
          progressRef.current.style.width = (self.progress * 100) + '%';
        }
      },
    });

    // Init first panel
    panelRefs.current.forEach((p, i) => {
      if (p) p.style.display = i === 0 ? 'flex' : 'none';
    });
    const firstBar = panelRefs.current[0]?.querySelector<HTMLDivElement>('.exp-fill');
    if (firstBar) setTimeout(() => { firstBar.style.width = techs[0].expertise + '%'; }, 700);

    return () => st.kill();
  }, [techs]);

  function jumpToTech(idx: number) {
    const st = ScrollTrigger.getById('stack-pin');
    if (!st) return;
    const pos = st.start + (idx / N) * (st.end - st.start) + 10;
    gsap.to(window, { scrollTo: pos, duration: .65, ease: 'power2.inOut' });
  }

  return (
    <div ref={sectionRef} style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column',
      background: 'var(--ink)', color: 'var(--paper)' }}>

      {/* Counter row + progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <span ref={counterRef} style={{ fontFamily: 'Space Mono, monospace',
          fontSize: '.72rem', letterSpacing: '.15em', color: 'rgba(243,239,228,.35)' }}>
          01 / 09
        </span>
        <div style={{ flex: 1, margin: '0 2rem', height: '1px', background: 'rgba(255,255,255,.07)' }}>
          <div ref={progressRef} style={{ height: '100%', background: 'var(--m3)',
            width: '0%', transition: 'width .08s linear' }} />
        </div>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '.6rem',
          letterSpacing: '.12em', opacity: .3, textTransform: 'uppercase' }}>
          Tech Stack
        </span>
      </div>

      {/* Main content row */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left: numbered nav */}
        <nav style={{ width: '260px', flexShrink: 0, padding: '3rem 2rem',
          borderRight: '1px solid rgba(255,255,255,.05)',
          display: 'flex', flexDirection: 'column', gap: '.15rem' }}>
          {techs.map((t, i) => (
            <button
              key={t.id}
              className={`tl-item${i === 0 ? ' active' : ''}`}
              onClick={() => jumpToTech(i)}
              style={{ background: 'none', border: 'none', color: 'var(--paper)',
                textAlign: 'left', display: 'flex', alignItems: 'center',
                gap: '.75rem', cursor: 'pointer' }}
            >
              <span style={{ opacity: .4, fontSize: '.65rem',
                fontFamily: 'Space Mono, monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{t.name}</span>
              {i === activeIdx && (
                <span style={{ marginLeft: 'auto', color: t.color,
                  fontSize: '.6rem', opacity: .8 }}>→</span>
              )}
            </button>
          ))}
        </nav>

        {/* Right: tech panels (stacked, only one visible at a time) */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {techs.map((t, i) => (
            <div
              key={t.id}
              ref={el => { panelRefs.current[i] = el; }}
              style={{ position: 'absolute', inset: 0, padding: '4rem 5rem',
                display: 'none', flexDirection: 'column', justifyContent: 'center' }}
            >
              {/* Brand icon */}
              <div style={{ width: '100px', height: '100px', marginBottom: '2.5rem' }}
                dangerouslySetInnerHTML={{ __html: ICONS[t.id] ?? '' }} />

              {/* Tech name */}
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(4rem, 8vw, 7.5rem)',
                lineHeight: .88, letterSpacing: '.02em',
                color: 'var(--paper)', marginBottom: '1.75rem' }}>
                {t.name}
              </h3>

              {/* Description */}
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem',
                lineHeight: 1.75, color: 'rgba(243,239,228,.65)',
                maxWidth: '52ch', marginBottom: '2rem' }}>
                {t.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                {t.tags.map(tag => (
                  <span key={tag} style={{ fontFamily: 'Space Mono, monospace',
                    fontSize: '.62rem', letterSpacing: '.12em',
                    padding: '.3rem .8rem', textTransform: 'uppercase',
                    border: `1px solid ${t.color}`, color: t.color }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expertise bar */}
              <div style={{ maxWidth: '340px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  fontFamily: 'Space Mono, monospace', fontSize: '.58rem',
                  letterSpacing: '.12em', opacity: .45, marginBottom: '.5rem' }}>
                  <span>EXPERTISE</span>
                  <span>{t.expertise}%</span>
                </div>
                <div className="exp-track">
                  <div className="exp-fill" style={{ width: '0%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
