"use client";

import { submitGuestbook } from "@/app/about/action";
import { useRef } from "react";

export default function GuestbookForm() {
  // Definisikan tipe ref ke elemen HTML Form
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mb-8 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tulis Pesan Anda</h2>

      <form
        action={async (formData) => {
          await submitGuestbook(formData);
          formRef.current?.reset();
        }}
        ref={formRef}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            id="nama"
            required
            placeholder="Azka Raditya"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="komentar"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Komentar
          </label>
          <textarea
            name="komentar"
            id="komentar"
            required
            rows={3}
            placeholder="Tulis pesan anda di sini..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/30"
        >
          Kirim Pesan
        </button>
      </form>
    </div>
  );
}
