import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Archivo_Black, Inter, Space_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartSidebar } from "@/components/layout/cart-sidebar";
import { SearchModal } from "@/components/layout/search-modal";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAPSULE — Premium Streetwear",
  description: "Premium caps, stitched not printed. DM to cop — no cart, no checkout. Bengaluru, India.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${archivo.variable} ${spaceMono.variable}`}
    >
      <body className="bg-dark text-stitch antialiased">
        <div className="noise" />
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartSidebar />
        <SearchModal />
        <Toaster />
      </body>
    </html>
  );
}
