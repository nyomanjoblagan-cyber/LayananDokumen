'use client';

/**
 * FILE: PenelitianPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Permohonan Izin Penelitian (Riset)
 * FEATURES:
 * - Dual Template (University Standard vs Formal Agency)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Search, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, FileSearch, Edit3, Eye, Check, ChevronDown, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface ResearchData {
  city: string;
  date: string;
  docNo: string;
  
  // INSTANSI KAMPUS
  university: string;
  faculty: string;
  department: string;
  campusAddress: string;

  // TUJUAN PENELITIAN
  targetOffice: string;
  targetAddress: string;

  // DATA MAHASISWA
  studentName: string;
  studentId: string;
  semester: string;
  
  // DETAIL PENELITIAN
  researchTitle: string;
  duration: string;
  
  // PENGESAH
  deanName: string;
  deanNip: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ResearchData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: '044/UNUD/FT/I/2026',
  
  university: 'UNIVERSITAS UDAYANA (UNUD)',
  faculty: 'Fakultas Teknik',
  department: 'Program Studi Teknologi Informasi',
  campusAddress: 'Kampus Bukit Jimbaran, Badung, Bali',

  targetOffice: 'Pimpinan PT. Teknologi Indonesia Makmur',
  targetAddress: 'Jl. Gatot Subroto No. 45, Denpasar',

  studentName: 'BAGUS RAMADHAN',
  studentId: '2208561001',
  semester: 'Semester VIII (Delapan)',
  
  researchTitle: 'Analisis Keamanan Jaringan Menggunakan Metode Zero Trust Architecture pada Sistem Distribusi Logistik.',
  duration: '3 (Tiga) Bulan',
  
  deanName: 'PROF. DR. IR. NYOMAN GEDE, M.T.',
  deanNip: '19750101 200003 1 002'
};

// --- 3. KOMPONEN UTAMA ---
export default function PenelitianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Izin Riset...</div>}>
      <ResearchBuilder />
    </Suspense>
  );
}

function ResearchBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [data, setData] = useState<ResearchData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ResearchData, val: any) => {
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
            Format Standar Kampus
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Formal Instansi
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Standar Kampus' : 'Formal Instansi';

  // --- KOMPONEN ISI SURAT ---
  const ResearchContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* TEMPLATE 1: STANDAR KAMPUS */}
      {templateId === 1 && (
        <div className="flex flex-col h-full">
            {/* KOP UNIVERSITAS */}
            <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-3 mb-6 shrink-0 text-center">
                <h2 className="text-[10pt] font-black uppercase leading-tight italic">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</h2>
                <h1 className="text-[13pt] font-black uppercase leading-tight mt-1">{data.university}</h1>
                <h2 className="text-[12pt] font-bold uppercase leading-tight">{data.faculty}</h2>
                <p className="text-[8.5pt] font-sans mt-0.5 italic text-slate-600 print:text-black">{data.campusAddress}</p>
            </div>

            {/* TANGGAL & NOMOR */}
            <div className="flex justify-between mb-6 text-[10.5pt] shrink-0">
                <div className="space-y-0.5">
                    <p>Nomor : {data.docNo}</p>
                    <p>Lampiran : 1 (satu) Berkas Proposal</p>
                    <p>Hal : <b>Permohonan Izin Penelitian</b></p>
                </div>
                <p>{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}</p>
            </div>

            {/* TUJUAN */}
            <div className="mb-6 text-[10.5pt] shrink-0">
                <p>Yth. <b>{data.targetOffice}</b></p>
                <p>{data.targetAddress}</p>
                <p>Di Tempat</p>
            </div>

            {/* ISI SURAT */}
            <div className="flex-grow text-[10.5pt] leading-relaxed text-justify overflow-hidden">
                <p className="mb-3">Dengan hormat,</p>
                <p className="mb-3">Dalam rangka penyelesaian tugas akhir (Skripsi/Tesis), kami bermaksud memohon bantuan Bapak/Ibu untuk memberikan izin penelitian kepada mahasiswa kami:</p>
                
                <div className="ml-8 mb-4 space-y-1 font-sans text-[10pt] border-l-4 border-blue-100 pl-4 py-0.5 print:border-slate-300">
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.studentName}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM</span><span>:</span><span>{data.studentId}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.department}</span></div>
                </div>

                <p className="mb-3">Adapun rencana penelitian tersebut akan dilaksanakan dengan rincian:</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans text-[9.5pt] mb-4 space-y-1.5 print:bg-transparent print:border-black">
                    <p className="leading-snug"><b>Judul Penelitian:</b><br/><span className="italic">"{data.researchTitle}"</span></p>
                    <p><b>Durasi Penelitian:</b> {data.duration}</p>
                </div>

                <p className="mb-4 leading-relaxed">
                Seluruh data yang diperoleh hanya akan digunakan untuk kepentingan akademik dan kerahasiaan data instansi akan dijaga sesuai dengan kode etik penelitian.
                </p>

                <p>Demikian surat permohonan ini kami sampaikan. Atas bantuan dan kerja sama yang diberikan, kami ucapkan terima kasih.</p>
            </div>

            {/* TANDA TANGAN */}
            <div className="mt-auto pt-8 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                <table className="w-full table-fixed">
                <tbody>
                    <tr>
                    <td className="w-1/2"></td>
                    <td className="text-center">
                        <p className="font-bold mb-20 uppercase text-[9.5pt]">Dekan / Ketua Program Studi,</p>
                        <div className="flex flex-col items-center">
                            <p className="font-bold underline uppercase text-[10.5pt] tracking-tight">{data.deanName}</p>
                            <p className="text-[9pt] font-sans mt-0.5">NIP. {data.deanNip}</p>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
      )}

      {/* TEMPLATE 2: FORMAL INSTANSI */}
      {templateId === 2 && (
        <div className="flex flex-col h-full font-sans text-[10.5pt]">
            <div className="border-b-2 border-slate-900 pb-4 mb-8 shrink-0 flex justify-between items-start">
               <div>
                  <h1 className="text-lg font-black uppercase text-slate-900 leading-none">{data.university}</h1>
                  <p className="text-sm text-slate-500">{data.faculty} - {data.department}</p>
               </div>
               <div className="text-right text-sm">
                  <p>Ref: {data.docNo}</p>
                  <p>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID') : '...'}</p>
               </div>
            </div>

            <div className="mb-8 shrink-0">
               <p className="font-bold">Kepada Yth,</p>
               <p className="font-bold uppercase">{data.targetOffice}</p>
               <p>{data.targetAddress}</p>
            </div>

            <div className="flex-grow space-y-4 text-justify">
               <p><strong>Perihal: Permohonan Izin Riset Lapangan</strong></p>
               <p>Dengan hormat,</p>
               <p>
                  Sehubungan dengan kegiatan akademik mahasiswa kami, kami mohon kesediaan Bapak/Ibu untuk memberikan izin pelaksanaan riset/pengambilan data di instansi yang Bapak/Ibu pimpin.
               </p>
               
               <div className="border p-4 mb-4 bg-slate-50 print:bg-transparent">
                  <p className="font-bold mb-2 border-b pb-1">Data Mahasiswa:</p>
                  <div className="grid grid-cols-[100px_10px_1fr] gap-1 text-sm">
                     <span>Nama</span><span>:</span><span className="font-bold uppercase">{data.studentName}</span>
                     <span>NIM</span><span>:</span><span>{data.studentId}</span>
                     <span>Judul Riset</span><span>:</span><span>"{data.researchTitle}"</span>
                  </div>
               </div>

               <p>
                  Kegiatan ini direncanakan berlangsung selama <strong>{data.duration}</strong>. Kami menjamin bahwa data yang diperoleh semata-mata untuk tujuan ilmiah.
               </p>
               <p>Atas perhatian dan izin yang diberikan, kami sampaikan terima kasih.</p>
            </div>

            <div className="mt-12 shrink-0 text-right">
               <p className="mb-20 font-bold">Hormat Kami,</p>
               <p className="font-bold underline uppercase">{data.deanName}</p>
               <p>NIP. {data.deanNip}</p>
            </div>
        </div>
      )}
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <FileSearch size={16} className="text-blue-500" /> <span>Research Permit Builder</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Penelitian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Institusi Kampus</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.university} onChange={e => handleDataChange('university', e.target.value)} placeholder="Nama Universitas" />
                 <input className="w-full p-2 border rounded text-xs" value={data.faculty} onChange={e => handleDataChange('faculty', e.target.value)} placeholder="Fakultas" />
                 <input className="w-full p-2 border rounded text-xs" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Program Studi" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.campusAddress} onChange={e => handleDataChange('campusAddress', e.target.value)} placeholder="Alamat Kampus" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Peneliti</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Mahasiswa" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
                    <input className="w-full p-2 border rounded text-xs" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} placeholder="Semester" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Search size={12}/> Detail Penelitian</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.targetOffice} onChange={e => handleDataChange('targetOffice', e.target.value)} placeholder="Tujuan (Instansi)" />
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed italic" value={data.researchTitle} onChange={e => handleDataChange('researchTitle', e.target.value)} placeholder="Judul Penelitian" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
                    <input className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Durasi" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 font-sans space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 flex items-center gap-2"><PenTool size={12}/> Otoritas Pengesah</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.deanName} onChange={e => handleDataChange('deanName', e.target.value)} placeholder="Nama Dekan/Kaprodi" />
                 <input className="w-full p-2 border rounded text-xs" value={data.deanNip} onChange={e => handleDataChange('deanNip', e.target.value)} placeholder="NIP" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col">
                    <ResearchContent />
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
            <ResearchContent />
         </div>
      </div>

    </div>
  );
}
