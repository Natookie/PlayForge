import { STATE, saveState } from '../state.js';
import { getCurrentUser, getGame } from '../selectors.js';
import { showToast } from '../ui/toast.js';

function showFieldError(id, show) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden', !show);
}
function markInvalid(id, invalid) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('invalid', invalid);
}

export function publishDevlog(btn) {
  const modeEl = document.querySelector('input[name="game-mode"]:checked');
  const mode = modeEl ? modeEl.value : 'new';

  const dlTitleEl = document.getElementById('c-title');
  const descEl = document.getElementById('c-desc');
  const requestEl = document.getElementById('c-request');
  const videoEl = document.getElementById('c-video');
  const fbCatEl = document.getElementById('c-fbcat');

  const dlTitle = dlTitleEl ? dlTitleEl.value.trim() : '';
  const desc = descEl ? descEl.value.trim() : '';
  const request = requestEl ? requestEl.checked : false;
  const videoUrl = videoEl ? videoEl.value.trim() : '';
  const fbCat = fbCatEl ? fbCatEl.value : 'Mechanics';

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

  if (mode === 'new' && !gameTitle) {
    showFieldError('c-game-error', true);
    markInvalid('c-game', true);
    ok = false;
  } else {
    showFieldError('c-game-error', false);
    markInvalid('c-game', false);
  }

  if (!dlTitle) {
    showFieldError('c-title-error', true);
    markInvalid('c-title', true);
    ok = false;
  } else {
    showFieldError('c-title-error', false);
    markInvalid('c-title', false);
  }

  if (!desc) {
    showFieldError('c-desc-error', true);
    markInvalid('c-desc', true);
    ok = false;
  } else {
    showFieldError('c-desc-error', false);
    markInvalid('c-desc', false);
  }

  if (!ok) {
    showToast('Please fill the highlighted fields.');
    return;
  }

  if (videoUrl && !/^https?:\/\/.+/i.test(videoUrl)) {
    if (videoEl) videoEl.classList.add('invalid');
    showToast('Video URL should start with http:// or https://');
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Publishing…';

  setTimeout(() => {
    const now = Date.now();
    const me = getCurrentUser();

    let game;

    if (mode === 'existing') {
      game = getGame(existingGameId);
      if (!game) {
        showToast('Selected game not found.');
        btn.disabled = false;
        btn.textContent = 'Publish Devlog';
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
      videoUrl: videoUrl || undefined,
    });

    STATE._createMode = null;

    saveState();
    showToast('Devlog published.');

    window.location.hash = '#/devlog/' + newDevlogId;
  }, 150);
}