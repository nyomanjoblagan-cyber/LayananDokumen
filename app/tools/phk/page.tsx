'use client';

/**
 * FILE: SuratPHKPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pemutusan Hubungan Kerja (PHK)
 * FEATURES:
 * - Dual Template (Formal Corporate vs Modern Clean)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Building2, UserCircle2, 
  Scale, LayoutTemplate, ChevronDown, ImagePlus, X, PenTool, Edit3, Eye, Check, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface TerminationData {
  city: string;
  date: string;
  docNo: string;
  
  // Perusahaan
  companyName: string;
  companyAddress: string;
  authorityName: string;
  authorityJob: string;
  
  // Karyawan
  employeeName: string;
  employeeId: string;
  position: string;
  lastWorkDate: string;
  
  // Isi
  reason: string;
  compensationInfo: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: TerminationData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  docNo: 'SK-PHK/MKT/2026/012',
  
  companyName: 'PT. SINAR JAYA TEKNOLOGI',
  companyAddress: 'Gedung Grha Mandiri Lt. 15, Menteng\nJakarta Pusat, 10310\nTelp: (021) 555-1234',
  
  authorityName: 'HENDRA KUSUMA, S.H.',
  authorityJob: 'Human Resources Manager',
  
  employeeName: 'AHMAD SUBARDI',
  employeeId: 'EMP-2022-045',
  position: 'Senior Marketing Executive',
  lastWorkDate: '2026-01-31',
  
  reason: 'Efisiensi Perusahaan dikarenakan perubahan strategi bisnis dan kondisi ekonomi yang terdampak secara global, sehingga diperlukan reorganisasi struktur organisasi.',
  compensationInfo: 'Uang Pesangon, Uang Penghargaan Masa Kerja, dan Uang Penggantian Hak sesuai dengan ketentuan PP No. 35 Tahun 2021.'
};

// --- 3. KOMPONEN UTAMA ---
export default function SuratPHKPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <TerminationLetterBuilder />
    </Suspense>
  );
}

function TerminationLetterBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<TerminationData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof TerminationData, val: any) => {
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
                <div className="flex-grow text-center">
                   <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">{data.companyName}</h1>
                   <div className="text-[8.5pt] font-sans text-slate-600 whitespace-pre-line leading-tight italic print:text-black">
                      {data.companyAddress}
                   </div>
                </div>
            </div>

            <div className="text-center mb-8 shrink-0 leading-tight">
                <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PEMBERITAHUAN PHK</h2>
                <p className="text-[9pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
            </div>

            <div className="space-y-5 flex-grow text-justify">
                <p>Kepada Yth,<br/><b>Bapak/Ibu {data.employeeName}</b><br/>Di Tempat</p>
                <p>Dengan hormat,</p>
                <p className="leading-relaxed">Manajemen <b>{data.companyName}</b> menyampaikan apresiasi atas kontribusi Saudara selama ini. Namun, dikarenakan <b>{data.reason}</b>, kami memberitahukan pengakhiran hubungan kerja terhadap:</p>

                <div className="ml-8 mb-4 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 py-0.5 print:border-slate-300">
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>ID Karyawan</span><span>:</span><span className="font-bold">{data.employeeId}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.position}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Tanggal Efektif</span><span>:</span><span className="font-bold text-red-600 underline print:text-black">{isClient && data.lastWorkDate ? new Date(data.lastWorkDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</span></div>
                </div>

                <p className="leading-relaxed">Seluruh hak kompensasi berupa <b>{data.compensationInfo}</b> akan diselesaikan sesuai peraturan perundang-undangan yang berlaku.</p>
                <p>Demikian surat ini kami sampaikan. Terima kasih.</p>
            </div>

            <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
                 <div className="grid grid-cols-2 gap-8 text-center">
                    <div className="flex flex-col h-32">
                       <p className="uppercase text-[8.5pt] font-bold text-slate-400 tracking-widest print:text-black mb-1">Perusahaan,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase tracking-tight leading-none text-[10.5pt]">{data.authorityName}</p>
                          <p className="text-[8.5pt] italic mt-1">{data.authorityJob}</p>
                       </div>
                    </div>
                    <div className="flex flex-col h-32">
                       <p className="text-[9pt] font-bold mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
                       <p className="uppercase text-[8.5pt] font-bold text-slate-400 tracking-widest print:text-black">Karyawan,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase tracking-tight leading-none text-[10.5pt]">{data.employeeName}</p>
                          <p className="text-[8.5pt] italic mt-1">Penerima</p>
                       </div>
                    </div>
                 </div>
            </div>
        </div>
      ) : (
        /* TEMPLATE 2: MODERN CLEAN */
        <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-12 border-l-4 border-slate-900 pl-6 py-2 shrink-0">
               <div>
                  <h1 className="text-2xl font-black uppercase tracking-tighter leading-none text-slate-900">{data.companyName}</h1>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 print:text-black">Official Notice</p>
               </div>
               <div className="text-right text-xs">
                  <p className="font-mono">Ref: {data.docNo}</p>
                  <p>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : '...'}</p>
               </div>
            </div>

            <div className="flex-grow space-y-6 text-justify">
               <h2 className="text-xl font-bold mb-6">Pemberitahuan Pemutusan Hubungan Kerja</h2>
               
               <p>Kepada <strong>{data.employeeName}</strong>,</p>
               <p>Melalui surat ini, kami menginformasikan keputusan manajemen terkait status kepegawaian Anda di <strong>{data.companyName}</strong>.</p>
               
               <div className="bg-slate-50 p-6 border border-slate-200 rounded-lg print:bg-transparent print:border-black">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                     <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 print:text-black">Posisi</p>
                        <p className="font-bold">{data.position}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 print:text-black">Efektif Per Tanggal</p>
                        <p className="font-bold">{isClient && data.lastWorkDate ? new Date(data.lastWorkDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
                     </div>
                  </div>
                  <div className="border-t pt-4">
                     <p className="text-[10px] font-bold uppercase text-slate-400 mb-1 print:text-black">Alasan</p>
                     <p className="italic text-slate-600 print:text-black">"{data.reason}"</p>
                  </div>
               </div>

               <p>Perusahaan akan memenuhi seluruh kewajiban finansial sesuai ketentuan yang berlaku, termasuk <strong>{data.compensationInfo}</strong>.</p>
               <p>Terima kasih atas dedikasi Anda selama ini.</p>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-end shrink-0 print:border-black" style={{ pageBreakInside: 'avoid' }}>
               <div>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-12 print:text-black">Diterima Oleh,</p>
                  <p className="font-bold uppercase border-b border-black inline-block pb-1">{data.employeeName}</p>
               </div>
               <div className="text-right">
                  <p className="text-xs font-bold uppercase text-slate-400 mb-12 print:text-black">Disetujui Oleh,</p>
                  <p className="font-bold uppercase border-b border-black inline-block pb-1">{data.authorityName}</p>
                  <p className="text-xs mt-1">{data.authorityJob}</p>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-tighter italic">
               <PenTool size={16} /> <span>Termination Letter Builder</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data PHK</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop & Logo</h3>
                 <div className="flex items-center gap-4">
                    {logo ? (
                       <div className="relative w-16 h-16 border rounded overflow-hidden group">
                          <img src={logo} className="w-full h-full object-contain" />
                          <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                       </div>
                    ) : (
                       <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 transition-all"><ImagePlus size={20} /></button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><PenTool size={12}/> Penandatangan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.authorityName} onChange={e => handleDataChange('authorityName', e.target.value)} placeholder="Nama Manager" />
                 <input className="w-full p-2 border rounded text-xs" value={data.authorityJob} onChange={e => handleDataChange('authorityJob', e.target.value)} placeholder="Jabatan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Karyawan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.employeeName} onChange={e => handleDataChange('employeeName', e.target.value)} placeholder="Nama Karyawan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Jabatan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Scale size={12}/> Detail PHK</h3>
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400">TANGGAL BERAKHIR</label>
                    <input type="date" className="w-full p-2 border rounded text-xs font-black" value={data.lastWorkDate} onChange={e => handleDataChange('lastWorkDate', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Alasan PHK" />
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
