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
  const mode = (document.querySelector('input[name="game-mode"]:checked') || {}).value || 'new';
  const dlTitle = document.getElementById('c-title').value.trim();
  const desc = document.getElementById('c-desc').value.trim();
  const request = document.getElementById('c-request').checked;
  const videoUrlRaw = (document.getElementById('c-video') || {}).value || '';
  const videoUrl = videoUrlRaw.trim();

  let ok = true;
  if (mode === 'new') {
    const gameTitle = document.getElementById('c-game').value.trim();
    if (!gameTitle) { showFieldError('c-game-error', true); markInvalid('c-game', true); ok = false; }
    else { showFieldError('c-game-error', false); markInvalid('c-game', false); }
  }
  if (!dlTitle) { showFieldError('c-title-error', true); markInvalid('c-title', true); ok = false; }
  else { showFieldError('c-title-error', false); markInvalid('c-title', false); }
  if (!desc) { showFieldError('c-desc-error', true); markInvalid('c-desc', true); ok = false; }
  else { showFieldError('c-desc-error', false); markInvalid('c-desc', false); }
  if (!ok) { showToast('Please fill the highlighted fields.'); return; }

  btn.disabled = true;
  btn.textContent = 'Publishing…';

  setTimeout(() => {
    const now = Date.now();
    const me = getCurrentUser();

    let game;
    if (mode === 'existing') {
      const gameId = document.getElementById('c-existing-game').value;
      game = getGame(gameId);
      if (!game) {
        showToast('Selected game not found.');
        btn.disabled = false;
        btn.textContent = 'Publish Devlog';
        return;
      }
      const cat = document.getElementById('c-existing-fbcat').value;
      if (request) {
        game.needsFeedback = true;
        game.feedbackCategory = cat;
      }
    } else {
      const gameTitle = document.getElementById('c-game').value.trim();
      const genre = document.getElementById('c-genre').value;
      const engine = document.getElementById('c-engine').value;
      const stage = document.getElementById('c-stage').value;
      const fbCat = document.getElementById('c-fbcat').value;

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

    saveState();
    showToast('Devlog published.');
    window.location.hash = '#/devlog/' + newDevlogId;
  }, 300);
}