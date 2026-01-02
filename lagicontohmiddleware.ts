import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Tentukan halaman mana saja yang BOLEH diakses tanpa login (Public)
  // Perhatikan: "/" (Home) saya hapus dari sini.
  // Artinya jika user buka website kamu, dia langsung dipaksa login.
  const publicRoutes = ["/login", "/register"];

  // 2. Cek apakah user sedang berada di halaman Public
  // Kita pakai .some() agar sub-halaman (misal /register/verification) juga dianggap public
  const isPublicPath = publicRoutes.some((route) => pathname.startsWith(route));

  // -------------------------------------------------------------
  // SKENARIO 1: User BELUM Login, mencoba masuk ke Halaman Rahasia
  // Logic: "Kalau ini BUKAN public path, dan token GAK ADA, tendang!"
  // -------------------------------------------------------------
  if (!isPublicPath && !token) {
    const url = new URL("/login", request.url);

    // Siapkan redirect dengan pesan error
    const response = NextResponse.redirect(url);
    response.cookies.set("error", "Sesi habis, login dulu ya!", {
      maxAge: 10,
      path: "/",
    });

    return response;
  }

  // -------------------------------------------------------------
  // SKENARIO 2: User SUDAH Login, tapi iseng buka halaman Login/Register
  // Logic: "Ngapain login lagi? Langsung ke dashboard aja."
  // -------------------------------------------------------------
  if (isPublicPath && token) {
    // Arahkan ke halaman utama dashboard kamu (misal /students atau /dashboard)
    // Jangan arahkan ke "/" karena "/" sekarang juga terproteksi (bakal looping nanti)
    return NextResponse.redirect(new URL("/posts", request.url));
  }

  // Lanjut
  return NextResponse.next();
}

// Config ini PENTING agar file gambar, api, dan next.js internal tidak kena blokir
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
