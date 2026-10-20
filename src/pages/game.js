import { STATE } from '../state.js';
import { escapeHtml, timeAgo } from '../utils.js';
import { getGame, getDeveloper, getFeedbackFor, devName } from '../selectors.js';
import { coverArt } from '../components/coverArt.js';
import { feedbackBadge, saveButton } from '../components/badges.js';
import { isCurrentUserOwnerOfGame } from '../selectors.js';
import { sponsorPanel } from '../components/sponsorPanel.js';

export function renderGamePage(gameId) {
  const g = getGame(gameId);
  if (!g) return '<div class="container"><div class="empty">Game not found. <a href="#/" style="color:var(--accent);">Back to Discover</a></div></div>';

  const dev = getDeveloper(g.developerId);
  const devlogs = STATE.devlogs
    .filter((d) => d.gameId === g.id)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const totalFeedback = devlogs.reduce((sum, dl) => sum + getFeedbackFor(dl.id).length, 0);

  const hero =
    '<div class="game-hero">' +
      '<div class="thumb-wrap">' + coverArt(g) + '</div>' +
      '<div>' +
        '<h1>' + escapeHtml(g.title) + '</h1>' +
        '<div class="dev-line">by <a href="#/profile/' + g.developerId + '">' + escapeHtml(devName(g.developerId)) + '</a></div>' +
        '<div class="hero-tags">' +
          '<span class="tag stage">' + escapeHtml(g.stage) + '</span>' +
          '<span class="tag">' + escapeHtml(g.genre) + '</span>' +
          '<span class="tag engine">' + escapeHtml(g.engine) + '</span>' +
          (g.needsFeedback ? feedbackBadge(g.feedbackCategory) : '') +
        '</div>' +
        '<div class="game-desc">' + escapeHtml(g.shortDescription) + '</div>' +
        '<div class="hero-meta">' +
          '<div class="hm-item"><span class="hm-num">' + devlogs.length + '</span><span class="hm-label">Devlogs</span></div>' +
          '<div class="hm-item"><span class="hm-num">' + totalFeedback + '</span><span class="hm-label">Feedback notes</span></div>' +
          (isCurrentUserOwnerOfGame(g)
            ? '<div class="hm-item hm-action">' +
                '<a class="btn btn-primary btn-sm" href="#/create?game=' + g.id + '">New devlog</a>' +
              '</div>'
            : '<div class="hm-item"><span class="hm-num">' + (g.needsFeedback ? 'Open' : '—') + '</span><span class="hm-label">Feedback status</span></div>'
          ) +
        '</div>' +
      '</div>' +
    '</div>';

  const threadItems = devlogs.length
    ? devlogs.map((dl, idx) => {
        const fbCount = getFeedbackFor(dl.id).length;
        return (
          '<div class="thread-item">' +
            '<div class="ti-head">' +
              '<div>' +
                '<div class="ti-num">DEVLOG ' + (idx + 1) + ' OF ' + devlogs.length + '</div>' +
                '<h3 class="ti-title">' + escapeHtml(dl.title) + '</h3>' +
                '<div class="ti-meta">' + timeAgo(dl.timestamp) + '</div>' +
              '</div>' +
              '<div>' + saveButton(dl.id) + '</div>' +
            '</div>' +
            '<div class="ti-excerpt">' + escapeHtml(dl.content) + '</div>' +
            '<div class="ti-footer">' +
              '<span>' + fbCount + ' feedback note' + (fbCount === 1 ? '' : 's') + '</span>' +
              '<a href="#/devlog/' + dl.id + '">Open devlog →</a>' +
            '</div>' +
          '</div>'
        );
      }).join('')
    : '<div class="empty">No devlogs yet for this game.</div>';
  
  const sidePanel =
    '<div class="side-panel">' +
      '<h3>Game</h3>' +
      '<ul class="meta-list">' +
        '<li><span class="k">Genre</span><span class="v">' + escapeHtml(g.genre) + '</span></li>' +
        '<li><span class="k">Engine</span><span class="v">' + escapeHtml(g.engine) + '</span></li>' +
        '<li><span class="k">Stage</span><span class="v">' + escapeHtml(g.stage) + '</span></li>' +
        '<li><span class="k">Devlogs</span><span class="v">' + devlogs.length + '</span></li>' +
        '<li><span class="k">Feedback</span><span class="v">' + totalFeedback + '</span></li>' +
        '<li><span class="k">Funding</span><span class="v">Sponsorship · no ads</span></li>' +
      '</ul>' +
    '</div>' +
    (dev
      ? '<div class="side-panel">' +
          '<h3>Developer</h3>' +
          '<a href="#/profile/' + dev.id + '" style="font-weight:600;">' + escapeHtml(dev.name) + '</a>' +
          '<div class="muted" style="font-size:12px;margin-top:4px;">' + escapeHtml(dev.bio) + '</div>' +
        '</div>'
      : '');

  return (
    '<div class="container">' +
      '<a class="back-link" href="#/">&#8592; Back to Discover</a>' +
      hero +
      '<div class="thread-header"><h2>Devlog thread</h2></div>' +
      '<div class="detail-grid">' +
        '<div>' +
          threadItems +
        '</div>' +
        '<div>' +
          sponsorPanel(g) +
          sidePanel +
        '</div>' +
      '</div>' +
    '</div>'
  );
}