'use client';

/**
 * FILE: PaklaringPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Paklaring (Certificate of Employment)
 * FEATURES:
 * - Dual Template (HRD Standard vs Modern Certificate)
 * - Auto Duration Calculation (Years & Months)
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Briefcase, 
  User, Building2, Medal, ChevronDown, Check, Trash2, Edit3, Eye, X, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface PaklaringData {
  no: string;
  date: string;
  city: string;
  
  // Perusahaan
  compName: string;
  compInfo: string;
  signerName: string;
  signerJob: string;
  
  // Karyawan
  empName: string;
  empNik: string;
  empPosition: string;
  startDate: string;
  endDate: string;
  
  // Isi
  evaluation: string;
  closing: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PaklaringData = {
  no: `SKK/HRD/${new Date().getFullYear()}/045`,
  date: '', // Diisi useEffect
  city: 'JAKARTA',
  
  compName: 'PT. TEKNOLOGI MAJU BERSAMA',
  compInfo: 'Gedung Cyber 2, Lt. 15\nJl. H.R. Rasuna Said, Jakarta Selatan',
  
  signerName: 'SISKA AMELIA',
  signerJob: 'HRD Manager',
  
  empName: 'AHMAD FAUZI',
  empNik: '20200512',
  empPosition: 'Senior Graphic Designer',
  startDate: '2023-01-15',
  endDate: '2026-01-15',
  
  evaluation: 'Selama bekerja, Saudara Ahmad Fauzi telah menunjukkan dedikasi, loyalitas, dan integritas yang tinggi terhadap perusahaan serta tidak pernah melakukan tindakan yang merugikan. Yang bersangkutan mengundurkan diri atas kemauan sendiri (Resign).',
  closing: 'Kami mengucapkan terima kasih atas kontribusi yang telah diberikan dan berharap kesuksesan menyertai langkah karir Saudara di masa depan.'
};

// --- 3. KOMPONEN UTAMA ---
export default function PaklaringPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem HRD...</div>}>
      <PaklaringToolBuilder />
    </Suspense>
  );
}

function PaklaringToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<PaklaringData>(INITIAL_DATA);
  const [durationStr, setDurationStr] = useState('');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  useEffect(() => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    let str = '';
    if (years > 0) str += `${years} Tahun `;
    if (months > 0) str += `${months} Bulan`;
    if (str === '') str = 'Kurang dari 1 bulan';
    
    setDurationStr(str);
  }, [data.startDate, data.endDate]);

  const handleDataChange = (field: keyof PaklaringData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Standar HRD (Compact)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Certificate
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Standar HRD' : 'Modern Certificate';

  // --- KOMPONEN ISI SURAT ---
  const PaklaringContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* TEMPLATE 1: STANDAR HRD */}
        {templateId === 1 ? (
            <div className="flex flex-col h-full">
                {/* KOP PERUSAHAAN */}
                <div className="flex items-center gap-4 border-b-4 border-double border-slate-800 pb-3 mb-6 shrink-0">
                   <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                      {logo ? <img src={logo} className="w-full h-full object-contain block print:block" /> : <div className="font-bold text-slate-300 uppercase text-xs print:hidden">LOGO</div>}
                   </div>
                   <div className="flex-1 text-center">
                      <h1 className="text-xl font-black uppercase text-slate-900 leading-tight">{data.compName}</h1>
                      <div className="text-[9pt] text-slate-600 whitespace-pre-line leading-tight">{data.compInfo}</div>
                   </div>
                </div>

                <div className="text-center mb-8 shrink-0">
                   <h2 className="font-bold text-lg uppercase underline">SURAT KETERANGAN KERJA</h2>
                   <div className="text-sm font-bold mt-1">Nomor: {data.no}</div>
                </div>

                <div className="flex-grow">
                    <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
                    <div className="ml-8 mb-6">
                       <table className="w-full leading-snug">
                          <tbody>
                             <tr><td className="w-32 py-0.5">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.signerName}</td></tr>
                             <tr><td className="py-0.5">Jabatan</td><td>:</td><td>{data.signerJob}</td></tr>
                             <tr><td className="py-0.5">Instansi</td><td>:</td><td className="uppercase">{data.compName}</td></tr>
                          </tbody>
                       </table>
                    </div>

                    <p className="mb-4 text-justify">Menerangkan dengan sesungguhnya bahwa:</p>
                    <div className="ml-8 mb-8">
                       <table className="w-full leading-snug text-slate-800">
                          <tbody>
                             <tr><td className="w-32 py-0.5 uppercase">Nama</td><td className="w-3">:</td><td className="font-bold uppercase text-slate-900">{data.empName}</td></tr>
                             <tr><td className="py-0.5">NIK / ID</td><td>:</td><td>{data.empNik}</td></tr>
                             <tr><td className="py-0.5">Jabatan Terakhir</td><td>:</td><td>{data.empPosition}</td></tr>
                             <tr><td className="py-0.5 uppercase">Masa Kerja</td><td>:</td><td className="italic">{isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''} s/d {isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</td></tr>
                             <tr><td className="py-0.5">Durasi Total</td><td>:</td><td className="font-bold">{durationStr}</td></tr>
                          </tbody>
                       </table>
                    </div>

                    <p className="mb-6 text-justify leading-relaxed">{data.evaluation}</p>
                    <p className="mb-8 text-justify leading-relaxed">{data.closing}</p>
                </div>

                <div className="shrink-0 mt-8 flex justify-end text-center" style={{ pageBreakInside: 'avoid' }}>
                   <div className="w-72">
                      <p className="mb-1 text-sm">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
                      <p className="mb-20 font-bold uppercase">{data.compName}</p>
                      <p className="font-bold underline uppercase">{data.signerName}</p>
                      <p className="text-sm font-sans">{data.signerJob}</p>
                   </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col h-full font-sans text-[10pt]">
               {/* TEMPLATE MODERN */}
               <div className="flex justify-between items-center mb-12 border-b-2 border-slate-100 pb-6 shrink-0">
                  {logo ? <img src={logo} className="h-12 w-auto block print:block" /> : <div className="font-black text-2xl text-slate-300 print:hidden">LOGO</div>}
                  <div className="text-right">
                     <div className="font-black text-slate-900 text-xl uppercase tracking-tighter leading-none">{data.compName}</div>
                     <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 print:text-black">Human Resources Department</div>
                  </div>
               </div>
               
               <div className="text-center mb-16 shrink-0">
                  <h1 className="text-3xl font-light text-slate-800 uppercase tracking-[0.3em] mb-2">Certificate</h1>
                  <div className="text-[10px] text-blue-600 font-black tracking-[0.5em] mb-4 uppercase print:text-black">of Employment</div>
                  <div className="w-20 h-1 bg-blue-600 mx-auto mb-4 print:bg-black"></div>
                  <div className="text-xs text-slate-400 font-mono italic print:text-black">Ref: {data.no}</div>
               </div>

               <div className="flex-grow px-12 text-center">
                  <p className="text-slate-500 mb-6 uppercase tracking-widest text-[10px] font-bold print:text-black">This is to certify that</p>
                  <h2 className="text-3xl font-black text-slate-900 uppercase mb-2 leading-none">{data.empName}</h2>
                  <div className="text-sm text-slate-500 mb-12 font-mono print:text-black">Employee ID: {data.empNik}</div>
                  
                  <div className="max-w-xl mx-auto space-y-6">
                    <p className="text-slate-600 leading-relaxed text-justify print:text-black">
                      Has successfully completed their tenure at <strong>{data.compName}</strong>. 
                      Serving as <strong>{data.empPosition}</strong> from <strong>{isClient && data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {month:'long', year:'numeric'}) : ''}</strong> until <strong>{isClient && data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {month:'long', year:'numeric'}) : ''}</strong>.
                    </p>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-600 text-sm leading-relaxed text-justify italic print:bg-transparent print:border-black print:text-black">
                      "{data.evaluation}"
                    </div>
                  </div>
               </div>

               <div className="shrink-0 mt-16 flex justify-between items-end border-t border-slate-100 pt-8 pb-4 print:border-black">
                  <div className="text-[8pt] text-slate-400 max-w-[250px] print:text-black">
                    Generated by HR System. This document is valid without a physical stamp if verified digitally.
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-12 tracking-widest print:text-black">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : ''}</p>
                    <p className="font-black text-slate-900 text-lg leading-none uppercase">{data.signerName}</p>
                    <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-tighter print:text-black">{data.signerJob}</p>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} className="text-emerald-500" /> <span>PAKLARING BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Paklaring</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Perusahaan</h3>
                 
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                 </div>

                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.compInfo} onChange={e => handleDataChange('compInfo', e.target.value)} placeholder="Alamat & Kontak" />
                 
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota Terbit" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Data Karyawan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.empNik} onChange={e => handleDataChange('empNik', e.target.value)} placeholder="NIK / ID" />
                    <input className="w-full p-2 border rounded text-xs" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Jabatan" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400">MULAI KERJA</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] font-bold text-slate-400">AKHIR KERJA</label>
                       <input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Medal size={12}/> Otoritas & Penilaian</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama HRD" />
                    <input className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.evaluation} onChange={e => handleDataChange('evaluation', e.target.value)} placeholder="Komentar Perusahaan" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <PaklaringContent />
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
            <PaklaringContent />
         </div>
      </div>

    </div>
  );
}
