'use client';

/**
 * FILE: MagangPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Permohonan Magang/PKL/Kerja Praktik
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, 
  LayoutTemplate, GraduationCap, Building2, 
  Briefcase, User, Eye, Edit3, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface InternshipData {
  city: string;
  date: string;
  
  // Tujuan
  hrdName: string;
  companyName: string;
  companyAddress: string;
  
  // Pelamar
  name: string;
  idNumber: string; // NIM/NIS
  institution: string;
  major: string;
  semester: string;
  phone: string;
  email: string;
  address: string;
  
  // Detail Magang
  subject: string;
  position: string;
  startDate: string;
  endDate: string;
  duration: string;
  skills: string;
  reason: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: InternshipData = {
  city: 'JAKARTA',
  date: '', 
  
  hrdName: 'HRD Manager',
  companyName: 'PT. TEKNOLOGI MASA DEPAN',
  companyAddress: 'Jl. Sudirman Kav. 50, Jakarta Selatan',
  
  name: 'RIAN PRATAMA',
  idNumber: '2110114005', 
  institution: 'Universitas Indonesia',
  major: 'Teknik Informatika',
  semester: '6 (Enam)',
  phone: '0812-3456-7890',
  email: 'rian.pratama@email.com',
  address: 'Jl. Margonda Raya No. 100, Depok',
  
  subject: 'Permohonan Kerja Praktik (KP)',
  position: 'IT Support / Web Developer',
  startDate: '', 
  endDate: '', 
  duration: '3 (Tiga) Bulan',
  skills: 'HTML, CSS, JavaScript (React.js), dan Basic SQL Database.',
  reason: 'Saya ingin menerapkan ilmu yang telah saya pelajari di bangku kuliah ke dalam dunia kerja nyata.'
};

export default function MagangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <InternshipBuilder />
    </Suspense>
  );
}

function InternshipBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<InternshipData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const threeMonthsLater = new Date(nextMonth);
    threeMonthsLater.setMonth(nextMonth.getMonth() + 3);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: nextMonth.toISOString().split('T')[0],
        endDate: threeMonthsLater.toISOString().split('T')[0]
    }));
  }, []);

  const formatDateIndo = (dateStr: string) => {
    if(!dateStr) return '...';
    try {
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return dateStr; }
  };

  const handleDataChange = (field: keyof InternshipData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);
        const threeMonthsLater = new Date(nextMonth);
        threeMonthsLater.setMonth(nextMonth.getMonth() + 3);
        
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            startDate: nextMonth.toISOString().split('T')[0], 
            endDate: threeMonthsLater.toISOString().split('T')[0] 
        });
    }
  };

  const applyPreset = (type: 'kuliah' | 'smk' | 'fresh') => {
    if (type === 'kuliah') {
      setData(prev => ({
        ...prev, subject: 'Permohonan Kerja Praktik (KP)', institution: 'Universitas Gadjah Mada', major: 'Manajemen', idNumber: '19/123456/EK/12345', semester: '6 (Enam)', position: 'Marketing Intern', skills: 'Digital Marketing, SEO Basic, Copywriting.', reason: 'Untuk memenuhi syarat kelulusan mata kuliah Kerja Praktik.'
      }));
    } else if (type === 'smk') {
      setData(prev => ({
        ...prev, subject: 'Permohonan PKL', institution: 'SMK Negeri 1 Surabaya', major: 'Teknik Mesin', idNumber: '12345678', semester: '4 (Empat)', position: 'Mekanik Magang', skills: 'Service Rutin, Ganti Oli, Tune Up.', reason: 'Sebagai syarat wajib kurikulum sekolah kejuruan (PKL).'
      }));
    } else if (type === 'fresh') {
      setData(prev => ({
        ...prev, subject: 'Lamaran Magang (Internship)', institution: 'Lulusan Perguruan Tinggi', major: 'Ilmu Komunikasi', idNumber: '-', semester: 'Alumni', position: 'PR Intern', skills: 'Public Speaking, Social Media Management.', reason: 'Mencari pengalaman kerja profesional untuk pengembangan karir.'
      }));
    }
  };

  const activeTemplateName = templateId === 1 ? 'Formal (Kampus)' : 'Profesional';

  const LetterContent = () => (
    <div className="bg-white flex flex-col box-border font-serif text-black text-[11pt] leading-normal p-[25mm] print:p-0 w-[210mm] min-h-[296mm] shadow-xl print:shadow-none print:m-0 mx-auto">
      
      {templateId === 1 && (
        <div className="text-[10.5pt] leading-snug flex flex-col h-full">
            <div className="flex justify-between items-start mb-6 shrink-0">
                <div>
                    <div className="mb-1">Perihal : <strong>{data.subject}</strong></div>
                    <div>Lampiran : 1 (Satu) Berkas</div>
                </div>
                <div className="text-right">{data.city}, {formatDateIndo(data.date)}</div>
            </div>

            <div className="mb-6 shrink-0 font-sans">
                <div>Yth. {data.hrdName}</div>
                <div className="font-bold uppercase">{data.companyName}</div>
                <div className="w-64 leading-tight">{data.companyAddress}</div>
            </div>

            <p className="mb-2">Dengan hormat,</p>
            <p className="mb-2 text-justify">Melalui surat ini, saya bermaksud mengajukan permohonan untuk melaksanakan program magang / kerja praktik pada posisi <strong>{data.position}</strong> di perusahaan yang Bapak/Ibu pimpin.</p>
            <p className="mb-2">Berikut adalah data diri saya:</p>

            <div className="ml-4 mb-4 shrink-0 break-inside-avoid">
                <table className="w-full leading-tight font-sans text-[10pt]">
                    <tbody>
                        <tr><td className="w-32 py-1">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.name}</td></tr>
                        <tr><td className="py-1">Institusi</td><td className="py-1">:</td><td className="py-1">{data.institution}</td></tr>
                        <tr><td className="py-1">Jurusan</td><td className="py-1">:</td><td className="py-1">{data.major}</td></tr>
                        <tr><td className="py-1">NIM/NIS</td><td className="py-1">:</td><td className="font-mono">{data.idNumber}</td></tr>
                        <tr><td className="py-1">Semester</td><td className="py-1">:</td><td className="py-1">{data.semester}</td></tr>
                        <tr><td className="py-1">No. HP</td><td className="py-1">:</td><td className="py-1">{data.phone}</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="flex-grow text-justify">
                <p className="mb-2">Waktu pelaksanaan yang saya ajukan adalah selama <strong>{data.duration}</strong>, terhitung mulai <strong>{formatDateIndo(data.startDate)}</strong> sampai <strong>{formatDateIndo(data.endDate)}</strong>.</p>
                <p className="mb-2">{data.reason} Saya memiliki kemampuan di bidang: <strong>{data.skills}</strong>.</p>
                <p className="mb-6">Besar harapan saya untuk dapat diterima. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.</p>
            </div>

            <div className="text-right mr-10 shrink-0 break-inside-avoid">
                <p className="mb-20">Hormat saya,</p>
                <p className="font-bold underline uppercase">{data.name}</p>
                <p className="text-xs">{data.idNumber !== '-' ? `NIM. ${data.idNumber}` : ''}</p>
            </div>
        </div>
      )}

      {templateId === 2 && (
        <div className="font-sans text-[10.5pt] leading-normal flex flex-col h-full">
            <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end shrink-0">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-wide mb-1">{data.name}</h1>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-500">{data.major} Student</div>
                </div>
                <div className="text-right text-xs space-y-0.5">
                    <div>{data.phone}</div>
                    <div>{data.email}</div>
                    <div>{data.city}</div>
                </div>
            </div>

            <div className="mb-8 shrink-0 break-inside-avoid">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">{formatDateIndo(data.date)}</div>
                <div className="font-bold text-lg">{data.hrdName}</div>
                <div className="font-bold text-slate-700">{data.companyName}</div>
                <div className="text-xs w-2/3">{data.companyAddress}</div>
            </div>

            <div className="space-y-4 text-justify flex-grow">
                <div className="font-bold uppercase tracking-tight">Perihal: Lamaran Magang {data.position}</div>
                <p>Dengan hormat,</p>
                <p>
                    Saya menulis surat ini untuk mengekspresikan ketertarikan saya pada posisi <strong>{data.position}</strong> di <strong>{data.companyName}</strong>. 
                    Sebagai mahasiswa <strong>{data.major}</strong> di <strong>{data.institution}</strong>, saya telah mengikuti perkembangan perusahaan Anda.
                </p>
                <p>
                    Selama masa perkuliahan, saya telah mengembangkan keahlian dalam <strong>{data.skills}</strong>. 
                    {data.reason}
                </p>
                <p>Terlampir adalah dokumen pendukung saya. Saya sangat berharap dapat mendiskusikan kualifikasi saya lebih lanjut dalam sesi wawancara.</p>
            </div>

            <div className="mt-12 shrink-0 break-inside-avoid">
                <div className="font-serif italic text-xl text-slate-400 mb-2">Hormat Saya,</div>
                <div className="font-bold text-lg uppercase tracking-tight">{data.name}</div>
            </div>
        </div>
      )}
    </div>
  );

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
               <GraduationCap size={16} className="text-emerald-500" /> <span>Internship Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Formal (Kampus) {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Profesional {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* EDITOR */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Magang</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('kuliah')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm">KULIAH</button>
                <button onClick={() => applyPreset('smk')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm">SMK</button>
                <button onClick={() => applyPreset('fresh')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm">FRESH</button>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Tujuan</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} placeholder="Nama Perusahaan" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 focus:ring-2 focus:ring-blue-500 outline-none" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pelamar</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.institution} onChange={e => handleDataChange('institution', e.target.value)} placeholder="Asal Kampus/Sekolah" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.major} onChange={e => handleDataChange('major', e.target.value)} placeholder="Jurusan" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Detail Program</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Posisi Magang" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                  <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                </div>
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 focus:ring-2 focus:ring-blue-500 outline-none" value={data.skills} onChange={e => handleDataChange('skills', e.target.value)} placeholder="Skill yang dimiliki..." />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <LetterContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><LetterContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE