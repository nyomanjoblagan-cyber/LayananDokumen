'use client';

/**
 * FILE: SKTMPage.tsx
 * STATUS: PRODUCTION READY (FIXED IMPORT ERROR)
 * DESC: Generator Surat Keterangan Tidak Mampu (SKTM)
 * FIX: Menambahkan PenTool ke dalam import lucide-react (TS 2304)
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Wallet, 
  User, Users, Baby, LayoutDashboard, ChevronDown, Check, Edit3, Eye, ImagePlus, X,
  Building2, RotateCcw, ArrowLeftCircle, PenTool // <--- FIX: Ditambahkan di sini
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

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
  date: '', 
  
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

export default function SKTMPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Memuat Sistem Desa...</div>}>
      <SKTMBuilder />
    </Suspense>
  );
}

function SKTMBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDonation, setShowDonation] = useState(false);

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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Klasik' : 'Format Kedinasan';

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

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* KOP SURAT */}
        <div className="flex items-center border-b-4 border-double border-slate-900 pb-3 mb-6 shrink-0 text-center relative font-sans">
          {logo ? (
             <img src={logo} alt="Logo" className="w-20 h-20 object-contain absolute left-0 top-0" />
          ) : (
             <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 absolute left-0 top-0 print:hidden">
                <Building2 size={32} />
             </div>
          )}
          <div className="flex-grow px-20">
             <h3 className="text-[11pt] font-bold uppercase leading-tight text-slate-700">{data.govLevel}</h3>
             <h2 className="text-[13pt] font-black uppercase leading-tight text-slate-900">{data.district}</h2>
             <h1 className="text-[18pt] font-black uppercase leading-tight tracking-[0.2em] text-slate-900">{data.village}</h1>
             <p className="text-[8.5pt] mt-1 italic text-slate-500 print:text-black leading-tight">{data.address_office}</p>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-6 shrink-0 leading-tight font-sans">
          <h2 className="text-xl font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SURAT KETERANGAN TIDAK MAMPU</h2>
          <p className="text-[10pt] mt-3 italic font-bold text-slate-400 print:text-black">Nomor: {data.no}</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow space-y-6 overflow-hidden text-justify leading-relaxed">
          <p>Yang bertanda tangan di bawah ini, Kepala <strong>{data.village}</strong> <strong>{data.district}</strong> <strong>{data.govLevel.replace('PEMERINTAH ','')}</strong>, dengan ini menerangkan bahwa:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-8 py-1 break-inside-avoid print:border-slate-300 italic">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold text-slate-900 uppercase tracking-tight">{data.parentName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.parentNik}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.parentTtl}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.parentJob}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.parentAddress}</span></div>
          </div>

          <p>Nama tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut dan berdasarkan database kependudukan kami, keluarga tersebut merupakan keluarga dengan kategori <strong>EKONOMI RENDAH / TIDAK MAMPU</strong> dengan penghasilan rata-rata per bulan <strong>{data.parentIncome}</strong>.</p>

          <div className="space-y-4">
            <p className="font-black underline uppercase text-[9pt] tracking-widest text-slate-400">Data Anggota Keluarga / Anak:</p>
            <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-emerald-100 pl-8 py-1 break-inside-avoid print:border-slate-300 italic">
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Anak</span><span>:</span><span className="font-bold uppercase text-slate-900">{data.childName}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK Anak</span><span>:</span><span className="font-mono">{data.childNik}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.childTtl}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Status Hubungan</span><span>:</span><span>{data.childStatus}</span></div>
            </div>
          </div>

          <p className="leading-relaxed border-t pt-4 border-slate-50 print:border-black">Surat keterangan ini diberikan atas permohonan yang bersangkutan untuk dipergunakan sebagai:<br/><strong className="italic text-blue-700 print:text-black">"{data.purpose}"</strong></p>

          <p>Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8 pt-8 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-end text-center font-sans">
              <div className="w-80 flex flex-col h-44">
                 <p className="text-[10pt] mb-1 font-bold text-slate-400">{data.city}, {formatDateSafe(data.date)}</p>
                 <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">{data.signerTitle},</p>
                 <div className="mt-auto">
                    <p className="font-black underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.signerName}</p>
                    <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">NIP. {data.signerNIP}</p>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <Users size={16} /> <span>SKTM Official Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak SKTM</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Desa</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Wilayah</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.village} onChange={e => handleDataChange('village', e.target.value)} placeholder="Nama Desa" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.district} onChange={e => handleDataChange('district', e.target.value)} placeholder="Kecamatan" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.govLevel} onChange={e => handleDataChange('govLevel', e.target.value)} placeholder="Kabupaten" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Kepala Keluarga</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="NIK Orang Tua" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.parentIncome} onChange={e => handleDataChange('parentIncome', e.target.value)} placeholder="Penghasilan" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Baby size={12}/> Data Anak</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Nama Anak / Yang Bersangkutan" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none font-mono" value={data.childNik} onChange={e => handleDataChange('childNik', e.target.value)} placeholder="NIK Anak" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.childStatus} onChange={e => handleDataChange('childStatus', e.target.value)} placeholder="Status Hubungan" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Otoritas</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-slate-500 outline-none leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Pembuatan SKTM..." />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Pejabat" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerTitle} onChange={e => handleDataChange('signerTitle', e.target.value)} placeholder="Jabatan" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="Nomor Surat" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-bold font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}