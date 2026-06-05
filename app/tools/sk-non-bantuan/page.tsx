'use client';

/**
 * FILE: NonBantuanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Tidak Menerima Bantuan Sosial (Non-Bansos)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Building2, UserCircle2, 
  FileWarning, LayoutTemplate, X, ShieldCheck, PenTool, Ban,
  ChevronDown, Check, Edit3, Eye, ImagePlus, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface NonBansosData {
  city: string;
  date: string;
  docNo: string;
  
  // Instansi
  issuerOffice: string;
  villageHead: string;
  villageJob: string;
  
  // Warga
  name: string;
  nik: string;
  placeBirth: string;
  dateBirth: string;
  job: string;
  address: string;
  
  // Isi
  statementBody: string;
  purpose: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: NonBansosData = {
  city: 'DENPASAR',
  date: '', 
  docNo: '470/05/I/2026',
  
  issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
  villageHead: 'I NYOMAN GEDE, S.E.',
  villageJob: 'Perbekel Pemecutan Kaja',
  
  name: 'BAGUS RAMADHAN',
  nik: '5171010101990001',
  placeBirth: 'Denpasar',
  dateBirth: '1999-12-25',
  job: 'Buruh Harian Lepas',
  address: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  
  statementBody: 'Nama tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut. Berdasarkan pendataan kami, yang bersangkutan benar-benar BELUM PERNAH/TIDAK SEDANG menerima bantuan sosial apapun dari Pemerintah (PKH, BPNT, BST, maupun bantuan sosial lainnya).',
  purpose: 'Persyaratan pengajuan beasiswa pendidikan.'
};

export default function NonBantuanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Memuat Editor Surat...</div>}>
      <NonBantuanBuilder />
    </Suspense>
  );
}

function NonBantuanBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<NonBansosData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof NonBansosData, val: any) => {
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

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Ringkas';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* KOP SURAT DESA */}
        <div className="flex items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 text-center font-sans">
          <div className="flex items-center gap-6 w-full px-4">
             {logo ? (
                <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
             ) : (
                <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                   <Building2 size={32} />
                </div>
             )}
             <div className="flex-grow text-center">
                <div className="text-[14pt] font-black leading-tight whitespace-pre-line uppercase tracking-tight text-slate-900">
                   {data.issuerOffice}
                </div>
             </div>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight font-sans">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SURAT KETERANGAN TIDAK MENERIMA BANTUAN</h2>
          <p className="text-[10pt] mt-3 italic font-bold text-slate-400 print:text-black">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow space-y-6 overflow-hidden text-justify leading-relaxed">
          <p>Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 break-inside-avoid">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight text-slate-900">{data.name}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.nik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {formatDateSafe(data.dateBirth)}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.job}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.address}</span></div>
          </div>

          <div className="space-y-4">
            <p className="whitespace-pre-line leading-relaxed">
              {data.statementBody}
            </p>

            <p className="leading-relaxed">
              Demikian surat keterangan ini kami buat dengan sebenarnya berdasarkan data yang ada untuk dapat digunakan sebagai <strong>{data.purpose}</strong>.
            </p>
          </div>

          <p>Atas perhatian dan kerja samanya, kami ucapkan terima kasih.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10 pt-10 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="grid grid-cols-2 gap-10 text-center font-sans">
              <div className="flex flex-col h-44">
                  <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Tanda Tangan Warga,</p>
                  <div className="mt-auto">
                     <p className="font-black underline uppercase text-[11pt] tracking-tight text-slate-900">({data.name})</p>
                  </div>
              </div>

              <div className="flex flex-col h-44">
                  <p className="text-[10pt] font-bold text-slate-400 mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                  <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">{data.villageJob},</p>
                  <div className="mt-auto">
                     <p className="font-black underline uppercase text-[11pt] tracking-tight text-slate-900">{data.villageHead}</p>
                  </div>
              </div>
            </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Ban size={16} /> <span>Non-Bansos Letter Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Formal {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Ringkas {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Instansi</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <textarea className="flex-1 p-2 border rounded-lg text-[10px] font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase h-20 leading-tight" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} placeholder="KOP SURAT (Instansi)" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Data Warga</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="Nomor NIK" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Tempat Lahir" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.job} onChange={e => handleDataChange('job', e.target.value)} placeholder="Pekerjaan" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Domisili Lengkap" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileWarning size={12}/> Narasi & Pejabat</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-32 resize-none focus:ring-2 focus:ring-red-500 outline-none leading-relaxed" value={data.statementBody} onChange={e => handleDataChange('statementBody', e.target.value)} placeholder="Isi Pernyataan..." />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-bold" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembuatan Surat" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Pejabat" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.villageJob} onChange={e => handleDataChange('villageJob', e.target.value)} placeholder="Jabatan" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
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