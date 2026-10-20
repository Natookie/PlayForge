import { STATE } from '../state.js';
import { escapeHtml, timeAgo } from '../utils.js';
import { getDeveloper, getGame, getTrackRecord } from '../selectors.js';
import { coverArt } from '../components/coverArt.js';
import { feedbackBadge } from '../components/badges.js';

export function renderProfile(devId) {
  const dev = getDeveloper(devId);
  if (!dev) return '<div class="container"><div class="empty">Developer not found. <a href="#/" style="color:var(--accent);">Back to Discover</a></div></div>';

  const isMe = dev.id === STATE.currentUserId;
  const devGames = STATE.games.filter((g) => g.developerId === dev.id);
  const recentDevlogs = STATE.devlogs
    .filter((d) => devGames.some((g) => g.id === d.gameId))
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 6);
  const openRequests = devGames.filter((g) => g.needsFeedback).length;
  const record = getTrackRecord(dev.id);

  const initials = dev.name.split(' ').filter(Boolean).map((p) => p[0]).join('').slice(0, 2).toUpperCase();

  const editButton = isMe
    ? '<button class="btn btn-secondary" id="edit-profile-btn">Edit profile</button>'
    : '';

  const editForm = isMe
    ? '<div class="profile-edit-form hidden" id="profile-edit-form">' +
        '<h3>Edit profile</h3>' +
        '<div class="form-row"><label for="p-name">Name</label><input type="text" id="p-name" value="' + escapeHtml(dev.name) + '" /></div>' +
        '<div class="form-row"><label for="p-handle">Handle</label><input type="text" id="p-handle" value="' + escapeHtml(dev.handle) + '" /></div>' +
        '<div class="form-row"><label for="p-bio">Bio</label><textarea id="p-bio" style="min-height:70px;">' + escapeHtml(dev.bio) + '</textarea></div>' +
        '<div style="display:flex;gap:10px;">' +
          '<button class="btn btn-primary" id="save-profile">Save</button>' +
          '<button class="btn btn-secondary" id="cancel-profile">Cancel</button>' +
        '</div>' +
      '</div>'
    : '';

  const recordPanel =
    '<div class="side-panel record-panel">' +
      '<div class="record-head">' +
        '<h3>Feedback track record</h3>' +
        (record.given > 0
          ? '<a href="#/portfolio/' + dev.id + '" class="record-link">See full portfolio →</a>'
          : '') +
      '</div>' +
      (record.given === 0
        ? '<div class="muted" style="font-size:12px;">' + escapeHtml(dev.name.split(' ')[0]) + ' has not left feedback yet.</div>'
        : '<div class="record-headline">' +
            '<span class="record-big">' + record.actedOn + '</span>' +
            '<span class="record-big-label">' + (record.actedOn === 1 ? 'note' : 'notes') + ' acted on by developers</span>' +
          '</div>' +
          '<ul class="record-list">' +
            '<li><span class="k">Notes given</span><span class="v">' + record.given + '</span></li>' +
            '<li><span class="k">Acknowledged by devs</span><span class="v good">' + record.acknowledged + '</span></li>' +
            '<li><span class="k">Ack rate</span><span class="v good">' + record.ackRate + '%</span></li>' +
            '<li><span class="k">Devs replied</span><span class="v">' + record.withReply + '</span></li>' +
            '<li><span class="k">Games covered</span><span class="v">' + record.games + '</span></li>' +
            '<li><span class="k">Genres covered</span><span class="v">' + record.genres + '</span></li>' +
          '</ul>' +
          '<div class="muted record-note">Acted on = the developer marked a note as one that changed something they built. No scores, no likes.</div>'
      ) +
    '</div>';

  const gamesHtml = devGames.length
    ? devGames.map((g) => {
        const dlCount = STATE.devlogs.filter((d) => d.gameId === g.id).length;
        return (
          '<a class="game-card" href="#/game/' + g.id + '">' +
            coverArt(g) +
            '<div class="gc-body">' +
              '<h3 class="gc-title">' + escapeHtml(g.title) + '</h3>' +
              '<div class="gc-meta"><span>' + escapeHtml(g.genre) + ' &middot; ' + escapeHtml(g.engine) + '</span><span>' + dlCount + ' devlogs</span></div>' +
              '<div style="margin-top:6px;display:flex;gap:6px;align-items:center;">' +
                '<span class="tag stage">' + escapeHtml(g.stage) + '</span>' +
                (g.needsFeedback ? feedbackBadge(g.feedbackCategory) : '') +
              '</div>' +
            '</div>' +
          '</a>'
        );
      }).join('')
    : '<div class="empty" style="grid-column:1/-1;">No games yet.</div>';

  const devlogsHtml = recentDevlogs.length
    ? recentDevlogs.map((d) => {
        const g = getGame(d.gameId);
        return (
          '<a class="post-card" href="#/devlog/' + d.id + '" style="padding:12px 14px;">' +
            '<div style="font-size:13px;font-weight:600;">' + escapeHtml(d.title) + '</div>' +
            '<div style="font-size:12px;color:var(--muted);margin-top:2px;">' + escapeHtml(g.title) + ' &middot; ' + timeAgo(d.timestamp) + '</div>' +
          '</a>'
        );
      }).join('')
    : '<div class="empty" style="grid-column:1/-1;">No devlogs yet.</div>';

  return (
    '<div class="container">' +
      '<div class="profile-head">' +
        '<div class="profile-avatar">' + initials + '</div>' +
        '<div>' +
          '<h1>' + escapeHtml(dev.name) + '</h1>' +
          '<div class="handle">@' + escapeHtml(dev.handle) + '</div>' +
          '<div class="bio">' + escapeHtml(dev.bio) + '</div>' +
          (openRequests
            ? '<div style="margin-top:8px;"><span class="fb-badge"><span class="fb-label">Needs feedback</span><span class="fb-cat">' + openRequests + ' open</span></span></div>'
            : '') +
        '</div>' +
        '<div class="profile-actions">' + editButton + '</div>' +
      '</div>' +
      editForm +
      recordPanel +
      '<div class="section-title">Games <span class="count">' + devGames.length + '</span></div>' +
      '<div class="game-grid">' + gamesHtml + '</div>' +
      '<div class="section-title">Recent devlogs</div>' +
      '<div class="feed">' + devlogsHtml + '</div>' +
    '</div>'
  );
}

export function renderMyGames() {
  return renderProfile(STATE.currentUserId);
}