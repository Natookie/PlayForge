import { escapeHtml } from '../utils.js';
import { getDeveloper } from '../selectors.js';

const SAMPLE_FUNDED = [
  { amount: 40, note: '6 hours on the decay system' },
  { amount: 25, note: 'Playtester pool for the flood level' },
  { amount: 15, note: 'Sound library license' },
];

const TIERS = [5, 10, 25];

export function sponsorPanel(game) {
  const dev = getDeveloper(game.developerId);
  const devName = dev ? dev.name : 'the developer';
  const firstName = devName.split(' ')[0];

  const tiersHtml = TIERS.map((amt) =>
    '<button type="button" class="sponsor-tier" data-amount="' + amt + '">$' + amt + '</button>'
  ).join('') +
    '<button type="button" class="sponsor-tier" data-amount="custom">Custom…</button>';

  const fundedHtml = SAMPLE_FUNDED.map((f) =>
    '<li>' +
      '<span class="funded-amt">$' + f.amount + '</span>' +
      '<span class="funded-note">' + escapeHtml(f.note) + '</span>' +
    '</li>'
  ).join('');

  return (
    '<div class="side-panel sponsor-panel">' +
      '<h3>Sponsor this project</h3>' +
      '<p class="sponsor-blurb">' +
        'Direct support for ' + escapeHtml(devName) + ', no ads, no tracking. ' +
        'PlayForge takes 3%.' +
      '</p>' +
      '<div class="sponsor-tiers">' + tiersHtml + '</div>' +
      '<button type="button" class="btn btn-secondary sponsor-continue" id="sponsor-continue" disabled>' +
        'Continue →' +
      '</button>' +
      '<div class="sponsor-preview-note">Preview only — no payment is processed.</div>' +
      '<div class="funded-block">' +
        '<div class="funded-label">Funded so far <span class="funded-sample">(sample data)</span></div>' +
        '<ul class="funded-list">' + fundedHtml + '</ul>' +
      '</div>' +
    '</div>' +
    '<div class="sponsor-modal-overlay hidden" id="sponsor-modal-overlay">' +
      '<div class="sponsor-modal" role="dialog" aria-modal="true" aria-labelledby="sponsor-modal-title">' +
        '<div class="sponsor-modal-head">' +
          '<h2 id="sponsor-modal-title">Sponsorship preview</h2>' +
          '<button type="button" class="sponsor-modal-close" id="sponsor-modal-close" aria-label="Close">×</button>' +
        '</div>' +
        '<div class="sponsor-modal-body">' +
          '<p><strong>This is a preview.</strong></p>' +
          '<p>Sponsorship isn\'t connected yet. This flow is a mock of what it will look like — no money is sent. The real flow would hand off to Stripe.</p>' +
          '<p>In the real product:</p>' +
          '<ul class="sponsor-modal-list">' +
            '<li>You sponsor ' + escapeHtml(firstName) + ' directly</li>' +
            '<li>PlayForge takes 3%</li>' +
            '<li>You get a sponsor badge on this project (visible to the dev only)</li>' +
            '<li>No recurring charge unless you set one up</li>' +
          '</ul>' +
        '</div>' +
        '<div class="sponsor-modal-actions">' +
          '<button type="button" class="btn btn-primary" id="sponsor-modal-ok">Got it</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}