// ══════════════════════════════════════
// Native animation engine — zero dependencies
// Web Animations API + IntersectionObserver
// ══════════════════════════════════════

const $ = (s: string) => document.querySelector<HTMLElement>(s);
const $$ = (s: string) => [...document.querySelectorAll<HTMLElement>(s)];

// Easing curves
const EASE = {
  out: 'cubic-bezier(0.33, 1, 0.68, 1)',
  outStrong: 'cubic-bezier(0.25, 1, 0.5, 1)',
  back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

/** Reveal an element and animate it */
function anim(el: HTMLElement | null, keyframes: Keyframe[], opts: KeyframeAnimationOptions = {}) {
  if (!el) return null;
  el.style.visibility = 'visible';
  return el.animate(keyframes, { fill: 'both', ...opts });
}

/** Animate multiple elements with stagger */
function stagger(els: HTMLElement[], keyframes: Keyframe[], opts: KeyframeAnimationOptions = {}, gap = 120) {
  return els.map((el, i) => anim(el, keyframes, { ...opts, delay: ((opts.delay as number) || 0) + i * gap }));
}

/** Trigger once when element enters viewport */
function onVisible(selector: string, fn: (el: HTMLElement) => void, margin = '0px 0px -15% 0px') {
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        fn(e.target as HTMLElement);
        observer.unobserve(e.target);
      }
    }
  }, { rootMargin: margin });
  $$(selector).forEach((el) => observer.observe(el));
}

/** Reveal a grid: show container, animate children, fade borders */
function revealGrid(
  gridSel: string,
  childSel: string,
  childKF: Keyframe[],
  childOpts: KeyframeAnimationOptions,
  childGap: number,
  fadeBg = false,
) {
  onVisible(gridSel, (grid) => {
    const children = $$(childSel);
    children.forEach((c) => { c.style.opacity = '0'; });
    grid.style.visibility = 'visible';
    grid.style.borderColor = 'transparent';
    grid.style.backgroundColor = 'transparent';

    stagger(children, childKF, childOpts, childGap);

    const borderDelay = childGap * Math.min(children.length, 3);
    grid.animate(
      [{ borderColor: 'transparent' }, { borderColor: 'var(--rule)' }],
      { duration: 600, delay: borderDelay, fill: 'forwards', easing: EASE.inOut },
    );
    if (fadeBg) {
      grid.animate(
        [{ backgroundColor: 'transparent' }, { backgroundColor: 'var(--rule)' }],
        { duration: 600, delay: borderDelay, fill: 'forwards', easing: EASE.inOut },
      );
    }
  }, '0px 0px -20% 0px');
}

// ══════════════════════════════════════
// 1. NAV — SLIDE DOWN
// ══════════════════════════════════════
anim($('nav'), [
  { transform: 'translateY(-100px)', opacity: 0 },
  { transform: 'none', opacity: 1 },
], { duration: 1000, easing: EASE.outStrong, delay: 100 });

// ══════════════════════════════════════
// 2. HERO ENTRANCE SEQUENCE
// ══════════════════════════════════════
anim($('.hero-badge'), [
  { opacity: 0, transform: 'translateY(40px) scale(0.9)' },
  { opacity: 1, transform: 'none' },
], { duration: 900, easing: EASE.out, delay: 300 });

stagger($$('#hero h1 span'), [
  { opacity: 0, transform: 'translateY(80px)' },
  { opacity: 1, transform: 'none' },
], { duration: 1200, easing: EASE.outStrong, delay: 450 }, 150);

anim($('.hero-sub'), [
  { opacity: 0, transform: 'translateY(50px)' },
  { opacity: 1, transform: 'none' },
], { duration: 1000, easing: EASE.out, delay: 700 });

const btnAnims = stagger($$('.hero-btns a'), [
  { opacity: 0, transform: 'translateY(40px)' },
  { opacity: 1, transform: 'none' },
], { duration: 900, easing: EASE.out, delay: 900 }, 120);

// CTA pulse — starts after hero buttons finish
const cta = $('.cta-primary');
if (cta && btnAnims.length) {
  const last = btnAnims[btnAnims.length - 1];
  last?.finished.then(() => {
    const pulse = cta.animate([
      { boxShadow: 'none', transform: 'scale(1)' },
      { boxShadow: '0 0 20px rgba(167,139,250,0.5), 0 0 40px rgba(167,139,250,0.2)', transform: 'scale(1.04)' },
    ], { duration: 1200, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' });

    const hero = $('#hero');
    if (hero) {
      let hovering = false;
      new IntersectionObserver(([e]) => {
        if (hovering) return;
        e.isIntersecting ? pulse.play() : pulse.pause();
      }, { threshold: 0.1 }).observe(hero);

      cta.addEventListener('mouseenter', () => {
        hovering = true;
        pulse.pause();
        cta.animate(
          [{ transform: 'scale(1.07) translateY(-2px)', boxShadow: '0 0 30px rgba(167,139,250,0.6), 0 0 60px rgba(167,139,250,0.3)' }],
          { duration: 250, fill: 'forwards', easing: EASE.out },
        );
      });
      cta.addEventListener('mouseleave', () => {
        hovering = false;
        const a = cta.animate(
          [{ transform: 'scale(1)', boxShadow: 'none' }],
          { duration: 600, fill: 'forwards', easing: EASE.inOut },
        );
        a.finished.then(() => pulse.play());
      });
    }
  });
}

anim($('.hero-stats'), [
  { opacity: 0, transform: 'translateY(50px) scale(0.92)' },
  { opacity: 1, transform: 'none' },
], { duration: 1100, easing: EASE.out, delay: 1050 });

anim($('.scroll-cue'), [
  { opacity: 0, transform: 'translateY(20px)' },
  { opacity: 1, transform: 'none' },
], { duration: 800, easing: EASE.out, delay: 1550 });

// ══════════════════════════════════════
// 3. STAT COUNTER ANIMATION
// ══════════════════════════════════════
$$<HTMLElement>('.stat-num').forEach((el) => {
  const target = parseInt(el.dataset.target || '0', 10);
  const suffix = el.dataset.suffix || '';
  const start = performance.now() + 1050;
  const dur = 1800;

  function tick(now: number) {
    const t = now - start;
    if (t < 0) { requestAnimationFrame(tick); return; }
    const p = Math.min(t / dur, 1);
    const eased = 1 - (1 - p) * (1 - p); // power2.out
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});

// ══════════════════════════════════════
// 4. SCROLL CUE — FADE ON SCROLL
// ══════════════════════════════════════
const scrollCue = $('.scroll-cue');

// ══════════════════════════════════════
// 5. TICKER — REVEAL + SCROLL SPEED
// ══════════════════════════════════════
onVisible('.ticker-wrap', (el) => {
  anim(el, [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 800, easing: EASE.out });
}, '0px 0px -10% 0px');

const tickerTrack = $('.ticker-wrap .inline-flex');
let tkSpeed = 1;
let tkTarget = 1;
let tkX = 0;
let tkTotal = 0;
let tkInView = false;

if (tickerTrack) {
  tickerTrack.style.animation = 'none';
  tkTotal = tickerTrack.scrollWidth / 2;

  new IntersectionObserver(([e]) => {
    tkInView = e.isIntersecting;
    if (!tkInView) tkTarget = 1;
  }).observe($('.ticker-wrap')!);
}

// ══════════════════════════════════════
// 6. SECTION LABELS — CLIP IN FROM LEFT
// ══════════════════════════════════════
onVisible('.s-label', (el) => {
  anim(el, [
    { opacity: 0, transform: 'translateX(-40px)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 700, easing: EASE.out });
}, '0px 0px -12% 0px');

// ══════════════════════════════════════
// 7. SECTION HEADINGS — FADE UP
// ══════════════════════════════════════
onVisible('section:not(#contact) h2', (el) => {
  anim(el, [
    { opacity: 0, transform: 'translateY(30px)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 900, easing: EASE.out });
}, '0px 0px -15% 0px');

// ══════════════════════════════════════
// 8. SERVICES
// ══════════════════════════════════════
revealGrid(
  '#services .grid',
  '#services .grid > div',
  [{ opacity: 0, transform: 'translateY(60px) scale(0.93)' }, { opacity: 1, transform: 'none' }],
  { duration: 900, easing: EASE.back },
  120,
);

// ══════════════════════════════════════
// 9. WHY ME
// ══════════════════════════════════════
onVisible('.why-grid', (grid) => {
  // Feature columns
  const featureDivs = $$('.why-feature > div');
  featureDivs.forEach((c) => { c.style.opacity = '0'; });
  grid.style.visibility = 'visible';
  grid.style.borderColor = 'transparent';
  grid.style.backgroundColor = 'transparent';

  stagger(featureDivs, [
    { opacity: 0, transform: 'translateY(50px)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 900, easing: EASE.out }, 150);

  // Cards
  const cards = $$('.why-card');
  cards.forEach((c) => { c.style.opacity = '0'; });
  stagger(cards, [
    { opacity: 0, transform: 'translateY(50px) scale(0.93)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 800, easing: EASE.back, delay: 200 }, 100);

  // Border + bg
  const d = 300;
  grid.animate([{ borderColor: 'transparent' }, { borderColor: 'var(--rule)' }], { duration: 600, delay: d, fill: 'forwards', easing: EASE.inOut });
  grid.animate([{ backgroundColor: 'transparent' }, { backgroundColor: 'var(--rule)' }], { duration: 600, delay: d, fill: 'forwards', easing: EASE.inOut });
}, '0px 0px -20% 0px');

// ══════════════════════════════════════
// 10. RECENT WORK + TAG STAGGER
// ══════════════════════════════════════
onVisible('#work .grid', (grid) => {
  const wks = $$('.wk');
  wks.forEach((c) => { c.style.opacity = '0'; });
  grid.style.visibility = 'visible';
  grid.style.borderColor = 'transparent';
  grid.style.backgroundColor = 'transparent';

  stagger(wks, [
    { opacity: 0, transform: 'translateY(70px) scale(0.9)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 1000, easing: EASE.out }, 150);

  // Tags stagger
  const tags = $$('.wk-tags span');
  tags.forEach((c) => { c.style.opacity = '0'; });
  stagger(tags, [
    { opacity: 0, transform: 'translateY(15px) scale(0.8)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 500, easing: EASE.back, delay: 500 }, 40);

  // Border + bg
  const d = 300;
  grid.animate([{ borderColor: 'transparent' }, { borderColor: 'var(--rule)' }], { duration: 600, delay: d, fill: 'forwards', easing: EASE.inOut });
  grid.animate([{ backgroundColor: 'transparent' }, { backgroundColor: 'var(--rule)' }], { duration: 600, delay: d, fill: 'forwards', easing: EASE.inOut });
}, '0px 0px -20% 0px');

// ══════════════════════════════════════
// 11. EXPERIENCE
// ══════════════════════════════════════
let expIdx = 0;
onVisible('.exp-row', (el) => {
  anim(el, [
    { opacity: 0, transform: 'translateX(-80px)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 1000, easing: EASE.out, delay: expIdx * 120 });
  expIdx++;
  // Reset counter after a pause so next batch staggers fresh
  setTimeout(() => { expIdx = 0; }, 300);
}, '0px 0px -15% 0px');

// ══════════════════════════════════════
// 12. CONTACT
// ══════════════════════════════════════
onVisible('#contact', (section) => {
  const emailLink = section.querySelector<HTMLElement>('.flex.flex-col > a');
  if (emailLink) {
    anim(emailLink, [
      { opacity: 0, transform: 'translateY(40px)' },
      { opacity: 1, transform: 'none' },
    ], { duration: 800, easing: EASE.out, delay: 200 });
  }

  const socials = [...section.querySelectorAll<HTMLElement>('.flex.gap-\\[0\\.6rem\\] a')];
  socials.forEach((c) => { c.style.opacity = '0'; });
  stagger(socials, [
    { opacity: 0, transform: 'translateY(30px)' },
    { opacity: 1, transform: 'none' },
  ], { duration: 700, easing: EASE.out, delay: 350 }, 80);
}, '0px 0px -5% 0px');

// ══════════════════════════════════════
// 13-14. SCROLL-DRIVEN EFFECTS
// ══════════════════════════════════════

// Cache section positions for parallax
const parallaxSections: { el: HTMLElement; top: number; height: number }[] = [];
function cacheOffsets() {
  parallaxSections.length = 0;
  $$('#services, #work, #experience').forEach((el) => {
    const rect = el.getBoundingClientRect();
    parallaxSections.push({ el, top: rect.top + window.scrollY, height: rect.height });
  });
}
cacheOffsets();
window.addEventListener('resize', cacheOffsets, { passive: true });

const gl = $('#gl');
const vignette = $('#vignette');

// Scroll state
let scrollY = 0;
let lastScrollY = 0;
let lastScrollTime = 0;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;

  // Ticker velocity
  if (tkInView) {
    const now = performance.now();
    if (lastScrollTime) {
      const vel = Math.abs(scrollY - lastScrollY) / (now - lastScrollTime) * 1000;
      tkTarget = Math.min(1 + vel / 600, 5);
    }
    lastScrollY = scrollY;
    lastScrollTime = now;
  }
}, { passive: true });

// Background parallax lerp state
let bgY = 0;

// Main animation loop
function tick() {
  // Scroll-cue fade (0 → 120px scroll)
  if (scrollCue) {
    const p = Math.min(scrollY / 120, 1);
    scrollCue.style.opacity = String(1 - p);
    if (p >= 1) scrollCue.style.visibility = 'hidden';
  }

  // Ticker
  if (tickerTrack && tkTotal) {
    tkSpeed += (tkTarget - tkSpeed) * 0.05;
    tkX -= 0.5 * tkSpeed;
    if (tkX <= -tkTotal) tkX += tkTotal;
    tickerTrack.style.transform = `translateX(${tkX}px)`;

    // Decay target speed toward 1
    if (!tkInView || Math.abs(scrollY - lastScrollY) < 1) {
      tkTarget += (1 - tkTarget) * 0.02;
    }
  }

  // Section parallax
  const vh = window.innerHeight;
  for (const s of parallaxSections) {
    const sTop = s.top - scrollY;
    if (sTop < vh && sTop + s.height > 0) {
      const progress = 1 - (sTop + s.height) / (vh + s.height);
      s.el.style.transform = `translateY(${-40 * progress}px)`;
    }
  }

  // Background parallax (lerped)
  if (gl && vignette) {
    const maxScroll = document.documentElement.scrollHeight - vh;
    const maxShift = document.documentElement.scrollHeight * 0.08;
    const targetY = maxScroll > 0 ? (scrollY / maxScroll) * maxShift : 0;
    bgY += (targetY - bgY) * 0.08;
    const t = `translateY(${bgY}px)`;
    gl.style.transform = t;
    vignette.style.transform = t;
  }

  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
