'use client';

/**
 * FILE: IzinPasanganPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Izin Pasangan (Suami/Istri)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Heart, UserCircle2, FileText, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PartnerData {
  city: string;
  date: string;
  partnerName: string;
  partnerNik: string;
  partnerJob: string;
  partnerAddress: string;
  partnerRelation: 'ISTRI' | 'SUAMI'; 
  userName: string;
  userNik: string;
  purpose: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PartnerData = {
  city: 'SLEMAN',
  date: '',
  partnerName: 'SITI AMINAH',
  partnerNik: '3404014506920002',
  partnerJob: 'Ibu Rumah Tangga',
  partnerAddress: 'Jl. Kaliurang KM 10, Gayam, Sleman',
  partnerRelation: 'ISTRI',
  userName: 'ANDI PRASETYO',
  userNik: '3404011203900005',
  purpose: 'Melamar Pekerjaan sebagai Operator Produksi di PT. Maju Bersama Jaya dan bersedia ditempatkan di luar kota.',
};

export default function IzinPasanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <PartnerConsentBuilder />
    </Suspense>
  );
}

function PartnerConsentBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PartnerData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PartnerData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Formal (Materai)' : 'Sederhana';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
          
          <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
            <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-4 leading-none">SURAT IZIN {data.partnerRelation}</h1>
          </div>

          <div className="space-y-4 flex-grow">
            <p>Saya yang bertanda tangan di bawah ini:</p>
            
            <div className="ml-6 space-y-1 text-[11pt] break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.partnerName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.partnerNik}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.partnerJob}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.partnerAddress}</span></div>
            </div>

            <p className="mt-2 break-inside-avoid">Dengan ini memberikan <strong>IZIN SEPENUHNYA</strong> kepada {data.partnerRelation === 'ISTRI' ? 'Suami' : 'Istri'} saya:</p>

            <div className="ml-6 space-y-1 text-[11pt] break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.userName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.userNik}</span></div>
            </div>

            <div className="space-y-4 text-justify leading-relaxed mt-2">
              <p className="break-inside-avoid">Untuk mengikuti / melakukan hal sebagai berikut:</p>
              <div className="bg-slate-50 p-4 border border-slate-200 italic font-medium text-center text-sm break-inside-avoid">
                "{data.purpose}"
              </div>
              
              <p className="break-inside-avoid">Bahwa selaku {data.partnerRelation}, saya mendukung penuh keputusan tersebut dan tidak akan melakukan tuntutan apapun di kemudian hari kepada pihak penyelenggara/perusahaan terkait selama kegiatan tersebut tidak melanggar hukum dan norma yang berlaku.</p>
              
              <p className="break-inside-avoid">Demikian surat izin ini saya buat dengan penuh kesadaran dan tanpa ada paksaan dari pihak manapun, untuk dipergunakan sebagaimana mestinya.</p>
            </div>
          </div>

          <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
            <p className="text-right mb-8">{data.city}, {formatDateSafe(data.date)}</p>
            
            <div className="flex justify-between items-end text-[11pt]">
                <div className="text-center w-56">
                  <p className="mb-20 font-bold uppercase text-xs tracking-widest">Yang Diberi Izin,</p>
                  <p className="font-bold underline uppercase leading-none">{data.userName}</p>
                </div>
                
                <div className="text-center w-56">
                  <p className="mb-4 font-bold uppercase text-xs tracking-widest">Pemberi Izin ({data.partnerRelation}),</p>
                  {templateId === 1 ? (
                    <div className="border border-slate-300 w-20 h-14 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400 italic font-sans uppercase">MATERAI 10.000</div>
                  ) : (
                    <div className="h-16"></div>
                  )}
                  <p className="font-bold underline uppercase leading-none">{data.partnerName}</p>
                </div>
            </div>
          </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT - FIXED TypeScript 2322 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white; 
          }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Heart size={16} className="text-pink-500" /> <span className="uppercase tracking-tighter">Partner Consent Creator</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Formal (Materai) {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Sederhana {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* EDITOR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-pink-600 tracking-widest border-b pb-1">Data Pasangan</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleDataChange('partnerRelation', 'ISTRI')} className={`py-2 rounded-lg text-xs font-bold ${data.partnerRelation === 'ISTRI' ? 'bg-pink-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400'}`}>ISTRI</button>
                  <button onClick={() => handleDataChange('partnerRelation', 'SUAMI')} className={`py-2 rounded-lg text-xs font-bold ${data.partnerRelation === 'SUAMI' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-400'}`}>SUAMI</button>
                </div>
                <input className="w-full p-2 border rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-pink-500 outline-none" value={data.partnerName} onChange={e => handleDataChange('partnerName', e.target.value)} placeholder="Nama Pasangan" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" value={data.partnerNik} onChange={e => handleDataChange('partnerNik', e.target.value)} placeholder="NIK" />
                  <input className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none" value={data.partnerJob} onChange={e => handleDataChange('partnerJob', e.target.value)} placeholder="Pekerjaan" />
                </div>
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-pink-500 outline-none" value={data.partnerAddress} onChange={e => handleDataChange('partnerAddress', e.target.value)} placeholder="Alamat Pasangan" />
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-widest border-b pb-1">Data Anda</h3>
                <input className="w-full p-2 border rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.userName} onChange={e => handleDataChange('userName', e.target.value)} placeholder="Nama Anda" />
                <input className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={data.userNik} onChange={e => handleDataChange('userNik', e.target.value)} placeholder="NIK Anda" />
              </div>

              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b pb-1">Tujuan Izin</h3>
                <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Keperluan..." />
                <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE