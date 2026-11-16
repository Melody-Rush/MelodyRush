import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'https://melodyrush.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

// Interceptor: adjunta el token JWT en cada petición saliente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || localStorage.getItem('token');
    if (token && token !== 'token-admin-demo') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: si el backend responde 401 (token vencido o inválido), limpia sesión
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    return Promise.reject(error);
  }
);

export default api;