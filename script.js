// ── Year ──────────────────────────────────────────────────
document.getElementById('yr').textContent = new Date().getFullYear();

// ── Nav scroll state ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile hamburger ──────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Contact form → Formspree (via @formspree/ajax CDN) ───
// Initialisation is handled by the inline script in index.html;

// ── Scroll reveal ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.service-card, .pricing-card, .port-card, .testi-card, .step-card'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.06}s`;
  observer.observe(el);
});
