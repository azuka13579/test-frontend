import api from "@/lib/axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const fetchAllStudents = async () => {
  try {
    const res = await api.get(`${API_URL}/students`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchStudents = async (
  keyword: string = "",
  page: number = 1,
  pagination: number = 10
) => {
  try {
    const res = await api.get(`${API_URL}/students?page=${page}`, {
      params: { search: keyword, pagination: pagination },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchStudent = async (id: string) => {
  try {
    const res = await api.get(`${API_URL}/students/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createStudent = async (studentdata: {
  name: string;
  student_id: string;
  email: string;
}) => {
  try {
    const res = await api.post(`${API_URL}/students`, studentdata);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateStudent = async (
  id: string,
  studentdata: { name: string; student_id: string; email: string }
) => {
  try {
    const res = await api.post(`${API_URL}/students/${id}`, studentdata);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteStudent = async (id: string) => {
  try {
    const res = await api.delete(`${API_URL}/students/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
