import { apiFetch } from './api.js';

export function login(data) {
  return apiFetch('/auth/login', { method: 'POST', data });
}

export function getMe() {
  return apiFetch('/auth/me', { method: 'GET' });
}

export function logout() {
  return apiFetch('/auth/logout', { method: 'POST' });
}