import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LayananDokumen.com - Pusat Administrasi & Surat Resmi",
  description: "Platform penyusunan dokumen administratif, invoice UMKM, dan legalitas dasar. Gratis, tanpa login, dan format standar Indonesia.",
  verification: { google: "tayBKyloVxPMxQEdM-zAI_pIqd90go0uw3KIovuWSyM" },
  metadataBase: new URL('https://layanandokumen.com'),
  // --- PENGATURAN LOGO DI SINI ---
  icons: {
    icon: '/logo.png',      // Pastikan file logo.png ada di folder public
    shortcut: '/logo.png',
    apple: '/logo.png',     // Untuk icon di iPhone/iPad
  },
  openGraph: {
    images: '/logo.png',    // Gambar saat link disebar di WA/FB
  },
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
        
        {/* IKLAN ATAS GLOBAL (728x90) - VERSI AMAN (ANTI-BLOKIR) */}
        <div className="no-print w-full flex justify-center pt-4 px-4 overflow-hidden">
          <iframe
            title="Sponsor Header"
            // PENTING: Atribut HTML di dalam string menggunakan kutip satu (')
            srcDoc={`<html><body style='margin:0;display:flex;justify-content:center;align-items:center;'><script type='text/javascript'>atOptions = { 'key' : '8fd377728513d5d23b9caf7a2bba1a73', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };</script><script type='text/javascript' src='https://www.highperformanceformat.com/8fd377728513d5d23b9caf7a2bba1a73/invoke.js'></script></body></html>`}
            width="728" height="90" frameBorder="0" scrolling="no"
          />
        </div>

        <main className="flex-grow">{children}</main>

        {/* IKLAN BAWAH GLOBAL (NATIVE) - VERSI AMAN (ANTI-BLOKIR) */}
        <div className="no-print w-full bg-white border-t border-slate-200 py-6 mt-10">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
            <span className="text-[9px] text-slate-400 font-bold uppercase mb-4">Sponsor Kami</span>
            <div className="w-full flex justify-center overflow-hidden">
               <iframe
                 title="Sponsor Footer"
                 // PENTING: Atribut HTML di dalam string menggunakan kutip satu (')
                 srcDoc={`<html><body style='margin:0;display:flex;justify-content:center;'><div id='container-680bbbb6a0645f106a122dd96bf54b25'></div><script async='async' data-cfasync='false' src='https://pl28427514.effectivegatecpm.com/680bbbb6a0645f106a122dd96bf54b25/invoke.js'></script></body></html>`}
                 width="100%" height="280" frameBorder="0" scrolling="no" style={{ maxWidth: '728px' }}
               />
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6">
              &copy; 2026 LayananDokumen.com
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}