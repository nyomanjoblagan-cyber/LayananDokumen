'use client';

/**
 * FILE: PernyataanWarisPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pernyataan Ahli Waris
 * FEATURES:
 * - Dynamic Heir List (Add/Remove)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Users, UserPlus, Trash2, 
  MapPin, CalendarDays, FileText, LayoutTemplate, 
  ChevronDown, Check, Edit3, Eye, ShieldCheck, PenTool, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface Heir {
  name: string;
  age: string;
  relation: string;
}

interface HeirData {
  city: string;
  date: string;
  deceasedName: string;
  deceasedNik: string;
  deceasedDeathDate: string;
  deceasedAddress: string;
  declarantName: string;
  declarantNik: string;
  declarantAddress: string;
  heirs: Heir[];
  witness1: string;
  witness2: string;
  villageHead: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: HeirData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  deceasedName: 'H. AHMAD JAYADI',
  deceasedNik: '3171000000000001',
  deceasedDeathDate: '2025-11-20',
  deceasedAddress: 'Jl. Merdeka No. 45, RT 001/002, Kel. Menteng, Kec. Menteng, Jakarta Pusat',
  declarantName: 'BUDI SETIAWAN',
  declarantNik: '3171000000000002',
  declarantAddress: 'Jl. Merdeka No. 45, Jakarta Pusat',
  heirs: [
    { name: 'SITI AMINAH', age: '55', relation: 'Istri/Janda' },
    { name: 'BUDI SETIAWAN', age: '32', relation: 'Anak Kandung' },
    { name: 'ANI MARYANI', age: '28', relation: 'Anak Kandung' }
  ],
  witness1: 'Ketua RT 001',
  witness2: 'Ketua RW 002',
  villageHead: 'Lurah Menteng'
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Loading Editor...</div>}>
      <HeirStatementBuilder />
    </Suspense>
  );
}

function HeirStatementBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<HeirData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof HeirData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addHeir = () => {
    setData(prev => ({ 
        ...prev, 
        heirs: [...prev.heirs, { name: '', age: '', relation: '' }] 
    }));
  };

  const removeHeir = (index: number) => {
    const newHeirs = [...data.heirs];
    newHeirs.splice(index, 1);
    setData(prev => ({ ...prev, heirs: newHeirs }));
  };

  const updateHeir = (index: number, field: keyof Heir, val: string) => {
    const newHeirs = [...data.heirs];
    // @ts-ignore
    newHeirs[index][field] = val;
    setData(prev => ({ ...prev, heirs: newHeirs }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[10.5pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      <div className="text-center mb-8 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-4 tracking-tighter leading-none mb-2">SURAT PERNYATAAN AHLI WARIS</h1>
      </div>

      <div className="flex-grow space-y-4 overflow-hidden">
        <p>Kami yang bertanda tangan di bawah ini, para Ahli Waris dari almarhum/almarhumah:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 py-1 print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Almarhum</span><span>:</span><span className="font-bold uppercase">{data.deceasedName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.deceasedNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Meninggal Pada</span><span>:</span><span>{isClient && data.deceasedDeathDate ? new Date(data.deceasedDeathDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Terakhir</span><span>:</span><span className="italic">{data.deceasedAddress}</span></div>
        </div>

        <p className="text-justify">Menyatakan dengan sebenarnya bahwa kami adalah benar Ahli Waris yang sah dari almarhum/almarhumah tersebut di atas, dengan rincian sebagai berikut:</p>

        <table className="w-full border-collapse border border-black font-sans text-[9pt]">
            <thead>
              <tr className="bg-slate-100 uppercase print:bg-transparent">
                 <th className="border border-black p-2 w-10">No</th>
                 <th className="border border-black p-2 text-left">Nama Ahli Waris</th>
                 <th className="border border-black p-2 w-20 text-center">Umur</th>
                 <th className="border border-black p-2 text-left">Hubungan</th>
              </tr>
            </thead>
            <tbody>
              {data.heirs.map((heir, i) => (
                 <tr key={i}>
                    <td className="border border-black p-2 text-center">{i + 1}</td>
                    <td className="border border-black p-2 font-bold uppercase">{heir.name}</td>
                    <td className="border border-black p-2 text-center">{heir.age} Thn</td>
                    <td className="border border-black p-2">{heir.relation}</td>
                 </tr>
              ))}
            </tbody>
        </table>

        <p className="text-justify leading-relaxed">Pernyataan ini kami buat dengan sebenarnya tanpa ada paksaan dari pihak manapun. Apabila di kemudian hari terbukti pernyataan ini tidak benar, maka kami bersedia dituntut sesuai dengan ketentuan hukum yang berlaku di Negara Kesatuan Republik Indonesia.</p>
      </div>

      {/* TANDA TANGAN KOMPLEKS */}
      <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
          <div className="text-right text-[10pt] mb-4">
            {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}
          </div>
          
          <div className="grid grid-cols-2 gap-10 text-center text-[10pt]">
            <div className="space-y-16">
               <p className="uppercase font-bold text-slate-400 text-[8pt] print:text-black">Saksi-Saksi:</p>
               <div className="flex justify-around items-end gap-2">
                  <div className="flex flex-col">
                     <p className="font-bold underline text-[9pt]">({data.witness1})</p>
                     <p className="text-[8pt] opacity-50 print:opacity-100">Saksi I</p>
                  </div>
                  <div className="flex flex-col">
                     <p className="font-bold underline text-[9pt]">({data.witness2})</p>
                     <p className="text-[8pt] opacity-50 print:opacity-100">Saksi II</p>
                  </div>
               </div>
            </div>
            <div className="space-y-12">
               <p className="font-bold uppercase text-[9pt]">Yang Membuat Pernyataan,</p>
               <div className="border border-slate-200 w-24 h-14 mx-auto flex items-center justify-center text-[7pt] text-slate-300 italic print:border-black print:text-black">MATERAI 10.000</div>
               <p className="font-bold underline uppercase text-base tracking-tight">{data.declarantName}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 text-center print:border-black">
            <p className="text-[8pt] font-sans font-bold uppercase text-slate-400 mb-14 tracking-widest print:text-black">Mengetahui / Mengesahkan:</p>
            <p className="font-black underline uppercase text-[11pt] tracking-wide">{data.villageHead}</p>
          </div>
      </div>
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
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <PenTool size={16} className="text-blue-500" /> <span>Heir Statement Builder</span>
            </div>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Ahli Waris</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              {/* Data Almarhum */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2">Data Almarhum/ah</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} placeholder="Nama Almarhum" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} placeholder="NIK" />
                    <input type="date" className="w-full p-2 border rounded text-xs font-bold" value={data.deceasedDeathDate} onChange={e => handleDataChange('deceasedDeathDate', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.deceasedAddress} onChange={e => handleDataChange('deceasedAddress', e.target.value)} placeholder="Alamat Terakhir" />
              </div>

              {/* Ahli Waris List */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-blue-600">Daftar Ahli Waris</h3>
                    <button onClick={addHeir} className="text-[9px] bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">+ TAMBAH</button>
                 </div>
                 {data.heirs.map((heir, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded border relative group">
                       <button onClick={() => removeHeir(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Nama Lengkap" value={heir.name} onChange={e => updateHeir(idx, 'name', e.target.value)} />
                       <div className="grid grid-cols-2 gap-2">
                          <input className="w-full p-1 border rounded text-[10px]" placeholder="Umur" value={heir.age} onChange={e => updateHeir(idx, 'age', e.target.value)} />
                          <input className="w-full p-1 border rounded text-[10px]" placeholder="Hubungan" value={heir.relation} onChange={e => updateHeir(idx, 'relation', e.target.value)} />
                       </div>
                    </div>
                 ))}
              </div>

              {/* Pengesahan */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2">Legitimasi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.declarantName} onChange={e => handleDataChange('declarantName', e.target.value)} placeholder="Ahli Waris Utama (Pembuat)" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Lurah / Kades" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I" />
                    <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II" />
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
