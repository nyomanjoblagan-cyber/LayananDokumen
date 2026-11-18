import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\belum-punya-rumah\index.tsx"
    
    new_content = """'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, FileText, 
    User, Home, Target, MapPin, Landmark
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface HomeData {
  city: string;
  date: string;
  
  // Data Identitas
  name: string;
  nik: string;
  placeBirth: string;
  dateBirth: string;
  job: string;
  address: string;
  
  // Tujuan
  purpose: string;
  
  // Pejabat (RT/RW/Lurah)
  rt: string;
  rw: string;
  kelurahan: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: HomeData = {
  city: 'SLEMAN',
  date: '2026-08-20',
  
  name: 'AGUS SETIAWAN',
  nik: '3404020101920005',
  placeBirth: 'YOGYAKARTA',
  dateBirth: '1992-08-20',
  job: 'Karyawan Swasta',
  address: 'Jl. Palagan Tentara Pelajar No. 45, Sariharjo, Ngaglik, Sleman',
  
  purpose: 'Persyaratan Pengajuan KPR Bersubsidi (FLPP) melalui Bank Tabungan Negara (BTN).',
  
  rt: '04',
  rw: '12',
  kelurahan: 'SARIHARJO'
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group">
    {children}
  </div>
);

const IdentityRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex mb-1">
     <div className="w-56 shrink-0">{label}</div>
     <div className="w-4 shrink-0">:</div>
     <div className="flex-1 font-bold uppercase">{value}</div>
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function BelumPunyaRumahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <HomeDeclarationBuilder />
    </Suspense>
  );
}

function HomeDeclarationBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<HomeData>(INITIAL_DATA);

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
      {/* JUDUL SURAT */}
      <div className="text-center mb-10 break-inside-avoid">
          <h1 className="font-bold text-[14pt] uppercase tracking-wider underline underline-offset-4">SURAT PERNYATAAN BELUM MEMILIKI RUMAH</h1>
      </div>
      
      {/* PEMBUKAAN */}
      <div className="mb-6 text-justify">
          <p>
              Yang bertanda tangan di bawah ini:
          </p>
      </div>

      {/* IDENTITAS */}
      <div className="pl-4 space-y-4 mb-6">
          <IdentityRow label="Nama Lengkap" value={data.name} />
          <IdentityRow label="Nomor Induk Kependudukan (NIK)" value={data.nik} />
          <IdentityRow label="Tempat, Tgl Lahir" value={`${data.placeBirth}, ${formatDateSafe(data.dateBirth)}`} />
          <IdentityRow label="Pekerjaan" value={data.job} />
          <IdentityRow label="Alamat Domisili KTP" value={data.address} />
      </div>

      <div className="mb-8 text-justify">
          <p className="indent-8 leading-loose">
              Dengan ini menyatakan dengan sesungguhnya dan sebenar-benarnya, serta di bawah sumpah bahwa hingga saat Surat Pernyataan ini dibuat, saya <strong>BELUM PERNAH MEMILIKI RUMAH / TEMPAT TINGGAL</strong> (baik atas nama saya sendiri maupun atas nama istri/suami saya).
          </p>
          <p className="indent-8 leading-loose mt-4">
              Surat Pernyataan ini saya buat untuk dipergunakan sebagai <strong>{data.purpose}</strong>.
          </p>
          <p className="indent-8 leading-loose mt-4">
              Demikian Surat Pernyataan ini saya buat dalam keadaan sehat jasmani dan rohani, serta tanpa ada paksaan dari pihak manapun. Apabila di kemudian hari terbukti bahwa pernyataan saya ini tidak benar, maka saya bersedia menerima segala konsekuensi dan sanksi hukum yang berlaku, termasuk pembatalan fasilitas/subsidi yang saya terima.
          </p>
      </div>

      {/* PENUTUP & TANDA TANGAN */}
      <div className="mt-12 break-inside-avoid">
          <div className="flex justify-between items-end px-8">
              <div className="w-[45%] text-center">
                  {/* Kolom Kiri Kosong / Saksi Jika Ada */}
                  <p className="mb-2">&nbsp;</p>
                  <p className="mb-10">&nbsp;</p>
                  <p className="font-bold mb-4 uppercase">&nbsp;</p>
                  <div className="w-24 h-16 mx-auto flex items-center justify-center mb-4"></div>
                  <p className="font-bold underline uppercase">&nbsp;</p>
              </div>
              <div className="w-[45%] text-center">
                  <p className="mb-2">Dibuat di : <strong>{data.city}</strong></p>
                  <p className="mb-10">Pada tanggal : <strong>{formatDateSafe(data.date)}</strong></p>
                  <p className="font-bold mb-4 uppercase">Yang Membuat Pernyataan,</p>
                  <div className="w-24 h-16 border-2 border-gray-300 border-dashed mx-auto flex items-center justify-center mb-4 text-[9pt] text-gray-400 no-print opacity-50">
                    METERAI<br/>10.000
                  </div>
                  <p className="font-bold underline uppercase">{data.name}</p>
              </div>
          </div>
      </div>

      {/* PENGESAHAN RT / RW / KELURAHAN */}
      <div className="mt-16 break-inside-avoid pt-8 border-t-2 border-black border-dashed">
         <p className="text-center font-bold uppercase underline mb-8">MENGETAHUI / MENGESAHKAN</p>
         <div className="flex justify-between px-4 text-center">
            <div className="w-[30%]">
               <p className="font-bold mb-24 uppercase">Ketua RT. {data.rt}</p>
               <p className="font-bold underline uppercase">( ....................................... )</p>
            </div>
            <div className="w-[30%]">
               <p className="font-bold mb-24 uppercase">Ketua RW. {data.rw}</p>
               <p className="font-bold underline uppercase">( ....................................... )</p>
            </div>
            <div className="w-[30%] relative">
               <div className="absolute left-1/2 top-10 w-24 h-24 -translate-x-1/2 border-4 border-blue-800 rounded-full flex items-center justify-center opacity-30 -rotate-12 z-0 no-print group-hover:opacity-10 transition-opacity">
                  <div className="text-[8px] font-bold text-center text-blue-800">STEMPEL<br/>KELURAHAN</div>
               </div>
               <p className="font-bold mb-24 uppercase z-10 relative">Lurah / Kades {data.kelurahan}</p>
               <p className="font-bold underline uppercase z-10 relative">( ....................................... )</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Belum Punya Rumah</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor Surat Pernyataan
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. LOKASI & TANGGAL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-sky-600"/> Lokasi & Tanggal Pembuatan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota / Kabupaten</label>
                      <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                      <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. IDENTITAS PEMOHON */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-emerald-600"/> Identitas Diri (Sesuai KTP)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="name" value={data.name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK KTP</label>
                      <input type="text" name="nik" value={data.nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                        <input type="text" name="placeBirth" value={data.placeBirth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                        <input type="date" name="dateBirth" value={data.dateBirth} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                      <input type="text" name="job" value={data.job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                      <textarea name="address" value={data.address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-emerald-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 3. TUJUAN SURAT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Target size={14} className="text-purple-600"/> Keperluan Surat
                  </h3>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tujuan / Digunakan Untuk</label>
                    <textarea name="purpose" value={data.purpose} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-purple-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                  </div>
                </div>

                {/* 4. PENGESAHAN WILAYAH */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Landmark size={14} className="text-amber-600"/> Data Wilayah Pengesahan
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor RT</label>
                        <input type="text" name="rt" value={data.rt} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor RW</label>
                        <input type="text" name="rw" value={data.rw} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kelurahan / Desa</label>
                      <input type="text" name="kelurahan" value={data.kelurahan} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
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
              <PrintWrapper documentName="Surat Pernyataan Belum Memiliki Rumah" price={10000} />
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
