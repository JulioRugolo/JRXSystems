import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

export async function fetchProjects() {
  const { data } = await api.get('/api/projects');
  return data;
}

export async function sendContact(payload) {
  const { data } = await api.post('/api/contact', payload);
  return data;
}
