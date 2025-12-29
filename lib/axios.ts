import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor: Setiap request akan dicek apakah ada token di cookie
api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token"); // Ambil token dari JS Cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
