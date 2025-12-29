"use client";

import TambahKomentar from "@/components/post/tambahkomentar";
import { fetchPost } from "@/api/post";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image"; // Gunakan next/image jika domain sudah di config, atau img biasa
import { Calendar, User, MessageCircle, ArrowLeft } from "lucide-react"; // Install lucide-react jika belum
import Link from "next/link";
import { Post } from "@/types/post";

const PostSkeleton = () => (
  <div className="max-w-4xl w-full mx-auto p-6 animate-pulse">
    <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
    <div className="h-100 w-full bg-gray-200 rounded-2xl mb-8"></div>
    <div className="h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
    <div className="flex gap-4 mb-8">
      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      <div className="h-4 w-40 bg-gray-200 rounded mt-3"></div>
    </div>
    <div className="space-y-4">
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export default function DetailPost({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const res = await fetchPost(slug);
        setPost(res.data);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Gagal memuat berita");
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  if (loading) return <PostSkeleton />;

  if (!post)
    return <div className="text-center py-20">Post tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-white py-10 w-full">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 pb-0">
          <Link
            href="/posts"
            className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke list
          </Link>
        </div>

        {/* Header Section */}
        <header className="p-6 md:p-10">
          {/* Kategori / Tags (Opsional) */}
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              Article
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {post.author?.username}
                </p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            <div className="flex items-center text-gray-500 text-sm gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {/* Format tanggal biar cantik */}
                <span>{post.created_at}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}

        <div className="relative w-full h-75 md:h-125">
          {/* Gunakan tag img biasa jika next.config.js belum diatur domain gambarnya */}
          <Image
            src={
              post.image_url
                ? post.image_url.replace("localhost", "127.0.0.1")
                : "https://picsum.photos/seed/S1KyO/800/600"
            }
            alt={post.title}
            className="w-full h-full object-cover"
            fill
            unoptimized
          />
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {/* Jika konten berupa HTML dari rich text editor */}
            {/* <div dangerouslySetInnerHTML={{ __html: post.content }} /> */}

            {/* Jika konten text biasa dengan enter (\n) */}
            {post.content.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer / Comments Section */}
        <div className="bg-gray-50 p-6 md:p-10 border-t border-gray-100">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Komentar ({post.comments?.length || 0})
          </h3>

          <div className="space-y-6">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border shrink-0 flex items-center justify-center">
                    <span className="font-bold text-gray-500">
                      {comment.user.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm flex-1 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-sm">
                        {comment.user || "Anonim"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {comment.created_at}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Belum ada komentar.</p>
            )}
          </div>
        </div>
      </article>
      <TambahKomentar></TambahKomentar>
    </div>
  );
}
