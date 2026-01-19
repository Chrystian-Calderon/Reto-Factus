import { apiFetch } from "./api.js";

export function getBodegas({ page = 1, search = '' } = {}) {
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (search) params.append('search', search);
  return apiFetch(`/bodegas?${params.toString()}`, { method: "GET" });
}

export function createBodega(data) {
  const { name, location, capacity } = data;
  return apiFetch('/bodegas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ name, location, capacity }),
  });
}

export function updateBodega(id, data) {
  const { name, location, capacity } = data;
  return apiFetch(`/bodegas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ name, location, capacity }),
  });
}

export function deleteBodega(id) {
  return apiFetch(`/bodegas/${id}`, {
    method: 'DELETE',
  });
}