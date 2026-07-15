'use client';

/**
 * FILE: BeasiswaPage.tsx
 * STATUS: PRODUCTION READY (WITH MONETIZATION)
 * DESC: Generator Perjanjian Pemberian Beasiswa (Legal Drafting Kelas Enterprise)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, GraduationCap, User, Wallet, 
  LayoutTemplate, ChevronDown, 
  ArrowLeftCircle, Edit3, Eye, Building2, RotateCcw,
  Briefcase, Scale, Banknote
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface AgreementData {
  city: string;
  date: string;

  // Pihak Pertama (Pemberi)
  instansiName: string;
  wakilName: string;
  wakilJabatan: string;
  instansiAddress: string;

  // Pihak Kedua (Penerima)
  penerimaName: string;
  penerimaNik: string;
  penerimaTtl: string;
  penerimaPekerjaan: string;
  penerimaAddress: string;

  // Detail Pendidikan
  univName: string;
  fakultas: string;
  nim: string;

  // Detail Beasiswa
  namaBeasiswa: string;
  nominalBeasiswa: string;
  durasiSemester: string;
  targetIpk: string;
  metodePembayaran: 'Langsung' | 'Melalui Universitas';
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: AgreementData = {
  city: 'Jakarta',
  date: '',

  instansiName: 'PT TEKNOLOGI MASA DEPAN TERANG',
  wakilName: 'Budi Raharjo, S.E., M.B.A.',
  wakilJabatan: 'Direktur Sumber Daya Manusia',
  instansiAddress: 'Gedung Cyber Tower Lt. 10, Jl. Sudirman Kav. 21, Jakarta Selatan',

  penerimaName: 'ANDI PRATAMA',
  penerimaNik: '3174012345678901',
  penerimaTtl: 'Bandung, 12 Mei 2003',
  penerimaPekerjaan: 'Mahasiswa',
  penerimaAddress: 'Jl. Margonda Raya No. 123, Kel. Pondok Cina, Kec. Beji, Kota Depok, Jawa Barat',

  univName: 'Universitas Indonesia',
  fakultas: 'Fakultas Ilmu Komputer',
  nim: '2023102030',

  namaBeasiswa: 'Beasiswa Tech Leader 2026',
  nominalBeasiswa: '15.000.000',
  durasiSemester: '8',
  targetIpk: '3.50',
  metodePembayaran: 'Langsung'
};

// --- 3. KOMPONEN UTAMA ---
export default function BeasiswaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Dokumen Legal...</div>}>
      <AgreementBuilder />
    </Suspense>
  );
}

function AgreementBuilder() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<AgreementData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof AgreementData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(window.confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Standar Notaris (Legal)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false);}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Corporate (Clean)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    const getDayName = (dateStr: string) => {
      if(!dateStr) return '...';
      try {
          const d = new Date(dateStr + 'T00:00:00');
          return d.toLocaleDateString('id-ID', { weekday: 'long' });
      } catch { return '...'; }
    };

    const getMonthName = (dateStr: string) => {
      if(!dateStr) return '...';
      try {
          const d = new Date(dateStr + 'T00:00:00');
          return d.toLocaleDateString('id-ID', { month: 'long' });
      } catch { return '...'; }
    };

    const getYearStr = (dateStr: string) => {
      if(!dateStr) return '...';
      try {
          const d = new Date(dateStr + 'T00:00:00');
          return d.getFullYear().toString();
      } catch { return '...'; }
    };

    const getDateNum = (dateStr: string) => {
      if(!dateStr) return '...';
      try {
          const d = new Date(dateStr + 'T00:00:00');
          return d.getDate().toString();
      } catch { return '...'; }
    };

    // Fungsi utilitas format angka ke Rupiah
    const formatRupiah = (angka: string) => {
      const number = parseInt(angka.replace(/[^0-9]/g, ''));
      if(isNaN(number)) return angka;
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
    };

    if (templateId === 1 || templateId === 2) {
      // Karena ini dokumen legal drafting, template 1 dan 2 menggunakan struktur hirarki Pasal yang sama, 
      // mungkin beda font/styling dasar, namun struktur paten tidak dirubah menjadi grid untuk menjaga format MS Word
      return (
        <div className={`text-[11pt] text-black leading-[1.6] ${templateId === 1 ? 'font-serif' : 'font-sans'}`}>
           
           {/* HEADER DOKUMEN */}
           <div className="text-center mb-8 font-bold uppercase tracking-wide">
             <p className="text-[12pt] underline mb-1">PERJANJIAN PEMBERIAN BEASISWA</p>
             <p className="text-[11pt]">TENTANG</p>
             <p className="text-[11pt]">PROGRAM {data.namaBeasiswa}</p>
             <p className="mt-2 font-normal normal-case">Nomor : ........................................................</p>
           </div>

           {/* PEMBUKAAN */}
           <p className="text-justify mb-4">
             Pada hari ini, <span className="font-bold">{getDayName(data.date)}</span>, tanggal <span className="font-bold">{getDateNum(data.date)}</span> bulan <span className="font-bold">{getMonthName(data.date)}</span> tahun <span className="font-bold">{getYearStr(data.date)}</span>, bertempat di <span className="font-bold">{data.city}</span>, yang bertanda tangan di bawah ini:
           </p>

           {/* IDENTITAS PARA PIHAK (TANPA TABLE, MENGGUNAKAN DIV FLEX UNTUK MS WORD PRINT COMPATIBILITY) */}
           <ol className="list-decimal list-outside ml-6 mb-6 text-justify space-y-6">
             <li className="pl-2">
                <p className="mb-1">
                  <span className="font-bold uppercase">{data.instansiName}</span>, suatu badan/instansi yang berkedudukan di {data.city}, beralamat di {data.instansiAddress}, dalam hal ini diwakili oleh <span className="font-bold">{data.wakilName}</span> dalam jabatannya selaku {data.wakilJabatan}, dari dan oleh karena itu sah bertindak untuk dan atas nama {data.instansiName}. 
                </p>
                <p>Selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>
             </li>
             <li className="pl-2">
                <div className="flex flex-col mb-1">
                  <p className="font-bold uppercase mb-2">{data.penerimaName}</p>
                  <div className="ml-0 md:ml-4">
                    <div className="flex"><div className="w-48 shrink-0">NIK</div><div>: {data.penerimaNik}</div></div>
                    <div className="flex"><div className="w-48 shrink-0">Tempat, Tanggal Lahir</div><div>: {data.penerimaTtl}</div></div>
                    <div className="flex"><div className="w-48 shrink-0">Pekerjaan</div><div>: {data.penerimaPekerjaan}</div></div>
                    <div className="flex"><div className="w-48 shrink-0">Alamat Lengkap</div><div>: {data.penerimaAddress}</div></div>
                  </div>
                </div>
                <p>Selanjutnya dalam Perjanjian ini disebut sebagai <strong>PIHAK KEDUA</strong>.</p>
             </li>
           </ol>

           <p className="text-justify mb-4">
             PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK terlebih dahulu menerangkan hal-hal sebagai berikut:
           </p>

           {/* PREMISES / RECITALS */}
           <ol className="list-[lower-alpha] list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">Bahwa PIHAK PERTAMA adalah penyelenggara program bantuan pendidikan berupa {data.namaBeasiswa} yang bertujuan untuk mendukung pendidikan anak bangsa.</li>
             <li className="pl-2">Bahwa PIHAK KEDUA adalah mahasiswa aktif di {data.univName}, program studi {data.fakultas} dengan Nomor Induk Mahasiswa (NIM) {data.nim}.</li>
             <li className="pl-2">Bahwa PIHAK KEDUA telah melalui proses seleksi dan memenuhi seluruh persyaratan yang ditetapkan oleh PIHAK PERTAMA untuk ditetapkan sebagai penerima beasiswa.</li>
           </ol>

           <p className="text-justify mb-8">
             Berdasarkan hal-hal tersebut di atas, PARA PIHAK sepakat untuk mengikatkan diri dalam Perjanjian Pemberian Beasiswa (selanjutnya disebut "Perjanjian") dengan syarat dan ketentuan sebagai berikut:
           </p>

           {/* PASAL 1 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 1</p>
             <p>DEFINISI DAN KETENTUAN UMUM</p>
           </div>
           <p className="text-justify mb-4">
             Kecuali ditentukan lain secara tegas dalam Perjanjian ini, istilah-istilah di bawah ini memiliki pengertian sebagai berikut:
           </p>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2"><strong>Beasiswa</strong> adalah bantuan biaya pendidikan yang diberikan oleh PIHAK PERTAMA kepada PIHAK KEDUA dalam bentuk dana tunai untuk menunjang kelancaran studi.</li>
             <li className="pl-2"><strong>Perguruan Tinggi</strong> adalah institusi pendidikan tinggi tempat PIHAK KEDUA menempuh pendidikan formal, yaitu {data.univName}.</li>
             <li className="pl-2"><strong>Indeks Prestasi Kumulatif (IPK)</strong> adalah nilai rata-rata kumulatif prestasi akademik yang diperoleh PIHAK KEDUA di akhir setiap semester berdasarkan transkrip nilai resmi.</li>
           </ol>

           {/* PASAL 2 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 2</p>
             <p>OBJEK PERJANJIAN</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">PIHAK PERTAMA dengan ini sepakat dan mengikatkan diri untuk memberikan Beasiswa kepada PIHAK KEDUA sebesar <strong>{formatRupiah(data.nominalBeasiswa)}</strong> per semester.</li>
             <li className="pl-2">Pemberian Beasiswa sebagaimana dimaksud pada ayat (1) diberikan selama maksimal {data.durasiSemester} semester, terhitung sejak penandatanganan Perjanjian ini atau sampai PIHAK KEDUA menyelesaikan masa studinya (mana yang lebih dulu tercapai).</li>
             <li className="pl-2">Dana Beasiswa hanya diperuntukkan untuk pembayaran biaya pendidikan (UKT/SPP), biaya buku, dan/atau biaya penunjang akademik lainnya.</li>
           </ol>

           {/* PASAL 3 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 3</p>
             <p>METODE DAN TATA CARA PEMBAYARAN</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             {data.metodePembayaran === 'Langsung' ? (
               <>
                 <li className="pl-2">Pembayaran dana Beasiswa oleh PIHAK PERTAMA akan disalurkan secara langsung ke rekening bank milik PIHAK KEDUA.</li>
                 <li className="pl-2">PIHAK KEDUA wajib menyampaikan informasi rekening bank yang sah, aktif, dan atas nama pribadi kepada PIHAK PERTAMA paling lambat 7 (tujuh) hari kerja setelah Perjanjian ini ditandatangani.</li>
               </>
             ) : (
               <>
                 <li className="pl-2">Pembayaran dana Beasiswa oleh PIHAK PERTAMA akan disalurkan melalui rekening resmi Perguruan Tinggi (Virtual Account/Rekening Rektorat) yang diperuntukkan bagi pembayaran biaya pendidikan PIHAK KEDUA.</li>
                 <li className="pl-2">Apabila terdapat sisa dana setelah pemotongan biaya pendidikan oleh Perguruan Tinggi, maka selisih dana tersebut akan dikembalikan ke PIHAK PERTAMA atau diserahkan kepada PIHAK KEDUA sesuai kebijakan tertulis PIHAK PERTAMA.</li>
               </>
             )}
             <li className="pl-2">Penyaluran dana dilakukan selambat-lambatnya 14 (empat belas) hari kerja setelah PIHAK KEDUA menyerahkan dokumen Laporan Hasil Studi (KHS/Transkrip Nilai) pada setiap awal semester akademik.</li>
           </ol>

           {/* PASAL 4 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 4</p>
             <p>HAK DAN KEWAJIBAN PIHAK PERTAMA</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">PIHAK PERTAMA berhak meminta dan menerima laporan perkembangan akademis PIHAK KEDUA berupa transkrip nilai/KHS setiap akhir semester.</li>
             <li className="pl-2">PIHAK PERTAMA berhak untuk mengevaluasi, menunda, atau memberhentikan secara sepihak pemberian Beasiswa apabila PIHAK KEDUA terbukti melanggar syarat dan ketentuan dalam Perjanjian ini.</li>
             <li className="pl-2">PIHAK PERTAMA berkewajiban mencairkan dana Beasiswa sesuai dengan nominal, jangka waktu, dan tata cara yang diatur dalam Pasal 2 dan Pasal 3 Perjanjian ini secara tepat waktu.</li>
           </ol>

           {/* PASAL 5 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 5</p>
             <p>HAK DAN KEWAJIBAN PIHAK KEDUA</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">PIHAK KEDUA berhak menerima dana Beasiswa secara penuh dari PIHAK PERTAMA selama mematuhi seluruh kewajiban dalam Perjanjian ini.</li>
             <li className="pl-2">PIHAK KEDUA berkewajiban mempertahankan Indeks Prestasi Kumulatif (IPK) minimal sebesar <strong>{data.targetIpk}</strong> pada setiap semesternya.</li>
             <li className="pl-2">PIHAK KEDUA berkewajiban menyerahkan fotokopi transkrip nilai / Kartu Hasil Studi (KHS) dan bukti registrasi ulang paling lambat 14 (empat belas) hari kerja setelah diterbitkan oleh Perguruan Tinggi.</li>
             <li className="pl-2">PIHAK KEDUA dilarang menerima beasiswa dari instansi, lembaga, atau pihak lain yang melarang adanya penerimaan beasiswa ganda (double funding).</li>
             <li className="pl-2">PIHAK KEDUA berkewajiban menjaga nama baik PIHAK PERTAMA, berperilaku baik, tidak terlibat dalam tindakan kriminal, pelanggaran hukum, asusila, maupun penyalahgunaan narkotika.</li>
           </ol>

           {/* PASAL 6 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 6</p>
             <p>EVALUASI DAN PENGHENTIAN BEASISWA</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">PIHAK PERTAMA berhak menghentikan Beasiswa secara sepihak dan seketika apabila PIHAK KEDUA tidak memenuhi kewajiban batas minimal IPK sebesar {data.targetIpk} selama 2 (dua) semester berturut-turut.</li>
             <li className="pl-2">Pemberian Beasiswa akan dihentikan secara permanen apabila PIHAK KEDUA dikeluarkan (Drop Out), mengundurkan diri dari Perguruan Tinggi, atau mengambil cuti akademik tanpa persetujuan tertulis dari PIHAK PERTAMA.</li>
             <li className="pl-2">Apabila terjadi pemutusan Beasiswa akibat unsur kesengajaan, pemalsuan dokumen akademik, atau pelanggaran pidana yang dilakukan oleh PIHAK KEDUA, maka PIHAK PERTAMA berhak secara hukum untuk menuntut pengembalian seluruh dana Beasiswa yang telah disalurkan.</li>
           </ol>

           {/* PASAL 7 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 7</p>
             <p>KEADAAN MEMAKSA (FORCE MAJEURE)</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">Apabila terjadi keterlambatan atau kegagalan salah satu pihak untuk memenuhi kewajiban dalam Perjanjian ini yang murni disebabkan oleh Keadaan Memaksa (Force Majeure), maka pihak tersebut tidak dapat dimintai pertanggungjawaban.</li>
             <li className="pl-2">Keadaan Memaksa sebagaimana dimaksud pada ayat (1) meliputi namun tidak terbatas pada bencana alam, pandemi/epidemi, pemogokan massal, huru-hara, peperangan, dan peraturan/kebijakan pemerintah yang secara langsung menghalangi pelaksanaan Perjanjian ini.</li>
             <li className="pl-2">Pihak yang mengalami Keadaan Memaksa wajib memberitahukan kepada pihak lainnya secara tertulis selambat-lambatnya 7 (tujuh) hari kalender sejak terjadinya keadaan tersebut dengan menyertakan bukti yang sah dari pihak berwenang.</li>
           </ol>

           {/* PASAL 8 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 8</p>
             <p>PENYELESAIAN SENGKETA</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">Segala perselisihan atau perbedaan pendapat yang timbul akibat pelaksanaan Perjanjian ini akan diselesaikan oleh PARA PIHAK secara musyawarah untuk mencapai mufakat.</li>
             <li className="pl-2">Apabila musyawarah tidak mencapai mufakat dalam waktu 30 (tiga puluh) hari kalender sejak perselisihan timbul, maka PARA PIHAK sepakat untuk memilih domisili hukum yang tetap dan tidak berubah di Kepaniteraan Pengadilan Negeri {data.city}.</li>
           </ol>

           {/* PASAL 9 */}
           <div className="text-center font-bold mb-4">
             <p>PASAL 9</p>
             <p>PENUTUP</p>
           </div>
           <ol className="list-decimal list-outside ml-6 mb-8 text-justify space-y-2">
             <li className="pl-2">Hal-hal yang belum atau tidak cukup diatur dalam Perjanjian ini akan dirundingkan dan diatur kemudian oleh PARA PIHAK dalam suatu Adendum atau Amandemen yang bentuknya tertulis dan merupakan bagian yang tidak terpisahkan dari Perjanjian ini.</li>
             <li className="pl-2">Perjanjian ini dibuat dan ditandatangani di {data.city} pada hari dan tanggal sebagaimana disebutkan pada awal Perjanjian, dibuat dalam rangkap 2 (dua) asli, bermeterai cukup sesuai ketentuan perundang-undangan yang berlaku, dan masing-masing rangkap mempunyai kekuatan hukum yang sama bagi PARA PIHAK.</li>
           </ol>

           {/* TANDA TANGAN */}
           <div className="mt-16 flex justify-between break-inside-avoid">
             <div className="text-center w-64">
               <p className="mb-24 font-bold">PIHAK PERTAMA,</p>
               <p className="font-bold underline uppercase">{data.wakilName}</p>
               <p>{data.wakilJabatan}</p>
             </div>
             <div className="text-center w-64">
               <p className="mb-24 font-bold">PIHAK KEDUA,</p>
               <p className="font-bold underline uppercase">{data.penerimaName}</p>
               <p>Penerima Beasiswa</p>
             </div>
           </div>

        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED (MENCEGAH TERPOTONG) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Legal <span className="text-emerald-400">Drafter</span></h1></div>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Standar Notaris (Legal)' : 'Corporate (Clean)'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               {/* TOMBOL CETAK & TRIGGER MONETISASI */}
               <button 
                 onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
                 className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
               >
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[480px] lg:w-[520px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Scale size={18} className="text-emerald-600" /> Form Drafting Hukum</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar print:hidden print:overflow-visible print:bg-white">
               
               {/* 1. DETAIL BEASISWA & PERJANJIAN */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Banknote size={14}/> Detail Beasiswa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kota Dibuat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Perjanjian</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Program Beasiswa</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.namaBeasiswa} onChange={e => handleDataChange('namaBeasiswa', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nominal (Per Semester)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nominalBeasiswa} onChange={e => handleDataChange('nominalBeasiswa', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Durasi (Maks Semester)</label><input type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.durasiSemester} onChange={e => handleDataChange('durasiSemester', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Target IPK Minimal</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.targetIpk} onChange={e => handleDataChange('targetIpk', e.target.value)} /></div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Metode Penyaluran</label>
                            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={data.metodePembayaran} onChange={e => handleDataChange('metodePembayaran', e.target.value as any)}>
                              <option value="Langsung">Langsung ke Mhs</option>
                              <option value="Melalui Universitas">Melalui Universitas</option>
                            </select>
                         </div>
                      </div>
                  </div>
               </div>

               {/* 2. PIHAK PERTAMA (PEMBERI) */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={14}/> Pihak Pertama (Pemberi)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Instansi / Perusahaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.instansiName} onChange={e => handleDataChange('instansiName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Perwakilan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.wakilName} onChange={e => handleDataChange('wakilName', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Jabatan Perwakilan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.wakilJabatan} onChange={e => handleDataChange('wakilJabatan', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap Instansi</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.instansiAddress} onChange={e => handleDataChange('instansiAddress', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. PIHAK KEDUA (PENERIMA) */}
               <div className="space-y-3">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><User size={14}/> Pihak Kedua (Penerima)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap Sesuai KTP</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaName} onChange={e => handleDataChange('penerimaName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nominal Induk Kependudukan (NIK)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaNik} onChange={e => handleDataChange('penerimaNik', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan / Status</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaPekerjaan} onChange={e => handleDataChange('penerimaPekerjaan', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat, Tanggal Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTtl} onChange={e => handleDataChange('penerimaTtl', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Sesuai KTP</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaAddress} onChange={e => handleDataChange('penerimaAddress', e.target.value)} /></div>
                      
                      <div className="pt-3 border-t border-slate-100 space-y-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Universitas / Perguruan Tinggi</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.univName} onChange={e => handleDataChange('univName', e.target.value)} /></div>
                         <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Fakultas / Program Studi</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.fakultas} onChange={e => handleDataChange('fakultas', e.target.value)} /></div>
                            <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIM</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nim} onChange={e => handleDataChange('nim', e.target.value)} /></div>
                         </div>
                      </div>
                  </div>
               </div>

               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center print:hidden print:overflow-visible print:bg-white print:static">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:hidden print:overflow-visible print:bg-white">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '25mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Perjanjian Beasiswa Legal" price={25000} />
      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Form</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <table className="print-table w-full">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}

// FORCE-HMR-UPDATE
