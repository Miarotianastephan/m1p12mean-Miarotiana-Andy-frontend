import axios from 'axios';
const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://m1p12mean-andy-miarotiana-backend.onrender.com';
const instanceAxios = axios.create({ baseURL: BASE_URL });
export default instanceAxios;
