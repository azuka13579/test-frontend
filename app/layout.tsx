import type { Metadata } from "next";
import { JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar"; // Pastikan path @/...
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";

const fontSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aplikasi Sekolah",
  description: "Dashboard Sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${jetBrains.variable} antialiased `}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col p-4 font-sans">
            <Navbar />
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
              }}
            />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
