"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { createStudent } from "../../../api/student";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function TambahStudentPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    student_id: "",
    email: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await createStudent(formData);
      toast.success(res.message);
      setFormData({ name: "", student_id: "", email: "" });

      router.push("/students");
      setLoading(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Tambah Student Page</h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 text-black"
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="border-2 rounded-md p-1"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Student ID</label>
          <input
            type="text"
            name="student_id"
            className="border-2 rounded-md p-1"
            value={formData.student_id}
            onChange={(e) =>
              setFormData({ ...formData, student_id: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            className="border-2 rounded-md p-1"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <button
          className="px-4 py-2 bg-gray-300 rounded-2xl text-black hover:bg-gray-500 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Tambah Data"}
        </button>
      </form>
    </div>
  );
}
