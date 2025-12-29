"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation"; // Tambah useSearchParams
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, isLogin, isLoading } = useAuth();

  const searchParams = useSearchParams(); // Ambil param dari URL

  // Logic Toast dari Middleware
  useEffect(() => {
    if (Cookies.get("error")) {
      toast.error("Login duluuu", { id: "auth-error" });
      Cookies.remove("error");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login(formData);
      toast.success(res.data.message || "Login Berhasil!");
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Login Gagal";
      toast.error(errorMessage);
    }
  };

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
