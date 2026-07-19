'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KebijakanRevisiPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* HEADER NAVIGASI */}
      <header className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-all group">
            <div className="bg-slate-100 group-hover:bg-emerald-100 p-1.5 rounded-lg">
              <ArrowLeft size={18} />
            </div>
            <span className="text-sm font-bold">Kembali</span>
          </Link>
          <div className="text-slate-900 font-bold text-sm flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" /> 
            <span>LayananDokumen</span>
          </div>
        </div>
      </header>

      {/* BODY ARTIKEL */}
      <article className="max-w-3xl mx-auto px-6 pt-10">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Kebijakan Bebas Revisi 24 Jam
          </h1>
          <p className="text-slate-500 text-lg">Pahami bagaimana sistem garansi revisi dokumen kami bekerja untuk melindungi Anda dari kesalahan ketik (typo).</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100 space-y-10">
          
          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl shrink-0">
               <CheckCircle2 size={32} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 tracking-tight">Apa itu Garansi Revisi 24 Jam?</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Kami memahami bahwa terkadang terjadi kesalahan ketik saat mengisi formulir dokumen. Oleh karena itu, setelah Anda melakukan pembayaran cetak premium, Anda berhak merevisi teks dokumen dan mencetak ulangnya <strong>berkali-kali secara gratis</strong> selama 24 jam ke depan.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className="bg-amber-100 text-amber-600 p-4 rounded-2xl shrink-0">
               <AlertCircle size={32} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 tracking-tight">Syarat dan Ketentuan Sistem (PENTING)</h3>
              <p className="text-slate-600 leading-relaxed text-lg mb-4">
                Sistem kami dirancang agar sangat cepat dan tidak mengharuskan Anda mendaftar akun atau login. Sebagai gantinya, <strong>Kwitansi Digital</strong> Anda disimpan secara lokal dan aman di dalam browser Anda (<em>Local Storage</em>).
              </p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <ul className="space-y-4 text-slate-700 text-base list-none">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Anda <strong>wajib</strong> menggunakan <strong>Perangkat (PC/HP)</strong> dan <strong>Browser</strong> yang sama persis dengan yang Anda gunakan saat melakukan pembayaran.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Sesi 24 jam ini akan <strong>otomatis hangus/hilang</strong> jika Anda melakukan tindakan <i>Clear Cache / Clear Data / Hapus Riwayat Browsing</i> pada perangkat Anda.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Akses premium (bebas cetak) tidak dapat dipindahkan antar perangkat (misal dari HP dipindah ke Laptop).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>Garansi revisi berlaku spesifik per jenis dokumen. Jika Anda membayar Surat Wasiat, maka gratis revisi hanya berlaku untuk cetak ulang Surat Wasiat Anda.</span>
                  </li>
                </ul>
              </div>
              <p className="mt-6 text-sm text-slate-500 italic">
                * Kehilangan akses akibat penghapusan riwayat browser atau perpindahan device sepenuhnya berada di luar tanggung jawab sistem LayananDokumen.
              </p>
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}
