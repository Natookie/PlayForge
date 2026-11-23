export function animateCountUps(rootEl) {
  if (!rootEl) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  rootEl.querySelectorAll('.ps-num[data-final]').forEach((el) => {
    const final = el.getAttribute('data-final');
    const isPercent = final.endsWith('%');
    const target = parseFloat(final.replace('%', ''));
    if (isNaN(target) || target === 0) return;

    el.setAttribute('data-counting', '1');
    const duration = 600;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = isPercent ? value + '%' : String(value);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = final;
        el.removeAttribute('data-counting');
        el.classList.add('counted');
      }
    }

    requestAnimationFrame(tick);
  });
}