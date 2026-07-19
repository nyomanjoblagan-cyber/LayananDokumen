'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Building2, UserCircle2, Heart, ClipboardCheck, LayoutTemplate
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DonorData {
  city: string;
  date: string;
  docNo: string;
  
  institutionName: string;
  institutionAddress: string;
  
  donorName: string;
  donorNik: string;
  bloodType: string;
  
  donorType: string;
  donorTime: string;
  location: string;
  
  statement: string;

  officerName: string;
  officerId: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DonorData = {
  city: 'Denpasar',
  date: '13 Juli 2026',
  docNo: 'DONOR/PMI-DPS/2026/01/442',
  
  institutionName: 'Palang Merah Indonesia (PMI) Kota Denpasar',
  institutionAddress: 'Jl. Imam Bonjol No. 182, Denpasar, Bali',
  
  donorName: 'Bagus Ramadhan',
  donorNik: '5171010101990001',
  bloodType: 'O (Positif)',
  
  donorType: 'Donor Darah Sukarela',
  donorTime: '09:00 WITA',
  location: 'Unit Transfusi Darah (UTD) PMI Denpasar',
  
  statement: 'Telah mendonorkan darahnya secara sukarela untuk kepentingan kemanusiaan. Yang bersangkutan disarankan untuk beristirahat dari aktivitas fisik berat selama 24 jam ke depan.',

  officerName: 'dr. I Made Wira',
  officerId: 'NIP. 19850101 201001 1 004'
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function DonorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Donor...</div>}>
      <DonorBuilder />
    </Suspense>
  );
}

function DonorBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DonorData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Serif)' : 'Modern Premium (Sans)';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[9999]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => (
    <Kertas templateId={templateId}>
       {/* KOP SURAT */}
       <div className="text-center border-b-[4px] border-black pb-4 mb-8">
           <h1 className="font-bold text-2xl uppercase tracking-wider">{data.institutionName}</h1>
           <p className="text-[10pt] mt-1">{data.institutionAddress}</p>
       </div>

       {/* JUDUL SURAT */}
       <div className="text-center mb-10">
           <h1 className="font-bold text-xl uppercase underline tracking-wide">
               SURAT KETERANGAN DONOR DARAH
           </h1>
           <p className="mt-1">Nomor: {data.docNo}</p>
       </div>

       {/* PEMBUKA */}
       <div className="mb-6 text-justify leading-relaxed">
           <p>Unit Transfusi Darah {data.institutionName} dengan ini menerangkan bahwa:</p>
       </div>

       {/* IDENTITAS PENDONOR */}
       <div className="ml-8 mb-6 break-inside-avoid">
           <div className="flex mb-2"><span className="w-48 inline-block">Nama Lengkap</span><span className="mr-2">:</span><span className="font-bold uppercase">{data.donorName}</span></div>
           <div className="flex mb-2"><span className="w-48 inline-block">NIK</span><span className="mr-2">:</span><span>{data.donorNik}</span></div>
           <div className="flex mb-2"><span className="w-48 inline-block">Golongan Darah</span><span className="mr-2">:</span><span className="font-bold text-red-700">{data.bloodType}</span></div>
           <div className="flex mb-2"><span className="w-48 inline-block">Jenis Donor</span><span className="mr-2">:</span><span>{data.donorType}</span></div>
           <div className="flex mb-2"><span className="w-48 inline-block">Waktu Pelaksanaan</span><span className="mr-2">:</span><span>{data.date} / {data.donorTime}</span></div>
           <div className="flex mb-2"><span className="w-48 inline-block">Lokasi Pengambilan</span><span className="mr-2">:</span><span>{data.location}</span></div>
       </div>

       {/* PERNYATAAN / KETERANGAN MEDIS */}
       <div className="mb-6 text-justify leading-relaxed">
           <p>
               {data.statement}
           </p>
           <p className="mt-4">
               Demikian Surat Keterangan Donor ini diberikan sebagai tanda terima kasih atas partisipasi aktif dan sumbangsih sosial yang bersangkutan, serta dapat dipergunakan sebagaimana mestinya.
           </p>
       </div>

       {/* PENGESAHAN (TANDA TANGAN) */}
       <div className="mt-12 break-inside-avoid flex justify-end">
          <div className="w-[50%] flex flex-col justify-between text-center relative">
             <p className="mb-2">{data.city}, {data.date}</p>
             <p className="font-bold mb-4">Petugas Transfusi,</p>
             <div className="h-24"></div>
             <p className="font-bold underline uppercase">{data.officerName}</p>
             <p>{data.officerId}</p>
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
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Donor</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
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
                  <Heart size={18} className="text-sky-600" /> Editor Keterangan Donor
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INSTANSI & SURAT */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-amber-600"/> Instansi & Surat
                  </h3>
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                            <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                            <input type="text" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                        <input type="text" name="docNo" value={data.docNo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Instansi/Rumah Sakit</label>
                        <input type="text" name="institutionName" value={data.institutionName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                        <textarea name="institutionAddress" value={data.institutionAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 2. DATA PENDONOR */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-emerald-600"/> Data Pendonor
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pendonor</label>
                        <input type="text" name="donorName" value={data.donorName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (Opsional)</label>
                        <input type="text" name="donorNik" value={data.donorNik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Golongan Darah</label>
                        <input type="text" name="bloodType" value={data.bloodType} onChange={handleStringChange} className="w-full bg-red-50 border border-red-200 rounded-xl p-2.5 text-sm font-black text-red-700 focus:bg-white focus:ring-2 focus:ring-red-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Donor (Contoh: Donor Darah Sukarela)</label>
                        <input type="text" name="donorType" value={data.donorType} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Waktu Donor</label>
                        <input type="text" name="donorTime" value={data.donorTime} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi Pengambilan Darah</label>
                        <input type="text" name="location" value={data.location} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 3. PERNYATAAN & PETUGAS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <ClipboardCheck size={14} className="text-purple-600"/> Keterangan & Petugas
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Catatan / Rekomendasi Medis</label>
                        <textarea name="statement" value={data.statement} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-700 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Petugas</label>
                            <input type="text" name="officerName" value={data.officerName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP / ID Petugas</label>
                            <input type="text" name="officerId" value={data.officerId} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
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
              <PrintWrapper documentName="Surat Keterangan Donor" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
