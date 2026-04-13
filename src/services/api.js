import axios from 'axios';

// ============================================
// GETYOURSTAY API SERVICE
// ============================================

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.manageyourpg.com/api/getyourstay',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
const API_URL = "https://api.manageyourpg.com/api/auth";

export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const googleAuthUser = async (data) => {
  const res = await fetch(`${API_URL}/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};
export const pgApi = {
  // Get all PGs with filters
  getAll: async (params = {}) => {
    return await api.get('/', { params });
  },

  // Get single PG
  getById: async (id) => {
    return await api.get(`/${id}`);
  },

  // Get available areas/cities for filters
  getAreas: async () => {
    return await api.get('/areas');
  },

  // Get PGs by location
  getNearby: async (latitude, longitude, radius = 10) => {
    return await api.get('/', { 
      params: { latitude, longitude, radius } 
    });
  },
};

export default api;
