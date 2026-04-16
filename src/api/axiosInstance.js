import axios from 'axios';

const api = axios.create({
    // Hardcode: Tanpa variabel lingkungan agar tidak undefined saat build
    baseURL: '/api', 
});

// Middleware selipkan JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;