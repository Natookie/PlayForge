import { loadState, onRender, resetDemo, setCurrentUser, startPolling } from './state.js';
import { render } from './router.js';
import { setupSearch } from './ui/search.js';
import { showToast } from './ui/toast.js';
import { initTheme, toggleTheme } from './ui/theme.js';
import { clearWelcomeExpanded } from './components/welcomeStrip.js';
import { setupScrollReveal } from './ui/scrollReveal.js';
import { initNavIndicator } from './ui/navIndicator.js';

function renderWithReveal(opts) {
  render(opts);
  setupScrollReveal();
}

onRender((opts) => renderWithReveal(opts));
window.addEventListener('hashchange', () => renderWithReveal());

window.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initNavIndicator();

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      toggleTheme();
    });
  }

  const params = new URLSearchParams(window.location.search);
  setCurrentUser(params.get('me'));

  await loadState();
  setupSearch();
  renderWithReveal({ scroll: true });

  startPolling(() => {
    renderWithReveal({ scroll: false });
    showToast('Updated from another device');
  });

  const resetBtn = document.getElementById('reset-demo');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      await resetDemo();
      clearWelcomeExpanded();
      renderWithReveal({ scroll: true });
      showToast('Demo data reset.');
    });
  }
});