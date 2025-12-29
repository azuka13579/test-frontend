"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { fetchStudent, updateStudent } from "../../../../api/student";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SkeletonCard from "@/components/common/skeletoncard";

export default function updateStudentPage({
  params,
}: {
  params: { id: string };
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    student_id: "",
    email: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    try {
      const id = (await params).id;
      const res = await updateStudent(id, formData);
      toast.success(res.message);
      setFormData({ name: "", student_id: "", email: "" });
      router.push(`/students/${id}`);
      setSaving(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      setSaving(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getStudent = async () => {
      try {
        const id = (await params).id;
        const res = await fetchStudent(id);
        setFormData(res.data);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getStudent();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto">Update Student Page</h1>
      {loading ? (
        <>
          <SkeletonCard></SkeletonCard>
        </>
      ) : (
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
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
            className="px-4 py-2 bg-gray-200 rounded-2xl text-black hover:bg-gray-300 transition"
            type="submit"
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Simpan Data"}
          </button>
        </form>
      )}
    </div>
  );
}
