// api.js
import axios from 'axios';

const api = axios.create({
  timeout: 3000,
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token') as string);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { api };
