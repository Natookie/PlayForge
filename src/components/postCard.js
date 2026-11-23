import { escapeHtml, timeAgo } from '../utils.js';
import { devName, stalenessChip } from '../selectors.js';
import { devlogImage } from './devlogImage.js';
import { feedbackBadge, saveButton } from './badges.js';

export function postCard(post, opts) {
  opts = opts || {};
  const g = post.game;
  const dl = post.devlog;
  const fbCount = post.feedback.length;
  const chip = opts.queue ? stalenessChip(post) : null;
  const staleLevel = opts.queue ? (chip && chip.level ? chip.level : 'fresh') : null;

  return (
    '<a class="post-card reveal' +
      (opts.queue ? ' queue-card' : '') + '"' +
      (staleLevel ? ' data-stale="' + staleLevel + '"' : '') +
      ' href="#/devlog/' + dl.id + '">' +
      '<div class="thumb">' +
        devlogImage(dl, g) +
        '<div class="thumb-actions">' +
          (dl.videoUrl ? '<span class="play-badge" title="Includes video">&#9654;</span>' : '') +
          saveButton(dl.id) +
        '</div>' +
      '</div>' +
      '<div class="body">' +
        '<div class="title-row">' +
          '<div>' +
            '<h3 class="game-title">' + escapeHtml(dl.title) + '</h3>' +
            '<div class="dev-name">' + escapeHtml(g.title) + ' &middot; by ' + escapeHtml(devName(g.developerId)) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="tag-row">' +
          '<span class="tag stage">' + escapeHtml(g.stage) + '</span>' +
          '<span class="tag">' + escapeHtml(g.genre) + '</span>' +
          '<span class="tag engine">' + escapeHtml(g.engine) + '</span>' +
        '</div>' +
        '<div class="devlog-snippet">' +
          '<div class="dl-body">' + escapeHtml(dl.content) + '</div>' +
        '</div>' +
        (g.needsFeedback ? '<div>' + feedbackBadge(g.feedbackCategory) + '</div>' : '') +
        '<div class="card-footer">' +
          '<span class="feedback-count">' + fbCount + ' feedback</span>' +
          '<span>' + timeAgo(dl.timestamp) + '</span>' +
        '</div>' +
        (chip
          ? '<div class="queue-meta"><span class="stale-chip ' + chip.level + '">' + escapeHtml(chip.label) + '</span>' +
            '<span class="muted" style="font-size:11px;">awaiting ' + escapeHtml(g.feedbackCategory || 'feedback') + '</span></div>'
          : '') +
      '</div>' +
    '</a>'
  );
}