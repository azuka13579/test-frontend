"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { getUser } from "@/api/user"; // Pastikan path ini benar
import { login as apiLogin, logout as apiLogout } from "@/api/auth";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLogin: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<any>; // Ubah jadi Promise<any> agar bisa return response
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    const token = Cookies.get("auth_token");

    if (token) {
      try {
        const res = await getUser();

        // Response dari axios bisa: res.data (object) atau res.data.data (nested)
        const userData = res.data?.data || res.data;

        setUser(userData);
      } catch (err) {
        Cookies.remove("auth_token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkAuth().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const login = async (formData: any) => {
    try {
      setIsLoading(true);
      const res = await apiLogin(formData);

      // 1. Ambil token (Cek struktur response Laravelmu, biasanya access_token atau token)
      const token = res.data.access_token;

      // 2. Simpan ke Cookies
      Cookies.set("auth_token", token, { expires: 7 });

      // 3. Set User State (Ambil data user)
      // Jika response login sudah membawa data user, pakai: setUser(res.data.user)
      // Jika tidak, fetch ulang:
      const userRes = await getUser();
      const userData = userRes.data?.data || userRes.data;
      setUser(userData);

      // 4. Redirect (Disamakan ke /students sesuai request kamu di page login)
      router.push("/posts");
      setIsLoading(false);

      // 5. Return response agar bisa dipakai di Page Login untuk Toast
      return res;
    } catch (error) {
      setIsLoading(false);

      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await apiLogout();
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      Cookies.remove("auth_token");
      setUser(null);
      router.push("/login"); // Redirect ke login setelah logout
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogin: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
