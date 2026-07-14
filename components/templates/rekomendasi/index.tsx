'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, User, Star, PenTool
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface RekomendasiData {
  kopSurat: {
    namaPerusahaan: string;
    alamat: string;
    kontak: string;
    website: string;
  };
  nomorSurat: string;
  tanggalSurat: string;
  karyawan: {
    nama: string;
    nik: string;
    jabatanTerakhir: string;
    departemen: string;
    tanggalMulai: string;
    tanggalSelesai: string;
  };
  alasanRekomendasi: string;
  alasanKeluar: string;
  penandatangan: {
    nama: string;
    jabatan: string;
  };
}

// --- 2. DATA DEFAULT ---
const DEFAULT_DATA: RekomendasiData = {
  kopSurat: {
    namaPerusahaan: "PT BINA KARYA GEMILANG",
    alamat: "Gedung Cyber Tower Lt. 15, Jl. H.R. Rasuna Said Kav. X-2, Jakarta Selatan 12950",
    kontak: "Telp: (021) 555-0198 | Fax: (021) 555-0199 | Email: hr@binakarya.co.id",
    website: "www.binakarya.co.id",
  },
  nomorSurat: "087/HRD-BKG/REF/VIII/2026",
  tanggalSurat: new Date().toISOString().split("T")[0],
  karyawan: {
    nama: "Budi Santoso, S.Kom.",
    nik: "BKG-2020-045",
    jabatanTerakhir: "Senior Software Engineer",
    departemen: "Information Technology",
    tanggalMulai: "2020-02-15",
    tanggalSelesai: "2026-07-31",
  },
  alasanRekomendasi: "Selama masa baktinya di perusahaan kami, yang bersangkutan telah menunjukkan kinerja yang sangat memuaskan, dedikasi yang tinggi, serta integritas yang baik. Yang bersangkutan mampu bekerja secara mandiri maupun dalam tim, dan selalu memberikan kontribusi positif terhadap pencapaian target perusahaan.",
  alasanKeluar: "mengundurkan diri atas kemauan sendiri",
  penandatangan: {
    nama: "Siti Rahmawati, S.E., M.M.",
    jabatan: "Human Resources Director",
  },
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function RekomendasiKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Rekomendasi...</div>}>
      <RekomendasiBuilder />
    </Suspense>
  );
}

function RekomendasiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'kop' | 'surat' | 'karyawan' | 'penilaian'>('kop');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RekomendasiData>(DEFAULT_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(DEFAULT_DATA);
    }
  };

  const handleInputChange = (section: keyof RekomendasiData, field: string, value: string) => {
    setData((prev) => {
      const targetSection = prev[section];
      if (typeof targetSection === "object" && targetSection !== null) {
        return { ...prev, [section]: { ...targetSection, [field]: value } };
      }
      return { ...prev, [section]: value };
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* Kop Surat */}
      <div className="border-b-4 border-black pb-4 mb-8 text-center break-inside-avoid">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1" style={{ fontSize: '18pt' }}>{data.kopSurat.namaPerusahaan}</h1>
        <p className="text-sm mb-1">{data.kopSurat.alamat}</p>
        <p className="text-sm">{data.kopSurat.kontak}</p>
        <p className="text-sm">{data.kopSurat.website}</p>
      </div>

      {/* Judul Surat */}
      <div className="text-center mb-10 break-inside-avoid">
        <h2 className="text-xl font-bold uppercase tracking-wide border-b border-black inline-block pb-1">Surat Rekomendasi Kerja</h2>
        <p className="mt-2 text-[11pt] uppercase">Nomor: {data.nomorSurat}</p>
      </div>

      {/* Pembuka */}
      <div className="mb-6 break-inside-avoid text-justify">
        <p>Yang bertanda tangan di bawah ini:</p>
        <table className="w-full mt-2 ml-6">
          <tbody>
            <tr>
              <td className="w-[150px] py-1">Nama</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1 font-bold">{data.penandatangan.nama}</td>
            </tr>
            <tr>
              <td className="py-1">Jabatan</td>
              <td className="py-1">:</td>
              <td className="py-1">{data.penandatangan.jabatan}</td>
            </tr>
            <tr>
              <td className="py-1">Perusahaan</td>
              <td className="py-1">:</td>
              <td className="py-1 font-bold uppercase">{data.kopSurat.namaPerusahaan}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Isi - Identitas Karyawan */}
      <div className="mb-6 break-inside-avoid text-justify">
        <p>Dengan ini memberikan rekomendasi kerja kepada mantan karyawan kami:</p>
        <table className="w-full mt-2 ml-6">
          <tbody>
            <tr>
              <td className="w-[150px] py-1">Nama</td>
              <td className="w-4 py-1">:</td>
              <td className="py-1 font-bold">{data.karyawan.nama}</td>
            </tr>
            <tr>
              <td className="py-1">NIK</td>
              <td className="py-1">:</td>
              <td className="py-1">{data.karyawan.nik}</td>
            </tr>
            <tr>
              <td className="py-1">Jabatan Terakhir</td>
              <td className="py-1">:</td>
              <td className="py-1">{data.karyawan.jabatanTerakhir}</td>
            </tr>
            <tr>
              <td className="py-1">Departemen</td>
              <td className="py-1">:</td>
              <td className="py-1">{data.karyawan.departemen}</td>
            </tr>
            <tr>
              <td className="py-1">Masa Bekerja</td>
              <td className="py-1">:</td>
              <td className="py-1">{formatDate(data.karyawan.tanggalMulai)} s.d. {formatDate(data.karyawan.tanggalSelesai)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Rekomendasi & Alasan Keluar */}
      <div className="mb-8 break-inside-avoid text-justify">
        <p className="indent-8 mb-4 leading-relaxed">
          {data.alasanRekomendasi}
        </p>
        <p className="indent-8 mb-4 leading-relaxed">
          Yang bersangkutan mengakhiri masa tugasnya di perusahaan kami dikarenakan {data.alasanKeluar}. 
          Kami sangat merekomendasikan Saudara/i <strong>{data.karyawan.nama}</strong> dan percaya bahwa beliau dapat menjadi aset yang sangat berharga bagi perusahaan yang Bapak/Ibu pimpin.
        </p>
        <p className="indent-8 leading-relaxed">
          Demikian surat rekomendasi ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.
        </p>
      </div>

      {/* Tanda Tangan */}
      <div className="flex justify-end mt-16 pr-8 break-inside-avoid shrink-0">
        <div className="text-center w-64">
          <p className="mb-1">Jakarta, {formatDate(data.tanggalSurat)}</p>
          <p className="font-bold mb-24">{data.kopSurat.namaPerusahaan}</p>
          <div className="relative">
            <p className="font-bold underline">{data.penandatangan.nama}</p>
            <p>{data.penandatangan.jabatan}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 overflow-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Rekomendasi Kerja</h1>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Reference Letter</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans shrink-0">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:hidden">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <Star size={18} className="text-blue-600" /> Editor Rekomendasi
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase shrink-0">
              <button onClick={() => setActiveTab('kop')} className={`flex-1 py-3 border-r ${activeTab === 'kop' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kop</button>
              <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 border-r ${activeTab === 'surat' ? 'bg-white text-indigo-600 border-b-2 border-b-indigo-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat & TTD</button>
              <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 border-r ${activeTab === 'karyawan' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
              <button onClick={() => setActiveTab('penilaian')} className={`flex-1 py-3 ${activeTab === 'penilaian' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Isi</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent pb-32">
                
                {activeTab === 'kop' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4 flex items-center gap-2"><Building2 size={14}/> Profil Perusahaan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                    <input type="text" value={data.kopSurat.namaPerusahaan} onChange={(e) => handleInputChange('kopSurat', 'namaPerusahaan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan</label>
                    <textarea value={data.kopSurat.alamat} onChange={(e) => handleInputChange('kopSurat', 'alamat', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Kontak (Telp/Email)</label>
                    <input type="text" value={data.kopSurat.kontak} onChange={(e) => handleInputChange('kopSurat', 'kontak', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Website</label>
                    <input type="text" value={data.kopSurat.website} onChange={(e) => handleInputChange('kopSurat', 'website', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                )}

                {activeTab === 'surat' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4 flex items-center gap-2"><PenTool size={14}/> Surat & Penandatangan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                    <input type="text" value={data.nomorSurat} onChange={(e) => handleInputChange('nomorSurat', '', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Terbit</label>
                    <input type="date" value={data.tanggalSurat} onChange={(e) => handleInputChange('tanggalSurat', '', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  
                  <h3 className="text-xs font-black uppercase text-indigo-600 border-b pb-1 mb-4 mt-6">Penandatangan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penandatangan</label>
                    <input type="text" value={data.penandatangan.nama} onChange={(e) => handleInputChange('penandatangan', 'nama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Penandatangan</label>
                    <input type="text" value={data.penandatangan.jabatan} onChange={(e) => handleInputChange('penandatangan', 'jabatan', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                )}

                {activeTab === 'karyawan' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4 flex items-center gap-2"><User size={14}/> Identitas Karyawan</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Karyawan</label>
                    <input type="text" value={data.karyawan.nama} onChange={(e) => handleInputChange('karyawan', 'nama', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs font-bold mt-1 focus:ring-2 focus:ring-emerald-500 outline-none uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID Karyawan</label>
                    <input type="text" value={data.karyawan.nik} onChange={(e) => handleInputChange('karyawan', 'nik', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Terakhir</label>
                    <input type="text" value={data.karyawan.jabatanTerakhir} onChange={(e) => handleInputChange('karyawan', 'jabatanTerakhir', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen</label>
                    <input type="text" value={data.karyawan.departemen} onChange={(e) => handleInputChange('karyawan', 'departemen', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Kerja Mulai</label>
                      <input type="date" value={data.karyawan.tanggalMulai} onChange={(e) => handleInputChange('karyawan', 'tanggalMulai', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Kerja Akhir</label>
                      <input type="date" value={data.karyawan.tanggalSelesai} onChange={(e) => handleInputChange('karyawan', 'tanggalSelesai', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                  </div>
                </div>
                )}

                {activeTab === 'penilaian' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4 flex items-center gap-2"><Star size={14}/> Narasi Rekomendasi</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Alasan Keluar / Pengunduran Diri</label>
                    <textarea value={data.alasanKeluar} onChange={(e) => handleInputChange('alasanKeluar', '', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"></textarea>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Deskripsi Rekomendasi (Sifat Pekerja & Pencapaian)</label>
                    <textarea value={data.alasanRekomendasi} onChange={(e) => handleInputChange('alasanRekomendasi', '', e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg text-xs mt-1 h-40 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"></textarea>
                  </div>
                </div>
                )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat_Rekomendasi_Kerja" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
