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

const hostelApi = axios.create({
  baseURL: process.env.REACT_APP_HOSTEL_API_URL || 'https://manageyourhostelapi.codextechinnovations.com/api/getyourstay',
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

hostelApi.interceptors.request.use(
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

hostelApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Hostel API Error:', error.response?.data || error.message);
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

  // Get platform stats (verified PGs, areas covered, happy tenants) - not paginated
  getStats: async () => {
    return await api.get('/stats');
  },

};

export const hostelApiClient = {
  // Get all hostels with filters
  getAll: async (params = {}) => {
    return await hostelApi.get('/', { params });
  },

  // Get single hostel
  getById: async (id) => {
    return await hostelApi.get(`/${id}`);
  },

  // Get available areas/cities for filters
  getAreas: async () => {
    return await hostelApi.get('/areas');
  },

  // Get hostels by location
  getNearby: async (latitude, longitude, radius = 10) => {
    return await hostelApi.get('/', {
      params: { latitude, longitude, radius }
    });
  },

  // Get platform stats from hostel listings
  getStats: async () => {
    const response = await hostelApi.get('/', { params: { limit: 1, page: 1 } });
    const total = response?.pagination?.total || response?.data?.length || 0;
    const areasRes = await hostelApi.get('/areas');
    const areas = areasRes?.data?.areas || [];
    return {
      success: true,
      data: {
        verifiedPGs: total,
        areasCovered: areas.length,
        happyTenants: 0
      }
    };
  },
};

const ENQUIRY_API = "https://api.manageyourpg.com/api/pg-en";

export const submitEnquiry = async (data) => {
  const res = await fetch(`${ENQUIRY_API}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export default api;
