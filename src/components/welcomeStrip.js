const EXPANDED_KEY = 'playforge-welcome-expanded';

function readExpanded() {
  try {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get('welcome');
    if (forced === '1') return true;
    if (forced === '0') return false;

    const stored = localStorage.getItem(EXPANDED_KEY);
    if (stored === '0') return false;
    if (stored === '1') return true;
  } catch (e) {
  }
  return true;
}

export function isWelcomeExpanded() {
  return readExpanded();
}

export function setWelcomeExpanded(expanded) {
  try {
    localStorage.setItem(EXPANDED_KEY, expanded ? '1' : '0');
  } catch (e) {}
}

export function clearWelcomeExpanded() {
  try {
    localStorage.removeItem(EXPANDED_KEY);
  } catch (e) {}
}

export function welcomeStrip() {
  const expanded = readExpanded();

  const duck =
    '<svg viewBox="0 0 32 32" width="26" height="26" focusable="false" aria-hidden="true">' +
      '<path d="M22 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" fill="currentColor"/>' +
      '<path d="M10.5 12.5c0-1 .8-1.8 1.8-1.8h4.3c2.6 0 4.7 2.1 4.7 4.7v.3c0 3.6-2.9 6.5-6.5 6.5h-1.2c-2 0-3.6-1.6-3.6-3.6v-2.1c0-.9.7-1.6 1.6-1.6h4.1v-1.2a1.2 1.2 0 0 0-1.2-1.2h-2.9c-.6 0-1.1-.5-1.1-1.1z" fill="currentColor"/>' +
      '<path d="M6.5 14.5l3 2-3 2z" fill="currentColor"/>' +
    '</svg>';

  const header =
    '<div class="welcome-head">' +
      '<div class="welcome-mark">' + duck + '</div>' +
      '<h2 class="welcome-title">Welcome to PlayForge</h2>' +
      '<button class="welcome-toggle" id="welcome-toggle" type="button" aria-expanded="' + (expanded ? 'true' : 'false') + '">' +
        (expanded ? 'Show less ▴' : 'Show more ▾') +
      '</button>' +
    '</div>';

  const intro =
    '<p class="welcome-intro">' +
      'A place for game developers to share what they are building and get useful feedback before release.' +
    '</p>';

  const detail = expanded
    ? '<div class="welcome-detail">' +
        '<div class="welcome-section">' +
          '<h3>How it works</h3>' +
          '<ol class="welcome-steps">' +
            '<li>Post a devlog about what you are building.</li>' +
            '<li>Ask for the feedback you actually need.</li>' +
            '<li>Browse the Feedback Queue to help others.</li>' +
            '<li>Get notes from devs who have been where you are.</li>' +
          '</ol>' +
        '</div>' +
        '<div class="welcome-section">' +
          '<h3>The tabs</h3>' +
          '<ul class="welcome-legend">' +
            '<li><span class="wl-k">Recent</span><span class="wl-v">every devlog, newest first</span></li>' +
            '<li><span class="wl-k">Needs feedback</span><span class="wl-v">open requests, sorted by need</span></li>' +
            '<li><span class="wl-k">Saved</span><span class="wl-v">devlogs you have bookmarked</span></li>' +
          '</ul>' +
        '</div>' +
        '<div class="welcome-actions">' +
          '<a class="btn btn-primary" href="#/create">Create a devlog</a>' +
          '<button class="btn btn-secondary" id="welcome-cta" type="button">See what needs feedback</button>' +
        '</div>' +
      '</div>'
    : '';

  return (
    '<div class="welcome-strip' + (expanded ? ' expanded' : '') + '">' +
      header +
      intro +
      detail +
    '</div>'
  );
}