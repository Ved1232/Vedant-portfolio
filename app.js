/* ═══════════════════════════════════════
   VEDANT CHAVAN PORTFOLIO — app.js
═══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Section navigation ── */
  function activateSection(id) {
    // Sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    // Nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active-link'));
    const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (activeLink) activeLink.classList.add('active-link');

    // Close mobile menu
    document.getElementById('mobileMenu').classList.remove('open');

    // Update URL hash without scrolling
    history.replaceState(null, '', '#' + id);
  }

  // Desktop nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      activateSection(this.dataset.section);
    });
  });

  // Mobile nav links
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      activateSection(this.dataset.section);
    });
  });

  // Inline links with data-section (e.g. "Contact Me" button in hero)
  document.querySelectorAll('a[data-section]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      activateSection(this.dataset.section);
    });
  });

  /* ── Hamburger menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  /* ── Theme toggle ── */
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  let isDark = true;

  // Persist theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    themeIcon.className = 'fas fa-sun';
    isDark = false;
  }

  themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light', !isDark);
    themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  /* ── Hash navigation on load ── */
  window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
      activateSection(hash);
    }
  });

  /* ── Skill bar animation on About section activation ── */
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      if (m.target.id === 'about' && m.target.classList.contains('active')) {
        m.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.animation = 'none';
          void bar.offsetWidth; // reflow
          bar.style.animation = '';
        });
      }
    });
  });
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection, { attributes: true, attributeFilter: ['class'] });
  }

  /* ── Contact form feedback ── */
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
