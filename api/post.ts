import api from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const fetchPosts = async (
  keyword: string = "",
  page: number = 1,
  pagination: number = 10
) => {
  try {
    const res = await api.get(`${API_URL}/posts?page=${page}`, {
      params: { search: keyword, pagination: pagination },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchPostsUser = async (
  keyword: string = "",
  page: number = 1,
  pagination: number = 10,
  userid: string = ""
) => {
  try {
    const res = await api.get(`${API_URL}/posts/user?page=${page}`, {
      params: { search: keyword, pagination: pagination, userid: userid },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchPost = async (id: string) => {
  try {
    const res = await api.get(`${API_URL}/posts/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createPost = async (formData: FormData) => {
  try {
    const res = await api.post(`${API_URL}/posts`, formData);
    return res.data;
  } catch (err) {
    console.error("Create post error:", err);
    throw err;
  }
};

export const updatePost = async (id: string, formData: FormData) => {
  try {
    const res = await api.post(`${API_URL}/posts/${id}`, formData);
    return res.data;
  } catch (err) {
    console.error("Create post error:", err);
    throw err;
  }
};

export const updateStudent = async (
  id: string,
  studentdata: { name: string; student_id: string; email: string }
) => {
  try {
    const res = await api.patch(`${API_URL}/posts/${id}`, studentdata);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deletePost = async (id: string) => {
  try {
    const res = await api.delete(`${API_URL}/posts/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
