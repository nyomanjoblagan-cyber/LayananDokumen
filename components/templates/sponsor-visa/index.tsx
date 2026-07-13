'use client';

/**
 * FILE: SponsorVisaPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Sponsor Visa (Sponsorship Letter)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Plane, UserCircle2, Globe2, Landmark,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, X, Briefcase, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface VisaData {
  city: string;
  date: string;
  sponsorName: string;
  sponsorJob: string;
  sponsorAddress: string;
  relation: string; 
  applicantName: string;
  passportNo: string;
  destinationCountry: string;
  visitPurpose: string;
  duration: string;
  travelDate: string;
  embassyName: string;
  embassyAddress: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: VisaData = {
  city: 'Jakarta',
  date: '',
  sponsorName: 'HENDRA KUSUMA',
  sponsorJob: 'CEO of PT. Maju Jaya',
  sponsorAddress: 'Jl. Kemang Raya No. 45, Jakarta Selatan',
  relation: 'Father', 
  applicantName: 'RIZKY KUSUMA',
  passportNo: 'X1234567',
  destinationCountry: 'Japan',
  visitPurpose: 'Family Holiday',
  duration: '14 Days',
  travelDate: '2026-03-15',
  embassyName: 'Embassy of Japan',
  embassyAddress: 'Jakarta, Indonesia'
};

export default function SponsorVisaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Memuat Editor...</div>}>
      <VisaSponsorBuilder />
    </Suspense>
  );
}

function VisaSponsorBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<VisaData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof VisaData, val: any) => {
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
    if(typeof window !== 'undefined' && window.confirm('Reset semua data ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? "Formal Personal" : "Business Sponsored";

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Formal Personal
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Business Sponsored
        </button>
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        <div className="flex justify-between items-start mb-10 shrink-0 font-sans">
          <div className="shrink-0">
            {logo ? (
              <img src={logo} alt="Kop" className="h-20 w-auto object-contain" />
            ) : (
              <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 print:hidden">
                 <Plane size={24} />
              </div>
            )}
          </div>
          <div className="text-right text-[10pt] font-black uppercase tracking-widest text-slate-400 print:text-black">
            {data.city}, {formatDateSafe(data.date)}
          </div>
        </div>

        <div className="mb-8 space-y-1 text-left shrink-0 font-sans text-[10.5pt]">
          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-[0.3em] mb-1">To: Visa Section</p>
          <p className="font-black uppercase tracking-tight text-slate-900 text-[11pt]">{data.embassyName}</p>
          <p className="italic text-slate-600 print:text-black leading-snug">{data.embassyAddress}</p>
        </div>

        <div className="text-center mb-10 shrink-0 leading-tight">
          <h1 className="text-2xl font-black underline uppercase decoration-2 underline-offset-8 tracking-widest text-slate-900">SPONSORSHIP LETTER</h1>
        </div>

        <div className="flex-grow space-y-6 overflow-visible text-justify leading-relaxed">
          <p>Dear Sir/Madam,</p>
          <p>I, the undersigned below / <span className="italic text-slate-500 print:text-black">Saya yang bertanda tangan di bawah ini</span>:</p>
          
          <div className="ml-8 space-y-1.5 font-sans border-l-4 border-slate-100 pl-8 py-1 break-inside-avoid print:border-slate-300 italic text-[10pt]">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase text-slate-900 not-italic">{data.sponsorName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Occupation</span><span>:</span><span>{data.sponsorJob}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Address</span><span>:</span><span>{data.sponsorAddress}</span></div>
          </div>

          <p>Hereby declare that I am the <strong>{data.relation}</strong> of / <span className="italic text-slate-500 print:text-black">Dengan ini menyatakan bahwa saya adalah <strong>{data.relation}</strong> dari</span>:</p>
          
          <div className="ml-8 space-y-1.5 font-sans border-l-4 border-blue-50 pl-8 py-1 break-inside-avoid print:border-slate-300 italic text-[10pt]">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase text-slate-900 not-italic tracking-tight">{data.applicantName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Passport No.</span><span>:</span><span className="font-mono font-black text-blue-700 print:text-black tracking-widest">{data.passportNo}</span></div>
          </div>

          <p>
            I would like to guarantee that my {data.relation} is traveling to <strong>{data.destinationCountry}</strong> for the purpose of <strong>{data.visitPurpose}</strong> for a duration of <strong>{data.duration}</strong>, starting from <strong>{formatDateSafe(data.travelDate)}</strong>.
          </p>

          <div className="italic text-slate-800 bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 leading-relaxed print:bg-transparent print:border-2 print:border-black break-inside-avoid">
            "I guarantee that I will be fully responsible for all of his/her expenses during the entire trip and stay in your country, and I also guarantee that he/she will return to Indonesia promptly after the visit is over."
          </div>
          
          <p>Thank you for your kind attention and assistance regarding this visa application.</p>
        </div>

        <div className="shrink-0 mt-10 pt-10 border-t-2 border-slate-50 print:border-black break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex justify-end text-center font-sans">
            <div className="w-80">
              <p className="mb-2 font-black uppercase text-[8pt] tracking-[0.3em] text-slate-300 print:text-black">Sincerely Yours,</p>
              <div className="mt-6 mb-2 flex flex-col items-center">
                 <div className="border border-slate-200 w-24 h-16 flex items-center justify-center text-[7pt] text-slate-300 italic print:border-black print:text-black uppercase mb-4">Stamp Duty / Materai 10.000</div>
                 <p className="font-black underline uppercase text-[11pt] tracking-tighter text-slate-900">{data.sponsorName}</p>
                 <p className="text-[9pt] font-bold text-blue-600 mt-1 uppercase tracking-widest">{data.sponsorJob}</p>
              </div>
            </div>
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
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Globe2 size={16} /> <span>Visa Sponsor Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Visa</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Landmark size={12}/> Embassy Information</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.embassyName} onChange={e => handleDataChange('embassyName', e.target.value)} placeholder="Embassy of..." />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.embassyAddress} onChange={e => handleDataChange('embassyAddress', e.target.value)} placeholder="Embassy Address" />
                 <div className="flex items-center gap-4 pt-2 border-t">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={18} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <p className="text-[9px] text-slate-400 leading-tight">Upload Logo/Kop Instansi (Opsional)</p>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Sponsor & Applicant</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.sponsorName} onChange={e => handleDataChange('sponsorName', e.target.value)} placeholder="Sponsor Full Name" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.sponsorJob} onChange={e => handleDataChange('sponsorJob', e.target.value)} placeholder="Sponsor Occupation" />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none border-blue-100" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} placeholder="Applicant Full Name" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.passportNo} onChange={e => handleDataChange('passportNo', e.target.value)} placeholder="Passport No." />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.relation} onChange={e => handleDataChange('relation', e.target.value)} placeholder="Relation (Cth: Father)" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Plane size={12}/> Travel Details</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} placeholder="Destination Country" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.visitPurpose} onChange={e => handleDataChange('visitPurpose', e.target.value)} placeholder="Visit Purpose" />
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">TRAVEL DATE</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.travelDate} onChange={e => handleDataChange('travelDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400">DURATION</label><input className="w-full p-2 border rounded-lg text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Cth: 14 Days" /></div>
                 </div>
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="City" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold text-xs uppercase">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Editor</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}