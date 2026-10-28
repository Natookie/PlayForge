import { STATE } from '../state.js';
import { getPosts, getQueuePosts, isSaved } from '../selectors.js';
import { postCard } from '../components/postCard.js';
import { STAGES, FEEDBACK_CATS } from '../data/constants.js';
import { welcomeStrip } from '../components/welcomeStrip.js';

export function renderDiscover() {
  const tab = STATE.discoverTab;
  let base;
  if (tab === 'saved') {
    base = getPosts().filter((p) => isSaved(p.devlog.id));
  } else if (tab === 'feedback') {
    base = getQueuePosts();
  } else {
    base = getPosts();
  }

  const usedGenres = Array.from(
    new Set(STATE.games.map((g) => g.genre).filter(Boolean))
  ).sort();

  const usedEngines = Array.from(
    new Set(STATE.games.map((g) => g.engine).filter(Boolean))
  ).sort();

  const genreOptions = ['All', ...usedGenres];
  const engineOptions = ['All', ...usedEngines];
  const stageOptions = ['All', ...STAGES];
  const feedbackOptions = ['All', ...FEEDBACK_CATS];

  const filtered = base.filter((p) => {
    const f = STATE.filters;
    if (f.genre !== 'All' && p.game.genre !== f.genre) return false;
    if (f.engine !== 'All' && p.game.engine !== f.engine) return false;
    if (f.stage !== 'All' && p.game.stage !== f.stage) return false;
    if (f.feedback !== 'All') {
      if (!p.game.needsFeedback) return false;
      if (p.game.feedbackCategory !== f.feedback) return false;
    }
    return true;
  });

  const opts = (arr, current) =>
    arr.map((v) => '<option value="' + v + '"' + (v === current ? ' selected' : '') + '>' + v + '</option>').join('');

  const openRequests = getPosts().filter((p) => p.game.needsFeedback).length;
  const savedCount = STATE.saved.length;

  const tabHtml =
    '<div class="tabs">' +
      '<button data-tab="recent" class="' + (tab === 'recent' ? 'active' : '') + '">Recent activity</button>' +
      '<button data-tab="feedback" class="' + (tab === 'feedback' ? 'active' : '') + '">Needs feedback<span class="tab-count">' + openRequests + '</span></button>' +
      '<button data-tab="saved" class="' + (tab === 'saved' ? 'active' : '') + '">Saved<span class="tab-count">' + savedCount + '</span></button>' +
    '</div>';

  const filterBar =
    '<div class="filter-bar">' +
      '<div class="filter-group"><label>Genre</label><select id="f-genre">' + opts(genreOptions, STATE.filters.genre) + '</select></div>' +
      '<div class="filter-group"><label>Engine</label><select id="f-engine">' + opts(engineOptions, STATE.filters.engine) + '</select></div>' +
      '<div class="filter-group"><label>Stage</label><select id="f-stage">' + opts(stageOptions, STATE.filters.stage) + '</select></div>' +
      '<div class="filter-group"><label>Feedback needed</label><select id="f-feedback">' + opts(feedbackOptions, STATE.filters.feedback) + '</select></div>' +
      '<button class="filter-reset" id="f-reset">Reset</button>' +
    '</div>';

  let emptyMsg = 'No devlogs match these filters.';
  if (tab === 'saved') emptyMsg = 'You have not saved anything yet. Tap "Save" on a devlog to bookmark it.';
  if (tab === 'feedback') emptyMsg = 'Nothing needs feedback right now.';

  const cards = filtered.length
    ? filtered.map((p) => postCard(p, { queue: tab === 'feedback' })).join('')
    : '<div class="empty" style="grid-column:1/-1;">' +
        '<span class="empty-mark">' +
          '<svg viewBox="0 0 32 32" width="20" height="20" focusable="false" aria-hidden="true">' +
            '<path d="M16 4 L20 14 L27 16 L20 19 L16 28 L13 19 L5 16 L13 14 Z" fill="currentColor" opacity="0.8"/>' +
          '</svg>' +
        '</span>' +
        '<div class="empty-msg">' + emptyMsg + '</div>' +
      '</div>'

  const subText = {
    recent: 'Recent development activity from indie devs. Sorted by recency, not popularity.',
    feedback: 'Devlogs asking for feedback, ordered by need — fewest responses and oldest first.',
    saved: 'Devlogs you saved for later. Private to you.'
  }[tab];

  const strip = welcomeStrip();
  return (
    '<div class="container">' +
      '<h1 class="page-title">Discover</h1>' +
      (strip ? strip : '<p class="page-sub">' + subText + '</p>') +
      tabHtml +
      filterBar +
      '<div class="feed-meta"><span>' + filtered.length + ' devlog' + (filtered.length === 1 ? '' : 's') + '</span>' +
      '<span>' + (tab === 'feedback' ? 'Sorted by: need' : 'Sorted by: recent activity') + '</span></div>' +
      '<div class="feed">' + cards + '</div>' +
    '</div>'
  );
}