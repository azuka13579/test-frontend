"use client";
import { createPost } from "@/api/post";
import CreatorGuard from "@/components/auth/creatorguard";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function CreatePostPage() {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    content: "",
    image: null as File | null,
  });
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // HAPUS INI: setFormData({ ...formData, user_id: user?.id });
    // Backend yang harus menentukan siapa user yang login, bukan frontend.

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Judul dan konten tidak boleh kosong!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);

      // Pastikan image ada baru di append
      if (formData.image) {
        data.append("image", formData.image);
      }

      console.log(data);

      // KOREKSI: Kirim variable 'data', bukan 'formData'
      const res = await createPost(data);

      toast.success("Post berhasil dibuat!");
      setFormData({ title: "", content: "", image: null, user_id: "" });
      router.push("/posts");
    } catch (error: any) {
      // ... error handling
    } finally {
      setLoading(false);
    }
  };
  return (
    <CreatorGuard post={null}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">
            Buat Post Baru
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Judul
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Masukkan judul post..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                disabled={isLoading}
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Konten
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Tulis konten post Anda di sini..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                disabled={isLoading}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Gambar (Opsional)
              </label>
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={isLoading}
              />
              {formData.image && (
                <p className="mt-2 text-sm text-green-600">
                  📁 {formData.image.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                {isLoading ? "Memproses..." : "Buat Post"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/posts")}
                disabled={isLoading}
                className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </CreatorGuard>
  );
}
