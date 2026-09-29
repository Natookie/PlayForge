import { escapeHtml } from '../utils.js';
import { isSaved } from '../selectors.js';

export function feedbackBadge(category) {
  if (!category) return '';
  return (
    '<span class="fb-badge">' +
      '<span class="fb-label">Needs feedback</span>' +
      '<span class="fb-cat">' + escapeHtml(category) + '</span>' +
    '</span>'
  );
}

export function saveButton(devlogId) {
  const saved = isSaved(devlogId);
  return (
    '<button class="save-btn' + (saved ? ' saved' : '') + '" ' +
      'data-action="toggle-save" data-dl="' + devlogId + '" ' +
      'title="' + (saved ? 'Remove from Saved' : 'Save for later') + '">' +
      (saved ? '★ Saved' : '☆ Save') +
    '</button>'
  );
}