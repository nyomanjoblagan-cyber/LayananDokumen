'use client';

/**
 * FILE: PernyataanWarisPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan Ahli Waris Dinamis
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Users, UserPlus, Trash2, 
  MapPin, CalendarDays, FileText, LayoutTemplate, 
  ChevronDown, Check, Edit3, Eye, ShieldCheck, PenTool, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Loading Editor...</div>}>
      <HeirStatementBuilder />
    </Suspense>
  );
}

function HeirStatementBuilder() {
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[10.5pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        <div className="text-center mb-8 shrink-0">
          <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-tighter leading-none mb-2">SURAT PERNYATAAN AHLI WARIS</h1>
        </div>

        <div className="flex-grow space-y-5 overflow-hidden">
          <p>Kami yang bertanda tangan di bawah ini, para Ahli Waris dari almarhum/almarhumah:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Almarhum</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.deceasedName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.deceasedNik}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Meninggal Tanggal</span><span>:</span><span>{formatDateSafe(data.deceasedDeathDate)}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Terakhir</span><span>:</span><span className="leading-snug">{data.deceasedAddress}</span></div>
          </div>

          <p className="text-justify leading-relaxed">Dengan ini menyatakan dengan sebenarnya bahwa kami adalah benar Ahli Waris yang sah dari almarhum/almarhumah tersebut di atas, dengan rincian sebagai berikut:</p>

          <div className="mx-2 break-inside-avoid">
              <table className="w-full border-collapse border-2 border-black font-sans text-[9.5pt]">
                  <thead>
                    <tr className="bg-slate-50 uppercase print:bg-transparent">
                       <th className="border-2 border-black p-2 w-12">No</th>
                       <th className="border-2 border-black p-2 text-left">Nama Ahli Waris</th>
                       <th className="border-2 border-black p-2 w-20 text-center">Umur</th>
                       <th className="border-2 border-black p-2 text-left">Hubungan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.heirs.map((heir, i) => (
                       <tr key={i}>
                          <td className="border-2 border-black p-2 text-center font-bold">{i + 1}</td>
                          <td className="border-2 border-black p-2 font-black uppercase text-slate-900">{heir.name || '...'}</td>
                          <td className="border-2 border-black p-2 text-center">{heir.age || '-'} Thn</td>
                          <td className="border-2 border-black p-2 font-medium">{heir.relation || '...'}</td>
                       </tr>
                    ))}
                  </tbody>
              </table>
          </div>

          <p className="text-justify leading-relaxed">Demikian surat pernyataan ini kami buat dengan sebenarnya tanpa ada paksaan dari pihak manapun. Apabila di kemudian hari terbukti pernyataan ini tidak benar, kami bersedia dituntut sesuai dengan hukum yang berlaku.</p>
        </div>

        <div className="shrink-0 mt-10 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="text-right text-[10.5pt] mb-6 font-sans">
              {data.city}, {formatDateSafe(data.date)}
            </div>
            
            <div className="grid grid-cols-2 gap-10 text-center text-[10pt] font-sans">
              <div className="space-y-16">
                 <p className="uppercase font-black text-slate-300 text-[8pt] tracking-widest">Saksi-Saksi:</p>
                 <div className="flex justify-around items-end gap-4">
                    <div className="flex flex-col">
                       <p className="font-bold underline text-[10pt]">({data.witness1})</p>
                       <p className="text-[8pt] text-slate-400 uppercase font-bold mt-1">Saksi I</p>
                    </div>
                    <div className="flex flex-col">
                       <p className="font-bold underline text-[10pt]">({data.witness2})</p>
                       <p className="text-[8pt] text-slate-400 uppercase font-bold mt-1">Saksi II</p>
                    </div>
                 </div>
              </div>
              <div className="space-y-12">
                 <p className="font-black uppercase text-[9pt] tracking-tight">Ahli Waris Utama (Pembuat),</p>
                 <div className="border border-slate-200 w-24 h-14 mx-auto flex items-center justify-center text-[7pt] text-slate-300 italic uppercase">Materai</div>
                 <p className="font-black underline uppercase text-[11pt] tracking-tighter text-slate-900">{data.declarantName}</p>
              </div>
            </div>

            <div className="mt-12 border-t-2 border-slate-100 pt-8 text-center break-inside-avoid">
              <p className="text-[9pt] font-black uppercase text-slate-300 mb-16 tracking-[0.3em]">Mengetahui / Mengesahkan:</p>
              <p className="font-black underline uppercase text-[12pt] font-serif tracking-tight">{data.villageHead}</p>
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

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <PenTool size={16} className="text-blue-500" /> <span>Heir Statement Builder</span>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Waris</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2">Data Almarhum/ah</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-red-500 outline-none" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} placeholder="Nama Almarhum" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-mono" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} placeholder="NIK Almarhum" />
                 <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400">TANGGAL MENINGGAL</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.deceasedDeathDate} onChange={e => handleDataChange('deceasedDeathDate', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Daftar Ahli Waris</h3>
                    <button onClick={addHeir} className="text-[9px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">+ Waris</button>
                 </div>
                 <div className="space-y-3">
                    {data.heirs.map((heir, idx) => (
                       <div key={idx} className="p-3 bg-slate-50 rounded-lg border group relative animate-in slide-in-from-right-2">
                          <button onClick={() => removeHeir(idx)} className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                          <input className="w-full p-1.5 bg-transparent border-b text-xs font-bold uppercase focus:border-blue-500 outline-none" placeholder="Nama Ahli Waris" value={heir.name} onChange={e => updateHeir(idx, 'name', e.target.value)} />
                          <div className="grid grid-cols-2 gap-2 mt-2">
                             <input className="p-1.5 border rounded text-[10px]" placeholder="Umur" value={heir.age} onChange={e => updateHeir(idx, 'age', e.target.value)} />
                             <input className="p-1.5 border rounded text-[10px]" placeholder="Hubungan" value={heir.relation} onChange={e => updateHeir(idx, 'relation', e.target.value)} />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest">Otoritas Pengesahan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Lurah / Kades" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
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