import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const login = (username, password) => {
  return api.post('api-token-auth/', { username, password });
};

export const getProjects = () => {
  return api.get('projects/');
};

export const getTasks = () => {
  return api.get('tasks/');
};

export const createTask = (taskData) => {
  return api.post('tasks/', taskData);
};

export const updateTask = (taskId, taskData) => {
  return api.put(`tasks/${taskId}/`, taskData);
};

export default api;