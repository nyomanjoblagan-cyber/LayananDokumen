'use client';

/**
 * FILE: KematianPage.tsx
 * STATUS: FINAL & FIXED
 * DESC: Generator Surat Keterangan Kematian
 * FIX: Renamed component to 'DocumentContent' to match usage
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Building2, UserCircle2, 
  LayoutTemplate, X, ShieldCheck, Clock, Edit3, Eye, Check, ChevronDown, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface DeathData {
  city: string;
  date: string;
  docNo: string;
  
  // Penerbit
  issuerOffice: string;
  issuerName: string;
  issuerJob: string;

  // Jenazah
  deceasedName: string;
  deceasedNik: string;
  deceasedAge: string;
  deceasedGender: string;
  deceasedAddress: string;
  
  // Kejadian
  deathDate: string;
  deathTime: string;
  deathPlace: string;
  deathReason: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DeathData = {
  city: 'DENPASAR',
  date: '', 
  docNo: 'SKM/RT02/I/2026',
  
  issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR BARAT\nKELURAHAN DAUH PURI',
  issuerName: 'I WAYAN SUDIRTA, S.Sos',
  issuerJob: 'Lurah Dauh Puri',

  deceasedName: 'H. AHMAD JAYADI',
  deceasedNik: '5171010101700001',
  deceasedAge: '65',
  deceasedGender: 'Laki-laki',
  deceasedAddress: 'Jl. Diponegoro No. 45, Denpasar, Bali',
  
  deathDate: '', 
  deathTime: '04:30 WITA',
  deathPlace: 'RSUP Prof. Dr. I.G.N.G. Ngoerah',
  deathReason: 'Sakit (Henti Jantung)'
};

// --- 3. KOMPONEN UTAMA ---
export default function KematianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Kematian...</div>}>
      <DeathNoticeBuilder />
    </Suspense>
  );
}

function DeathNoticeBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<DeathData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: today,
        deathDate: today 
    }));
  }, []);

  const handleDataChange = (field: keyof DeathData, val: any) => {
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
        setData({ ...INITIAL_DATA, date: today, deathDate: today });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Kelurahan/Desa
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Rumah Sakit
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Kelurahan' : 'Format Rumah Sakit';

  // --- KOMPONEN ISI SURAT (RENAMED FROM DeathContent) ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* KOP SURAT */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-6 w-full px-4">
           {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
           ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                 <Building2 size={32} />
              </div>
           )}
           <div className="text-center flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase italic tracking-tighter">
                 {data.issuerOffice}
              </div>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT KETERANGAN KEMATIAN</h2>
        <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini, menerangkan bahwa pada hari ini:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10.5pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Hari</span><span>:</span><span className="capitalize">{isClient && data.deathDate ? new Date(data.deathDate).toLocaleDateString('id-ID', {weekday: 'long'}) : '...'}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Tanggal</span><span>:</span><span>{isClient && data.deathDate ? new Date(data.deathDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Waktu</span><span>:</span><span>Pukul {data.deathTime}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Tempat</span><span>:</span><span>{data.deathPlace}</span></div>
        </div>

        <p className="mb-4 font-bold underline italic">Telah meninggal dunia seorang:</p>

        <div className="ml-8 mb-6 space-y-1 font-sans text-[10.5pt] border-l-4 border-slate-100 pl-6">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.deceasedName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.deceasedNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Jenis Kelamin</span><span>:</span><span>{data.deceasedGender}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Umur</span><span>:</span><span>{data.deceasedAge} Tahun</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Terakhir</span><span>:</span><span>{data.deceasedAddress}</span></div>
        </div>

        <p className="mb-6">Berdasarkan hasil diagnosa/keterangan medis, yang bersangkutan meninggal dunia disebabkan oleh <b>{data.deathReason}</b>.</p>

        <p>Demikian Surat Keterangan Kematian ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-10">
                {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
              </td>
            </tr>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">{data.issuerJob},</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.issuerName}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          /* FIX PRINT LAYOUT */
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white; 
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
               <Building2 size={16} className="text-blue-500" /> <span>DEATH NOTICE BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Kematian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              {/* Instansi */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi Penerbit</h3>
                 <div className="flex items-center gap-4">
                    {logo ? (
                       <div className="relative w-16 h-16 border rounded overflow-hidden group">
                          <img src={logo} className="w-full h-full object-contain" />
                          <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                       </div>
                    ) : (
                       <button onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 hover:text-blue-400 transition-all"><X size={20} /></button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed font-bold uppercase" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
              </div>

              {/* Data Jenazah */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Jenazah</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} placeholder="Nama Almarhum" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.deceasedAge} onChange={e => handleDataChange('deceasedAge', e.target.value)} placeholder="Umur" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.deceasedAddress} onChange={e => handleDataChange('deceasedAddress', e.target.value)} placeholder="Alamat" />
              </div>

              {/* Detail Kejadian */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Clock size={12}/> Detail Kejadian</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.deathDate} onChange={e => handleDataChange('deathDate', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" value={data.deathTime} onChange={e => handleDataChange('deathTime', e.target.value)} placeholder="Jam (cth: 08:00)" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.deathReason} onChange={e => handleDataChange('deathReason', e.target.value)} placeholder="Penyebab" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} placeholder="Nama Penandatangan" />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                   <div className="print-content-wrapper p-[20mm]">
                      <DocumentContent />
                   </div>
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
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}
