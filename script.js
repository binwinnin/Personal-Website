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

// ── Contact form → Formspree ──────────────────────────────
// Replace YOUR_FORM_ID below with the ID from formspree.io/dashboard
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn  = form.querySelector('button[type="submit"]');
  const orig = btn.textContent;

  btn.textContent = 'Sending…';
  btn.disabled    = true;

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(form)
    });

    if (res.ok) {
      btn.textContent       = 'Message Sent ✓';
      btn.style.background  = '#4caf50';
      btn.style.borderColor = '#4caf50';
      form.reset();
      setTimeout(() => {
        btn.textContent       = orig;
        btn.style.background  = '';
        btn.style.borderColor = '';
        btn.disabled          = false;
      }, 3500);
    } else {
      throw new Error('Server error');
    }
  } catch {
    btn.textContent       = 'Failed — please try again';
    btn.style.background  = '#e63935';
    btn.style.borderColor = '#e63935';
    btn.disabled          = false;
    setTimeout(() => { btn.textContent = orig; }, 3000);
  }
});

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
