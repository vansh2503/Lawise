// src/utils/axiosConfig.js
import axios from 'axios';

// Create axios interceptor to add authentication token to all requests
const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;