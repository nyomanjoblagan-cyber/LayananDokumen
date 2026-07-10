'use client';

/**
 * FILE: MOUPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perjanjian Kerjasama (MOU)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Map, 
  Handshake, Users, CalendarClock, FileText, Edit3, Eye, Briefcase, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface MOUData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1
  p1Name: string; 
  p1Rep: string;
  p1Title: string; 
  p1Address: string;
  
  // Pihak 2
  p2Name: string; 
  p2Rep: string; 
  p2Title: string; 
  p2Address: string;
  
  // Isi Kerjasama
  cooperationTitle: string;
  scope: string;
  period: string;
  rightsObligations: string;
  financing: string;
  witness1: string; 
  witness2: string;
  additionalClause: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MOUData = {
  day: 'Senin',
  date: '', 
  city: 'JAKARTA',
  
  p1Name: 'PT. TEKNOLOGI MAJU', 
  p1Rep: 'BUDI SANTOSO', 
  p1Title: 'Direktur Utama', 
  p1Address: 'Gedung Cyber Lt. 5, Jl. Kuningan Barat, Jakarta Selatan',
  
  p2Name: 'CV. KREATIF DIGITAL', 
  p2Rep: 'SITI AMINAH', 
  p2Title: 'General Manager', 
  p2Address: 'Ruko Grand Depok City No. 12, Depok',
  
  cooperationTitle: 'PENGEMBANGAN PEMASARAN DIGITAL & BRANDING',
  scope: 'Pihak Pertama menunjuk Pihak Kedua sebagai mitra pelaksana untuk mengelola media sosial, pembuatan konten digital, dan strategi periklanan online produk Pihak Pertama.',
  period: '1 (Satu) Tahun',
  rightsObligations: 'Pihak Pertama berkewajiban menyediakan materi produk. Pihak Kedua berkewajiban membuat timeline konten bulanan dan laporan performa.',
  financing: 'Sistem bagi hasil (Revenue Sharing) sebesar 10% dari omzet penjualan online, dibayarkan setiap tanggal 5 bulan berikutnya.',
  witness1: 'Manager Marketing', 
  witness2: 'Head of Legal',
  additionalClause: '' 
};

// --- 3. KOMPONEN UTAMA ---
export default function MOUPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <MOUBuilder />
    </Suspense>
  );
}

function MOUBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<MOUData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof MOUData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Bisnis Formal' : 'Kemitraan Simpel';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 && (
          <div className="flex flex-col h-full">
              <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
                <h1 className="font-black text-xl uppercase tracking-widest underline leading-none">NOTA KESEPAHAMAN</h1>
                <h2 className="font-bold text-sm mt-2 uppercase">(MEMORANDUM OF UNDERSTANDING)</h2>
                <div className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500 print:text-black">TENTANG {data.cooperationTitle}</div>
              </div>

              <div className="flex-grow">
                <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

                <div className="ml-4 mb-4 text-sm break-inside-avoid">
                  <table className="w-full leading-snug">
                      <tbody>
                        <tr><td className="w-32 font-bold align-top">Instansi</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p1Name}</td></tr>
                        <tr><td className="align-top">Perwakilan</td><td className="align-top">:</td><td className="align-top">{data.p1Rep} ({data.p1Title})</td></tr>
                        <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                      </tbody>
                  </table>
                  <div className="mt-1 italic">Selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</div>
                </div>

                <div className="ml-4 mb-6 text-sm break-inside-avoid">
                  <table className="w-full leading-snug">
                      <tbody>
                        <tr><td className="w-32 font-bold align-top">Instansi</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.p2Name}</td></tr>
                        <tr><td className="align-top">Perwakilan</td><td className="align-top">:</td><td className="align-top">{data.p2Rep} ({data.p2Title})</td></tr>
                        <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                      </tbody>
                  </table>
                  <div className="mt-1 italic">Selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</div>
                </div>

                <p className="mb-6 text-justify italic">PARA PIHAK sepakat untuk mengadakan kerjasama dengan ketentuan sebagai berikut:</p>

                <div className="space-y-6">
                  <div className="break-inside-avoid">
                    <div className="text-center font-bold uppercase mb-1 text-sm underline">PASAL 1: TUJUAN</div>
                    <p className="text-justify text-sm">Mensinergikan potensi PARA PIHAK dalam rangka <strong>{data.cooperationTitle.toLowerCase()}</strong>.</p>
                  </div>

                  <div className="break-inside-avoid">
                    <div className="text-center font-bold uppercase mb-1 text-sm underline">PASAL 2: RUANG LINGKUP</div>
                    <p className="text-justify text-sm">{data.scope}</p>
                  </div>

                  <div className="break-inside-avoid">
                    <div className="text-center font-bold uppercase mb-1 text-sm underline">PASAL 3: JANGKA WAKTU</div>
                    <p className="text-justify text-sm">Berlaku selama <strong>{data.period}</strong> dan dapat diperpanjang atas kesepakatan PARA PIHAK.</p>
                  </div>

                  <div className="break-inside-avoid">
                    <div className="text-center font-bold uppercase mb-1 text-sm underline">PASAL 4: PEMBIAYAAN</div>
                    <p className="text-justify text-sm">{data.financing}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 text-center text-sm mt-12 mb-8 break-inside-avoid">
                <div>
                    <p className="mb-2 font-bold uppercase text-[10px] text-slate-400">Pihak Pertama</p>
                    <div className="h-20 flex flex-col justify-end">
                       <div className="border border-slate-200 w-20 h-12 mx-auto mb-[-2rem] flex items-center justify-center text-[7px] text-slate-300 italic uppercase">Materai</div>
                       <p className="font-bold underline uppercase relative z-10">{data.p1Rep}</p>
                       <p className="text-[10px] opacity-70">{data.p1Name}</p>
                    </div>
                </div>
                <div>
                    <p className="mb-2 font-bold uppercase text-[10px] text-slate-400">Pihak Kedua</p>
                    <div className="h-20 flex flex-col justify-end">
                       <p className="font-bold underline uppercase">{data.p2Rep}</p>
                       <p className="text-[10px] opacity-70">{data.p2Name}</p>
                    </div>
                </div>
              </div>
          </div>
        )}

        {templateId === 2 && (
          <div className="flex flex-col h-full font-sans">
              <div className="text-center mb-6 border-b-4 border-slate-900 pb-2 shrink-0">
                <h1 className="font-black text-2xl uppercase tracking-tighter">PERJANJIAN KEMITRAAN</h1>
                <div className="text-xs font-bold uppercase mt-1 text-blue-600">{data.cooperationTitle}</div>
              </div>
              <p className="mb-4 text-sm">Kami yang sepakat bekerjasama pada {formatDateSafe(data.date)}:</p>
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                <div className="border-2 border-slate-100 p-3 rounded-lg"><b>PIHAK 1:</b><br/>{data.p1Name}<br/>({data.p1Rep})</div>
                <div className="border-2 border-slate-100 p-3 rounded-lg"><b>PIHAK 2:</b><br/>{data.p2Name}<br/>({data.p2Rep})</div>
              </div>
              <div className="space-y-4 text-sm flex-grow">
                <div className="p-3 bg-slate-50 rounded border"><b>LINGKUP:</b> {data.scope}</div>
                <div className="p-3 bg-slate-50 rounded border"><b>KOMPENSASI:</b> {data.financing}</div>
                <div className="p-3 bg-slate-50 rounded border"><b>DURASI:</b> {data.period}</div>
              </div>
              <div className="flex justify-between text-center mt-20 break-inside-avoid">
                <div className="w-40 border-t border-black pt-2 font-bold uppercase">{data.p1Rep}</div>
                <div className="w-40 border-t border-black pt-2 font-bold uppercase">{data.p2Rep}</div>
              </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Handshake size={16} className="text-blue-500" /> <span>MOU Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>MOU Formal {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>MOU Simpel {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor MOU</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1">Pihak Pertama</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama PT / Instansi" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Rep} onChange={e => handleDataChange('p1Rep', e.target.value)} placeholder="Nama Wakil" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} placeholder="Jabatan" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1">Pihak Kedua</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama PT / Instansi" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Rep} onChange={e => handleDataChange('p2Rep', e.target.value)} placeholder="Nama Wakil" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Title} onChange={e => handleDataChange('p2Title', e.target.value)} placeholder="Jabatan" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Detail Perjanjian</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none" value={data.cooperationTitle} onChange={e => handleDataChange('cooperationTitle', e.target.value)} placeholder="Judul Kerjasama" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-slate-500 outline-none" value={data.scope} onChange={e => handleDataChange('scope', e.target.value)} placeholder="Ruang Lingkup..." />
                <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-slate-500 outline-none" value={data.financing} onChange={e => handleDataChange('financing', e.target.value)} placeholder="Sistem Pembiayaan..." />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}