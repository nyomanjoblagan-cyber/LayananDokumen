'use client';

/**
 * FILE: PaktaIntegritasPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Pakta Integritas (Integrity Pact)
 * FEATURES:
 * - Dual Template (Classic Government vs Modern Corporate)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, 
  User, Building2, FileText, ChevronDown, Check, LayoutTemplate, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface PactData {
  city: string;
  date: string;
  name: string;
  nik: string;
  position: string;
  institution: string;
  address: string;
  points: string[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PactData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  name: 'RAHMAT HIDAYAT, S.T.',
  nik: '3171020304900002',
  position: 'Manajer Operasional',
  institution: 'PT. TEKNOLOGI CIPTA MANDIRI',
  address: 'Jl. Gatot Subroto No. 123, Jakarta Selatan',
  points: [
    "Tidak akan melakukan praktik Korupsi, Kolusi, dan Nepotisme (KKN).",
    "Akan melaporkan kepada pihak yang berwenang apabila mengetahui adanya indikasi KKN di lingkungan kerja.",
    "Akan melaksanakan tugas dan wewenang dengan penuh tanggung jawab, jujur, serta berdedikasi tinggi.",
    "Menghindari pertentangan kepentingan (conflict of interest) dalam pelaksanaan tugas.",
    "Akan memberi contoh dalam kepatuhan terhadap peraturan perundang-undangan dalam melaksanakan tugas.",
    "Apabila saya melanggar hal-hal tersebut di atas, saya bersiap menghadapi konsekuensi hukum, moral, dan administratif."
  ],
};

// --- 3. KOMPONEN UTAMA ---
export default function PaktaIntegritasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pakta...</div>}>
      <PaktaToolBuilder />
    </Suspense>
  );
}

function PaktaToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PactData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PactData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handlePointChange = (idx: number, val: string) => {
    const newPoints = [...data.points];
    newPoints[idx] = val;
    setData(prev => ({ ...prev, points: newPoints }));
  };

  const addPoint = () => {
    setData(prev => ({ ...prev, points: [...prev.points, ""] }));
  };

  const removePoint = (idx: number) => {
    const newPoints = [...data.points];
    newPoints.splice(idx, 1);
    setData(prev => ({ ...prev, points: newPoints }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Klasik (Instansi)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Modern (Corporate)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Klasik' : 'Format Modern';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* TEMPLATE 1: KLASIK */}
      {templateId === 1 && (
        <div className="flex flex-col font-serif text-[11pt] leading-relaxed text-justify">
            <div className="text-center mb-8 shrink-0">
               <h1 className="font-black text-xl uppercase tracking-widest underline decoration-2 underline-offset-4">PAKTA INTEGRITAS</h1>
            </div>

            <div className="shrink-0">
               <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>
               <div className="ml-8 mb-8 space-y-2">
                  <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
                  <div className="grid grid-cols-[150px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
                  <div className="grid grid-cols-[150px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.position}</span></div>
                  <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Instansi</span><span>:</span><span>{data.institution}</span></div>
                  <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
               </div>
               <p className="mb-4">Menyatakan dengan sebenarnya bahwa saya:</p>
            </div>

            {/* LIST POIN */}
            <div className="ml-4 mb-8 space-y-2 shrink-0">
               {data.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4">
                     <span className="shrink-0">{idx + 1}.</span>
                     <span>{point}</span>
                  </div>
               ))}
            </div>

            {/* TANDA TANGAN */}
            <div className="mt-8 shrink-0" style={{ pageBreakInside: 'avoid' }}>
               <p className="mb-8">Demikian pernyataan ini saya buat dengan sebenar-benarnya dan penuh rasa tanggung jawab.</p>
               <div className="flex justify-end text-center">
                  <div className="w-64">
                     <p className="mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                     <p className="mb-4 font-bold uppercase">Pembuat Pernyataan,</p>
                     <div className="h-20 flex items-center justify-center border border-dashed border-slate-300 text-[10px] text-slate-400 mb-2 bg-slate-50/50 print:border-black print:text-black">
                        MATERAI 10.000
                     </div>
                     <p className="font-bold underline uppercase">{data.name}</p>
                  </div>
               </div>
            </div>
        </div>
      )}

      {/* TEMPLATE 2: MODERN */}
      {templateId === 2 && (
        <div className="flex flex-col font-sans text-[11pt] leading-relaxed">
            <div className="flex justify-between items-start mb-10 border-b-2 border-slate-900 pb-6 shrink-0">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-slate-900 rounded text-white print:text-black print:bg-transparent print:border print:border-black"><ShieldCheck size={28}/></div>
                  <h1 className="text-2xl font-black uppercase tracking-tighter">Integrity Pact</h1>
               </div>
               <div className="text-right">
                  <div className="font-bold text-slate-900 uppercase text-lg">{data.institution}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold print:text-black">Standard Document</div>
               </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] gap-x-8 gap-y-2 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100 shrink-0 print:bg-transparent print:border-black">
               <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pt-1 print:text-black">Information</div>
               <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-900 uppercase leading-none">{data.name}</h2>
                  <p className="text-emerald-600 font-bold text-sm uppercase print:text-black">{data.position}</p>
                  <p className="text-slate-500 text-sm print:text-black">{data.nik}</p>
                  <p className="text-slate-500 text-sm print:text-black">{data.address}</p>
               </div>
            </div>

            <h3 className="font-black text-slate-900 uppercase text-sm mb-6 flex items-center gap-2 shrink-0">
               <div className="w-8 h-1.5 bg-emerald-500 print:bg-black"></div> SAKSI DAN PERNYATAAN
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-8 shrink-0">
               {data.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4">
                     <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs print:text-black print:bg-transparent print:border print:border-black">
                        {idx + 1}
                     </div>
                     <p className="text-slate-600 text-sm italic print:text-black leading-relaxed">"{point}"</p>
                  </div>
               ))}
            </div>

            {/* TANDA TANGAN MODERN */}
            <div className="mt-16 pt-6 flex justify-between items-end border-t border-slate-100 pb-4 shrink-0 print:border-black" style={{ pageBreakInside: 'avoid' }}>
               <div className="text-[9pt] text-slate-400 italic max-w-[300px] print:text-black">
                  This document serves as a binding commitment to professional ethics and corporate governance.
               </div>
               <div className="text-right">
                  <p className="text-[11pt] text-slate-400 font-bold uppercase tracking-widest mb-16 print:text-black">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : '...'}</p>
                  <p className="font-black text-slate-900 text-lg leading-none uppercase">{data.name}</p>
                  <div className="w-full h-0.5 bg-slate-900 mt-2"></div>
               </div>
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldCheck size={16} className="text-blue-500" /> <span>INTEGRITY PACT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pakta</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              {/* Penanda Tangan */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Penanda Tangan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Jabatan" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.institution} onChange={e => handleDataChange('institution', e.target.value)} placeholder="Instansi" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat" />
              </div>

              {/* Poin Pernyataan */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center justify-between border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2"><FileText size={12}/> Poin Pernyataan</h3>
                    <button onClick={addPoint} className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase hover:bg-emerald-200">+ Tambah</button>
                 </div>
                 {data.points.map((point, idx) => (
                    <div key={idx} className="flex gap-2">
                       <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={point} onChange={e => handlePointChange(idx, e.target.value)} />
                       <button onClick={() => removePoint(idx)} className="text-red-400 hover:text-red-600"><X size={14}/></button>
                    </div>
                 ))}
              </div>

              {/* Lokasi & Tanggal */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Lokasi & Tanggal</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <DocumentContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: 'auto' }} className="bg-white flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
