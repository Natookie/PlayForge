import { escapeHtml, hashString } from '../utils.js';

export function imagePlaceholder(seed, label) {
  const h = hashString(seed);
  const hue = h % 360;
  const hue2 = (hue + 40) % 360;
  return (
    '<div class="img-ph" style="--h:' + hue + '; --h2:' + hue2 + ';">' +
      '<div class="ph-inner">' +
        '<div class="ph-dot"></div>' +
        '<div class="ph-label">' + escapeHtml(label || 'dev capture') + '</div>' +
      '</div>' +
    '</div>'
  );
}