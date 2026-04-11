import axios from 'axios';

const api = axios.create({
  // Gunakan import.meta.env untuk membaca file .env di Vite
  baseURL: import.meta.env.VITE_API_URL, 
});

// Middleware Axios: Otomatis selipkan Token setiap kali request dikirim
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