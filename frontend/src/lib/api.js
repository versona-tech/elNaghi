import axios from 'axios';

// API URL - يدعم Netlify Functions أو External Backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (data) => api.post('/api/auth/register', data),
  me: () => api.get('/api/auth/me'),
  updatePassword: (data) => api.put('/api/auth/update-password', data),
};

// Messages API
export const messagesAPI = {
  getAll: (params) => api.get('/api/messages', { params }),
  getById: (id) => api.get(`/api/messages/${id}`),
  create: (data) => api.post('/api/messages', data),
  update: (id, data) => api.put(`/api/messages/${id}`, data),
  delete: (id) => api.delete(`/api/messages/${id}`),
  getStats: () => api.get('/api/messages/stats/summary'),
};

// News API
export const newsAPI = {
  getAll: (params) => api.get('/api/news', { params }),
  getById: (id) => api.get(`/api/news/${id}`),
  create: (data) => api.post('/api/news', data),
  update: (id, data) => api.put(`/api/news/${id}`, data),
  delete: (id) => api.delete(`/api/news/${id}`),
};

// Events API
export const eventsAPI = {
  getAll: (params) => api.get('/api/events', { params }),
  getById: (id) => api.get(`/api/events/${id}`),
  create: (data) => api.post('/api/events', data),
  update: (id, data) => api.put(`/api/events/${id}`, data),
  delete: (id) => api.delete(`/api/events/${id}`),
};

// Program API
export const programAPI = {
  getAll: (params) => api.get('/api/program', { params }),
  getById: (id) => api.get(`/api/program/${id}`),
  create: (data) => api.post('/api/program', data),
  update: (id, data) => api.put(`/api/program/${id}`, data),
  delete: (id) => api.delete(`/api/program/${id}`),
};

// Media API
export const mediaAPI = {
  getAll: (params) => api.get('/api/media', { params }),
  upload: (formData) => api.post('/api/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/api/media/${id}`, data),
  delete: (id) => api.delete(`/api/media/${id}`),
};

export default api;
