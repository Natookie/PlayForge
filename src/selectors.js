import { STATE } from './state.js';

export function getGame(id) { return STATE.games.find((g) => g.id === id); }
export function getDevlog(id) { return STATE.devlogs.find((d) => d.id === id); }
export function getDeveloper(id) { return STATE.developers.find((d) => d.id === id); }
export function getFeedbackFor(devlogId) { return STATE.feedback.filter((f) => f.postId === devlogId); }
export function getCurrentUser() { return getDeveloper(STATE.currentUserId); }
export function isSaved(devlogId) { return STATE.saved.includes(devlogId); }

export function devName(devId) {
  const d = getDeveloper(devId);
  return d ? d.name : 'Unknown developer';
}

export function devHandle(devId) {
  const d = getDeveloper(devId);
  return d ? d.handle : 'unknown';
}

export function isCurrentUserOwnerOfGame(game) {
  const me = getCurrentUser();
  return !!(me && game && game.developerId === me.id);
}

export function isCurrentUserOwnerOfDevlog(devlog) {
  if (!devlog) return false;
  const g = getGame(devlog.gameId);
  return isCurrentUserOwnerOfGame(g);
}

export function getPosts() {
  return STATE.devlogs
    .map((dl) => ({ devlog: dl, game: getGame(dl.gameId), feedback: getFeedbackFor(dl.id) }))
    .filter((p) => p.game)
    .sort((a, b) => new Date(b.devlog.timestamp) - new Date(a.devlog.timestamp));
}

export function getQueuePosts() {
  return getPosts()
    .filter((p) => p.game.needsFeedback)
    .sort((a, b) => {
      if (a.feedback.length !== b.feedback.length) return a.feedback.length - b.feedback.length;
      return new Date(a.devlog.timestamp) - new Date(b.devlog.timestamp);
    });
}

export function stalenessChip(post) {
  const days = (Date.now() - new Date(post.devlog.timestamp).getTime()) / (24 * 3600 * 1000);
  const responses = post.feedback.length;
  if (responses === 0 && days >= 3) return { label: 'No responses · ' + Math.floor(days) + 'd', level: 'crit' };
  if (responses === 0) return { label: 'No responses yet', level: 'crit' };
  if (responses <= 2 && days >= 2) return { label: responses + ' response' + (responses === 1 ? '' : 's') + ' · ' + Math.floor(days) + 'd', level: 'warn' };
  return { label: responses + ' response' + (responses === 1 ? '' : 's'), level: '' };
}

export function getTrackRecord(devId) {
  const dev = getDeveloper(devId);
  if (!dev) {
    return { given: 0, acknowledged: 0, actedOn: 0, actedRate: 0, withReply: 0, games: 0, genres: 0, ackRate: 0 };
  }

  const given = STATE.feedback.filter((f) => f.authorId === devId);
  const acknowledged = given.filter((f) => f.seenByDev).length;
  const actedOn = given.filter((f) => f.actedOn).length;
  const withReply = given.filter((f) => (f.replies || []).length > 0).length;

  const gameIds = new Set();
  const genres = new Set();
  given.forEach((f) => {
    const dl = getDevlog(f.postId);
    if (!dl) return;
    gameIds.add(dl.gameId);
    const g = getGame(dl.gameId);
    if (g) genres.add(g.genre);
  });

  const total = given.length;
  const ackRate = total ? Math.round((acknowledged / total) * 100) : 0;
  const actedRate = total ? Math.round((actedOn / total) * 100) : 0;

  return {
    given: total,
    acknowledged,
    actedOn,
    actedRate,
    withReply,
    games: gameIds.size,
    genres: genres.size,
    ackRate,
  };
}

export function getFeedbackHistory(devId) {
  return STATE.feedback
    .filter((f) => f.authorId === devId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export function searchAll(q) {
  const query = q.trim().toLowerCase();
  if (!query) return { games: [], devs: [] };

  const games = STATE.games
    .filter((g) => {
      const name = devName(g.developerId).toLowerCase();
      return g.title.toLowerCase().includes(query) || name.includes(query);
    })
    .slice(0, 5);

  const devs = STATE.developers
    .filter((d) => d.name.toLowerCase().includes(query) || d.handle.toLowerCase().includes(query))
    .slice(0, 3);

  return { games, devs };
}