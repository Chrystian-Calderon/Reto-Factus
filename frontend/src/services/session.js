import { apiFetch } from './api';

export async function getSession() {
  try {
    const res = await apiFetch('/auth/me', { method: 'GET' });
    if (res && res.success && res.user) {
      return res.user;
    }
    return null;
  } catch (err) {
    return null;
  }
}
