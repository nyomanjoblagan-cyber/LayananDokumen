'use client';

/**
 * FILE: PermohonanDonasiPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Permohonan Donasi / Sponsorship
 * FEATURES:
 * - Dual Template (Yayasan/Sosial vs Event Sponsor)
 * - QR Code Placeholder in Sponsor Template
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Heart, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, HandHelping, Coins, MessageSquareQuote,
  LayoutTemplate, ChevronDown, Check, ArrowLeftCircle, Edit3, Eye, QrCode, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface DonationData {
  city: string;
  date: string;
  docNo: string;
  
  // Penyelenggara
  orgName: string;
  orgAddress: string;
  contactPerson: string;

  // Detail Kegiatan
  activityName: string;
  targetAudience: string;
  executionDate: string;

  // Penerima Surat
  targetName: string;
  targetLocation: string;

  // Detail Donasi
  totalNeed: string;
  bankInfo: string;
  closingWord: string;

  // Otoritas
  chairmanName: string;
  treasurerName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DonationData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: '012/PAN-SOSIAL/I/2026',
  
  orgName: 'YAYASAN BAKTI SOSIAL BALI',
  orgAddress: 'Jl. Raya Puputan No. 22, Renon, Denpasar',
  contactPerson: 'BAGUS RAMADHAN (0812-3456-7890)',

  activityName: 'PROGRAM SEMBAKO UNTUK LANSIA & YATIM PIATU',
  targetAudience: '100 Kepala Keluarga di wilayah Denpasar Timur',
  executionDate: '25 Januari 2026',

  targetName: 'Bapak/Ibu Donatur / Pimpinan Perusahaan',
  targetLocation: 'Di Tempat',

  totalNeed: 'Rp 25.000.000,-',
  bankInfo: 'Bank BCA No. Rek: 123-456-7890 a.n Yayasan Bakti Sosial',
  closingWord: 'Setiap kontribusi Anda, sekecil apapun, akan memberikan senyum dan harapan baru bagi mereka yang membutuhkan.',

  chairmanName: 'BAGUS RAMADHAN',
  treasurerName: 'MADE WIRA KUSUMA'
};

// --- 3. KOMPONEN UTAMA ---
export default function PermohonanDonasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Donasi...</div>}>
      <DonationBuilder />
    </Suspense>
  );
}

function DonationBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<DonationData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof DonationData, val: any) => {
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
            Format Yayasan (Sosial)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Event (Sponsor)
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
      // --- TEMPLATE 1: YAYASAN (Formal Emosional) ---
      return (
        <div className="font-serif text-[10.5pt] text-black leading-snug">
           
           {/* HEADER SURAT */}
           <div className="flex flex-col items-center border-b-4 border-double border-emerald-700 pb-3 mb-6 text-center shrink-0">
              <h1 className="text-[13pt] font-black uppercase leading-tight tracking-tighter text-emerald-800">{data.orgName}</h1>
              <p className="text-[9pt] font-sans mt-1 italic text-slate-600">{data.orgAddress}</p>
           </div>

           {/* JUDUL & NOMOR */}
           <div className="mb-6 text-[10.5pt]">
              <div className="flex justify-between mb-3 items-start">
                 <div>
                    <p>Nomor : {data.docNo}</p>
                    <p>Hal : <b>Permohonan Donasi & Bantuan Sosial</b></p>
                 </div>
                 <p className="text-right">{data.city}, {formatDate(data.date)}</p>
              </div>
              <div className="mt-4 leading-snug">
                 <p>Yth. <b>{data.targetName}</b></p>
                 <p>{data.targetLocation}</p>
              </div>
           </div>

           {/* ISI SURAT */}
           <div className="text-[10.5pt] leading-snug text-justify space-y-3 flex-grow px-1">
              <p>Dengan hormat,</p>
              <p>Sehubungan dengan rencana pelaksanaan kegiatan <b>{data.activityName}</b> yang akan dilaksanakan pada tanggal {data.executionDate}, kami bermaksud memohon dukungan Bapak/Ibu.</p>
              
              <p>Kegiatan ini bertujuan untuk membantu <b>{data.targetAudience}</b> yang saat ini sangat membutuhkan uluran tangan kita bersama. Adapun estimasi total dana yang dibutuhkan adalah sebesar <b>{data.totalNeed}</b>.</p>

              <div className="bg-emerald-50 p-4 rounded-xl border-2 border-dashed border-emerald-200 font-sans text-[10pt] italic text-center text-emerald-900 leading-relaxed shadow-inner my-4">
                 <MessageSquareQuote size={18} className="mx-auto mb-1 opacity-30" />
                 "{data.closingWord}"
              </div>

              <p>Bagi Bapak/Ibu yang berkenan memberikan donasi, bantuan dapat disalurkan melalui:</p>
              <div className="p-3 border-l-4 border-emerald-600 bg-slate-50 font-mono text-[10pt] tracking-tight">
                 {data.bankInfo}
              </div>

              <p>Demikian permohonan ini kami sampaikan. Atas keikhlasan dan partisipasi Bapak/Ibu, kami ucapkan terima kasih yang sebesar-besarnya. Semoga Tuhan Yang Maha Esa membalas kebaikan Anda.</p>
           </div>

           {/* TANDA TANGAN */}
           <div className="mt-8 pt-4 border-t border-slate-100" style={{ pageBreakInside: 'avoid' }}>
              <table className="w-full table-fixed text-[10.5pt]">
                 <tbody>
                    <tr>
                       <td className="text-center pb-16 align-top">
                          <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-1">Ketua Panitia,</p>
                       </td>
                       <td className="text-center pb-16 align-top">
                          <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-1">Bendahara,</p>
                       </td>
                    </tr>
                    <tr>
                       <td className="text-center">
                          <p className="font-bold underline uppercase">{data.chairmanName}</p>
                       </td>
                       <td className="text-center">
                          <p className="font-bold underline uppercase">{data.treasurerName}</p>
                       </td>
                    </tr>
                 </tbody>
              </table>
              <div className="mt-6 text-[8pt] text-slate-400 text-center font-sans italic border-t pt-2">
                 Konfirmasi & Dokumentasi: {data.contactPerson}
              </div>
           </div>
        </div>
      );
    } else {
      // --- TEMPLATE 2: EVENT SPONSORSHIP (Modern) ---
      return (
        <div className="font-sans text-[10.5pt] text-slate-800 leading-snug">
           
           {/* HEADER MODERN */}
           <div className="flex justify-between items-end border-b-2 border-slate-900 pb-3 mb-6">
              <div>
                 <h1 className="text-xl font-black uppercase tracking-tight text-slate-900 leading-none">{data.orgName}</h1>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Organizing Committee</p>
              </div>
              <div className="text-right text-[10px]">
                 <p>{data.city}, {formatDate(data.date)}</p>
                 <p className="font-mono">{data.docNo}</p>
              </div>
           </div>

           <div className="mb-6">
              <p className="font-bold text-slate-400 text-[9pt] uppercase tracking-widest mb-1">Kepada Yth,</p>
              <p className="font-bold text-base">{data.targetName}</p>
              <p className="text-slate-600 text-sm">{data.targetLocation}</p>
           </div>

           <div className="space-y-4 text-justify">
              <p>
                 Kami selaku panitia pelaksana dengan ini mengajukan permohonan <strong>Sponsorship / Bantuan Dana</strong> untuk menyukseskan kegiatan:
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                 <h2 className="text-lg font-black text-blue-900 uppercase mb-2">{data.activityName}</h2>
                 <p className="text-xs text-slate-600 mb-1">Target Peserta: <strong>{data.targetAudience}</strong></p>
                 <p className="text-xs text-slate-600">Pelaksanaan: <strong>{data.executionDate}</strong></p>
              </div>

              <p>
                 Total kebutuhan dana untuk kegiatan ini adalah sebesar <strong>{data.totalNeed}</strong>. Dukungan dari perusahaan/instansi Bapak/Ibu akan sangat berarti bagi kelancaran acara ini dan akan kami apresiasi dalam bentuk publikasi logo pada media promosi acara.
              </p>

              <div className="flex items-center gap-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                 <div className="bg-white p-2 rounded shadow-sm hidden sm:block">
                    <QrCode size={32} className="text-slate-800"/>
                 </div>
                 <div className="flex-1">
                    <p className="text-[9px] font-bold text-blue-800 uppercase tracking-widest mb-1">Saluran Donasi Resmi</p>
                    <p className="font-mono text-xs font-bold text-slate-900">{data.bankInfo}</p>
                 </div>
              </div>

              <p>
                 Besar harapan kami agar Bapak/Ibu dapat berpartisipasi. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.
              </p>
           </div>

           <div className="mt-8 flex justify-end" style={{ pageBreakInside: 'avoid' }}>
              <div className="text-center w-60">
                 <p className="mb-16 font-bold text-[10px] uppercase tracking-widest text-slate-400">Ketua Pelaksana</p>
                 <p className="font-black text-slate-900 border-b-2 border-slate-900 inline-block uppercase text-sm">{data.chairmanName}</p>
                 <p className="text-[9px] mt-1 text-slate-500">Contact: {data.contactPerson}</p>
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
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Surat Donasi <span className="text-emerald-400">Generator</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               {/* DESKTOP MENU */}
               <div className="hidden md:flex relative">
                  <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-3 border border-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all bg-slate-900/50 text-slate-300">
                    <LayoutTemplate size={18} className="text-emerald-500"/><span>{templateId === 1 ? 'Format Yayasan' : 'Format Sponsor'}</span><ChevronDown size={14} className="text-slate-500"/>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar">
               {/* 1. PENYELENGGARA */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Building2 size={12}/> Penyelenggara</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Organisasi/Yayasan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.orgName} onChange={e => handleDataChange('orgName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.orgAddress} onChange={e => handleDataChange('orgAddress', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kontak Person</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.contactPerson} onChange={e => handleDataChange('contactPerson', e.target.value)} /></div>
                  </div>
               </div>

               {/* 2. KEGIATAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><HandHelping size={12}/> Detail Kegiatan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Kegiatan</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold uppercase h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.activityName} onChange={e => handleDataChange('activityName', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Target Penerima</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.targetAudience} onChange={e => handleDataChange('targetAudience', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Pelaksanaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.executionDate} onChange={e => handleDataChange('executionDate', e.target.value)} /></div>
                  </div>
               </div>

               {/* 3. KEUANGAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Coins size={12}/> Dana & Rekening</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Kebutuhan Dana</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold text-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.totalNeed} onChange={e => handleDataChange('totalNeed', e.target.value)} /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Info Rekening</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.bankInfo} onChange={e => handleDataChange('bankInfo', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Ketua</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.chairmanName} onChange={e => handleDataChange('chairmanName', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Bendahara</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} /></div>
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
