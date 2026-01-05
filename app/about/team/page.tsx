"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import z from "zod";

export default function PeoplePage() {
  const formSchema = z.object({
    username: z.string("Harus Text").min(4, "Minimal 4"),
    age: z.number("Isi angka").min(13, "Minimal 13"),
  });
  const form = useForm({
    defaultValues: {
      username: "",
      age: 0,
    },
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      // Do something with form data
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex justify-center flex-col max-w-2xl gap-2 mx-auto"
    >
      <form.Field name="username">
        {(field) => {
          // <--- Ganti ( dengan {
          // Sekarang kamu BISA deklarasi variabel disini
          console.log(field.state.meta.errors);
          const isValid = field.state.meta.isValid;

          return (
            // <--- Wajib tambah return
            <>
              <input
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="text"
                className={`${
                  !isValid
                    ? "border-red-700 text-red-700"
                    : "border-black text-black"
                }  rounded-xl p-2 border-2`}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              {/* Kode error jadi jauh lebih ringkas */}
              {!isValid && (
                <em className="text-red-500 text-sm">
                  {field.state.meta.errors[0]?.message}
                </em>
              )}
            </>
          );
        }}
      </form.Field>
      <form.Field
        name="age"
        children={(field) => (
          <>
            <input
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              type="number"
              className="border-black rounded-xl p-2 border"
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
            />
            {!field.state.meta.isValid && (
              <em className="text-red-500">
                {field.state.meta.errors
                  // Ambil property .message dari setiap object error
                  .map((err: any) => err.message)
                  // Baru di-join
                  .join(", ")}
              </em>
            )}
          </>
        )}
      />
      <button
        type="submit"
        className="p-2 border-2 border-black hover:bg-black rounded-2xl hover:text-white"
      >
        Kirim
      </button>
    </form>
  );
}
