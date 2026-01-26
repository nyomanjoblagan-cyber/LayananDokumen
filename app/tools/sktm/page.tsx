'use client';

/**
 * FILE: SKTMPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan Tidak Mampu (SKTM)
 * FEATURES:
 * - Dual Template (Classic Village vs Official District)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Wallet, 
  User, Users, Baby, LayoutDashboard, ChevronDown, Check, Edit3, Eye, ImagePlus, X,
  Building2, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface SKTMData {
  govLevel: string;
  district: string;
  village: string;
  address_office: string;
  city: string;
  
  no: string;
  date: string;
  
  // Orang Tua / Kepala Keluarga
  parentName: string;
  parentNik: string;
  parentTtl: string;
  parentJob: string;
  parentAddress: string;
  parentIncome: string;
  
  // Anak / Yang Bersangkutan
  childName: string;
  childNik: string;
  childTtl: string;
  childStatus: string;
  
  // Isi & TTD
  purpose: string;
  signerName: string;
  signerNIP: string;
  signerTitle: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SKTMData = {
  govLevel: 'PEMERINTAH KABUPATEN CIANJUR',
  district: 'KECAMATAN CIPANAS',
  village: 'DESA SINDANGLAYA',
  address_office: 'Jl. Raya Cipanas No. 25, Cianjur',
  city: 'CIANJUR', 
  
  no: '401 / 230 / Kessos / 2026',
  date: '', // Diisi useEffect
  
  parentName: 'UJANG SAEFUDIN',
  parentNik: '3203010101800001',
  parentTtl: 'Cianjur, 01 Januari 1980',
  parentJob: 'Buruh Harian Lepas',
  parentAddress: 'Kp. Pasir Cina RT 02 RW 06, Sindanglaya',
  parentIncome: 'Rp 800.000 (Tidak Menentu)',
  
  childName: 'ASEP SAEFUDIN',
  childNik: '3203010101100005',
  childTtl: 'Cianjur, 15 Mei 2010',
  childStatus: 'Anak Kandung / Pelajar',
  
  purpose: 'Persyaratan Pengajuan Bantuan Kartu Indonesia Pintar (KIP) / Beasiswa Sekolah',
  
  signerName: 'DRS. H. MULYANA',
  signerNIP: '19720505 199903 1 004',
  signerTitle: 'KEPALA DESA SINDANGLAYA'
};

// --- 3. KOMPONEN UTAMA ---
export default function SKTMPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Sistem Desa...</div>}>
      <SKLBuilder />
    </Suspense>
  );
}

function SKLBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<SKTMData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof SKTMData, val: string) => {
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
            Format Klasik
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Kedinasan
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Klasik' : 'Format Kedinasan';

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* KOP SURAT RESMI */}
      <div className="flex items-center border-b-4 border-double border-slate-900 pb-3 mb-6 shrink-0 text-center relative">
        {logo && <img src={logo} alt="Logo" className="w-20 h-20 object-contain absolute left-0 top-0 block print:block" />}
        {!logo && (
           <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 absolute left-0 top-0 print:hidden">
              <Building2 size={32} />
           </div>
        )}
        <div className="flex-grow px-20">
           <h3 className="text-[11pt] font-bold uppercase leading-tight print:text-black">{data.govLevel}</h3>
           <h2 className="text-[13pt] font-black uppercase leading-tight print:text-black">{data.district}</h2>
           <h1 className="text-[16pt] font-black uppercase leading-tight tracking-widest print:text-black">{data.village}</h1>
           <p className="text-[8pt] font-sans mt-1 italic text-slate-600 print:text-black leading-tight">{data.address_office}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-6 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT KETERANGAN TIDAK MAMPU</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.no}</p>
      </div>

      {/* BODY SURAT */}
      <div className="space-y-4 flex-grow overflow-hidden text-left text-[10.5pt]">
        <p className="text-justify leading-relaxed">Yang bertanda tangan di bawah ini, Kepala {data.village} {data.district} {data.govLevel.replace('PEMERINTAH ','')}, menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 space-y-1 font-sans text-[10pt] italic border-l-4 border-slate-100 pl-6 print:border-slate-300">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.parentName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.parentNik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat/Tgl Lahir</span><span>:</span><span>{data.parentTtl}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.parentJob}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.parentAddress}</span></div>
        </div>

        <p className="text-justify leading-relaxed">Nama tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut dan berdasarkan data kami benar-benar keluarga dengan status <b>EKONOMI RENDAH / TIDAK MAMPU</b> dengan penghasilan rata-rata <b>{data.parentIncome}</b>.</p>

        <p className="font-bold underline uppercase text-[9pt]">Data Anggota Keluarga / Anak:</p>
        <div className="ml-8 space-y-1 font-sans text-[10pt] italic border-l-4 border-emerald-100 pl-6 print:border-slate-300">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Anak</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.childName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK Anak</span><span>:</span><span>{data.childNik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat/Tgl Lahir</span><span>:</span><span>{data.childTtl}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Status/Hubungan</span><span>:</span><span>{data.childStatus}</span></div>
        </div>

        <p className="leading-relaxed">Surat keterangan ini dibuat atas permohonan yang bersangkutan untuk keperluan:<br/><b className="italic">"{data.purpose}"</b></p>

        <p>Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="shrink-0 mt-8 pt-6 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="flex justify-end text-center">
            <div className="w-80 flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">{data.signerTitle},</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.signerName}</p>
                  <p className="text-[9pt] font-sans mt-1">NIP. {data.signerNIP}</p>
               </div>
            </div>
         </div>
      </div>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic font-sans">
               <Users size={16} /> <span>SKTM Official Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative font-sans">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data SKTM</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Wilayah Kerja</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                    <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.village} onChange={e => handleDataChange('village', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.govLevel} onChange={e => handleDataChange('govLevel', e.target.value)} placeholder="Kabupaten" />
                 <input className="w-full p-2 border rounded text-xs" value={data.address_office} onChange={e => handleDataChange('address_office', e.target.value)} placeholder="Alamat Kantor" />
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota Penerbit" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Kepala Keluarga</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="NIK" />
                 <input className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.parentIncome} onChange={e => handleDataChange('parentIncome', e.target.value)} placeholder="Penghasilan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Baby size={12}/> Data Anak</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.childStatus} onChange={e => handleDataChange('childStatus', e.target.value)} placeholder="Status Hubungan" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Surat" />
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
