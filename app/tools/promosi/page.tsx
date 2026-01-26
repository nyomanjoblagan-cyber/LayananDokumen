'use client';

/**
 * FILE: PromosiJabatanPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Rekomendasi Promosi Jabatan
 * FEATURES:
 * - Dual Template (Formal Corporate vs Modern Clean)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, Building2, UserCircle2, 
  Award, LayoutTemplate, ChevronDown, ImagePlus, X, PenTool, 
  CheckCircle2, ShieldCheck, Edit3, Eye, Check, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface PromotionData {
  city: string;
  date: string;
  docNo: string;
  
  // Perusahaan
  companyName: string;
  companyAddress: string;
  
  // Karyawan
  employeeName: string;
  employeeId: string;
  currentPosition: string;
  newPosition: string;
  department: string;
  
  // Penandatangan
  refName: string; // Pemberi Rekomendasi (Atasan)
  refJob: string;
  verifierName: string; // HRD / Mengetahui
  verifierJob: string;
  
  // Isi
  performance: string;
  strengths: string;
  achievement: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PromotionData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  docNo: 'REK-PROM/HRD/2026/005',
  
  companyName: 'PT. INOVASI TEKNOLOGI NEGERI',
  companyAddress: 'Cyber Tower Lt. 10, Kuningan\nJakarta Selatan, 12950\nTelp: (021) 222-3333',
  
  employeeName: 'DIAN SASTRAWIDJAYA',
  employeeId: 'EMP-2023-882',
  currentPosition: 'Senior Graphic Designer',
  newPosition: 'Art Director',
  department: 'Creative & Branding',
  
  refName: 'SETIAWAN BUDI, M.BA.',
  refJob: 'Chief Creative Officer',
  verifierName: 'BAGIAN HRD',
  verifierJob: 'Human Resources Dept.',
  
  performance: 'Sangat Baik (A)',
  strengths: 'Memiliki kemampuan kepemimpinan yang kuat dan visi artistik yang inovatif.',
  achievement: 'Berhasil memimpin proyek rebranding perusahaan dan meningkatkan efisiensi alur kerja tim kreatif sebesar 30%.'
};

// --- 3. KOMPONEN UTAMA ---
export default function PromosiJabatanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <PromotionBuilder />
    </Suspense>
  );
}

function PromotionBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<PromotionData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PromotionData, val: any) => {
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
            Formal Korporat
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Clean
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal Korporat' : 'Modern Clean';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAL KORPORAT */
        <div className="flex flex-col h-full">
            <div className="flex items-start gap-6 border-b-2 border-slate-900 pb-4 mb-6 shrink-0">
                {logo ? (
                  <img src={logo} alt="Logo" className="w-16 h-16 object-contain shrink-0 block print:block" />
                ) : (
                  <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 shrink-0 print:hidden">
                    <Building2 size={28} />
                  </div>
                )}
                <div className="flex-grow text-left">
                   <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">{data.companyName}</h1>
                   <div className="text-[8.5pt] font-sans text-slate-600 whitespace-pre-line leading-tight italic print:text-black">
                      {data.companyAddress}
                   </div>
                </div>
            </div>

            <div className="text-center mb-8 shrink-0 leading-tight">
                <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT REKOMENDASI PROMOSI</h2>
                <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
            </div>

            <div className="space-y-6 flex-grow overflow-hidden text-left">
                <p>Saya yang bertanda tangan di bawah ini:</p>
                <div className="ml-8 space-y-1 text-sm font-sans italic border-l-2 border-slate-200 pl-4 print:border-slate-400">
                   <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.refName}</span></div>
                   <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.refJob}</span></div>
                </div>

                <p>Memberikan rekomendasi promosi jabatan kepada karyawan:</p>
                <div className="ml-8 space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-sm print:bg-transparent print:border-black">
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-bold uppercase">{data.employeeName}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>ID Karyawan</span><span>:</span><span>{data.employeeId}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan Saat Ini</span><span>:</span><span>{data.currentPosition}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>Departemen</span><span>:</span><span>{data.department}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr] pt-2 mt-2 border-t border-slate-200 print:border-black"><span>Direkomendasikan Sebagai</span><span>:</span><span className="font-black text-blue-700 underline print:text-black">{data.newPosition}</span></div>
                </div>

                <p className="text-justify leading-relaxed">
                  Berdasarkan hasil evaluasi kinerja tahunan, yang bersangkutan telah menunjukkan performa dengan predikat <b>{data.performance}</b>. 
                  {data.strengths} Kontribusi utama yang telah diberikan antara lain: <i>"{data.achievement}"</i>.
                </p>
                <p>Demikian surat rekomendasi ini dibuat untuk dapat dipergunakan sebagaimana mestinya dalam proses penilaian promosi.</p>
            </div>

            <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
                 <div className="grid grid-cols-2 gap-10 text-center">
                    <div className="flex flex-col h-32">
                       <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black">Diverifikasi,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase text-[10pt]">{data.verifierName}</p>
                          <p className="text-[8pt] italic">{data.verifierJob}</p>
                       </div>
                    </div>
                    <div className="flex flex-col h-32">
                       <p className="text-[9pt] font-bold mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
                       <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black">Hormat Saya,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase text-[10pt]">{data.refName}</p>
                          <p className="text-[8pt] italic">{data.refJob}</p>
                       </div>
                    </div>
                 </div>
            </div>
        </div>
      ) : (
        /* TEMPLATE 2: MODERN CLEAN */
        <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-12 border-l-4 border-emerald-600 pl-6 py-2 shrink-0">
               <div>
                  <h1 className="text-2xl font-black uppercase tracking-tighter leading-none text-slate-900">{data.companyName}</h1>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 print:text-black">Internal Memo: Promotion Recommendation</p>
               </div>
               <div className="text-right text-xs">
                  <p className="font-mono">Ref: {data.docNo}</p>
                  <p>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : '...'}</p>
               </div>
            </div>

            <div className="flex-grow space-y-8 text-justify">
               
               <div className="grid grid-cols-2 gap-8">
                  <div>
                     <h3 className="text-[10px] font-black uppercase text-slate-400 mb-2 print:text-black">Candidate</h3>
                     <p className="text-lg font-bold text-slate-900">{data.employeeName}</p>
                     <p className="text-sm text-slate-500 print:text-black">{data.currentPosition}</p>
                  </div>
                  <div>
                     <h3 className="text-[10px] font-black uppercase text-emerald-600 mb-2 print:text-black">Recommended For</h3>
                     <p className="text-xl font-black text-emerald-700 underline print:text-black">{data.newPosition}</p>
                     <p className="text-sm text-slate-500 print:text-black">{data.department}</p>
                  </div>
               </div>

               <div className="bg-emerald-50/50 p-6 rounded-lg border border-emerald-100 print:bg-transparent print:border-black">
                  <h3 className="text-[10px] font-black uppercase text-emerald-800 mb-3 print:text-black">Performance Review Highlights</h3>
                  <p className="text-sm leading-relaxed mb-4">"{data.strengths}"</p>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-600 print:text-black" />
                        <span>Rating: <strong>{data.performance}</strong></span>
                     </div>
                     <div className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 print:text-black" />
                        <span>Achievement: {data.achievement}</span>
                     </div>
                  </div>
               </div>

               <p className="text-sm">I highly recommend this promotion based on the candidate's consistent performance and readiness for greater responsibilities.</p>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-end shrink-0 print:border-black" style={{ pageBreakInside: 'avoid' }}>
               <div>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-12 print:text-black">Acknowledged By (HR)</p>
                  <p className="font-bold uppercase border-b border-black inline-block pb-1">{data.verifierName}</p>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-12 print:text-black">Proposed By</p>
                  <p className="font-bold uppercase border-b border-black inline-block pb-1">{data.refName}</p>
                  <p className="text-xs mt-1">{data.refJob}</p>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Award size={16} /> <span>Recommendation Builder</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Promosi</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><PenTool size={12}/> Pihak Terkait</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.refName} onChange={e => handleDataChange('refName', e.target.value)} placeholder="Nama Atasan (Pemberi Rekomendasi)" />
                 <input className="w-full p-2 border rounded text-xs" value={data.refJob} onChange={e => handleDataChange('refJob', e.target.value)} placeholder="Jabatan Atasan" />
                 <div className="grid grid-cols-2 gap-2 mt-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.verifierName} onChange={e => handleDataChange('verifierName', e.target.value)} placeholder="Nama HRD / Verifikator" />
                    <input className="w-full p-2 border rounded text-xs" value={data.verifierJob} onChange={e => handleDataChange('verifierJob', e.target.value)} placeholder="Jabatan HRD" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Kandidat Promosi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.employeeName} onChange={e => handleDataChange('employeeName', e.target.value)} placeholder="Nama Karyawan" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.employeeId} onChange={e => handleDataChange('employeeId', e.target.value)} placeholder="NIP / ID" />
                    <input className="w-full p-2 border rounded text-xs" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Departemen" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.currentPosition} onChange={e => handleDataChange('currentPosition', e.target.value)} placeholder="Posisi Lama" />
                    <input className="w-full p-2 border rounded text-xs font-bold text-blue-600" value={data.newPosition} onChange={e => handleDataChange('newPosition', e.target.value)} placeholder="Posisi Baru (Promosi)" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Award size={12}/> Evaluasi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.performance} onChange={e => handleDataChange('performance', e.target.value)} placeholder="Predikat Kinerja (A/B/C)" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Kekuatan / Kelebihan" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.achievement} onChange={e => handleDataChange('achievement', e.target.value)} placeholder="Pencapaian Utama" />
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
