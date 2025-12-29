import api from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const login = async (formData: {
  username: string;
  password: string;
}) => {
  try {
    const res = await api.post(`${API_URL}/login`, formData);
    return res; // Mengembalikan full response (termasuk status & headers)
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    const res = await api.post(`${API_URL}/logout`);
    return res;
  } catch (err) {
    throw err;
  }
};
