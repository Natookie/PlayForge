const STORAGE_KEY = 'playforge-theme';
const VALID = ['dark', 'light'];

export function getTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (VALID.includes(stored)) return stored;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function setTheme(theme) {
  if (!VALID.includes(theme)) return;
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getTheme();
  setTheme(current === 'dark' ? 'light' : 'dark');
}

export function initTheme() {
  setTheme(getTheme());
}