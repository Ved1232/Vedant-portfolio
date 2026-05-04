/* ═══════════════════════════════════════
   VEDANT CHAVAN PORTFOLIO — app.js
═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Section navigation ── */
  function activateSection(id) {
    // Validate id
    const target = document.getElementById(id);
    if (!target) return;

    // Hide all sections
    document.querySelectorAll('.section').forEach(s => {
      s.classList.remove('active');
      s.style.display = 'none';
    });

    // Show target — #home needs flex, rest need block
    target.style.display = (id === 'home') ? 'flex' : 'block';
    // Small delay so display kicks in before animation class
    requestAnimationFrame(() => {
      target.classList.add('active');
    });

    // Update nav active state — desktop + mobile
    document.querySelectorAll('.nav-link, .mob-link').forEach(l => l.classList.remove('active-link'));
    document.querySelectorAll(`[data-section="${id}"]`).forEach(l => l.classList.add('active-link'));

    // Close mobile menu
    const mob = document.getElementById('mobileMenu');
    if (mob) mob.classList.remove('open');

    // Update URL hash silently
    history.replaceState(null, '', '#' + id);

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ── Wire up ALL nav/section links ── */
  document.addEventListener('click', function (e) {
    // Walk up the DOM in case click is on a child (icon etc.)
    const link = e.target.closest('[data-section]');
    if (!link) return;

    e.preventDefault();
    e.stopPropagation();
    activateSection(link.dataset.section);
  });

  /* ── Hamburger toggle ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
    });
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
      }
    });
  }

  /* ── Theme toggle ── */
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  if (themeBtn && themeIcon) {
    let isDark = localStorage.getItem('theme') !== 'light';
    // Apply saved theme immediately
    if (!isDark) {
      document.body.classList.add('light');
      themeIcon.className = 'fas fa-sun';
    }
    themeBtn.addEventListener('click', () => {
      isDark = !isDark;
      document.body.classList.toggle('light', !isDark);
      themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ── On page load: read hash and show correct section ── */
  function init() {
    const hash = window.location.hash.replace('#', '');
    const startId = (hash && document.getElementById(hash)) ? hash : 'home';
    activateSection(startId);
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Skill bar re-animation when About becomes visible ── */
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.target.id === 'about' && m.target.classList.contains('active')) {
        m.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.animation = 'none';
          void bar.offsetWidth;
          bar.style.animation = '';
        });
      }
    });
  });
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection, { attributes: true, attributeFilter: ['class'] });
  }

  /* ── Contact form loading state ── */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function () {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        btn.disabled = true;
      }
    });
  }

})();
