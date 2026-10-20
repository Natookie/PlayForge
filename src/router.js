import { STATE } from './state.js';
import { getCurrentUser } from './selectors.js';
import { renderDiscover } from './pages/discover.js';
import { renderGamePage } from './pages/game.js';
import { renderDevlogDetail } from './pages/devlog.js';
import { renderCreate } from './pages/create.js';
import { renderProfile, renderMyGames } from './pages/profile.js';
import { renderPortfolio } from './pages/portfolio.js';
import { bindPageEvents } from './actions/bindings.js';

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  const parts = pathPart.split('/').filter(Boolean);

  const query = {};
  if (queryPart) {
    new URLSearchParams(queryPart).forEach((v, k) => { query[k] = v; });
  }

  if (parts.length === 0) return { name: 'discover', query };
  if (parts[0] === 'devlog' && parts[1]) return { name: 'devlog', id: parts[1], query };
  if (parts[0] === 'game' && parts[1]) return { name: 'game', id: parts[1], query };
  if (parts[0] === 'create') return { name: 'create', query };
  if (parts[0] === 'profile' && parts[1]) return { name: 'profile', id: parts[1], query };
  if (parts[0] === 'portfolio' && parts[1]) return { name: 'portfolio', id: parts[1], query };
  if (parts[0] === 'my-games') return { name: 'my-games', query };
  if (parts[0] === 'queue') return { name: 'queue', query };
  return { name: 'discover', query };
}

function routeKey(route) {
  return route.name + (route.id ? ':' + route.id : '');
}

let lastRouteKey = '';

export function render(opts) {
  opts = opts || {};
  const route = parseHash();
  const app = document.getElementById('app');

  let html = '';
  if (route.name === 'devlog') html = renderDevlogDetail(route.id);
  else if (route.name === 'game') html = renderGamePage(route.id);
  else if (route.name === 'create') html = renderCreate(route.query || {});
  else if (route.name === 'profile') html = renderProfile(route.id);
  else if (route.name === 'my-games') html = renderMyGames();
  else if (route.name === 'portfolio') html = renderPortfolio(route.id);
  else if (route.name === 'queue') {
    STATE.discoverTab = 'feedback';
    html = renderDiscover();
  } else {
    html = renderDiscover();
  }

  const key = routeKey(route);
  const routeChanged = key !== lastRouteKey;
  const savedScroll = window.scrollY;
  lastRouteKey = key;

  app.innerHTML = html;

  updateActiveNav(route);
  updateHeaderAvatar();

  if (opts.scroll === true) {
    window.scrollTo(0, 0);
  } else if (opts.scroll === false) {
    window.scrollTo(0, savedScroll);
  } else if (routeChanged) {
    window.scrollTo(0, 0);
  } else {
    window.scrollTo(0, savedScroll);
  }

  bindPageEvents(route);
}

function updateActiveNav(route) {
  let target = null;
  if (route.name === 'discover' || route.name === 'queue') target = 'discover';
  else if (route.name === 'create') target = 'create';
  else if (route.name === 'my-games') target = 'my-games';
  else if (route.name === 'profile') {
    target = route.id === STATE.currentUserId ? 'my-games' : null;
  }
  else if (route.name === 'portfolio') {
    target = route.id === STATE.currentUserId ? 'my-games' : null;
  }

  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.classList.toggle('active', el.getAttribute('data-nav') === target);
  });
}

function updateHeaderAvatar() {
  const el = document.getElementById('header-avatar');
  if (!el) return;
  const me = getCurrentUser();
  if (!me) return;
  const initials = me.name.split(' ').filter(Boolean).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  el.textContent = initials;
  el.title = me.name;
  el.setAttribute('href', '#/profile/' + me.id);
}