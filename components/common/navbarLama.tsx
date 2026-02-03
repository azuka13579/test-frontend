"use client"; // Wajib ditambahkan karena kita menggunakan hooks (usePathname)

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { BellRing } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

export function Navbar() {
  const pathname = usePathname();
  const { isLogin, logout, isLoading, user } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Post", href: "/posts" },
    { name: "Student", href: "/students" },
    { name: "People", href: "/people" },
  ];
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success("Berhasil logout");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <nav className="relative top-0 left-0 right-0 z-50 flex justify-center p-4">
      {/* Container Navbar dengan efek Glassmorphism */}
      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
        {navLinks.map((link) => {
          // PERUBAHAN DI SINI:
          // 1. Jika link Home ('/'), harus sama persis.
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                isActive
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" // Style jika Aktif
                  : "text-gray-600 hover:bg-gray-200/50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white" // Style jika Tidak Aktif
              }`}
            >
              {link.name}
            </Link>
          );
        })}
        <div className="p-2 rounded-full hover:bg-gray-200/50 transition duration-300">
          <SidebarTrigger>
            <BellRing className="hover:text-blue-600 text-blue-400 transition duration-300" />
          </SidebarTrigger>
        </div>
        {isLogin && (
          <>
            <Link
              href={"/profile"}
              className="rounded-full px-4 py-2 transition-all duration-300 ease-in-out text-sm text-gray-900 font-medium  hover:bg-gray-200/50 hover:text-gray-900"
            >
              <p className=" ">{user?.username}</p>
            </Link>

            <Button
              onClick={handleLogout}
              size={"lg"}
              className={`rounded-full bg-red-500 hover:bg-red-700 transition duration-200`}
            >
              {isLoading ? "Logout..." : "Logout"}
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
