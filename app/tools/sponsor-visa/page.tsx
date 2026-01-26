'use client';

/**
 * FILE: SponsorVisaPage.tsx
 * STATUS: FINAL & MOBILE READY
 * DESC: Generator Surat Sponsor Visa (English Standard for Embassy)
 * FEATURES:
 * - Dual Template (Formal Personal vs Business Sponsored)
 * - Auto Date Logic
 * - Mobile Menu Fixed
 * - Strict A4 Print Layout
 */

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Plane, UserCircle2, Globe2, Landmark,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, X, Briefcase
} from 'lucide-react';
import Link from 'next/link';

// Jika ada komponen iklan:
// import AdsterraBanner from '@/components/AdsterraBanner'; 

// --- 1. TYPE DEFINITIONS ---
interface VisaData {
  city: string;
  date: string;
  
  // Sponsor
  sponsorName: string;
  sponsorJob: string;
  sponsorAddress: string;
  relation: string; // Father, Mother, Company, etc.
  
  // Applicant
  applicantName: string;
  passportNo: string;
  
  // Trip Details
  destinationCountry: string;
  visitPurpose: string;
  duration: string;
  travelDate: string;
  
  // Embassy
  embassyName: string;
  embassyAddress: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: VisaData = {
  city: 'JAKARTA',
  date: '', // Diisi useEffect
  
  sponsorName: 'HENDRA KUSUMA',
  sponsorJob: 'CEO of PT. Maju Jaya',
  sponsorAddress: 'Jl. Kemang Raya No. 45, Jakarta Selatan',
  relation: 'Father', 
  
  applicantName: 'RIZKY KUSUMA',
  passportNo: 'X1234567',
  
  destinationCountry: 'JAPAN',
  visitPurpose: 'Family Holiday',
  duration: '14 Days',
  travelDate: '2026-03-15',
  
  embassyName: 'EMBASSY OF JAPAN',
  embassyAddress: 'Jakarta, Indonesia'
};

// --- 3. KOMPONEN UTAMA ---
export default function SponsorVisaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Visa...</div>}>
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
    if(confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  // --- TEMPLATE MENU ---
  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Formal Personal (Family)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Business Sponsored
        </button>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal Personal' : 'Business Sponsored';

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    // FIX: Print Padding
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAL PERSONAL (FAMILY) */
        <div className="flex flex-col h-full">
            {/* HEADER TANGGAL */}
            <div className="text-right mb-10 font-sans text-[10pt] font-bold uppercase tracking-tight shrink-0">
               {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : ''}
            </div>

            {/* TUJUAN */}
            <div className="mb-8 space-y-1 text-left shrink-0">
               <p className="font-bold">To: Visa Section</p>
               <p className="font-bold uppercase tracking-tight">{data.embassyName}</p>
               <p className="italic text-slate-600 print:text-black">{data.embassyAddress}</p>
            </div>

            {/* JUDUL */}
            <div className="text-center mb-10 shrink-0 leading-tight">
               <h1 className="text-xl font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SPONSORSHIP LETTER</h1>
            </div>

            {/* BODY */}
            <div className="space-y-6 flex-grow overflow-hidden text-left text-justify">
               <p>Dear Sir/Madam,</p>
               <p>I, the undersigned below:</p>
               
               <div className="ml-8 space-y-1.5 font-sans border-l-4 border-slate-100 pl-6 italic print:border-slate-300">
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.sponsorName}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>Occupation</span><span>:</span><span>{data.sponsorJob}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Address</span><span>:</span><span>{data.sponsorAddress}</span></div>
               </div>

               <p>Hereby declare that I am the <b>{data.relation}</b> of:</p>
               
               <div className="ml-8 space-y-1.5 font-sans border-l-4 border-blue-50 pl-6 italic print:border-slate-300">
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.applicantName}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>Passport No.</span><span>:</span><span className="font-mono font-bold tracking-widest">{data.passportNo}</span></div>
               </div>

               <p className="leading-relaxed">
                  I would like to guarantee that my {data.relation} is going to <b>{data.destinationCountry}</b> for the purpose of <b>{data.visitPurpose}</b> for a duration of <b>{data.duration}</b>, starting from <b>{isClient && data.travelDate ? new Date(data.travelDate).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : '...'}</b>.
               </p>

               <div className="italic text-slate-800 bg-slate-50 p-5 rounded-xl border border-slate-200 leading-relaxed print:bg-transparent print:border-black text-justify">
                  "I guarantee that I will be fully responsible for all of his/her expenses during the entire trip and stay in your country, and I also guarantee that he/she will return to Indonesia promptly after the visit is over."
               </div>
               
               <p>Thank you for your kind attention and assistance regarding this visa application.</p>
            </div>

            {/* TANDA TANGAN */}
            <div className="shrink-0 mt-10 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
               <div className="flex justify-end text-center">
                  <div className="w-64">
                     <p className="mb-2 font-bold uppercase text-[9pt] tracking-widest text-slate-400 print:text-black">Sincerely Yours,</p>
                     <div className="mt-4 mb-2 flex flex-col items-center">
                        <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic print:border-black print:text-black uppercase">Materai 10.000</div>
                        <p className="font-bold underline uppercase text-base tracking-tight leading-none mt-4">{data.sponsorName}</p>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      ) : (
        /* TEMPLATE 2: BUSINESS SPONSORED */
        <div className="flex flex-col h-full font-sans">
            {/* KOP PERUSAHAAN (Opsional) */}
            <div className="flex items-center gap-6 border-b-2 border-slate-900 pb-4 mb-8 shrink-0">
                {logo ? (
                  <img src={logo} alt="Logo" className="w-16 h-16 object-contain shrink-0 block print:block" />
                ) : (
                  <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                    <Briefcase size={28} />
                  </div>
                )}
                <div className="flex-grow">
                   <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">COMPANY LETTERHEAD</h1>
                   <p className="text-[9pt] text-slate-500 italic print:text-black">{data.sponsorAddress}</p>
                </div>
            </div>

            {/* TANGGAL */}
            <div className="text-right mb-8 text-sm font-bold">
               {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : ''}
            </div>

            {/* TUJUAN */}
            <div className="mb-8 space-y-1 text-left shrink-0">
               <p className="font-bold">To: Visa Section</p>
               <p className="font-bold uppercase tracking-tight">{data.embassyName}</p>
               <p className="italic text-slate-600 print:text-black">{data.embassyAddress}</p>
            </div>

            {/* BODY */}
            <div className="space-y-6 flex-grow overflow-hidden text-left text-justify">
               <p>Dear Sir/Madam,</p>
               
               <p className="leading-relaxed">
                  We, the undersigned, hereby certify that:
               </p>

               <div className="ml-8 font-bold border-l-4 border-slate-900 pl-4 py-2">
                  <p className="uppercase">{data.applicantName}</p>
                  <p className="font-mono text-sm">Passport No: {data.passportNo}</p>
               </div>

               <p className="leading-relaxed">
                  Is currently employed at our company as an employee. We acknowledge that {data.applicantName} will be traveling to <b>{data.destinationCountry}</b> for <b>{data.visitPurpose}</b> from <b>{isClient && data.travelDate ? new Date(data.travelDate).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : '...'}</b> for a duration of {data.duration}.
               </p>

               <p className="leading-relaxed">
                  All expenses incurred during the trip will be borne by the applicant/company. We guarantee that the applicant will not seek any form of employment or permanent residence in {data.destinationCountry} and will return to Indonesia to resume duties with our company upon completion of the trip.
               </p>

               <p>We kindly request that you grant the necessary visa to facilitate this travel.</p>
            </div>

            {/* TANDA TANGAN */}
            <div className="shrink-0 mt-12 pt-8" style={{ pageBreakInside: 'avoid' }}>
               <div className="w-64">
                  <p className="mb-16 font-bold uppercase text-[9pt]">Sincerely,</p>
                  <p className="font-bold underline uppercase text-base">{data.sponsorName}</p>
                  <p className="text-sm italic">{data.sponsorJob}</p>
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
               <Globe2 size={16} /> <span>Visa Sponsorship Builder</span>
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
              <Printer size={16} /> <span className="hidden md:inline">Print Letter</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Visa Details</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Landmark size={12}/> Embassy Info</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.embassyName} onChange={e => handleDataChange('embassyName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.embassyAddress} onChange={e => handleDataChange('embassyAddress', e.target.value)} placeholder="Address" />
                 
                 <div className="flex items-center gap-4 mt-2 border-t pt-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Remove Logo</button>}
                    <span className="text-[10px] text-slate-400">Add Company Logo (Business Template)</span>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Sponsor & Applicant</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.sponsorName} onChange={e => handleDataChange('sponsorName', e.target.value)} placeholder="Sponsor Name" />
                 <input className="w-full p-2 border rounded text-xs" value={data.sponsorJob} onChange={e => handleDataChange('sponsorJob', e.target.value)} placeholder="Sponsor Job" />
                 <textarea className="w-full p-2 border rounded text-xs h-14 resize-none" value={data.sponsorAddress} onChange={e => handleDataChange('sponsorAddress', e.target.value)} placeholder="Sponsor Address" />
                 
                 <div className="border-t pt-2 mt-2">
                    <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} placeholder="Applicant Name" />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <input className="w-full p-2 border rounded text-xs" value={data.passportNo} onChange={e => handleDataChange('passportNo', e.target.value)} placeholder="Passport No." />
                        <input className="w-full p-2 border rounded text-xs" value={data.relation} onChange={e => handleDataChange('relation', e.target.value)} placeholder="Relation (e.g. Father)" />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Plane size={12}/> Trip Details</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} placeholder="Destination" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.travelDate} onChange={e => handleDataChange('travelDate', e.target.value)} />
                 </div>
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Duration" />
                 <input className="w-full p-2 border rounded text-xs italic" value={data.visitPurpose} onChange={e => handleDataChange('visitPurpose', e.target.value)} placeholder="Purpose" />
                 <div className="grid grid-cols-2 gap-2 border-t pt-4">
                    <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="City" />
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
