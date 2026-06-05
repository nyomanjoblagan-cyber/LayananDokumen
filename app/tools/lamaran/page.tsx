'use client';

/**
 * FILE: CoverLetterPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Lamaran Kerja (Cover Letter) otomatis
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Building2, FileText, Sparkles, Mail, Phone, MapPin, 
  ChevronDown, Check, GraduationCap, Briefcase, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LetterData {
  city: string;
  date: string;
  
  // Sender
  senderName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  
  // Receiver
  receiverName: string;
  receiverCompany: string;
  receiverAddress: string;
  
  // Content
  position: string;
  opening: string;
  body: string;
  closing: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LetterData = {
  city: 'JAKARTA',
  date: '', 
  
  senderName: 'ANDI PRATAMA, S.Kom',
  senderPhone: '0812-3456-7890',
  senderEmail: 'andi.pratama@email.com',
  senderAddress: 'Jl. Melati No. 12, Kebayoran Baru, Jakarta Selatan',
  
  receiverName: 'Bapak/Ibu HRD Manager',
  receiverCompany: 'PT. TEKNOLOGI NUSANTARA',
  receiverAddress: 'Gedung Cyber Lt. 5, Jl. Rasuna Said, Jakarta',
  
  position: 'Digital Marketing Specialist',
  
  opening: 'Berdasarkan informasi lowongan pekerjaan yang saya dapatkan di LinkedIn, saya bermaksud untuk melamar pekerjaan sebagai Digital Marketing Specialist di perusahaan yang Bapak/Ibu pimpin.',
  body: 'Saya adalah lulusan S1 Ilmu Komunikasi dengan pengalaman kerja selama 2 tahun di bidang pemasaran digital. Saya memiliki keahlian dalam mengelola media sosial, SEO, dan iklan berbayar. Di perusahaan sebelumnya, saya berhasil meningkatkan engagement rate sebesar 30% dalam waktu 6 bulan.\n\nSaya adalah pribadi yang disiplin, kreatif, dan mampu bekerja dalam tim maupun individu. Saya sangat antusias untuk dapat berkontribusi bagi kemajuan PT. Teknologi Nusantara.',
  closing: 'Bersama surat ini saya lampirkan Curriculum Vitae (CV) dan dokumen pendukung lainnya sebagai bahan pertimbangan. Saya sangat berharap dapat diberikan kesempatan wawancara untuk menjelaskan potensi diri saya lebih rinci.\n\nAtas perhatian dan kesempatan yang Bapak/Ibu berikan, saya ucapkan terima kasih.',
};

// --- 3. KOMPONEN UTAMA ---
export default function CoverLetterPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <CoverLetterBuilder />
    </Suspense>
  );
}

function CoverLetterBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<LetterData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof LetterData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const applyTextPreset = (type: 'fresh' | 'pro' | 'intern') => {
    if (type === 'fresh') {
      setData(prev => ({
        ...prev,
        opening: `Berdasarkan informasi yang saya peroleh, ${prev.receiverCompany} sedang membuka lowongan pekerjaan. Melalui surat ini, saya bermaksud melamar sebagai ${prev.position}.`,
        body: `Saya adalah lulusan baru (Fresh Graduate) dari universitas ternama. Selama kuliah, saya aktif dalam organisasi kemahasiswaan dan memiliki pengalaman magang yang relevan.\n\nMeskipun saya lulusan baru, saya memiliki semangat belajar yang tinggi dan siap berkontribusi positif bagi kemajuan tim di ${prev.receiverCompany}.`,
        closing: `Sebagai bahan pertimbangan, saya lampirkan CV dan dokumen pendukung. Besar harapan saya untuk dapat mengikuti tahap seleksi selanjutnya.\n\nAtas perhatian Bapak/Ibu, saya ucapkan terima kasih.`
      }));
    } else if (type === 'pro') {
      setData(prev => ({
        ...prev,
        opening: `Dengan hormat,\n\nSehubungan dengan informasi lowongan kerja sebagai ${prev.position} di ${prev.receiverCompany}, saya mengajukan diri untuk mengisi posisi tersebut.`,
        body: `Saya memiliki pengalaman profesional selama lebih dari 3 tahun di bidang terkait. Keahlian utama saya meliputi manajemen strategis dan optimasi performa tim. Di posisi sebelumnya, saya berhasil melampaui target KPI secara konsisten.\n\nSaya mencari tantangan baru di mana saya dapat menerapkan keahlian saya untuk mendorong pertumbuhan bisnis perusahaan Bapak/Ibu.`,
        closing: `Saya telah melampirkan resume lengkap yang merinci riwayat karir saya. Saya menantikan kesempatan wawancara untuk berdiskusi lebih lanjut.\n\nTerima kasih atas waktu dan pertimbangan Bapak/Ibu.`
      }));
    } else if (type === 'intern') {
      setData(prev => ({
        ...prev,
        opening: `Saya yang bertanda tangan di bawah ini, mahasiswa aktif semester akhir, bermaksud mengajukan permohonan Magang / Internship sebagai ${prev.position} di ${prev.receiverCompany}.`,
        body: `Saya memiliki ketertarikan besar pada industri ini dan ingin mempraktikkan ilmu yang telah saya pelajari. Saya memiliki kemampuan teknis dasar yang kuat dan etos kerja yang disiplin.\n\nSaya bersedia mengikuti segala peraturan magang yang berlaku demi menimba ilmu dan pengalaman profesional.`,
        closing: `Besar harapan saya agar permohonan magang ini dapat diterima. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.`
      }));
    }
  };

  const activeTemplateName = templateId === 1 ? 'Formal' : 'Modern';

  const LetterContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] w-[210mm] min-h-[296mm] p-[20mm] print:p-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
        {templateId === 1 && (
          <div className="flex flex-col h-full">
              <div className="text-right mb-6">{data.city}, {formatDateSafe(data.date)}</div>
              <div className="mb-6">
                  <div className="mb-4">
                      <div className="flex"><span className="w-20">Perihal</span><span>: Lamaran Pekerjaan</span></div>
                      <div className="flex"><span className="w-20">Lampiran</span><span>: 1 (Satu) Berkas</span></div>
                  </div>
                  <div>
                      Kepada Yth,<br/>
                      <strong>{data.receiverName}</strong><br/>
                      {data.receiverCompany}<br/>
                      <span className="text-slate-600">{data.receiverAddress}</span>
                  </div>
              </div>
              <div className="flex-grow">
                  <div className="mb-3">Dengan hormat,</div>
                  <div className="mb-3 whitespace-pre-line text-justify">{data.opening}</div>
                  <div className="mb-3 whitespace-pre-line text-justify">{data.body}</div>
                  <div className="mb-6 whitespace-pre-line text-justify">{data.closing}</div>
              </div>
              <div className="mt-4 break-inside-avoid">
                  <p className="mb-20">Hormat saya,</p>
                  <p className="font-bold underline uppercase">{data.senderName}</p>
              </div>
          </div>
        )}

        {templateId === 2 && (
          <div className="font-sans text-[10.5pt] leading-normal flex flex-col h-full">
              <div className="border-b-4 border-slate-800 pb-4 mb-8 flex justify-between items-end shrink-0">
                  <div>
                      <h1 className="text-2xl font-black uppercase tracking-wide text-slate-800 mb-1">{data.senderName}</h1>
                      <div className="text-sm font-bold text-blue-600 uppercase tracking-widest">{data.position}</div>
                  </div>
                  <div className="text-right text-[9pt] text-slate-500 space-y-0.5 print:text-black font-sans">
                      <div className="flex justify-end items-center gap-2"><Phone size={10}/> {data.senderPhone}</div>
                      <div className="flex justify-end items-center gap-2"><Mail size={10}/> {data.senderEmail}</div>
                      <div className="flex justify-end items-center gap-2 text-right"><MapPin size={10} className="shrink-0"/> {data.city}</div>
                  </div>
              </div>
              <div className="mb-8 shrink-0 break-inside-avoid">
                  <div className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-sans">{formatDateSafe(data.date)}</div>
                  <div className="font-bold text-lg">{data.receiverName}</div>
                  <div className="font-bold text-slate-600 uppercase text-sm">{data.receiverCompany}</div>
              </div>
              <div className="space-y-4 text-justify text-slate-700 text-sm flex-grow print:text-black">
                  <div className="font-bold text-slate-800">Dengan hormat,</div>
                  <div className="whitespace-pre-line">{data.opening}</div>
                  <div className="whitespace-pre-line pl-4 border-l-2 border-slate-200 italic text-slate-500 print:text-black">{data.body}</div>
                  <div className="whitespace-pre-line">{data.closing}</div>
              </div>
              <div className="mt-12 shrink-0 break-inside-avoid">
                  <div className="font-serif italic text-xl text-slate-400 mb-2">Hormat Saya,</div>
                  <div className="font-bold text-lg text-slate-800 uppercase tracking-tight">{data.senderName}</div>
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

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <FileText size={16} className="text-blue-500" /> <span className="uppercase tracking-tighter">Cover Letter Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Surat Resmi {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Modern Letter {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Surat</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 grid grid-cols-3 gap-2">
                <button onClick={() => applyTextPreset('fresh')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase">Fresh</button>
                <button onClick={() => applyTextPreset('pro')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase">Pro</button>
                <button onClick={() => applyTextPreset('intern')} className="bg-white p-2 rounded text-[9px] font-black shadow-sm uppercase">Intern</button>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Identitas Pelamar</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} placeholder="Nama Lengkap" />
                <div className="grid grid-cols-2 gap-2">
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderPhone} onChange={e => handleDataChange('senderPhone', e.target.value)} placeholder="No. HP" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderEmail} onChange={e => handleDataChange('senderEmail', e.target.value)} placeholder="Email" />
                </div>
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Tujuan Lamaran</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.receiverCompany} onChange={e => handleDataChange('receiverCompany', e.target.value)} placeholder="Nama Perusahaan" />
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Posisi Yang Dilamar" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Konten Surat</h3>
                <textarea className="w-full p-2 border rounded-lg text-xs h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none" value={data.opening} onChange={e => handleDataChange('opening', e.target.value)} placeholder="Paragraf Pembuka" />
                <textarea className="w-full p-2 border rounded-lg text-xs h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none" value={data.body} onChange={e => handleDataChange('body', e.target.value)} placeholder="Paragraf Isi" />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <LetterContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><LetterContent /></div></div>
    </div>
  );
}