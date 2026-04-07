'use client';

/**
 * FILE: PaktaIntegritasPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Pakta Integritas (Integrity Pact)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, 
  User, Building2, FileText, ChevronDown, Check, LayoutTemplate, Edit3, Eye, RotateCcw, X, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Pakta...</div>}>
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
  const [showDonation, setShowDonation] = useState(false);

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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Klasik' : 'Format Modern';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 && (
          <div className="flex flex-col h-full text-justify leading-relaxed">
              <div className="text-center mb-10 shrink-0">
                 <h1 className="font-black text-xl uppercase tracking-widest underline decoration-2 underline-offset-8">PAKTA INTEGRITAS</h1>
              </div>

              <div className="flex-grow">
                 <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>
                 <div className="ml-8 mb-8 space-y-2 break-inside-avoid">
                    <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.nik}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.position}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Instansi</span><span>:</span><span>{data.institution}</span></div>
                    <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                 </div>
                 <p className="mb-4">Menyatakan dengan sebenarnya bahwa saya:</p>
                 
                 <div className="ml-4 mb-8 space-y-3">
                    {data.points.map((point, idx) => (
                       <div key={idx} className="flex gap-4 break-inside-avoid">
                          <span className="shrink-0">{idx + 1}.</span>
                          <span>{point}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="mt-8 shrink-0 break-inside-avoid">
                 <p className="mb-10">Demikian pernyataan ini saya buat dengan sebenar-benarnya dan penuh rasa tanggung jawab.</p>
                 <div className="flex justify-end text-center font-sans">
                    <div className="w-64">
                       <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                       <p className="mb-4 font-bold uppercase text-xs">Pembuat Pernyataan,</p>
                       <div className="h-20 flex items-center justify-center border border-dashed border-slate-300 text-[9px] text-slate-400 mb-2 bg-slate-50 print:border-black uppercase font-sans">Materai 10.000</div>
                       <p className="font-bold underline uppercase text-sm font-serif">{data.name}</p>
                    </div>
                 </div>
              </div>
          </div>
        )}

        {templateId === 2 && (
          <div className="flex flex-col font-sans text-[11pt] leading-relaxed">
              <div className="flex justify-between items-start mb-10 border-b-2 border-slate-900 pb-6 shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-900 rounded text-white print:text-black print:bg-transparent print:border print:border-black"><ShieldCheck size={28}/></div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Integrity Pact</h1>
                 </div>
                 <div className="text-right">
                    <div className="font-bold text-slate-900 uppercase text-lg">{data.institution}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold print:text-black">Standard Compliance Document</div>
                 </div>
              </div>

              <div className="grid grid-cols-[150px_1fr] gap-x-8 gap-y-2 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100 shrink-0 print:bg-transparent print:border-black break-inside-avoid">
                 <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest pt-1">Person in Charge</div>
                 <div className="space-y-1">
                    <h2 className="text-xl font-black text-slate-900 uppercase leading-none">{data.name}</h2>
                    <p className="text-emerald-600 font-bold text-sm uppercase">{data.position}</p>
                    <p className="text-slate-500 text-sm font-mono">{data.nik}</p>
                 </div>
              </div>

              <h3 className="font-black text-slate-900 uppercase text-xs mb-6 flex items-center gap-2 shrink-0 tracking-widest">
                 <div className="w-8 h-1.5 bg-emerald-500 print:bg-black"></div> COMMITMENTS & STATEMENTS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-8 flex-grow">
                 {data.points.map((point, idx) => (
                    <div key={idx} className="flex gap-4 break-inside-avoid">
                       <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold text-xs print:text-black print:bg-transparent print:border print:border-black">
                          {idx + 1}
                       </div>
                       <p className="text-slate-600 text-xs italic leading-relaxed">"{point}"</p>
                    </div>
                 ))}
              </div>

              <div className="mt-16 pt-6 flex justify-between items-end border-t border-slate-200 shrink-0 break-inside-avoid">
                 <div className="text-[9pt] text-slate-400 italic max-w-[300px]">This document serves as a binding commitment to professional ethics and corporate governance protocols.</div>
                 <div className="text-right">
                    <p className="text-[10pt] text-slate-400 font-bold uppercase tracking-widest mb-16">{data.city}, {formatDateSafe(data.date)}</p>
                    <p className="font-black text-slate-900 text-lg leading-none uppercase">{data.name}</p>
                    <div className="w-full h-0.5 bg-slate-900 mt-2"></div>
                 </div>
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

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldCheck size={16} className="text-blue-500" /> <span>Integrity Pact Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Klasik {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Modern {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Pakta</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Identitas</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Jabatan" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.institution} onChange={e => handleDataChange('institution', e.target.value)} placeholder="Nama Instansi/PT" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-2"><FileText size={12}/> Poin-Poin</h3>
                    <button onClick={addPoint} className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">+ Poin</button>
                 </div>
                 <div className="space-y-3">
                    {data.points.map((point, idx) => (
                       <div key={idx} className="flex gap-2 group animate-in slide-in-from-right-2">
                          <textarea className="flex-1 p-2 border rounded-lg text-xs h-20 focus:ring-2 focus:ring-emerald-500 outline-none resize-none" value={point} onChange={e => handlePointChange(idx, e.target.value)} />
                          <button onClick={() => removePoint(idx)} className="text-red-400 hover:text-red-600"><X size={16}/></button>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}