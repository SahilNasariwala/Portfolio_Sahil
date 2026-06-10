# Portfolio Redesign — "Kinetic Minimal · Ink & Acid"

**Date:** 2026-06-10
**Status:** Approved by Sahil
**Scope:** Complete visual redesign of the single-page portfolio (`index.html`, `assets/css/style.css`, `assets/js/script.js`). Content is re-staged, not rewritten. SEO/meta/structured data preserved.

## Concept

A premium "kinetic minimal" personal site: quiet, ultra-refined layout where all the wow lives in motion — masked text reveals, buttery smooth-scroll, magnetic buttons, scroll-driven storytelling. No theme gimmicks. Modeled on current award-winning personal portfolios.

## Visual identity

| Token | Value |
|---|---|
| Background | `#0e0e11` (near-black ink) |
| Text | `#f2f1ec` (warm paper-white) |
| Accent | `#c8f550` (acid lime) — links, magnetic CTA, highlights, counters |
| Muted | paper-white at ~50–60% opacity |
| Display font | Clash Display (Fontshare CDN) — headings, hero |
| Body font | General Sans (Fontshare CDN) |
| Mono font | JetBrains Mono (Google Fonts) — labels, meta, timestamps |

Type scale is editorial-huge: hero name ~12vw clamp, section titles ~6vw, generous whitespace. Italic serif accent words (Fraunces italic — already loaded on the current site) inside headings for contrast.

## Tech stack

- Static site, no build step. Three files: `index.html`, `assets/css/style.css`, `assets/js/script.js`.
- CDN libraries: **GSAP 3** (+ ScrollTrigger, SplitText — free as of GSAP 3.13) and **Lenis** smooth-scroll.
- **Progressive enhancement rule:** content is fully visible/readable with zero JS. Animation initial-states (opacity/transform hiding) are applied by JS only after libraries load successfully. If the CDN fails or `prefers-reduced-motion: reduce` is set, the site renders as a fast static page with no hidden content.

## Page flow (single page, in order)

1. **Preloader** — fixed overlay: 0→100 counter + "Sahil Nasariwala" wordmark; curtain-lift reveal (~1.4s). Shown once per session (`sessionStorage`). Skipped entirely under reduced-motion or when JS/CDN unavailable.
2. **Hero** — name reveals line-by-line through overflow masks; "frontend engineer" role line with italic serif accent; location/experience meta in mono; magnetic "Let's talk" pill button; social links; scroll hint. The hero is pure typography — the portrait moves to the About section as a small parallax-treated image.
3. **Stats strip** — animated count-up numbers triggered on scroll: `10,000+ monitors · 3.5+ years · 30% faster loads · 25% engagement · 9.36 CGPA`.
4. **About** — lead paragraph reveals word-by-word, scrub-linked to scroll position.
5. **Experience** — Motadata / Meditab / Tatvasoft. Sticky date+company column on desktop; bullets cascade in on scroll. Same copy as current site.
6. **Skills** — two slow counter-rotating marquee rows of key technologies + grouped chips (Languages / Frontend / Testing / Tools / Concepts).
7. **Work** — three projects (Movie Mania, QNOW, Movie Review & Recommend) as large editorial list rows: big title, mono category, lime arrow that slides on hover. Row links to GitHub.
8. **"Now" strip** — currently: shipping Log Pattern Analysis @ Motadata · exploring AI-assisted development & testing · AWS Certified Cloud Practitioner.
9. **Education & achievements** — B.Tech CHARUSAT (CGPA 9.36) card + achievement list (hackathon 1st place, Log Pattern Innovation team recognition, AWS CCP, Star Performer).
10. **Contact / footer** — giant "LET'S WORK TOGETHER" type with magnetic CTA mailto; email, phone, LinkedIn, GitHub, LeetCode links; footer shows local-time clock (Asia/Kolkata) and copyright. **The mailto contact form is removed.**

## Motion system

- **Lenis** smooth scroll (desktop; native scroll on touch devices is acceptable default).
- Masked line reveals for headings (SplitText lines + y-translate), word reveals for About.
- Magnetic hover on primary buttons (translate toward cursor within radius, spring back).
- Custom cursor: small dot + outline that scales over interactive elements (desktop pointer devices only; native cursor never hidden on touch/reduced-motion).
- Nav: hides on scroll-down, returns with frosted backdrop on scroll-up.
- Count-up counters and marquees driven by ScrollTrigger.
- `prefers-reduced-motion: reduce` → no Lenis, no preloader, no SplitText reveals, no custom cursor; simple opacity fades at most.

## Kept / unchanged

- All `<head>` SEO: title, description, OG/Twitter tags, JSON-LD Person schema, canonical, favicons, theme-color (update to `#0e0e11`).
- Resume PDF download CTA in nav and hero.
- All factual copy (roles, bullets, dates, metrics, links).

## Error handling

- CDN script tags get no inline-critical behavior; `script.js` feature-detects `window.gsap` / `window.Lenis` before initializing each subsystem.
- No content is hidden in CSS for animation purposes — hiding happens via GSAP `set()` at init time only.
- Form removal eliminates the broken `mailto:` POST form.

## Testing

- Serve locally (`python3 -m http.server`), verify zero console errors.
- Verify with CDN blocked (offline) → page fully readable.
- Verify `prefers-reduced-motion` emulation → no preloader, content visible, scroll native.
- Mobile viewport (≤480px) and tablet (~768px) layout pass.
- Lighthouse sanity: performance + accessibility + SEO not regressed vs current site.
