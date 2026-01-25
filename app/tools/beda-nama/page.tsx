'use client';

/**
 * FILE: BedaNamaPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pernyataan Beda Nama
 * FEATURES:
 * - Comparison Logic (KTP vs Dokumen Lain)
 * - Strict Legal Wording (Satu Orang Yang Sama)
 * - Mobile Menu Fixed
 * - A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  UserCircle2, FileWarning, CalendarDays, FileText, Landmark, Users,
  ArrowLeftCircle, Edit3, Eye, ShieldAlert, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface BedaNamaData {
  city: string;
  date: string;
  
  // Identitas KTP (Yang Benar)
  nameKtp: string;
  nik: string;
  placeBirth: string;
  dateBirth: string;
  job: string;
  address: string;
  
  // Dokumen Beda (Yang Salah/Beda)
  documentType: string; // Ijazah, KK, Paspor, Akta
  nameOnDoc: string;
  
  // Keperluan
  purpose: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BedaNamaData = {
  city: 'SLEMAN',
  date: '', // Diisi useEffect
  
  nameKtp: 'MUHAMMAD RIZKY RAMADHAN',
  nik: '3404010101950003',
  placeBirth: 'YOGYAKARTA',
  dateBirth: '1995-02-15',
  job: 'Karyawan Swasta',
  address: 'Jl. Magelang KM 5, Mlati, Sleman, Yogyakarta',
  
  documentType: 'Ijazah Sarjana (S1)',
  nameOnDoc: 'M. RIZKY RAMADHAN',
  
  purpose: 'Persyaratan pengurusan administrasi pembuatan Paspor di Kantor Imigrasi Kelas I Yogyakarta.',
  
  witness1: 'Sudarsono (Ketua RT)',
  witness2: 'Dwi Astuti (Ibu Kandung)'
};

// --- 3. KOMPONEN UTAMA ---
export default function BedaNamaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Pernyataan...</div>}>
      <BedaNamaBuilder />
    </Suspense>
  );
}

function BedaNamaBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<BedaNamaData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof BedaNamaData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Materai (Formal)
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
      // === TEMPLATE 1: FORMAL MATERAI ===
      return (
        <div className="font-serif text-[11pt] leading-[1.6] text-black">
           
           <div className="text-center mb-8 pb-2 border-b-2 border-black">
              <h1 className="font-black text-lg uppercase tracking-wider underline underline-offset-4">SURAT PERNYATAAN BEDA NAMA</h1>
           </div>

           <div className="text-justify px-1">
              <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
              
              <div className="ml-4 mb-4">
                 <table className="w-full text-[11pt]">
                    <tbody>
                       <tr><td className="w-36 font-bold align-top">Nama</td><td className="w-3 align-top">:</td><td className="font-bold uppercase align-top">{data.nameKtp}</td></tr>
                       <tr><td className="align-top">NIK</td><td className="align-top">:</td><td className="align-top">{data.nik}</td></tr>
                       <tr><td className="align-top">Tempat/Tgl Lahir</td><td className="align-top">:</td><td className="align-top">{data.placeBirth}, {formatDate(data.dateBirth)}</td></tr>
                       <tr><td className="align-top">Pekerjaan</td><td className="align-top">:</td><td className="align-top">{data.job}</td></tr>
                       <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.address}</td></tr>
                    </tbody>
                 </table>
              </div>

              <p className="mb-4">Dengan ini menyatakan dengan sesungguhnya bahwa:</p>

              <div className="ml-2 mb-6 border-l-4 border-black pl-4 py-1">
                 <div className="mb-4">
                    <p className="mb-1">1. Nama yang tertulis di <strong>KTP / Kartu Keluarga</strong> saya adalah:</p>
                    <div className="font-black text-[12pt] uppercase tracking-wide">"{data.nameKtp}"</div>
                 </div>
                 <div>
                    <p className="mb-1">2. Sedangkan nama yang tertulis di <strong>{data.documentType}</strong> adalah:</p>
                    <div className="font-black text-[12pt] uppercase tracking-wide">"{data.nameOnDoc}"</div>
                 </div>
              </div>

              <p className="mb-4">
                 Bahwa nama <strong>{data.nameKtp}</strong> dan <strong>{data.nameOnDoc}</strong> adalah nama dari <strong>SATU ORANG YANG SAMA</strong> (diri saya sendiri). Perbedaan penulisan tersebut terjadi karena kebiasaan penulisan/kesalahan administrasi dan bukan merupakan unsur kesengajaan untuk memalsukan identitas.
              </p>

              <div className="bg-slate-50 p-3 border border-slate-300 italic text-sm mb-4">
                 Surat pernyataan ini saya buat guna melengkapi persyaratan: <strong>{data.purpose}</strong>.
              </div>

              <p className="indent-12">
                 Demikian surat pernyataan ini saya buat dengan keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak manapun. Apabila dikemudian hari ternyata pernyataan ini tidak benar, saya bersedia dituntut sesuai dengan hukum yang berlaku.
              </p>
           </div>

           {/* TANDA TANGAN */}
           <div className="mt-10" style={{ pageBreakInside: 'avoid' }}>
              <p className="text-right mb-8">{data.city}, {formatDate(data.date)}</p>
              
              <div className="flex justify-between items-end">
                 <div className="text-center w-64">
                    <p className="mb-6 font-bold uppercase text-[10pt] text-slate-500">Saksi-Saksi:</p>
                    <div className="flex flex-col gap-8 text-left pl-4">
                       <div>
                          <div className="border-b border-black w-48 pb-1 text-sm font-bold">1. {data.witness1}</div>
                       </div>
                       <div>
                          <div className="border-b border-black w-48 pb-1 text-sm font-bold">2. {data.witness2}</div>
                       </div>
                    </div>
                 </div>

                 <div className="text-center w-56">
                    <p className="mb-4 font-bold uppercase text-xs">Yang Membuat Pernyataan,</p>
                    <div className="border border-slate-400 w-24 h-14 mx-auto mb-4 flex items-center justify-center text-[8px] text-slate-400 italic bg-slate-50">
                       MATERAI<br/>10.000
                    </div>
                    <p className="font-bold underline uppercase text-sm">{data.nameKtp}</p>
                 </div>
              </div>
           </div>
        </div>
      );
    } else {
      // === TEMPLATE 2: MODERN SIMPLE ===
      return (
        <div className="font-sans text-[11pt] leading-[1.6] text-slate-900">
           
           <div className="border-b-2 border-emerald-500 pb-3 mb-8">
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Pernyataan Kesamaan Identitas</h1>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Identity Clarification Statement</p>
           </div>

           <div className="space-y-6">
              <p>Kepada Yth. Pihak Yang Berkepentingan,</p>
              <p>Saya yang bertanda tangan di bawah ini:</p>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid gap-2 text-sm">
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">Nama Lengkap</span><span>:</span><span className="font-black uppercase">{data.nameKtp}</span>
                 </div>
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">NIK</span><span>:</span><span className="font-mono">{data.nik}</span>
                 </div>
                 <div className="grid grid-cols-[120px_10px_1fr]">
                    <span className="font-bold text-slate-500">Alamat</span><span>:</span><span>{data.address}</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <p className="font-bold text-slate-700 border-l-4 border-emerald-500 pl-3">MENGKLARIFIKASI BAHWA:</p>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white border-2 border-slate-100 p-4 rounded-xl text-center shadow-sm">
                       <p className="text-[10pt] font-bold text-slate-400 uppercase mb-2">Nama di KTP</p>
                       <p className="font-black text-slate-900">{data.nameKtp}</p>
                    </div>
                    <div className="bg-white border-2 border-red-100 p-4 rounded-xl text-center shadow-sm">
                       <p className="text-[10pt] font-bold text-red-400 uppercase mb-2">Nama di {data.documentType}</p>
                       <p className="font-black text-red-600">{data.nameOnDoc}</p>
                    </div>
                 </div>
                 <p className="text-justify font-medium bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-emerald-900">
                    Merupakan <u>SATU ORANG YANG SAMA</u>. Perbedaan penulisan nama tersebut tidak menggugurkan validitas kepemilikan dokumen saya.
                 </p>
              </div>

              <p className="italic text-slate-500 text-sm border-t border-dashed border-slate-300 pt-4">
                 Surat ini dibuat untuk keperluan: <strong>{data.purpose}</strong>
              </p>
           </div>

           <div className="mt-12 flex justify-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-64">
                 <p className="text-xs mb-20 font-bold uppercase tracking-widest">{data.city}, {formatDate(data.date)}</p>
                 <p className="font-black text-sm uppercase border-b-2 border-slate-900 inline-block pb-1">{data.nameKtp}</p>
                 <p className="text-xs text-slate-400 mt-1">Pembuat Pernyataan</p>
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Beda Nama <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Materai' : 'Format Modern'}</span><ChevronDown size={14} className="text-slate-500"/>
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
               {/* 1. IDENTITAS */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Identitas (Sesuai KTP)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nameKtp} onChange={e => handleDataChange('nameKtp', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tgl Lahir</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.job} onChange={e => handleDataChange('job', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* 2. DATA PERBEDAAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldAlert size={12}/> Data Perbedaan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Dokumen Pembanding</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Cth: Ijazah, KK, Akta" value={data.documentType} onChange={e => handleDataChange('documentType', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Salah/Beda (Tertulis di Dokumen)</label><input className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm font-bold text-red-700 bg-red-50 focus:ring-2 focus:ring-red-500 outline-none" value={data.nameOnDoc} onChange={e => handleDataChange('nameOnDoc', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. KEPERLUAN & SAKSI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileText size={12}/> Penutup</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Untuk Keperluan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Saksi 1</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Saksi 2</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Surat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
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

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
