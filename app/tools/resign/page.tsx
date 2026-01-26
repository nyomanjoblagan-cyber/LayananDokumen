'use client';

/**
 * FILE: ResignPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pengunduran Diri (Resignation Letter)
 * FEATURES:
 * - Dual Template (Formal Standard vs Modern Direct)
 * - Auto Date Logic (Sign Date & Last Day + 30 Days)
 * - Quick Reason Presets
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Building2, Calendar, PenTool, HeartHandshake, Briefcase, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
  signDate: '', // Diisi useEffect
  lastDate: '', // Diisi useEffect
  
  empName: 'AHMAD FAUZI',
  empPosition: 'Senior Marketing Executive',
  empDept: 'Divisi Pemasaran',
  
  managerName: 'BAPAK BUDI SANTOSO',
  managerTitle: 'HRD Manager',
  
  companyName: 'PT. MAJU MUNDUR SEJAHTERA',
  companyAddress: 'Gedung Cyber, Jl. Rasuna Said, Jakarta',
  
  opening: 'Melalui surat ini, saya bermaksud untuk menyampaikan permohonan pengunduran diri saya dari jabatan Senior Marketing Executive di PT. Maju Mundur Sejahtera.',
  reason: 'Keputusan ini saya ambil setelah pertimbangan matang untuk melanjutkan pengembangan karir saya di tempat yang baru. Saya ingin mengucapkan terima kasih yang sebesar-besarnya atas kesempatan dan kepercayaan yang telah diberikan selama saya bekerja di sini.',
  handover: 'Saya akan tetap melaksanakan tugas dan tanggung jawab saya hingga hari terakhir bekerja. Saya juga berkomitmen untuk membantu proses transisi dan serah terima pekerjaan kepada rekan yang menggantikan agar operasional tetap berjalan lancar.',
  closing: 'Saya memohon maaf jika ada kesalahan yang pernah saya perbuat selama bekerja. Semoga PT. Maju Mundur Sejahtera semakin sukses dan berkembang di masa depan.'
};

// --- 3. KOMPONEN UTAMA ---
export default function ResignPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Surat...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
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

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Formal Standard
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Direct
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal Standard' : 'Modern Direct';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* TANGGAL & PERIHAL */}
      <div className="text-right mb-8 shrink-0">
        <p>{data.city}, {isClient && data.signDate ? new Date(data.signDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</p>
      </div>

      <div className="mb-8 shrink-0 text-left">
        <p>Perihal: <b>Pengunduran Diri</b></p>
        <div className="mt-4 leading-relaxed">
          Kepada Yth,<br/>
          <b>{data.managerName}</b><br/>
          {data.managerTitle} {data.companyName}<br/>
          <span className="text-sm italic text-slate-500 print:text-black">{data.companyAddress}</span>
        </div>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow space-y-5 text-justify overflow-hidden leading-relaxed">
        <p>Dengan hormat,</p>
        <p className="whitespace-pre-line">{data.opening}</p>
        
        <div className="bg-slate-50 p-4 border-l-4 border-slate-300 italic font-medium print:bg-transparent print:border-black">
          "Terhitung sejak tanggal <b>{isClient && data.lastDate ? new Date(data.lastDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : ''}</b>, saya sudah tidak lagi menjadi bagian dari perusahaan."
        </div>

        <p className="whitespace-pre-line">{data.reason}</p>
        <p className="whitespace-pre-line">{data.handover}</p>
        <p className="whitespace-pre-line">{data.closing}</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-end text-center">
          <div className="w-64">
            <p className="mb-20 font-bold uppercase text-[9pt] text-slate-400 print:text-black tracking-widest">Hormat Saya,</p>
            <p className="font-bold underline uppercase text-base tracking-tight leading-none">{data.empName}</p>
            <p className="text-[9pt] text-slate-500 mt-1 uppercase print:text-black">{data.empPosition}</p>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <HeartHandshake size={16} /> <span>Resignation Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pengunduran Diri</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
                 <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Pilih Alasan (Quick Fill)</h3>
                 <div className="grid grid-cols-3 gap-2">
                    <button onClick={() => applyReason('standard')} className="bg-white p-2 rounded border border-emerald-200 text-[8px] font-bold hover:bg-emerald-100">STANDAR</button>
                    <button onClick={() => applyReason('career')} className="bg-white p-2 rounded border border-blue-200 text-[8px] font-bold hover:bg-blue-100">KARIR</button>
                    <button onClick={() => applyReason('personal')} className="bg-white p-2 rounded border border-amber-200 text-[8px] font-bold hover:bg-amber-100">PRIBADI</button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Identitas Anda</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.empPosition} onChange={e => handleDataChange('empPosition', e.target.value)} placeholder="Jabatan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Calendar size={12}/> Tanggal Efektif</h3>
                 <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400">HARI TERAKHIR KERJA</label>
                    <input type="date" className="w-full p-2 border rounded text-xs font-black" value={data.lastDate} onChange={e => handleDataChange('lastDate', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><PenTool size={12}/> Isi Konten</h3>
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Alasan Resign" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} placeholder="Penutup" />
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
