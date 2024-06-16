import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, { username, password });
  return response.data;
};

export const register = async (username, password, email) => {
  const response = await axios.post(`${API_URL}/register/`, { username, password, email });
  return response.data;
};
