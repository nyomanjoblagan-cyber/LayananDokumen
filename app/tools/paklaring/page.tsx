'use client';

/**
 * FILE: PaklaringPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Paklaring (Certificate of Employment)
 * FIX: Perbaikan sintaks kurung kurawal pada conditional rendering (TS 1005 & 1381)
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Briefcase, 
  User, Building2, Medal, ChevronDown, Check, Trash2, Edit3, Eye, X, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem HRD...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Standar HRD' : 'Modern Certificate';

  const PaklaringContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* FIX LOGIC: Template 1 */}
        {templateId === 1 ? (
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 border-b-4 border-double border-slate-800 pb-3 mb-6 shrink-0 font-sans">
                   <div className="w-16 h-16 shrink-0 flex items-center justify-center">
                      {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <div className="font-bold text-slate-200 uppercase text-[8px] border-2 border-dashed p-2">COMPANY LOGO</div>}
                   </div>
                   <div className="flex-1 text-center">
                      <h1 className="text-xl font-black uppercase text-slate-900 leading-tight tracking-tight">{data.compName}</h1>
                      <div className="text-[8pt] text-slate-500 whitespace-pre-line leading-tight mt-1">{data.compInfo}</div>
                   </div>
                </div>

                <div className="text-center mb-8 shrink-0">
                   <h2 className="font-bold text-lg uppercase underline decoration-1 underline-offset-4">SURAT KETERANGAN KERJA</h2>
                   <div className="text-sm font-bold mt-1 font-sans">Nomor: {data.no}</div>
                </div>

                <div className="flex-grow text-justify">
                    <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
                    <div className="ml-8 mb-6 break-inside-avoid">
                       <table className="w-full leading-snug font-sans text-[10pt]">
                          <tbody>
                             <tr><td className="w-32 py-1">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.signerName}</td></tr>
                             <tr><td className="py-1">Jabatan</td><td>:</td><td>{data.signerJob}</td></tr>
                             <tr><td className="py-1">Instansi</td><td>:</td><td className="uppercase">{data.compName}</td></tr>
                          </tbody>
                       </table>
                    </div>

                    <p className="mb-4">Menerangkan dengan sesungguhnya bahwa:</p>
                    <div className="ml-8 mb-8 break-inside-avoid bg-slate-50 p-4 rounded-xl border border-slate-100 print:bg-transparent print:border-black">
                       <table className="w-full leading-snug font-sans text-[10pt]">
                          <tbody>
                             <tr><td className="w-32 py-1 uppercase text-slate-400 font-bold text-[9px]">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase text-slate-900">{data.empName}</td></tr>
                             <tr><td className="py-1 uppercase text-slate-400 font-bold text-[9px]">ID Karyawan</td><td>:</td><td className="font-mono">{data.empNik}</td></tr>
                             <tr><td className="py-1 uppercase text-slate-400 font-bold text-[9px]">Posisi Terakhir</td><td>:</td><td className="font-bold">{data.empPosition}</td></tr>
                             <tr><td className="py-1 uppercase text-slate-400 font-bold text-[9px]">Masa Bakti</td><td>:</td><td className="italic">{formatDateSafe(data.startDate)} s/d {formatDateSafe(data.endDate)}</td></tr>
                             <tr><td className="py-1 uppercase text-slate-400 font-bold text-[9px]">Total Durasi</td><td>:</td><td className="font-black text-blue-700 print:text-black">{durationStr}</td></tr>
                          </tbody>
                       </table>
                    </div>

                    <p className="mb-4 leading-relaxed">{data.evaluation}</p>
                    <p className="mb-8 leading-relaxed">{data.closing}</p>
                </div>

                <div className="shrink-0 mt-8 flex justify-end text-center font-sans" style={{ pageBreakInside: 'avoid' }}>
                   <div className="w-72">
                      <p className="mb-1 text-xs">{data.city}, {formatDateSafe(data.date)}</p>
                      <p className="mb-20 font-bold uppercase text-[10px] tracking-widest text-slate-400">Pimpinan Perusahaan,</p>
                      <p className="font-bold underline uppercase text-sm font-serif">{data.signerName}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500 mt-1">{data.signerJob}</p>
                   </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col h-full font-sans text-[10pt]">
                {/* TEMPLATE MODERN */}
                <div className="flex justify-between items-center mb-12 border-b-2 border-slate-100 pb-6 shrink-0">
                  {logo ? <img src={logo} className="h-12 w-auto" alt="Logo" /> : <div className="font-black text-2xl text-slate-200">LOGO</div>}
                  <div className="text-right">
                     <div className="font-black text-slate-900 text-xl uppercase tracking-tighter leading-none">{data.compName}</div>
                     <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">HR Excellence Department</div>
                  </div>
                </div>
               
                <div className="text-center mb-16 shrink-0">
                  <h1 className="text-4xl font-light text-slate-800 uppercase tracking-[0.2em] mb-2">Certificate</h1>
                  <div className="text-[10px] text-blue-600 font-black tracking-[0.4em] mb-6 uppercase">of Employment Tenureship</div>
                  <div className="w-16 h-1 bg-blue-600 mx-auto mb-4"></div>
                  <div className="text-[9px] text-slate-400 font-mono italic">Document Ref: {data.no}</div>
                </div>

                <div className="flex-grow px-12 text-center">
                  <p className="text-slate-400 mb-6 uppercase tracking-[0.2em] text-[10px] font-bold">This document confirms that</p>
                  <h2 className="text-4xl font-black text-slate-900 uppercase mb-2 leading-none tracking-tight">{data.empName}</h2>
                  <div className="text-sm text-slate-500 mb-12 font-mono">Employee Registration No: {data.empNik}</div>
                  
                  <div className="max-w-xl mx-auto space-y-8 leading-relaxed">
                    <p className="text-slate-600 text-lg">
                      Has completed their professional service at <strong>{data.compName}</strong> as <strong>{data.empPosition}</strong>. 
                      Effectively serving from <strong>{isClient && data.startDate ? new Date(data.startDate + 'T00:00:00').toLocaleDateString('id-ID', {month:'long', year:'numeric'}) : ''}</strong> until <strong>{isClient && data.endDate ? new Date(data.endDate + 'T00:00:00').toLocaleDateString('id-ID', {month:'long', year:'numeric'}) : ''}</strong>.
                    </p>
                    <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 text-slate-500 text-sm italic print:bg-transparent print:border-black">
                      "{data.evaluation}"
                    </div>
                  </div>
                </div>

                <div className="shrink-0 mt-16 flex justify-between items-end border-t border-slate-100 pt-8 pb-4">
                  <div className="text-[7pt] text-slate-400 max-w-[280px] leading-tight">
                    This official certificate is generated by the Human Resources system. Authenticity can be verified through corporate records.
                  </div>
                  <div className="text-right">
                    <p className="text-[9pt] text-slate-400 font-bold uppercase mb-16 tracking-widest">{data.city}, {formatDateSafe(data.date)}</p>
                    <p className="font-black text-slate-900 text-xl leading-none uppercase">{data.signerName}</p>
                    <p className="text-[10px] text-blue-600 font-black mt-2 uppercase tracking-widest">{data.signerJob}</p>
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
               <Briefcase size={16} className="text-emerald-500" /> <span>Paklaring Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Standar HRD {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Modern Certificate {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Paklaring</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Company Logo" /> : <Upload size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus</button>}
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="Nama PT" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Karyawan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Jabatan Terakhir" />
                 <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">MULAI</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">AKHIR</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Medal size={12}/> Tanda Tangan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penandatangan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.evaluation} onChange={e => handleDataChange('evaluation', e.target.value)} placeholder="Penilaian Kinerja..." />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <PaklaringContent />
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

      <div id="print-only-root" className="hidden"><div className="bg-white"><PaklaringContent /></div></div>
    </div>
  );
}