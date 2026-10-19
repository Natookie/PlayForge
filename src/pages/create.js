import { getCurrentUser } from '../selectors.js';
import { STATE } from '../state.js';
import { escapeHtml } from '../utils.js';

const GENRES = ['Action', 'Horror', 'Simulation', 'RPG', 'Strategy', 'Arcade', 'Narrative'];
const ENGINES = ['Unity', 'Unreal', 'Godot', 'Other'];
const STAGES = ['Concept', 'Prototype', 'Development', 'Beta', 'Released'];
const FEEDBACK_CATS = ['Art', 'Mechanics', 'Audio', 'UX', 'Business'];

export function renderCreate() {
  const sel = (arr, current) =>
    arr.map((v) => '<option value="' + v + '"' + (v === current ? ' selected' : '') + '>' + v + '</option>').join('');

  const me = getCurrentUser();
  const myGames = STATE.games.filter((g) => g.developerId === me.id);

  const gamePicker =
    '<div class="game-picker">' +
      '<div class="radio-row">' +
        '<label><input type="radio" name="game-mode" value="new" checked /> New game</label>' +
        '<label><input type="radio" name="game-mode" value="existing" ' + (myGames.length === 0 ? 'disabled' : '') + ' /> Update an existing game</label>' +
      '</div>' +
      '<div id="existing-game-picker" class="hidden">' +
        '<div class="gp-row">' +
          '<label for="c-existing-game" style="flex:0 0 auto;">Game</label>' +
          '<select id="c-existing-game" style="flex:1;">' +
            myGames.map((g) => '<option value="' + g.id + '">' + escapeHtml(g.title) + '</option>').join('') +
          '</select>' +
        '</div>' +
      '</div>' +
    '</div>';

  return (
    '<div class="container">' +
      '<h1 class="page-title">Create Devlog</h1>' +
      '<p class="page-sub">Share what you built this week. Ask for the feedback you actually need.</p>' +
      '<div class="form-panel">' +
        gamePicker +
        '<div class="form-row" id="game-title-row">' +
          '<label for="c-game">Game title</label>' +
          '<input type="text" id="c-game" placeholder="e.g. Carccident" />' +
          '<div class="field-error hidden" id="c-game-error">Please enter a game title.</div>' +
        '</div>' +
        '<div class="form-row">' +
          '<label for="c-title">Devlog title</label>' +
          '<input type="text" id="c-title" placeholder="e.g. Rebuilt the intersection solver" />' +
          '<div class="field-error hidden" id="c-title-error">Please enter a devlog title.</div>' +
        '</div>' +
        '<div class="form-row">' +
          '<label for="c-desc">What changed this week</label>' +
          '<textarea id="c-desc" placeholder="What changed? What did you learn? What is still uncertain?"></textarea>' +
          '<div class="field-error hidden" id="c-desc-error">Please describe what you worked on.</div>' +
        '</div>' +
        '<div class="form-row">' +
          '<label for="c-video">Video URL <span style="text-transform:none;font-weight:400;color:var(--muted);">(optional)</span></label>' +
          '<input type="text" id="c-video" placeholder="https://example.com/clip.mp4" />' +
          '<div class="hint">Paste a link to an MP4, WebM, or other browser-playable video. Direct links only — not YouTube or Vimeo pages.</div>' +
          '<div class="field-error hidden" id="c-video-error">That does not look like a valid URL.</div>' +
        '</div>' +
        '<div class="form-row two" id="new-game-fields">' +
          '<div><label for="c-genre">Genre</label><select id="c-genre">' + sel(GENRES, 'Simulation') + '</select></div>' +
          '<div><label for="c-engine">Engine</label><select id="c-engine">' + sel(ENGINES, 'Unity') + '</select></div>' +
        '</div>' +
        '<div class="form-row two" id="new-game-fields-2">' +
          '<div><label for="c-stage">Development stage</label><select id="c-stage">' + sel(STAGES, 'Prototype') + '</select></div>' +
          '<div><label for="c-fbcat">Feedback category</label><select id="c-fbcat">' + sel(FEEDBACK_CATS, 'Mechanics') + '</select></div>' +
        '</div>' +
        '<div class="form-row" id="existing-game-fb-row" style="display:none;">' +
          '<label for="c-existing-fbcat">Feedback category</label>' +
          '<select id="c-existing-fbcat">' + sel(FEEDBACK_CATS, 'Mechanics') + '</select>' +
        '</div>' +
        '<div class="form-row">' +
          '<label>Image / GIF</label>' +
          '<div class="file-ph" id="c-file"><div class="fp-icon">&#128247;</div><div>Click to attach a capture (placeholder only)</div></div>' +
        '</div>' +
        '<div class="form-row">' +
          '<label class="check-row"><input type="checkbox" id="c-request" checked /> Request feedback</label>' +
        '</div>' +
        '<button class="btn btn-primary" id="c-publish">Publish Devlog</button>' +
      '</div>' +
    '</div>'
  );
}