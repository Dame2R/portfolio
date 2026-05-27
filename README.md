# Ademir Kadrić — Personal Portfolio

World-class personal portfolio built with **Astro 6**, **React 19**, **GSAP 3**, and **Tailwind CSS v4**.

## Design

**Newspaper Brutalist** — bone-white `#f3efe4` / near-black `#1a1a18` / Manthey Racing dark green `#1A4D35`. Bebas Neue headlines, Space Mono monospace accents, Outfit body text.

## Sections

- **Hero** — Scroll-pinned SVG precision ring (outer +100°, inner −65° counter-rotate). Animated stat counters.
- **Work** — Clip-path reveal + draggable carousel + CSS `:has()` hover group.
- **Stack** — Apple camera-stops: 9 × 800px GSAP pin, direction-aware panel transitions, expertise bars.
- **Services** — Editorial bands, GSAP stagger entrance.
- **About** — Counter animation, Germany SVG topo map, Stuttgart pulsing dot.
- **Contact** — Netlify Forms.

## Commands

| Command | Action |
|---|---|
| `npm install` | Install deps |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |

## Deploy to Netlify

1. Create repo on GitHub: [github.com/new](https://github.com/new) → name it `portfolio`
2. `git remote add origin https://github.com/Dame2R/portfolio.git`
3. `git push -u origin main`
4. In Netlify: New site → Import from GitHub → `Dame2R/portfolio`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy — the `netlify.toml` already configures everything.

---

Ademir Kadrić · Stuttgart, DE · [github.com/Dame2R](https://github.com/Dame2R)
