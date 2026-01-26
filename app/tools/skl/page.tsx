'use client';

/**
 * FILE: IjazahSementaraPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Keterangan Lulus (SKL) / Ijazah Sementara
 * FEATURES:
 * - Dual Template (Official Standard vs Modern Clean)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileBadge, Award, CalendarDays,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
  department: string; // Jurusan
  
  // Kelulusan
  examYear: string;
  averageScore: string;
  status: string; // LULUS / TIDAK LULUS
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SKLData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
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

// --- 3. KOMPONEN UTAMA ---
export default function IjazahSementaraPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor SKL...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU COMPONENT ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Standar
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Modern
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Modern';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* KOP SEKOLAH */}
      <div className="flex items-center border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0 text-center">
        <div className="flex items-center gap-6 w-full px-4">
           {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0 block print:block" />
           ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                 <Building2 size={32} />
              </div>
           )}
           <div className="flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter print:text-black">
                 {data.schoolHeader}
              </div>
              <p className="text-[8pt] font-sans mt-1 normal-case font-normal italic text-slate-600 print:text-black">{data.schoolAddress}</p>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT KETERANGAN LULUS (SKL)</h2>
        <p className="text-[10pt] font-sans mt-2 italic font-bold">Tahun Pelajaran {data.examYear}</p>
        <p className="text-[9pt] font-sans print:text-black">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow space-y-6 overflow-hidden text-left">
        <p>Kepala <b>{data.schoolHeader.split('\n').pop()}</b> dengan ini menerangkan bahwa:</p>
        
        <div className="ml-12 space-y-2 font-sans text-[10.5pt] italic border-l-4 border-slate-100 pl-6 print:border-slate-300">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.studentName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NISN</span><span>:</span><span>{data.nisn}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat, Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {isClient && data.dateBirth ? new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Kompetensi Keahlian</span><span>:</span><span className="font-bold">{data.department}</span></div>
        </div>

        <p className="text-justify leading-relaxed">
          Berdasarkan hasil Rapat Pleno Dewan Guru tentang Kelulusan Siswa Tahun Pelajaran {data.examYear}, serta merujuk pada kriteria kelulusan yang berlaku, maka nama tersebut di atas dinyatakan:
        </p>

        <div className="text-center my-8 shrink-0">
            <div className="inline-block border-4 border-slate-900 px-10 py-3 rounded-xl print:border-black">
                <span className="text-3xl font-black tracking-[0.3em] uppercase print:text-black">{data.status}</span>
            </div>
            <p className="mt-4 font-sans text-sm">Dengan Nilai Rata-Rata Ujian: <b className="text-xl underline decoration-double">{data.averageScore}</b></p>
        </div>

        <p className="text-justify leading-relaxed">
          Surat keterangan ini berlaku sementara sampai dengan diterbitkannya Ijazah asli. Harap dipergunakan sebagaimana mestinya.
        </p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-6 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/3 align-bottom">
                 <div className="w-32 h-40 border-2 border-dashed border-slate-200 flex items-center justify-center text-center p-4 print:border-slate-400 mx-auto md:mx-0">
                    <p className="text-[7pt] text-slate-300 font-sans uppercase print:text-slate-500 font-bold">Pas Foto<br/>3 x 4<br/>(Cap Tiga Jari)</p>
                 </div>
              </td>
              <td className="text-center">
                 <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
                 <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest print:text-black mb-24">Kepala Sekolah,</p>
                 <div className="flex flex-col items-center">
                    <p className="font-bold underline uppercase text-[11pt] tracking-tight leading-none">{data.principalName}</p>
                    <p className="text-[9pt] font-sans mt-1">NIP. {data.principalNip}</p>
                 </div>
              </td>
            </tr>
          </tbody>
         </table>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <GraduationCap size={16} /> <span>Temporary Certificate Builder</span>
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
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data SKL</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi Sekolah</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                    <textarea className="flex-1 p-2 border rounded text-[10px] font-bold uppercase bg-slate-50 h-14 leading-tight" value={data.schoolHeader} onChange={e => handleDataChange('schoolHeader', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.schoolAddress} onChange={e => handleDataChange('schoolAddress', e.target.value)} placeholder="Alamat & Kontak" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Siswa</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.nisn} onChange={e => handleDataChange('nisn', e.target.value)} placeholder="NISN" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Jurusan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Award size={12}/> Kelulusan</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-black text-blue-700" value={data.averageScore} onChange={e => handleDataChange('averageScore', e.target.value)} placeholder="Nilai Rata-rata" />
                    <input className="w-full p-2 border rounded text-xs" value={data.examYear} onChange={e => handleDataChange('examYear', e.target.value)} placeholder="Tahun Pelajaran" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.principalName} onChange={e => handleDataChange('principalName', e.target.value)} placeholder="Nama Kepsek" />
                 <input className="w-full p-2 border rounded text-xs" value={data.principalNip} onChange={e => handleDataChange('principalNip', e.target.value)} placeholder="NIP Kepsek" />
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
