import { sfx } from '../audio/sfx.js';

let toastEl = null;
let toastTimer = null;

export function showToast(msg, kind) {
  sfx(kind || 'notification');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}