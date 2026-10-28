import { getCurrentUser, getGame } from '../selectors.js';
import { STATE } from '../state.js';
import { escapeHtml } from '../utils.js';
import { GENRE_SUGGESTIONS, ENGINE_SUGGESTIONS, STAGES, FEEDBACK_CATS } from '../data/constants.js';

export function renderCreate(query = {}) {
  const sel = (arr, current) =>
    arr.map((v) => '<option value="' + v + '"' + (v === current ? ' selected' : '') + '>' + v + '</option>').join('');

  const me = getCurrentUser();
  const myGames = STATE.games.filter((g) => g.developerId === me.id);

  const presetGameId = query.game && myGames.some((g) => g.id === query.game) ? query.game : null;

  const stateMode = STATE._createMode;
  const mode = stateMode === 'existing' && myGames.length > 0
    ? 'existing'
    : stateMode === 'new'
      ? 'new'
      : presetGameId
        ? 'existing'
        : 'new';

  const modeToggle =
    '<div class="mode-toggle" role="radiogroup" aria-label="Create mode">' +
      '<label class="mode-option' + (mode === 'new' ? ' selected' : '') + '">' +
        '<input type="radio" name="game-mode" value="new"' + (mode === 'new' ? ' checked' : '') + ' />' +
        '<span>New game</span>' +
      '</label>' +
      '<label class="mode-option' + (mode === 'existing' ? ' selected' : '') + (myGames.length === 0 ? ' disabled' : '') + '">' +
        '<input type="radio" name="game-mode" value="existing"' +
          (mode === 'existing' ? ' checked' : '') +
          (myGames.length === 0 ? ' disabled' : '') +
        ' />' +
        '<span>Update an existing game</span>' +
      '</label>' +
    '</div>';

  const gamePicker =
    '<div class="form-row" id="existing-game-picker"' + (mode === 'existing' ? '' : ' style="display:none;"') + '>' +
      '<label for="c-existing-game">Game</label>' +
      '<select id="c-existing-game">' +
        myGames.map((g) =>
          '<option value="' + g.id + '"' + (g.id === presetGameId ? ' selected' : '') + '>' + escapeHtml(g.title) + '</option>'
        ).join('') +
      '</select>' +
    '</div>';

  const titleLabel = mode === 'new' ? 'First devlog title' : 'Devlog title';
  const titlePlaceholder = mode === 'new'
    ? 'e.g. First look at the intersection prototype'
    : 'e.g. Rebuilt the intersection solver';
  const descLabel = mode === 'new' ? 'Describe your game' : 'What changed this week';
  const descPlaceholder = mode === 'new'
    ? 'What are you building? What stage is it at? What feedback are you looking for?'
    : 'What changed? What did you learn? What is still uncertain?';

  return (
    '<div class="container">' +
      '<h1 class="page-title">Create Devlog</h1>' +
      '<p class="page-sub">Share what you built this week. Ask for the feedback you actually need.</p>' +
      '<div class="form-panel">' +

        modeToggle +
        gamePicker +

        '<div class="form-row" id="game-title-row"' + (mode === 'new' ? '' : ' style="display:none;"') + '>' +
          '<label for="c-game">Game title</label>' +
          '<input type="text" id="c-game" placeholder="e.g. Carccident" />' +
          '<div class="field-error hidden" id="c-game-error">Please enter a game title.</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<label for="c-title">' + titleLabel + '</label>' +
          '<input type="text" id="c-title" placeholder="' + escapeHtml(titlePlaceholder) + '" />' +
          '<div class="field-error hidden" id="c-title-error">Please enter a devlog title.</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<label for="c-desc">' + descLabel + '</label>' +
          '<textarea id="c-desc" placeholder="' + escapeHtml(descPlaceholder) + '"></textarea>' +
          '<div class="field-error hidden" id="c-desc-error">Please describe what you worked on.</div>' +
        '</div>' +

        '<div class="form-row">' +
          '<label for="c-video">Video URL <span style="text-transform:none;font-weight:400;color:var(--muted);">(optional)</span></label>' +
          '<input type="text" id="c-video" placeholder="https://example.com/clip.mp4" />' +
          '<div class="hint">Paste a link to an MP4, WebM, or other browser-playable video. Direct links only — not YouTube or Vimeo pages.</div>' +
        '</div>' +

        '<div id="new-game-fields"' + (mode === 'new' ? '' : ' style="display:none;"') + '>' +
          '<div class="form-row two">' +
            '<div>' +
              '<label for="c-genre">Genre</label>' +
              '<input type="text" id="c-genre" list="genre-suggestions" value="Simulation" autocomplete="off" />' +
            '</div>' +
            '<div>' +
              '<label for="c-engine">Engine</label>' +
              '<input type="text" id="c-engine" list="engine-suggestions" value="Unity" autocomplete="off" />' +
            '</div>' +
          '</div>' +
          '<div class="form-row">' +
            '<label for="c-stage">Development stage</label>' +
            '<select id="c-stage">' + sel(STAGES, 'Prototype') + '</select>' +
          '</div>' +
        '</div>' +

        '<datalist id="genre-suggestions">' +
          GENRE_SUGGESTIONS.map((g) => '<option value="' + escapeHtml(g) + '"></option>').join('') +
        '</datalist>' +
        '<datalist id="engine-suggestions">' +
          ENGINE_SUGGESTIONS.map((e) => '<option value="' + escapeHtml(e) + '"></option>').join('') +
        '</datalist>' +

        '<div class="form-row">' +
          '<label>Image / GIF</label>' +
          '<div class="file-ph" id="c-file"><div class="fp-icon">&#128247;</div><div>Click to attach a capture (placeholder only)</div></div>' +
        '</div>' +

        '<div class="form-row">' +
          '<label class="check-row"><input type="checkbox" id="c-request" checked /> Request feedback</label>' +
          '<div id="feedback-cat-row" style="margin-top: 12px;">' +
            '<label for="c-fbcat">What kind of feedback?</label>' +
            '<select id="c-fbcat">' + sel(FEEDBACK_CATS, 'Mechanics') + '</select>' +
          '</div>' +
        '</div>' +

        '<div class="form-actions">' +
          '<button class="btn btn-primary" id="c-publish">Publish Devlog</button>' +
          '<a class="btn btn-secondary" href="#/">Cancel</a>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}