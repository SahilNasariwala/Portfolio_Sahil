# Kinetic Minimal · Ink & Acid Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the single-page portfolio as a premium kinetic-minimal site (near-black ink, paper-white type, acid lime accent) with GSAP/Lenis scroll-driven motion, per the approved spec at `docs/superpowers/specs/2026-06-10-portfolio-redesign-design.md`.

**Architecture:** Static three-file site (`index.html`, `assets/css/style.css`, `assets/js/script.js`), no build step. All animation is progressive enhancement: HTML/CSS renders a complete readable page with zero JS; `script.js` feature-detects `window.gsap`/`window.Lenis` and only then applies hidden states and animations. `prefers-reduced-motion` disables the motion system.

**Tech Stack:** HTML5, CSS3, vanilla JS + CDN: GSAP 3 (ScrollTrigger, SplitText), Lenis. Fonts: Clash Display + General Sans (Fontshare), Fraunces italic + JetBrains Mono (Google Fonts).

**Testing:** No JS test framework exists in this repo and none is added. Each task verifies by serving the site (`python3 -m http.server 8000`) and checking rendered output/console. Final task covers CDN-blocked, reduced-motion, and mobile passes.

**File structure:**
- Rewrite: `index.html` — document head (SEO preserved), all section markup
- Rewrite: `assets/css/style.css` — design tokens, base, per-section styles, responsive, reduced-motion
- Rewrite: `assets/js/script.js` — guarded init: preloader, Lenis, reveals, counters, marquee, magnetic buttons, cursor, nav, clock
- Keep: all of `assets/images/`, `assets/favicon/`, `assets/Sahil-Nasariwala_CV.pdf`

---

### Task 1: HTML — full document rewrite

**Files:**
- Modify: `index.html` (full rewrite of `<body>`; `<head>` keeps all SEO/meta/JSON-LD, swaps fonts + adds CDN scripts)

- [ ] **Step 1: Replace the `<head>` font links and add CDN scripts**

Keep everything currently in `<head>` (title, description, OG/Twitter, canonical, favicons, JSON-LD) except: replace the single Google Fonts `<link>` with the block below, and change `theme-color` to `#0e0e11`.

```html
<!-- fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=general-sans@400,500,600&display=swap" rel="stylesheet">
```

At the end of `<body>` (replacing the current single script tag):

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js" defer></script>
<script src="./assets/js/script.js" defer></script>
```

- [ ] **Step 2: Replace `<body>` content with the new structure**

Complete body markup (between `<body>` and the script tags). Note: no contact form; preloader markup is present but visually inert without JS (CSS keeps it hidden by default; JS shows it — this guarantees no-JS readability):

```html
<div class="preloader" data-preloader aria-hidden="true">
  <div class="preloader-inner">
    <span class="preloader-name">Sahil Nasariwala</span>
    <span class="preloader-count mono" data-preloader-count>0</span>
  </div>
</div>

<div class="cursor" data-cursor aria-hidden="true"></div>

<header class="site-nav" data-nav>
  <a href="#hero" class="nav-brand">SN<span class="accent">.</span></a>
  <nav class="nav-links" aria-label="Primary">
    <a href="#about" class="nav-link">About</a>
    <a href="#experience" class="nav-link">Experience</a>
    <a href="#work" class="nav-link">Work</a>
    <a href="#contact" class="nav-link">Contact</a>
  </nav>
  <a href="./assets/Sahil-Nasariwala_CV.pdf" class="nav-cta" data-magnetic download>Resume</a>
</header>

<main>
  <!-- HERO -->
  <section class="hero" id="hero">
    <p class="hero-eyebrow mono" data-reveal>// frontend engineer</p>
    <h1 class="hero-name">
      <span class="line" data-line>Sahil</span>
      <span class="line" data-line>Nasariwala<span class="accent">.</span></span>
    </h1>
    <p class="hero-tagline" data-reveal>
      I build <em>scalable</em> enterprise interfaces — analytics dashboards
      &amp; automation systems that stay fast at 10,000-monitor scale.
    </p>
    <div class="hero-row" data-reveal>
      <a href="#contact" class="btn-pill" data-magnetic>Let's talk <span class="arrow">→</span></a>
      <ul class="hero-socials" aria-label="Social links">
        <li><a href="https://www.linkedin.com/in/sahil-nasariwala-622591195/" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="https://github.com/SahilNasariwala" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="https://leetcode.com/sahil_nasariwala/" target="_blank" rel="noopener">LeetCode</a></li>
      </ul>
    </div>
    <div class="hero-meta mono" data-reveal>
      <span>AHMEDABAD, IN</span><span>3.5+ YEARS</span><span>VUE · REACT · TS</span>
    </div>
    <div class="scroll-hint mono" aria-hidden="true">scroll<span class="scroll-hint-line"></span></div>
  </section>

  <!-- STATS -->
  <section class="stats" aria-label="Career highlights">
    <ul class="stats-row">
      <li><span class="stat-num" data-count="10000" data-suffix="+">0</span><span class="stat-label mono">monitors served</span></li>
      <li><span class="stat-num" data-count="3.5" data-suffix="+" data-decimals="1">0</span><span class="stat-label mono">years experience</span></li>
      <li><span class="stat-num" data-count="30" data-suffix="%">0</span><span class="stat-label mono">faster load times</span></li>
      <li><span class="stat-num" data-count="25" data-suffix="%">0</span><span class="stat-label mono">engagement lift</span></li>
      <li><span class="stat-num" data-count="9.36" data-decimals="2">0</span><span class="stat-label mono">CGPA / 10</span></li>
    </ul>
  </section>

  <!-- ABOUT -->
  <section class="section" id="about">
    <header class="section-head">
      <span class="section-index mono">01</span>
      <h2 class="section-title" data-line>About</h2>
    </header>
    <div class="about-grid">
      <p class="about-lead" data-words>
        Frontend engineer with 3.5+ years building scalable enterprise web applications
        with Vue.js, React, and TypeScript — high-performance analytics dashboards and
        automation systems used in large-scale monitoring environments. Strong in component
        architecture, state management, rendering and bundle optimization, accessibility,
        and AI-assisted development and testing.
      </p>
      <figure class="about-portrait" data-parallax>
        <img src="./assets/images/my-avatar.png" alt="Portrait of Sahil Nasariwala" width="320" loading="lazy">
      </figure>
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section class="section" id="experience">
    <header class="section-head">
      <span class="section-index mono">02</span>
      <h2 class="section-title" data-line>Experience</h2>
    </header>
    <ol class="xp-list">
      <li class="xp-item" data-reveal>
        <div class="xp-side">
          <span class="xp-when mono">May 2025 — Present</span>
          <h3 class="xp-role">Software Engineer</h3>
          <p class="xp-org">Motadata · Ahmedabad</p>
        </div>
        <ul class="xp-bullets">
          <li>Shipped core modules across a large-scale enterprise network-monitoring SPA serving customers running <strong>10,000+ monitors</strong> — APM, RUM, Flow Analytics, NetRoute reporting.</li>
          <li>Built the <strong>Log Pattern Analysis</strong> module scanning millions of log lines to surface the top 500 meaningful patterns, accelerating incident triage.</li>
          <li>Delivered <strong>Forecast &amp; Capacity Planning</strong> reports with ML-driven projections, surfacing infrastructure bottlenecks before they impact service.</li>
          <li>Built a <strong>Figma-to-code workflow</strong> converting designs into production-ready Vue components.</li>
          <li>Architected a <strong>multi-agent Playwright E2E pipeline</strong> (6 agents, 7 validation waves) with AI-assisted workflows, sharply improving regression reliability.</li>
        </ul>
      </li>
      <li class="xp-item" data-reveal>
        <div class="xp-side">
          <span class="xp-when mono">Dec 2022 — Apr 2025</span>
          <h3 class="xp-role">Frontend Developer</h3>
          <p class="xp-org">Meditab Software · Ahmedabad</p>
        </div>
        <ul class="xp-bullets">
          <li>Built a high-performance healthcare platform with Vue.js and Vuetify, driving a <strong>25% increase</strong> in user engagement.</li>
          <li>Cut application load time by <strong>30%</strong> via bundle optimization, lazy loading, and rendering improvements.</li>
          <li>Co-authored a reusable component library (internal npm) standardizing UI patterns across teams.</li>
          <li>Partnered with product, design, and backend across agile sprints to ship scalable, accessible features.</li>
        </ul>
      </li>
      <li class="xp-item" data-reveal>
        <div class="xp-side">
          <span class="xp-when mono">May 2022 — Jun 2022</span>
          <h3 class="xp-role">ReactJS Intern</h3>
          <p class="xp-org">Tatvasoft · Ahmedabad</p>
        </div>
        <ul class="xp-bullets">
          <li>Shipped production modules for the Book-e-Sell e-commerce platform in React.js, owning features end-to-end.</li>
          <li>Refactored reusable UI components, improving render performance and REST API integration.</li>
          <li>Earned the <strong>Star Performer Award</strong> for code quality and ownership.</li>
        </ul>
      </li>
    </ol>
  </section>

  <!-- SKILLS -->
  <section class="section section-skills" id="skills">
    <header class="section-head">
      <span class="section-index mono">03</span>
      <h2 class="section-title" data-line>Skills</h2>
    </header>
    <div class="skills-marquee" aria-hidden="true">
      <div class="marquee-track" data-marquee="left">
        <span>Vue.js</span><span>React.js</span><span>TypeScript</span><span>JavaScript</span><span>Pinia</span><span>Vuetify</span><span>Quasar</span><span>saas</span>
        <span>Vue.js</span><span>React.js</span><span>TypeScript</span><span>JavaScript</span><span>Pinia</span><span>Vuetify</span><span>Quasar</span><span>saas</span>
      </div>
      <div class="marquee-track" data-marquee="right">
        <span>Playwright</span><span>Jest</span><span>AWS</span><span>Git</span><span>Claude Code</span><span>Cursor</span><span>Accessibility</span><span>Performance</span>
        <span>Playwright</span><span>Jest</span><span>AWS</span><span>Git</span><span>Claude Code</span><span>Cursor</span><span>Accessibility</span><span>Performance</span>
      </div>
    </div>
    <div class="skills-groups">
      <div class="skill-group" data-reveal>
        <h3 class="skill-label mono">Languages</h3>
        <ul class="chips"><li>JavaScript</li><li>TypeScript</li><li>HTML5</li><li>CSS3</li><li>saas</li></ul>
      </div>
      <div class="skill-group" data-reveal>
        <h3 class="skill-label mono">Frontend</h3>
        <ul class="chips"><li>Vue.js</li><li>React.js</li><li>Vuetify</li><li>Pinia</li><li>Vuex</li><li>Quasar</li></ul>
      </div>
      <div class="skill-group" data-reveal>
        <h3 class="skill-label mono">Testing &amp; Automation</h3>
        <ul class="chips"><li>Playwright</li><li>Jest</li><li>E2E Testing</li><li>CI Integration</li></ul>
      </div>
      <div class="skill-group" data-reveal>
        <h3 class="skill-label mono">Tools &amp; Concepts</h3>
        <ul class="chips"><li>Git</li><li>AWS</li><li>Cursor</li><li>Claude Code</li><li>Component Architecture</li><li>State Management</li><li>a11y</li></ul>
      </div>
    </div>
  </section>

  <!-- WORK -->
  <section class="section" id="work">
    <header class="section-head">
      <span class="section-index mono">04</span>
      <h2 class="section-title" data-line>Work</h2>
    </header>
    <ul class="work-list">
      <li data-reveal>
        <a class="work-row" href="https://github.com/SahilNasariwala/Movie-Mania" target="_blank" rel="noopener">
          <span class="work-num mono">001</span>
          <h3 class="work-title">Movie Mania</h3>
          <span class="work-cat mono">Web · JavaScript</span>
          <span class="work-arrow accent">↗</span>
        </a>
      </li>
      <li data-reveal>
        <a class="work-row" href="https://github.com/SahilNasariwala/Qnow-app" target="_blank" rel="noopener">
          <span class="work-num mono">002</span>
          <h3 class="work-title">QNOW</h3>
          <span class="work-cat mono">Mobile App</span>
          <span class="work-arrow accent">↗</span>
        </a>
      </li>
      <li data-reveal>
        <a class="work-row" href="https://github.com/SahilNasariwala/MovieReviewAndRecommend" target="_blank" rel="noopener">
          <span class="work-num mono">003</span>
          <h3 class="work-title">Movie Review &amp; Recommend</h3>
          <span class="work-cat mono">Web · Recommendation</span>
          <span class="work-arrow accent">↗</span>
        </a>
      </li>
    </ul>
  </section>

  <!-- NOW -->
  <aside class="now-strip" data-reveal aria-label="What I'm up to now">
    <span class="now-dot" aria-hidden="true"></span>
    <p class="mono">NOW — shipping Log Pattern Analysis @ Motadata · exploring AI-assisted development &amp; testing · AWS Certified Cloud Practitioner</p>
  </aside>

  <!-- EDUCATION & ACHIEVEMENTS -->
  <section class="section" id="education">
    <header class="section-head">
      <span class="section-index mono">05</span>
      <h2 class="section-title" data-line>Education &amp; Honors</h2>
    </header>
    <div class="edu-grid">
      <article class="edu-card" data-reveal>
        <span class="mono edu-when">2019 — 2023</span>
        <h3 class="edu-title">B.Tech, Information Technology</h3>
        <p class="edu-sub">Charotar University of Science &amp; Technology</p>
        <p class="edu-note accent mono">CGPA 9.36 / 10</p>
      </article>
      <ul class="honors" data-reveal>
        <li><strong>1st place</strong> — 36+ hour organization-wide hackathon at Motadata.</li>
        <li><strong>Team Recognition</strong> — Excellence in Log Pattern Innovation (Motadata AIOps).</li>
        <li><strong>AWS Certified</strong> Cloud Practitioner.</li>
        <li><strong>Star Performer Award</strong> at Tatvasoft.</li>
      </ul>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="contact" id="contact">
    <p class="contact-eyebrow mono" data-reveal>// open to interesting problems</p>
    <h2 class="contact-big">
      <span class="line" data-line>Let's work</span>
      <span class="line" data-line><em>together.</em></span>
    </h2>
    <a href="mailto:sahilnasariwala123@gmail.com" class="btn-pill btn-pill-lg" data-magnetic data-reveal>
      sahilnasariwala123@gmail.com <span class="arrow">→</span>
    </a>
    <ul class="contact-links mono" data-reveal>
      <li><a href="tel:+919054301777">+91 90543 01777</a></li>
      <li><a href="https://www.linkedin.com/in/sahil-nasariwala-622591195/" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="https://github.com/SahilNasariwala" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="https://leetcode.com/sahil_nasariwala/" target="_blank" rel="noopener">LeetCode</a></li>
    </ul>
  </section>
</main>

<footer class="site-footer">
  <p class="mono">© <span data-year>2026</span> Sahil Nasariwala — designed &amp; built by hand.</p>
  <p class="mono"><span data-clock>--:--</span> IST · Ahmedabad</p>
  <a href="#hero" class="to-top mono">Top ↑</a>
</footer>
```

- [ ] **Step 3: Verify no-JS readability**

Run: `python3 -m http.server 8000` (background) then `curl -s localhost:8000 | grep -c "data-reveal"`
Expected: count > 0; open browser — all content visible (old CSS will mis-style it; that's fine until Task 2).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: restructure markup for kinetic-minimal redesign"
```

---

### Task 2: CSS — full stylesheet rewrite

**Files:**
- Modify: `assets/css/style.css` (full rewrite)

- [ ] **Step 1: Write the complete stylesheet**

Replace the entire file with:

```css
/* ============ TOKENS ============ */
:root {
  --bg: #0e0e11;
  --bg-soft: #141418;
  --ink: #f2f1ec;
  --muted: rgba(242, 241, 236, 0.55);
  --faint: rgba(242, 241, 236, 0.14);
  --accent: #c8f550;
  --font-display: "Clash Display", "Arial Black", sans-serif;
  --font-body: "General Sans", system-ui, sans-serif;
  --font-serif: "Fraunces", Georgia, serif;
  --font-mono: "JetBrains Mono", monospace;
  --pad: clamp(20px, 5vw, 96px);
  --ease: cubic-bezier(0.77, 0, 0.18, 1);
}

/* ============ BASE ============ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: no-preference) {
  html.has-lenis { scroll-behavior: auto; } /* Lenis takes over */
}
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
::selection { background: var(--accent); color: var(--bg); }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
.mono { font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }
.accent { color: var(--accent); }
em { font-family: var(--font-serif); font-style: italic; font-weight: 400; }

/* Masked line containers — overflow hidden enables y-translate reveals.
   JS wraps each [data-line]'s content in .line-inner and animates the inner. */
.line, [data-line] { display: block; overflow: hidden; }
.line-inner { display: block; }

/* ============ PRELOADER (hidden unless JS enables) ============ */
.preloader {
  position: fixed; inset: 0; z-index: 100;
  background: var(--bg);
  display: none;
  align-items: flex-end; justify-content: space-between;
  padding: var(--pad);
}
html.js-motion .preloader { display: flex; }
.preloader-inner { display: flex; width: 100%; align-items: flex-end; justify-content: space-between; }
.preloader-name { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.2rem, 3vw, 2rem); }
.preloader-count { font-size: clamp(3rem, 10vw, 8rem); color: var(--accent); line-height: 1; }

/* ============ CURSOR (enabled by JS on fine pointers) ============ */
.cursor {
  position: fixed; top: 0; left: 0; z-index: 99;
  width: 12px; height: 12px; border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  display: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: width 0.25s, height 0.25s;
}
html.js-cursor .cursor { display: block; }
.cursor.is-hover { width: 48px; height: 48px; }

/* ============ NAV ============ */
.site-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px var(--pad);
  transition: transform 0.45s var(--ease), background 0.3s, backdrop-filter 0.3s;
}
.site-nav.is-hidden { transform: translateY(-110%); }
.site-nav.is-scrolled { background: rgba(14, 14, 17, 0.7); backdrop-filter: blur(14px); }
.nav-brand { font-family: var(--font-display); font-weight: 700; font-size: 1.3rem; }
.nav-links { display: flex; gap: clamp(14px, 3vw, 36px); }
.nav-link { font-size: 0.85rem; color: var(--muted); transition: color 0.25s; position: relative; }
.nav-link::after {
  content: ""; position: absolute; left: 0; bottom: -4px;
  width: 100%; height: 1px; background: var(--accent);
  transform: scaleX(0); transform-origin: right;
  transition: transform 0.35s var(--ease);
}
.nav-link:hover { color: var(--ink); }
.nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
.nav-cta {
  font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid var(--faint); border-radius: 999px; padding: 9px 20px;
  transition: background 0.3s, color 0.3s, border-color 0.3s;
}
.nav-cta:hover { background: var(--accent); color: var(--bg); border-color: var(--accent); }

/* ============ BUTTONS ============ */
.btn-pill {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--accent); color: var(--bg);
  font-weight: 600; font-size: 0.95rem;
  border-radius: 999px; padding: 16px 30px;
  transition: background 0.3s;
  will-change: transform;
}
.btn-pill .arrow { transition: transform 0.3s var(--ease); }
.btn-pill:hover .arrow { transform: translateX(5px); }
.btn-pill-lg { font-size: clamp(1rem, 2.4vw, 1.5rem); padding: 22px 44px; }

/* ============ HERO ============ */
.hero {
  min-height: 100svh;
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px var(--pad) 80px;
  position: relative;
}
.hero-eyebrow { color: var(--accent); margin-bottom: 18px; }
.hero-name {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(3.2rem, 12vw, 11rem);
  line-height: 0.95; letter-spacing: -0.02em;
  text-transform: uppercase;
}
.hero-tagline { max-width: 560px; margin-top: 30px; font-size: clamp(1rem, 1.6vw, 1.25rem); color: var(--muted); }
.hero-tagline em { color: var(--ink); }
.hero-row { display: flex; align-items: center; gap: 36px; flex-wrap: wrap; margin-top: 40px; }
.hero-socials { display: flex; gap: 22px; }
.hero-socials a { font-size: 0.85rem; color: var(--muted); transition: color 0.25s; }
.hero-socials a:hover { color: var(--accent); }
.hero-meta { display: flex; gap: 32px; flex-wrap: wrap; margin-top: 60px; color: var(--muted); }
.scroll-hint {
  position: absolute; bottom: 28px; right: var(--pad);
  display: flex; align-items: center; gap: 10px; color: var(--muted);
}
.scroll-hint-line { width: 56px; height: 1px; background: var(--muted); display: inline-block; position: relative; overflow: hidden; }
.scroll-hint-line::after {
  content: ""; position: absolute; inset: 0; background: var(--accent);
  animation: hint-sweep 2.2s var(--ease) infinite;
}
@keyframes hint-sweep { 0% { transform: translateX(-100%); } 60%, 100% { transform: translateX(100%); } }

/* ============ STATS ============ */
.stats { border-top: 1px solid var(--faint); border-bottom: 1px solid var(--faint); }
.stats-row { display: flex; flex-wrap: wrap; }
.stats-row li {
  flex: 1 1 180px;
  padding: clamp(24px, 3.5vw, 48px) var(--pad);
  border-right: 1px solid var(--faint);
  display: flex; flex-direction: column; gap: 6px;
}
.stats-row li:last-child { border-right: none; }
.stat-num {
  font-family: var(--font-display); font-weight: 600;
  font-size: clamp(2rem, 4.5vw, 3.8rem); line-height: 1;
  color: var(--accent);
}
.stat-label { color: var(--muted); }

/* ============ SECTIONS ============ */
.section { padding: clamp(90px, 12vw, 180px) var(--pad) 0; }
.section-head { display: flex; align-items: baseline; gap: 18px; margin-bottom: clamp(36px, 5vw, 72px); }
.section-index { color: var(--accent); }
.section-title {
  font-family: var(--font-display); font-weight: 600;
  font-size: clamp(2.2rem, 6vw, 5rem); line-height: 1;
  text-transform: uppercase; letter-spacing: -0.01em;
}

/* ============ ABOUT ============ */
.about-grid { display: grid; grid-template-columns: 1.6fr 1fr; gap: clamp(32px, 6vw, 96px); align-items: start; }
.about-lead { font-size: clamp(1.25rem, 2.4vw, 2rem); line-height: 1.45; font-weight: 500; }
.about-lead .w { opacity: 1; } /* JS sets per-word opacity */
.about-portrait { border-radius: 14px; overflow: hidden; background: var(--bg-soft); }
.about-portrait img { width: 100%; filter: grayscale(35%); transition: filter 0.4s; }
.about-portrait:hover img { filter: grayscale(0%); }

/* ============ EXPERIENCE ============ */
.xp-list { display: flex; flex-direction: column; }
.xp-item {
  display: grid; grid-template-columns: minmax(220px, 1fr) 2fr;
  gap: clamp(20px, 4vw, 64px);
  padding: clamp(36px, 5vw, 64px) 0;
  border-top: 1px solid var(--faint);
}
.xp-when { color: var(--accent); display: block; margin-bottom: 10px; }
.xp-role { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.3rem, 2.4vw, 2rem); line-height: 1.15; }
.xp-org { color: var(--muted); margin-top: 6px; font-size: 0.9rem; }
.xp-bullets { display: flex; flex-direction: column; gap: 14px; }
.xp-bullets li { color: var(--muted); padding-left: 22px; position: relative; }
.xp-bullets li::before { content: "—"; position: absolute; left: 0; color: var(--accent); }
.xp-bullets strong { color: var(--ink); font-weight: 600; }
@media (min-width: 900px) {
  .xp-side { position: sticky; top: 110px; align-self: start; }
}

/* ============ SKILLS ============ */
.section-skills { padding-left: 0; padding-right: 0; }
.section-skills .section-head, .skills-groups { padding-left: var(--pad); padding-right: var(--pad); }
.skills-marquee { overflow: hidden; border-top: 1px solid var(--faint); border-bottom: 1px solid var(--faint); padding: 26px 0; display: flex; flex-direction: column; gap: 22px; }
.marquee-track { display: flex; gap: 48px; width: max-content; white-space: nowrap; }
.marquee-track span {
  font-family: var(--font-display); font-weight: 500;
  font-size: clamp(1.4rem, 3vw, 2.4rem);
  color: transparent; -webkit-text-stroke: 1px var(--muted);
  transition: color 0.3s;
}
.marquee-track span:hover { color: var(--accent); -webkit-text-stroke-color: var(--accent); }
/* CSS fallback animation; JS marquee replaces it when motion enabled */
@media (prefers-reduced-motion: no-preference) {
  [data-marquee="left"] { animation: m-left 30s linear infinite; }
  [data-marquee="right"] { animation: m-right 30s linear infinite; }
}
@keyframes m-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes m-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
.skills-groups { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: clamp(28px, 4vw, 56px); margin-top: clamp(40px, 6vw, 80px); }
.skill-label { color: var(--accent); margin-bottom: 14px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chips li {
  font-size: 0.82rem; color: var(--muted);
  border: 1px solid var(--faint); border-radius: 999px; padding: 7px 14px;
  transition: border-color 0.25s, color 0.25s;
}
.chips li:hover { border-color: var(--accent); color: var(--ink); }

/* ============ WORK ============ */
.work-list { border-bottom: 1px solid var(--faint); }
.work-row {
  display: grid; grid-template-columns: 70px 1fr auto 40px;
  align-items: center; gap: clamp(14px, 3vw, 40px);
  padding: clamp(26px, 4vw, 44px) 0;
  border-top: 1px solid var(--faint);
  transition: padding-left 0.4s var(--ease);
}
.work-row:hover { padding-left: 18px; }
.work-num { color: var(--muted); }
.work-title {
  font-family: var(--font-display); font-weight: 600;
  font-size: clamp(1.5rem, 4vw, 3.2rem); line-height: 1.05;
  transition: color 0.3s;
}
.work-row:hover .work-title { color: var(--accent); }
.work-cat { color: var(--muted); }
.work-arrow { font-size: clamp(1.3rem, 2.5vw, 2rem); transition: transform 0.35s var(--ease); }
.work-row:hover .work-arrow { transform: translate(6px, -6px); }

/* ============ NOW STRIP ============ */
.now-strip {
  margin: clamp(90px, 12vw, 180px) var(--pad) 0;
  border: 1px solid var(--faint); border-radius: 14px;
  padding: 22px 28px;
  display: flex; align-items: center; gap: 16px;
  background: var(--bg-soft);
}
.now-strip p { color: var(--muted); }
.now-dot {
  width: 9px; height: 9px; border-radius: 50%; flex: none;
  background: var(--accent);
  box-shadow: 0 0 0 0 rgba(200, 245, 80, 0.5);
  animation: now-pulse 2s ease-out infinite;
}
@keyframes now-pulse { to { box-shadow: 0 0 0 12px rgba(200, 245, 80, 0); } }
@media (prefers-reduced-motion: reduce) { .now-dot { animation: none; } }

/* ============ EDUCATION ============ */
.edu-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: clamp(28px, 5vw, 72px); }
.edu-card { border: 1px solid var(--faint); border-radius: 14px; padding: clamp(26px, 3.5vw, 44px); background: var(--bg-soft); }
.edu-when { color: var(--muted); }
.edu-title { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.25rem, 2.2vw, 1.8rem); margin-top: 12px; }
.edu-sub { color: var(--muted); margin-top: 8px; font-size: 0.92rem; }
.edu-note { margin-top: 18px; }
.honors { display: flex; flex-direction: column; }
.honors li { padding: 20px 0 20px 30px; border-top: 1px solid var(--faint); color: var(--muted); position: relative; }
.honors li::before { content: "★"; position: absolute; left: 0; color: var(--accent); }
.honors strong { color: var(--ink); }

/* ============ CONTACT ============ */
.contact {
  min-height: 90svh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: clamp(90px, 12vw, 180px) var(--pad);
  gap: 30px;
}
.contact-eyebrow { color: var(--accent); }
.contact-big {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(2.8rem, 10vw, 9rem); line-height: 0.98;
  text-transform: uppercase; letter-spacing: -0.02em;
}
.contact-big em { text-transform: none; color: var(--accent); font-weight: 400; }
.contact-links { display: flex; gap: 28px; flex-wrap: wrap; justify-content: center; color: var(--muted); }
.contact-links a { transition: color 0.25s; }
.contact-links a:hover { color: var(--accent); }

/* ============ FOOTER ============ */
.site-footer {
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  padding: 26px var(--pad);
  border-top: 1px solid var(--faint);
  color: var(--muted);
}
.to-top:hover { color: var(--accent); }

/* ============ RESPONSIVE ============ */
@media (max-width: 900px) {
  .about-grid, .edu-grid { grid-template-columns: 1fr; }
  .about-portrait { max-width: 320px; }
  .xp-item { grid-template-columns: 1fr; gap: 18px; }
  .work-row { grid-template-columns: 1fr auto; }
  .work-num, .work-cat { display: none; }
}
@media (max-width: 560px) {
  .nav-links { display: none; }
  .stats-row li { flex: 1 1 50%; border-right: none; border-bottom: 1px solid var(--faint); }
  .scroll-hint { display: none; }
}

/* ============ REDUCED MOTION ============ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Verify rendering**

Serve and load in browser. Expected: dark page, huge Clash Display hero name, lime accents, marquee scrolling (CSS fallback), all sections styled, no horizontal scrollbar.

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "feat: kinetic-minimal stylesheet (ink & acid)"
```

---

### Task 3: JavaScript — motion system

**Files:**
- Modify: `assets/js/script.js` (full rewrite)

- [ ] **Step 1: Write the complete script**

Replace the entire file with:

```js
/* Kinetic Minimal — progressive-enhancement motion system.
   Content is fully visible without JS; everything below only ADDS motion. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";
  var hasSplit = hasGsap && typeof window.SplitText !== "undefined";
  var hasLenis = typeof window.Lenis !== "undefined";
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Always-on basics (no motion deps) ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var clockEl = document.querySelector("[data-clock]");
  function tickClock() {
    if (!clockEl) return;
    clockEl.textContent = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata"
    }).format(new Date());
  }
  tickClock();
  setInterval(tickClock, 30000);

  /* Nav hide-on-scroll-down / frost-on-scroll-up (cheap, works without gsap) */
  var nav = document.querySelector("[data-nav]");
  var lastY = 0;
  window.addEventListener("scroll", function () {
    if (!nav) return;
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    if (!reduceMotion) nav.classList.toggle("is-hidden", y > 140 && y > lastY);
    lastY = y;
  }, { passive: true });

  /* ---------- Motion gate ---------- */
  if (reduceMotion || !hasGsap || !hasST) return; // static page — done.

  gsap.registerPlugin(ScrollTrigger);
  if (hasSplit) gsap.registerPlugin(SplitText);
  document.documentElement.classList.add("js-motion");

  /* ---------- Lenis smooth scroll ---------- */
  if (hasLenis) {
    document.documentElement.classList.add("has-lenis");
    var lenis = new Lenis({ duration: 1.15 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Line masks ----------
     Wrap each [data-line]'s content in an inner span; the [data-line] element
     stays as the overflow-hidden mask and the inner span is what translates. */
  function maskLines(els) {
    return Array.prototype.map.call(els, function (el) {
      var inner = document.createElement("span");
      inner.className = "line-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      return inner;
    });
  }

  /* ---------- Preloader + hero intro ---------- */
  var pre = document.querySelector("[data-preloader]");
  var preCount = document.querySelector("[data-preloader-count]");
  var heroLines = maskLines(document.querySelectorAll(".hero [data-line]"));
  var heroReveals = document.querySelectorAll(".hero [data-reveal]");

  gsap.set(heroLines, { yPercent: 110 });
  gsap.set(heroReveals, { autoAlpha: 0, y: 24 });

  function heroIntro() {
    gsap.timeline()
      .to(heroLines, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 })
      .to(heroReveals, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, "-=0.6");
  }

  if (pre && !sessionStorage.getItem("seenIntro")) {
    sessionStorage.setItem("seenIntro", "1");
    var counter = { v: 0 };
    gsap.timeline()
      .to(counter, {
        v: 100, duration: 1.1, ease: "power2.inOut",
        onUpdate: function () { if (preCount) preCount.textContent = String(Math.round(counter.v)); }
      })
      .to(pre, { yPercent: -100, duration: 0.7, ease: "power4.inOut" })
      .set(pre, { display: "none" })
      .add(heroIntro, "-=0.45");
  } else {
    if (pre) pre.style.display = "none";
    heroIntro();
  }

  /* ---------- Section title + contact line reveals ---------- */
  maskLines(document.querySelectorAll("main [data-line]:not(.hero [data-line])")).forEach(function (inner) {
    gsap.fromTo(inner, { yPercent: 110 }, {
      yPercent: 0, duration: 1, ease: "power4.out",
      scrollTrigger: { trigger: inner.parentElement, start: "top 88%" }
    });
  });

  /* ---------- Generic reveals ---------- */
  gsap.utils.toArray("main [data-reveal]:not(.hero [data-reveal])").forEach(function (el) {
    gsap.fromTo(el, { autoAlpha: 0, y: 36 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  /* ---------- About word-by-word scrub ---------- */
  var aboutLead = document.querySelector("[data-words]");
  if (aboutLead && hasSplit) {
    var split = new SplitText(aboutLead, { type: "words", wordsClass: "w" });
    gsap.fromTo(split.words, { opacity: 0.18 }, {
      opacity: 1, stagger: 0.04, ease: "none",
      scrollTrigger: { trigger: aboutLead, start: "top 80%", end: "bottom 55%", scrub: true }
    });
  }

  /* ---------- Portrait parallax ---------- */
  var portrait = document.querySelector("[data-parallax] img");
  if (portrait) {
    gsap.fromTo(portrait, { y: -28 }, {
      y: 28, ease: "none",
      scrollTrigger: { trigger: portrait, start: "top bottom", end: "bottom top", scrub: true }
    });
  }

  /* ---------- Stat counters ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.6, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: function () {
        var n = decimals ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString("en-US");
        el.textContent = n + suffix;
      }
    });
  });

  /* ---------- Magnetic buttons (fine pointers only) ---------- */
  if (finePointer) {
    document.querySelectorAll("[data-magnetic]").forEach(function (btn) {
      var strength = 0.35;
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
          duration: 0.4, ease: "power3.out"
        });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      });
    });
  }

  /* ---------- Custom cursor (fine pointers only) ---------- */
  if (finePointer) {
    var cursor = document.querySelector("[data-cursor]");
    if (cursor) {
      document.documentElement.classList.add("js-cursor");
      var setX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
      var setY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });
      window.addEventListener("mousemove", function (e) { setX(e.clientX); setY(e.clientY); });
      document.querySelectorAll("a, button").forEach(function (el) {
        el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
        el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
      });
    }
  }

  /* ---------- Anchor links through Lenis ---------- */
  if (hasLenis) {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70 });
      });
    });
  }
})();
```

- [ ] **Step 2: Verify in browser**

Serve, hard-reload (clear sessionStorage to see preloader). Expected: counter runs 0→100, curtain lifts, hero lines rise; scrolling is smooth; counters count up; about paragraph brightens word-by-word; buttons are magnetic; lime cursor dot follows mouse; console has zero errors.

- [ ] **Step 3: Commit**

```bash
git add assets/js/script.js
git commit -m "feat: gsap/lenis motion system with progressive enhancement"
```

---

### Task 4: Verification matrix + final commit

**Files:** none (verification only; fix-ups allowed in the three files above)

- [ ] **Step 1: No-JS / CDN-blocked pass**

DevTools → block `cdn.jsdelivr.net` (or toggle "Disable JavaScript") → reload.
Expected: every section readable, no blank areas, no preloader, CSS marquee still animates.

- [ ] **Step 2: Reduced-motion pass**

DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → reload.
Expected: no preloader, no smooth-scroll hijack, no custom cursor, content visible immediately.

- [ ] **Step 3: Responsive pass**

Check 375px, 768px, 1440px widths. Expected: no horizontal overflow; hero name wraps cleanly; stats stack 2-up on phone; experience stacks single-column; nav links hidden ≤560px (brand + Resume remain).

- [ ] **Step 4: Console + links pass**

Zero console errors; click every nav anchor, social, project, mailto/tel link; Resume downloads.

- [ ] **Step 5: Commit any fix-ups**

```bash
git add -A && git commit -m "fix: polish pass after verification matrix"
```
(Skip if working tree is clean.)


