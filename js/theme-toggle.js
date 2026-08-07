/* ============================================================
   Forces Academy — Theme Toggle + Scroll Animations
   Kept separate from js/main.js so existing behaviour there
   (counters, back-to-top, etc.) is never touched.
   Drives: dark/light toggle + localStorage persistence, and
   triggers the .reveal / .stat-item / .course-card animations
   defined in css/animations.css when they scroll into view.
   ============================================================ */

(function () {
  const STORAGE_KEY = 'forcesAcademyTheme'; // 'dark' | 'light'
  const root = document.body;
  const toggleBtn = document.getElementById('themeToggle');
  const icon = toggleBtn ? toggleBtn.querySelector('i') : null;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark-mode');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
      if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      root.classList.remove('dark-mode');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
      if (toggleBtn) toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }

  // Apply saved preference on load (falls back to light mode)
  const saved = localStorage.getItem(STORAGE_KEY) || 'light';
  applyTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const isDark = root.classList.contains('dark-mode');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // ---------- Scroll-reveal page animations ----------
  const revealEls = document.querySelectorAll('.reveal, .stat-item, .course-card');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      // Fallback: no IntersectionObserver support, just show everything
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }
})();
