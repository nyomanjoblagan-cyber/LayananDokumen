'use client';

/**
 * FILE: PromosiJabatanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Rekomendasi Promosi Jabatan
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, TrendingUp, Building2, UserCircle2, 
  Award, LayoutTemplate, ChevronDown, ImagePlus, X, PenTool, 
  CheckCircle2, ShieldCheck, Edit3, Eye, Check, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
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
  const [showDonation, setShowDonation] = useState(false);

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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Formal Korporat' : 'Modern Clean';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {dateStyle: 'long'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {templateId === 1 ? (
          <div className="flex flex-col h-full">
              <div className="flex items-start gap-6 border-b-2 border-slate-900 pb-4 mb-8 shrink-0">
                  {logo ? (
                    <img src={logo} alt="Logo" className="w-16 h-16 object-contain shrink-0" />
                  ) : (
                    <div className="w-16 h-16 bg-slate-50 rounded flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300 shrink-0 print:hidden font-sans">
                      <Building2 size={28} />
                    </div>
                  )}
                  <div className="flex-grow text-center font-sans">
                     <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">{data.companyName}</h1>
                     <div className="text-[8.5pt] text-slate-500 whitespace-pre-line leading-tight italic print:text-black">
                        {data.companyAddress}
                     </div>
                  </div>
              </div>

              <div className="text-center mb-8 shrink-0 leading-tight">
                  <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SURAT REKOMENDASI PROMOSI</h2>
                  <p className="text-[9pt] font-sans mt-3 italic font-bold text-slate-400 print:text-black">Nomor: {data.docNo}</p>
              </div>

              <div className="space-y-6 flex-grow text-justify">
                  <p>Saya yang bertanda tangan di bawah ini:</p>
                  <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 break-inside-avoid">
                      <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold text-slate-900">{data.refName}</span></div>
                      <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.refJob}</span></div>
                  </div>

                  <p>Melalui surat ini memberikan rekomendasi kenaikan jabatan (promosi) kepada karyawan berikut:</p>
                  <div className="ml-8 space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] print:bg-transparent print:border-black break-inside-avoid">
                      <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Karyawan</span><span>:</span><span className="font-bold uppercase tracking-tight text-slate-900">{data.employeeName}</span></div>
                      <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor Induk (ID)</span><span>:</span><span className="font-mono">{data.employeeId}</span></div>
                      <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan Saat Ini</span><span>:</span><span>{data.currentPosition}</span></div>
                      <div className="grid grid-cols-[160px_10px_1fr] pt-2 mt-2 border-t border-slate-200 print:border-black"><span>Posisi Rekomendasi</span><span>:</span><span className="font-black text-blue-700 print:text-black text-[11pt] uppercase">{data.newPosition}</span></div>
                  </div>

                  <p className="leading-relaxed">
                    Berdasarkan evaluasi performa tahunan, yang bersangkutan telah mencapai predikat kinerja <strong>{data.performance}</strong>. {data.strengths} Salah satu pencapaian signifikan yang diraih adalah: <em>"{data.achievement}"</em>.
                  </p>
                  
                  <p>Demikian surat rekomendasi ini dibuat dengan penuh tanggung jawab untuk diproses sesuai dengan kebijakan manajemen perusahaan.</p>
              </div>

              <div className="shrink-0 mt-12 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                   <div className="grid grid-cols-2 gap-10 text-center font-sans">
                      <div className="flex flex-col h-36">
                         <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Mengetahui,</p>
                         <div className="mt-auto">
                            <p className="font-bold underline uppercase tracking-tight text-[10pt]">{data.verifierName}</p>
                            <p className="text-[8pt] font-bold text-slate-500 uppercase">{data.verifierJob}</p>
                         </div>
                      </div>
                      <div className="flex flex-col h-36">
                         <p className="text-[9pt] font-bold text-slate-400 mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                         <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest">Hormat Saya,</p>
                         <div className="mt-auto">
                            <p className="font-bold underline uppercase tracking-tight text-[10pt]">{data.refName}</p>
                            <p className="text-[8pt] font-bold text-blue-600 uppercase">{data.refJob}</p>
                         </div>
                      </div>
                   </div>
              </div>
          </div>
        ) : (
          <div className="flex flex-col h-full font-sans">
              <div className="flex justify-between items-start mb-12 border-l-8 border-emerald-600 pl-8 py-3 shrink-0">
                  <div>
                      <h1 className="text-2xl font-black uppercase tracking-tighter leading-none text-slate-900">{data.companyName}</h1>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">Promotion Advisory</p>
                  </div>
                  <div className="text-right text-[8pt] font-mono text-slate-400">
                      <p>REF: {data.docNo}</p>
                      <p className="mt-1">{formatDateSafe(data.date)}</p>
                  </div>
              </div>

              <div className="flex-grow space-y-10 text-justify leading-relaxed">
                  <h2 className="text-3xl font-black text-slate-900 border-b-2 border-slate-100 pb-4 tracking-tight">Internal Recommendation Memo</h2>
                  
                  <div className="grid grid-cols-2 gap-10 break-inside-avoid">
                    <div className="p-6 bg-slate-900 text-white rounded-[2rem] print:bg-transparent print:text-black print:border-2 print:border-black">
                        <p className="text-[9px] font-black uppercase text-slate-500 mb-3 tracking-widest">Candidate Profile</p>
                        <p className="text-xl font-black uppercase leading-tight mb-1">{data.employeeName}</p>
                        <p className="text-sm font-bold text-emerald-400 print:text-black mb-1">{data.currentPosition}</p>
                        <p className="text-[10px] font-mono opacity-60">ID: {data.employeeId}</p>
                    </div>
                    <div className="p-6 border-2 border-slate-100 rounded-[2rem] print:border-black">
                        <p className="text-[9px] font-black uppercase text-slate-300 mb-3 tracking-widest">Proposed Role</p>
                        <p className="text-2xl font-black text-blue-700 print:text-black leading-tight uppercase tracking-tighter">{data.newPosition}</p>
                        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">{data.department} Dept.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="break-inside-avoid">
                        <h4 className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-3 flex items-center gap-2">
                           <Award size={14} className="text-amber-500" /> Key Strengths & Evaluation
                        </h4>
                        <p className="text-lg text-slate-700 italic font-serif bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-200 print:bg-transparent">
                          "{data.strengths}"
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 break-inside-avoid">
                        <div className="p-4 bg-emerald-50 rounded-xl print:bg-transparent print:border">
                           <p className="text-[9px] font-black uppercase text-emerald-600 mb-1">Overall Rating</p>
                           <p className="font-black text-xl text-emerald-900 print:text-black">{data.performance}</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl print:bg-transparent print:border">
                           <p className="text-[9px] font-black uppercase text-blue-600 mb-1">Core Achievement</p>
                           <p className="text-xs font-bold leading-tight text-blue-900 print:text-black">{data.achievement}</p>
                        </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 font-medium">I strongly recommend this promotion as the candidate has consistently exceeded expectations and demonstrated exceptional leadership readiness.</p>
              </div>

              <div className="mt-16 pt-10 border-t-2 border-slate-100 flex justify-between items-end shrink-0 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
                  <div>
                      <p className="text-[10px] font-black uppercase text-slate-300 mb-16 tracking-widest">HR Approval</p>
                      <p className="font-black uppercase border-b-4 border-slate-900 inline-block pb-1 text-lg leading-none">{data.verifierName}</p>
                  </div>
                  <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-slate-300 mb-16 tracking-widest">Recommending Authority</p>
                      <p className="font-black uppercase border-b-4 border-slate-900 inline-block pb-1 text-lg leading-none">{data.refName}</p>
                      <p className="text-[9px] font-bold text-blue-600 mt-2 uppercase tracking-widest">{data.refJob}</p>
                  </div>
              </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Award size={16} className="text-blue-500" /> <span>Promotion Recommendation Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Formal Corporate {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Modern Clean {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] font-sans">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Promosi</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Nama PT" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Penandatangan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.refName} onChange={e => handleDataChange('refName', e.target.value)} placeholder="Nama Atasan (Pemberi)" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.refJob} onChange={e => handleDataChange('refJob', e.target.value)} placeholder="Jabatan Atasan" />
                 <div className="grid grid-cols-2 gap-3 mt-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.verifierName} onChange={e => handleDataChange('verifierName', e.target.value)} placeholder="Verifikator (HRD)" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.verifierJob} onChange={e => handleDataChange('verifierJob', e.target.value)} placeholder="Jabatan HRD" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Kandidat Karyawan</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.employeeName} onChange={e => handleDataChange('employeeName', e.target.value)} placeholder="Nama Karyawan" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.employeeId} onChange={e => handleDataChange('employeeId', e.target.value)} placeholder="ID Karyawan" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Departemen" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.currentPosition} onChange={e => handleDataChange('currentPosition', e.target.value)} placeholder="Posisi Lama" />
                   <input className="w-full p-2 border rounded-lg text-xs font-black text-blue-600 focus:ring-2 focus:ring-blue-500 outline-none" value={data.newPosition} onChange={e => handleDataChange('newPosition', e.target.value)} placeholder="Posisi Baru" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Award size={12}/> Penilaian</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.performance} onChange={e => handleDataChange('performance', e.target.value)} placeholder="Rating (cth: Sangat Baik)" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Kelebihan kandidat..." />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.achievement} onChange={e => handleDataChange('achievement', e.target.value)} placeholder="Pencapaian spesifik..." />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2">< PenTool size={12}/> Administrasi</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="No. Surat" />
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
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}