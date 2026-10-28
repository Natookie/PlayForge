import { escapeHtml, hashString } from '../utils.js';

const COVER_PALETTES = [
  { bg: '#1a2236', mid: '#243349', fg: '#6fadfa', accent: '#c3d9ff' },
  { bg: '#1b2838', mid: '#26405a', fg: '#66c0f4', accent: '#c7d5e0' },
  { bg: '#2b1b1b', mid: '#3d2525', fg: '#e57373', accent: '#ffd7d7' },
  { bg: '#1e2a1e', mid: '#2a3d2a', fg: '#81c784', accent: '#dcedc8' },
  { bg: '#2a1f38', mid: '#3a2c4d', fg: '#b39ddb', accent: '#e1d5f0' },
  { bg: '#2b2416', mid: '#3d3420', fg: '#ffb74d', accent: '#ffe0b2' },
  { bg: '#162a2b', mid: '#1f3d3f', fg: '#4db6ac', accent: '#b2dfdb' },
  { bg: '#2a1a2a', mid: '#3d253d', fg: '#f48fb1', accent: '#f8bbd0' },
  { bg: '#1a1a2e', mid: '#26264a', fg: '#7986cb', accent: '#c5cae9' },
];

function paletteFor(seed) {
  return COVER_PALETTES[hashString(String(seed) + ':palette') % COVER_PALETTES.length];
}

function motifSimulation(color) {
  return (
    '<g stroke="' + color + '" stroke-width="1" fill="none" opacity="0.35">' +
      '<line x1="0" y1="60" x2="320" y2="60" />' +
      '<line x1="0" y1="120" x2="320" y2="120" />' +
      '<line x1="80" y1="0" x2="80" y2="180" />' +
      '<line x1="200" y1="0" x2="200" y2="180" />' +
      '<line x1="0" y1="180" x2="320" y2="0" stroke-width="2" opacity="0.6" />' +
      '<circle cx="80" cy="60" r="3" fill="' + color + '" />' +
      '<circle cx="200" cy="120" r="3" fill="' + color + '" />' +
    '</g>'
  );
}

function motifNarrative(color) {
  return (
    '<g fill="' + color + '" opacity="0.28">' +
      '<rect x="40" y="40" width="160" height="26" rx="4" />' +
      '<rect x="60" y="76" width="200" height="26" rx="4" opacity="0.8" />' +
      '<rect x="40" y="112" width="140" height="26" rx="4" opacity="0.6" />' +
    '</g>'
  );
}

function motifArcade(color) {
  return (
    '<g fill="none" stroke="' + color + '" stroke-width="2" opacity="0.5">' +
      '<polygon points="160,60 200,120 120,120" />' +
      '<polygon points="160,80 185,115 135,115" opacity="0.7" />' +
      '<polygon points="160,100 172,112 148,112" opacity="0.9" />' +
    '</g>'
  );
}

function motifHorror(color) {
  const dots = [];
  for (let i = 0; i < 40; i++) {
    const x = (hashString('hx' + i) % 320);
    const y = (hashString('hy' + i) % 180);
    const r = 0.5 + (hashString('hr' + i) % 15) / 10;
    dots.push('<circle cx="' + x + '" cy="' + y + '" r="' + r + '" />');
  }
  return (
    '<g fill="' + color + '" opacity="0.4">' + dots.join('') + '</g>' +
    '<g stroke="' + color + '" stroke-width="1" opacity="0.5">' +
      '<line x1="160" y1="0" x2="160" y2="180" />' +
      '<line x1="0" y1="90" x2="320" y2="90" />' +
    '</g>'
  );
}

function motifRPG(color) {
  return (
    '<g fill="none" stroke="' + color + '" stroke-width="1.5" opacity="0.4">' +
      '<path d="M0,140 Q80,80 160,120 T320,100" />' +
      '<path d="M0,120 Q80,60 160,100 T320,80" opacity="0.7" />' +
      '<path d="M0,100 Q80,40 160,80 T320,60" opacity="0.4" />' +
      '<polygon points="240,60 250,70 240,80 230,70" fill="' + color + '" opacity="0.9" stroke="none" />' +
    '</g>'
  );
}

function motifStrategy(color) {
  const hexes = [];
  const w = 24;
  const h = 21;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * w + (row % 2 ? w / 2 : 0) + 10;
      const y = row * h + 10;
      hexes.push(
        '<polygon points="' +
          (x) + ',' + (y - 8) + ' ' +
          (x + 7) + ',' + (y - 4) + ' ' +
          (x + 7) + ',' + (y + 4) + ' ' +
          (x) + ',' + (y + 8) + ' ' +
          (x - 7) + ',' + (y + 4) + ' ' +
          (x - 7) + ',' + (y - 4) +
        '" />'
      );
    }
  }
  return (
    '<g fill="none" stroke="' + color + '" stroke-width="1" opacity="0.35">' +
      hexes.join('') +
    '</g>'
  );
}

function motifAction(color) {
  const cx = 160;
  const cy = 90;
  const lines = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const r1 = 30 + (i % 3) * 12;
    const r2 = r1 + 40 + (i % 4) * 15;
    lines.push(
      '<line x1="' + (cx + Math.cos(angle) * r1) + '" y1="' + (cy + Math.sin(angle) * r1) + '" ' +
        'x2="' + (cx + Math.cos(angle) * r2) + '" y2="' + (cy + Math.sin(angle) * r2) + '" />'
    );
  }
  return (
    '<g stroke="' + color + '" stroke-width="2" stroke-linecap="round" opacity="0.45">' +
      lines.join('') +
    '</g>'
  );
}

function motifDefault(color) {
  return (
    '<g fill="none" stroke="' + color + '" stroke-width="1.5" opacity="0.4">' +
      '<circle cx="160" cy="90" r="50" />' +
      '<circle cx="160" cy="90" r="80" opacity="0.5" />' +
      '<line x1="0" y1="180" x2="320" y2="0" opacity="0.6" />' +
    '</g>'
  );
}

const MOTIFS = {
  Simulation: motifSimulation,
  Narrative: motifNarrative,
  Arcade: motifArcade,
  Horror: motifHorror,
  RPG: motifRPG,
  Strategy: motifStrategy,
  Action: motifAction,
};

function motifFor(genre, color) {
  const fn = MOTIFS[genre] || motifDefault;
  return fn(color);
}

export function coverArt(game) {
  const palette = paletteFor(game.id || game.title || 'playforge');
  const title = String(game.title || '').trim();
  const genre = game.genre || '';

  const svg =
    '<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" ' +
        'xmlns="http://www.w3.org/2000/svg" class="cover-art-svg" role="img" ' +
        'aria-label="Cover art for ' + escapeHtml(title) + '">' +
      '<defs>' +
        '<linearGradient id="g-' + hashString(game.id || title) + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="' + palette.bg + '" />' +
          '<stop offset="100%" stop-color="' + palette.mid + '" />' +
        '</linearGradient>' +
      '</defs>' +
      '<rect width="320" height="180" fill="url(#g-' + hashString(game.id || title) + ')" />' +
      motifFor(genre, palette.fg) +
      '<rect x="0" y="140" width="320" height="40" fill="' + palette.bg + '" opacity="0.85" />' +
      '<text x="14" y="164" font-family="Inter, system-ui, sans-serif" ' +
            'font-size="16" font-weight="700" fill="' + palette.accent + '" ' +
            'letter-spacing="-0.01em">' + escapeHtml(title) + '</text>' +
      '<text x="306" y="164" text-anchor="end" font-family="JetBrains Mono, monospace" ' +
            'font-size="9" font-weight="500" fill="' + palette.fg + '" ' +
            'letter-spacing="0.08em" opacity="0.9">' + escapeHtml(genre.toUpperCase()) + '</text>' +
    '</svg>';

  return '<div class="cover-art">' + svg + '</div>';
}