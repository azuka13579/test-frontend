"use client";

import CreatorGuard from "@/components/auth/creatorguard";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { Post } from "@/types/post";
import { deletePost, fetchPost, updatePost } from "@/api/post";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Gunakan Next Image

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [post, setPost] = useState<Post | null>(null);

  // State untuk form data (Image tetap null di awal)
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    content: "",
    image: null as File | null,
  });

  // State KHUSUS untuk menampilkan preview gambar
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      // Unwrapping params (Next.js 15)
      const resolvedParams = await params;
      const id = resolvedParams.id;

      setLoading(true);
      try {
        const res = await fetchPost(id);
        const data = res.data;

        setPost(data);

        // Isi form dengan data yang ada
        setFormData({
          user_id: data.user_id,
          title: data.title,
          content: data.content,
          image: null, // Tetap null, karena kita tidak mengubah file kecuali user upload baru
        });

        // Set Preview Image dari URL Backend
        // Asumsi backend kirim full URL, kalau cuma path, tambahkan base url
        // Contoh: `http://localhost:8000/storage/${data.image_path}`
        if (data.image_url) {
          setPreviewImage(data.image_url);
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Gagal memuat post");
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [params]); // Tambahkan dependency params

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Simpan file ke state untuk dikirim ke backend
      setFormData({ ...formData, image: file });

      // 2. Buat URL lokal agar user bisa lihat preview gambar BARU yang dipilih
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post) return;

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Judul dan konten tidak boleh kosong!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);

      data.append("_method", "PUT");

      // Hanya append image jika user memilih file baru
      if (formData.image) {
        data.append("image", formData.image);
      }

      console.log(data);

      // Pastikan kirim ke endpoint update
      await updatePost(post?.id, data);

      toast.success("Post berhasil diperbarui!");
      router.push("/posts");
    } catch (error: any) {
      console.error(error);
      toast.error("Gagal update post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    try {
      setLoading(true);
      const res = await deletePost(post?.id);
      toast.success(res.message);
      router.push("/posts");
      setLoading(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20">Lagi Loading...</div>;

  return (
    <CreatorGuard post={post}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Post</h1>

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
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
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
                rows={6}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload & Preview Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar
              </label>

              {/* PREVIEW IMAGE AREA */}
              {previewImage && (
                <div className="mb-4 relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                  {/* Gunakan unoptimized jika masih localhost dan sering error IP */}
                  <Image
                    src={previewImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

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
                  disabled={loading}
                />
                {formData.image && (
                  <p className="mt-2 text-sm text-green-600">
                    📁 {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg disabled:bg-gray-400"
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </CreatorGuard>
  );
}
