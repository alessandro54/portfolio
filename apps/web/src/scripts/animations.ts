import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'power3.out' });

// ══════════════════════════════════════
// 1. NAV — SLIDE DOWN
// ══════════════════════════════════════
gsap.from('nav', {
  y: -100,
  autoAlpha: 0,
  duration: 1,
  ease: 'power4.out',
  delay: 0.1,
});

// ══════════════════════════════════════
// 2. HERO ENTRANCE TIMELINE
// ══════════════════════════════════════
const hero = gsap.timeline({ delay: 0.3 });

hero
  .from('.hero-badge', {
    autoAlpha: 0,
    y: 40,
    scale: 0.9,
    duration: 0.9,
  })
  .from(
    '#hero h1 span',
    {
      autoAlpha: 0,
      y: 80,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power4.out',
    },
    '<0.15',
  )
  .from(
    '.hero-sub',
    {
      autoAlpha: 0,
      y: 50,
      duration: 1,
    },
    '<0.25',
  )
  .from(
    '.hero-btns a',
    {
      autoAlpha: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.9,
    },
    '<0.2',
  )
  .from(
    '.hero-stats',
    {
      autoAlpha: 0,
      y: 50,
      scale: 0.92,
      duration: 1.1,
      ease: 'power2.out',
    },
    '<0.15',
  )
  .from(
    '.scroll-cue',
    {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
    },
    '<0.5',
  );

// ══════════════════════════════════════
// 3. STAT COUNTER ANIMATION
// ══════════════════════════════════════
document.querySelectorAll<HTMLElement>('.stat-num').forEach((el) => {
  const target = parseInt(el.dataset.target || '0', 10);
  const suffix = el.dataset.suffix || '';
  const obj = { val: 0 };

  hero.to(
    obj,
    {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix;
      },
    },
    // start when hero-stats begins
    '<',
  );
});

// ══════════════════════════════════════
// 4. SCROLL CUE — FADE ON SCROLL
// ══════════════════════════════════════
gsap.to('.scroll-cue', {
  autoAlpha: 0,
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: '+=120',
    scrub: true,
  },
});

// ══════════════════════════════════════
// 5. TICKER — REVEAL + SCROLL SPEED
// ══════════════════════════════════════
gsap.from('.ticker-wrap', {
  autoAlpha: 0,
  y: 20,
  duration: 0.8,
  scrollTrigger: {
    trigger: '.ticker-wrap',
    start: 'top 90%',
    toggleActions: 'play none none none',
  },
});

// Speed up ticker on scroll
const tickerTrack = document.querySelector<HTMLElement>('.ticker-wrap .inline-flex');
if (tickerTrack) {
  let currentSpeed = 1;
  let targetSpeed = 1;

  // Override the CSS animation with GSAP for dynamic speed control
  tickerTrack.style.animation = 'none';
  let xPos = 0;
  const totalWidth = tickerTrack.scrollWidth / 2;

  gsap.ticker.add(() => {
    currentSpeed += (targetSpeed - currentSpeed) * 0.05;
    xPos -= 0.5 * currentSpeed;
    if (xPos <= -totalWidth) xPos += totalWidth;
    gsap.set(tickerTrack, { x: xPos });
  });

  ScrollTrigger.create({
    trigger: '.ticker-wrap',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      targetSpeed = 1 + Math.abs(self.getVelocity()) / 600;
      targetSpeed = Math.min(targetSpeed, 5);
    },
    onLeave: () => {
      targetSpeed = 1;
    },
    onLeaveBack: () => {
      targetSpeed = 1;
    },
  });
}

// ══════════════════════════════════════
// 6. SECTION LABELS — CLIP IN FROM LEFT
// ══════════════════════════════════════
gsap.utils.toArray<HTMLElement>('.s-label').forEach((label) => {
  gsap.from(label, {
    autoAlpha: 0,
    x: -40,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: label,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  });
});

// Section headings — fade up after label
gsap.utils.toArray<HTMLElement>('section h2').forEach((h2) => {
  gsap.from(h2, {
    autoAlpha: 0,
    y: 30,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: h2,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});

// ══════════════════════════════════════
// 7. SERVICES
// ══════════════════════════════════════
gsap.set('#services .grid', {
  visibility: 'inherit',
  borderColor: 'transparent',
  backgroundColor: 'transparent',
});

const svcTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#services .grid',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
});

svcTl
  .from('#services .grid > div', {
    autoAlpha: 0,
    y: 60,
    scale: 0.93,
    stagger: 0.12,
    duration: 0.9,
    ease: 'back.out(1.2)',
  })
  .to(
    '#services .grid',
    {
      borderColor: 'var(--rule)',
      duration: 0.6,
      ease: 'power2.inOut',
    },
    '<0.3',
  );

// ══════════════════════════════════════
// 8. WHY ME
// ══════════════════════════════════════
// Set wrapper visible but transparent — border/bg hidden
gsap.set('.why-grid', {
  visibility: 'inherit',
  borderColor: 'transparent',
  backgroundColor: 'transparent',
  boxShadow: 'none',
});

const whyTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.why-grid',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
});

whyTl
  .from('.why-feature > div', {
    autoAlpha: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.9,
  })
  .from(
    '.why-card',
    {
      autoAlpha: 0,
      y: 50,
      scale: 0.93,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.4)',
    },
    '<0.2',
  )
  .to(
    '.why-grid',
    {
      borderColor: 'var(--rule)',
      backgroundColor: 'var(--rule)',
      duration: 0.6,
      ease: 'power2.inOut',
    },
    '<0.3',
  );

// ══════════════════════════════════════
// 9. RECENT WORK + TAG STAGGER
// ══════════════════════════════════════
gsap.set('#work .grid', {
  visibility: 'inherit',
  borderColor: 'transparent',
  backgroundColor: 'transparent',
});

const workTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#work .grid',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
});

workTl
  .from('.wk', {
    autoAlpha: 0,
    y: 70,
    scale: 0.9,
    stagger: 0.15,
    duration: 1,
  })
  .from(
    '.wk-tags span',
    {
      autoAlpha: 0,
      y: 15,
      scale: 0.8,
      stagger: 0.04,
      duration: 0.5,
      ease: 'back.out(1.7)',
    },
    '<0.5',
  )
  .to(
    '#work .grid',
    {
      borderColor: 'var(--rule)',
      backgroundColor: 'var(--rule)',
      duration: 0.6,
      ease: 'power2.inOut',
    },
    '<0.3',
  );

// ══════════════════════════════════════
// 10. EXPERIENCE
// ══════════════════════════════════════
ScrollTrigger.batch('.exp-row', {
  onEnter: (elements) => {
    gsap.from(elements, {
      autoAlpha: 0,
      x: -80,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
    });
  },
  start: 'top 85%',
  once: true,
});

// ══════════════════════════════════════
// 11. CONTACT
// ══════════════════════════════════════
const contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 75%',
    toggleActions: 'play none none none',
  },
});

contactTl
  .from('#contact h2', {
    autoAlpha: 0,
    y: 60,
    duration: 1,
  })
  .from(
    '#contact p',
    {
      autoAlpha: 0,
      y: 40,
      duration: 0.9,
    },
    '<0.15',
  )
  .from(
    '#contact .flex.flex-col > a',
    {
      autoAlpha: 0,
      y: 40,
      duration: 0.8,
    },
    '<0.2',
  )
  .from(
    '#contact .flex.gap-\\[0\\.6rem\\] a',
    {
      autoAlpha: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.7,
    },
    '<0.15',
  );

// ══════════════════════════════════════
// 12. FOOTER
// ══════════════════════════════════════
gsap.from('footer', {
  autoAlpha: 0,
  y: 20,
  duration: 0.6,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: 'footer',
    start: 'top 95%',
    toggleActions: 'play none none none',
  },
});

// ══════════════════════════════════════
// 13. PARALLAX — SUBTLE Y-SHIFT ON SECTIONS
// ══════════════════════════════════════
gsap.utils.toArray<HTMLElement>('#services, #work, #experience, #contact').forEach((section) => {
  gsap.to(section, {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
});

// ══════════════════════════════════════
// 14. BACKGROUND PARALLAX — SUBTLE DRIFT
// ══════════════════════════════════════
const gl = document.getElementById('gl');
const vignette = document.getElementById('vignette');

if (gl && vignette) {
  gsap.to([gl, vignette], {
    y: () => document.documentElement.scrollHeight * 0.08,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  });
}
