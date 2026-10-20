import { STATE } from '../state.js';
import { escapeHtml, timeAgo } from '../utils.js';
import { getDeveloper, getDevlog, getGame, devHandle, getTrackRecord, getFeedbackHistory } from '../selectors.js';

function renderHistoryEntry(fb) {
  const dl = getDevlog(fb.postId);
  const game = dl ? getGame(dl.gameId) : null;
  if (!dl || !game) return '';

  const repliesHtml = (fb.replies || []).map((r) =>
    '<div class="he-reply">' +
      '<span class="he-reply-author">' + escapeHtml(devHandle(r.authorId)) + ' replied:</span>' +
      '<div class="he-reply-text">' + escapeHtml(r.text) + '</div>' +
    '</div>'
  ).join('');

  const statusChip = fb.actedOn
    ? '<span class="acted-mark">&#10003; Acted on by developer</span>'
    : (fb.seenByDev
        ? '<span class="seen-mark">&#10003; Seen by developer</span>'
        : '<span class="muted" style="font-size:11px;">Not yet acknowledged</span>');

  return (
    '<div class="history-entry">' +
      '<div class="he-head">' +
        '<div>' +
          '<a href="#/devlog/' + dl.id + '" class="he-title">' + escapeHtml(dl.title) + '</a>' +
          '<div class="he-sub">' +
            '<a href="#/game/' + game.id + '">' + escapeHtml(game.title) + '</a>' +
            ' · ' + escapeHtml(game.genre) + ' · ' +
            timeAgo(fb.timestamp) +
          '</div>' +
        '</div>' +
        '<div class="he-status">' + statusChip + '</div>' +
      '</div>' +
      '<div class="he-note">' + escapeHtml(fb.text) + '</div>' +
      (repliesHtml ? '<div class="he-replies">' + repliesHtml + '</div>' : '') +
    '</div>'
  );
}

function buildPortfolioMarkdown(dev) {
  const record = getTrackRecord(dev.id);
  const history = getFeedbackHistory(dev.id);

  let md = '# ' + dev.name + ' — Feedback Portfolio\n\n';
  md += '_Generated from PlayForge on ' + new Date().toISOString().slice(0, 10) + '_\n\n';
  md += '**Track record**\n\n';
  md += '- ' + record.given + ' feedback notes given\n';
  md += '- ' + record.actedOn + ' acted on by developers (' + record.actedRate + '%)\n';
  md += '- ' + record.acknowledged + ' acknowledged (' + record.ackRate + '%)\n';
  md += '- ' + record.games + ' games covered across ' + record.genres + ' genres\n\n';
  md += '## Feedback history\n\n';

  history.forEach((fb) => {
    const dl = getDevlog(fb.postId);
    const game = dl ? getGame(dl.gameId) : null;
    if (!dl || !game) return;
    md += '### ' + dl.title + '\n\n';
    md += '**' + game.title + '** · ' + timeAgo(fb.timestamp);
    if (fb.actedOn) md += ' · ✓ Acted on';
    else if (fb.seenByDev) md += ' · ✓ Seen';
    md += '\n\n';
    md += '> ' + fb.text.replace(/\n/g, '\n> ') + '\n\n';
    (fb.replies || []).forEach((r) => {
      md += '**' + devHandle(r.authorId) + ':** ' + r.text + '\n\n';
    });
  });

  return md;
}

export function renderPortfolio(devId) {
  const dev = getDeveloper(devId);
  if (!dev) return '<div class="container"><div class="empty">Developer not found. <a href="#/" style="color:var(--accent);">Back to Discover</a></div></div>';

  const record = getTrackRecord(dev.id);
  const history = getFeedbackHistory(dev.id);
  const isMe = dev.id === STATE.currentUserId;

  if (record.given === 0) {
    return (
      '<div class="container">' +
        '<a class="back-link" href="#/profile/' + dev.id + '">&#8592; Back to profile</a>' +
        '<h1 class="page-title">' + escapeHtml(dev.name) + ' — Portfolio</h1>' +
        '<div class="empty">' +
          'No feedback history yet. ' +
          (isMe ? 'Leave a note on any devlog to start your portfolio.' : '') +
        '</div>' +
      '</div>'
    );
  }

  const header =
    '<div class="portfolio-head">' +
      '<div>' +
        '<h1 class="portfolio-title">' + escapeHtml(dev.name) + '</h1>' +
        '<div class="portfolio-sub">@' + escapeHtml(dev.handle) + ' · Feedback portfolio</div>' +
        '<div class="portfolio-bio">' + escapeHtml(dev.bio) + '</div>' +
      '</div>' +
      '<div class="portfolio-actions">' +
        '<button class="btn btn-secondary" id="copy-portfolio">Copy as Markdown</button>' +
      '</div>' +
    '</div>';

  const stats =
    '<div class="portfolio-stats">' +
      '<div class="ps-item"><span class="ps-num">' + record.actedOn + '</span><span class="ps-label">Acted on</span></div>' +
      '<div class="ps-item"><span class="ps-num">' + record.given + '</span><span class="ps-label">Notes given</span></div>' +
      '<div class="ps-item"><span class="ps-num">' + record.ackRate + '%</span><span class="ps-label">Ack rate</span></div>' +
      '<div class="ps-item"><span class="ps-num">' + record.games + '</span><span class="ps-label">Games</span></div>' +
      '<div class="ps-item"><span class="ps-num">' + record.genres + '</span><span class="ps-label">Genres</span></div>' +
    '</div>';

  const historyHtml = history.map(renderHistoryEntry).join('');

  return (
    '<div class="container">' +
      '<a class="back-link" href="#/profile/' + dev.id + '">&#8592; Back to profile</a>' +
      header +
      stats +
      '<div class="section-title">Feedback history <span class="count">' + history.length + '</span></div>' +
      '<div class="portfolio-history">' + historyHtml + '</div>' +
      '<textarea id="portfolio-markdown" style="display:none;">' +
        escapeHtml(buildPortfolioMarkdown(dev)) +
      '</textarea>' +
    '</div>'
  );
}