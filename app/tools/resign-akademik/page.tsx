'use client';

/**
 * FILE: UndurDiriPendidikanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pengunduran Diri Sekolah/Kampus
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileWarning, Undo2, MapPin,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface WithdrawalData {
  city: string;
  date: string;
  
  // Instansi
  institutionName: string;
  facultyDept: string;
  
  // Siswa/Mahasiswa
  studentName: string;
  studentId: string;
  semester: string;
  parentName: string;
  
  // Isi
  reason: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: WithdrawalData = {
  city: 'DENPASAR',
  date: '', 
  
  institutionName: 'UNIVERSITAS UDAYANA (UNUD)',
  facultyDept: 'Fakultas Teknik / Teknologi Informasi',
  
  studentName: 'BAGUS RAMADHAN',
  studentId: '2208561001',
  semester: 'Semester IV (Empat)',
  parentName: 'SLAMET MULYONO',
  
  reason: 'Pindah domisili mengikuti orang tua ke luar kota (Jakarta), sehingga tidak memungkinkan untuk melanjutkan studi secara tatap muka di instansi ini.'
};

export default function UndurDiriPendidikanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor...</div>}>
      <WithdrawalBuilder />
    </Suspense>
  );
}

function WithdrawalBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<WithdrawalData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof WithdrawalData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Formal (Akademik)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Ringkas (To the Point)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Ringkas';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* TANGGAL */}
        <div className="text-right mb-10 shrink-0 font-sans">
          <p>{data.city}, {formatDateSafe(data.date)}</p>
        </div>

        {/* TUJUAN */}
        <div className="mb-10 text-left shrink-0 font-sans">
          <p className="font-bold">Hal: <span className="underline decoration-2 underline-offset-4">Permohonan Pengunduran Diri</span></p>
          <div className="mt-6 leading-snug">
            <p>Yth. <strong>Bapak/Ibu Dekan / Kepala Sekolah</strong></p>
            <p className="font-black text-slate-900 uppercase tracking-tight">{data.institutionName}</p>
            <p className="text-slate-500">{data.facultyDept}</p>
            <p className="italic text-slate-400 mt-1">Di Tempat</p>
          </div>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow space-y-6 text-justify overflow-hidden leading-relaxed">
          <p>Dengan hormat,</p>
          <p>Saya yang bertanda tangan di bawah ini:</p>
          
          <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-emerald-500 pl-6 italic py-1 break-inside-avoid">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold text-slate-900 uppercase tracking-tight">{data.studentName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM / NISN</span><span>:</span><span className="font-mono">{data.studentId}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Semester / Kelas</span><span>:</span><span>{data.semester}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.facultyDept}</span></div>
          </div>

          <p className="text-justify leading-relaxed">Melalui surat ini, saya bermaksud untuk mengajukan permohonan pengunduran diri sebagai mahasiswa/siswa dari <strong>{data.institutionName}</strong>. Adapun alasan pengajuan ini adalah:</p>
          
          <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-900 italic font-medium print:bg-transparent print:border-2 print:border-black break-inside-avoid">
              "{data.reason}"
          </div>

          <p className="text-justify leading-relaxed">
            Saya ingin mengucapkan terima kasih yang sebesar-besarnya atas kesempatan, bimbingan, serta ilmu yang telah diberikan selama saya menempuh pendidikan di instansi ini. Saya juga memohon maaf apabila terdapat tutur kata maupun tindakan yang kurang berkenan selama saya menjadi bagian dari keluarga besar {data.institutionName}.
          </p>

          <p>Demikian permohonan ini saya sampaikan dengan sadar untuk dapat diproses sebagaimana mestinya. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 pt-8 border-t-2 border-slate-100 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="grid grid-cols-2 gap-10 text-center font-sans">
              <div className="flex flex-col h-44">
                  <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Mengetahui,</p>
                  <p className="uppercase text-[7pt] font-bold text-slate-400 mb-4 tracking-tighter">Orang Tua / Wali Murid</p>
                  <div className="mt-auto">
                     <p className="font-black underline uppercase text-[10pt] tracking-tight text-slate-900">{data.parentName}</p>
                  </div>
              </div>

              <div className="flex flex-col h-44">
                  <p className="uppercase text-[8pt] font-black text-slate-300 tracking-widest mb-1">Hormat Saya,</p>
                  <p className="uppercase text-[7pt] font-bold text-slate-400 mb-2 tracking-tighter">Pemohon / Mahasiswa</p>
                  <div className="mt-auto flex flex-col items-center">
                     <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic uppercase mb-2">Materai 10.000</div>
                     <p className="font-black underline uppercase text-[10pt] tracking-tight text-slate-900">{data.studentName}</p>
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
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-tighter italic">
               <Undo2 size={16} /> <span>Withdrawal Education Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Info Instansi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.institutionName} onChange={e => handleDataChange('institutionName', e.target.value)} placeholder="Nama Sekolah / Kampus" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.facultyDept} onChange={e => handleDataChange('facultyDept', e.target.value)} placeholder="Fakultas / Program Studi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Data Siswa/Mahasiswa</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Lengkap" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM / NISN" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} placeholder="Semester / Kelas" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua / Wali" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileWarning size={12}/> Alasan & Administrasi</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-32 resize-none focus:ring-2 focus:ring-red-500 outline-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Alasan Pengunduran Diri..." />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                   <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
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