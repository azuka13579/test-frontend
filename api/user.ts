import api from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const getUser = async () => {
  try {
    const res = await api.get(`${API_URL}/user`);
    console.log("getUser response:", res);
    return res;
  } catch (err) {
    console.error("getUser error:", err);
    throw err;
  }
};
