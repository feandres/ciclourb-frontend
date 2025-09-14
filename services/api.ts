import axios from 'axios';
const API_ROUTE = process.env.NEXT_PUBLIC_API_ROUTE || "https://ciclourb-backend.vercel.app/api";

const api = axios.create({
  baseURL: API_ROUTE
});

export default api;