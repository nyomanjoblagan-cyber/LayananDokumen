'use client';

/**
 * FILE: PernyataanOrtuPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Pernyataan / Izin Orang Tua
 * FEATURES:
 * - Dual Template (Standard Permit vs Legal Statement)
 * - Quick Presets (Study Tour, Internship, Discipline)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Users, GraduationCap, Tent, Briefcase, FileWarning, 
  ChevronDown, Check, Edit3, Eye, FileText, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface ParentData {
  city: string;
  date: string;
  
  // Orang Tua
  parentName: string;
  parentNik: string;
  parentJob: string;
  parentAddress: string;
  parentPhone: string;
  
  // Anak
  childName: string;
  childId: string; // NIS/NIM
  childSchool: string;
  childClass: string;
  
  // Isi Surat
  title: string;
  context: string;
  statement: string;
  disclaimer: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ParentData = {
  city: 'SURABAYA',
  date: '', // Diisi useEffect
  
  parentName: 'BAMBANG SUGIONO',
  parentNik: '3578010101750001',
  parentJob: 'Wiraswasta',
  parentAddress: 'Jl. Ahmad Yani No. 88, Surabaya',
  parentPhone: '0811-2345-6789',
  
  childName: 'ADITYA PRATAMA',
  childId: '12345678',
  childSchool: 'SMK NEGERI 1 SURABAYA',
  childClass: 'XI - Teknik Mesin',
  
  title: 'SURAT IZIN ORANG TUA',
  context: 'Mengikuti Kegiatan Kunjungan Industri (Study Tour) ke Bali',
  statement: 'Memberikan izin sepenuhnya kepada anak saya tersebut di atas untuk mengikuti kegiatan yang diselenggarakan oleh sekolah pada tanggal 20-23 Juni 2026.',
  disclaimer: 'Saya menyadari segala resiko yang mungkin terjadi dan tidak akan menuntut pihak sekolah apabila terjadi hal-hal di luar kewenangan panitia, selama panitia telah menjalankan tugas sesuai prosedur.'
};

// --- 3. KOMPONEN UTAMA ---
export default function PernyataanOrtuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor...</div>}>
      <ParentStatementBuilder />
    </Suspense>
  );
}

function ParentStatementBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ParentData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ParentData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- PRESETS ---
  const applyPreset = (type: 'tour' | 'magang' | 'tatib') => {
    if (type === 'tour') {
      setData(prev => ({
        ...prev,
        title: 'SURAT IZIN ORANG TUA',
        context: 'Mengikuti Kegiatan Study Tour / Camping',
        statement: 'Memberikan izin kepada anak saya untuk mengikuti kegiatan tersebut yang akan dilaksanakan pada tanggal [Isi Tanggal]. Saya bersedia menanggung biaya yang diperlukan.',
        disclaimer: 'Saya tidak akan menuntut pihak sekolah atas kejadian di luar kendali manusia (Force Majeure) selama kegiatan berlangsung.',
      }));
      setTemplateId(1);
    } else if (type === 'magang') {
      setData(prev => ({
        ...prev,
        title: 'SURAT PERNYATAAN IZIN KERJA / MAGANG',
        context: 'Melaksanakan Program Magang / Praktik Kerja Lapangan (PKL)',
        statement: 'Menyetujui dan mengizinkan anak saya untuk melaksanakan praktik kerja di perusahaan yang Bapak/Ibu pimpin selama [Durasi] bulan.',
        disclaimer: 'Saya membimbing anak saya untuk mematuhi segala peraturan perusahaan dan menjaga nama baik sekolah serta keluarga.',
      }));
      setTemplateId(1);
    } else if (type === 'tatib') {
      setData(prev => ({
        ...prev,
        title: 'SURAT PERNYATAAN KESANGGUPAN',
        context: 'Pematuhan Tata Tertib Sekolah & Disiplin Siswa',
        statement: 'Menyatakan bahwa saya selaku orang tua akan membimbing dan mengawasi anak saya agar mematuhi segala tata tertib yang berlaku di sekolah.',
        disclaimer: 'Apabila dikemudian hari anak saya melakukan pelanggaran berat, saya bersedia menerima sanksi akademik sesuai ketentuan sekolah (termasuk dikembalikan kepada orang tua).',
      }));
      setTemplateId(2); 
    }
  };

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Standar (Izin)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Format Materai (Resmi)
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Materai';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      <div className="text-center mb-8 border-b-4 border-double border-black pb-2 shrink-0">
        <h1 className="font-black text-xl uppercase tracking-widest underline">{data.title}</h1>
      </div>

      <div className="flex-grow space-y-6 text-justify">
        <p>Saya yang bertanda tangan di bawah ini:</p>

        <div className="ml-8 mb-6">
            <table className="w-full leading-relaxed">
                <tbody>
                    <tr><td className="w-36 py-0.5">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase">{data.parentName}</td></tr>
                    <tr><td className="py-0.5">NIK (KTP)</td><td>:</td><td>{data.parentNik}</td></tr>
                    <tr><td className="py-0.5">Pekerjaan</td><td>:</td><td>{data.parentJob}</td></tr>
                    <tr><td className="py-0.5">No. HP / WA</td><td>:</td><td>{data.parentPhone}</td></tr>
                    <tr><td className="py-0.5 align-top">Alamat Domisili</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.parentAddress}</td></tr>
                </tbody>
            </table>
            <div className="mt-2 font-bold text-xs italic text-blue-700 print:text-black">Selaku Orang Tua / Wali dari:</div>
        </div>

        <div className="ml-8 mb-6">
            <table className="w-full leading-relaxed">
                <tbody>
                    <tr><td className="w-36 py-0.5">Nama Siswa/i</td><td className="w-3">:</td><td className="font-bold uppercase">{data.childName}</td></tr>
                    <tr><td className="py-0.5">NIS / NIM</td><td>:</td><td>{data.childId}</td></tr>
                    <tr><td className="py-0.5">Kelas / Jurusan</td><td>:</td><td>{data.childClass}</td></tr>
                    <tr><td className="py-0.5">Sekolah / Kampus</td><td>:</td><td>{data.childSchool}</td></tr>
                </tbody>
            </table>
        </div>

        <div className="space-y-4">
            <p className="text-justify leading-relaxed">
                Sehubungan dengan kegiatan <strong>{data.context}</strong>, dengan ini saya menyatakan:
            </p>

            <div className="ml-8 p-4 bg-slate-50 border-l-4 border-slate-300 italic font-medium text-slate-800 print:bg-transparent print:border-black">
                "{data.statement}"
            </div>

            <p className="text-justify leading-relaxed">
                Dan selanjutnya saya menyatakan bahwa {data.disclaimer}
            </p>

            <p className="pt-2">Demikian surat pernyataan ini saya buat dengan sadar dan tanpa ada paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.</p>
        </div>
      </div>

      <div className="mt-auto pt-10 shrink-0 flex justify-end text-center" style={{ pageBreakInside: 'avoid' }}>
        <div className="w-64">
          <p className="mb-2 font-sans text-sm">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
          <p className="mb-20">Pembuat Pernyataan,</p>
          
          {templateId === 2 && (
            <div className="border border-slate-300 w-24 h-14 mx-auto mb-[-3.5rem] mt-[-3rem] flex items-center justify-center text-[8px] text-slate-400 italic print:border-black print:text-black">MATERAI 10.000</div>
          )}
          
          <p className="font-bold underline uppercase text-lg relative z-10">{data.parentName}</p>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Users size={16} className="text-emerald-500" /> <span>PARENT STATEMENT BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              {/* PRESETS */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-emerald-800 uppercase">Pilih Keperluan</h3>
                 </div>
                 <div className="p-4 grid grid-cols-3 gap-2">
                    <button onClick={() => applyPreset('tour')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors"><Tent size={14} className="text-emerald-600"/><span className="text-[8px] font-bold">TOUR</span></button>
                    <button onClick={() => applyPreset('magang')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors"><Briefcase size={14} className="text-blue-600"/><span className="text-[8px] font-bold">MAGANG</span></button>
                    <button onClick={() => applyPreset('tatib')} className="bg-white hover:bg-red-100 border border-red-200 text-red-700 py-2 rounded text-[10px] font-bold flex flex-col items-center gap-1 transition-colors"><FileWarning size={14} className="text-red-600"/><span className="text-[8px] font-bold">DISIPLIN</span></button>
                 </div>
              </div>

              {/* ORANG TUA */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><User size={12}/> Data Orang Tua</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded text-xs" value={data.parentPhone} onChange={e => handleDataChange('parentPhone', e.target.value)} placeholder="No. HP" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.parentJob} onChange={e => handleDataChange('parentJob', e.target.value)} placeholder="Pekerjaan" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat" />
              </div>

              {/* ANAK */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><GraduationCap size={12}/> Data Anak / Siswa</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Nama Anak" />
                 <input className="w-full p-2 border rounded text-xs" value={data.childSchool} onChange={e => handleDataChange('childSchool', e.target.value)} placeholder="Sekolah" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs" value={data.childId} onChange={e => handleDataChange('childId', e.target.value)} placeholder="NIS/NIM" />
                    <input className="w-full p-2 border rounded text-xs" value={data.childClass} onChange={e => handleDataChange('childClass', e.target.value)} placeholder="Kelas/Jurusan" />
                 </div>
              </div>

              {/* ISI */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Isi Surat</h3>
                 <input className="w-full p-2 border rounded text-xs font-black uppercase" value={data.title} onChange={e => handleDataChange('title', e.target.value)} placeholder="Judul Surat" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.context} onChange={e => handleDataChange('context', e.target.value)} placeholder="Konteks Kegiatan" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" value={data.statement} onChange={e => handleDataChange('statement', e.target.value)} placeholder="Pernyataan Utama" />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.disclaimer} onChange={e => handleDataChange('disclaimer', e.target.value)} placeholder="Disclaimer / Penutup" />
                 <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
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
