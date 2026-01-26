'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  User, Building2, FileText, Sparkles, Mail, Phone, MapPin, 
  ChevronDown, Check, GraduationCap, Briefcase, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// import AdsterraBanner from '@/components/AdsterraBanner'; 

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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- LOGIC AUTO TEXT ---
  const applyTextPreset = (type: 'fresh' | 'pro' | 'intern') => {
    if (type === 'fresh') {
      setData(prev => ({
        ...prev,
        opening: `Berdasarkan informasi yang saya peroleh, ${prev.receiverCompany} sedang membuka lowongan pekerjaan. Melalui surat ini, saya bermaksud melamar sebagai ${prev.position}.`,
        body: `Saya adalah lulusan baru (Fresh Graduate) dari Universitas Indonesia jurusan Manajemen. Selama kuliah, saya aktif dalam organisasi himpunan mahasiswa dan memiliki pengalaman magang di perusahaan startup.\n\nMeskipun saya lulusan baru, saya memiliki semangat belajar yang tinggi, cepat beradaptasi, dan siap bekerja keras. Saya yakin bekal ilmu yang saya miliki dapat memberikan kontribusi positif bagi perusahaan.`,
        closing: `Sebagai bahan pertimbangan, saya lampirkan CV dan dokumen pendukung. Besar harapan saya untuk dapat mengikuti tahap seleksi selanjutnya.\n\nAtas perhatian Bapak/Ibu, saya ucapkan terima kasih.`
      }));
    } else if (type === 'pro') {
      setData(prev => ({
        ...prev,
        opening: `Dengan hormat,\n\nSehubungan dengan informasi lowongan kerja sebagai ${prev.position} di ${prev.receiverCompany}, saya mengajukan diri untuk mengisi posisi tersebut.`,
        body: `Saya memiliki pengalaman profesional selama 5 tahun di bidang terkait. Saya terbiasa memimpin tim, menyusun strategi, dan mencapai target perusahaan. Keahlian utama saya meliputi manajemen proyek, analisis data, dan negosiasi.\n\nSaya mencari tantangan baru di mana saya dapat menerapkan pengalaman saya untuk mendorong pertumbuhan bisnis perusahaan Bapak/Ibu.`,
        closing: `Saya telah melampirkan resume lengkap yang merinci riwayat karir saya. Saya menantikan kesempatan untuk berdiskusi tentang bagaimana saya dapat memberikan nilai tambah bagi ${prev.receiverCompany}.\n\nTerima kasih atas waktu dan pertimbangan Bapak/Ibu.`
      }));
    } else if (type === 'intern') {
      setData(prev => ({
        ...prev,
        opening: `Saya yang bertanda tangan di bawah ini, mahasiswa semester akhir jurusan Teknik Informatika, bermaksud mengajukan permohonan Magang / Internship sebagai ${prev.position}.`,
        body: `Saya memiliki ketertarikan besar pada industri ini dan ingin mempraktikkan ilmu yang telah saya pelajari di bangku kuliah. Saya menguasai dasar-dasar pemrograman dan desain grafis, serta memiliki etos kerja yang baik.\n\nSaya bersedia mengikuti segala peraturan dan ketentuan magang yang berlaku di ${prev.receiverCompany} untuk menimba ilmu dan pengalaman.`,
        closing: `Besar harapan saya agar permohonan magang ini dapat diterima. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.`
      }));
    }
  };

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Surat Resmi (Formal)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
            Modern Letter
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Surat Resmi' : 'Modern Letter';

  // --- KOMPONEN ISI SURAT ---
  const LetterContent = () => (
    // FIX: Print Padding & Layout. Removed outer shadow to prevent stacking issue in preview.
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] w-[210mm] min-h-[296mm] p-[20mm] print:p-[20mm] shadow-2xl print:shadow-none print:m-0 mx-auto">
      
      {/* TEMPLATE 1: FORMAL INDONESIA */}
      {templateId === 1 && (
        <div className="flex flex-col h-full">
            {/* Tanggal */}
            <div className="text-right mb-6">
                {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}
            </div>

            {/* Tujuan */}
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

            {/* Isi */}
            <div className="flex-grow">
                <div className="mb-3">Dengan hormat,</div>
                <div className="mb-3 whitespace-pre-line text-justify">{data.opening}</div>
                <div className="mb-3 whitespace-pre-line text-justify">{data.body}</div>
                <div className="mb-6 whitespace-pre-line text-justify">{data.closing}</div>
            </div>

            {/* TTD */}
            <div className="mt-4" style={{ pageBreakInside: 'avoid' }}>
                <p className="mb-20">Hormat saya,</p>
                <p className="font-bold underline uppercase">{data.senderName}</p>
            </div>
        </div>
      )}

      {/* TEMPLATE 2: MODERN CREATIVE */}
      {templateId === 2 && (
        <div className="font-sans text-[10.5pt] leading-normal flex flex-col h-full">
            {/* Modern Header */}
            <div className="border-b-4 border-slate-800 pb-4 mb-8 flex justify-between items-end shrink-0">
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-wide text-slate-800 mb-1">{data.senderName}</h1>
                    <div className="text-sm font-bold text-blue-600 uppercase tracking-widest">{data.position}</div>
                </div>
                <div className="text-right text-xs text-slate-500 space-y-1 print:text-black">
                    <div className="flex justify-end items-center gap-2"><Phone size={12}/> {data.senderPhone}</div>
                    <div className="flex justify-end items-center gap-2"><Mail size={12}/> {data.senderEmail}</div>
                    <div className="flex justify-end items-center gap-2 text-right w-64"><MapPin size={12} className="shrink-0"/> {data.senderAddress}</div>
                </div>
            </div>

            <div className="mb-8 shrink-0">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1 print:text-black">{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'}) : '...'}</div>
                <div className="font-bold text-lg">{data.receiverName}</div>
                <div className="font-bold text-slate-600 print:text-black">{data.receiverCompany}</div>
                <div className="text-slate-500 text-xs w-2/3 print:text-black">{data.receiverAddress}</div>
            </div>

            <div className="space-y-4 text-justify text-slate-700 text-sm flex-grow print:text-black">
                <div className="font-bold text-slate-800 print:text-black">Dengan hormat,</div>
                <div className="whitespace-pre-line">{data.opening}</div>
                <div className="whitespace-pre-line pl-4 border-l-2 border-slate-200 italic text-slate-600 print:text-black print:border-black">{data.body}</div>
                <div className="whitespace-pre-line">{data.closing}</div>
            </div>

            <div className="mt-12 shrink-0" style={{ pageBreakInside: 'avoid' }}>
                <div className="font-serif italic text-xl text-slate-500 mb-2 print:text-black">Hormat Saya,</div>
                <div className="font-bold text-lg text-slate-800 uppercase print:text-black">{data.senderName}</div>
            </div>
            
            {/* Footer Decoration */}
            <div className="absolute bottom-10 left-0 w-full text-center shrink-0">
                <div className="border-t border-slate-100 w-2/3 mx-auto pt-4 text-[9px] text-slate-400 uppercase tracking-widest print:text-black print:border-black">
                    Application for {data.position} at {data.receiverCompany}
                </div>
            </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 print:bg-white print:m-0">
      
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
               <Briefcase size={16} className="text-emerald-500" /> <span>COVER LETTER BUILDER</span>
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
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Surat</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              {/* Quick Generator */}
              <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                 <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                    <Sparkles size={14} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis (Auto-Text)</h3>
                 </div>
                 <div className="p-4 grid grid-cols-3 gap-2">
                    <button onClick={() => applyTextPreset('fresh')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                       <GraduationCap size={14}/> Fresh Grad
                    </button>
                    <button onClick={() => applyTextPreset('pro')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                       <Briefcase size={14}/> Pro
                    </button>
                    <button onClick={() => applyTextPreset('intern')} className="bg-white hover:bg-purple-100 border border-purple-200 text-purple-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                       <User size={14}/> Magang
                    </button>
                 </div>
              </div>

              {/* Data Pelamar */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <User size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Data Pelamar</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap & Gelar</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">No. HP / WA</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.senderPhone} onChange={e => handleDataChange('senderPhone', e.target.value)} />
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Email</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.senderEmail} onChange={e => handleDataChange('senderEmail', e.target.value)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Domisili</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.senderAddress} onChange={e => handleDataChange('senderAddress', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* Tujuan & Posisi */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <Building2 size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Tujuan & Posisi</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Kota & Tanggal</label>
                          <div className="flex gap-1">
                             <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                             <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                          </div>
                       </div>
                       <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Melamar Sebagai</label>
                          <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" value={data.position} onChange={e => handleDataChange('position', e.target.value)} />
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Penerima (Yth.)</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" placeholder="Yth. Bapak/Ibu HRD..." value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan Tujuan</label>
                       <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" value={data.receiverCompany} onChange={e => handleDataChange('receiverCompany', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Perusahaan (Opsional)</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* Isi Surat */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <FileText size={14} className="text-blue-600" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase">Isi Surat</h3>
                 </div>
                 <div className="p-4 space-y-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Pembuka (Alasan Melamar)</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none" value={data.opening} onChange={e => handleDataChange('opening', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Isi Utama (Promosi Diri)</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-32 resize-none" value={data.body} onChange={e => handleDataChange('body', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Penutup (Harapan)</label>
                       <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 resize-none" value={data.closing} onChange={e => handleDataChange('closing', e.target.value)} />
                    </div>
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
                   <LetterContent />
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
         <div style={{ width: '210mm', minHeight: 'auto' }} className="bg-white flex flex-col">
            <LetterContent />
         </div>
      </div>

    </div>
  );
}
