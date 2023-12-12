import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://0.0.0.0:3005',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
