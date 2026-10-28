/* ============================================================
   Scroll reveal
   Fades and lifts cards into view whenever they enter the
   viewport, in either scroll direction.

   Cards lose their visible state when they leave the viewport,
   so they re-animate the next time they come back in — whether
   that's from below (scrolling down) or from above (scrolling up).
   ============================================================ */

let observer = null;

function prefersReducedMotion() {
  return window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
      } else {
        el.classList.remove('is-visible');
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.01,
  });

  return observer;
}

export function setupScrollReveal() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const obs = getObserver();

  document.querySelectorAll('.reveal').forEach((el) => {
    if (!el.dataset.revealObserved) {
      obs.observe(el);
      el.dataset.revealObserved = '1';
    }
  });
}