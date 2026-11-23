import { escapeHtml } from '../utils.js';
import { generatedCoverSvg } from './coverArt.js';

export function devlogImage(devlog, game) {
  const generated = generatedCoverSvg({
    paletteSeed: game.thumbnailSeed || game.id || game.title,
    motifSeed: devlog.imageSeed || devlog.id,
    title: game.title,
    genre: game.genre,
    subtitle: game.genre,
  });

  if (!devlog.imageUrl) {
    return '<div class="cover-art">' + generated + '</div>';
  }

  return (
    '<div class="cover-art cover-art-image">' +
      '<img src="' + escapeHtml(devlog.imageUrl) + '" alt="" loading="lazy" ' +
           'onerror="this.parentElement.classList.add(\'is-broken\')" />' +
      '<div class="cover-art-fallback">' + generated + '</div>' +
    '</div>'
  );
}