import { STATE } from '../state.js';
import { escapeHtml, timeAgo } from '../utils.js';
import { getGame, getDeveloper, getFeedbackFor, devName } from '../selectors.js';
import { coverArt } from '../components/coverArt.js';
import { feedbackBadge } from '../components/badges.js';
import { isCurrentUserOwnerOfGame } from '../selectors.js';
import { sponsorPanel } from '../components/sponsorPanel.js';

export function renderGamePage(gameId) {
  const g = getGame(gameId);
  if (!g) {
    return '<div class="container"><div class="empty">Game not found. <a href="#/" style="color:var(--accent);">Back to Discover</a></div></div>';
  }

  const dev = getDeveloper(g.developerId);
  const devlogs = STATE.devlogs
    .filter((d) => d.gameId === g.id)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const totalFeedback = devlogs.reduce((sum, dl) => sum + getFeedbackFor(dl.id).length, 0);
  const latest = devlogs.length ? devlogs[devlogs.length - 1] : null;

  const feedbackTarget = latest ? latest.id : null;
  const owner = isCurrentUserOwnerOfGame(g);
  const hero =
    '<div class="game-hero">' +
      '<div class="hero-top">' +
        '<div class="thumb-wrap">' + coverArt(g) + '</div>' +
        '<div class="hero-title-block">' +
          '<h1>' + escapeHtml(g.title) + '</h1>' +
          '<div class="dev-line">by <a href="#/profile/' + g.developerId + '">' + escapeHtml(devName(g.developerId)) + '</a></div>' +

          (latest
            ? '<div class="hero-updated">Last update ' + timeAgo(latest.timestamp) + '</div>'
            : '<div class="hero-updated">No devlogs yet</div>') +

          '<div class="hero-tags">' +
            '<span class="tag stage">' + escapeHtml(g.stage) + '</span>' +
            '<span class="tag">' + escapeHtml(g.genre) + '</span>' +
            '<span class="tag engine">' + escapeHtml(g.engine) + '</span>' +
          '</div>' +

          '<p class="hero-desc">' + escapeHtml(g.shortDescription) + '</p>' +

          '<div class="hero-cta">' +
            (owner
              ? '<a class="btn btn-primary btn-sm" href="#/create?game=' + g.id + '">New devlog</a>'
              : (feedbackTarget
                  ? '<a class="btn btn-feedback btn-sm" href="#/devlog/' + feedbackTarget + '">Leave feedback</a>'
                  : '<a class="btn btn-secondary btn-sm" href="#/" >Back to Discover</a>'
                )
            ) +
            (latest && owner
              ? '<a class="btn btn-secondary btn-sm" href="#/devlog/' + latest.id + '">Latest devlog</a>'
              : '') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  const requestStrip = g.needsFeedback
    ? '<div class="hero-request">' +
        '<div class="hero-request-main">' +
          '<span class="hero-request-label">Looking for feedback</span>' +
          '<span class="hero-request-cat">' + escapeHtml(g.feedbackCategory || 'General') + '</span>' +
        '</div>' +
        '<div class="hero-request-hint">' +
          'A note on what you tried, expected, and got is worth more than a thumbs up.' +
        '</div>' +
      '</div>'
    : '';

  const statBand =
    '<div class="hero-stats">' +
      '<div class="hs-item"><span class="hs-num">' + devlogs.length + '</span><span class="hs-label">Devlogs</span></div>' +
      '<div class="hs-item"><span class="hs-num">' + totalFeedback + '</span><span class="hs-label">Feedback notes</span></div>' +
      '<div class="hs-item"><span class="hs-num">' + (g.needsFeedback ? 'Open' : '—') + '</span><span class="hs-label">Feedback status</span></div>' +
    '</div>';

  const threadItems = devlogs.length
    ? '<div class="thread-list">' +
        devlogs.map((dl, idx) => {
          const fbCount = getFeedbackFor(dl.id).length;
          return (
            '<a class="thread-row" href="#/devlog/' + dl.id + '">' +
              '<span class="tr-num">' + (idx + 1) + '/' + devlogs.length + '</span>' +
              '<span class="tr-main">' +
                '<span class="tr-title">' + escapeHtml(dl.title) + '</span>' +
                '<span class="tr-meta">' + timeAgo(dl.timestamp) + ' · ' + fbCount + ' feedback</span>' +
              '</span>' +
              '<span class="tr-arrow">&rarr;</span>' +
            '</a>'
          );
        }).join('') +
      '</div>'
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
        '<li><span class="k">Funding</span><span class="v">Sponsorship &middot; no ads</span></li>' +
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
      '<a class="back-link" href="#/">&larr; Back to Discover</a>' +
      hero +
      requestStrip +
      statBand +
      '<div class="thread-header"><h2>Devlog thread</h2><span class="thread-count">' + devlogs.length + ' update' + (devlogs.length === 1 ? '' : 's') + '</span></div>' +
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