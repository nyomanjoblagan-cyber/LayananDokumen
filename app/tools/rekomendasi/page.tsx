'use client';

/**
 * FILE: RekomendasiKerjaPage.tsx
 * STATUS: PRODUCTION READY (FIXED ERROR)
 * DESC: Generator Surat Rekomendasi Kerja (Job Recommendation Letter)
 * FIX: Menambahkan kembali fungsi TemplateMenu yang hilang untuk memperbaiki error scope.
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  UserPlus, Building2, Star, ChevronDown, Check, FileText, Edit3, Eye, ImagePlus, X, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface JobRecData {
  no: string;
  city: string;
  date: string;
  
  compName: string;
  compAddr: string;
  
  signerName: string;
  signerJob: string;
  
  empName: string;
  empPosition: string;
  
  strengths: string;
  achievement: string;
  attitude: string;
  closing: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: JobRecData = {
  no: `SRK/HRD/I/2026/089`,
  city: 'JAKARTA',
  date: '', 
  
  compName: 'PT. KREATIF DIGITAL SOLUSINDO',
  compAddr: 'Gedung Wisma Mulia Lt. 25, Kav. 42\nJl. Gatot Subroto, Jakarta Selatan',
  
  signerName: 'BAMBANG SUDJATMIKO, S.Kom',
  signerJob: 'Chief Technology Officer',
  
  empName: 'ARIEF KURNIAWAN',
  empPosition: 'Senior Frontend Developer',
  
  strengths: 'Kemampuan problem solving yang luar biasa, kepemimpinan tim yang solid, serta penguasaan teknologi React dan Next.js yang sangat mendalam.',
  achievement: 'Berhasil memimpin migrasi infrastruktur website perusahaan yang meningkatkan kecepatan load hingga 40%.',
  attitude: 'Sangat disiplin, memiliki integritas tinggi, dan mampu bekerja di bawah tekanan dengan hasil yang memuaskan.',
  closing: 'Saya merekomendasikan Saudara Arief Kurniawan tanpa keraguan kepada perusahaan manapun yang membutuhkan tenaga profesional handal. Kami mendoakan yang terbaik bagi karir beliau di masa depan.'
};

export default function RekomendasiKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <RekomendasiToolBuilder />
    </Suspense>
  );
}

function RekomendasiToolBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<JobRecData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof JobRecData, val: any) => {
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

  // --- FIX: DEFINISI TEMPLATEMENU (Mencegah Error 2552) ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal Executive
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Letter
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal Executive' : 'Modern Letter';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11.5pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {templateId === 1 ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center gap-6 border-b-[3px] border-double border-slate-900 pb-4 mb-8 shrink-0 font-sans">
              {logo ? (
                 <img src={logo} className="h-16 w-auto object-contain shrink-0" alt="logo" />
              ) : (
                 <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 print:hidden">
                    <Building2 size={24} />
                 </div>
              )}
              <div className="text-center flex-1">
                <h1 className="text-xl font-black uppercase text-slate-900 leading-none mb-1 tracking-tighter">{data.compName}</h1>
                <div className="text-[8.5pt] whitespace-pre-line text-slate-500 leading-tight italic print:text-black">{data.compAddr}</div>
              </div>
            </div>

            <div className="text-center mb-8 shrink-0 leading-tight font-sans">
              <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SURAT REKOMENDASI KERJA</h2>
              <p className="text-[9.5pt] mt-3 italic font-bold text-slate-400 print:text-black">Nomor: {data.no}</p>
            </div>

            <div className="flex-grow space-y-6 text-justify leading-relaxed">
              <p>Saya yang bertanda tangan di bawah ini:</p>
              <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 break-inside-avoid">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold text-slate-900 uppercase tracking-tight">{data.signerName}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.signerJob}</span></div>
              </div>

              <p>Dengan ini memberikan rekomendasi profesional kepada mantan karyawan kami:</p>
              <div className="ml-8 space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] print:bg-transparent print:border-black break-inside-avoid">
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-black uppercase tracking-tight text-slate-900">{data.empName}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan Terakhir</span><span>:</span><span className="font-bold text-blue-700 print:text-black">{data.empPosition}</span></div>
              </div>

              <div className="space-y-4">
                <p>Selama berkarir di <strong>{data.compName}</strong>, Saudara {data.empName} telah menunjukkan {data.strengths}</p>
                <p>Beliau memiliki rekam jejak prestasi yang memuaskan, di antaranya {data.achievement} Secara personal, beliau adalah individu yang {data.attitude}</p>
                <p>{data.closing}</p>
              </div>
              
              <p>Demikian surat rekomendasi ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.</p>
            </div>

            <div className="shrink-0 mt-12 flex justify-end text-center break-inside-avoid font-sans" style={{ pageBreakInside: 'avoid' }}>
               <div className="w-72">
                  <p className="mb-2 text-[10pt]">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="mb-20 font-black uppercase text-[9px] tracking-widest text-slate-300 print:text-black">Hormat Kami,</p>
                  <p className="font-bold underline uppercase text-[11pt] tracking-tighter text-slate-900">{data.signerName}</p>
                  <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">{data.signerJob}</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-12 border-b-2 border-slate-100 pb-6 shrink-0 print:border-black">
              <div className="flex items-center gap-4">
                {logo ? <img src={logo} className="h-12 w-auto object-contain" alt="logo" /> : <div className="p-3 bg-emerald-600 rounded-xl text-white font-black">REC</div>}
                <div>
                  <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{data.compName}</h1>
                  <div className="text-[8pt] text-emerald-600 font-bold uppercase tracking-[0.2em]">Professional Reference</div>
                </div>
              </div>
              <div className="text-right text-[8pt] text-slate-400 font-medium leading-snug print:text-black">
                {data.compAddr}
              </div>
            </div>

            <div className="flex-grow space-y-10 text-justify leading-relaxed">
              <div className="mb-4">
                <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">Recommendation</h2>
                <p className="text-slate-400 font-mono text-[9pt] uppercase tracking-widest print:text-black">Ref ID: {data.no}</p>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] print:bg-transparent print:text-black print:border-2 print:border-black break-inside-avoid">
                <p className="text-xl italic font-serif leading-relaxed">
                  "I highly recommend <span className="text-emerald-400 print:text-black font-bold not-italic underline decoration-2 underline-offset-8 uppercase">{data.empName}</span> for any future professional endeavors based on their exceptional performance and core values."
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 break-inside-avoid">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 print:border-black">
                  <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">Core Strengths</h4>
                  <p className="text-[10pt] text-slate-600 leading-snug italic">"{data.strengths}"</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 print:border-black">
                  <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">Key Achievement</h4>
                  <p className="text-[10pt] text-slate-600 leading-snug italic">"{data.achievement}"</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 print:border-black">
                  <h4 className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-3">Work Ethic</h4>
                  <p className="text-[10pt] text-slate-600 leading-snug italic">"{data.attitude}"</p>
                </div>
              </div>

              <p className="text-slate-700 font-medium">{data.closing}</p>
            </div>

            <div className="shrink-0 mt-12 flex justify-between items-end border-t-2 border-slate-50 pt-10 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
               <div className="text-[9pt] font-black text-slate-300 uppercase tracking-widest">
                  Issue Date: {formatDateSafe(data.date)}
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-300 mb-16 tracking-[0.3em]">Authorized Signature</p>
                  <p className="text-2xl font-black text-slate-900 uppercase leading-none tracking-tighter">{data.signerName}</p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-2">{data.signerJob}</p>
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

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <Star size={16} /> <span>Recommendation Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="Nama PT" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.compAddr} onChange={e => handleDataChange('compAddr', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserPlus size={12}/> Karyawan & Penandatangan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} placeholder="Nama Karyawan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Posisi Karyawan" />
                 <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                   <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penandatangan" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan Penandatangan" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Star size={12}/> Isi Rekomendasi</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Kekuatan Karyawan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.achievement} onChange={e => handleDataChange('achievement', e.target.value)} placeholder="Pencapaian Karyawan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.attitude} onChange={e => handleDataChange('attitude', e.target.value)} placeholder="Sikap Karyawan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Administrasi</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat" />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-bold font-sans">
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