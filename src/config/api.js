const DEFAULT_API_URL = 'http://localhost:5001';

const normalizeBaseUrl = (url) => (url || DEFAULT_API_URL).replace(/\/+$/, '');

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL);

export const API_ENDPOINTS = {
  products: '/productos',
  productById: (id) => `/productos/${id}`,
  productsByCategory: (category) => `/productos?category=${encodeURIComponent(category)}`,
  users: '/registro',
  appointments: '/citas',
  contact: '/contacto',
};
