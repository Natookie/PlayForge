import { STATE, saveState, requestRender } from '../state.js';
import { bindFeedbackForm, bindFeedbackItemActions } from './feedback.js';
import { publishDevlog } from './create.js';
import { bindProfileEdit } from './profile.js';
import { showToast } from '../ui/toast.js';
import { isWelcomeExpanded, setWelcomeExpanded } from '../components/welcomeStrip.js';

export function bindPageEvents(route) {
  //Welcome panel
  const welcomeToggle = document.getElementById('welcome-toggle');
  if (welcomeToggle) {
    welcomeToggle.addEventListener('click', () => {
      const next = !isWelcomeExpanded();
      setWelcomeExpanded(next);
      requestRender({ scroll: false });
    });
  }

  const welcomeCta = document.getElementById('welcome-cta');
  if (welcomeCta) {
    welcomeCta.addEventListener('click', () => {
      STATE.discoverTab = 'feedback';
      requestRender({ scroll: true });
    });
  }

  //Discover filters
  const bind = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      STATE.filters[key] = el.value;
      requestRender({ scroll: false });
    });
  };
  bind('f-genre', 'genre');
  bind('f-engine', 'engine');
  bind('f-stage', 'stage');
  bind('f-feedback', 'feedback');

  const reset = document.getElementById('f-reset');
  if (reset) reset.addEventListener('click', () => {
    STATE.filters = { genre: 'All', engine: 'All', stage: 'All', feedback: 'All' };
    requestRender({ scroll: false });
  });

  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      STATE.discoverTab = btn.getAttribute('data-tab');
      requestRender({ scroll: true });
    });
  });

  document.querySelectorAll('[data-action="toggle-save"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dlId = btn.getAttribute('data-dl');
      const idx = STATE.saved.indexOf(dlId);
      if (idx >= 0) STATE.saved.splice(idx, 1);
      else STATE.saved.push(dlId);
      saveState();
      requestRender({ scroll: false });
    });
  });

  if (route.name === 'devlog') {
    bindFeedbackForm(route.id);
    bindFeedbackItemActions();
  }

  if (route.name === 'create') {
    const file = document.getElementById('c-file');
    if (file) file.addEventListener('click', () => showToast('Placeholder only — no real upload in this MVP.'));

    document.querySelectorAll('input[name="game-mode"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        const isExisting = document.querySelector('input[name="game-mode"]:checked').value === 'existing';
        document.getElementById('game-title-row').style.display = isExisting ? 'none' : '';
        document.getElementById('new-game-fields').style.display = isExisting ? 'none' : '';
        document.getElementById('new-game-fields-2').style.display = isExisting ? 'none' : '';
        document.getElementById('existing-game-picker').classList.toggle('hidden', !isExisting);
        document.getElementById('existing-game-fb-row').style.display = isExisting ? '' : 'none';
      });
    });

    const pub = document.getElementById('c-publish');
    if (pub) pub.addEventListener('click', () => publishDevlog(pub));
  }

  if (route.name === 'profile' || route.name === 'my-games') {
    bindProfileEdit();
  }
}