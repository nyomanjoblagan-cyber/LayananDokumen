'use client';

/**
 * FILE: SuratHibahPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan / Pernyataan Hibah
 * FEATURES:
 * - Dual Template (Formal Legal vs Simple Statement)
 * - Auto Date Format
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Gift, Building2, UserCircle2, 
  MapPin, LayoutTemplate, ChevronDown, X, PenTool, ShieldCheck, PlusCircle, Trash2, Edit3, Eye, Briefcase, Check, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface HibahData {
  city: string;
  date: string;
  docNo: string;
  
  // Pemberi Hibah
  grantorName: string;
  grantorNik: string;
  grantorAge: string;
  grantorAddress: string;

  // Penerima Hibah
  granteeName: string;
  granteeNik: string;
  granteeAge: string;
  granteeAddress: string;

  // Objek Hibah
  objectType: string;
  objectDetail: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: HibahData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  docNo: 'HB-001/SK/2026',
  
  grantorName: 'SUPARMAN HADI',
  grantorNik: '3201010101010001',
  grantorAge: '62',
  grantorAddress: 'Jl. Melati No. 12, Kel. Menteng, Jakarta Pusat',

  granteeName: 'ANDRE KURNIAWAN',
  granteeNik: '3201010101010005',
  granteeAge: '30',
  granteeAddress: 'Jl. Kebon Sirih No. 5, Jakarta Pusat',

  objectType: 'Sebidang Tanah dan Bangunan',
  objectDetail: 'Sertifikat Hak Milik (SHM) No. 1234 dengan luas tanah 250 m2, terletak di Blok B No. 15, Kelurahan Rawamangun, Jakarta Timur.',
  
  witness1: 'H. RAMLI',
  witness2: 'SURYADI, S.H.'
};

// --- 3. KOMPONEN UTAMA ---
export default function SuratHibahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Hibah...</div>}>
      <GrantLetterBuilder />
    </Suspense>
  );
}

function GrantLetterBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [data, setData] = useState<HibahData>(INITIAL_DATA);
  const [isClient, setIsClient] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof HibahData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal (Akta)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Sederhana
        </button>
    </div>
  );

  // --- KOMPONEN ISI SURAT ---
  const HibahContent = () => {
    if (templateId === 1) {
      // --- TEMPLATE 1: FORMAL (AKTA) ---
      return (
        <div className="font-serif text-[11pt] leading-relaxed text-justify text-black">
           
           {/* JUDUL */}
           <div className="text-center mb-10 shrink-0">
              <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT KETERANGAN HIBAH</h2>
              <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
           </div>

           {/* ISI SURAT */}
           <div className="space-y-6 flex-grow text-[11pt] font-serif leading-relaxed text-justify overflow-hidden">
              <p>Pada hari ini, tanggal <strong>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</strong>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>
              
              <div className="space-y-3">
                 <div className="flex gap-4 break-inside-avoid">
                    <span className="w-4 font-bold">1.</span>
                    <div className="flex-grow italic border-l-2 border-slate-100 pl-4">
                       <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.grantorName}</span></div>
                       <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.grantorNik}</span></div>
                       <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.grantorAddress}</span></div>
                       <p className="mt-1">Selanjutnya disebut sebagai <b>PIHAK PERTAMA (PEMBERI HIBAH)</b>.</p>
                    </div>
                 </div>

                 <div className="flex gap-4 break-inside-avoid">
                    <span className="w-4 font-bold">2.</span>
                    <div className="flex-grow italic border-l-2 border-slate-100 pl-4">
                       <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.granteeName}</span></div>
                       <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.granteeNik}</span></div>
                       <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.granteeAddress}</span></div>
                       <p className="mt-1">Selanjutnya disebut sebagai <b>PIHAK KEDUA (PENERIMA HIBAH)</b>.</p>
                    </div>
                 </div>
              </div>

              <p>Dengan ini PIHAK PERTAMA menyatakan menghibahkan secara sukarela kepada PIHAK KEDUA, berupa objek hibah sebagai berikut:</p>
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] break-inside-avoid">
                 <p className="font-bold underline mb-1">{data.objectType}</p>
                 <p className="leading-relaxed">{data.objectDetail}</p>
              </div>

              <p>Semenjak surat ini ditandatangani, maka objek hibah tersebut sepenuhnya menjadi hak milik PIHAK KEDUA. PIHAK PERTAMA menjamin bahwa objek hibah tersebut bebas dari sengketa atau tuntutan pihak lain.</p>
              
              <p>Demikian surat hibah ini dibuat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun.</p>
           </div>

           {/* TANDA TANGAN */}
           <div className="shrink-0 mt-auto pt-10 border-t-2 border-slate-100 break-inside-avoid">
              <div className="grid grid-cols-2 gap-10">
                 {/* PIHAK KEDUA */}
                 <div className="flex flex-col h-44 text-center">
                    <div className="h-6 mb-2"></div> 
                    <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Penerima Hibah (Pihak II),</p>
                    <div className="mt-auto">
                       <p className="font-bold underline uppercase tracking-tight leading-none">{data.granteeName}</p>
                       <p className="text-[9pt] italic mt-2 leading-tight">Penerima</p>
                    </div>
                 </div>

                 {/* PIHAK PERTAMA */}
                 <div className="flex flex-col h-44 text-center">
                    <p className="text-[10pt] font-bold h-6 mb-2">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</p>
                    <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Pemberi Hibah (Pihak I),</p>
                    <div className="mt-auto">
                       <div className="border border-slate-300 w-20 h-10 mx-auto mb-2 flex items-center justify-center text-[7pt] text-slate-400 italic">MATERAI 10.000</div>
                       <p className="font-bold underline uppercase tracking-tight leading-none">{data.grantorName}</p>
                       <p className="text-[9pt] italic mt-2 leading-tight">Pemberi</p>
                    </div>
                 </div>
              </div>

              <div className="mt-12 text-center">
                 <p className="text-[8pt] font-sans font-bold uppercase text-slate-400 mb-8 tracking-widest">Saksi-Saksi:</p>
                 <div className="grid grid-cols-2 gap-10">
                    <p className="font-bold underline">({data.witness1})</p>
                    <p className="font-bold underline">({data.witness2})</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: SEDERHANA ---
      return (
        <div className="font-sans text-[10.5pt] leading-snug text-slate-800">
           <div className="text-center border-b-2 border-slate-900 pb-4 mb-8">
              <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">SURAT PERNYATAAN HIBAH</h1>
              <p className="text-sm font-bold text-slate-500 uppercase mt-1">Nomor: {data.docNo}</p>
           </div>

           <div className="space-y-6">
              <p>Saya yang bertanda tangan di bawah ini:</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <div className="grid grid-cols-[100px_10px_1fr] gap-y-2 text-sm">
                    <span className="font-bold text-slate-500">Nama</span><span>:</span><span className="font-bold uppercase">{data.grantorName}</span>
                    <span className="font-bold text-slate-500">NIK</span><span>:</span><span className="font-mono">{data.grantorNik}</span>
                    <span className="font-bold text-slate-500">Alamat</span><span>:</span><span>{data.grantorAddress}</span>
                 </div>
                 <p className="text-xs text-center mt-3 font-bold text-slate-400 uppercase tracking-widest">Selaku Pemberi Hibah</p>
              </div>

              <p>Dengan ini memberikan hibah kepada:</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <div className="grid grid-cols-[100px_10px_1fr] gap-y-2 text-sm">
                    <span className="font-bold text-slate-500">Nama</span><span>:</span><span className="font-bold uppercase">{data.granteeName}</span>
                    <span className="font-bold text-slate-500">NIK</span><span>:</span><span className="font-mono">{data.granteeNik}</span>
                    <span className="font-bold text-slate-500">Alamat</span><span>:</span><span>{data.granteeAddress}</span>
                 </div>
                 <p className="text-xs text-center mt-3 font-bold text-slate-400 uppercase tracking-widest">Selaku Penerima Hibah</p>
              </div>

              <div>
                 <p className="mb-2 font-bold uppercase text-xs text-slate-500">Objek yang Dihibahkan:</p>
                 <div className="p-4 border border-slate-300 rounded bg-white text-justify italic text-sm">
                    {data.objectDetail} ({data.objectType})
                 </div>
              </div>

              <p className="text-justify text-sm">
                 Demikian surat hibah ini dibuat dengan kesadaran penuh dan tanpa paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.
              </p>
           </div>

           <div className="mt-12 flex justify-between text-center" style={{ pageBreakInside: 'avoid' }}>
              <div className="w-1/3">
                 <p className="mb-16 font-bold text-xs uppercase text-slate-400">Penerima</p>
                 <p className="font-bold underline uppercase border-b-2 border-slate-900 pb-1">{data.granteeName}</p>
              </div>
              <div className="w-1/3">
                 <p className="mb-16 font-bold text-xs uppercase text-slate-400">Pemberi</p>
                 <p className="font-bold underline uppercase border-b-2 border-slate-900 pb-1">{data.grantorName}</p>
              </div>
           </div>
        </div>
      );
    }
  };

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 25mm; display: table-header-group; } 
            .print-table tfoot { height: 25mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Surat Hibah <span className="text-emerald-400">Builder</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Formal (Akta)' : 'Sederhana'}</span><ChevronDown size={14} className="text-slate-500"/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               {/* MOBILE MENU TRIGGER */}
               <div className="relative md:hidden">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 text-xs font-bold bg-slate-800 text-slate-200 px-4 py-2 rounded-full border border-slate-700">
                    Template <ChevronDown size={14}/>
                  </button>
                  {showTemplateMenu && <TemplateMenu />}
               </div>

               <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"><Printer size={18}/> <span className="hidden sm:inline">Cetak</span></button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[420px] lg:w-[480px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Formulir</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. PEMBERI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Gift size={12}/> Pemberi Hibah</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex gap-4 items-center">
                         <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 bg-slate-50 shrink-0 relative overflow-hidden group">
                            {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="text-[8px] text-center text-slate-400 font-bold">LOGO<br/>GARUDA</div>}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[8px] font-bold">UBAH</div>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                         </div>
                         <div className="flex-1 space-y-2">
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.grantorName} onChange={e => handleDataChange('grantorName', e.target.value)} placeholder="Nama Pemberi..." />
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.grantorNik} onChange={e => handleDataChange('grantorNik', e.target.value)} placeholder="NIK Pemberi..." />
                         </div>
                      </div>
                      <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.grantorAddress} onChange={e => handleDataChange('grantorAddress', e.target.value)} placeholder="Alamat Pemberi..." />
                  </div>
               </div>

               {/* 2. PENERIMA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Penerima Hibah</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.granteeName} onChange={e => handleDataChange('granteeName', e.target.value)} placeholder="Nama Penerima..." />
                      <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none" value={data.granteeNik} onChange={e => handleDataChange('granteeNik', e.target.value)} placeholder="NIK Penerima..." />
                      <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.granteeAddress} onChange={e => handleDataChange('granteeAddress', e.target.value)} placeholder="Alamat Penerima..." />
                  </div>
               </div>

               {/* 3. OBJEK HIBAH */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><MapPin size={12}/> Objek Hibah</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.objectType} onChange={e => handleDataChange('objectType', e.target.value)} placeholder="Jenis Objek (cth: Tanah)" />
                      <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.objectDetail} onChange={e => handleDataChange('objectDetail', e.target.value)} placeholder="Detail Objek (Luas, Lokasi, Sertifikat)..." />
                  </div>
               </div>

               {/* 4. LEGALITAS */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldCheck size={12}/> Legalitas & Saksi</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi 2" />
                      </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative" style={{ width: '210mm', minHeight: '297mm', padding: '20mm' }}>
                      <HibahContent />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '25mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><HibahContent /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '25mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
