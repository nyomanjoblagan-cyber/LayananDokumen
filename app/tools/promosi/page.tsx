'use client';

/**
 * FILE: PromosiJabatanPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Rekomendasi Promosi Jabatan
 * FEATURES:
 * - Dual Template (Formal Corporate vs Modern Clean)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, Building2, UserCircle2, 
  Award, LayoutTemplate, ChevronDown, ImagePlus, X, PenTool, 
  CheckCircle2, ShieldCheck, Edit3, Eye, Check, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface PromotionData {
  city: string;
  date: string;
  docNo: string;
  
  // Perusahaan
  companyName: string;
  companyAddress: string;
  
  // Karyawan
  employeeName: string;
  employeeId: string;
  currentPosition: string;
  newPosition: string;
  department: string;
  
  // Penandatangan
  refName: string; // Pemberi Rekomendasi (Atasan)
  refJob: string;
  verifierName: string; // HRD / Mengetahui
  verifierJob: string;
  
  // Isi
  performance: string;
  strengths: string;
  achievement: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PromotionData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  docNo: 'REK-PROM/HRD/2026/005',
  
  companyName: 'PT. INOVASI TEKNOLOGI NEGERI',
  companyAddress: 'Cyber Tower Lt. 10, Kuningan\nJakarta Selatan, 12950\nTelp: (021) 222-3333',
  
  employeeName: 'DIAN SASTRAWIDJAYA',
  employeeId: 'EMP-2023-882',
  currentPosition: 'Senior Graphic Designer',
  newPosition: 'Art Director',
  department: 'Creative & Branding',
  
  refName: 'SETIAWAN BUDI, M.BA.',
  refJob: 'Chief Creative Officer',
  verifierName: 'BAGIAN HRD',
  verifierJob: 'Human Resources Dept.',
  
  performance: 'Sangat Baik (A)',
  strengths: 'Memiliki kemampuan kepemimpinan yang kuat dan visi artistik yang inovatif.',
  achievement: 'Berhasil memimpin proyek rebranding perusahaan dan meningkatkan efisiensi alur kerja tim kreatif sebesar 30%.'
};

// --- 3. KOMPONEN UTAMA ---
export default function PromosiJabatanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <PromotionBuilder />
    </Suspense>
  );
}

function PromotionBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<PromotionData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PromotionData, val: any) => {
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
            Formal Korporat
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Clean
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal Korporat' : 'Modern Clean';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAL KORPORAT */
        <div className="flex flex-col h-full">
            <div className="flex items-start gap-6 border-b-2 border-slate-900 pb-4 mb-6 shrink-0">
                {logo ? (
                  <img src={logo} alt="Logo" className="w-16 h-16 object-contain shrink-0 block print:block" />
                ) : (
                  <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 shrink-0 print:hidden">
                    <Building2 size={28} />
                  </div>
                )}
                <div className="flex-grow text-left">
                   <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">{data.companyName}</h1>
                   <div className="text-[8.5pt] font-sans text-slate-600 whitespace-pre-line leading-tight italic print:text-black">
                      {data.companyAddress}
                   </div>
                </div>
            </div>

            <div className="text-center mb-8 shrink-0 leading-tight">
                <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT REKOMENDASI PROMOSI</h2>
                <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.docNo}</p>
            </div>

            <div className="space-y-6 flex-grow overflow-hidden text-left">
                <p>Saya yang bertanda tangan di bawah ini:</p>
                <div className="ml-8 space-y-1 text-sm font-sans italic border-l-2 border-slate-200 pl-4 print:border-slate-400">
                   <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold">{data.refName}</span></div>
                   <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.refJob}</span></div>
                </div>

                <p>Memberikan rekomendasi promosi jabatan kepada karyawan:</p>
                <div className="ml-8 space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-sm print:bg-transparent print:border-black">
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-bold uppercase">{data.employeeName}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>ID Karyawan</span><span>:</span><span>{data.employeeId}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan Saat Ini</span><span>:</span><span>{data.currentPosition}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr]"><span>Departemen</span><span>:</span><span>{data.department}</span></div>
                   <div className="grid grid-cols-[160px_10px_1fr] pt-2 mt-2 border-t border-slate-200 print:border-black"><span>Direkomendasikan Sebagai</span><span>:</span><span className="font-black text-blue-700 underline print:text-black">{data.newPosition}</span></div>
                </div>

                <p className="text-justify leading-relaxed">
                  Berdasarkan hasil evaluasi kinerja tahunan, yang bersangkutan telah menunjukkan performa dengan predikat <b>{data.performance}</b>. 
                  {data.strengths} Kontribusi utama yang telah diberikan antara lain: <i>"{data.achievement}"</i>.
                </p>
                <p>Demikian surat rekomendasi ini dibuat untuk dapat dipergunakan sebagaimana mestinya dalam proses penilaian promosi.</p>
            </div>

            <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
                 <div className="grid grid-cols-2 gap-10 text-center">
                    <div className="flex flex-col h-32">
                       <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black">Diverifikasi,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase text-[10pt]">{data.verifierName}</p>
                          <p className="text-[8pt] italic">{data.verifierJob}</p>
                       </div>
                    </div>
                    <div className="flex flex-col h-32">
                       <p className="text-[9pt] font-bold mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
                       <p className="uppercase text-[8.5pt] font-black text-slate-400 print:text-black">Hormat Saya,</p>
                       <div className="mt-auto">
                          <p className="font-bold underline uppercase text-[10pt]">{data.refName}</p>
                          <p className="text-[8pt] italic">{data.refJob}</p>
                       </div>
                    </div>
                 </div>
            </div>
        </div>
      ) : (
        /* TEMPLATE 2: MODERN CLEAN */
        <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-12 border-l-4 border-emerald-600 pl-6 py-2 shrink-0">
               <div>
                  <h1 className="text-2xl font-black uppercase tracking-tighter leading-none text-slate-900">{data.companyName}</h1>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 print:text-black">Internal Memo: Promotion Recommendation</p>
               </div>
               <div className="text-right text-xs">
                  <p className="font-mono">Ref: {data.docNo}</p>
                  <p>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : '...'}</p>
               </div>
            </div>

            <div className="flex-grow space-y-8 text-justify">
