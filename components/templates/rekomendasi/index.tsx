'use client';

/**
 * FILE: RekomendasiKerjaPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Rekomendasi Kerja
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  Building2, User, Star, PenTool, CalendarRange, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. TYPE DEFINITIONS ---
interface RekomendasiData {
  namaPerusahaan: string;
  alamatPerusahaan: string;
  teleponPerusahaan: string;
  emailPerusahaan: string;
  
  nomorSurat: string;
  tanggalSurat: string;
  tempatPenetapan: string;
  
  namaKaryawan: string;
  nik: string;
  jabatanTerakhir: string;
  departemen: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  
  alasanRekomendasi: string;
  alasanKeluar: string;
  
  namaPenandatangan: string;
  jabatanPenandatangan: string;
}

// --- 2. DATA DEFAULT ---
const DEFAULT_DATA: RekomendasiData = {
  namaPerusahaan: "PT BINA KARYA GEMILANG",
  alamatPerusahaan: "Gedung Cyber Tower Lt. 15, Jl. H.R. Rasuna Said Kav. X-2, Jakarta Selatan 12950",
  teleponPerusahaan: "(021) 555-0198",
  emailPerusahaan: "hr@binakarya.co.id",
  
  nomorSurat: "087/HRD-BKG/REF/VIII/2026",
  tanggalSurat: "2026-07-31",
  tempatPenetapan: "Jakarta",
  
  namaKaryawan: "Budi Santoso, S.Kom.",
  nik: "BKG-2020-045",
  jabatanTerakhir: "Senior Software Engineer",
  departemen: "Information Technology",
  tanggalMulai: "2020-02-15",
  tanggalSelesai: "2026-07-31",
  
  alasanRekomendasi: "Selama masa baktinya di perusahaan kami, yang bersangkutan telah menunjukkan kinerja yang sangat memuaskan, dedikasi yang tinggi, serta integritas yang baik. Yang bersangkutan mampu bekerja secara mandiri maupun dalam tim, dan selalu memberikan kontribusi positif terhadap pencapaian target proyek-proyek perusahaan.",
  alasanKeluar: "Mengundurkan diri atas kemauan sendiri.",
  
  namaPenandatangan: "Siti Rahmawati, S.E., M.M.",
  jabatanPenandatangan: "Human Resources Director",
};

// --- HELPERS ---
function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
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
  const [activeTab, setActiveTab] = useState<'perusahaan' | 'surat' | 'karyawan' | 'penilaian'>('perusahaan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RekomendasiData>(DEFAULT_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof RekomendasiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat rekomendasi ke awal?')) {
        setData(DEFAULT_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER SURAT KEPUTUSAN */}
      <div className="text-center mb-6 break-inside-avoid border-b-2 border-black pb-4">
        <h1 className="font-bold text-xl uppercase tracking-wider">{data.namaPerusahaan}</h1>
        <p className="text-sm">{data.alamatPerusahaan}</p>
        <p className="text-sm">Telp: {data.teleponPerusahaan} | Email: {data.emailPerusahaan}</p>
      </div>

      <div className="text-center mb-8 break-inside-avoid">
        <h2 className="font-bold text-lg underline uppercase">SURAT REKOMENDASI KERJA</h2>
        <p className="font-bold mt-1">No: {data.nomorSurat}</p>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>Yang bertanda tangan di bawah ini:</p>
      </div>
      
      <div className="ml-8 mb-6 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaPenandatangan}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Jabatan</div><div className="w-4">:</div><div className="flex-1 uppercase">{data.jabatanPenandatangan}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Perusahaan</div><div className="w-4">:</div><div className="flex-1 uppercase font-bold">{data.namaPerusahaan}</div></div>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>Bertindak atas nama {data.namaPerusahaan}, menerangkan dengan sesungguhnya bahwa:</p>
      </div>

      <div className="ml-8 mb-6 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaKaryawan}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">NIK</div><div className="w-4">:</div><div className="flex-1">{data.nik}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Jabatan Terakhir</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.jabatanTerakhir}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Departemen</div><div className="w-4">:</div><div className="flex-1">{data.departemen}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Masa Kerja</div><div className="w-4">:</div><div className="flex-1">{formatDateDisplay(data.tanggalMulai)} s/d {formatDateDisplay(data.tanggalSelesai)}</div></div>
      </div>

      <div className="mb-6 text-justify break-inside-avoid">
        <p className="mb-2">{data.alasanRekomendasi}</p>
        <p>Yang bersangkutan telah mengakhiri hubungan kerja dengan perusahaan kami dengan alasan: <strong>{data.alasanKeluar}</strong></p>
      </div>

      <div className="mb-10 text-justify break-inside-avoid">
        <p>Oleh karena itu, kami dengan senang hati merekomendasikan Saudara/i <strong>{data.namaKaryawan}</strong> untuk dapat bergabung dan memberikan kontribusi terbaik di perusahaan atau institusi yang Bapak/Ibu pimpin.</p>
        <p className="mt-2">Demikian surat rekomendasi kerja ini dibuat agar dapat digunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end text-center break-inside-avoid px-4 mt-12">
        <div className="w-64">
            <p className="mb-2">{data.tempatPenetapan}, {formatDateDisplay(data.tanggalSurat)}<br/><strong>{data.namaPerusahaan}</strong></p>
            <div className="h-24"></div>
            <p className="font-bold underline uppercase">{data.namaPenandatangan}</p>
            <p className="text-sm uppercase">{data.jabatanPenandatangan}</p>
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK Rekomendasi Kerja</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Rekomendasi</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Star size={18} className="text-sky-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('perusahaan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perusahaan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Instansi</button>
                <button onClick={() => setActiveTab('surat')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'surat' ? 'bg-white border-t-2 border-sky-500 text-sky-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Detail Surat</button>
                <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'karyawan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pegawai</button>
                <button onClick={() => setActiveTab('penilaian')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'penilaian' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Penilaian</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'perusahaan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Perusahaan / Instansi
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan (Kop Surat)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telepon</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.teleponPerusahaan} onChange={e => handleChange('teleponPerusahaan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.emailPerusahaan} onChange={e => handleChange('emailPerusahaan', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4"></div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pemberi Rekomendasi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPenandatangan} onChange={e => handleChange('namaPenandatangan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan (Misal: HR Director)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jabatanPenandatangan} onChange={e => handleChange('jabatanPenandatangan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'surat' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-sky-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <PenTool size={14} className="text-sky-600"/> Detail Penerbitan Surat
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Referensi / Surat</label>
                            <input className="w-full bg-sky-50 p-2.5 border border-sky-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Penerbitan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.tempatPenetapan} onChange={e => handleChange('tempatPenetapan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'karyawan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-amber-600"/> Data Mantan Pegawai
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-2">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Karyawan</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.namaKaryawan} onChange={e => handleChange('namaKaryawan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.nik} onChange={e => handleChange('nik', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Terakhir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.jabatanTerakhir} onChange={e => handleChange('jabatanTerakhir', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Departemen</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.departemen} onChange={e => handleChange('departemen', e.target.value)} />
                            </div>
                        </div>

                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                            <h4 className="font-bold text-xs uppercase mb-2 text-amber-800 flex items-center gap-1"><CalendarRange size={14}/> Masa Kerja</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-amber-600 uppercase mb-1">Tanggal Mulai (Join)</label>
                                    <input type="date" className="w-full bg-white p-2 border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalMulai} onChange={e => handleChange('tanggalMulai', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-amber-600 uppercase mb-1">Tanggal Selesai (Resign)</label>
                                    <input type="date" className="w-full bg-white p-2 border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalSelesai} onChange={e => handleChange('tanggalSelesai', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'penilaian' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Star size={14} className="text-emerald-600"/> Teks Rekomendasi & Alasan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ulasan Kinerja / Narasi Rekomendasi</label>
                            <textarea className="w-full bg-emerald-50 p-3 border border-emerald-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alasanRekomendasi} onChange={e => handleChange('alasanRekomendasi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Berhenti Kerja</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alasanKeluar} onChange={e => handleChange('alasanKeluar', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Rekomendasi_${data.namaKaryawan.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
