'use client';

/**
 * FILE: IjazahSementaraPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Lulus (SKL) / Ijazah Sementara Tingkat Kampus / Universitas
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileBadge, Award, CalendarDays,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, RotateCcw, ArrowLeftCircle,
  BookOpen, Landmark
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SKLData {
  city: string;
  date: string;
  docNo: string;
  
  // Kampus
  universityHeader: string;
  universityName: string;
  facultyName: string;
  universityAddress: string;
  universityContact: string;
  
  deanName: string;
  deanNip: string;
  
  // Mahasiswa
  studentName: string;
  nim: string;
  placeBirth: string;
  dateBirth: string;
  program: string;
  department: string; 
  
  // Kelulusan
  yudisiumDate: string;
  ipk: string;
  predicate: string; 
  title: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SKLData = {
  city: 'JAKARTA',
  date: '', 
  docNo: '123/UN.10/FASILKOM/PP/2026',
  
  universityHeader: 'KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI',
  universityName: 'UNIVERSITAS TEKNOLOGI NUSANTARA',
  facultyName: 'FAKULTAS ILMU KOMPUTER',
  universityAddress: 'Jl. Pendidikan No. 1, Jakarta Selatan 12345',
  universityContact: 'Telp: (021) 1234567 | Email: info@utn.ac.id | Web: www.utn.ac.id',
  
  studentName: 'BIMA ARYA WICAKSANA',
  nim: '19051010023',
  placeBirth: 'Jakarta',
  dateBirth: '2001-08-15',
  program: 'Strata Satu (S1)',
  department: 'Teknik Informatika',
  
  yudisiumDate: '2026-06-20',
  ipk: '3.85',
  predicate: 'Dengan Pujian (Cum Laude)',
  title: 'Sarjana Komputer (S.Kom.)',
  
  deanName: 'PROF. DR. IR. BAMBANG SUTEDJO, M.SC.',
  deanNip: '19650312 199002 1 001'
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
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-indigo-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-indigo-500' : 'bg-slate-300'}`}></div> 
            Format Standar Resmi
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-indigo-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-indigo-50 text-indigo-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-indigo-500' : 'bg-slate-300'}`}></div> 
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
        
        {/* KOP KAMPUS */}
        <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0 text-center">
          <div className="flex items-center gap-6 w-full px-2">
             {logo ? (
                <img src={logo} alt="Logo Kampus" className="w-24 h-24 object-contain shrink-0" />
             ) : (
                <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                   <Landmark size={36} />
                </div>
             )}
             <div className="flex-grow flex flex-col justify-center">
                <div className="text-[12pt] font-semibold uppercase tracking-wide text-slate-900 leading-tight">
                   {data.universityHeader}
                </div>
                <div className="text-[14pt] font-black uppercase tracking-widest text-slate-900 mt-1 mb-1 leading-tight">
                   {data.universityName}
                </div>
                <div className="text-[13pt] font-bold uppercase tracking-wide text-slate-900 mb-2 leading-tight">
                   {data.facultyName}
                </div>
                <p className="text-[9pt] normal-case font-medium text-slate-700 print:text-black leading-snug">{data.universityAddress}</p>
                <p className="text-[8.5pt] normal-case mt-0.5 text-slate-600 print:text-black leading-snug">{data.universityContact}</p>
             </div>
          </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight">
          <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-widest">SURAT KETERANGAN LULUS</h2>
          <p className="text-[10pt] mt-3 font-medium text-slate-600 print:text-black">Nomor: {data.docNo}</p>
        </div>

        {/* BODY SURAT */}
        <div className="flex-grow space-y-5 overflow-hidden text-justify leading-relaxed">
          <p>Dekan {data.facultyName.split('\n').pop()} {data.universityName.split('\n').pop()} menerangkan dengan sebenarnya bahwa:</p>
          
          <div className="ml-4 md:ml-12 space-y-2.5 text-[11pt] py-2 break-inside-avoid">
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight text-slate-900">{data.studentName}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Nomor Induk Mahasiswa</span><span>:</span><span className="font-mono">{data.nim}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {formatDateSafe(data.dateBirth)}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Fakultas</span><span>:</span><span>{data.facultyName}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.department}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Program Pendidikan</span><span>:</span><span>{data.program}</span></div>
          </div>

          <p>Telah dinyatakan <strong>LULUS</strong> dalam Ujian Komprehensif / Yudisium yang diselenggarakan pada tanggal <strong>{formatDateSafe(data.yudisiumDate)}</strong> dan kepadanya berhak diberikan gelar akademik <strong>{data.title}</strong>, dengan rincian kelulusan sebagai berikut:</p>

          <div className="ml-4 md:ml-12 space-y-2.5 text-[11pt] py-2 break-inside-avoid">
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Indeks Prestasi Kumulatif</span><span>:</span><span className="font-bold text-[12pt]">{data.ipk}</span></div>
              <div className="grid grid-cols-[180px_10px_1fr]"><span>Predikat Kelulusan</span><span>:</span><span className="font-bold uppercase italic">{data.predicate}</span></div>
          </div>

          <p className="mt-4">Surat Keterangan Lulus (SKL) ini diberikan sebagai dokumen pengganti Ijazah sementara sampai dengan diterbitkannya Ijazah asli. Segala hak dan kewenangan yang melekat pada gelar akademik tersebut dapat dipergunakan sebagaimana mestinya.</p>
          
          <p>Demikian surat keterangan ini dibuat untuk dapat dipergunakan dengan sebaik-baiknya.</p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-10 pt-4 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
           <table className="w-full table-fixed">
             <tbody>
               <tr>
                 <td className="w-[40%] align-bottom">
                    <div className="w-28 h-36 border-2 border-slate-300 flex items-center justify-center text-center p-3 print:border-black mx-auto md:mx-0 bg-slate-50 print:bg-transparent">
                       <p className="text-[8pt] text-slate-400 uppercase font-black tracking-widest leading-relaxed">Pas Foto<br/>3 x 4<br/><span className="text-[6pt] opacity-50 italic">(Cap Kampus)</span></p>
                    </div>
                 </td>
                 <td className="text-center align-bottom pb-2">
                    <p className="text-[11pt] mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                    <p className="text-[11pt] mb-24 print:text-black">Dekan,</p>
                    <div className="flex flex-col items-center">
                       <p className="font-bold underline uppercase text-[11pt] tracking-tight text-slate-900">{data.deanName}</p>
                       <p className="text-[11pt] mt-1">NIP. {data.deanNip}</p>
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
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans shadow-md">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-indigo-400 uppercase tracking-tighter">
               <GraduationCap size={16} /> <span>University SKL Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all hover:bg-slate-700">
                <LayoutTemplate size={14} className="text-indigo-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans shadow-sm z-10">
               <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-indigo-600" /> Editor Akademik</h2>
               <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors bg-white p-1.5 rounded-md border shadow-sm"><RotateCcw size={14}/></button>
           </div>
           
 <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-32 font-sans print:flex print:overflow-visible print:bg-white bg-slate-50/50">
              
              {/* DATA KAMPUS */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-indigo-700 border-b pb-2 tracking-widest flex items-center gap-2"><Landmark size={14}/> Identitas Kampus</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-20 h-20 border-2 border-dashed border-indigo-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-indigo-50 transition-colors overflow-hidden shrink-0 group">
                       {logo ? <img src={logo} className="w-full h-full object-contain p-1" alt="Logo" /> : <div className="flex flex-col items-center text-indigo-300 group-hover:text-indigo-500"><ImagePlus size={24} /><span className="text-[8px] font-bold mt-1 uppercase">Logo</span></div>}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <div className="flex-1 space-y-2">
                        <input className="w-full p-2 border border-slate-200 rounded-lg text-[10px] font-bold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase bg-slate-50 hover:bg-white transition-colors" value={data.universityHeader} onChange={e => handleDataChange('universityHeader', e.target.value)} placeholder="KEMENTERIAN / YAYASAN" />
                        <input className="w-full p-2 border border-slate-200 rounded-lg text-xs font-black text-indigo-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase bg-slate-50 hover:bg-white transition-colors" value={data.universityName} onChange={e => handleDataChange('universityName', e.target.value)} placeholder="NAMA UNIVERSITAS" />
                    </div>
                 </div>
                 <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.facultyName} onChange={e => handleDataChange('facultyName', e.target.value)} placeholder="Nama Fakultas" />
                 <textarea className="w-full p-2.5 border border-slate-200 rounded-lg text-[10px] focus:ring-2 focus:ring-indigo-500 outline-none h-16 resize-none" value={data.universityAddress} onChange={e => handleDataChange('universityAddress', e.target.value)} placeholder="Alamat Kampus" />
                 <input className="w-full p-2.5 border border-slate-200 rounded-lg text-[10px] focus:ring-2 focus:ring-indigo-500 outline-none" value={data.universityContact} onChange={e => handleDataChange('universityContact', e.target.value)} placeholder="Kontak (Telp/Email/Web)" />
              </div>

              {/* DATA MAHASISWA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={14}/> Data Mahasiswa</h3>
                 <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} placeholder="Nama Lengkap Mahasiswa" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono font-bold text-slate-700" value={data.nim} onChange={e => handleDataChange('nim', e.target.value)} placeholder="NIM" />
                   <input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none text-slate-700" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} placeholder="Tempat Lahir" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-medium" value={data.program} onChange={e => handleDataChange('program', e.target.value)} placeholder="Program (S1/D3 dsb)" />
                    <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-bold" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Program Studi" />
                 </div>
              </div>

              {/* DATA KELULUSAN */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Award size={14}/> Kelulusan Akademik</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Indeks Prestasi (IPK)</label>
                        <input className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-black text-indigo-700 focus:ring-2 focus:ring-amber-500 outline-none" value={data.ipk} onChange={e => handleDataChange('ipk', e.target.value)} placeholder="Contoh: 3.85" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Tanggal Yudisium</label>
                        <input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none text-slate-700" value={data.yudisiumDate} onChange={e => handleDataChange('yudisiumDate', e.target.value)} />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Predikat Kelulusan</label>
                     <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-amber-500 outline-none" value={data.predicate} onChange={e => handleDataChange('predicate', e.target.value)} placeholder="Contoh: Dengan Pujian (Cum Laude)" />
                 </div>
                 <div className="space-y-1.5">
                     <label className="text-[10px] font-bold text-slate-500 uppercase px-1">Gelar Akademik</label>
                     <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.title} onChange={e => handleDataChange('title', e.target.value)} placeholder="Contoh: Sarjana Komputer (S.Kom.)" />
                 </div>
              </div>

              {/* OTORITAS */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 font-sans pb-10">
                 <h3 className="text-[11px] font-black uppercase text-slate-600 border-b pb-2 tracking-widest flex items-center gap-2"><PenTool size={14}/> Pengesahan Dokumen</h3>
                 <div className="space-y-3">
                     <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.deanName} onChange={e => handleDataChange('deanName', e.target.value)} placeholder="Nama Dekan / Pejabat" />
                     <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.deanNip} onChange={e => handleDataChange('deanNip', e.target.value)} placeholder="NIP Pejabat" />
                 </div>
                 <div className="grid grid-cols-2 gap-3 mt-4">
                    <input className="w-full p-2.5 border border-slate-200 rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2.5 border border-slate-200 rounded-lg text-[10px] font-mono focus:ring-2 focus:ring-slate-500 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat Resmi" />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
 <div className={`flex-1 h-full bg-slate-200/80 rounded-tl-2xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:flex print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block rounded-sm ring-1 ring-slate-900/5">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 shadow-2xl font-bold font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-md scale-95' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs transition-all ${mobileView === 'preview' ? 'bg-indigo-600 text-white shadow-md scale-95' : 'text-slate-400'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="SKL Akademik" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
