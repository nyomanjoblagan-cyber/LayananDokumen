'use client';

/**
 * FILE: IjazahSementaraPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Lulus (SKL) / Ijazah Sementara
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileBadge, Award, CalendarDays,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SKLData {
  city: string;
  date: string;
  docNo: string;
  
  // Sekolah
  schoolHeader: string;
  schoolAddress: string;
  principalName: string;
  principalNip: string;
  
  // Siswa
  studentName: string;
  nisn: string;
  placeBirth: string;
  dateBirth: string;
  department: string; 
  
  // Kelulusan
  examYear: string;
  averageScore: string;
  status: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SKLData = {
  city: 'DENPASAR',
  date: '', 
  docNo: '800/421.3/SMK-TI/VI/2026',
  
  schoolHeader: 'PEMERINTAH PROVINSI BALI\nDINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA\nSMK TEKNOLOGI INFORMATIKA BALI',
  schoolAddress: 'Jl. Teuku Umar No. 10, Denpasar. Telp: (0361) 223344',
  
  studentName: 'BAGUS RAMADHAN',
  nisn: '0055123456',
  placeBirth: 'Denpasar',
  dateBirth: '2008-12-25',
  department: 'Rekayasa Perangkat Lunak (RPL)',
  
  examYear: '2025/2026',
  averageScore: '88.50',
  status: 'LULUS',
  
  principalName: 'DRS. I MADE WIRA, M.PD.',
  principalNip: '19700101 199501 1 002'
};

export default function IjazahSementaraPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor SKL...</div>}>
      <SKLBuilder />
    </Suspense>
  );
}

function SKLBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<SKLData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof SKLData, val: any) => {
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

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Standar Resmi
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Modern Clean
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Modern';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {/* KOP SEKOLAH */}
        <div className="flex items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 text-center font-sans">
          <div className="flex items-center gap-6 w-full px-4">
             {logo ? (
                <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
             ) : (
                <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                   <Building2 size={32} />
                </div>
             )}
             <div className="flex-grow">
                <div className="text-[13pt] font-black leading-tight whitespace-pre-line uppercase tracking-tight text-slate-900">
                   {data.schoolHeader}
                </div>
                <p className="text-[8.5pt] mt-1 normal-case font-medium italic text-slate-500 print:text-black">{data.schoolAddress}</p>
             </div>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight font-sans">
          <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-widest">SURAT KETERANGAN LULUS</h2>
          <p className="text-[10pt] mt-3 italic font-bold text-slate-400 print:text-black uppercase tracking-widest">Tahun Pelajaran {data.examYear}</p>
          <p className="text-[9pt] font-mono mt-1">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow space-y-6 overflow-hidden text-justify leading-relaxed">
          <p>Kepala <strong>{data.schoolHeader.split('\n').pop()}</strong> dengan ini menerangkan dengan sebenarnya bahwa:</p>
          
          <div className="ml-12 space-y-2 font-sans text-[10.5pt] italic border-l-4 border-slate-100 pl-8 py-1 break-inside-avoid print:border-slate-300">
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight text-slate-900">{data.studentName}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor Induk (NISN)</span><span>:</span><span className="font-mono">{data.nisn}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {formatDateSafe(data.dateBirth)}</span></div>
              <div className="grid grid-cols-[160px_10px_1fr]"><span>Kompetensi Keahlian</span><span>:</span><span className="font-bold text-blue-700 print:text-black">{data.department}</span></div>
          </div>

          <p>Berdasarkan hasil Keputusan Rapat Pleno Dewan Guru mengenai kelulusan siswa Tahun Pelajaran {data.examYear}, nama siswa tersebut di atas dinyatakan:</p>

          <div className="text-center my-10 shrink-0 break-inside-avoid">
              <div className="inline-block border-4 border-slate-900 px-16 py-4 rounded-2xl print:border-black shadow-lg">
                  <span className="text-4xl font-black tracking-[0.4em] uppercase print:text-black">{data.status}</span>
              </div>
              <p className="mt-6 font-sans text-sm text-slate-500 print:text-black">Dengan Perolehan Nilai Rata-Rata Ujian:</p>
              <p className="text-3xl font-black underline decoration-double text-slate-900">{data.averageScore}</p>
          </div>

          <p>Surat keterangan ini berlaku sebagai dokumen pengganti Ijazah sementara sampai dengan diterbitkannya Ijazah asli dari Kementerian Pendidikan dan Kebudayaan RI. Harap dipergunakan sebagaimana mestinya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-8 pt-8 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
           <table className="w-full table-fixed font-sans">
             <tbody>
               <tr>
                 <td className="w-1/3 align-bottom">
                    <div className="w-32 h-40 border-2 border-dashed border-slate-200 flex items-center justify-center text-center p-4 print:border-slate-400 mx-auto md:mx-0 bg-slate-50 print:bg-transparent">
                       <p className="text-[7pt] text-slate-400 uppercase font-black tracking-widest leading-relaxed">Pas Foto<br/>3 x 4<br/><span className="text-[6pt] opacity-50 italic">(Cap Tiga Jari)</span></p>
                    </div>
                 </td>
                 <td className="text-center">
                    <p className="text-[10pt] mb-1 font-bold text-slate-400">{data.city}, {formatDateSafe(data.date)}</p>
                    <p className="uppercase text-[8.5pt] font-black text-slate-300 tracking-widest mb-24 print:text-black">Kepala Sekolah,</p>
                    <div className="flex flex-col items-center">
                       <p className="font-black underline uppercase text-[11pt] tracking-tight text-slate-900">{data.principalName}</p>
                       <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-tighter">NIP. {data.principalNip}</p>
                    </div>
                 </td>
               </tr>
             </tbody>
           </table>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter">
               <GraduationCap size={16} /> <span>Temporary Certificate Builder</span>
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
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor SKL</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Kop Sekolah</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <textarea className="flex-1 p-2 border rounded-lg text-[10px] font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase h-20 leading-tight" value={data.schoolHeader} onChange={e => handleDataChange('schoolHeader', e.target.value)} placeholder="Header (Dinas & Sekolah)" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Data Siswa</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Siswa" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.nisn} onChange={e => handleDataChange('nisn', e.target.value)} placeholder="NISN" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Award size={12}/> Kelulusan</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs font-black text-blue-700" value={data.averageScore} onChange={e => handleDataChange('averageScore', e.target.value)} placeholder="Nilai Rata-rata" />
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.examYear} onChange={e => handleDataChange('examYear', e.target.value)} placeholder="Tahun Pelajaran" />
                 </div>
                 <select className="w-full p-2 border rounded-lg text-xs font-black bg-slate-50 uppercase" value={data.status} onChange={e => handleDataChange('status', e.target.value)}>
                    <option value="LULUS">LULUS</option>
                    <option value="TIDAK LULUS">TIDAK LULUS</option>
                 </select>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Otoritas & Administrasi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase" value={data.principalName} onChange={e => handleDataChange('principalName', e.target.value)} placeholder="Kepala Sekolah" />
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.principalNip} onChange={e => handleDataChange('principalNip', e.target.value)} placeholder="NIP Kepala Sekolah" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-[10px] font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
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
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-bold font-sans">
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