let initialized = false;

export function initNavIndicator() {
  if (initialized) return;

  const navs = document.querySelectorAll('.nav-links:not(.mobile)');
  navs.forEach((nav) => {
    if (nav.querySelector('.nav-indicator')) return;
    const indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    nav.appendChild(indicator);
  });

  window.addEventListener('resize', () => updateNavIndicator());

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => updateNavIndicator());
  }

  initialized = true;
}

export function updateNavIndicator() {
  const nav = document.querySelector('.nav-links:not(.mobile)');
  if (!nav) return;

  const indicator = nav.querySelector('.nav-indicator');
  if (!indicator) return;

  const active = nav.querySelector('a.active');
  if (!active) {
    indicator.style.opacity = '0';
    return;
  }

  const navRect = nav.getBoundingClientRect();
  const linkRect = active.getBoundingClientRect();

  indicator.style.opacity = '1';
  indicator.style.left = (linkRect.left - navRect.left - 4) + 'px';
  indicator.style.width = (linkRect.width + 8) + 'px';
}

export function pulseNavIndicator() {
  const nav = document.querySelector('.nav-links:not(.mobile)');
  if (!nav) return;
  const indicator = nav.querySelector('.nav-indicator');
  if (!indicator) return;
  indicator.classList.remove('is-clicked');
  void indicator.offsetWidth;
  indicator.classList.add('is-clicked');
  setTimeout(() => indicator.classList.remove('is-clicked'), 300);
}