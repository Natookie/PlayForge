import { loadState, onRender, resetDemo, setCurrentUser, startPolling, STATE } from './state.js';
import { render } from './router.js';
import { setupSearch } from './ui/search.js';
import { showToast } from './ui/toast.js';
import { initTheme, toggleTheme } from './ui/theme.js';
import { initBanner } from './ui/banner.js';
import { clearWelcomeExpanded } from './components/welcomeStrip.js';
import { setupScrollReveal } from './ui/scrollReveal.js';
import { initNavIndicator } from './ui/navIndicator.js';
import { initSFX, isSFXEnabled, setSFXEnabled } from './audio/sfx.js';
import { initAutoSfx } from './audio/autoSfx.js';
import { escapeHtml } from './utils.js';

function renderWithReveal(opts) {
  render(opts);
  setupScrollReveal();
}

onRender((opts) => renderWithReveal(opts));
window.addEventListener('hashchange', () => renderWithReveal());

window.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initNavIndicator();

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  // Sound toggle
  const sfxBtn = document.getElementById('sfx-toggle');
  if (sfxBtn) {
    const paint = () => {
      const on = isSFXEnabled();
      sfxBtn.textContent = on ? '🔊' : '🔇';
      sfxBtn.setAttribute('aria-pressed', String(on));
    };
    paint();
    sfxBtn.addEventListener('click', () => {
      setSFXEnabled(!isSFXEnabled());
      paint();
    });
  }

  // Identity selector
  const params = new URLSearchParams(window.location.search);
  setCurrentUser(params.get('me'));

  // Load state
  await loadState();

  await loadState();

  // Populate the demo
  const devSelect = document.getElementById('dev-switch-select');
  if (devSelect) {
    devSelect.innerHTML = STATE.developers
      .map((d) =>
        '<option value="' + d.id + '"' +
          (d.id === STATE.currentUserId ? ' selected' : '') +
        '>' + escapeHtml(d.name) + '</option>'
      )
      .join('');

    devSelect.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('me', devSelect.value);
      window.location.href = url.toString();
    });
  }

  initBanner();
  initSFX();
  initAutoSfx();

  initBanner();
  initSFX();
  initAutoSfx();

  setupSearch();
  renderWithReveal({ scroll: true });

  // Poll for other-device updates
  startPolling(() => {
    renderWithReveal({ scroll: false });
    showToast('Updated from another device');
  });

  // Reset demo data
  const resetBtn = document.getElementById('reset-demo');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      resetBtn.disabled = true;
      const result = await resetDemo();
      resetBtn.disabled = false;
      clearWelcomeExpanded();
      renderWithReveal({ scroll: true });
      if (result && result.ok) {
        showToast('Demo data reset.');
      } else {
        showToast('Demo data reset locally — will sync when the server is back.');
      }
    });
  }
});