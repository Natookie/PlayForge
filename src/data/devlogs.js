import { GAMES } from './games.js';
import { getVoice } from './voices.js';
import { makeDevlogContent, makeDevlogTitle, shouldHaveVideo, pickVideo } from './generators.js';
import { ago, DAY } from '../utils.js';

function buildDevlogs() {
const out = [];

GAMES.forEach((game) => {
  const plan = game.devlogPlan || { count: 1, recentDaysAgo: 1, spacingDays: 5 };
  const voice = getVoice(game.developerId);

  for (let i = 0; i < plan.count; i++) {
    const id = game.id + '-dl-' + (i + 1);
    const daysAgo = plan.recentDaysAgo + i * plan.spacingDays;
    const timestamp = ago(daysAgo * DAY);

    const parts = i === 0 ? 3 : 2;
    const videoUrl = (i === 0 && shouldHaveVideo(id)) ? pickVideo(id) : undefined;

    out.push({
      id,
      gameId: game.id,
      title: makeDevlogTitle(id, { voice }),
      content: makeDevlogContent(id, { parts, voice }),
      timestamp,
      imageSeed: id + '-img',
      videoUrl,
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