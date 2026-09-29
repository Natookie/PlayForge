export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

export function timeAgo(iso) {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return mins + 'm ago';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h ago';
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + 'd ago';
  return Math.floor(days / 30) + 'mo ago';
}

export function ago(msAgo) {
  return new Date(Date.now() - msAgo).toISOString();
}

export const HOUR = 3600 * 1000;
export const DAY = 24 * HOUR;

export function pick(arr, seed) {
  return arr[hashString(String(seed)) % arr.length];
}

export function pickInt(seed, min, max) {
  return min + (hashString(String(seed)) % (max - min + 1));
}

export function pickN(arr, n, seed) {
  const copy = arr.slice();
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = hashString(String(seed) + ':' + i) % copy.length;
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}