'use client';

/**
 * FILE: BebasKontrakPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan Bebas Kontrak / Tidak Terikat Kerja
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, UserCircle2, 
  Briefcase, CalendarDays, FileText, LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Loading Editor...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Klasik Formal' : 'Modern Clean';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-relaxed p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {templateId === 1 ? (
          <div className="flex flex-col h-full">
            <div className="text-center mb-10 pb-4 border-b-2 border-black shrink-0">
              <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-8 decoration-2">SURAT PERNYATAAN BEBAS KONTRAK</h1>
            </div>

            <div className="flex-grow space-y-6">
              <p>Saya yang bertanda tangan di bawah ini:</p>
              <div className="ml-8 space-y-2 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic">
                 <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.name}</span></div>
                 <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.nik}</span></div>
                 <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {formatDateSafe(data.dateBirth)}</span></div>
                 <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.address}</span></div>
              </div>

              <div className="space-y-4 text-justify">
                <p>Menyatakan dengan sesungguhnya bahwa sampai saat surat ini dibuat, saya <strong>TIDAK SEDANG TERIKAT KONTRAK KERJA</strong> atau memiliki hubungan hukum ketenagakerjaan dengan instansi, organisasi, maupun perusahaan manapun.</p>
                <p>Pernyataan ini saya buat sehubungan dengan proses seleksi/penerimaan kerja di <strong>{data.targetCompany}</strong> untuk posisi <strong>{data.position}</strong>. Saya juga menjamin bahwa seluruh tanggung jawab administratif di perusahaan sebelumnya (<strong>{data.lastCompany}</strong>) telah diselesaikan dengan baik.</p>
                <p>Apabila di kemudian hari pernyataan ini terbukti tidak benar, saya bersedia menerima segala konsekuensi hukum maupun sanksi administratif sesuai dengan peraturan yang berlaku di <strong>{data.targetCompany}</strong>.</p>
              </div>
              
              <p>Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.</p>
            </div>

            <div className="shrink-0 mt-12 flex justify-end break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
               <div className="text-center w-64 font-sans">
                  <p className="text-xs mb-4">{data.city}, {formatDateSafe(data.date)}</p>
                  <div className="border border-slate-200 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[7pt] text-slate-300 italic uppercase">Materai 10.000</div>
                  <p className="font-bold underline uppercase text-sm font-serif tracking-tight">{data.name}</p>
                  <p className="text-[9pt] text-slate-400 font-bold uppercase tracking-widest mt-1">Pembuat Pernyataan</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-12 border-t-[10px] border-blue-600 pt-8 shrink-0">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">STATUS CLEARANCE</h1>
                <p className="text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase mt-2">Professional Availability Declaration</p>
              </div>
              <div className="text-right text-[9pt] font-bold text-slate-300 uppercase tracking-widest">
                 <p className="font-mono">NO: BC-{new Date().getFullYear()}-{data.nik.slice(-4)}</p>
                 <p className="mt-1">{data.city}, {formatDateSafe(data.date)}</p>
              </div>
            </div>

            <div className="flex-grow space-y-12">
              <div className="grid grid-cols-2 gap-10 break-inside-avoid">
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest border-b-2 border-slate-50 block pb-1">Declarer Profile</label>
                  <div>
                    <p className="text-xl font-black uppercase text-slate-900 leading-tight">{data.name}</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">Government ID: {data.nik}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 uppercase">{data.placeBirth}, {formatDateSafe(data.dateBirth)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-slate-300 uppercase tracking-widest border-b-2 border-slate-50 block pb-1">Application Target</label>
                  <div>
                    <p className="text-sm font-black uppercase text-blue-700 leading-tight">{data.targetCompany}</p>
                    <p className="text-xs text-slate-500 mt-1 font-bold">Assigned Role: {data.position}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-10 rounded-[2rem] print:bg-transparent print:text-black print:border-2 print:border-black break-inside-avoid">
                <p className="text-[12pt] italic leading-relaxed font-serif text-justify">
                  "I hereby formally declare that as of this date, I am <b>completely free from any active employment contracts</b> or legal bindings with any third-party organizations, including my previous engagement at <b>{data.lastCompany}</b>. I am fully authorized and available to commence work immediately and accept all legal liabilities should this declaration be proven false."
                </p>
              </div>
            </div>

            <div className="shrink-0 pt-10 border-t-2 border-slate-50 flex justify-between items-end break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex items-center gap-3 text-blue-600 print:text-black">
                <ShieldCheck size={32} />
                <span className="text-[8px] font-black uppercase tracking-widest leading-tight">Verified<br/>Independent<br/>Status</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-300 mb-16 tracking-[0.2em]">Authorized Signature</p>
                <p className="text-2xl font-black text-slate-900 uppercase underline decoration-4 decoration-blue-600 underline-offset-8">{data.name}</p>
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
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldCheck size={16} className="text-blue-500" /> <span>Clearance Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Klasik Formal {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Modern Clean {templateId === 2 && <Check size={14}/>}</button>
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
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Identitas</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Tempat Lahir" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Domisili" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Info Pekerjaan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.targetCompany} onChange={e => handleDataChange('targetCompany', e.target.value)} placeholder="Perusahaan Baru" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Posisi Dilamar" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.lastCompany} onChange={e => handleDataChange('lastCompany', e.target.value)} placeholder="Perusahaan Terakhir" />
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Lokasi TTD</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

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