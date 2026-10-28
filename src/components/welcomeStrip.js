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

  const forge =
    '<div class="forge-mark">' +
      '<svg viewBox="0 0 64 64" width="56" height="56" focusable="false" aria-hidden="true">' +
        '<path d="M32 6 L38 26 L58 32 L38 38 L32 58 L26 38 L6 32 L26 26 Z" ' +
              'fill="currentColor" opacity="0.95"/>' +
        '<path d="M32 22 L35 29 L42 32 L35 35 L32 42 L29 35 L22 32 L29 29 Z" ' +
              'fill="var(--panel)" opacity="0.55"/>' +
        '<circle cx="32" cy="32" r="1.8" fill="var(--accent)"/>' +
      '</svg>' +
    '</div>';

  const head =
    '<div class="welcome-head">' +
      forge +
      '<div class="welcome-head-text">' +
        '<h2 class="welcome-title">Welcome to Playforge</h2>' +
        '<p class="welcome-intro">A place for game developers to share what they are building and get useful feedback before release.</p>' +
      '</div>' +
      '<button class="welcome-toggle" id="welcome-toggle" type="button" aria-expanded="' + (expanded ? 'true' : 'false') + '">' +
        (expanded ? 'Show less' : 'Show more') +
      '</button>' +
    '</div>';

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
      head +
      detail +
    '</div>'
  );
}