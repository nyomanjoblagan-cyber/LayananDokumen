import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdsterraBanner from '@/components/AdsterraBanner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LayananDokumen.com - Pusat Administrasi & Surat Resmi",
  description: "Platform penyusunan dokumen administratif. Gratis & Tanpa Login.",
  verification: { google: "tayBKyloVxPMxQEdM-zAI_pIqd90go0uw3KIovuWSyM" },
  metadataBase: new URL('https://layanandokumen.com'),
  icons: { icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' },
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
        
        {/* IKLAN HEADER (TETAP ADA) */}
        <div className="w-full pt-4 px-4 bg-slate-50 no-print">
          <div className="max-w-4xl mx-auto flex justify-center overflow-hidden">
             <AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={728} height={90} />
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <main className="flex-grow">{children}</main>

        {/* IKLAN FOOTER GLOBAL (DIKEMBALIKAN) */}
        {/* Hanya Iklan, Tanpa Menu Link agar tidak dobel dengan Home */}
        <div className="w-full bg-white border-t border-slate-200 py-6 mt-10 no-print">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Sponsored Support</span>
            
            <div className="w-full flex justify-center overflow-hidden">
               <AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={728} height={90} />
            </div>

            <p className="text-[10px] text-slate-300 font-medium mt-4">
              &copy; 2026 LayananDokumen.com
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}