import { apiFetch } from "./api";

export function getProductos({ page = 1, search = '' } = {}) {
  const params = new URLSearchParams();
  if (page) params.append('page', page);
  if (search) params.append('search', search);
  return apiFetch(`/productos?${params.toString()}`, { method: "GET" });
}

export function createProducto(data) {
  const { name, description, stock_min } = data;
  return apiFetch('/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ name, description, stock_min }),
  });
}

export function updateProducto(id, data) {
  const { name, description, stock_min } = data;
  return apiFetch(`/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ name, description, stock_min }),
  });
}

export function deleteProducto(id) {
  return apiFetch(`/productos/${id}`, {
    method: 'DELETE',
  });
}