'use client';

/**
 * FILE: IzinPasanganPage.tsx
 * STATUS: FINAL & MOBILE READY & PRINT FIXED
 * DESC: Generator Surat Izin Pasangan (Suami/Istri)
 * FIX: Added 'print:p-[25mm]' to DocumentContent
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Heart, UserCircle2, FileText, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface PartnerData {
  city: string;
  date: string;
  partnerName: string;
  partnerNik: string;
  partnerJob: string;
  partnerAddress: string;
  partnerRelation: 'ISTRI' | 'SUAMI'; 
  userName: string;
  userNik: string;
  purpose: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PartnerData = {
  city: 'SLEMAN',
  date: '',
  partnerName: 'SITI AMINAH',
  partnerNik: '3404014506920002',
  partnerJob: 'Ibu Rumah Tangga',
  partnerAddress: 'Jl. Kaliurang KM 10, Gayam, Sleman',
  partnerRelation: 'ISTRI',
  userName: 'ANDI PRASETYO',
  userNik: '3404011203900005',
  purpose: 'Melamar Pekerjaan sebagai Operator Produksi di PT. Maju Bersama Jaya dan bersedia ditempatkan di luar kota.',
};

export default function IzinPasanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <PartnerConsentBuilder />
    </Suspense>
  );
}

function PartnerConsentBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PartnerData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PartnerData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal (Materai)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Sederhana
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal (Materai)' : 'Sederhana';

  // --- CONTENT ---
  const DocumentContent = () => (
    // FIX: Added 'print:p-[25mm]'
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] print:p-[25mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
        
        <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
          <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-4 leading-none">SURAT IZIN {data.partnerRelation}</h1>
        </div>

        <div className="space-y-4 flex-grow">
          <p>Saya yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-6 space-y-1 text-[11pt]">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.partnerName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.partnerNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.partnerJob}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.partnerAddress}</span></div>
          </div>

          <p className="mt-2">Dengan ini memberikan <strong>IZIN SEPENUHNYA</strong> kepada {data.partnerRelation === 'ISTRI' ? 'Suami' : 'Istri'} saya:</p>

          <div className="ml-6 space-y-1 text-[11pt]">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.userName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.userNik}</span></div>
          </div>

          <div className="space-y-4 text-justify leading-relaxed mt-2">
            <p>Untuk mengikuti / melakukan hal sebagai berikut:</p>
            <div className="bg-slate-50 p-4 border border-slate-200 italic font-medium text-center text-sm">
              "{data.purpose}"
            </div>
            
            <p>Bahwa selaku {data.partnerRelation}, saya mendukung penuh keputusan tersebut dan tidak akan melakukan tuntutan apapun di kemudian hari kepada pihak penyelenggara/perusahaan terkait selama kegiatan tersebut tidak melanggar hukum dan norma yang berlaku.</p>
            
            <p>Demikian surat izin ini saya buat dengan penuh kesadaran dan tanpa ada paksaan dari pihak manapun, untuk dipergunakan sebagaimana mestinya.</p>
          </div>
        </div>

        <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
          <p className="text-right mb-8">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</p>
          
          <div className="flex justify-between items-end text-[11pt]">
              <div className="text-center w-56">
                <p className="mb-20 font-bold uppercase text-xs tracking-widest">Yang Diberi Izin,</p>
                <p className="font-bold underline uppercase leading-none">{data.userName}</p>
              </div>
              
              <div className="text-center w-56">
                <p className="mb-4 font-bold uppercase text-xs tracking-widest">Pemberi Izin ({data.partnerRelation}),</p>
                {templateId === 1 ? (
                  <div className="border border-slate-300 w-20 h-14 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400 italic">MATERAI 10.000</div>
                ) : (
                  <div className="h-16"></div>
                )}
                <p className="font-bold underline uppercase leading-none">{data.partnerName}</p>
              </div>
          </div>
        </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
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
               <Heart size={16} className="text-pink-500" /> <span>PARTNER CONSENT BUILDER</span>
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
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-pink-600 tracking-widest"><Heart size={14}/> Data Pemberi Izin</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleDataChange('partnerRelation', 'ISTRI')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.partnerRelation === 'ISTRI' ? 'bg-pink-600 text-white ring-2 ring-pink-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>ISTRI</button>
                    <button onClick={() => handleDataChange('partnerRelation', 'SUAMI')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.partnerRelation === 'SUAMI' ? 'bg-blue-600 text-white ring-2 ring-blue-200' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>SUAMI</button>
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pasangan" value={data.partnerName} onChange={e => handleDataChange('partnerName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" placeholder="NIK Pasangan" value={data.partnerNik} onChange={e => handleDataChange('partnerNik', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.partnerJob} onChange={e => handleDataChange('partnerJob', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" placeholder="Alamat Pasangan" value={data.partnerAddress} onChange={e => handleDataChange('partnerAddress', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><UserCircle2 size={14}/> Yang Diberi Izin</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" placeholder="Nama Anda" value={data.userName} onChange={e => handleDataChange('userName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" placeholder="NIK Anda" value={data.userNik} onChange={e => handleDataChange('userNik', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-slate-400 tracking-widest"><FileText size={14}/> Keperluan Izin</h3>
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none" placeholder="Contoh: Bekerja di Luar Negeri" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" placeholder="Kota" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center">
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
         <div style={{ width: '210mm', minHeight: 'auto' }} className="bg-white flex flex-col">
             <div className="print-content-wrapper p-[20mm]">
                <DocumentContent />
             </div>
         </div>
      </div>

    </div>
  );
}
