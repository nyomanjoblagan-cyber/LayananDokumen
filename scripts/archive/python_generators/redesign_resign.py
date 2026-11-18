import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\resign\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: SuratResignPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Pengunduran Diri (Resign)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, User, Building2, Send
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ResignData {
  tempatTanggal: string;
  namaPenerima: string;
  jabatanPenerima: string;
  namaPerusahaan: string;
  alamatPerusahaan: string;
  
  namaKaryawan: string;
  jabatanKaryawan: string;
  departemenKaryawan: string;
  
  tanggalEfektif: string;
  alasanResign: string;
  ucapanTerimaKasih: string;
}

// --- 2. DATA DEFAULT ---
const getInitialData = (): ResignData => {
  const today = new Date();
  
  // Format Tanggal: Jakarta, 14 Juli 2026
  const formatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedToday = formatter.format(today);
  
  // Tanggal Efektif default = 30 hari dari sekarang (One Month Notice)
  const nextMonth = new Date(today);
  nextMonth.setDate(nextMonth.getDate() + 30);
  const formattedNextMonth = formatter.format(nextMonth);

  return {
    tempatTanggal: `Jakarta, ${formattedToday}`,
    namaPenerima: 'Bpk. Budi Santoso',
    jabatanPenerima: 'HRD Manager',
    namaPerusahaan: 'PT INDONESIA MAJU SEJAHTERA',
    alamatPerusahaan: 'Gedung Menara Mulia, Lantai 5\\nJl. Gatot Subroto, Jakarta',
    
    namaKaryawan: 'Andi Pratama, S.Kom.',
    jabatanKaryawan: 'Senior Software Engineer',
    departemenKaryawan: 'Information Technology (IT)',
    
    tanggalEfektif: formattedNextMonth,
    alasanResign: '', // Dikosongkan agar opsional
    ucapanTerimaKasih: 'Saya mengucapkan banyak terima kasih atas kesempatan yang telah diberikan kepada saya untuk belajar dan berkembang bersama perusahaan ini. Saya juga memohon maaf yang sebesar-besarnya apabila selama saya bekerja terdapat kesalahan maupun kekurangan.\\n\\nSaya berharap perusahaan akan terus berkembang dan semakin sukses di masa yang akan datang. Saya bersedia untuk membantu proses transisi pekerjaan (handover) agar berjalan dengan lancar hingga tanggal terakhir saya bekerja.',
  };
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratResignPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Resign...</div>}>
      <ResignBuilder />
    </Suspense>
  );
}

function ResignBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'tujuan' | 'karyawan' | 'isi'>('tujuan');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ResignData>(getInitialData());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof ResignData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(getInitialData());
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* TANGGAL DAN PERIHAL */}
      <div className="flex justify-between items-start mb-12 break-inside-avoid">
         <div>
             <p className="mb-2">{data.tempatTanggal}</p>
             <p className="font-bold">Perihal : Pengunduran Diri (Resign)</p>
         </div>
      </div>

      {/* TUJUAN SURAT */}
      <div className="mb-8 break-inside-avoid">
        <p className="mb-1">Kepada Yth,</p>
        <p className="font-bold">{data.namaPenerima}</p>
        <p className="font-bold">{data.jabatanPenerima}</p>
        <p className="font-bold uppercase">{data.namaPerusahaan}</p>
        <p className="whitespace-pre-line leading-snug">{data.alamatPerusahaan}</p>
      </div>

      {/* SALAM PEMBUKA & IDENTITAS */}
      <div className="text-justify mb-6 break-inside-avoid">
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
        
        <div className="pl-6 mb-4">
            <div className="flex mb-1"><div className="w-32">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.namaKaryawan}</div></div>
            <div className="flex mb-1"><div className="w-32">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.jabatanKaryawan}</div></div>
            <div className="flex mb-1"><div className="w-32">Departemen</div><div className="w-4">:</div><div className="flex-1">{data.departemenKaryawan}</div></div>
        </div>
      </div>

      {/* ISI SURAT */}
      <div className="text-justify mb-6 space-y-4">
        <p>
            Melalui surat ini, saya bermaksud untuk menyampaikan pengunduran diri saya dari jabatan <strong>{data.jabatanKaryawan}</strong> di <strong>{data.namaPerusahaan}</strong>.
            Adapun tanggal efektif pengunduran diri saya (hari terakhir bekerja) adalah pada tanggal <strong>{data.tanggalEfektif}</strong>.
        </p>
        
        {data.alasanResign && data.alasanResign.trim() !== '' && (
            <p>
                Keputusan pengunduran diri ini saya ambil dikarenakan {data.alasanResign}.
            </p>
        )}

        <div className="whitespace-pre-line">
            {data.ucapanTerimaKasih}
        </div>

        <p>
            Demikian surat pengunduran diri ini saya buat dengan sesungguhnya dan tanpa ada paksaan dari pihak mana pun. Atas perhatian dan kerja samanya, saya ucapkan terima kasih.
        </p>
      </div>

      {/* PENUTUP & TANDA TANGAN */}
      <div className="mt-16 break-inside-avoid">
        <p className="mb-2">Hormat saya,</p>
        <div className="h-24"></div>
        <p className="font-bold underline">{data.namaKaryawan}</p>
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
              <ArrowLeftCircle size={20} className="text-pink-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Pengunduran Diri</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><FileText size={18} className="text-pink-600" /> Editor Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('tujuan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'tujuan' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Tujuan (HRD)</button>
                <button onClick={() => setActiveTab('karyawan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'karyawan' ? 'bg-white border-t-2 border-pink-500 text-pink-700' : 'text-slate-500 hover:bg-slate-200'}`}>Karyawan</button>
                <button onClick={() => setActiveTab('isi')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'isi' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Isi & Alasan</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'tujuan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Send size={14} className="text-slate-600"/> Tujuan Surat (Atasan/HRD)
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penerima</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPenerima} onChange={e => handleChange('namaPenerima', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Penerima</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jabatanPenerima} onChange={e => handleChange('jabatanPenerima', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Perusahaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPerusahaan} onChange={e => handleChange('namaPerusahaan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Perusahaan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatPerusahaan} onChange={e => handleChange('alamatPerusahaan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'karyawan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-pink-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-pink-600"/> Data Karyawan (Yang Resign)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Karyawan</label>
                            <input className="w-full bg-pink-50 p-2.5 border border-pink-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.namaKaryawan} onChange={e => handleChange('namaKaryawan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Saat Ini</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.jabatanKaryawan} onChange={e => handleChange('jabatanKaryawan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Departemen / Divisi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-500 outline-none" value={data.departemenKaryawan} onChange={e => handleChange('departemenKaryawan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'isi' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Edit3 size={14} className="text-amber-600"/> Isi Surat & Alasan
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota & Tgl Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tempatTanggal} onChange={e => handleChange('tempatTanggal', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari Terakhir Kerja (Efektif)</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tanggalEfektif} onChange={e => handleChange('tanggalEfektif', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Resign (Opsional)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Contoh: mendapatkan tawaran pekerjaan di perusahaan lain yang lebih relevan dengan jenjang karir saya" value={data.alasanResign} onChange={e => handleChange('alasanResign', e.target.value)} />
                            <p className="text-[10px] text-slate-400 mt-1">Biarkan kosong jika tidak ingin menyebutkan alasan spesifik.</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ucapan Terima Kasih / Handover</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-40 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.ucapanTerimaKasih} onChange={e => handleChange('ucapanTerimaKasih', e.target.value)} />
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
              <PrintWrapper documentName={`Resign_${data.namaKaryawan.replace(/\\s+/g, '_')}`} price={35000} />
           </div>

        </div>
      </main>

    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
