import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function apiFetch(endpoint, { method = 'GET', data, token } = {}) {
  const config = {
    method,
    url: endpoint,
    data,
  };
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: 'Error de red o servidor' };
  }
}
