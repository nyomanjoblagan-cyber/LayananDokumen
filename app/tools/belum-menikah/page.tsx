'use client';

/**
 * FILE: BelumMenikahPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan Belum Menikah
 * FEATURES:
 * - Dynamic Status (Jejaka/Perawan/Janda/Duda)
 * - Kop Surat Otomatis
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, ChevronDown, 
  LayoutTemplate, ShieldCheck, FileText, MapPin, User,
  ArrowLeftCircle, Edit3, Eye, Landmark, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface SingleStatusData {
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  kodePos: string;
  alamatDesa: string;
  noSurat: string;
  
  // Data Warga
  nama: string;
  nik: string;
  tempatLahir: string;
  tglLahir: string;
  kelamin: string;
  pekerjaan: string;
  alamat: string;
  agama: string;
  status: string; // Jejaka/Perawan/Janda/Duda

  // Metadata
  tglSurat: string;
  kepalaDesa: string;
  jabatan: string;
  nip: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SingleStatusData = {
  provinsi: 'JAWA BARAT',
  kabupaten: 'BANDUNG',
  kecamatan: 'CIWIDEY',
  desa: 'LEBAKMUNCANG',
  kodePos: '40973',
  alamatDesa: 'Jl. Raya Ciwidey No. 12',
  noSurat: '470/001/Desa/I/2026',
  
  nama: 'ANDI SETIAWAN',
  nik: '3204123456780001',
  tempatLahir: 'BANDUNG',
  tglLahir: '1998-05-20',
  kelamin: 'Laki-laki',
  pekerjaan: 'Wiraswasta',
  alamat: 'Kp. Baru RT 01 RW 05 Desa Lebakmuncang',
  agama: 'Islam',
  status: 'JEJAKA',

  tglSurat: '', // Diisi useEffect
  kepalaDesa: 'H. MULYANA',
  jabatan: 'Kepala Desa',
  nip: '19700101 199003 1 005'
};

// --- 3. KOMPONEN UTAMA ---
export default function BelumMenikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <BelumMenikahBuilder />
    </Suspense>
  );
}

function BelumMenikahBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<SingleStatusData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        tglSurat: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleDataChange = (field: keyof SingleStatusData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, tglSurat: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Dinas (Resmi)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Modern (Simpel)
        </button>
    </div>
  );

  // --- KONTEN SURAT ---
  const ContentInside = () => {
    const formatDate = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    if (templateId === 1) {
      // --- TEMPLATE 1: DINAS RESMI (Kop Desa) ---
      return (
        <div className="font-serif text-[11pt] text-black leading-relaxed">
           
           {/* KOP SURAT */}
           <div className="flex items-center border-b-[3px] border-double border-black pb-4 mb-6 text-center relative">
              {logo ? <img src={logo} className="w-24 h-24 object-contain absolute left-0 top-0 grayscale" alt="Logo" /> : null}
              <div className="flex-grow px-12">
                 <h3 className="text-[12pt] font-bold uppercase tracking-wide">PEMERINTAH KABUPATEN {data.kabupaten}</h3>
                 <h2 className="text-[14pt] font-black uppercase tracking-wider">KECAMATAN {data.kecamatan}</h2>
                 <h1 className="text-[16pt] font-black uppercase underline tracking-widest">DESA {data.desa}</h1>
                 <p className="text-[9pt] font-sans mt-1 italic">Alamat: {data.alamatDesa} - Kode Pos {data.kodePos}</p>
              </div>
           </div>

           <div className="text-center mb-8">
              <h2 className="text-lg font-bold underline uppercase decoration-2 underline-offset-4">SURAT KETERANGAN BELUM MENIKAH</h2>
              <p className="text-[10pt] font-sans mt-1">Nomor: {data.noSurat}</p>
           </div>

           <div className="text-justify px-1">
              <p className="mb-4 indent-12">
                 Yang bertanda tangan di bawah ini Kepala Desa <strong>{data.desa}</strong>, Kecamatan {data.kecamatan}, Kabupaten {data.kabupaten}, Provinsi {data.provinsi}, dengan ini menerangkan bahwa:
              </p>

              <div className="ml-6 mb-6 font-sans text-[11pt]">
                 <table className="w-full">
                    <tbody>
                       <tr><td className="w-40 py-1 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td className="font-bold uppercase align-top">{data.nama}</td></tr>
                       <tr><td className="py-1 align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.nik}</td></tr>
                       <tr><td className="py-1 align-top">Tempat/Tgl Lahir</td><td className="align-top">:</td><td className="align-top">{data.tempatLahir}, {formatDate(data.tglLahir)}</td></tr>
                       <tr><td className="py-1 align-top">Jenis Kelamin</td><td className="align-top">:</td><td className="align-top">{data.kelamin}</td></tr>
                       <tr><td className="py-1 align-top">Agama</td><td className="align-top">:</td><td className="align-top">{data.agama}</td></tr>
                       <tr><td className="py-1 align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.pekerjaan}</td></tr>
                       <tr><td className="py-1 align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.alamat}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-4 indent-12">
                 Berdasarkan data yang ada pada kami serta sepengetahuan kami, nama tersebut di atas adalah benar-benar penduduk Desa {data.desa} yang berdomisili pada alamat tersebut dan sampai saat dikeluarkan surat keterangan ini yang bersangkutan berstatus:
              </p>

              <div className="text-center bg-slate-50 p-3 border border-slate-300 font-black text-lg uppercase tracking-widest mb-6">
                 {data.status.toUpperCase()} (BELUM MENIKAH)
              </div>

              <p className="mb-8 indent-12">
                 Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya dan bagi yang berkepentingan agar menjadi maklum.
              </p>

              <div className="flex justify-end text-center mt-12" style={{ pageBreakInside: 'avoid' }}>
                 <div className="w-[50%]">
                    <p className="mb-1">{data.desa}, {formatDate(data.tglSurat)}</p>
                    <p className="font-bold uppercase mb-20">{data.jabatan}</p>
                    <p className="font-bold underline uppercase">{data.kepalaDesa}</p>
                    <p>NIP. {data.nip}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: MODERN (Simple) ---
      return (
        <div className="font-sans text-[11pt] text-slate-800 leading-relaxed">
           <div className="border-b-2 border-emerald-600 pb-4 mb-8 flex justify-between items-end">
              <div>
                 <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">SURAT KETERANGAN</h1>
                 <p className="text-emerald-600 font-bold uppercase tracking-widest text-xs">Status Perkawinan</p>
              </div>
              <div className="text-right">
                 <p className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">No: {data.noSurat}</p>
              </div>
           </div>

           <div className="mb-6">
              <p className="mb-4">Pemerintah Desa <strong>{data.desa}</strong> dengan ini menerangkan bahwa:</p>
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-6">
                 <div className="grid grid-cols-[130px_10px_1fr] gap-y-2 text-sm">
                    <span className="font-bold text-slate-500">Nama</span><span>:</span><span className="font-bold uppercase">{data.nama}</span>
                    <span className="font-bold text-slate-500">NIK</span><span>:</span><span className="font-mono">{data.nik}</span>
                    <span className="font-bold text-slate-500">TTL</span><span>:</span><span>{data.tempatLahir}, {formatDate(data.tglLahir)}</span>
                    <span className="font-bold text-slate-500">Alamat</span><span>:</span><span>{data.alamat}</span>
                 </div>
              </div>

              <p className="mb-4 text-justify">
                 Adalah benar warga kami dan berdasarkan catatan kependudukan yang ada, yang bersangkutan saat ini berstatus:
              </p>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center mb-6">
                 <p className="text-sm text-emerald-800 font-medium uppercase">Belum Pernah Kawin</p>
                 <p className="text-xl font-black text-emerald-700 uppercase mt-1">{data.status}</p>
              </div>

              <p>Surat keterangan ini diberikan untuk keperluan administrasi sebagaimana mestinya.</p>
           </div>

           <div className="mt-12 flex justify-end text-center" style={{ pageBreakInside: 'avoid' }}>
              <div>
                 <p className="text-xs mb-20 font-bold uppercase tracking-widest">{data.desa}, {formatDate(data.tglSurat)}</p>
                 <p className="font-black uppercase border-b-2 border-slate-900 inline-block pb-1">{data.kepalaDesa}</p>
                 <p className="text-xs font-bold text-slate-400 mt-1">{data.jabatan}</p>
              </div>
           </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED */}
      <style jsx global>{`
        @media print {
            @page { size: A4 portrait; margin: 0; }
            .no-print { display: none !important; }
            body { background: white; margin: 0; padding: 0; min-width: 210mm; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; min-height: 297mm; z-index: 9999; background: white; font-size: 12pt; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table thead { height: 15mm; display: table-header-group; } 
            .print-table tfoot { height: 15mm; display: table-footer-group; } 
            .print-content-wrapper { padding: 0 20mm; width: 100%; box-sizing: border-box; }
            tr, .keep-together { page-break-inside: avoid !important; break-inside: avoid; }
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Status Menikah <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Dinas' : 'Format Modern'}</span><ChevronDown size={14} className="text-slate-500"/>
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
               
               {/* 1. KOP DESA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><MapPin size={12}/> Identitas Desa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex gap-4 items-center">
                         <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 bg-slate-50 shrink-0 relative overflow-hidden group">
                            {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="text-[8px] text-center text-slate-400 font-bold">LOGO<br/>GARUDA</div>}
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[8px] font-bold">UBAH</div>
                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload}/>
                         </div>
                         <div className="flex-1 space-y-2">
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.kabupaten} onChange={e => handleDataChange('kabupaten', e.target.value)} placeholder="Kabupaten..." />
                            <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.kecamatan} onChange={e => handleDataChange('kecamatan', e.target.value)} placeholder="Kecamatan..." />
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.desa} onChange={e => handleDataChange('desa', e.target.value)} placeholder="Desa..." />
                         <input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.kodePos} onChange={e => handleDataChange('kodePos', e.target.value)} placeholder="Kode Pos..." />
                      </div>
                      <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alamatDesa} onChange={e => handleDataChange('alamatDesa', e.target.value)} placeholder="Alamat Kantor Desa..." />
                  </div>
               </div>

               {/* 2. DATA WARGA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><User size={12}/> Data Pemohon</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nama} onChange={e => handleDataChange('nama', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Status Pernikahan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold text-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.status} onChange={e => handleDataChange('status', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tempatLahir} onChange={e => handleDataChange('tempatLahir', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Lahir</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tglLahir} onChange={e => handleDataChange('tglLahir', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.alamat} onChange={e => handleDataChange('alamat', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. PEJABAT */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Landmark size={12}/> Pejabat Desa</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.noSurat} onChange={e => handleDataChange('noSurat', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Kades</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.kepalaDesa} onChange={e => handleDataChange('kepalaDesa', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIP (Opsional)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nip} onChange={e => handleDataChange('nip', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Surat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.tglSurat} onChange={e => handleDataChange('tglSurat', e.target.value)} /></div>
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
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* --- PRINT PORTAL --- */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><ContentInside /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}
