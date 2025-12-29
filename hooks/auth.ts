import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const isLogin = (router: AppRouterInstance) => {
  if (!Cookies.get("auth_token")) {
    toast.error("Anda belum login", { id: "auth_error" });
    router.push("/");
  }
};
