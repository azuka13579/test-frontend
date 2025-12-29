"use client";

import { useAuth } from "@/hooks/useAuth";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CreatorGuard({
  children,
  post,
}: {
  children: React.ReactNode;
  post: Post | null;
}) {
  const { user, isLoading, isLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // 2. Cek Role (Hanya jalan kalau isLoading sudah false)
      if (user?.role !== "creator") {
        console.log("User bukan creator, redirecting...");
        toast.error("Hanya Creator yang boleh masuk sini!", {
          id: "guard-error",
        });
        router.push("/posts");
      }

      if (post) {
        if (user.id != post.author.id) {
          toast.error("Hanya yang buat post yang boleh masuk sini!", {
            id: "guard-error",
          });

          router.push(`/posts`);
        }
      }
    }
  }, [user, isLoading, isLogin, router]);

  // Tampilkan loading screen sementara datanya diambil
  // Jangan render children kalau bukan creator
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"></div>;
  }

  // Jika sudah tidak loading dan user bukan creator, jangan tampilkan apa-apa (tunggu redirect)
  if (user?.role !== "creator") {
    return null;
  }

  // Kalau aman, render isinya
  return <>{children}</>;
}
