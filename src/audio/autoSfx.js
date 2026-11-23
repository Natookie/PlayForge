import { sfx } from './sfx.js';

const SELECTOR = [
  'a', 'button', 'select', 'summary',
  '[role="button"]', '[role="tab"]', '[role="link"]',
  '.post-card', '.game-card', '.thread-item',
  '.sponsor-tier', '.tab', '.filter-reset',
  'input[type="checkbox"]', 'input[type="radio"]',
].join(',');

const OPT_OUT_ATTR = 'data-sfx';

const HOVER_COOLDOWN_MS = 120;
const PRESS_COOLDOWN_MS = 60;

let hoverEnabled = true;
let pressEnabled = true;
let lastHoverTs = 0;
let lastPressTs = 0;
let lastHoverEl = null;
let initialized = false;

function prefersReducedMotion() {
  return window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function closestMatch(el) {
  if (!el || el.nodeType !== 1) return null;
  const hit = el.closest(SELECTOR);
  if (!hit) return null;
  if (hit.closest('[' + OPT_OUT_ATTR + '="off"]')) return null;
  return hit;
}

function onPointerOver(e) {
  if (!hoverEnabled) return;
  const hit = closestMatch(e.target);
  if (!hit) return;
  if (hit === lastHoverEl) return;
  const now = Date.now();
  if (now - lastHoverTs < HOVER_COOLDOWN_MS) {
    lastHoverEl = hit;
    return;
  }
  lastHoverTs = now;
  lastHoverEl = hit;
  sfx('hover');
}

function onPointerOut(e) {
  const hit = closestMatch(e.target);
  if (!hit) return;
  const to = e.relatedTarget;
  if (to && hit.contains(to)) return;
  if (lastHoverEl === hit) lastHoverEl = null;
}

function onPointerDown(e) {
  if (!pressEnabled) return;
  const hit = closestMatch(e.target);
  if (!hit) return;
  const now = Date.now();
  if (now - lastPressTs < PRESS_COOLDOWN_MS) return;
  lastPressTs = now;
  sfx('press');
}

export function initAutoSfx() {
  if (initialized) return;
  initialized = true;

  if (prefersReducedMotion()) {
    hoverEnabled = false;
    pressEnabled = false;
    return;
  }

  document.addEventListener('pointerover', onPointerOver, { passive: true });
  document.addEventListener('pointerout', onPointerOut, { passive: true });
  document.addEventListener('pointerdown', onPointerDown, { passive: true });
}

export function setAutoHoverEnabled(on) {
  hoverEnabled = !!on;
}

export function setAutoPressEnabled(on) {
  pressEnabled = !!on;
}

export function isAutoHoverEnabled() { return hoverEnabled; }
export function isAutoPressEnabled() { return pressEnabled; }