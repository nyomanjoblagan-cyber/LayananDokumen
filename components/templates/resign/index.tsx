'use client';

/**
 * FILE: ResignPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pengunduran Diri (Resignation Letter)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Building2, Calendar, PenTool, HeartHandshake, Briefcase, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface ResignData {
  city: string;
  signDate: string;
  lastDate: string;
  
  // Karyawan
  empName: string;
  empPosition: string;
  empDept: string;
  
  // Atasan
  managerName: string;
  managerTitle: string;
  
  // Perusahaan
  companyName: string;
  companyAddress: string;
  
  // Isi Surat
  opening: string;
  reason: string;
  handover: string;
  closing: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ResignData = {
  city: 'JAKARTA',
  signDate: '', 
  lastDate: '', 
  
  empName: 'AHMAD FAUZI',
  empPosition: 'Senior Marketing Executive',
  empDept: 'Divisi Pemasaran',
  
  managerName: 'BAPAK BUDI SANTOSO',
  managerTitle: 'HRD Manager',
  
  companyName: 'PT. MAJU MUNDUR SEJAHTERA',
  companyAddress: 'Gedung Cyber, Jl. Rasuna Said, Jakarta',
  
  opening: 'Melalui surat ini, saya bermaksud untuk menyampaikan permohonan pengunduran diri saya dari jabatan Senior Marketing Executive di PT. Maju Mundur SEJAHTERA.',
  reason: 'Keputusan ini saya ambil setelah pertimbangan matang untuk melanjutkan pengembangan karir saya di tempat yang baru. Saya ingin mengucapkan terima kasih yang sebesar-besarnya atas kesempatan dan kepercayaan yang telah diberikan selama saya bekerja di sini.',
  handover: 'Saya akan tetap melaksanakan tugas dan tanggung jawab saya hingga hari terakhir bekerja. Saya juga berkomitmen untuk membantu proses transisi dan serah terima pekerjaan kepada rekan yang menggantikan agar operasional tetap berjalan lancar.',
  closing: 'Saya memohon maaf jika ada kesalahan yang pernah saya perbuat selama bekerja. Semoga PT. Maju Mundur SEJAHTERA semakin sukses dan berkembang di masa depan.'
};

export default function ResignPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Surat...</div>}>
      <ResignToolBuilder />
    </Suspense>
  );
}

function ResignToolBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ResignData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const oneMonth = new Date(new Date().setDate(today.getDate() + 30));
    
    setData(prev => ({ 
        ...prev, 
        signDate: today.toISOString().split('T')[0],
        lastDate: oneMonth.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof ResignData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const oneMonth = new Date(new Date().setDate(today.getDate() + 30));
        setData({ 
            ...INITIAL_DATA, 
            signDate: today.toISOString().split('T')[0],
            lastDate: oneMonth.toISOString().split('T')[0]
        });
    }
  };

  const applyReason = (type: 'standard' | 'career' | 'personal') => {
    if (type === 'standard') {
      setData(prev => ({
        ...prev,
        opening: `Melalui surat ini, saya bermaksud menyampaikan pengunduran diri saya sebagai ${prev.empPosition} di ${prev.companyName}.`,
        reason: `Saya mengucapkan terima kasih yang tulus atas kesempatan kerja yang telah diberikan kepada saya selama ini. Saya telah belajar banyak hal dan bangga bisa menjadi bagian dari perusahaan ini.`,
        handover: `Sesuai ketentuan One Month Notice, saya akan tetap bekerja secara profesional hingga tanggal efektif pengunduran diri saya.`
      }));
    } else if (type === 'career') {
      setData(prev => ({
        ...prev,
        opening: `Dengan hormat, bersama surat ini saya mengajukan pengunduran diri dari posisi ${prev.empPosition} di ${prev.companyName}.`,
        reason: `Keputusan berat ini saya ambil karena saya telah menerima penawaran kesempatan karir baru yang sejalan dengan rencana pengembangan profesional saya kedepan. Terima kasih atas bimbingan Bapak/Ibu selama ini yang sangat berharga bagi karir saya.`,
        handover: `Saya berkomitmen penuh untuk menyelesaikan seluruh tanggungan pekerjaan dan membantu proses handover kepada pengganti saya sebelum hari terakhir saya bekerja.`
      }));
    } else if (type === 'personal') {
      setData(prev => ({
        ...prev,
        opening: `Saya yang bertanda tangan di bawah ini, ${prev.empName}, bermaksud mengajukan pengunduran diri dari ${prev.companyName}.`,
        reason: `Adapun alasan pengunduran diri ini dikarenakan adanya urusan pribadi/keluarga yang mengharuskan saya untuk tidak lagi dapat bekerja secara penuh waktu. Saya sangat berterima kasih atas pengertian dan dukungan perusahaan selama ini.`,
        handover: `Saya akan memastikan seluruh tugas saya diserahterimakan dengan baik agar tidak mengganggu kinerja tim yang saya tinggalkan.`
      }));
    }
  };

  const activeTemplateName = templateId === 1 ? 'Formal Standard' : 'Modern Direct';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-relaxed p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* TANGGAL & PERIHAL */}
        <div className="text-right mb-10 shrink-0 font-sans text-[10pt]">
          <p>{data.city}, {formatDateSafe(data.signDate)}</p>
        </div>

        <div className="mb-10 shrink-0 text-left font-sans">
          <p className="font-bold">Perihal: <span className="underline decoration-2 underline-offset-4">Pengunduran Diri</span></p>
          <div className="mt-6 leading-snug">
            <p>Kepada Yth,</p>
            <p className="font-black text-slate-900 uppercase tracking-tight">{data.managerName}</p>
            <p className="font-bold text-slate-500">{data.managerTitle} - {data.companyName}</p>
            <p className="text-xs italic text-slate-400 mt-1">{data.companyAddress}</p>
          </div>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-6 text-justify overflow-hidden leading-relaxed">
          <p>Dengan hormat,</p>
          <p className="whitespace-pre-line">{data.opening}</p>
          
          <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-emerald-500 italic font-medium print:bg-transparent print:border-2 print:border-black break-inside-avoid">
            "Terhitung sejak tanggal <b className="text-emerald-700 print:text-black">{formatDateSafe(data.lastDate)}</b>, saya sudah tidak lagi menjadi bagian dari perusahaan."
          </div>

          <p className="whitespace-pre-line">{data.reason}</p>
          <p className="whitespace-pre-line">{data.handover}</p>
          <p className="whitespace-pre-line">{data.closing}</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 pt-10 border-t-2 border-slate-100 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex justify-end text-center">
            <div className="w-72 font-sans">
              <p className="mb-20 font-black uppercase text-[9px] text-slate-300 tracking-[0.3em] print:text-black">Hormat Saya,</p>
              <p className="font-black underline uppercase text-[11pt] tracking-tighter text-slate-900 leading-none">{data.empName}</p>
              <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-widest">{data.empPosition}</p>
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
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <HeartHandshake size={16} /> <span>Resignation Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Formal Standard {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Modern Direct {templateId === 2 && <Check size={14}/>}</button>
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
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Resign</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Alasan Cepat</h3>
                 <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => applyReason('standard')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm hover:bg-emerald-600 hover:text-white transition-all">STANDARD</button>
                    <button onClick={() => applyReason('career')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm hover:bg-emerald-600 hover:text-white transition-all">CAREER</button>
                    <button onClick={() => applyReason('personal')} className="bg-white p-2 rounded-lg text-[9px] font-black shadow-sm hover:bg-emerald-600 hover:text-white transition-all">PERSONAL</button>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Data Diri</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Jabatan Saat Ini" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Tujuan Surat</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.managerName} onChange={e => handleDataChange('managerName', e.target.value)} placeholder="Nama Manager/HRD" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Nama Perusahaan" />
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Calendar size={12}/> Tanggal Resign</h3>
                 <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400">HARI TERAKHIR BEKERJA</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-red-500 outline-none" value={data.lastDate} onChange={e => handleDataChange('lastDate', e.target.value)} />
                 </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Narasi Surat</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-32 focus:ring-2 focus:ring-slate-500 outline-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Alasan & Ucapan Terima Kasih..." />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 focus:ring-2 focus:ring-slate-500 outline-none leading-relaxed" value={data.handover} onChange={e => handleDataChange('handover', e.target.value)} placeholder="Proses Handover..." />
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
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}