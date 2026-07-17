'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    LayoutTemplate, Gift, UserCircle2, Box, Users, Settings
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

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
  city: 'Jakarta',
  date: '2026-07-20',
  docNo: 'HB-001/SK/2026',
  
  grantorName: 'Suparman Hadi',
  grantorNik: '3201010101010001',
  grantorAge: '62',
  grantorAddress: 'Jl. Melati No. 12, Kel. Menteng, Jakarta Pusat',

  granteeName: 'Andre Kurniawan',
  granteeNik: '3201010101010005',
  granteeAge: '30',
  granteeAddress: 'Jl. Kebon Sirih No. 5, Jakarta Pusat',

  objectType: 'Sebidang Tanah dan Bangunan',
  objectDetail: 'Sertifikat Hak Milik (SHM) No. 1234 dengan luas tanah 250 m2, terletak di Blok B No. 15, Kelurahan Rawamangun, Jakarta Timur.',
  
  witness1: 'H. Ramli',
  witness2: 'Suryadi, S.H.'
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratHibahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Hibah...</div>}>
      <GrantLetterBuilder />
    </Suspense>
  );
}

function GrantLetterBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<HibahData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ 
        ...prev, 
        date: prev.date || today
    }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset form ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formatDateString = (dateString: string) => {
      if(!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Serif)' : 'Modern Premium (Sans)';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[9999]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => {
      return (
        <Kertas templateId={templateId}>
          <div className="text-center mb-10">
             <h1 className="font-bold text-xl uppercase underline tracking-wide">SURAT KETERANGAN HIBAH</h1>
             <p className="mt-1">Nomor: {data.docNo}</p>
          </div>

          <div className="mb-4 text-justify">
             <p>Yang bertanda tangan di bawah ini:</p>
          </div>

          {/* PIHAK PERTAMA (PEMBERI) */}
          <div className="mb-6 ml-4 text-justify">
             <div className="mb-2">
                 <table className="w-full">
                     <tbody>
                         <tr><td className="w-40 py-1 align-top">Nama</td><td className="w-4 align-top">:</td><td className="py-1 font-bold uppercase">{data.grantorName}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Nomor KTP (NIK)</td><td className="w-4 align-top">:</td><td className="py-1">{data.grantorNik}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Umur</td><td className="w-4 align-top">:</td><td className="py-1">{data.grantorAge} Tahun</td></tr>
                         <tr><td className="w-40 py-1 align-top">Alamat</td><td className="w-4 align-top">:</td><td className="py-1">{data.grantorAddress}</td></tr>
                     </tbody>
                 </table>
             </div>
             <p className="mt-2">Selanjutnya dalam surat pernyataan ini disebut sebagai <b>PIHAK PERTAMA (Pemberi Hibah)</b>.</p>
          </div>

          <div className="mb-4 text-justify">
             <p>Dengan ini menyatakan secara sadar, sehat jasmani maupun rohani, dan tanpa adanya paksaan dari pihak mana pun, menghibahkan <b>{data.objectType}</b> kepada:</p>
          </div>

          {/* PIHAK KEDUA (PENERIMA) */}
          <div className="mb-6 ml-4 text-justify">
             <div className="mb-2">
                 <table className="w-full">
                     <tbody>
                         <tr><td className="w-40 py-1 align-top">Nama</td><td className="w-4 align-top">:</td><td className="py-1 font-bold uppercase">{data.granteeName}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Nomor KTP (NIK)</td><td className="w-4 align-top">:</td><td className="py-1">{data.granteeNik}</td></tr>
                         <tr><td className="w-40 py-1 align-top">Umur</td><td className="w-4 align-top">:</td><td className="py-1">{data.granteeAge} Tahun</td></tr>
                         <tr><td className="w-40 py-1 align-top">Alamat</td><td className="w-4 align-top">:</td><td className="py-1">{data.granteeAddress}</td></tr>
                     </tbody>
                 </table>
             </div>
             <p className="mt-2">Selanjutnya dalam surat pernyataan ini disebut sebagai <b>PIHAK KEDUA (Penerima Hibah)</b>.</p>
          </div>

          {/* OBJEK HIBAH */}
          <div className="break-inside-avoid">
              <div className="mb-4 text-justify">
                 <p>Adapun harta benda yang dihibahkan oleh PIHAK PERTAMA kepada PIHAK KEDUA memiliki rincian dan keterangan sebagai berikut:</p>
              </div>
              <div className="mb-6 ml-8 text-justify font-bold bg-slate-50 border border-slate-300 p-4">
                  <p>{data.objectDetail}</p>
              </div>
          </div>

          {/* PERNYATAAN HUKUM */}
          <div className="break-inside-avoid">
              <div className="text-justify mb-8 space-y-2">
                  <p>Maka terhitung sejak ditandatanganinya Surat Hibah ini, segala hak kepemilikan dan kewajiban hukum yang menyertai objek hibah tersebut beralih sepenuhnya menjadi milik <b>PIHAK KEDUA</b>.</p>
                  <p>Surat Pernyataan Hibah ini bersifat final, mutlak, dan tidak dapat ditarik kembali oleh ahli waris atau pihak manapun di kemudian hari.</p>
              </div>
          </div>

          {/* TANDA TANGAN */}
          <div className="mt-12 break-inside-avoid">
              <p className="text-justify mb-8">Demikian Surat Pernyataan Hibah ini dibuat dan ditandatangani di hadapan para saksi agar dapat dipergunakan sebagaimana mestinya.</p>
              
              <div className="flex justify-between text-center mb-16">
                  <div className="w-[45%]">
                      <p className="mb-1">{data.city}, {formatDateString(data.date)}</p>
                      <p className="font-bold mb-24">PIHAK PERTAMA<br/>(Pemberi Hibah)</p>
                      <p className="font-bold underline uppercase">{data.grantorName}</p>
                  </div>
                  <div className="w-[45%]">
                      <p className="mb-1">&nbsp;</p>
                      <p className="font-bold mb-24">PIHAK KEDUA<br/>(Penerima Hibah)</p>
                      <p className="font-bold underline uppercase">{data.granteeName}</p>
                  </div>
              </div>

              <div className="text-center">
                  <p className="font-bold mb-6">SAKSI-SAKSI</p>
                  <div className="flex justify-center gap-16">
                      <div className="w-40 text-center">
                          <div className="h-20"></div>
                          <p className="font-bold underline uppercase">{data.witness1}</p>
                          <p className="text-sm">Saksi 1</p>
                      </div>
                      <div className="w-40 text-center">
                          <div className="h-20"></div>
                          <p className="font-bold underline uppercase">{data.witness2}</p>
                          <p className="text-sm">Saksi 2</p>
                      </div>
                  </div>
              </div>
          </div>
        </Kertas>
      );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Keterangan Hibah</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <Gift size={18} className="text-sky-600" /> Editor Klausul Hibah
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI METADATA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Settings size={14} className="text-slate-600"/> Metadata Surat
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                        <input type="text" name="docNo" value={data.docNo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Surat</label>
                        <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Pengesahan</label>
                    <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                  </div>
                </div>

                {/* 2. PIHAK PERTAMA (PEMBERI HIBAH) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-sky-600"/> Pihak Pertama (Pemberi)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                        <input type="text" name="grantorName" value={data.grantorName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No KTP / NIK</label>
                            <input type="text" name="grantorNik" value={data.grantorNik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Umur (Tahun)</label>
                            <input type="text" name="grantorAge" value={data.grantorAge} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                        <textarea name="grantorAddress" value={data.grantorAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 3. PIHAK KEDUA (PENERIMA HIBAH) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCircle2 size={14} className="text-emerald-600"/> Pihak Kedua (Penerima)
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                        <input type="text" name="granteeName" value={data.granteeName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No KTP / NIK</label>
                            <input type="text" name="granteeNik" value={data.granteeNik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Umur (Tahun)</label>
                            <input type="text" name="granteeAge" value={data.granteeAge} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sesuai KTP</label>
                        <textarea name="granteeAddress" value={data.granteeAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 4. OBJEK HIBAH */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Box size={14} className="text-purple-600"/> Detail Harta / Objek Hibah
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Harta/Objek (Sebutkan Singkat)</label>
                        <input type="text" name="objectType" value={data.objectType} onChange={handleStringChange} className="w-full bg-purple-50 border border-purple-200 rounded-xl p-2.5 text-sm font-bold text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Deskripsi Lengkap / Legalitas Aset</label>
                        <textarea name="objectDetail" value={data.objectDetail} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-24 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                      </div>
                  </div>
                </div>

                {/* 5. SAKSI HUKUM */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Users size={14} className="text-amber-600"/> Saksi (Keluarga / Pejabat)
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi Pertama</label>
                        <input type="text" name="witness1" value={data.witness1} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Saksi Kedua</label>
                        <input type="text" name="witness2" value={data.witness2} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat Keterangan Hibah" price={15000} />
           </div>

        </div>
      </main>
    </div>
  );
}
