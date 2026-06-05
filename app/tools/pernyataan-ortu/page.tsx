'use client';

/**
 * FILE: PernyataanOrtuPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan / Izin Orang Tua
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Users, GraduationCap, Tent, Briefcase, FileWarning, 
  ChevronDown, Check, Edit3, Eye, FileText, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
  
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

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

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Materai';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[20mm] print:p-0 w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
        
        <div className="text-center mb-8 border-b-4 border-double border-black pb-2 shrink-0">
          <h1 className="font-black text-xl uppercase tracking-widest underline decoration-2 underline-offset-8">{data.title}</h1>
        </div>

        <div className="flex-grow space-y-6 text-justify leading-relaxed">
          <p>Saya yang bertanda tangan di bawah ini:</p>

          <div className="ml-8 mb-6 break-inside-avoid font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic py-1">
              <table className="w-full leading-relaxed">
                  <tbody>
                      <tr><td className="w-36 py-0.5 uppercase font-bold text-[9px] text-slate-400">Nama Lengkap</td><td className="w-3">:</td><td className="font-bold uppercase text-slate-900">{data.parentName}</td></tr>
                      <tr><td className="py-0.5 uppercase font-bold text-[9px] text-slate-400">NIK (KTP)</td><td>:</td><td className="font-mono">{data.parentNik}</td></tr>
                      <tr><td className="py-0.5 uppercase font-bold text-[9px] text-slate-400">Pekerjaan</td><td>:</td><td>{data.parentJob}</td></tr>
                      <tr><td className="py-0.5 uppercase font-bold text-[9px] text-slate-400">Alamat</td><td className="align-top">:</td><td className="align-top leading-tight">{data.parentAddress}</td></tr>
                  </tbody>
              </table>
              <div className="mt-3 font-black text-[10px] uppercase tracking-widest text-emerald-600">Selaku Orang Tua / Wali dari:</div>
          </div>

          <div className="ml-8 mb-6 break-inside-avoid font-sans text-[10pt] border-l-4 border-emerald-50 pl-6 py-1">
              <table className="w-full leading-relaxed">
                  <tbody>
                      <tr><td className="w-36 py-0.5 uppercase font-bold text-[9px] text-slate-400">Nama Siswa/i</td><td className="w-3">:</td><td className="font-bold uppercase text-slate-900">{data.childName}</td></tr>
                      <tr><td className="py-0.5 uppercase font-bold text-[9px] text-slate-400">NIS / NIM</td><td>:</td><td className="font-mono">{data.childId}</td></tr>
                      <tr><td className="py-0.5 uppercase font-bold text-[9px] text-slate-400">Kelas / Jurusan</td><td>:</td><td>{data.childClass}</td></tr>
                      <tr><td className="py-0.5 uppercase font-bold text-[9px] text-slate-400">Institusi</td><td>:</td><td className="font-bold">{data.childSchool}</td></tr>
                  </tbody>
              </table>
          </div>

          <div className="space-y-4">
              <p>Sehubungan dengan kegiatan <strong>{data.context}</strong>, dengan ini saya menyatakan:</p>

              <div className="ml-4 p-5 bg-slate-50 border-2 border-dashed border-slate-200 italic font-medium text-slate-700 print:bg-transparent print:border-black break-inside-avoid">
                  "{data.statement}"
              </div>

              <p>Dan selanjutnya saya menyatakan bahwa {data.disclaimer}</p>

              <p>Demikian surat pernyataan ini saya buat dengan sadar dan penuh rasa tanggung jawab untuk dipergunakan sebagaimana mestinya.</p>
          </div>
        </div>

        <div className="mt-auto pt-10 shrink-0 flex justify-end text-center break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div className="w-64 font-sans">
            <p className="mb-2 text-[10pt]">{data.city}, {formatDateSafe(data.date)}</p>
            <p className="mb-20 font-bold uppercase text-[9px] tracking-widest text-slate-400">Hormat Saya,</p>
            
            {templateId === 2 && (
              <div className="border border-slate-200 w-24 h-14 mx-auto mb-[-3.5rem] flex items-center justify-center text-[7px] text-slate-300 italic uppercase">Materai 10.000</div>
            )}
            
            <p className="font-bold underline uppercase text-[11pt] font-serif tracking-tight relative z-10">{data.parentName}</p>
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
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Users size={16} className="text-blue-500" /> <span>Parent Statement Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Izin Standar {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Format Materai {templateId === 2 && <Check size={14}/>}</button>
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
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('tour')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm flex flex-col items-center gap-1"><Tent size={12}/> TOUR</button>
                <button onClick={() => applyPreset('magang')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm flex flex-col items-center gap-1"><Briefcase size={12}/> MAGANG</button>
                <button onClick={() => applyPreset('tatib')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm flex flex-col items-center gap-1"><FileWarning size={12}/> TATIB</button>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Pihak Orang Tua</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.parentNik} onChange={e => handleDataChange('parentNik', e.target.value)} placeholder="NIK" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentPhone} onChange={e => handleDataChange('parentPhone', e.target.value)} placeholder="No. HP" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.parentAddress} onChange={e => handleDataChange('parentAddress', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="border-t pt-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><GraduationCap size={12}/> Data Anak</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childName} onChange={e => handleDataChange('childName', e.target.value)} placeholder="Nama Anak" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.childSchool} onChange={e => handleDataChange('childSchool', e.target.value)} placeholder="Sekolah" />
              </div>

              <div className="border-t pt-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Detail Pernyataan</h3>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.statement} onChange={e => handleDataChange('statement', e.target.value)} placeholder="Inti Izin/Pernyataan..." />
                 <div className="grid grid-cols-2 gap-2 pt-2">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
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