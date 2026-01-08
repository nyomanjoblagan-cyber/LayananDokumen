import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LayananDokumen.com - Pusat Administrasi & Surat Resmi",
  description: "Platform penyusunan dokumen administratif, invoice UMKM, dan legalitas dasar. Gratis, tanpa login, dan format standar Indonesia.",
  keywords: ["buat invoice online", "contoh surat lamaran", "nota toko gratis", "kalkulator kpr", "surat perjanjian", "layanandokumen"],
  authors: [{ name: "LayananDokumen Team" }],
  icons: {
    icon: '/favicon.ico',
  },
};

// --- BAGIAN PENTING YANG KURANG TADI ---
// Ini yang bikin HP ngerti kalau website ini responsif
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // themeColor: "#0f172a", // Opsional: Biar status bar HP jadi gelap senada header
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}