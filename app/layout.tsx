import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import SaweriaBox from '@/components/SaweriaBox';

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
      <head>
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7Q73R9SKEL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7Q73R9SKEL');
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen`}>
        
        {/* KONTEN UTAMA */}
        <main className="flex-grow relative mt-4">
          {children}
          <SaweriaBox />
        </main>

        {/* FOOTER BERSIH */}
        <div className="w-full bg-white border-t border-slate-200 py-6 mt-10 no-print">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center text-center">
            <p className="text-[10px] text-slate-300 font-medium mt-4">
              &copy; 2026 LayananDokumen.com
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
