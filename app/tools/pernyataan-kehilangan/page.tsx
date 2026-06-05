'use client';

/**
 * FILE: KehilanganPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan Kehilangan (KTP, SIM, ATM, dsb)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  FileWarning, Plus, Trash2, MapPin, Clock, Calendar, Check, ChevronDown, Edit3, Eye, User, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LossItem {
  id: number;
  name: string;
  desc: string;
}

interface LossData {
  city: string;
  signDate: string;
  
  name: string;
  nik: string;
  job: string;
  phone: string;
  address: string;
  
  lostDate: string;
  lostTime: string;
  lostPlace: string;
  chronology: string;
  
  items: LossItem[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LossData = {
  city: 'JAKARTA',
  signDate: '', 
  
  name: 'BUDI SANTOSO',
  nik: '3171010203040005',
  job: 'Karyawan Swasta',
  phone: '0812-3456-7890',
  address: 'Jl. Merpati No. 12, RT 01 RW 02, Tebet, Jakarta Selatan',
  
  lostDate: '2026-01-04',
  lostTime: '18.30 WIB',
  lostPlace: 'Sekitar Stasiun Manggarai s.d Tebet',
  chronology: 'Saya melakukan perjalanan pulang kerja menggunakan KRL. Dompet saya simpan di dalam tas. Sesampainya di stasiun tujuan, saya menyadari tas saya sudah terbuka dan dompet beserta isinya sudah tidak ada.',
  
  items: [
    { id: 1, name: 'KTP Asli', desc: 'a.n Budi Santoso' },
    { id: 2, name: 'SIM C', desc: 'Masa berlaku s.d 2027' },
    { id: 3, name: 'Kartu ATM BCA', desc: 'Warna Biru (Debit)' },
  ]
};

// --- 3. KOMPONEN UTAMA ---
export default function KehilanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <LossStatementBuilder />
    </Suspense>
  );
}

function LossStatementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LossData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, signDate: today }));
  }, []);

  const handleDataChange = (field: keyof LossData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addItem = () => {
    setData(prev => ({ ...prev, items: [...prev.items, { id: Date.now(), name: '', desc: '' }] }));
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };
  
  const updateItem = (idx: number, field: keyof LossItem, val: string) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addPresetItem = (type: string) => {
    let newItem = { id: Date.now(), name: '', desc: '' };
    if (type === 'ktp') newItem = { ...newItem, name: 'KTP (Kartu Tanda Penduduk)', desc: 'Asli a.n Pelapor' };
    if (type === 'sim') newItem = { ...newItem, name: 'SIM A / C', desc: 'Masa berlaku s.d ...' };
    if (type === 'atm') newItem = { ...newItem, name: 'Kartu ATM Bank ...', desc: 'Debit / Kredit' };
    setData(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, signDate: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Pribadi' : 'Aset Kantor';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 && (
            <div className="flex flex-col h-full">
                <div className="text-center mb-10 border-b-4 border-double border-black pb-4 shrink-0">
                    <h1 className="font-black text-xl uppercase underline tracking-widest leading-none">SURAT PERNYATAAN KEHILANGAN</h1>
                </div>

                <div className="flex-grow space-y-6">
                    <p>Saya yang bertanda tangan di bawah ini:</p>
                    <div className="ml-8 mb-6 break-inside-avoid">
                        <table className="w-full leading-snug font-sans text-[10pt]">
                            <tbody>
                                <tr><td className="w-32 py-1 uppercase font-bold text-slate-400 text-[9px]">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase text-slate-900">{data.name}</td></tr>
                                <tr><td className="py-1 uppercase font-bold text-slate-400 text-[9px]">NIK / KTP</td><td>:</td><td className="font-mono">{data.nik}</td></tr>
                                <tr><td className="py-1 uppercase font-bold text-slate-400 text-[9px]">Pekerjaan</td><td>:</td><td>{data.job}</td></tr>
                                <tr><td className="py-1 uppercase font-bold text-slate-400 text-[9px]">Alamat</td><td className="align-top">:</td><td className="align-top leading-snug">{data.address}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <p>Dengan ini menyatakan bahwa telah kehilangan barang/dokumen penting berupa:</p>

                    <div className="border-2 border-black overflow-hidden mx-2 break-inside-avoid">
                        <table className="w-full text-[10pt] font-sans">
                            <thead>
                                <tr className="bg-slate-100 border-b-2 border-black print:bg-transparent">
                                    <th className="py-2 px-3 w-12 border-r-2 border-black">No</th>
                                    <th className="py-2 px-3 text-left border-r-2 border-black">Barang / Dokumen</th>
                                    <th className="py-2 px-3 text-left">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item, idx) => (
                                    <tr key={item.id} className="border-b border-slate-200 last:border-0">
                                        <td className="py-2 px-3 text-center border-r-2 border-black font-bold">{idx + 1}</td>
                                        <td className="py-2 px-3 font-black text-slate-900 border-r-2 border-black uppercase">{item.name}</td>
                                        <td className="py-2 px-3 italic text-slate-600 print:text-black">{item.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p>Barang tersebut hilang pada:</p>
                    <div className="ml-8 break-inside-avoid">
                        <table className="w-full leading-snug font-sans text-[10pt]">
                            <tbody>
                                <tr><td className="w-32 py-1 font-bold text-slate-400 text-[9px] uppercase">Waktu</td><td className="w-3">:</td><td className="font-bold">{formatDateSafe(data.lostDate)}, {data.lostTime}</td></tr>
                                <tr><td className="py-1 font-bold text-slate-400 text-[9px] uppercase">Lokasi</td><td className="py-1">:</td><td className="py-1">{data.lostPlace}</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="break-inside-avoid">
                        <p className="font-bold underline text-[10pt] uppercase mb-2">Kronologi Singkat:</p>
                        <p className="text-justify italic bg-slate-50 p-4 rounded-xl border-l-4 border-slate-900 print:bg-transparent print:border-2 print:border-black text-[10.5pt] leading-relaxed">
                            "{data.chronology}"
                        </p>
                    </div>

                    <p className="text-justify">Demikian pernyataan ini saya buat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun untuk dipergunakan sebagai laporan kepada instansi terkait.</p>
                </div>

                <div className="mt-12 shrink-0 flex justify-end text-center break-inside-avoid font-sans" style={{ pageBreakInside: 'avoid' }}>
                    <div className="w-72">
                        <p className="mb-1 text-sm">{data.city}, {formatDateSafe(data.signDate)}</p>
                        <p className="mb-20 font-bold uppercase text-[10px] tracking-widest text-slate-400">Hormat Saya,</p>
                        <p className="font-bold underline uppercase text-sm font-serif">{data.name}</p>
                    </div>
                </div>
            </div>
        )}

        {templateId === 2 && (
            <div className="flex flex-col h-full font-sans text-[10pt]">
                <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
                    <h1 className="text-2xl font-black uppercase tracking-tighter italic">BERITA ACARA KEHILANGAN ASET</h1>
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.4em] mt-2">INTERNAL CORPORATE REPORT</div>
                </div>
                <div className="space-y-8 flex-grow">
                   <div className="grid grid-cols-2 gap-10 break-inside-avoid">
                      <div>
                          <h3 className="text-[9px] font-black text-slate-400 uppercase border-b-2 border-slate-100 pb-1 mb-3">Person In Charge</h3>
                          <div className="font-black uppercase text-[11pt] text-slate-900 leading-tight">{data.name}</div>
                          <div className="text-slate-500 text-[10px] mt-1 font-mono">{data.nik}</div>
                      </div>
                      <div className="text-right">
                          <h3 className="text-[9px] font-black text-slate-400 uppercase border-b-2 border-slate-100 pb-1 mb-3">Incident Timeline</h3>
                          <div className="font-black text-[11pt]">{formatDateSafe(data.lostDate)}</div>
                          <div className="text-slate-500 italic text-[10px]">{data.lostPlace}</div>
                      </div>
                   </div>

                   <div className="break-inside-avoid">
                      <h3 className="text-[9px] font-black text-blue-600 uppercase mb-4 tracking-widest">Asset Details:</h3>
                      <div className="space-y-2">
                         {data.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 border-b border-slate-50 py-3 print:border-black">
                               <span className="font-black text-blue-200 print:text-black">0{idx+1}</span>
                               <div className="flex-1">
                                  <div className="font-black uppercase text-sm">{item.name}</div>
                                  <div className="text-[10px] text-slate-500 font-mono mt-0.5 print:text-black">{item.desc}</div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="p-6 bg-slate-900 text-white rounded-3xl italic text-sm leading-relaxed print:bg-transparent print:text-black print:border-2 print:border-black break-inside-avoid">
                      <span className="font-black uppercase text-[9px] block mb-2 opacity-50">Statement/Chronology:</span>
                      "{data.chronology}"
                   </div>
                </div>

                <div className="mt-auto pt-10 border-t-2 border-slate-100 flex justify-between items-end shrink-0 break-inside-avoid">
                   <div className="text-[7pt] text-slate-400 max-w-[280px] leading-tight font-bold uppercase tracking-tighter">Confidential internal document. This report serves as a formal declaration for insurance and inventory adjustment purposes.</div>
                   <div className="text-center font-sans">
                      <p className="text-[10px] font-black text-slate-300 mb-16 uppercase tracking-widest">{data.city}, {formatDateSafe(data.signDate)}</p>
                      <p className="font-black text-lg border-b-4 border-slate-900 pt-1 uppercase tracking-tight leading-none">{data.name}</p>
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
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
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
               <FileWarning size={16} className="text-red-500" /> <span>Loss Statement Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Personal Mode {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Corporate Mode {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Kehilangan</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pelapor</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK / ID" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} placeholder="No. HP" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <div className="flex justify-between items-center border-b pb-1">
                    <h3 className="text-[10px] font-black uppercase text-emerald-600 flex items-center gap-2"><Plus size={12}/> Daftar Barang</h3>
                    <div className="flex gap-1">
                       <button onClick={() => addPresetItem('ktp')} className="text-[8px] bg-slate-100 px-1 py-0.5 rounded font-bold uppercase">KTP</button>
                       <button onClick={() => addPresetItem('sim')} className="text-[8px] bg-slate-100 px-1 py-0.5 rounded font-bold uppercase">SIM</button>
                    </div>
                 </div>
                 <div className="space-y-3">
                    {data.items.map((item, idx) => (
                       <div key={item.id} className="p-3 bg-slate-50 rounded-lg border group relative animate-in slide-in-from-right-2">
                          <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Trash2 size={12}/></button>
                          <input className="w-full p-1 bg-transparent border-b text-xs font-bold uppercase focus:border-blue-500 outline-none" placeholder="Nama Barang" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                          <input className="w-full p-1 bg-transparent text-[10px] text-slate-400 focus:text-slate-600 outline-none mt-1" placeholder="Keterangan (cth: a.n Budi)" value={item.desc} onChange={e => updateItem(idx, 'desc', e.target.value)} />
                       </div>
                    ))}
                    <button onClick={addItem} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-[10px] font-black text-slate-300 uppercase hover:border-blue-300 hover:text-blue-300 transition-all">+ Item Baru</button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Kejadian</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.lostDate} onChange={e => handleDataChange('lostDate', e.target.value)} />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-bold" value={data.lostTime} onChange={e => handleDataChange('lostTime', e.target.value)} placeholder="Waktu (WIB)" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.lostPlace} onChange={e => handleDataChange('lostPlace', e.target.value)} placeholder="Lokasi Kejadian" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-red-500 outline-none leading-relaxed" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} placeholder="Kronologi Singkat..." />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
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
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE