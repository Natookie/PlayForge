import { loadState, onRender, resetDemo, setCurrentUser, startPolling } from './state.js';
import { render } from './router.js';
import { setupSearch } from './ui/search.js';
import { showToast } from './ui/toast.js';

onRender((opts) => render(opts));
window.addEventListener('hashchange', () => render());

window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  setCurrentUser(params.get('me'));

  await loadState();
  setupSearch();
  render({ scroll: true });

  startPolling(() => {
    render({ scroll: false });
    showToast('Updated from another device');
  });

  const resetBtn = document.getElementById('reset-demo');
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      await resetDemo();
      render({ scroll: true });
      showToast('Demo data reset.');
    });
  }
});