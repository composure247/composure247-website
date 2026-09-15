/* ============================================================
   Composure, Main JavaScript
   Navigation, animations, accordions, interactions
   ============================================================ */

(function () {
  'use strict';

  // ── Sticky Nav ─────────────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile Nav ─────────────────────────────────────────────
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileNav    = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileClose  = document.querySelector('.mobile-nav-close');

  function openMobileNav() {
    mobileNav && mobileNav.classList.add('open');
    mobileOverlay && mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav && mobileNav.classList.remove('open');
    mobileOverlay && mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle  && mobileToggle.addEventListener('click', openMobileNav);
  mobileClose   && mobileClose.addEventListener('click', closeMobileNav);
  mobileOverlay && mobileOverlay.addEventListener('click', closeMobileNav);

  // ── FAQ Accordion ──────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other open FAQs
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherAnswer = other.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });

  // ── Scroll Animations ──────────────────────────────────────
  const animatedEls = document.querySelectorAll('.fade-up, .fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animatedEls.forEach(el => el.classList.add('visible'));
  }

  // ── Active nav link ────────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Pricing toggle (annual/monthly) ───────────────────────
  const pricingToggle = document.getElementById('pricing-toggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('change', function () {
      const isAnnual = this.checked;
      document.querySelectorAll('[data-monthly]').forEach(el => {
        const monthly = parseFloat(el.dataset.monthly);
        const annual  = Math.round(monthly * 0.8);
        el.textContent = isAnnual ? annual : monthly;
      });
      document.querySelectorAll('.pricing-period').forEach(el => {
        el.textContent = isAnnual ? '/ month, billed annually' : '/ month';
      });
      const savings = document.getElementById('pricing-savings');
      if (savings) savings.style.display = isAnnual ? 'inline-flex' : 'none';
    });
  }

  // ── Smooth anchor scrolling ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 0;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileNav();
      }
    });
  });

  // ── Demo form submission (placeholder) ────────────────────
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = demoForm.querySelector('[type="submit"]');
      btn.textContent = 'Request received, we\'ll be in touch shortly.';
      btn.disabled = true;
      btn.style.background = '#10B981';
    });
  }

  // ── Subtle card tilt effect on hover ──────────────────────
  document.querySelectorAll('.product-mockup').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect   = this.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      this.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });

})();

/* Light/dark theme toggle */
document.addEventListener('click', function (e) {
  var t = e.target.closest && e.target.closest('[data-theme-toggle]');
  if (!t) return;
  var h = document.documentElement, dark = h.classList.contains('theme-dark');
  h.classList.remove('theme-dark', 'theme-light');
  h.classList.add(dark ? 'theme-light' : 'theme-dark');
  try { localStorage.setItem('composure-theme', dark ? 'light' : 'dark'); } catch (_) {}
});
