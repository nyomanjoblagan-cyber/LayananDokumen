'use client';

/**
 * FILE: UndurDiriPendidikanPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pengunduran Diri Sekolah/Kampus
 * FEATURES:
 * - Dual Template (Formal Academic vs Concise Format)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileWarning, Undo2, MapPin,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
  date: '', // Diisi useEffect
  
  institutionName: 'UNIVERSITAS UDAYANA (UNUD)',
  facultyDept: 'Fakultas Teknik / Teknologi Informasi',
  
  studentName: 'BAGUS RAMADHAN',
  studentId: '2208561001',
  semester: 'Semester IV (Empat)',
  parentName: 'SLAMET MULYONO',
  
  reason: 'Pindah domisili mengikuti orang tua ke luar kota (Jakarta), sehingga tidak memungkinkan untuk melanjutkan studi secara tatap muka di instansi ini.'
};

// --- 3. KOMPONEN UTAMA ---
export default function UndurDiriPendidikanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Formal
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Ringkas
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Formal' : 'Format Ringkas';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* TANGGAL */}
      <div className="text-right mb-10 shrink-0">
        <p>{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
      </div>

      {/* TUJUAN */}
      <div className="mb-10 text-left shrink-0">
        <p>Hal: <b>Permohonan Pengunduran Diri</b></p>
        <div className="mt-4 leading-relaxed">
          Yth. <b>Bapak/Ibu Dekan / Kepala Sekolah</b><br/>
          {data.institutionName}<br/>
          {data.facultyDept}<br/>
          Di Tempat
        </div>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow space-y-6 text-left overflow-hidden">
        <p>Dengan hormat,</p>
        <p>Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.studentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM/NISN</span><span>:</span><span>{data.studentId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Semester/Kelas</span><span>:</span><span>{data.semester}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.facultyDept}</span></div>
        </div>

        <p className="text-justify leading-relaxed">Melalui surat ini, saya bermaksud mengajukan permohonan pengunduran diri sebagai mahasiswa/siswa dari <b>{data.institutionName}</b> dikarenakan:</p>
        
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] italic print:bg-transparent print:border-black leading-relaxed">
            "{data.reason}"
        </div>

        <p className="text-justify leading-relaxed">
          Saya mengucapkan terima kasih yang sebesar-besarnya atas bimbingan dan ilmu yang telah diberikan selama saya menempuh pendidikan di instansi ini. Saya juga memohon maaf atas segala kekurangan selama saya menjadi bagian dari {data.institutionName}.
        </p>

        <p>Demikian permohonan ini saya sampaikan untuk dapat diproses lebih lanjut. Atas perhatiannya, saya ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Mengetahui,</p>
               <p className="uppercase text-[8pt] text-slate-400 print:text-black mb-4 italic">Orang Tua / Wali</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase text-[11pt]">({data.parentName})</p>
               </div>
            </div>

            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Hormat Saya,</p>
               <p className="uppercase text-[8pt] text-slate-400 print:text-black mb-2 italic">Pemohon</p>
               <div className="mt-auto flex flex-col items-center">
                  <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic mb-2 print:border-black print:text-black">MATERAI 10.000</div>
                  <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.studentName}</p>
               </div>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-tighter italic">
               <Undo2 size={16} /> <span>Withdrawal Education Builder</span>
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
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Pengunduran Diri</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.institutionName} onChange={e => handleDataChange('institutionName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.facultyDept} onChange={e => handleDataChange('facultyDept', e.target.value)} placeholder="Fakultas / Prodi" />
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Siswa</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM / NISN" />
                    <input className="w-full p-2 border rounded text-xs" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} placeholder="Semester / Kelas" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 text-left pb-10">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><FileWarning size={12}/> Alasan Berhenti</h3>
                 <textarea className="w-full p-2 border rounded text-xs h-32 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Tuliskan alasan..." />
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
