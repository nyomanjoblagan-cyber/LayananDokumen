'use client';

/**
 * FILE: BebasKontrakPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pernyataan Bebas Kontrak / Tidak Terikat Kerja
 * FEATURES:
 * - Dual Template (Classic Formal vs Modern Clean)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, UserCircle2, 
  Briefcase, CalendarDays, FileText, LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface ContractData {
  city: string;
  date: string;
  name: string;
  nik: string;
  placeBirth: string;
  dateBirth: string;
  address: string;
  targetCompany: string;
  position: string;
  lastCompany: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ContractData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  name: 'RIZKY RAMADHAN',
  nik: '3171010101980005',
  placeBirth: 'Jakarta',
  dateBirth: '1998-05-12',
  address: 'Jl. Tebet Dalam IV No. 15, Jakarta Selatan',
  targetCompany: 'PT. TEKNOLOGI MAJU INDONESIA',
  position: 'Full Stack Developer',
  lastCompany: 'PT. SOLUSI DIGITAL LAMA',
};

// --- 3. KOMPONEN UTAMA ---
export default function BebasKontrakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Loading Editor...</div>}>
      <ContractFreeBuilder />
    </Suspense>
  );
}

function ContractFreeBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ContractData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ContractData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
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
            Klasik Formal
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Clean
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Klasik Formal' : 'Modern Clean';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-relaxed p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: KLASIK */
        <div className="flex flex-col h-full">
          <div className="text-center mb-10 pb-4 border-b-2 border-black shrink-0">
            <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-4">SURAT PERNYATAAN BEBAS KONTRAK</h1>
          </div>

          <div className="flex-grow space-y-6">
            <p>Saya yang bertanda tangan di bawah ini:</p>
            <div className="ml-8 space-y-2 font-sans text-sm print:text-[10pt]">
               <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
               <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
               <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat/Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {isClient && data.dateBirth ? new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</span></div>
               <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.address}</span></div>
            </div>

            <p className="text-justify">Menyatakan dengan sebenarnya bahwa sampai saat ini saya <strong>TIDAK SEDANG TERIKAT KONTRAK KERJA</strong> dengan instansi atau perusahaan manapun. Pernyataan ini dibuat sehubungan dengan proses rekrutmen di <strong>{data.targetCompany}</strong> sebagai <strong>{data.position}</strong>.</p>
            <p className="text-justify">Saya menjamin bahwa pengunduran diri dari perusahaan sebelumnya (<strong>{data.lastCompany}</strong>) telah tuntas secara administratif. Apabila di kemudian hari pernyataan ini terbukti tidak benar, saya bersedia menerima sanksi sesuai aturan perusahaan yang berlaku.</p>
            <p>Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.</p>
          </div>

          <div className="shrink-0 mt-12 flex justify-end" style={{ pageBreakInside: 'avoid' }}>
             <div className="text-center w-64">
                <p className="text-sm mb-4">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
                <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400 italic font-sans print:border-black print:text-black">MATERAI 10.000</div>
                <p className="font-bold underline uppercase text-base tracking-tight">{data.name}</p>
                <p className="text-[9pt] text-slate-400 font-sans uppercase tracking-widest mt-1 print:text-black">Pembuat Pernyataan</p>
             </div>
          </div>
        </div>
      ) : (
        /* TEMPLATE 2: MODERN */
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-12 border-t-[10px] border-blue-600 pt-8 shrink-0">
            <div>
              <h1 className="text-4xl font-black text-blue-600 tracking-tighter leading-none print:text-black">CLEARANCE</h1>
              <p className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase mt-2 print:text-black">Employment Status Statement</p>
            </div>
            <div className="text-right text-[10px] font-bold text-slate-400 print:text-black">
               <p className="font-mono">REF: STMT/{new Date().getFullYear()}/BC</p>
               <p className="uppercase mt-1">{data.city}, {data.date}</p>
            </div>
          </div>

          <div className="flex-grow space-y-12">
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100 block pb-1 print:text-black print:border-black">Declarer Info</label>
                <div>
                  <p className="text-xl font-black uppercase text-slate-800 leading-tight print:text-black">{data.name}</p>
                  <p className="text-xs text-slate-500 font-mono mt-1 print:text-black">NIK: {data.nik}</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-100 block pb-1 print:text-black print:border-black">Destination</label>
                <div>
                  <p className="text-sm font-bold uppercase text-slate-800 leading-tight print:text-black">{data.targetCompany}</p>
                  <p className="text-xs text-slate-500 mt-1 print:text-black">Applied as {data.position}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 print:bg-transparent print:border-black">
              <p className="text-[11pt] italic leading-relaxed text-slate-600 print:text-black font-serif text-justify">
                "I hereby confirm that as of today, I am <b>free from any employment contracts</b> or legal ties with other organizations, including my previous role at <b>{data.lastCompany}</b>. I am fully available to join the team and accept all legal consequences if this statement is found to be inaccurate."
              </p>
            </div>
          </div>

          <div className="shrink-0 pt-10 border-t border-slate-100 flex justify-between items-end print:border-black" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex items-center gap-2 text-blue-600 print:text-black">
              <ShieldCheck size={24} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-tight">Authentic<br/>Statement</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-12 tracking-widest print:text-black">Authorized Signature</p>
              <p className="text-2xl font-black text-slate-900 uppercase underline decoration-4 decoration-blue-600 underline-offset-8 print:decoration-black">{data.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400 uppercase tracking-widest text-xs">Initializing...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldCheck size={16} className="text-blue-500" /> <span>CLEARANCE BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pernyataan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Identitas Diri</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Kota Lahir" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Status Kerja</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.targetCompany} onChange={e => handleDataChange('targetCompany', e.target.value)} placeholder="Perusahaan Baru (Tujuan)" />
                 <input className="w-full p-2 border rounded text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Posisi yang Dilamar" />
                 <input className="w-full p-2 border rounded text-xs" value={data.lastCompany} onChange={e => handleDataChange('lastCompany', e.target.value)} placeholder="Perusahaan Sebelumnya" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><CalendarDays size={12}/> Tanggal & Lokasi</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
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
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
