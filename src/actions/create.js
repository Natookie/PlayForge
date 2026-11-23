import { STATE, saveState } from '../state.js';
import { getCurrentUser, getGame } from '../selectors.js';
import { showToast } from '../ui/toast.js';
import { sfx } from '../audio/sfx.js';

function showFieldError(id, show) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden', !show);
}
function markInvalid(id, invalid) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('invalid', invalid);
}

function isValidUrl(v) {
  return /^https?:\/\/.+/i.test(v);
}

function jumpToStep(n) {
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
}

export async function publishDevlog(btn) {
  console.log('publishDevlog called', { btn, mode: document.querySelector('input[name="game-mode"]:checked')?.value });
  const modeEl = document.querySelector('input[name="game-mode"]:checked');
  const mode = modeEl ? modeEl.value : 'new';

  const dlTitleEl = document.getElementById('c-title');
  const descEl = document.getElementById('c-desc');
  const requestEl = document.getElementById('c-request');
  const videoEl = document.getElementById('c-video');
  const fbCatEl = document.getElementById('c-fbcat');
  const threadCoverEl = document.getElementById('c-thread-cover');
  const devlogCoverEl = document.getElementById('c-devlog-cover');

  const dlTitle = dlTitleEl ? dlTitleEl.value.trim() : '';
  const desc = descEl ? descEl.value.trim() : '';
  const request = requestEl ? requestEl.checked : false;
  const videoUrl = videoEl ? videoEl.value.trim() : '';
  const fbCat = fbCatEl ? fbCatEl.value : 'Mechanics';
  const threadCoverUrl = threadCoverEl ? threadCoverEl.value.trim() : '';
  const devlogCoverUrl = devlogCoverEl ? devlogCoverEl.value.trim() : '';

  let gameTitle = '';
  let genre = '';
  let engine = '';
  let stage = '';
  let existingGameId = '';

  if (mode === 'new') {
    const gameTitleEl = document.getElementById('c-game');
    const genreEl = document.getElementById('c-genre');
    const engineEl = document.getElementById('c-engine');
    const stageEl = document.getElementById('c-stage');

    gameTitle = gameTitleEl ? gameTitleEl.value.trim() : '';
    genre = genreEl ? genreEl.value.trim() : '';
    engine = engineEl ? engineEl.value.trim() : '';
    stage = stageEl ? stageEl.value : 'Prototype';
  } else {
    const existingGameEl = document.getElementById('c-existing-game');
    existingGameId = existingGameEl ? existingGameEl.value : '';
  }

  let ok = true;
  let step1Failed = false;

  if (mode === 'new' && !gameTitle) {
    showFieldError('c-game-error', true);
    markInvalid('c-game', true);
    ok = false;
    step1Failed = true;
  } else {
    showFieldError('c-game-error', false);
    markInvalid('c-game', false);
  }

  if (!dlTitle) {
    showFieldError('c-title-error', true);
    markInvalid('c-title', true);
    ok = false;
    step1Failed = true;
  } else {
    showFieldError('c-title-error', false);
    markInvalid('c-title', false);
  }

  if (!desc) {
    showFieldError('c-desc-error', true);
    markInvalid('c-desc', true);
    ok = false;
    step1Failed = true;
  } else {
    showFieldError('c-desc-error', false);
    markInvalid('c-desc', false);
  }

  if (!ok) {
    if (step1Failed) jumpToStep(1);
    showToast('Please fill the highlighted fields.');
    sfx('error');
    return;
  }

  if (videoUrl && !isValidUrl(videoUrl)) {
    if (videoEl) videoEl.classList.add('invalid');
    showToast('Video URL should start with http:// or https://');
    sfx('error');
    return;
  }

  if (threadCoverUrl && !isValidUrl(threadCoverUrl)) {
    showFieldError('c-thread-cover-error', true);
    markInvalid('c-thread-cover', true);
    sfx('error');
    return;
  } else {
    showFieldError('c-thread-cover-error', false);
    markInvalid('c-thread-cover', false);
  }

  if (devlogCoverUrl && !isValidUrl(devlogCoverUrl)) {
    showFieldError('c-devlog-cover-error', true);
    markInvalid('c-devlog-cover', true);
    sfx('error');
    return;
  } else {
    showFieldError('c-devlog-cover-error', false);
    markInvalid('c-devlog-cover', false);
  }

  btn.disabled = true;
  btn.textContent = 'Publishing…';

  try {
    await new Promise((r) => setTimeout(r, 120));

    const now = Date.now();
    const me = getCurrentUser();

    let game;

    if (mode === 'existing') {
      game = getGame(existingGameId);
      if (!game) {
        showToast('Selected game not found.');
        sfx('error');
        return;
      }
      if (request) {
        game.needsFeedback = true;
        game.feedbackCategory = fbCat;
      }
    } else {
      game = {
        id: 'game-' + now,
        title: gameTitle,
        developerId: me.id,
        genre: genre,
        engine: engine,
        stage: stage,
        shortDescription: desc.slice(0, 140),
        thumbnailSeed: gameTitle.toLowerCase().replace(/\s+/g, ''),
        needsFeedback: request,
        feedbackCategory: request ? fbCat : undefined,
        coverUrl: threadCoverUrl || null,
      };
      STATE.games.push(game);
    }

    const newDevlogId = 'dl-' + now;
    STATE.devlogs.push({
      id: newDevlogId,
      gameId: game.id,
      title: dlTitle,
      content: desc,
      timestamp: new Date().toISOString(),
      imageSeed: game.thumbnailSeed + '-devlog-' + now,
      imageUrl: devlogCoverUrl || null,
      videoUrl: videoUrl || undefined,
    });

    STATE._createMode = null;
    STATE._createStep = 1;

    const result = await saveState();

    if (result.ok) {
      showToast('Devlog published.');
      sfx('success');
    } else {
      showToast('Devlog saved locally — will sync when the server is back.');
      sfx('warning');
    }

    window.location.hash = '#/devlog/' + newDevlogId;
  } finally {
    if (document.body.contains(btn)) {
      btn.disabled = false;
      btn.textContent = 'Publish Devlog';
    }
  }
}