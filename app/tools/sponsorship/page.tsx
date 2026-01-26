'use client';

/**
 * FILE: SponsorshipPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Proposal Sponsorship Event (Sponsorship Pitch Letter)
 * FEATURES:
 * - Dual Template (Organization Formal vs Business Modern)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Target, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Briefcase, Zap, Banknote,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface SponsorData {
  city: string;
  date: string;
  docNo: string;
  
  // Organisasi
  orgName: string;
  orgAddress: string;
  contactPerson: string;
  
  // Event
  eventName: string;
  eventDate: string;
  eventLocation: string;
  targetAudience: string;
  
  // Target Sponsor
  targetCompany: string;
  companyAddress: string;
  
  // Penawaran
  packageSelected: string;
  benefitSummary: string;
  investmentValue: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SponsorData = {
  city: 'DENPASAR',
  date: '', // Diisi useEffect
  docNo: '04/SPONSOR/HIMATIKA/I/2026',
  
  orgName: 'HIMPUNAN MAHASISWA TEKNOLOGI INFORMASI',
  orgAddress: 'Kampus Sudirman, Jl. PB Sudirman, Denpasar, Bali',
  contactPerson: 'BAGUS RAMADHAN (0812-3456-7890)',
  
  eventName: 'TECHFEST 2026: INNOVATION FOR BALI',
  eventDate: '25 - 27 Maret 2026',
  eventLocation: 'Gedung Ksirarnawa, Art Center Denpasar',
  targetAudience: '1.500 Mahasiswa & Pelaku Industri Kreatif',
  
  targetCompany: 'MARKETING MANAGER PT. TELKOM INDONESIA',
  companyAddress: 'Jl. Teuku Umar No. 10, Denpasar',
  
  packageSelected: 'PLATINUM SPONSORSHIP',
  benefitSummary: 'Pemasangan Logo Utama di Backdrop acara, Ad-Lips oleh MC setiap 30 menit, Space Stand 3x3m di area utama, dan publikasi eksklusif di seluruh media sosial resmi event.',
  investmentValue: 'Rp 15.000.000,-'
};

// --- 3. KOMPONEN UTAMA ---
export default function SponsorshipPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Proposal...</div>}>
      <SponsorshipBuilder />
    </Suspense>
  );
}

function SponsorshipBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<SponsorData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof SponsorData, val: any) => {
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
            Format Organisasi
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Bisnis
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Format Organisasi' : 'Format Bisnis';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAT ORGANISASI */
        <div className="flex flex-col h-full">
            {/* HEADER SURAT */}
            <div className="flex justify-between items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
                <div className="flex items-center gap-4 flex-grow">
                    {logo ? (
                    <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0 block print:block" />
                    ) : (
                    <div className="w-16 h-16 bg-blue-50 border-2 border-dashed border-blue-200 rounded flex items-center justify-center text-blue-300 shrink-0 print:hidden">
                        <Zap size={24} />
                    </div>
                    )}
                    <div className="text-left">
                    <h1 className="text-[14pt] font-black uppercase tracking-tighter text-blue-900 leading-none print:text-black">{data.orgName}</h1>
                    <p className="text-[8.5pt] font-sans mt-1 italic text-slate-600 print:text-black leading-tight">{data.orgAddress}</p>
                    </div>
                </div>
                <div className="text-right border-l-2 border-slate-200 pl-6 ml-6 shrink-0 print:border-slate-400">
                    <p className="text-[10pt] font-bold uppercase tracking-widest text-slate-800 print:text-black">PROPOSAL</p>
                    <p className="text-[8pt] font-mono text-slate-500 italic print:text-black">No: {data.docNo}</p>
                </div>
            </div>

            {/* TUJUAN */}
            <div className="space-y-6 flex-grow overflow-hidden text-left">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p>Hal: <b>Permohonan Sponsorship & Kerja Sama</b></p>
                        <div className="pt-4 leading-relaxed">
                        <p>Yth. <b>{data.targetCompany}</b></p>
                        <p>{data.companyAddress}</p>
                        <p>Di Tempat</p>
                        </div>
                    </div>
                    <p className="text-right font-bold">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
                </div>

                <p>Dengan hormat,</p>
                <p className="text-justify leading-relaxed">Sehubungan dengan penyelenggaraan kegiatan <b>{data.eventName}</b>, kami dari panitia pelaksana bermaksud menawarkan kemitraan strategis kepada perusahaan Bapak/Ibu yang akan dilaksanakan pada:</p>
                
                <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-blue-800 pl-6 py-1 bg-slate-50 print:bg-transparent print:border-black italic">
                    <div className="grid grid-cols-[120px_10px_1fr]"><span>Waktu Pelaks.</span><span>:</span><span className="font-bold">{data.eventDate}</span></div>
                    <div className="grid grid-cols-[120px_10px_1fr]"><span>Lokasi Acara</span><span>:</span><span>{data.eventLocation}</span></div>
                    <div className="grid grid-cols-[120px_10px_1fr]"><span>Estimasi Target</span><span>:</span><span>{data.targetAudience}</span></div>
                </div>

                <p className="text-justify leading-relaxed">Melalui proposal ini, kami menawarkan paket <b>{data.packageSelected}</b> dengan nilai investasi sebesar <b>{data.investmentValue}</b>. Adapun benefit utama yang akan diterima oleh perusahaan adalah:</p>

                <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 italic text-[10.5pt] leading-relaxed print:bg-transparent print:border-black">
                    "{data.benefitSummary}"
                </div>

                <p className="text-justify leading-relaxed">Besar harapan kami agar Bapak/Ibu dapat bergabung dalam menyukseskan acara ini. Kami siap untuk mendiskusikan detail teknis kerja sama ini lebih lanjut. Atas perhatian dan dukungannya, kami ucapkan terima kasih.</p>
            </div>

            {/* TANDA TANGAN */}
            <div className="shrink-0 mt-8 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
                <table className="w-full table-fixed text-center">
                <tbody>
                    <tr className="uppercase text-[8.5pt] font-black text-slate-400 tracking-[0.2em] print:text-black">
                        <td className="pb-20">Ketua Panitia,</td>
                        <td className="pb-20">Sekretaris,</td>
                    </tr>
                    <tr className="font-bold text-[11pt]">
                        <td className="underline uppercase tracking-tight">{data.contactPerson.split(' (')[0]}</td>
                        <td className="underline uppercase tracking-tight">(...........................)</td>
                    </tr>
                </tbody>
                </table>
                <div className="mt-8 text-[8.5pt] text-slate-400 text-center font-sans italic print:text-black border-t pt-4 print:border-black">
                    Konfirmasi Kerja Sama: {data.contactPerson}
                </div>
            </div>
        </div>
      ) : (
        /* TEMPLATE 2: FORMAT BISNIS MODERN */
        <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-12 border-b-2 border-slate-900 pb-4 shrink-0">
               <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1">{data.eventName}</h1>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest print:text-black">Sponsorship Proposal</p>
               </div>
               <div className="text-right">
                  <p className="font-bold text-lg">{data.investmentValue}</p>
                  <p className="text-xs uppercase">{data.packageSelected}</p>
               </div>
            </div>

            <div className="flex-grow space-y-8 text-justify">
               <div>
                  <h3 className="font-bold uppercase text-xs mb-2 text-slate-400 print:text-black">Executive Summary</h3>
                  <p className="leading-relaxed">
                     Dear <b>{data.targetCompany}</b>,<br/><br/>
                     We are excited to invite you to be a key partner in our upcoming event, <b>{data.eventName}</b>. This event is set to bring together <b>{data.targetAudience}</b> at {data.eventLocation} on {data.eventDate}.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-4 border border-slate-200 print:bg-transparent print:border-black">
                     <h3 className="font-bold uppercase text-xs mb-2 text-blue-600 print:text-black">Why Sponsor Us?</h3>
                     <p className="text-sm leading-relaxed">{data.benefitSummary}</p>
                  </div>
                  <div className="bg-slate-50 p-4 border border-slate-200 print:bg-transparent print:border-black">
                     <h3 className="font-bold uppercase text-xs mb-2 text-blue-600 print:text-black">Event Details</h3>
                     <ul className="text-sm space-y-1">
                        <li><b>Date:</b> {data.eventDate}</li>
                        <li><b>Venue:</b> {data.eventLocation}</li>
                        <li><b>Organizer:</b> {data.orgName}</li>
                     </ul>
                  </div>
               </div>

               <div>
                  <h3 className="font-bold uppercase text-xs mb-2 text-slate-400 print:text-black">Call to Action</h3>
                  <p className="leading-relaxed">
                     We believe this partnership will provide significant exposure for your brand. Let's create something amazing together.
                  </p>
               </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 print:border-black flex justify-between items-end shrink-0" style={{ pageBreakInside: 'avoid' }}>
               <div>
                  <p className="font-bold uppercase text-xs text-slate-400 mb-8 print:text-black">Authorized Signature</p>
                  <p className="font-bold border-b border-black inline-block pb-1">{data.contactPerson.split(' (')[0]}</p>
                  <p className="text-xs mt-1">Event Director</p>
               </div>
               <div className="text-right text-xs">
                  <p>Contact Us:</p>
                  <p className="font-bold">{data.contactPerson}</p>
                  <p>{data.orgAddress}</p>
               </div>
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Zap size={16} /> <span>Sponsorship Pitcher Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative font-sans">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print Proposal</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Data Proposal</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Penyelenggara</h3>
                 <div className="flex items-center gap-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus Logo</button>}
                    <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.orgName} onChange={e => handleDataChange('orgName', e.target.value)} />
                 </div>
                 <textarea className="w-full p-2 border rounded text-[10px] h-14" value={data.orgAddress} onChange={e => handleDataChange('orgAddress', e.target.value)} placeholder="Alamat Sekretariat" />
                 <input className="w-full p-2 border rounded text-xs" value={data.contactPerson} onChange={e => handleDataChange('contactPerson', e.target.value)} placeholder="Contact Person" />
                 <input className="w-full p-2 border rounded text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="No. Proposal" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Zap size={12}/> Detail Event</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} placeholder="Waktu Pelaksanaan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} placeholder="Lokasi Acara" />
                 <input className="w-full p-2 border rounded text-xs" value={data.targetAudience} onChange={e => handleDataChange('targetAudience', e.target.value)} placeholder="Target Peserta" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
                 <h3 className="text-[10px] font-black uppercase text-slate-500 border-b pb-1 flex items-center gap-2"><Target size={12}/> Target Perusahaan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.targetCompany} onChange={e => handleDataChange('targetCompany', e.target.value)} placeholder="Nama Perusahaan" />
                 <input className="w-full p-2 border rounded text-xs" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} placeholder="Alamat Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Banknote size={12}/> Penawaran</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase text-blue-700" value={data.packageSelected} onChange={e => handleDataChange('packageSelected', e.target.value)} placeholder="Paket Sponsor" />
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed italic" value={data.benefitSummary} onChange={e => handleDataChange('benefitSummary', e.target.value)} placeholder="Ringkasan Benefit" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.investmentValue} onChange={e => handleDataChange('investmentValue', e.target.value)} placeholder="Nilai Investasi" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
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
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
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
