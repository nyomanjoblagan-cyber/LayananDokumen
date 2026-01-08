'use client';

import { 
  ArrowLeft, ShieldCheck, HelpCircle, FileWarning, 
  Lock, BookOpen, ChevronRight, AlertTriangle, ScrollText 
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

// Wrapper Suspense
export default function LegalitasPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-500">Memuat data...</div>}>
       <LegalitasContent />
    </Suspense>
  );
}

function LegalitasContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState('panduan');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const MENU = [
    { id: 'panduan', label: 'Panduan Penggunaan', icon: HelpCircle },
    { id: 'disclaimer', label: 'Disclaimer', icon: FileWarning },
    { id: 'privasi', label: 'Kebijakan Privasi', icon: Lock },
    { id: 'syarat', label: 'Syarat & Ketentuan', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 flex flex-col">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <h1 className="font-bold text-slate-900 text-sm md:text-base">Pusat Informasi & Bantuan</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-6 py-8 flex flex-col md:flex-row gap-8 flex-1">
        
        {/* SIDEBAR (KIRI) */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
           <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Menu</div>
           {MENU.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  activeTab === item.id 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm' 
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                 <item.icon size={18} className={activeTab === item.id ? 'text-emerald-600' : 'text-slate-400'}/>
                 {item.label}
                 {activeTab === item.id && <ChevronRight size={16} className="ml-auto opacity-50"/>}
              </button>
           ))}
        </aside>

        {/* KONTEN KANAN (ISI LENGKAP) */}
        <main className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm h-fit min-h-[500px]">
           
           {/* 1. PANDUAN */}
           {activeTab === 'panduan' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><HelpCircle size={28}/></div>
                    <div>
                       <h2 className="text-2xl font-bold text-slate-800">Panduan Penggunaan</h2>
                       <p className="text-slate-500 text-sm">Cara mudah membuat dokumen dalam hitungan menit.</p>
                    </div>
                 </div>
                 
                 <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
                    <div className="flex gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center border border-blue-100">1</div>
                       <div>
                          <h4 className="font-bold text-slate-900 mb-1">Pilih Template Dokumen</h4>
                          <p>Cari dokumen yang Anda butuhkan melalui kolom pencarian di halaman depan atau telusuri menu Kategori. Kami menyediakan berbagai format mulai dari Invoice, Surat Kuasa, hingga Surat Lamaran Kerja.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center border border-blue-100">2</div>
                       <div>
                          <h4 className="font-bold text-slate-900 mb-1">Isi Formulir Data</h4>
                          <p>Lengkapi formulir yang tersedia di sebelah kiri layar (Desktop) atau tekan tombol "Isi Data" (HP). Masukkan data yang relevan seperti Nama, Alamat, Tanggal, dan Nominal.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center border border-blue-100">3</div>
                       <div>
                          <h4 className="font-bold text-slate-900 mb-1">Preview Real-time</h4>
                          <p>Dokumen akan terisi secara otomatis saat Anda mengetik. Anda bisa melihat hasil jadinya langsung di layar sebelah kanan tanpa perlu refresh halaman.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center border border-blue-100">4</div>
                       <div>
                          <h4 className="font-bold text-slate-900 mb-1">Cetak atau Simpan PDF</h4>
                          <p>Jika data sudah benar, klik tombol <strong>"Cetak PDF"</strong> atau ikon Printer. Gunakan opsi <em>"Save as PDF"</em> pada pengaturan print browser Anda untuk menyimpan file digitalnya.</p>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {/* 2. DISCLAIMER (TEKS LENGKAP YANG MAS SUKA) */}
           {activeTab === 'disclaimer' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
                       <AlertTriangle size={32} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-bold text-slate-800">Disclaimer (Sanggahan)</h2>
                       <p className="text-slate-500 text-sm">Harap dibaca dengan seksama sebelum menggunakan layanan.</p>
                    </div>
                 </div>

                 <div className="space-y-6 text-slate-700 leading-relaxed text-sm">
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                       <p className="font-bold text-amber-800 mb-1">Poin Utama:</p>
                       <p>Aplikasi ini adalah <strong>Generator Dokumen Otomatis</strong>, bukan firma hukum. Hasil dokumen adalah draf awal yang mungkin memerlukan peninjauan ahli hukum.</p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">1. Bukan Nasihat Hukum</h3>
                       <p>Informasi dan dokumen yang disediakan di situs web ini hanya untuk tujuan informasi umum dan administrasi. Tidak ada bagian dari situs ini yang dimaksudkan sebagai nasihat hukum resmi. Hubungan pengguna dengan aplikasi ini tidak menciptakan hubungan pengacara-klien.</p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">2. Akurasi Dokumen</h3>
                       <p>Meskipun kami berusaha keras untuk menjaga agar templat kami tetap mutakhir dan sesuai dengan standar umum di Indonesia, hukum dan peraturan dapat berubah sewaktu-waktu. Kami tidak menjamin bahwa dokumen yang dihasilkan 100% akurat, lengkap, atau sesuai untuk situasi hukum spesifik Anda tanpa modifikasi.</p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">3. Batasan Tanggung Jawab</h3>
                       <p>Pengembang dan pemilik situs tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan dokumen yang dihasilkan oleh alat ini. Pengguna bertanggung jawab penuh atas isi dan penggunaan dokumen tersebut.</p>
                    </div>
                 </div>
              </div>
           )}

           {/* 3. PRIVASI (TEKS LENGKAP) */}
           {activeTab === 'privasi' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                       <ShieldCheck size={32} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-bold text-slate-800">Kebijakan Privasi</h2>
                       <p className="text-slate-500 text-sm">Bagaimana kami menangani data sensitif Anda.</p>
                    </div>
                 </div>

                 <div className="space-y-6 text-slate-700 leading-relaxed text-sm">
                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">1. Pengolahan Data Lokal (Client-Side)</h3>
                       <p>Prioritas kami adalah privasi Anda. Sebagian besar pemrosesan dokumen (seperti kalkulator gaji, pembuatan kuitansi, surat pernyataan) dilakukan secara <strong>Lokal di Browser Anda</strong>. Artinya, data sensitif yang Anda ketik tidak dikirim atau disimpan di server kami.</p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">2. Data yang Kami Simpan</h3>
                       <p>Karena situs ini beroperasi tanpa sistem login wajib, kami <strong>tidak memiliki database pengguna</strong>. Kami tidak menyimpan riwayat surat atau dokumen rahasia yang Anda buat. Segera setelah Anda menutup tab browser, data akan hilang secara permanen dari memori.</p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">3. Pihak Ketiga</h3>
                       <p>Kami menggunakan layanan analitik anonim (seperti Google Analytics) untuk meningkatkan performa situs. Kami tidak pernah menjual data pribadi Anda kepada pihak ketiga manapun.</p>
                    </div>
                 </div>
              </div>
           )}

           {/* 4. SYARAT (TEKS LENGKAP) */}
           {activeTab === 'syarat' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                       <ScrollText size={32} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-bold text-slate-800">Syarat & Ketentuan</h2>
                       <p className="text-slate-500 text-sm">Aturan penggunaan platform ini.</p>
                    </div>
                 </div>

                 <div className="space-y-6 text-slate-700 leading-relaxed text-sm">
                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">1. Lisensi Penggunaan</h3>
                       <p>Anda diberikan izin terbatas, non-eksklusif, dan dapat dibatalkan untuk menggunakan layanan ini guna keperluan pribadi atau bisnis internal Anda. Anda dilarang keras untuk:</p>
                       <ul className="list-disc ml-5 mt-2 space-y-1 text-slate-600">
                          <li>Menyalin kode sumber aplikasi untuk tujuan komersial saingan.</li>
                          <li>Menggunakan layanan untuk membuat dokumen palsu, ilegal, atau menipu.</li>
                          <li>Melakukan <i>scraping</i> data otomatis pada situs ini.</li>
                       </ul>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">2. Kekayaan Intelektual</h3>
                       <p>Seluruh desain, logo, kode program, dan konten di situs ini adalah hak milik pengembang, kecuali konten yang Anda input sendiri ke dalam formulir (itu milik Anda).</p>
                    </div>

                    <div>
                       <h3 className="font-bold text-slate-900 text-base mb-2">3. Perubahan Layanan</h3>
                       <p>Kami berhak untuk mengubah, menunda, atau menghentikan sebagian atau seluruh layanan kapan saja tanpa pemberitahuan sebelumnya, meskipun kami akan berusaha memberitahu pengguna untuk perubahan besar.</p>
                    </div>
                 </div>
              </div>
           )}

        </main>

      </div>

      <footer className="py-6 text-center text-[10px] text-slate-400 border-t border-slate-200">
         &copy; {new Date().getFullYear()} LayananDokumen.com
      </footer>

    </div>
  );
}