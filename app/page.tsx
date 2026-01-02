"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth"; // Sesuaikan path import

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Ambil state isLogin dan fungsi login dari context
  const { login, isLogin, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Panggil login dari context
      const res = await login(formData);
      toast.success(res.data.message || "Login Berhasil!");
    } catch (err: any) {
      // Tampilkan toast error
      const errorMessage = err?.response?.data?.message || "Login Gagal";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    router.push("/login");
  });

  return (
    <div className="flex justify-center items-center grow">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl font-semibold">Login Dashboard</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-96">
          <Input
            placeholder="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <Button
            variant="default"
            type="submit"
            className="w-1/2 mx-auto"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
