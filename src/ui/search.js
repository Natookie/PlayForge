import { searchAll } from '../selectors.js';
import { escapeHtml } from '../utils.js';

export function setupSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  const close = () => { results.classList.add('hidden'); results.innerHTML = ''; };

  input.addEventListener('input', () => {
    const q = input.value;
    if (!q.trim()) return close();

    const { games, devs } = searchAll(q);

    if (!games.length && !devs.length) {
      results.innerHTML = '<div style="padding:10px 12px;color:var(--muted);font-size:12px;">No matches.</div>';
      results.classList.remove('hidden');
      return;
    }

    let html = '';
    games.forEach((g) => {
      html +=
        '<a href="#/game/' + g.id + '" data-search-link>' +
          '<div class="sr-title">' + escapeHtml(g.title) + '</div>' +
          '<div class="sr-sub">' + escapeHtml(g.stage) + '</div>' +
        '</a>';
    });
    devs.forEach((d) => {
      html +=
        '<a href="#/profile/' + d.id + '" data-search-link>' +
          '<div class="sr-title">' + escapeHtml(d.name) + '</div>' +
          '<div class="sr-sub">@' + escapeHtml(d.handle) + '</div>' +
        '</a>';
    });

    results.innerHTML = html;
    results.classList.remove('hidden');

    results.querySelectorAll('[data-search-link]').forEach((a) => {
      a.addEventListener('click', () => { input.value = ''; close(); });
    });
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) close();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { input.value = ''; close(); }
  });
}