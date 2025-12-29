import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // Tambahkan ini untuk gambar dari Seeder
      },
      {
        protocol: "https",
        hostname: "media2.dev.to", // Tambahkan ini untuk gambar dari Seeder
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Sesuaikan port Laravel Anda
      },
      {
        protocol: "http",
        hostname: "127.0.0.1", // Tambah ini
        port: "8000",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*", // Proxy ke Laravel
      },
    ];
  },
};

export default nextConfig;
