'use client';

/**
 * FILE: KematianPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Kematian
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Building2, UserCircle2, 
  LayoutTemplate, X, ShieldCheck, Clock, Edit3, Eye, Check, ChevronDown, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Kematian...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today, deathDate: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Kelurahan' : 'Format Rumah Sakit';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string, style: 'long' | 'full' = 'long') => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: style });
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* KOP SURAT */}
        <div className="flex items-center gap-6 w-full px-4 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
           {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
           ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden font-sans">
                 <Building2 size={32} />
              </div>
           )}
           <div className="text-center flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase italic tracking-tighter">
                 {data.issuerOffice}
              </div>
           </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT KETERANGAN KEMATIAN</h2>
          <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow leading-relaxed text-justify overflow-hidden">
          <p className="mb-4">Yang bertanda tangan di bawah ini, menerangkan bahwa pada hari ini:</p>
          
          <div className="ml-8 mb-6 space-y-1 font-sans text-[10.5pt] border-l-4 border-slate-100 pl-6 italic break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Hari</span><span>:</span><span className="capitalize">{isClient && data.deathDate ? new Date(data.deathDate + 'T00:00:00').toLocaleDateString('id-ID', {weekday: 'long'}) : '...'}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Tanggal</span><span>:</span><span>{formatDateSafe(data.deathDate)}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Waktu</span><span>:</span><span>Pukul {data.deathTime}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Tempat</span><span>:</span><span>{data.deathPlace}</span></div>
          </div>

          <p className="mb-4 font-bold underline italic break-inside-avoid">Telah meninggal dunia seorang:</p>

          <div className="ml-8 mb-6 space-y-1 font-sans text-[10.5pt] border-l-4 border-slate-100 pl-6 break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.deceasedName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.deceasedNik}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Jenis Kelamin</span><span>:</span><span>{data.deceasedGender}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Umur</span><span>:</span><span>{data.deceasedAge} Tahun</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Terakhir</span><span>:</span><span>{data.deceasedAddress}</span></div>
          </div>

          <p className="mb-6 break-inside-avoid">Berdasarkan keterangan yang ada, yang bersangkutan meninggal dunia disebabkan oleh <b>{data.deathReason}</b>.</p>

          <p className="break-inside-avoid">Demikian Surat Keterangan Kematian ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td className="w-1/2"></td>
                <td className="text-center font-bold text-[10.5pt] pb-10">
                  {data.city}, {formatDateSafe(data.date)}
                </td>
              </tr>
              <tr>
                <td className="w-1/2"></td>
                <td className="text-center">
                  <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase font-sans">{data.issuerJob},</p>
                  <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.issuerName}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* GLOBAL CSS PRINT - FIXED TypeScript 2322 */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white; 
          }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Building2 size={16} className="text-blue-500" /> <span>Death Notice Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Kelurahan {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format RS {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Instansi</h3>
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <X size={16} className="text-slate-300" />}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    <textarea className="flex-1 p-2 border rounded text-[10px] h-20 resize-none font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="No. Surat" />
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Almarhum</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.deceasedName} onChange={e => handleDataChange('deceasedName', e.target.value)} placeholder="Nama Almarhum" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.deceasedNik} onChange={e => handleDataChange('deceasedNik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.deceasedAge} onChange={e => handleDataChange('deceasedAge', e.target.value)} placeholder="Umur" />
                 </div>
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.deceasedAddress} onChange={e => handleDataChange('deceasedAddress', e.target.value)} placeholder="Alamat Terakhir" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Clock size={12}/> Detail</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.deathDate} onChange={e => handleDataChange('deathDate', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" value={data.deathTime} onChange={e => handleDataChange('deathTime', e.target.value)} placeholder="Pukul (WIB/WITA)" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.deathPlace} onChange={e => handleDataChange('deathPlace', e.target.value)} placeholder="Lokasi Kejadian" />
                 <input className="w-full p-2 border rounded text-xs" value={data.deathReason} onChange={e => handleDataChange('deathReason', e.target.value)} placeholder="Sebab Meninggal" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} placeholder="Nama Penandatangan" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}