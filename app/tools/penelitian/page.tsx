'use client';

/**
 * FILE: PenelitianPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Permohonan Izin Penelitian (Riset)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Search, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, FileSearch, Edit3, Eye, Check, ChevronDown, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Izin Riset...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Standar Kampus' : 'Formal Instansi';

  const ResearchContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        {templateId === 1 && (
          <div className="flex flex-col h-full">
              <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-3 mb-6 shrink-0 text-center font-sans">
                  <h2 className="text-[9pt] font-black uppercase leading-tight tracking-tight italic">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</h2>
                  <h1 className="text-[13pt] font-black uppercase leading-tight mt-1">{data.university}</h1>
                  <h2 className="text-[11pt] font-bold uppercase leading-tight">{data.faculty}</h2>
                  <p className="text-[8pt] mt-0.5 italic text-slate-500 print:text-black">{data.campusAddress}</p>
              </div>

              <div className="flex justify-between mb-6 text-[10.5pt] shrink-0 font-sans">
                  <div className="space-y-0.5">
                      <p>Nomor : {data.docNo}</p>
                      <p>Lampiran : 1 (satu) Berkas Proposal</p>
                      <p>Hal : <b>Permohonan Izin Penelitian</b></p>
                  </div>
                  <p>{data.city}, {formatDateSafe(data.date)}</p>
              </div>

              <div className="mb-6 text-[11pt] shrink-0">
                  <p>Yth. <b>{data.targetOffice}</b></p>
                  <p>{data.targetAddress}</p>
                  <p>Di Tempat</p>
              </div>

              <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
                  <p className="mb-3">Dengan hormat,</p>
                  <p className="mb-3">Dalam rangka pemenuhan persyaratan akademik dan penyelesaian tugas akhir mahasiswa, kami memohon kesediaan Bapak/Ibu untuk memberikan izin penelitian kepada:</p>
                  
                  <div className="ml-8 mb-4 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1 break-inside-avoid">
                      <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.studentName}</span></div>
                      <div className="grid grid-cols-[140px_10px_1fr]"><span>Nomor Induk (NIM)</span><span>:</span><span className="font-mono">{data.studentId}</span></div>
                      <div className="grid grid-cols-[140px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.department}</span></div>
                  </div>

                  <p className="mb-3">Penelitian tersebut akan dilakukan dengan rincian sebagai berikut:</p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans text-[10pt] mb-4 space-y-2 print:bg-transparent print:border-black break-inside-avoid">
                      <p className="leading-snug"><b>Judul Penelitian:</b><br/><span className="italic">"{data.researchTitle}"</span></p>
                      <p><b>Durasi:</b> {data.duration}</p>
                  </div>

                  <p className="mb-4">
                  Segala data yang diperoleh akan dijaga kerahasiaannya dan hanya akan dipergunakan untuk kepentingan pengembangan ilmu pengetahuan secara akademik.
                  </p>

                  <p>Demikian permohonan ini kami sampaikan. Atas bantuan dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.</p>
              </div>

              <div className="mt-auto pt-8 shrink-0 break-inside-avoid">
                  <table className="w-full table-fixed font-sans">
                  <tbody>
                      <tr>
                      <td className="w-1/2"></td>
                      <td className="text-center">
                          <p className="font-bold mb-20 uppercase text-[9pt] tracking-widest text-slate-400">Mengetahui,</p>
                          <div className="flex flex-col items-center">
                              <p className="font-bold underline uppercase text-[10pt] tracking-tight">{data.deanName}</p>
                              <p className="text-[9pt] mt-0.5">NIP. {data.deanNip}</p>
                          </div>
                      </td>
                      </tr>
                  </tbody>
                  </table>
              </div>
          </div>
        )}

        {templateId === 2 && (
          <div className="flex flex-col h-full font-sans text-[10.5pt]">
              <div className="border-b-2 border-slate-900 pb-4 mb-8 shrink-0 flex justify-between items-start">
                  <div>
                      <h1 className="text-xl font-black uppercase text-slate-900 leading-none tracking-tighter">{data.university}</h1>
                      <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-widest">{data.faculty}</p>
                  </div>
                  <div className="text-right text-[9pt] text-slate-500 font-mono">
                      <p>Ref No: {data.docNo}</p>
                      <p>{formatDateSafe(data.date)}</p>
                  </div>
              </div>

              <div className="mb-10 shrink-0">
                  <p className="text-slate-400 uppercase text-[10px] font-black tracking-widest mb-2">Recipient</p>
                  <p className="font-black text-lg text-slate-800 uppercase">{data.targetOffice}</p>
                  <p className="text-sm text-slate-500 w-2/3">{data.targetAddress}</p>
              </div>

              <div className="flex-grow space-y-6 text-justify leading-relaxed">
                  <div className="border-l-4 border-slate-800 pl-6 py-2 bg-slate-50 print:bg-transparent">
                    <p className="font-black text-slate-900 text-sm uppercase">Subject: Field Research Access Request</p>
                  </div>
                  
                  <p>
                    With respect to the academic requirements for the completion of the undergraduate thesis, we hereby formally request access for our student to conduct data collection and analysis within your organization.
                  </p>
                  
                  <div className="bg-white border-2 border-slate-100 p-6 rounded-3xl space-y-4 print:border-black break-inside-avoid">
                      <div className="grid grid-cols-[100px_1fr] gap-2">
                        <span className="text-[10px] font-black text-slate-300 uppercase">Researcher</span>
                        <span className="font-black uppercase text-slate-800">{data.studentName}</span>
                        <span className="text-[10px] font-black text-slate-300 uppercase">ID No.</span>
                        <span className="font-mono">{data.studentId}</span>
                        <span className="text-[10px] font-black text-slate-300 uppercase">Project</span>
                        <span className="italic text-sm">"{data.researchTitle}"</span>
                      </div>
                  </div>

                  <p>
                    The proposed study period is <strong>{data.duration}</strong>. We guarantee that all data acquired will be handled with strict confidentiality and used solely for academic purposes in compliance with ethics standards.
                  </p>
                  
                  <p>We look forward to your positive response regarding this matter. Thank you for your support of academic research.</p>
              </div>

              <div className="mt-16 shrink-0 text-right break-inside-avoid">
                  <div className="font-serif italic text-2xl text-slate-300 mb-4 print:text-black">Best Regards,</div>
                  <p className="font-black text-slate-900 text-lg underline uppercase tracking-tight">{data.deanName}</p>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">NIP. {data.deanNip}</p>
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
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
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
               <FileSearch size={16} className="text-blue-500" /> <span>Research Permit Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Standar Kampus {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Formal Instansi {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Riset</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kampus</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.university} onChange={e => handleDataChange('university', e.target.value)} placeholder="Nama Kampus" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.faculty} onChange={e => handleDataChange('faculty', e.target.value)} placeholder="Fakultas" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Program Studi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Mahasiswa</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Peneliti" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Search size={12}/> Objek Riset</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.targetOffice} onChange={e => handleDataChange('targetOffice', e.target.value)} placeholder="Tujuan Instansi" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed italic" value={data.researchTitle} onChange={e => handleDataChange('researchTitle', e.target.value)} placeholder="Judul Riset" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Otoritas</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none" value={data.deanName} onChange={e => handleDataChange('deanName', e.target.value)} placeholder="Nama Dekan/Kaprodi" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.deanNip} onChange={e => handleDataChange('deanNip', e.target.value)} placeholder="NIP" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <ResearchContent />
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
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><ResearchContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE