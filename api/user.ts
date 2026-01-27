import api from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const getUser = async () => {
  try {
    const res = await api.get(`${API_URL}/user`);
    return res;
  } catch (err) {
    throw err;
  }
};
