import { escapeHtml, timeAgo } from '../utils.js';
import { devHandle, getDevlog, getGame, isCurrentUserOwnerOfDevlog } from '../selectors.js';

export function renderFeedbackItem(f) {
  const dl = getDevlog(f.postId);
  const game = dl ? getGame(dl.gameId) : null;
  const ownerId = game ? game.developerId : null;

  const canMarkSeen = dl ? isCurrentUserOwnerOfDevlog(dl) : false;

  const repliesHtml = (f.replies || []).map((r) => {
    const isDevReply = ownerId && r.authorId === ownerId;
    return (
      '<div class="fb-reply">' +
        '<div class="fb-head">' +
          '<span class="fb-author' + (isDevReply ? ' dev' : '') + '">' + escapeHtml(devHandle(r.authorId)) +
            (isDevReply ? '<span class="dev-tag">Dev</span>' : '') + '</span>' +
          '<span class="fb-time">' + timeAgo(r.timestamp) + '</span>' +
        '</div>' +
        '<div class="fb-body">' + escapeHtml(r.text) + '</div>' +
      '</div>'
    );
  }).join('');

  let seenHtml;
  if (f.seenByDev) {
    seenHtml = '<span class="seen-mark">&#10003; Seen by developer</span>';
  } else if (canMarkSeen) {
    seenHtml = '<button data-action="mark-seen" data-fb="' + f.id + '">Mark as seen</button>';
  } else {
    seenHtml = '<span style="color:var(--muted);">Not yet seen</span>';
  }

  let actedHtml = '';
  if (f.actedOn) {
    actedHtml = '<span class="acted-mark">&#10003; Acted on by developer</span>';
  } else if (canMarkSeen && f.seenByDev) {
    actedHtml = '<button data-action="mark-acted-on" data-fb="' + f.id + '">Mark as acted on</button>';
  }

  return (
    '<div class="fb-item" data-fb-id="' + f.id + '">' +
      '<div class="fb-head">' +
        '<span class="fb-author">' + escapeHtml(devHandle(f.authorId)) + '</span>' +
        '<span class="tag">' + escapeHtml(f.category) + '</span>' +
        '<span class="fb-time">' + timeAgo(f.timestamp) + '</span>' +
      '</div>' +
      '<div class="fb-body">' + escapeHtml(f.text) + '</div>' +
      '<div class="fb-actions">' +
        '<button data-action="toggle-reply" data-fb="' + f.id + '">Reply</button>' +
        seenHtml +
        actedHtml +
      '</div>' +
      (repliesHtml ? '<div class="fb-replies">' + repliesHtml + '</div>' : '') +
      '<div class="fb-reply-form hidden" data-reply-form="' + f.id + '">' +
        '<textarea placeholder="Reply…" data-reply-input="' + f.id + '"></textarea>' +
        '<button data-action="submit-reply" data-fb="' + f.id + '">Send</button>' +
      '</div>' +
    '</div>'
  );
}