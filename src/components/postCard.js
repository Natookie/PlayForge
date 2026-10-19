import { escapeHtml, timeAgo } from '../utils.js';
import { devName, stalenessChip } from '../selectors.js';
import { coverArt } from './coverArt.js';
import { feedbackBadge, saveButton } from './badges.js';

export function postCard(post, opts) {
  opts = opts || {};
  const g = post.game;
  const dl = post.devlog;
  const fbCount = post.feedback.length;
  const chip = opts.queue ? stalenessChip(post) : null;

  return (
    '<div class="post-card' + (opts.queue ? ' queue-card' : '') + '">' +
      '<a href="#/devlog/' + dl.id + '" style="display:flex;flex-direction:column;flex:1;">' +
        '<div class="thumb">' +
          coverArt(g) +
          '<div class="thumb-actions">' +
            (dl.videoUrl ? '<span class="play-badge" title="Includes video">&#9654;</span>' : '') +
            saveButton(dl.id) +
          '</div>' +
        '</div>' +
        '<div class="body">' +
          '<div class="title-row">' +
            '<div>' +
              '<h3 class="game-title">' + escapeHtml(g.title) + '</h3>' +
              '<div class="dev-name">by ' + escapeHtml(devName(g.developerId)) + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="tag-row">' +
            '<span class="tag stage">' + escapeHtml(g.stage) + '</span>' +
            '<span class="tag">' + escapeHtml(g.genre) + '</span>' +
            '<span class="tag engine">' + escapeHtml(g.engine) + '</span>' +
          '</div>' +
          '<p class="desc">' + escapeHtml(g.shortDescription) + '</p>' +
          '<div class="devlog-snippet">' +
            '<div class="dl-title">' + escapeHtml(dl.title) + '</div>' +
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
      '</a>' +
    '</div>'
  );
}