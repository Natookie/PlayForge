import { GAMES } from './games.js';
import { getVoice } from './voices.js';
import { makeDevlogContent, makeDevlogTitle, shouldHaveVideo, pickVideo } from './generators.js';
import { ago, DAY } from '../utils.js';

function buildDevlogs() {
  const out = [];

  GAMES.forEach((game) => {
    const plan = game.devlogPlan || { count: 1, recentDaysAgo: 1, spacingDays: 5 };
    const voice = getVoice(game.developerId);
    const hand = Array.isArray(game.handWritten) ? game.handWritten : [];

    if (hand.length > plan.count) {
      console.warn(
        `[devlogs] ${game.id}: ${hand.length} hand-written entries but count is ${plan.count}; extras ignored.`
      );
    }

    for (let i = 0; i < plan.count; i++) {
      const id = game.id + '-dl-' + (i + 1);
      const daysAgo = plan.recentDaysAgo + i * plan.spacingDays;
      const timestamp = ago(daysAgo * DAY);

      const custom = hand[i];

      let title, content, videoUrl, imageUrl;   // <-- imageUrl MUST be here

      if (custom) {
        title = custom.title;
        content = custom.content;
        videoUrl = custom.videoUrl !== undefined
          ? custom.videoUrl
          : ((i === 0 && shouldHaveVideo(id)) ? pickVideo(id) : undefined);
        imageUrl = custom.imageUrl || undefined;
      } else {
        const parts = i === 0 ? 3 : 2;
        title = makeDevlogTitle(id, { voice });
        content = makeDevlogContent(id, { parts, voice });
        videoUrl = (i === 0 && shouldHaveVideo(id)) ? pickVideo(id) : undefined;
        imageUrl = undefined;
      }

      out.push({
        id,
        gameId: game.id,
        title,
        content,
        timestamp,
        imageSeed: id + '-img',
        videoUrl,
        imageUrl,
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