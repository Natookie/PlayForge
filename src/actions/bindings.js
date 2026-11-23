import { STATE, saveState, requestRender } from '../state.js';
import { bindFeedbackForm, bindFeedbackItemActions } from './feedback.js';
import { publishDevlog } from './create.js';
import { bindProfileEdit } from './profile.js';
import { showToast } from '../ui/toast.js';
import { isWelcomeExpanded, setWelcomeExpanded } from '../components/welcomeStrip.js';
import { sfx } from '../audio/sfx.js';
import { pulseNavIndicator } from '../ui/navIndicator.js';

export function bindPageEvents(route) {
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
    sfx('release');
    requestRender({ scroll: false });
  });

  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-tab');
      if (next === STATE.discoverTab) return;
      STATE.discoverTab = next;
      sfx('select');
      requestRender({ scroll: true });
    });
  });

  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', () => {
      requestAnimationFrame(() => pulseNavIndicator());
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
      sfx(idx >= 0 ? 'toggle-off' : 'toggle-on');
      saveState();
      requestRender({ scroll: false });
    });
  });

  if (route.name === 'devlog') {
    bindFeedbackForm(route.id);
    bindFeedbackItemActions();
  }

  if (route.name === 'game') {
    bindSponsorPanel();
  }

  if (route.name === 'create') {
    const file = document.getElementById('c-file');
    if (file) file.addEventListener('click', () => {
      showToast('Placeholder only — no real upload in this MVP.');
    });

    const goToStep = (n) => {
      STATE._createStep = n;
      const step1 = document.querySelector('.create-step[data-step="1"]');
      const step2 = document.querySelector('.create-step[data-step="2"]');
      const dot1 = document.querySelector('[data-step-dot="1"]');
      const dot2 = document.querySelector('[data-step-dot="2"]');
      if (step1) step1.classList.toggle('hidden', n !== 1);
      if (step2) step2.classList.toggle('hidden', n !== 2);
      if (dot1) dot1.classList.toggle('active', n === 1);
      if (dot2) dot2.classList.toggle('active', n === 2);
      window.scrollTo(0, 0);
    };

    const nextBtn = document.getElementById('c-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const modeChecked = document.querySelector('input[name="game-mode"]:checked');
        const isNew = modeChecked && modeChecked.value === 'new';

        const gameTitleEl = document.getElementById('c-game');
        const dlTitleEl = document.getElementById('c-title');
        const descEl = document.getElementById('c-desc');

        let ok = true;

        if (isNew && gameTitleEl && !gameTitleEl.value.trim()) {
          gameTitleEl.classList.add('invalid');
          const err = document.getElementById('c-game-error');
          if (err) err.classList.remove('hidden');
          ok = false;
        } else if (gameTitleEl) {
          gameTitleEl.classList.remove('invalid');
          const err = document.getElementById('c-game-error');
          if (err) err.classList.add('hidden');
        }

        if (dlTitleEl && !dlTitleEl.value.trim()) {
          dlTitleEl.classList.add('invalid');
          const err = document.getElementById('c-title-error');
          if (err) err.classList.remove('hidden');
          ok = false;
        } else if (dlTitleEl) {
          dlTitleEl.classList.remove('invalid');
          const err = document.getElementById('c-title-error');
          if (err) err.classList.add('hidden');
        }

        if (descEl && !descEl.value.trim()) {
          descEl.classList.add('invalid');
          const err = document.getElementById('c-desc-error');
          if (err) err.classList.remove('hidden');
          ok = false;
        } else if (descEl) {
          descEl.classList.remove('invalid');
          const err = document.getElementById('c-desc-error');
          if (err) err.classList.add('hidden');
        }

        if (!ok) {
          sfx('error');
          return;
        }

        goToStep(2);
      });
    }

    const backBtn = document.getElementById('c-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        goToStep(1);
      });
    }

    document.querySelectorAll('[data-step-dot]').forEach((dot) => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-step-dot'), 10);
        if (target === 2) {
          const next = document.getElementById('c-next');
          if (next) next.click();
        } else {
          goToStep(1);
        }
      });
    });

    document.querySelectorAll('input[name="game-mode"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        const checked = document.querySelector('input[name="game-mode"]:checked');
        if (!checked) return;
        STATE._createMode = checked.value;
        STATE._createStep = 1;
        requestRender({ scroll: false });
      });
    });

    const requestEl = document.getElementById('c-request');
    const fbCatRow = document.getElementById('feedback-cat-row');
    if (requestEl && fbCatRow) {
      const updateFbCatVisibility = () => {
        fbCatRow.style.display = requestEl.checked ? '' : 'none';
      };
      requestEl.addEventListener('change', updateFbCatVisibility);
      updateFbCatVisibility();
    }

    const threadCoverRow = document.getElementById('thread-cover-row');
    const modeRadios = document.querySelectorAll('input[name="game-mode"]');
    if (threadCoverRow && modeRadios.length) {
      const updateThreadCoverVisibility = () => {
        const checked = document.querySelector('input[name="game-mode"]:checked');
        threadCoverRow.style.display = checked && checked.value === 'new' ? '' : 'none';
      };
      modeRadios.forEach((r) => r.addEventListener('change', updateThreadCoverVisibility));
      updateThreadCoverVisibility();
    }

    const pub = document.getElementById('c-publish');
    if (pub) {
      pub.disabled = false;
      pub.textContent = 'Publish Devlog';
      pub.addEventListener('click', () => publishDevlog(pub));
    }
  }

  if (route.name === 'profile' || route.name === 'my-games') {
    bindProfileEdit();
  }

  if (route.name === 'portfolio') {
    const copyBtn = document.getElementById('copy-portfolio');
    const source = document.getElementById('portfolio-markdown');
    if (copyBtn && source) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(source.value);
          copyBtn.textContent = 'Copied ✓';
          copyBtn.classList.add('is-copied');
          sfx('success');
          setTimeout(() => {
            copyBtn.textContent = 'Copy as Markdown';
            copyBtn.classList.remove('is-copied');
          }, 1500);
        } catch (e) {
          source.style.display = 'block';
          source.select();
          showToast('Copy failed — text is selected, press Ctrl+C.');
        }
      });
    }

    import('../ui/countUp.js').then(({ animateCountUps }) => {
      animateCountUps(document);
    });
  }

  if (STATE._lastSubmittedFeedbackId) {
    requestAnimationFrame(() => {
      STATE._lastSubmittedFeedbackId = null;
    });
  }
}

function bindSponsorPanel() {
  const continueBtn = document.getElementById('sponsor-continue');
  const overlay = document.getElementById('sponsor-modal-overlay');
  const closeBtn = document.getElementById('sponsor-modal-close');
  const okBtn = document.getElementById('sponsor-modal-ok');
  const tiers = document.querySelectorAll('.sponsor-tier');

  if (!continueBtn || !overlay) return;

  tiers.forEach((t) => {
    t.addEventListener('click', () => {
      tiers.forEach((x) => x.classList.remove('selected'));
      t.classList.add('selected');
      continueBtn.disabled = false;
      sfx('select');
    });
  });

  const onKey = (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeModal();
    }
  };

  const openModal = () => {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    sfx('expand');
  };
  const closeModal = () => {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    sfx('collapse');
  };

  continueBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}