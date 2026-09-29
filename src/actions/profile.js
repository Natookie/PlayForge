import { saveState, requestRender } from '../state.js';
import { getCurrentUser } from '../selectors.js';
import { showToast } from '../ui/toast.js';

export function bindProfileEdit() {
  const editBtn = document.getElementById('edit-profile-btn');
  const editForm = document.getElementById('profile-edit-form');
  const cancelBtn = document.getElementById('cancel-profile');
  const saveBtn = document.getElementById('save-profile');

  if (editBtn && editForm) editBtn.addEventListener('click', () => {
    editForm.classList.toggle('hidden');
  });
  if (cancelBtn && editForm) cancelBtn.addEventListener('click', () => {
    editForm.classList.add('hidden');
  });
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const me = getCurrentUser();
    const name = document.getElementById('p-name').value.trim();
    const handle = document.getElementById('p-handle').value.trim();
    const bio = document.getElementById('p-bio').value.trim();
    if (!name || !handle) { showToast('Name and handle cannot be empty.'); return; }

    me.name = name;
    me.handle = handle;
    me.bio = bio;

    saveState();
    showToast('Profile updated.');
    requestRender({ scroll: false });
  });
}