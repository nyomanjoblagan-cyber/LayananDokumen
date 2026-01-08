import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LayananDokumen.com - Pusat Administrasi & Surat Resmi",
  description: "Platform penyusunan dokumen administratif, invoice UMKM, dan legalitas dasar. Gratis, tanpa login, dan format standar Indonesia.",
  verification: { google: "tayBKyloVxPMxQEdM-zAI_pIqd90go0uw3KIovuWSyM" },
  metadataBase: new URL('https://layanandokumen.com'), 
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}>
        {/* IKLAN DIHAPUS DEMI KEAMANAN DOMAIN */}
        
        <main className="flex-grow">{children}</main>

        <footer className="w-full bg-white border-t border-slate-200 py-6 mt-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              &copy; 2026 LayananDokumen.com
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}