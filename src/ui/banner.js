import { STATE, onOfflineChange, saveState } from '../state.js';

let el = null;
let dismissed = false;
let unsubscribe = null;

function ensureEl() {
  if (el) return el;
  el = document.createElement('div');
  el.id = 'offline-banner';
  el.className = 'offline-banner hidden';
  el.innerHTML =
    '<span class="ob-dot" aria-hidden="true"></span>' +
    '<span class="ob-text">Offline — changes are saved locally and will sync when the server is back.</span>' +
    '<button class="ob-retry" type="button">Retry</button>' +
    '<button class="ob-dismiss" type="button" aria-label="Dismiss">&times;</button>';
  document.body.appendChild(el);

  el.querySelector('.ob-dismiss').addEventListener('click', () => {
    dismissed = true;
    render();
  });
  el.querySelector('.ob-retry').addEventListener('click', async () => {
    const btn = el.querySelector('.ob-retry');
    btn.disabled = true;
    btn.textContent = 'Retrying…';
    const result = await saveState();
    btn.disabled = false;
    btn.textContent = 'Retry';
    if (result.ok) dismissed = false;
    render();
  });

  return el;
}

function render() {
  if (!el) return;
  const visible = STATE.offline && !dismissed;
  el.classList.toggle('hidden', !visible);
}

export function initBanner() {
  ensureEl();
  if (!unsubscribe) {
    unsubscribe = onOfflineChange(() => {
      if (!STATE.offline) dismissed = false;
      render();
    });
  }
  render();
}