import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9093',
});

export default api;
