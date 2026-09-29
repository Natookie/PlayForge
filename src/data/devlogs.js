import { GAMES } from './games.js';
import { getVoice } from './voices.js';
import { makeDevlogContent, makeDevlogTitle } from './generators.js';
import { ago, DAY, HOUR, hashString } from '../utils.js';

function buildDevlogs() {
  const out = [];
  const now = Date.now();

  GAMES.forEach((game) => {
    const plan = game.devlogPlan || { count: 1, recentDaysAgo: 1, spacingDays: 5 };
    const voice = getVoice(game.developerId);

    for (let i = 0; i < plan.count; i++) {
      const id = game.id + '-dl-' + (i + 1);
      const daysAgo = plan.recentDaysAgo + i * plan.spacingDays;
      const timestamp = ago(daysAgo * DAY);

      const parts = i === 0 ? 3 : (i === 1 ? 2 : 2);

      out.push({
        id,
        gameId: game.id,
        title: makeDevlogTitle(id, { voice }),
        content: makeDevlogContent(id, { parts, voice }),
        timestamp,
        imageSeed: id + '-img',
      });
    }
  });

  return out.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export const DEVLOGS = buildDevlogs();

export function devlogsForGame(gameId) {
  return DEVLOGS
    .filter((d) => d.gameId === gameId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}