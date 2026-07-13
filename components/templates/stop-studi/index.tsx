'use client';

/**
 * FILE: TidakStudiPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan Tidak Sedang Menempuh Pendidikan Formal
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML & Stabilisasi Scope Variabel
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, UserCircle2, X, PenTool, 
  ShieldCheck, FileWarning, MapPin, GraduationCap, Ban,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface NoStudyData {
  city: string;
  date: string;
  
  // Pemohon
  name: string;
  nik: string;
  placeBirth: string;
  dateBirth: string;
  address: string;
  
  // Isi
  purpose: string;
  statementBody: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: NoStudyData = {
  city: 'DENPASAR',
  date: '', 
  
  name: 'BAGUS RAMADHAN',
  nik: '5171010101990001',
  placeBirth: 'Denpasar',
  dateBirth: '1999-12-25',
  address: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  
  purpose: 'Melamar Pekerjaan di PT. Teknologi Indonesia Makmur',
  statementBody: 'Menyatakan dengan sebenarnya bahwa pada saat ini saya TIDAK SEDANG MENEMPUH PENDIDIKAN FORMAL (sekolah/kuliah) di instansi manapun baik negeri maupun swasta.'
};

// --- 3. KOMPONEN UTAMA ---
export default function TidakStudiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <NoStudyBuilder />
    </Suspense>
  );
}

function NoStudyBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<NoStudyData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof NoStudyData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Ringkas';

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Standar Formal
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Ringkas
        </button>
    </div>
  );

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* JUDUL */}
        <div className="text-center mb-12 shrink-0 leading-tight font-sans">
          <h1 className="text-2xl font-black underline uppercase decoration-2 underline-offset-8 tracking-widest text-slate-900">SURAT PERNYATAAN</h1>
          <p className="text-[10pt] mt-5 italic uppercase tracking-[0.3em] text-slate-400 print:text-black font-bold">Tidak Sedang Menempuh Pendidikan Formal</p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-8 overflow-hidden text-justify leading-relaxed">
          <p>Saya yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-8 space-y-1.5 font-sans border-l-4 border-slate-100 pl-8 py-1 break-inside-avoid print:border-slate-300 italic text-[10.5pt]">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase text-slate-900 not-italic">{data.name}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span className="font-mono">{data.nik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {formatDateSafe(data.dateBirth)}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.address}</span></div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-100 print:bg-transparent print:border-2 print:border-black break-inside-avoid shadow-inner print:shadow-none">
            <p className="indent-10 font-bold italic text-[11.5pt] text-slate-800 print:text-black leading-relaxed">
              "{data.statementBody}"
            </p>
          </div>

          <div className="space-y-4">
            <p>
              Surat pernyataan ini saya buat dengan penuh kesadaran dan tanpa ada paksaan dari pihak manapun, guna memenuhi salah satu persyaratan untuk:
            </p>
            <p className="font-black text-blue-800 print:text-black text-center text-lg uppercase tracking-tight">
              {data.purpose}
            </p>
          </div>

          <p>
            Demikian pernyataan ini saya buat dengan sebenar-benarnya sesuai dengan kondisi yang ada. Apabila di kemudian hari ditemukan bahwa pernyataan ini tidak benar, maka saya bersedia menerima sanksi administratif maupun hukum sesuai dengan ketentuan yang berlaku.
          </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10 pt-10 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex justify-end text-center font-sans">
            <div className="w-80">
              <p className="text-[10pt] mb-1 font-bold text-slate-400">{data.city}, {formatDateSafe(data.date)}</p>
              <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1 print:text-black">Yang Membuat Pernyataan,</p>
              <div className="mt-8 mb-2 flex flex-col items-center">
                 <div className="border border-slate-200 w-24 h-16 flex items-center justify-center text-[7pt] text-slate-300 italic print:border-black print:text-black uppercase mb-4 shadow-sm">Materai 10.000</div>
                 <p className="font-black underline uppercase text-[11pt] tracking-tighter text-slate-900">{data.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Ban size={16} /> <span>No-Study Statement Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Konten</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Identitas Diri</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK / No. KTP" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Tempat Lahir" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Domisili Sesuai KTP" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileWarning size={12}/> Pernyataan & Administrasi</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-32 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed italic" value={data.statementBody} onChange={e => handleDataChange('statementBody', e.target.value)} placeholder="Tuliskan narasi pernyataan..." />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-bold" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembuatan (Cth: Melamar Kerja)" />
                 <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
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

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}