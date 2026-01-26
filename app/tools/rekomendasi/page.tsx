'use client';

/**
 * FILE: RekomendasiKerjaPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Rekomendasi Kerja (Job Recommendation Letter)
 * FEATURES:
 * - Dual Template (Formal Executive vs Modern Letter)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  UserPlus, Building2, Star, ChevronDown, Check, FileText, Edit3, Eye, ImagePlus, X, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface JobRecData {
  no: string;
  city: string;
  date: string;
  
  // Perusahaan
  compName: string;
  compAddr: string;
  
  // Penandatangan (Atasan/HR)
  signerName: string;
  signerJob: string;
  
  // Karyawan
  empName: string;
  empPosition: string;
  
  // Isi Rekomendasi
  strengths: string;
  achievement: string;
  attitude: string;
  closing: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: JobRecData = {
  no: `SRK/HRD/I/2026/089`,
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  
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

// --- 3. KOMPONEN UTAMA ---
export default function RekomendasiKerjaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <RekomendasiToolBuilder />
    </Suspense>
  );
}

function RekomendasiToolBuilder() {
  // --- STATE SYSTEM ---
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU ---
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

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11.5pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAL */
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center gap-6 border-b-[3px] border-double border-slate-900 pb-4 mb-8 shrink-0">
            {logo ? (
               <img src={logo} className="h-16 w-auto object-contain shrink-0" alt="logo" />
            ) : (
               <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 print:hidden">
                  <Building2 size={24} />
               </div>
            )}
            <div className="text-center flex-1">
              <h1 className="text-xl font-black uppercase text-slate-900 leading-none mb-2">{data.compName}</h1>
              <div className="text-[9pt] font-sans whitespace-pre-line text-slate-600 leading-tight italic print:text-black">{data.compAddr}</div>
            </div>
          </div>

          <div className="text-center mb-8 shrink-0 leading-tight">
            <h2 className="text-lg font-bold uppercase underline tracking-widest">SURAT REKOMENDASI KERJA</h2>
            <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest text-slate-500 print:text-black">Nomor: {data.no}</p>
          </div>

          <div className="flex-grow space-y-6 text-justify overflow-hidden">
            <p>Saya yang bertanda tangan di bawah ini:</p>
            <div className="ml-8 space-y-1 font-sans text-sm border-l-2 border-slate-100 pl-4 print:border-slate-300">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.signerName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.signerJob}</span></div>
            </div>

            <p>Dengan ini memberikan rekomendasi penuh kepada:</p>
            <div className="ml-8 space-y-1 font-sans text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 print:bg-transparent print:border-black">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.empName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan Terakhir</span><span>:</span><span>{data.empPosition}</span></div>
            </div>

            <div className="space-y-4 leading-relaxed">
              <p>Selama bekerja di <b>{data.compName}</b>, Saudara {data.empName} telah menunjukkan {data.strengths}</p>
              <p>Beliau juga memiliki catatan prestasi yang luar biasa, di mana beliau {data.achievement} Secara personal, beliau adalah individu yang {data.attitude}</p>
              <p>{data.closing}</p>
            </div>
          </div>

          <div className="shrink-0 mt-12 flex justify-end text-center" style={{ pageBreakInside: 'avoid' }}>
             <div className="w-64">
                <p className="mb-1 text-[10pt]">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</p>
                <p className="mb-20 font-bold uppercase text-[9pt] text-slate-400 print:text-black">Hormat Kami,</p>
                <p className="font-bold underline uppercase">{data.signerName}</p>
                <p className="text-[9pt] font-sans italic mt-1">{data.signerJob}</p>
             </div>
          </div>
        </div>
      ) : (
        /* TEMPLATE 2: MODERN */
        <div className="flex flex-col h-full font-sans">
          <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-6 shrink-0 print:border-black">
            <div className="flex items-center gap-4">
              {logo ? <img src={logo} className="h-12 w-auto" alt="logo" /> : <div className="p-2 bg-emerald-600 rounded text-white font-black print:text-black print:bg-transparent print:border print:border-black">HR</div>}
              <div>
                <h1 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none mb-1">{data.compName}</h1>
                <div className="text-[8pt] text-emerald-600 font-bold uppercase tracking-widest print:text-black">Employee Recommendation</div>
              </div>
            </div>
            <div className="text-right text-[8pt] text-slate-400 max-w-[200px] whitespace-pre-line leading-tight print:text-black">{data.compAddr}</div>
          </div>

          <div className="flex-grow space-y-10">
            <div className="mb-4">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Recommendation</h2>
              <p className="text-slate-400 font-mono text-xs uppercase tracking-widest print:text-black">Ref: {data.no}</p>
            </div>

            <p className="text-slate-600 italic leading-relaxed text-lg border-l-4 border-emerald-500 pl-6 print:text-black print:border-black">
              "I highly recommend <span className="text-slate-900 font-bold not-italic underline decoration-emerald-500 underline-offset-4 uppercase print:text-black print:decoration-black">{data.empName}</span> for any future professional endeavors based on their exceptional performance."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
              <div className="bg-slate-50 p-4 rounded-2xl print:bg-transparent print:border print:border-black">
                <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2 print:text-black">Core Strengths</h4>
                <p className="text-[9pt] text-slate-700 leading-relaxed print:text-black">{data.strengths}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl print:bg-transparent print:border print:border-black">
                <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2 print:text-black">Key Achievement</h4>
                <p className="text-[9pt] text-slate-700 leading-relaxed print:text-black">{data.achievement}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl print:bg-transparent print:border print:border-black">
                <h4 className="text-[8pt] font-black text-emerald-600 uppercase tracking-widest mb-2 print:text-black">Attitude</h4>
                <p className="text-[9pt] text-slate-700 leading-relaxed print:text-black">{data.attitude}</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed print:text-black">{data.closing}</p>
          </div>

          <div className="shrink-0 mt-12 flex justify-between items-end border-t border-slate-100 pt-8 print:border-black" style={{ pageBreakInside: 'avoid' }}>
             <div className="text-[9pt] text-slate-400 print:text-black">
                Date: {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : '...'}
             </div>
             <div className="text-right">
                <p className="font-bold underline uppercase text-base">{data.signerName}</p>
                <p className="text-[9pt] uppercase tracking-widest mt-1">{data.signerJob}</p>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Star size={16} /> <span>Recommendation Builder</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.compAddr} onChange={e => handleDataChange('compAddr', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserPlus size={12}/> Karyawan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Posisi Terakhir" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Star size={12}/> Isi Rekomendasi</h3>
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Kekuatan / Kelebihan" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.achievement} onChange={e => handleDataChange('achievement', e.target.value)} placeholder="Prestasi" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.attitude} onChange={e => handleDataChange('attitude', e.target.value)} placeholder="Sikap / Etos Kerja" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} placeholder="Penutup" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-slate-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Penandatangan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penandatangan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan" />
                 <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="Nomor Surat" />
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
