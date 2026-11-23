import { STATE } from '../state.js';
import { escapeHtml, timeAgo } from '../utils.js';
import { getDevlog, getGame, getDeveloper, getFeedbackFor, devName } from '../selectors.js';
import { imagePlaceholder } from '../components/imagePlaceholder.js';
import { feedbackBadge, saveButton } from '../components/badges.js';
import { devlogImage } from '../components/devlogImage.js';
import { renderFeedbackItem } from '../components/feedbackItem.js';

const FEEDBACK_CATS = ['All', 'Art', 'Mechanics', 'Audio', 'UX', 'Business'];

export function renderDevlogDetail(devlogId) {
  const dl = getDevlog(devlogId);
  if (!dl) return '<div class="container"><div class="empty">Devlog not found. <a href="#/" style="color:var(--accent);">Back to Discover</a></div></div>';

  const g = getGame(dl.gameId);
  const dev = getDeveloper(g.developerId);
  const feedback = getFeedbackFor(dl.id).slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const siblings = STATE.devlogs
    .filter((d) => d.gameId === g.id)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const myIdx = siblings.findIndex((d) => d.id === dl.id);
  const prev = myIdx > 0 ? siblings[myIdx - 1] : null;
  const next = myIdx >= 0 && myIdx < siblings.length - 1 ? siblings[myIdx + 1] : null;

  const breadcrumb =
    '<div class="devlog-breadcrumb">' +
      '<a class="back-link" href="#/">&larr; Back to Discover</a>' +
      '<span class="breadcrumb-sep" aria-hidden="true">&middot;</span>' +
      '<span class="breadcrumb-context">' + escapeHtml(g.title) + ' / Devlog ' + (myIdx + 1) + ' of ' + siblings.length + '</span>' +
      '<a class="btn btn-secondary btn-sm breadcrumb-thread" href="#/game/' + g.id + '">View thread &rarr;</a>' +
    '</div>';

  const feedbackHtml = feedback.length
    ? feedback.map(renderFeedbackItem).join('')
    : '<div class="empty">No feedback yet — this dev is waiting for a fresh pair of eyes.</div>';

  const requestPanel = g.needsFeedback
    ? '<div class="request-sticky">' +
        '<div class="rb-label">Feedback requested</div>' +
        '<div class="rb-title">' + escapeHtml(g.feedbackCategory) + '</div>' +
        '<button class="btn btn-feedback" id="open-feedback">Give Feedback</button>' +
        '<div class="rb-hint">Good feedback mentions <strong>what you tried</strong>, <strong>what you expected</strong>, and <strong>what actually happened</strong>.</div>' +
        '<div class="request-panel-actions">' + saveButton(dl.id) + '</div>' +
      '</div>'
    : '<div class="request-sticky">' +
        '<div class="rb-label" style="color:var(--muted);">Feedback</div>' +
        '<div class="rb-title" style="font-size:14px;">Not currently requesting</div>' +
        '<div class="rb-hint">This dev is heads-down. You can still leave a note below.</div>' +
        '<div class="request-panel-actions">' + saveButton(dl.id) + '</div>' +
      '</div>';

  const siblingPanel = siblings.length > 1
    ? '<div class="side-panel">' +
        '<h3>More from ' + escapeHtml(g.title) + '</h3>' +
        (prev
          ? '<div class="sibling-link">' +
              '<span class="muted">&larr; Previous</span>' +
              '<a href="#/devlog/' + prev.id + '">' + escapeHtml(prev.title) + '</a>' +
            '</div>'
          : '') +
        (next
          ? '<div class="sibling-link">' +
              '<span class="muted">Next &rarr;</span>' +
              '<a href="#/devlog/' + next.id + '">' + escapeHtml(next.title) + '</a>' +
            '</div>'
          : '') +
      '</div>'
    : '';

  const feedbackForm =
    '<div id="feedback-form-wrap" class="hidden" style="margin-top:18px;">' +
      '<div class="form-panel" style="max-width:none;">' +
        '<div class="form-row">' +
          '<label for="fb-cat">Category</label>' +
          '<select id="fb-cat">' + FEEDBACK_CATS.filter((c) => c !== 'All').map((c) =>
            '<option value="' + c + '"' + (c === g.feedbackCategory ? ' selected' : '') + '>' + c + '</option>').join('') +
          '</select>' +
        '</div>' +
        '<div class="form-row">' +
          '<label for="fb-text">Your feedback</label>' +
          '<textarea id="fb-text" placeholder="Be specific. What did you try? What did you expect? What happened?"></textarea>' +
          '<div class="field-error hidden" id="fb-text-error">Please write a bit more — at least a sentence.</div>' +
          '<div class="fb-help">Aim for <strong>one concrete observation</strong> rather than a general impression. Short and specific beats long and vague.</div>' +
          '<span class="toggle-link" id="toggle-structured">+ Add structure (what I tried / expected / happened)</span>' +
        '</div>' +
        '<div class="fb-structured hidden" id="fb-structured">' +
          '<div class="form-row"><label for="fb-tried">What I tried</label><input type="text" id="fb-tried" placeholder="e.g. Played the downtown map for 10 minutes" /></div>' +
          '<div class="form-row"><label for="fb-expected">What I expected</label><input type="text" id="fb-expected" placeholder="e.g. Traffic to reroute around an accident" /></div>' +
          '<div class="form-row"><label for="fb-happened">What actually happened</label><input type="text" id="fb-happened" placeholder="e.g. Cars piled up at the same intersection" /></div>' +
        '</div>' +
        '<div style="display:flex;gap:10px;align-items:center;margin-top:6px;">' +
          '<button class="btn btn-primary" id="submit-feedback">Send Feedback</button>' +
          '<button class="btn btn-secondary" id="cancel-feedback">Cancel</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  const sidePanel =
    '<div class="side-panel">' +
      '<h3>Game</h3>' +
      '<ul class="meta-list">' +
        '<li><span class="k">Genre</span><span class="v">' + escapeHtml(g.genre) + '</span></li>' +
        '<li><span class="k">Engine</span><span class="v">' + escapeHtml(g.engine) + '</span></li>' +
        '<li><span class="k">Stage</span><span class="v">' + escapeHtml(g.stage) + '</span></li>' +
        '<li><span class="k">Devlogs</span><span class="v">' + siblings.length + '</span></li>' +
        '<li><span class="k">Feedback</span><span class="v">' + feedback.length + '</span></li>' +
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
      breadcrumb +
      '<div class="detail-grid">' +
        '<div>' +
          '<div class="detail-main">' +
            '<h1>' + escapeHtml(g.title) + '</h1>' +
            '<div class="detail-dev">by <a href="#/profile/' + g.developerId + '">' + escapeHtml(devName(g.developerId)) + '</a></div>' +
            devlogImage(dl, g) +
            '<h2 class="devlog-heading">' + escapeHtml(dl.title) + '</h2>' +
            '<div class="devlog-body">' + escapeHtml(dl.content) + '</div>' +
            (dl.videoUrl
              ? '<div class="devlog-video" style="margin-top:16px;">' +
                  '<video controls preload="metadata" src="' + escapeHtml(dl.videoUrl) + '"></video>' +
                  '<div class="devlog-video-label">Attached clip</div>' +
                '</div>'
              : '') +
            '<div style="margin-top:16px;">' + imagePlaceholder(dl.imageSeed, 'work in progress') + '</div>' +
            feedbackForm +
          '</div>' +
          '<div class="section-title">Feedback <span class="count">' + feedback.length + '</span></div>' +
          feedbackHtml +
        '</div>' +
        '<div>' + requestPanel + siblingPanel + sidePanel + '</div>' +
      '</div>' +
    '</div>'
  );
}