'use client';

/**
 * FILE: JointVenturePage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Perjanjian Kerja Sama (Joint Venture)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Briefcase, Handshake, LayoutTemplate, 
  Scale, Coins, ShieldCheck, ChevronDown, Check, Edit3, Eye, Building2, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

// --- 1. TYPE DEFINITIONS ---
interface JVData {
  city: string;
  date: string;
  docNo: string;
  
  // Pihak 1
  p1Name: string;
  p1Company: string;
  p1Role: string;
  p1Share: string;

  // Pihak 2
  p2Name: string;
  p2Company: string;
  p2Role: string;
  p2Share: string;

  // Proyek
  projectName: string;
  investmentAmount: string;
  duration: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: JVData = {
  city: 'SURABAYA',
  date: '', // Diisi useEffect
  docNo: 'JV/DIR-OPS/V/2026/089',
  
  p1Name: 'HENDRA KUSUMAH',
  p1Company: 'PT. MAJU MUNDUR SEJAHTERA',
  p1Role: 'Investor Modal',
  p1Share: '60%',

  p2Name: 'REZA ADRIAN',
  p2Company: 'CV. KREATIF MUDA KARYA',
  p2Role: 'Pengelola Operasional',
  p2Share: '40%',

  projectName: 'Pengembangan Aplikasi E-Commerce "WargaHub"',
  investmentAmount: 'Rp 500.000.000,-',
  duration: '24 Bulan',
  
  witness1: 'SITI AMINAH, S.H.',
  witness2: 'BUDI SANTOSO'
};

// --- 3. KOMPONEN UTAMA ---
export default function JointVenturePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Perjanjian JV...</div>}>
      <JointVentureBuilder />
    </Suspense>
  );
}

function JointVentureBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<JVData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof JVData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
    };

    if (templateId === 1) {
      return (
        <div className="font-serif text-slate-900 leading-normal text-[11pt]">
           <div className="text-center mb-10">
              <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">PERJANJIAN KERJA SAMA (JOINT VENTURE)</h2>
              <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-[0.2em]">Nomor: {data.docNo}</p>
           </div>

           <div className="text-justify leading-relaxed">
              <p className="mb-4 text-center italic">"Kesepakatan Usaha Bersama Pengembangan {data.projectName}"</p>
              <p className="mb-4">Pada hari ini, tanggal <b>{formatDateSafe(data.date)}</b>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>
              
              <div className="space-y-6 mb-8 ml-4 break-inside-avoid">
                 <div className="grid grid-cols-[30px_1fr] gap-2">
                    <span className="font-bold">I.</span>
                    <div>
                       <b>{data.p1Name}</b>, mewakili <b>{data.p1Company}</b>, bertindak selaku <b>{data.p1Role}</b>, selanjutnya disebut sebagai <b>PIHAK PERTAMA</b>.
                    </div>
                 </div>
                 <div className="grid grid-cols-[30px_1fr] gap-2">
                    <span className="font-bold">II.</span>
                    <div>
                       <b>{data.p2Name}</b>, mewakili <b>{data.p2Company}</b>, bertindak selaku <b>{data.p2Role}</b>, selanjutnya disebut sebagai <b>PIHAK KEDUA</b>.
                    </div>
                 </div>
              </div>

              <div className="space-y-6 mb-8 text-[10pt] ml-4 break-inside-avoid">
                 <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold">PASAL 1</span>
                    <div>
                       <span className="font-bold uppercase underline mb-1 block">OBJEK KERJASAMA</span>
                       <p>Pihak I dan Pihak II sepakat menjalankan proyek <b>{data.projectName}</b> dengan nilai investasi <b>{data.investmentAmount}</b>.</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold">PASAL 2</span>
                    <div>
                       <span className="font-bold uppercase underline mb-1 block">PEMBAGIAN HASIL</span>
                       <p>Pembagian keuntungan disepakati sebesar <b>{data.p1Share}</b> untuk Pihak I dan <b>{data.p2Share}</b> untuk Pihak II.</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold">PASAL 3</span>
                    <div>
                       <span className="font-bold uppercase underline mb-1 block">JANGKA WAKTU</span>
                       <p>Perjanjian ini berlaku selama <b>{data.duration}</b> terhitung sejak penandatanganan.</p>
                    </div>
                 </div>
              </div>

              <p className="italic font-bold border-t pt-6 border-slate-200 mt-10 mb-8 break-inside-avoid">
                 Demikian perjanjian ini dibuat dalam rangkap 2 (dua) bermaterai cukup yang masing-masing mempunyai kekuatan hukum yang sama.
              </p>
           </div>

           <div style={{ pageBreakInside: 'avoid' }}>
              <table className="w-full table-fixed">
                 <tbody>
                    <tr><td colSpan={2} className="text-right font-bold text-[10pt] pb-8">{data.city}, {formatDateSafe(data.date)}</td></tr>
                    <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
                       <td className="pb-6">PIHAK PERTAMA</td><td className="pb-6">PIHAK KEDUA</td>
                    </tr>
                    <tr>
                       <td className="text-center align-bottom pb-4">
                          <div className="h-32 flex flex-col justify-end items-center">
                             <div className="border border-slate-300 w-20 h-10 flex items-center justify-center text-[6pt] text-slate-300 italic mb-4">MATERAI</div>
                             <p className="font-bold underline uppercase text-sm leading-none">{data.p1Name}</p>
                          </div>
                       </td>
                       <td className="text-center align-bottom pb-4">
                          <div className="h-32 flex flex-col justify-end items-center">
                             <div className="border border-slate-300 w-20 h-10 flex items-center justify-center text-[6pt] text-slate-300 italic mb-4">MATERAI</div>
                             <p className="font-bold underline uppercase text-sm leading-none">{data.p2Name}</p>
                          </div>
                       </td>
                    </tr>
                    <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center">
                       <td className="pt-12 pb-4">SAKSI I</td><td className="pt-12 pb-4">SAKSI II</td>
                    </tr>
                    <tr>
                       <td className="text-center align-bottom"><p className="font-bold underline uppercase text-sm">{data.witness1}</p></td>
                       <td className="text-center align-bottom"><p className="font-bold underline uppercase text-sm">{data.witness2}</p></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      );
    } else {
      return (
        <div className="font-sans text-slate-900 leading-snug text-[10.5pt]">
            <div className="flex justify-between items-center border-b-4 border-slate-900 pb-4 mb-8 shrink-0">
               <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter">JV Agreement</h1>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Project Based Contract</p>
               </div>
               <div className="text-right font-mono font-bold text-lg">{data.docNo}</div>
            </div>
            <div className="grid grid-cols-2 gap-8 mb-8 break-inside-avoid">
               <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <h3 className="text-xs font-black uppercase text-slate-400 mb-2 border-b pb-1">Investor</h3>
                  <p className="font-bold text-lg uppercase">{data.p1Name}</p>
                  <p className="text-xs font-bold text-slate-500">{data.p1Company}</p>
               </div>
               <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <h3 className="text-xs font-black uppercase text-slate-400 mb-2 border-b pb-1">Operator</h3>
                  <p className="font-bold text-lg uppercase">{data.p2Name}</p>
                  <p className="text-xs font-bold text-slate-500">{data.p2Company}</p>
               </div>
            </div>
            <div className="mb-8 break-inside-avoid">
               <h3 className="text-sm font-black uppercase text-slate-900 mb-2">Project Summary</h3>
               <div className="bg-white border border-slate-300 p-4 rounded-lg text-sm grid grid-cols-2 gap-4">
                  <div><span className="block text-[10px] uppercase font-bold text-slate-400">Name</span><span className="font-bold">{data.projectName}</span></div>
                  <div><span className="block text-[10px] uppercase font-bold text-slate-400">Value</span><span className="font-bold">{data.investmentAmount}</span></div>
                  <div><span className="block text-[10px] uppercase font-bold text-slate-400">Duration</span><span className="font-bold">{data.duration}</span></div>
                  <div><span className="block text-[10px] uppercase font-bold text-slate-400">Ratio</span><span className="font-bold">{data.p1Share} / {data.p2Share}</span></div>
               </div>
            </div>
            <p className="text-justify text-sm leading-relaxed mb-12">
               Both parties hereby agree to collaborate on the above project. Profit sharing shall be distributed after deducting all operational expenses. Disputes shall be resolved through Indonesian jurisdiction.
            </p>
            <div className="flex justify-between items-end mt-auto pt-8 border-t-2 border-slate-900 break-inside-avoid">
               <div className="text-center w-48"><p className="text-[10px] font-bold uppercase text-slate-400 mb-16">Signed (P1)</p><p className="font-bold border-b-2 border-slate-900 pb-1">{data.p1Name}</p></div>
               <div className="text-center font-bold text-xs">{data.city}, {formatDateSafe(data.date)}</div>
               <div className="text-center w-48"><p className="text-[10px] font-bold uppercase text-slate-400 mb-16">Signed (P2)</p><p className="font-bold border-b-2 border-slate-900 pb-1">{data.p2Name}</p></div>
            </div>
        </div>
      );
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-emerald-400"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white uppercase tracking-widest hidden md:inline">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
                  <Handshake size={16} className="text-blue-500" /> <span className="uppercase tracking-tighter">JV BUILDER</span>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Standar' : 'Proyek'}</span><ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Standar Bisnis {templateId === 1 && <Check size={14}/>}</button>
                        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Proyek Khusus {templateId === 2 && <Check size={14}/>}</button>
                    </div>
                  )}
               </div>
               <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-95"><Printer size={18}/> Cetak</button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-xs uppercase tracking-widest"><Edit3 size={16} /> Isi Kontrak</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar font-sans">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Scale size={12}/> Pihak Pertama</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs font-black text-blue-600" value={data.p1Share} onChange={e => handleDataChange('p1Share', e.target.value)} placeholder="Persen Bagi Hasil" />
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.p1Role} onChange={e => handleDataChange('p1Role', e.target.value)} placeholder="Peran" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Pihak Kedua</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.p2Company} onChange={e => handleDataChange('p2Company', e.target.value)} placeholder="Nama Perusahaan" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs font-black text-emerald-600" value={data.p2Share} onChange={e => handleDataChange('p2Share', e.target.value)} placeholder="Persen Bagi Hasil" />
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.p2Role} onChange={e => handleDataChange('p2Role', e.target.value)} placeholder="Peran" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Coins size={12}/> Proyek & Investasi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} placeholder="Nama Proyek" />
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.investmentAmount} onChange={e => handleDataChange('investmentAmount', e.target.value)} placeholder="Total Investasi" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Durasi" />
                    <input className="w-full p-2 border rounded-lg text-xs font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Dokumen" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest flex items-center gap-2"><ShieldCheck size={12}/> Legalitas & Saksi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I" />
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
            </div>
         </div>

         <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${activeTab === 'editor' ? 'hidden md:flex' : 'flex'}`}>
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <DocumentContent />
                   </div>
                </div>
             </div>
         </div>
         <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl border border-white/10 font-sans">
          <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white p-[20mm]"><DocumentContent /></div></div>
    </div>
  );
}