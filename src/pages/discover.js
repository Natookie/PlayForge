import { STATE } from '../state.js';
import { getPosts, getQueuePosts, isSaved } from '../selectors.js';
import { postCard } from '../components/postCard.js';

const GENRES = ['All', 'Action', 'Horror', 'Simulation', 'RPG', 'Strategy', 'Arcade', 'Narrative'];
const ENGINES = ['All', 'Unity', 'Unreal', 'Godot', 'Other'];
const STAGES = ['All', 'Concept', 'Prototype', 'Development', 'Beta', 'Released'];
const FEEDBACK_CATS = ['All', 'Art', 'Mechanics', 'Audio', 'UX', 'Business'];

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
      '<div class="filter-group"><label>Genre</label><select id="f-genre">' + opts(GENRES, STATE.filters.genre) + '</select></div>' +
      '<div class="filter-group"><label>Engine</label><select id="f-engine">' + opts(ENGINES, STATE.filters.engine) + '</select></div>' +
      '<div class="filter-group"><label>Stage</label><select id="f-stage">' + opts(STAGES, STATE.filters.stage) + '</select></div>' +
      '<div class="filter-group"><label>Feedback needed</label><select id="f-feedback">' + opts(FEEDBACK_CATS, STATE.filters.feedback) + '</select></div>' +
      '<button class="filter-reset" id="f-reset">Reset</button>' +
    '</div>';

  let emptyMsg = 'No devlogs match these filters.';
  if (tab === 'saved') emptyMsg = 'You have not saved anything yet. Tap "Save" on a devlog to bookmark it.';
  if (tab === 'feedback') emptyMsg = 'Nothing needs feedback right now.';

  const cards = filtered.length
    ? filtered.map((p) => postCard(p, { queue: tab === 'feedback' })).join('')
    : '<div class="empty" style="grid-column:1/-1;">' + emptyMsg + '</div>';

  const subText = {
    recent: 'Recent development activity from indie devs. Sorted by recency, not popularity.',
    feedback: 'Devlogs asking for feedback, ordered by need — fewest responses and oldest first.',
    saved: 'Devlogs you saved for later. Private to you.'
  }[tab];

  return (
    '<div class="container">' +
      '<h1 class="page-title">Discover</h1>' +
      '<p class="page-sub">' + subText + '</p>' +
      tabHtml +
      filterBar +
      '<div class="feed-meta"><span>' + filtered.length + ' devlog' + (filtered.length === 1 ? '' : 's') + '</span>' +
      '<span>' + (tab === 'feedback' ? 'Sorted by: need' : 'Sorted by: recent activity') + '</span></div>' +
      '<div class="feed">' + cards + '</div>' +
    '</div>'
  );
}