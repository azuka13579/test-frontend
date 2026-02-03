import type { Metadata } from "next";
import { JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/sidebar";
import Navbar from "@/components/common/navbar";

const fontSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AAAAA",
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
        <SidebarProvider>
          <AuthProvider>
            <AppSidebar></AppSidebar>
            <div className="min-h-screen font-sans w-full">
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
        </SidebarProvider>
      </body>
    </html>
  );
}
