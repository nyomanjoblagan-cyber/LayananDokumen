'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, 
    User, GraduationCap, Building2, Calendar, MapPin
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface CutiData {
    pihak1Nama: string;
    pihak1NIK: string;
    pihak1TTL: string;
    pihak1Pekerjaan: string;
    pihak1Alamat: string;
    pihak1NIM: string;
    pihak1Prodi: string;
    pihak1Fakultas: string;

    pihak2Nama: string;
    pihak2NIK: string;
    pihak2TTL: string;
    pihak2Jabatan: string;
    pihak2Instansi: string;
    pihak2Alamat: string;

    semesterTujuan: string;
    tahunAkademik: string;
    lamaCuti: string;
    alasanCuti: string;
    tanggalMulai: string;
    tanggalSelesai: string;

    tempatDibuat: string;
    tanggalDibuat: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: CutiData = {
    pihak1Nama: "Andi Saputra",
    pihak1NIK: "3171234567890001",
    pihak1TTL: "Jakarta, 15 Agustus 2002",
    pihak1Pekerjaan: "Mahasiswa",
    pihak1Alamat: "Jl. Merdeka Raya No. 45, Jakarta Pusat",
    pihak1NIM: "201011400234",
    pihak1Prodi: "S1 Teknik Informatika",
    pihak1Fakultas: "Fakultas Ilmu Komputer",

    pihak2Nama: "Prof. Dr. Budi Santoso, M.Kom.",
    pihak2NIK: "197503121999031002",
    pihak2TTL: "Bandung, 12 Maret 1975",
    pihak2Jabatan: "Dekan Fakultas Ilmu Komputer",
    pihak2Instansi: "Universitas Teknologi Nusantara",
    pihak2Alamat: "Jl. Pendidikan No. 10, Jakarta Selatan",

    semesterTujuan: "Ganjil",
    tahunAkademik: "2026/2027",
    lamaCuti: "1 (satu) Semester",
    alasanCuti: "Kendala finansial dan keperluan medis keluarga di luar kota.",
    tanggalMulai: "2026-09-01",
    tanggalSelesai: "2027-02-28",

    tempatDibuat: "Jakarta",
    tanggalDibuat: "2026-08-15",
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group">
    {children}
  </div>
);

const IdentityRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex mb-1">
     <div className="w-48 shrink-0">{label}</div>
     <div className="w-4 shrink-0">:</div>
     <div className="flex-1 font-bold">{value}</div>
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratCutiAkademik() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Cuti...</div>}>
      <CutiBuilder />
    </Suspense>
  );
}

function CutiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<CutiData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '___________';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER SURAT */}
      <div className="flex justify-between mb-8 break-inside-avoid">
          <div>
              <p className="mb-1">Perihal : <strong>Permohonan Cuti Akademik</strong></p>
              <p>Lampiran: 1 (satu) Berkas</p>
          </div>
          <div className="text-right">
              <p>{data.tempatDibuat}, {formatDateSafe(data.tanggalDibuat)}</p>
          </div>
      </div>
      
      {/* TUJUAN SURAT */}
      <div className="mb-8">
          <p>Yth.</p>
          <p className="font-bold">{data.pihak2Jabatan}</p>
          <p className="font-bold">{data.pihak2Instansi}</p>
          <p>{data.pihak2Alamat}</p>
      </div>

      {/* PEMBUKAAN */}
      <div className="mb-4 text-justify">
          <p>Dengan hormat,</p>
          <p className="mt-2">Saya yang bertanda tangan di bawah ini:</p>
      </div>

      {/* IDENTITAS MAHASISWA */}
      <div className="pl-4 space-y-2 mb-6">
          <IdentityRow label="Nama Mahasiswa" value={data.pihak1Nama} />
          <IdentityRow label="N I M" value={data.pihak1NIM} />
          <IdentityRow label="Program Studi" value={data.pihak1Prodi} />
          <IdentityRow label="Fakultas" value={data.pihak1Fakultas} />
          <IdentityRow label="No. Induk Kependudukan" value={data.pihak1NIK} />
          <IdentityRow label="Alamat Mahasiswa" value={data.pihak1Alamat} />
      </div>

      <div className="mb-6 text-justify">
          <p className="mb-3 leading-relaxed">
              Melalui surat ini, saya bermaksud untuk mengajukan permohonan <strong>Cuti Akademik</strong> selama {data.lamaCuti}, terhitung mulai dari Semester {data.semesterTujuan} Tahun Akademik {data.tahunAkademik} ({formatDateSafe(data.tanggalMulai)} s/d {formatDateSafe(data.tanggalSelesai)}).
          </p>
          <p className="mb-3 leading-relaxed">
              Adapun permohonan cuti akademik ini saya ajukan dikarenakan:
          </p>
          <p className="pl-4 italic font-bold mb-3">"{data.alasanCuti}"</p>
          <p className="leading-relaxed">
              Sebagai bahan pertimbangan Bapak/Ibu, bersama surat ini turut saya lampirkan dokumen pendukung dan bukti pelunasan administrasi akademik semester sebelumnya. Saya berkomitmen untuk melakukan registrasi ulang (herregistrasi) setelah masa cuti akademik saya berakhir sesuai dengan ketentuan yang berlaku di {data.pihak2Instansi}.
          </p>
      </div>

      <div className="mb-12 text-justify">
          <p className="leading-relaxed">
              Demikian surat permohonan cuti akademik ini saya buat dengan sebenar-benarnya dan tanpa paksaan dari pihak manapun. Atas perhatian, kebijaksanaan, dan persetujuan Bapak/Ibu {data.pihak2Jabatan}, saya ucapkan terima kasih.
          </p>
      </div>

      {/* PENGESAHAN (TANDA TANGAN) */}
      <div className="mt-4 break-inside-avoid">
         <div className="flex justify-between text-center items-stretch mb-4">
            <div className="w-[40%] flex flex-col justify-between">
               <p className="mb-2">&nbsp;</p>
               <p className="mb-4">Menyetujui,<br/><strong>{data.pihak2Jabatan}</strong></p>
               <div className="h-20"></div>
               <p className="font-bold underline">{data.pihak2Nama}</p>
               <p>NIP. {data.pihak2NIK}</p>
            </div>
            <div className="w-[40%] flex flex-col justify-between">
               <p className="mb-2">Hormat Saya,</p>
               <p className="mb-4">Pemohon,<br/><strong>Mahasiswa</strong></p>
               <div className="h-20"></div>
               <p className="font-bold underline">{data.pihak1Nama}</p>
               <p>NIM. {data.pihak1NIM}</p>
            </div>
         </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Cuti Kuliah</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Cuti Kuliah
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. LOKASI & TANGGAL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-sky-600"/> Pembuatan Surat
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota</label>
                      <input type="text" name="tempatDibuat" value={data.tempatDibuat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                      <input type="date" name="tanggalDibuat" value={data.tanggalDibuat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. IDENTITAS MAHASISWA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-emerald-600"/> Data Mahasiswa
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="pihak1Nama" value={data.pihak1Nama} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Induk Mahasiswa (NIM)</label>
                      <input type="text" name="pihak1NIM" value={data.pihak1NIM} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Program Studi</label>
                        <input type="text" name="pihak1Prodi" value={data.pihak1Prodi} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Fakultas</label>
                        <input type="text" name="pihak1Fakultas" value={data.pihak1Fakultas} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                      <input type="text" name="pihak1NIK" value={data.pihak1NIK} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 3. TUJUAN SURAT (DEKAN/REKTOR) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-amber-600"/> Tujuan Surat (Kampus)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Tujuan (Contoh: Dekan Fakultas Ilmu Komputer)</label>
                      <input type="text" name="pihak2Jabatan" value={data.pihak2Jabatan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat (Boleh dikosongkan)</label>
                      <input type="text" name="pihak2Nama" value={data.pihak2Nama} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi / Universitas</label>
                      <input type="text" name="pihak2Instansi" value={data.pihak2Instansi} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Kampus</label>
                      <input type="text" name="pihak2Alamat" value={data.pihak2Alamat} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-amber-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 4. RINCIAN CUTI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Calendar size={14} className="text-purple-600"/> Rincian Cuti
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Semester</label>
                        <select name="semesterTujuan" value={data.semesterTujuan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none">
                          <option value="Ganjil">Ganjil</option>
                          <option value="Genap">Genap</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tahun Akademik</label>
                        <input type="text" name="tahunAkademik" value={data.tahunAkademik} onChange={handleStringChange} placeholder="Misal: 2026/2027" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lama Cuti</label>
                      <input type="text" name="lamaCuti" value={data.lamaCuti} onChange={handleStringChange} placeholder="Misal: 1 (satu) Semester" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Mulai</label>
                        <input type="date" name="tanggalMulai" value={data.tanggalMulai} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Selesai</label>
                        <input type="date" name="tanggalSelesai" value={data.tanggalSelesai} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Cuti</label>
                      <textarea name="alasanCuti" value={data.alasanCuti} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-800 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat Cuti Akademik (Kuliah)" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
