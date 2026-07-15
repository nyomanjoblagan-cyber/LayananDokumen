'use client';

/**
 * FILE: SponsorVisaPage.tsx
 * STATUS: PRODUCTION READY (OFFICIAL EMBASSY GRADE)
 * DESC: Generator Surat Sponsor Visa (Sponsorship Letter) dengan Desain Resmi Kedubes
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Plane, UserCircle2, Globe2, Landmark,
  LayoutTemplate, ChevronDown, Edit3, ImagePlus, RotateCcw,
  ShieldCheck, FileBadge2, Building2
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
  refNumber: string;
  sponsorCompany: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: VisaData = {
  city: 'Jakarta',
  date: '',
  sponsorName: 'HENDRA KUSUMA',
  sponsorJob: 'Chief Executive Officer',
  sponsorCompany: 'PT. MAJU JAYA INDONESIA',
  sponsorAddress: 'Jl. Jend. Sudirman Kav. 45, Jakarta Selatan 12920',
  relation: 'Father', 
  applicantName: 'RIZKY KUSUMA',
  passportNo: 'X1234567',
  destinationCountry: 'Japan',
  visitPurpose: 'Family Holiday',
  duration: '14 Days',
  travelDate: '2026-03-15',
  embassyName: 'Embassy of Japan',
  embassyAddress: 'Jl. M.H. Thamrin No.24, Jakarta Pusat',
  refNumber: 'REF/VISA/2026/001-XX'
};

export default function SponsorVisaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Loading Secure Environment...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Are you sure you want to reset all official data?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? "Official Embassy Letter" : "Corporate Sponsorship";

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900 text-white border border-slate-700 rounded-xl shadow-2xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-colors ${templateId === 1 ? 'text-emerald-400' : 'text-slate-300'}`}>
            <ShieldCheck size={16} className={templateId === 1 ? 'text-emerald-400' : 'text-slate-500'} /> 
            Official Letter
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-colors ${templateId === 2 ? 'text-blue-400' : 'text-slate-300'}`}>
            <Building2 size={16} className={templateId === 2 ? 'text-blue-400' : 'text-slate-500'} /> 
            Corporate Letter
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
      <div className={`bg-white flex flex-col box-border text-black leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)] print:shadow-none print:m-0 mx-auto font-serif text-[11pt] relative overflow-hidden`}>
        
        {/* WATERMARK BACKGROUND PADA TEMPLATE 1 */}
        {templateId === 1 && (
          <div className="absolute inset-0 flex justify-center items-center opacity-[0.03] pointer-events-none print:opacity-[0.05] z-0">
             <ShieldCheck size={600} />
          </div>
        )}

        <div className="relative z-10">
          {/* HEADER RESMI */}
          <div className="flex justify-between items-center mb-6 pb-6 border-b-4 border-double border-slate-900 shrink-0">
            <div className="flex-1">
              {logo ? (
                <img src={logo} alt="Official Seal" className="h-24 w-auto object-contain" />
              ) : (
                <div className="w-20 h-20 bg-slate-50 border border-slate-300 rounded-full flex flex-col items-center justify-center text-slate-300 print:hidden relative">
                   <FileBadge2 size={28} className="mb-1" />
                   <span className="text-[6px] font-sans tracking-widest uppercase text-slate-400 font-bold">SEAL</span>
                </div>
              )}
            </div>
            <div className="text-right flex-1">
               {templateId === 2 && (
                 <div className="mb-2">
                    <h2 className="text-xl font-black uppercase tracking-widest text-slate-900">{data.sponsorCompany}</h2>
                 </div>
               )}
               <p className="text-[10pt] uppercase tracking-widest text-slate-500 font-semibold mb-1">LETTER OF SPONSORSHIP</p>
               <p className="text-[9pt] font-mono text-slate-700">Ref: <span className="font-bold text-black">{data.refNumber}</span></p>
            </div>
          </div>

          <div className="flex justify-between items-start mb-8 text-[11pt]">
             <div className="space-y-1">
                <p className="font-bold uppercase tracking-widest text-[9pt]">Date of Issuance:</p>
                <p className="font-medium">{formatDateSafe(data.date)}</p>
             </div>
             <div className="text-right space-y-1">
                <p className="font-bold uppercase tracking-widest text-[9pt]">Place of Issuance:</p>
                <p className="font-medium uppercase">{data.city}</p>
             </div>
          </div>

          {/* ALAMAT TUJUAN */}
          <div className="mb-10 text-left shrink-0">
            <p className="mb-2">To:</p>
            <p className="font-bold text-[12pt] uppercase tracking-wider">{data.embassyName}</p>
            <p className="text-slate-800 leading-snug">{data.embassyAddress}</p>
          </div>

          {/* JUDUL SURAT */}
          <div className="text-center mb-10 shrink-0 leading-tight">
            <h1 className="text-[16pt] font-bold uppercase tracking-[0.2em] underline decoration-[1.5px] underline-offset-8">SPONSORSHIP DECLARATION</h1>
          </div>

          {/* ISI KONTEN */}
          <div className="flex-grow space-y-6 overflow-visible text-justify leading-relaxed">
            <p>Dear Sir/Madam,</p>
            <p>I, the undersigned below, formally declare and guarantee for the visa application process:</p>
            
            {/* SPONSOR BOX */}
            <div className="my-6 border border-slate-300 p-5 rounded-none bg-slate-50/50 print:bg-transparent">
                <p className="font-bold uppercase tracking-widest text-[9pt] mb-4 border-b border-slate-300 pb-2">Part 1: Sponsor Information</p>
                <div className="space-y-2">
                  <div className="grid grid-cols-[160px_15px_1fr]"><span>Full Name</span><span>:</span><span className="font-bold uppercase">{data.sponsorName}</span></div>
                  <div className="grid grid-cols-[160px_15px_1fr]"><span>Occupation</span><span>:</span><span className="font-medium">{data.sponsorJob} {templateId === 2 && `at ${data.sponsorCompany}`}</span></div>
                  <div className="grid grid-cols-[160px_15px_1fr] align-top"><span>Residential Address</span><span>:</span><span>{data.sponsorAddress}</span></div>
                </div>
            </div>

            <p>Hereby acknowledge and confirm that I am the <strong>{data.relation}</strong> of the following applicant:</p>
            
            {/* APPLICANT BOX */}
            <div className="my-6 border border-slate-300 p-5 rounded-none bg-slate-50/50 print:bg-transparent">
                <p className="font-bold uppercase tracking-widest text-[9pt] mb-4 border-b border-slate-300 pb-2">Part 2: Applicant Information</p>
                <div className="space-y-2">
                  <div className="grid grid-cols-[160px_15px_1fr]"><span>Full Name</span><span>:</span><span className="font-bold uppercase text-[12pt]">{data.applicantName}</span></div>
                  <div className="grid grid-cols-[160px_15px_1fr]"><span>Passport Number</span><span>:</span><span className="font-bold uppercase">{data.passportNo}</span></div>
                </div>
            </div>

            <p>
              I wish to state that the above-mentioned applicant is planning to travel to <strong>{data.destinationCountry}</strong> for the strict purpose of <strong>{data.visitPurpose}</strong>. The intended duration of stay is <strong>{data.duration}</strong>, commencing on or around <strong>{formatDateSafe(data.travelDate)}</strong>.
            </p>

            {/* GUARANTEE CLAUSE */}
            <div className="pl-6 border-l-[3px] border-black text-justify italic my-8 text-[10.5pt]">
              "I solemnly guarantee that I will take full financial responsibility for all expenses incurred by the applicant during the entirety of the trip and stay. Furthermore, I guarantee that the applicant will adhere strictly to the laws and regulations of {data.destinationCountry} and will return to their home country promptly before the expiration of the visa."
            </div>
            
            <p>I kindly request your assistance in granting the necessary visa for the applicant. Should you require further information, please do not hesitate to contact me.</p>
            <p>Thank you for your favorable consideration.</p>
          </div>

          {/* SIGNATURE SECTION */}
          <div className="shrink-0 mt-12 pt-8 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex justify-end text-center">
              <div className="w-72">
                <p className="mb-2 uppercase text-[10pt]">Sincerely Yours,</p>
                <div className="mt-8 mb-4 flex flex-col items-center">
                   <div className="border border-slate-300 w-28 h-20 flex flex-col items-center justify-center text-[7pt] text-slate-400 italic print:border-slate-800 print:text-black uppercase mb-6 bg-slate-50 print:bg-transparent">
                      <span className="font-bold text-[8pt] not-italic mb-1">STAMP DUTY</span>
                      <span>(Materai)</span>
                      <span>10.000</span>
                   </div>
                   <p className="font-bold uppercase text-[12pt] underline decoration-1 underline-offset-4">{data.sponsorName}</p>
                   <p className="text-[10pt] mt-2 text-slate-700">{data.sponsorJob}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans text-slate-200">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 border-b border-slate-800 h-16 sticky top-0 z-50 flex items-center px-6 justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-emerald-400 flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={22} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em]">
               <ShieldCheck size={18} /> <span>Official Visa Sponsor</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-[10px] font-black flex items-center gap-2 transition-all uppercase tracking-[0.2em] text-white">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={14} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 flex items-center gap-2 transition-all border border-emerald-400/50">
              <Printer size={16} /> <span className="hidden md:inline">Print Official Document</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible relative">
        
        {/* BACKGROUND ACCENT */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none no-print"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none no-print"></div>

        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[420px] bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900">
             <h2 className="font-black text-[11px] uppercase text-slate-300 flex items-center gap-2 tracking-[0.15em]"><Edit3 size={16} className="text-emerald-400" /> Document Editor</h2>
             <button onClick={handleReset} className="text-slate-500 hover:text-red-400 transition-colors" title="Reset All Data"><RotateCcw size={18}/></button>
           </div>
           
 <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-32 print:overflow-visible print:bg-white">
              
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5 space-y-4 backdrop-blur-sm">
                 <h3 className="text-[10px] font-black uppercase text-blue-400 border-b border-slate-700 pb-2 tracking-widest flex items-center gap-2"><Landmark size={14}/> Embassy & Meta Data</h3>
                 
                 <div className="space-y-3 pt-2">
                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Reference Number</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-emerald-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" value={data.refNumber} onChange={e => handleDataChange('refNumber', e.target.value)} />
                   </div>
                   
                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Embassy Name</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white focus:border-blue-500 outline-none" value={data.embassyName} onChange={e => handleDataChange('embassyName', e.target.value)} />
                   </div>

                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Embassy Address</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-blue-500 outline-none" value={data.embassyAddress} onChange={e => handleDataChange('embassyAddress', e.target.value)} />
                   </div>

                   <div className="flex items-center gap-4 pt-3 border-t border-slate-700/50 mt-2">
                      <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 bg-slate-900 border border-dashed border-slate-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors overflow-hidden shrink-0 group">
                         {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-500 group-hover:text-emerald-400" />}
                         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Official Seal</p>
                        <p className="text-[9px] text-slate-500 leading-relaxed">Upload company or official logo for the header (Optional)</p>
                      </div>
                   </div>
                 </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5 space-y-4 backdrop-blur-sm">
                 <h3 className="text-[10px] font-black uppercase text-emerald-400 border-b border-slate-700 pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={14}/> Sponsor & Applicant</h3>
                 
                 <div className="space-y-3 pt-2">
                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Sponsor Full Name</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold uppercase text-white focus:border-emerald-500 outline-none" value={data.sponsorName} onChange={e => handleDataChange('sponsorName', e.target.value)} />
                   </div>

                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Sponsor Occupation</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-emerald-500 outline-none" value={data.sponsorJob} onChange={e => handleDataChange('sponsorJob', e.target.value)} />
                   </div>

                   {templateId === 2 && (
                     <div className="space-y-1">
                       <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Sponsor Company</label>
                       <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white focus:border-emerald-500 outline-none" value={data.sponsorCompany} onChange={e => handleDataChange('sponsorCompany', e.target.value)} />
                     </div>
                   )}

                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Sponsor Address</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-emerald-500 outline-none" value={data.sponsorAddress} onChange={e => handleDataChange('sponsorAddress', e.target.value)} />
                   </div>

                   <div className="space-y-1 pt-3 border-t border-slate-700/50">
                     <label className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Applicant Full Name</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-emerald-500/50 rounded-lg text-xs font-bold uppercase text-white focus:border-emerald-500 outline-none" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} />
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                     <div className="space-y-1">
                       <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Passport No.</label>
                       <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white font-mono focus:border-emerald-500 outline-none" value={data.passportNo} onChange={e => handleDataChange('passportNo', e.target.value)} />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Relation to Sponsor</label>
                       <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-emerald-500 outline-none" value={data.relation} onChange={e => handleDataChange('relation', e.target.value)} placeholder="e.g., Father, Employee" />
                     </div>
                   </div>
                 </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-5 space-y-4 pb-10 backdrop-blur-sm">
                 <h3 className="text-[10px] font-black uppercase text-amber-400 border-b border-slate-700 pb-2 tracking-widest flex items-center gap-2"><Plane size={14}/> Travel Details</h3>
                 
                 <div className="space-y-3 pt-2">
                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Destination Country</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white focus:border-amber-500 outline-none" value={data.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} />
                   </div>

                   <div className="space-y-1">
                     <label className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Purpose of Visit</label>
                     <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:border-amber-500 outline-none" value={data.visitPurpose} onChange={e => handleDataChange('visitPurpose', e.target.value)} />
                   </div>

                   <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Travel Date</label>
                        <input type="date" className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white" style={{colorScheme: 'dark'}} value={data.travelDate} onChange={e => handleDataChange('travelDate', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Duration</label>
                        <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="e.g., 14 Days" />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/50 mt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Issue City</label>
                        <input className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs uppercase text-white" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Issue Date</label>
                        <input type="date" className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white" style={{colorScheme: 'dark'}} value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                      </div>
                   </div>
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
 <div className={`flex-1 h-full flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:overflow-visible print:bg-white print:static z-20`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-800/90 backdrop-blur-md rounded-2xl flex p-1.5 shadow-2xl font-sans font-bold text-xs uppercase tracking-widest border border-slate-700">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl transition-all ${mobileView === 'editor' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>Editor</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl transition-all ${mobileView === 'preview' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen Sponsorship" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
