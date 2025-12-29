"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight, Edit } from "lucide-react"; // Install lucide-react jika belum ada
import { Post } from "@/types/post";
import { useAuth } from "@/hooks/useAuth";

interface PostCardProps {
  data: Post;
}
const PostCard = ({ data }: PostCardProps) => {
  const { user } = useAuth();
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950">
      {/* Tombol Edit di Pojok Kanan Atas */}
      {user?.id === data.author.id && (
        <Link
          href={`posts/${data.id}/edit`}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
        >
          <Edit size={18} />
        </Link>
      )}

      {/* Container Image dengan Hover Zoom */}
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="relative w-full h-64 mb-4">
          <Image
            src={
              data.image_url
                ? data.image_url
                : "https://media2.dev.to/dynamic/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fvqwoji22l56hjgsl6woy.jpeg"
            }
            alt={data.title}
            loading="eager"
            fill
            unoptimized
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Konten Card */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
          <CalendarDays size={14} />
          <span>{data.created_at}</span>
          <p>|</p>
          <p>{data.author.username}</p>
        </div>

        <h3 className="mb-3 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {data.title}
        </h3>

        <Link
          href={`/posts/${data.id}`}
          className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
        >
          Baca Selengkapnya
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
