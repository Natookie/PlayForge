const PACK = 'organic';
const BASE = 'src/audio/' + PACK + '/';

const CUES = [
  'notification', 'success', 'warning', 'error',
  'select', 'release', 'toggle-on', 'toggle-off',
  'expand', 'collapse',
  'hover', 'press'
];

const POOL_SIZE = 4;

const POOL = new Map();
let enabled = localStorage.getItem('playforge-sfx-enabled') !== 'false';
let volume = parseFloat(localStorage.getItem('playforge-sfx-volume') || '0.6');
let unlocked = false;

function buildPool(cue) {
  const arr = [];
  for (let i = 0; i < POOL_SIZE; i++) {
    const a = new Audio(BASE + cue + '.mp3');
    a.preload = 'auto';
    a.volume = volume;
    arr.push(a);
  }
  return arr;
}

function nextFromPool(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].paused || arr[i].ended) return arr[i];
  }
  arr[arr.length - 1].currentTime = 0;
  return arr[arr.length - 1];
}

export function initSFX() {
  CUES.forEach((cue) => {
    const pool = buildPool(cue);
    POOL.set(cue, pool);
    pool.forEach((a) => {
      try { a.load(); } catch (e) {}
    });
  });

  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    const pool = POOL.get('select');
    if (!pool || !pool[0]) return;
    const probe = pool[0];
    const prevVol = probe.volume;
    probe.volume = 0;
    const p = probe.play();
    if (p && p.catch) p.catch(() => {});
    if (p && p.then) p.then(() => { probe.volume = prevVol; });
    document.removeEventListener('pointerdown', unlock, true);
    document.removeEventListener('keydown', unlock, true);
  };
  document.addEventListener('pointerdown', unlock, true);
  document.addEventListener('keydown', unlock, true);
}

export function sfx(cue) {
  if (!enabled) return;
  const pool = POOL.get(cue);
  if (!pool) return;

  const a = nextFromPool(pool);
  try {
    a.currentTime = 0;
  } catch (e) {}
  a.volume = volume;
  const p = a.play();
  if (p && p.catch) p.catch(() => {});
}

export function setSFXEnabled(on) {
  enabled = !!on;
  localStorage.setItem('playforge-sfx-enabled', enabled ? 'true' : 'false');
}

export function isSFXEnabled() {
  return enabled;
}

export function setSFXVolume(v) {
  const n = Math.max(0, Math.min(1, parseFloat(v) || 0));
  volume = n;
  localStorage.setItem('playforge-sfx-volume', String(n));
  POOL.forEach((pool) => {
    pool.forEach((a) => { a.volume = n; });
  });
}

export function getSFXVolume() {
  return volume;
}