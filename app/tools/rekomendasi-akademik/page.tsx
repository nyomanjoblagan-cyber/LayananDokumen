'use client';

/**
 * FILE: RekomendasiDosenPage.tsx
 * STATUS: PRODUCTION READY (FIXED SCOPE & DEPLOY)
 * DESC: Generator Surat Rekomendasi Dosen (Academic Recommendation Letter)
 * FIX: Menjamin ketersediaan TemplateMenu dalam scope dan stabilitas CSS Print
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Award, FileText, Mail, Phone,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RecommendationData {
  city: string;
  date: string;
  docNo: string;
  
  // Dosen
  lecturerName: string;
  lecturerNip: string;
  lecturerPosition: string;
  lecturerEmail: string;
  
  // Kampus
  university: string;
  
  // Mahasiswa
  studentName: string;
  studentId: string;
  studentGpa: string;
  
  // Isi
  purpose: string;
  relationship: string;
  strengths: string;
  closingStatement: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RecommendationData = {
  city: 'DENPASAR',
  date: '', 
  docNo: 'REF/088/UNUD/FT/I/2026',
  
  lecturerName: 'DR. I MADE WIRA, S.T., M.T.',
  lecturerNip: '19800101 200501 1 003',
  lecturerPosition: 'Ketua Program Studi Teknologi Informasi',
  lecturerEmail: 'madewira@unud.ac.id',
  
  university: 'UNIVERSITAS UDAYANA (UNUD)',
  
  studentName: 'BAGUS RAMADHAN',
  studentId: '2208561001',
  studentGpa: '3.85 / 4.00',
  
  purpose: 'Pendaftaran Beasiswa LPDP Tahap I 2026',
  relationship: 'Dosen Pembimbing Akademik dan Dosen Pengampu Mata Kuliah Pemrograman Web.',
  strengths: 'Memiliki kemampuan analisis yang tajam, sangat mahir dalam pengembangan perangkat lunak, serta memiliki etos kerja dan kedisiplinan yang luar biasa tinggi.',
  closingStatement: 'Saya memberikan rekomendasi tertinggi bagi yang bersangkutan tanpa ragu sedikitpun.'
};

export default function RekomendasiDosenPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <RecommendationBuilder />
    </Suspense>
  );
}

function RecommendationBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RecommendationData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof RecommendationData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- FIX: DEFINISI TEMPLATEMENU (Mencegah Error 2552) ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Formal Akademik
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Modern Reference
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal Akademik' : 'Modern Reference';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* HEADER / KOP */}
        <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 text-center shrink-0 font-sans">
          <h2 className="text-[10pt] font-black uppercase tracking-tighter leading-tight opacity-70">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</h2>
          <h1 className="text-[14pt] font-black uppercase leading-tight mt-1 tracking-tight">{data.university}</h1>
          <p className="text-[9pt] font-sans mt-1 italic uppercase tracking-widest text-slate-500 print:text-black">Fakultas Teknik - Program Studi Teknologi Informasi</p>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight font-sans">
          <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT REKOMENDASI AKADEMIK</h2>
          <p className="text-[9pt] font-sans mt-2 italic font-bold text-slate-400 print:text-black">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="space-y-6 flex-grow overflow-hidden text-left leading-relaxed">
          <p>Saya yang bertanda tangan di bawah ini:</p>
          <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold text-slate-900 uppercase">{data.lecturerName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIP / NIDN</span><span>:</span><span className="font-mono">{data.lecturerNip}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan Struktural</span><span>:</span><span>{data.lecturerPosition}</span></div>
          </div>

          <p>Dengan ini memberikan rekomendasi akademik kepada mahasiswa berikut:</p>
          <div className="ml-8 space-y-1 font-sans text-[10pt] border-l-4 border-blue-50 pl-6 py-1 break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Mahasiswa</span><span>:</span><span className="font-bold uppercase text-slate-900">{data.studentName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nomor Induk (NIM)</span><span>:</span><span className="font-mono">{data.studentId}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Indeks Prestasi</span><span>:</span><span className="font-bold">{data.studentGpa}</span></div>
          </div>

          <div className="space-y-4 text-justify">
              <p>
                Saya telah mengenal Saudara/i <strong>{data.studentName.split(' ')[0]}</strong> selama masa studinya di {data.university} dalam kapasitas saya sebagai <strong>{data.relationship}</strong>. Selama periode tersebut, yang bersangkutan telah menunjukkan {data.strengths}
              </p>
              <p>
                Berdasarkan kapabilitas akademik dan integritas karakter yang bersangkutan, saya sangat mendukung dan merekomendasikan mahasiswa ini untuk mengikuti <strong>{data.purpose}</strong>. {data.closingStatement}
              </p>
          </div>
          
          <p>Demikian surat rekomendasi ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10 pt-8 border-t border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
           <div className="flex justify-end text-center font-sans">
              <div className="w-80 flex flex-col h-44">
                 <p className="text-[10pt] mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                 <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-1">Pemberi Rekomendasi,</p>
                 <div className="mt-auto">
                    <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt] text-slate-900">{data.lecturerName}</p>
                    <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">NIP. {data.lecturerNip}</p>
                    <p className="text-[8pt] text-slate-400 lowercase italic mt-0.5">{data.lecturerEmail}</p>
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
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <GraduationCap size={16} /> <span>Academic Referee Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Akademik</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Institusi Dosen</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.university} onChange={e => handleDataChange('university', e.target.value)} placeholder="Nama Universitas" />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.lecturerName} onChange={e => handleDataChange('lecturerName', e.target.value)} placeholder="Nama Dosen & Gelar" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.lecturerNip} onChange={e => handleDataChange('lecturerNip', e.target.value)} placeholder="NIP/NIDN" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.lecturerEmail} onChange={e => handleDataChange('lecturerEmail', e.target.value)} placeholder="Email Resmi" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Data Mahasiswa</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Mahasiswa" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.studentGpa} onChange={e => handleDataChange('studentGpa', e.target.value)} placeholder="IPK" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Award size={12}/> Poin Rekomendasi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.relationship} onChange={e => handleDataChange('relationship', e.target.value)} placeholder="Hubungan Akademik (cth: Dosen Pembimbing)" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.strengths} onChange={e => handleDataChange('strengths', e.target.value)} placeholder="Kelebihan Mahasiswa..." />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Tujuan Rekomendasi (cth: Beasiswa LPDP)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 font-sans space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Administrasi</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
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
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE