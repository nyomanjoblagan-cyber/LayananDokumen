'use client';

/**
 * FILE: PengantarNikahPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pengantar Nikah (Model N1)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Heart, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, CalendarDays, Edit3, Eye, Check, ChevronDown, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface MarriageData {
  city: string;
  date: string;
  docNo: string;
  
  // PEMERINTAH DESA
  issuerOffice: string;
  villageHead: string;
  villageJob: string;

  // DATA CALON PENGANTIN
  name: string;
  nik: string;
  gender: string;
  placeBirth: string;
  dateBirth: string;
  religion: string;
  job: string;
  status: string;
  address: string;

  // KETERANGAN
  destination: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MarriageData = {
  city: 'DENPASAR',
  date: '', 
  docNo: '474.2/08/I/2026',
  
  issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
  villageHead: 'I NYOMAN GEDE, S.E.',
  villageJob: 'Perbekel Pemecutan Kaja',

  name: 'BAGUS RAMADHAN',
  nik: '5171010101990001',
  gender: 'Laki-laki',
  placeBirth: 'Denpasar',
  dateBirth: '1999-12-25',
  religion: 'Islam',
  job: 'Karyawan Swasta',
  status: 'Jejaka (Belum Kawin)',
  address: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

  destination: 'Kepala KUA Kecamatan Denpasar Utara'
};

// --- 3. KOMPONEN UTAMA ---
export default function PengantarNikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Pengantar Nikah...</div>}>
      <MarriageNoticeBuilder />
    </Suspense>
  );
}

function MarriageNoticeBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<MarriageData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof MarriageData, val: any) => {
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

  const activeTemplateName = templateId === 1 ? 'Format Standar N1' : 'Format Desa Adat';

  const MarriageContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {/* KOP SURAT */}
        <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
          <div className="flex items-center gap-6 w-full px-4 text-center font-sans">
             {logo ? (
                <img src={logo} alt="Logo" className="w-18 h-18 object-contain shrink-0" />
             ) : (
                <div className="w-18 h-18 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                   <Building2 size={24} />
                </div>
             )}
             <div className="flex-grow">
                <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter italic">
                   {data.issuerOffice}
                </div>
             </div>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-10 shrink-0">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT PENGANTAR NIKAH</h2>
          <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow leading-relaxed text-justify overflow-hidden">
          <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
          
          <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.nik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {formatDateSafe(data.dateBirth)}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Jenis Kelamin</span><span>:</span><span>{data.gender}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Agama</span><span>:</span><span>{data.religion}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.job}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Status</span><span>:</span><span className="font-bold">{data.status}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
          </div>

          <p className="mb-6 break-inside-avoid">
            Orang tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut. Surat pengantar ini diberikan untuk melengkapi persyaratan pernikahan pada <b>{data.destination}</b>.
          </p>

          <p className="break-inside-avoid">Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed font-sans">
            <tbody>
              <tr>
                <td className="w-1/2"></td>
                <td className="text-center font-bold text-[10.5pt] pb-8">
                  {data.city}, {formatDateSafe(data.date)}
                </td>
              </tr>
              <tr>
                <td className="text-center align-top">
                  <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase print:text-black">Tanda Tangan Pemegang,</p>
                  <p className="font-bold underline uppercase text-[10pt] font-serif">({data.name})</p>
                </td>
                <td className="text-center align-top">
                  <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase print:text-black">{data.villageJob},</p>
                  <p className="font-bold underline uppercase text-[10pt] font-serif">{data.villageHead}</p>
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
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
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
               <Heart size={16} className="text-rose-500" /> <span>Marriage Notice Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Standar N1 {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Desa Adat {templateId === 2 && <Check size={14}/>}</button>
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
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <PenTool size={16} className="text-slate-300" />}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    <textarea className="flex-1 p-2 border rounded text-[10px] h-20 resize-none font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Calon Pengantin</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-rose-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.religion} onChange={e => handleDataChange('religion', e.target.value)} placeholder="Agama" />
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Kota Lahir" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.status} onChange={e => handleDataChange('status', e.target.value)} placeholder="Status" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-rose-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><ShieldCheck size={12}/> Otoritas</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-bold" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kades/Lurah" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.destination} onChange={e => handleDataChange('destination', e.target.value)} placeholder="Tujuan (KUA)" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota TTD" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <MarriageContent />
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

      <div id="print-only-root" className="hidden"><div className="bg-white"><MarriageContent /></div></div>
    </div>
  );
}