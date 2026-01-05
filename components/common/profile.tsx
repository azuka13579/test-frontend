"use client";

import { useAuth } from "@/hooks/useAuth";
import React from "react";

export function Profile() {
  const { user, isLoading } = useAuth();
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Bagian Cover / Banner */}
      <div className="h-32 bg-linear-to-r from-blue-500 to-indigo-600 relative">
        {/* Tombol Edit (Opsional) */}
        <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </button>
      </div>

      {/* Bagian Foto Profil & Identitas Utama */}
      <div className="flex flex-col items-center -mt-16 relative z-10">
        <div className="p-1 bg-white rounded-full shadow-md">
          {/* Foto Profil: Gunakan gambar user atau default avatar */}
          <img
            src={`https://ui-avatars.com/api/?name=${
              user?.username || "User"
            }&background=random`}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm bg-gray-100"
          />
        </div>

        <div className="mt-3 text-center px-4">
          {/* Nama & Username */}
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.username || "Pengguna Tanpa Nama"}
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            @{user?.username || user?.email?.split("@")[0] || "username"}
          </p>
        </div>
      </div>

      {/* Bagian Detail (Email & Bio) */}
      <div className="px-8 py-6 space-y-6">
        {/* Email Section */}
        <div className="flex items-center justify-center space-x-2 text-gray-600 bg-gray-50 py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-indigo-500"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="text-sm">{user?.email || "email@tidak.ada"}</span>
        </div>

        {/* Bio Section */}
        <div className="text-center">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Tentang Saya
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed italic">
            {user?.bio ? (
              `"${user.bio}"`
            ) : (
              <span className="text-gray-400 not-italic">
                Belum ada bio yang ditulis.
              </span>
            )}
          </p>
        </div>

        {/* Statistik Dummy (Opsional - Agar terlihat penuh) */}
        <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
          <div className="text-center">
            <span className="block font-bold text-lg text-gray-800">12</span>
            <span className="text-xs text-gray-500">Posts</span>
          </div>
          <div className="text-center border-l border-r border-gray-100">
            <span className="block font-bold text-lg text-gray-800">1.5k</span>
            <span className="text-xs text-gray-500">Followers</span>
          </div>
          <div className="text-center">
            <span className="block font-bold text-lg text-gray-800">300</span>
            <span className="text-xs text-gray-500">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
}
