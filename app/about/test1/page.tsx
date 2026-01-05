"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { createStudent } from "../../../api/student";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useForm } from "@tanstack/react-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(4, "Minimal 4 Karakter"),
  student_id: z.string().min(8, "Minimal 8 Karakter"),
  email: z.email("Masukan email yang valid"),
});

export default function TambahStudentPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      student_id: "",
      email: "",
    },
    validators: { onChange: formSchema },
    onSubmit: async ({ value }) => {
      setLoading(true);

      try {
        const res = await createStudent(value);
        toast.success(res.message);
        // setFormData({ name: "", student_id: "", email: "" });

        router.push("/students");
        setLoading(false);
      } catch (error: any) {
        const laravelErrors = error.response.data.errors;
        Object.keys(laravelErrors).forEach((key) => {
          const fieldName = key as "name" | "student_id" | "email";
          const errorMessage = laravelErrors[key][0]; // Ambil pesan error pertama
          console.log(`Menyuntikkan error ke field: ${key} -> ${errorMessage}`);

          // MAGIC HAPPENS HERE: Suntikkan error ke field spesifik
          form.setFieldMeta(fieldName, (prev) => ({
            ...prev,
            // Kita bungkus dalam object biar formatnya SAMA dengan Zod ({ message: ... })
            errors: [{ message: errorMessage }],
          }));
        });

        console.log(error.response.data.message);

        toast.error(error.response.data.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <h1>Tambah Student Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="flex justify-center flex-col max-w-2xl gap-2 mx-auto"
      >
        <form.Field name="name">
          {(field) => {
            // <--- Ganti ( dengan {
            // Sekarang kamu BISA deklarasi variabel disin
            const haserror = field.state.meta.errors.length > 0;

            return (
              // <--- Wajib tambah return
              <>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  type="text"
                  className={`${
                    haserror
                      ? "border-red-700 text-red-700"
                      : "border-black text-black"
                  }  rounded-xl p-2 border-2`}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {/* Kode error jadi jauh lebih ringkas */}
                {haserror && (
                  <em className="text-red-500 text-sm">
                    {field.state.meta.errors[0]?.message}
                  </em>
                )}
              </>
            );
          }}
        </form.Field>
        <form.Field
          name="student_id"
          children={(field) => (
            <>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                className="border-black rounded-xl p-2 border"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <em className="text-red-500 text-sm">
                  {/* Handle jika error dari Zod (Object) atau String biasa */}
                  {(field.state.meta.errors[0] as any)?.message ||
                    field.state.meta.errors[0]}
                </em>
              )}
            </>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                className="border-black rounded-xl p-2 border"
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <em className="text-red-500 text-sm">
                  {/* Handle jika error dari Zod (Object) atau String biasa */}
                  {(field.state.meta.errors[0] as any)?.message ||
                    field.state.meta.errors[0]}
                </em>
              )}
            </>
          )}
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 border-2 border-black hover:bg-black rounded-2xl hover:text-white"
        >
          {loading ? "Menyimpan..." : "Kirim"}
        </button>
      </form>
    </div>
  );
}
