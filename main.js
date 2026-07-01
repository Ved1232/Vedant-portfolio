/* ============================================================
   main.js — Lenis smooth scroll + GSAP ScrollTrigger
   Degrades gracefully: if a CDN fails or the user prefers
   reduced motion, the site still works as a normal page.
   ============================================================ */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasLenis = typeof Lenis !== "undefined";
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  /* ---------- 1. Smooth scrolling (Lenis) ---------- */
  var lenis = null;

  if (hasLenis && !prefersReducedMotion) {
    lenis = new Lenis({
      lerp: 0.09,          // lower = more "elastic" deceleration
      smoothWheel: true
    });

    if (hasGsap) {
      // Drive Lenis from GSAP's ticker so scroll + animation stay in sync
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      // Fallback raf loop if GSAP failed to load
      (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })();
    }
  }

  /* ---------- 2. Anchor links via Lenis ---------- */
  document.querySelectorAll("[data-scroll]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------- 3. Mobile menu ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("navBurger");

  function closeMenu() {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    if (lenis) lenis.start();
  }

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    if (lenis) { open ? lenis.stop() : lenis.start(); }
  });

  /* ---------- 4. Nav border on scroll ---------- */
  window.addEventListener("scroll", function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });

  /* ---------- 5. GSAP animations ---------- */
  if (hasGsap && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    /* Hero name slides up on load */
    gsap.from(".hero__word", {
      yPercent: 110,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.12,
      delay: 0.15
    });
    gsap.from(".hero__meta, .hero__actions", {
      opacity: 0, y: 24, duration: 0.9, ease: "power3.out",
      stagger: 0.12, delay: 0.7
    });

    /* Horizontal project pipeline — desktop only */
    var mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", function () {
      var track = document.getElementById("pipelineTrack");
      var progress = document.getElementById("pipelineProgress");
      if (!track) return;

      var getAmount = function () { return track.scrollWidth - window.innerWidth; };

      var horizontalTween = gsap.to(track, {
        x: function () { return -getAmount(); },
        ease: "none",
        scrollTrigger: {
          trigger: ".pipeline",
          start: "top top",
          end: function () { return "+=" + getAmount(); },
          pin: true,
          scrub: 1,                 // ties motion to the scrollbar with 1s smoothing
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            if (progress) progress.style.width = (self.progress * 100) + "%";
          }
        }
      });

      /* Each panel's content drifts in as it slides into view */
      gsap.utils.toArray(".panel").forEach(function (panel) {
        gsap.from(panel.children, {
          opacity: 0, y: 40, stagger: 0.07, duration: 0.6, ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalTween,
            start: "left 75%",
            toggleActions: "play none none none"
          }
        });
      });
    });
  }

  /* ---------- 6. Scroll reveals (IntersectionObserver — works without GSAP) ---------- */
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }
})();