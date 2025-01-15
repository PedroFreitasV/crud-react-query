import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6787e4dac4a42c916108a850.mockapi.io/api/user',
});

export default api;

