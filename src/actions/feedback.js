import { STATE, saveState, requestRender } from '../state.js';
import { getCurrentUser, getDevlog, isCurrentUserOwnerOfDevlog } from '../selectors.js';
import { showToast } from '../ui/toast.js';
import { sfx } from '../audio/sfx.js';

function clearFeedbackErrors() {
  const err = document.getElementById('fb-text-error');
  if (err) err.classList.add('hidden');
  const ta = document.getElementById('fb-text');
  if (ta) ta.classList.remove('invalid');
}

function composeFeedbackText(base, tried, expected, happened) {
  const parts = [];
  if (tried) parts.push('What I tried: ' + tried);
  if (expected) parts.push('What I expected: ' + expected);
  if (happened) parts.push('What happened: ' + happened);
  if (parts.length === 0) return base;
  if (base) return base + '\n\n' + parts.join('\n');
  return parts.join('\n');
}

export async function submitFeedback(devlogId) {
  const catEl = document.getElementById('fb-cat');
  const textEl = document.getElementById('fb-text');
  const errEl = document.getElementById('fb-text-error');
  const btn = document.getElementById('submit-feedback');
  if (!catEl || !textEl || !btn) return;

  const tried = (document.getElementById('fb-tried') || {}).value || '';
  const expected = (document.getElementById('fb-expected') || {}).value || '';
  const happened = (document.getElementById('fb-happened') || {}).value || '';

  const raw = textEl.value.trim();
  const structured = [tried, expected, happened].some((v) => v.trim());

  if (!raw && !structured) {
    errEl.textContent = 'Please write a short note, or fill in the structured fields.';
    errEl.classList.remove('hidden');
    textEl.classList.add('invalid');
    textEl.focus();
    sfx('error');
    return;
  }
  if (raw && raw.length < 8 && !structured) {
    errEl.textContent = 'That is quite short — could you add one concrete observation?';
    errEl.classList.remove('hidden');
    textEl.classList.add('invalid');
    textEl.focus();
    sfx('error');
    return;
  }

  const composed = composeFeedbackText(raw, tried.trim(), expected.trim(), happened.trim());

  btn.disabled = true;
  btn.textContent = 'Sending…';

  await new Promise((r) => setTimeout(r, 150));

  const me = getCurrentUser();
  const newFeedbackId = 'fb-' + Date.now();
  STATE.feedback.push({
    id: 'newFeedbackId',
    postId: devlogId,
    authorId: me.id,
    category: catEl.value,
    text: composed,
    timestamp: new Date().toISOString(),
    seenByDev: false,
    replies: [],
  });
  STATE._lastSubmittedFeedbackId = newFeedbackId;

  const result = await saveState();
  if (result.ok) {
    showToast('Feedback sent. Thanks!');
    sfx('success');
  } else {
    showToast('Saved locally — will sync when the server is back.');
    sfx('warning');
  }
  requestRender({ scroll: false });
}

export function bindFeedbackItemActions() {
  document.querySelectorAll('[data-action]').forEach((el) => {
    const action = el.getAttribute('data-action');
    const fbId = el.getAttribute('data-fb');

    if (action === 'toggle-reply') {
      el.addEventListener('click', () => {
        const form = document.querySelector('[data-reply-form="' + fbId + '"]');
        if (!form) return;
        form.classList.toggle('hidden');
        if (!form.classList.contains('hidden')) {
          const input = form.querySelector('textarea');
          if (input) input.focus();
          sfx('expand');
        } else {
          sfx('collapse');
        }
      });
    }

    if (action === 'submit-reply') {
      el.addEventListener('click', async () => {
        const input = document.querySelector('[data-reply-input="' + fbId + '"]');
        if (!input) return;
        const text = input.value.trim();
        if (!text) { showToast('Reply cannot be empty.'); input.focus(); return; }
        const fb = STATE.feedback.find((f) => f.id === fbId);
        if (!fb) return;
        const dl = getDevlog(fb.postId);
        const me = getCurrentUser();
        const amOwner = dl ? isCurrentUserOwnerOfDevlog(dl) : false;
        if (!fb.replies) fb.replies = [];
        fb.replies.push({
          id: 'r-' + Date.now(),
          authorId: me.id,
          text: text,
          timestamp: new Date().toISOString(),
        });
        if (amOwner) fb.seenByDev = true;
        const result = await saveState();
        if (!result.ok) showToast('Reply saved locally — will sync when the server is back.');
        sfx(result.ok ? 'success' : 'warning');
        requestRender({ scroll: false });
      });
    }

    if (action === 'mark-seen') {
      el.addEventListener('click', async () => {
        const fb = STATE.feedback.find((f) => f.id === fbId);
        if (!fb) return;
        const dl = getDevlog(fb.postId);
        if (!dl || !isCurrentUserOwnerOfDevlog(dl)) {
          showToast('Only the developer can mark their feedback as seen.');
          return;
        }
        fb.seenByDev = !fb.seenByDev;
        const result = await saveState();
        if (!result.ok) showToast('Change saved locally — will sync when the server is back.');
        sfx(result.ok ? 'select' : 'warning');
        requestRender({ scroll: false });
      });
    }

    if (action === 'mark-acted-on') {
      el.addEventListener('click', async () => {
        const fb = STATE.feedback.find((f) => f.id === fbId);
        if (!fb) return;
        const dl = getDevlog(fb.postId);
        if (!dl || !isCurrentUserOwnerOfDevlog(dl)) {
          showToast('Only the developer can mark this feedback as acted on.');
          return;
        }
        fb.actedOn = !fb.actedOn;
        if (fb.actedOn) fb.seenByDev = true;
        const result = await saveState();
        if (!result.ok) showToast('Change saved locally — will sync when the server is back.');
        sfx(result.ok ? 'success' : 'warning');
        requestRender({ scroll: false });
      });
    }
  });

  document.querySelectorAll('[data-reply-input]').forEach((ta) => {
    ta.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        const fbId = ta.getAttribute('data-reply-input');
        const btn = document.querySelector('[data-action="submit-reply"][data-fb="' + fbId + '"]');
        if (btn) btn.click();
      }
    });
  });
}

export function bindFeedbackForm(devlogId) {
  const open = document.getElementById('open-feedback');
  const wrap = document.getElementById('feedback-form-wrap');
  const cancel = document.getElementById('cancel-feedback');
  const toggle = document.getElementById('toggle-structured');
  const structured = document.getElementById('fb-structured');

  if (open && wrap) open.addEventListener('click', () => {
    wrap.classList.remove('hidden');
    const ta = document.getElementById('fb-text');
    if (ta) ta.focus();
  });
  if (cancel && wrap) cancel.addEventListener('click', () => {
    wrap.classList.add('hidden');
    clearFeedbackErrors();
  });
  if (toggle && structured) toggle.addEventListener('click', () => {
    const hidden = structured.classList.toggle('hidden');
    toggle.textContent = hidden ? '+ Add structure (what I tried / expected / happened)' : '− Hide structure';
  });

  const ta = document.getElementById('fb-text');
  if (ta) ta.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      submitFeedback(devlogId);
    }
  });

  const submit = document.getElementById('submit-feedback');
  if (submit) submit.addEventListener('click', () => submitFeedback(devlogId));
}