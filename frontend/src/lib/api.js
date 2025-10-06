import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
  updatePassword: (data) => api.put('/auth/update-password', data),
};

// Messages API
export const messagesAPI = {
  getAll: (params) => api.get('/messages', { params }),
  getById: (id) => api.get(`/messages/${id}`),
  create: (data) => api.post('/messages', data),
  update: (id, data) => api.put(`/messages/${id}`, data),
  delete: (id) => api.delete(`/messages/${id}`),
  getStats: () => api.get('/messages/stats/summary'),
};

// News API
export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getById: (id) => api.get(`/news/${id}`),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
};

// Events API
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

// Program API
export const programAPI = {
  getAll: (params) => api.get('/program', { params }),
  getById: (id) => api.get(`/program/${id}`),
  create: (data) => api.post('/program', data),
  update: (id, data) => api.put(`/program/${id}`, data),
  delete: (id) => api.delete(`/program/${id}`),
};

// Media API
export const mediaAPI = {
  getAll: (params) => api.get('/media', { params }),
  upload: (formData) => api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  update: (id, data) => api.put(`/media/${id}`, data),
  delete: (id) => api.delete(`/media/${id}`),
};

export default api;
