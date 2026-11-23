import { GAMES } from './data/games.js';
import { DEVLOGS } from './data/devlogs.js';
import { SEED_FEEDBACK } from './data/feedback.js';
import { DEVELOPERS } from './data/developers.js';

const API = 'api/state.php';

export const STATE = {
  games: [],
  devlogs: [],
  feedback: [],
  developers: [],
  saved: [],
  filters: { genre: 'All', engine: 'All', stage: 'All', feedback: 'All' },
  discoverTab: 'recent',
  currentUserId: 'dev-1',
  offline: false,
};

let lastVersion = 0;
let pollHandle = null;
let pendingSaves = 0;
const offlineListeners = new Set();

function notifyOfflineChange() {
  offlineListeners.forEach((fn) => {
    try { fn(STATE.offline); } catch (e) {}
  });
}

export function onOfflineChange(fn) {
  offlineListeners.add(fn);
  return () => offlineListeners.delete(fn);
}

function setOffline(value) {
  const next = !!value;
  if (STATE.offline === next) return;
  STATE.offline = next;
  notifyOfflineChange();
}

function freshGames() {
  return GAMES.map((g) => {
    const { devlogPlan, ...rest } = g;
    return { ...rest };
  });
}
function freshDevlogs() { return DEVLOGS.map((d) => ({ ...d })); }
function freshFeedback() {
  return SEED_FEEDBACK.map((f) => ({
    ...f,
    replies: (f.replies || []).map((r) => ({ ...r })),
  }));
}
function freshDevelopers() { return DEVELOPERS.map((d) => ({ ...d })); }

function seedAll() {
  STATE.games = freshGames();
  STATE.devlogs = freshDevlogs();
  STATE.feedback = freshFeedback();
  STATE.developers = freshDevelopers();
}

function applyStateFromServer(state) {
  if (!state) return;
  if (Array.isArray(state.games)) STATE.games = state.games;
  if (Array.isArray(state.devlogs)) STATE.devlogs = state.devlogs;
  if (Array.isArray(state.feedback)) STATE.feedback = state.feedback;
  if (Array.isArray(state.developers)) STATE.developers = state.developers;
  if (Array.isArray(state.saved)) STATE.saved = state.saved;
}

function snapshot() {
  return {
    games: STATE.games,
    devlogs: STATE.devlogs,
    feedback: STATE.feedback,
    developers: STATE.developers,
    saved: STATE.saved,
  };
}

export async function loadState() {
  try {
    const res = await fetch(API + '?_=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (data && data.state) {
      applyStateFromServer(data.state);
      lastVersion = data.version || 0;
      setOffline(false);
    } else {
      seedAll();
      setOffline(true);
      const saved = await saveState();
      if (saved.ok) setOffline(false);
    }
  } catch (e) {
    seedAll();
    setOffline(true);
    console.warn('Could not reach state server. Running with local seeds.', e);
  }
}

export async function saveState() {
  pendingSaves++;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: snapshot() }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (data && data.version) {
      lastVersion = data.version;
      setOffline(false);
      return { ok: true, version: data.version };
    }
    setOffline(true);
    return { ok: false };
  } catch (e) {
    console.warn('Could not save state to server.', e);
    setOffline(true);
    return { ok: false };
  } finally {
    pendingSaves--;
  }
}

export async function resetDemo() {
  seedAll();
  return saveState();
}

export function startPolling(onNewState) {
  if (pollHandle) clearInterval(pollHandle);
  pollHandle = setInterval(async () => {
    if (pendingSaves > 0) return;
    try {
      const res = await fetch(API + '?_=' + Date.now());
      if (!res.ok) { setOffline(true); return; }
      const data = await res.json();
      if (!data || !data.state) { setOffline(false); return; }
      setOffline(false);
      if ((data.version || 0) <= lastVersion) return;

      applyStateFromServer(data.state);
      lastVersion = data.version;
      if (onNewState) onNewState();
    } catch (e) {
      setOffline(true);
    }
  }, 3000);
}

export function stopPolling() {
  if (pollHandle) { clearInterval(pollHandle); pollHandle = null; }
}

export function setCurrentUser(id) {
  if (id) STATE.currentUserId = id;
}

let renderHandler = null;
let pendingOptions = null;
let scheduled = false;
export function onRender(fn) { renderHandler = fn; }
export function requestRender(opts) {
  pendingOptions = opts || {};
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    const options = pendingOptions || {};
    pendingOptions = null;
    if (renderHandler) renderHandler(options);
  });
}