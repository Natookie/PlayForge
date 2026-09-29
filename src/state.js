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
};

let lastVersion = 0;
let pollHandle = null;

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

//Public API
export async function loadState() {
  try {
    const res = await fetch(API + '?_=' + Date.now());
    const data = await res.json();
    if (data && data.state) {
      applyStateFromServer(data.state);
      lastVersion = data.version || 0;
    } else {
      seedAll();
      await saveState();
    }
  } catch (e) {
    seedAll();
    console.warn('Could not reach state server. Running with local seeds.', e);
  }
}

export async function saveState() {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: snapshot() }),
    });
    const data = await res.json();
    if (data && data.version) lastVersion = data.version;
  } catch (e) {
    console.warn('Could not save state to server.', e);
  }
}

export async function resetDemo() {
  seedAll();
  await saveState();
}

//Polling

export function startPolling(onNewState) {
  if (pollHandle) clearInterval(pollHandle);
  pollHandle = setInterval(async () => {
    try {
      const res = await fetch(API + '?_=' + Date.now());
      const data = await res.json();
      if (!data || !data.state) return;
      if ((data.version || 0) <= lastVersion) return;

      applyStateFromServer(data.state);
      lastVersion = data.version;
      if (onNewState) onNewState();
    } catch (e) {
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