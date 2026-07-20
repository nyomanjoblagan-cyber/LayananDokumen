'use client';
import { useFormSync } from '@/lib/useFormSync';


/**
 * FILE: SponsorVisaPage.tsx
 * STATUS: PRODUCTION READY (OFFICIAL EMBASSY GRADE)
 * DESC: Generator Surat Sponsor Visa (Sponsorship Letter)
 */

import React, { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Plane, UserCircle2, Globe2, Landmark,
  LayoutTemplate, ChevronDown, Edit3, ImagePlus, RotateCcw,
  ShieldCheck, FileBadge2, Building2
} from 'lucide-react';
import Link from 'next/link';
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
  date: '2026-07-13',
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

function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SponsorVisaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Loading Secure Environment...</div>}>
      <VisaSponsorBuilder />
    </Suspense>
  );
}

function VisaSponsorBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'sponsor' | 'applicant' | 'embassy'>('sponsor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<VisaData>(INITIAL_DATA);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof VisaData, val: any) => {
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER / KOP */}
      <div className="flex justify-between items-center border-b-[3px] border-black pb-4 mb-8">
        <div className="flex-1">
            <h1 className="text-2xl font-black uppercase tracking-widest text-slate-800">{data.sponsorCompany}</h1>
            <p className="text-sm mt-1">{data.sponsorAddress}</p>
        </div>
        <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 cursor-pointer overflow-hidden rounded-xl print:border-none print:bg-transparent transition-colors hover:bg-slate-100" onClick={() => fileInputRef.current?.click()}>
            {logo ? <img src={logo} alt="Logo" className="w-full h-full object-contain" /> : <div className="text-center print:hidden"><ImagePlus size={24} className="mx-auto mb-1"/><span className="text-[8px] font-bold uppercase tracking-wider block">Add Logo</span></div>}
            <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
        </div>
      </div>

      <div className="mb-8 flex justify-between items-start text-sm break-inside-avoid">
        <div>
            <p className="mb-4">{data.city}, {formatDateDisplay(data.date)}</p>
            <p><strong>To: Visa Section</strong></p>
            <p className="font-bold">{data.embassyName}</p>
            <p>{data.embassyAddress}</p>
        </div>
        <div className="text-right">
            <p>Ref: {data.refNumber}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="font-bold underline mb-4">Subject: Sponsorship Letter for Visa Application</p>
        <p className="mb-4">Dear Sir/Madam,</p>
        <p className="mb-4 text-justify">
            I, the undersigned, {data.sponsorName}, {data.sponsorJob} of {data.sponsorCompany}, 
            hereby write to confirm our sponsorship for the following applicant to visit {data.destinationCountry} for {data.visitPurpose}.
        </p>
      </div>

      <div className="mb-6 pl-4 border-l-2 border-slate-400 ml-4">
        <div className="flex mb-1"><div className="w-32 font-bold">Name</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.applicantName}</div></div>
        <div className="flex mb-1"><div className="w-32">Passport No.</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.passportNo}</div></div>
        <div className="flex mb-1"><div className="w-32">Relationship</div><div className="w-4">:</div><div className="flex-1">{data.relation}</div></div>
      </div>

      <div className="mb-8 text-justify">
        <p className="mb-4">
            The applicant plans to travel on {formatDateDisplay(data.travelDate)} for approximately {data.duration}. 
            I hereby declare and guarantee that I will take full responsibility for all financial expenses incurred during the trip, 
            including flight tickets, accommodation, medical expenses, and other daily necessities.
        </p>
        <p className="mb-4">
            I also guarantee that the applicant will not seek employment or permanent residency in your country 
            and will return to Indonesia before the expiration of the visa.
        </p>
        <p>
            We kindly request your assistance in granting the necessary visa for the applicant. 
            Should you require any further information, please do not hesitate to contact us.
        </p>
      </div>

      <div className="mt-12">
        <p className="mb-2">Sincerely yours,</p>
        <div className="h-24"></div>
        <p className="font-bold underline uppercase">{data.sponsorName}</p>
        <p>{data.sponsorJob}</p>
        <p>{data.sponsorCompany}</p>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Sponsorship Visa</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Print Document</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Plane size={18} className="text-sky-600" /> Visa Editor</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('sponsor')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'sponsor' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Sponsor/Corp</button>
                <button onClick={() => setActiveTab('applicant')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'applicant' ? 'bg-white border-t-2 border-sky-500 text-sky-700' : 'text-slate-500 hover:bg-slate-200'}`}>Applicant</button>
                <button onClick={() => setActiveTab('embassy')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'embassy' ? 'bg-white border-t-2 border-indigo-500 text-indigo-700' : 'text-slate-500 hover:bg-slate-200'}`}>Embassy</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'sponsor' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Sponsor Details
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sponsor Name</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.sponsorName} onChange={e => handleChange('sponsorName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Job Title</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.sponsorJob} onChange={e => handleChange('sponsorJob', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Name</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.sponsorCompany} onChange={e => handleChange('sponsorCompany', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Address</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.sponsorAddress} onChange={e => handleChange('sponsorAddress', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">City</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'applicant' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-sky-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-sky-600"/> Visa Applicant Data
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Applicant Name</label>
                            <input className="w-full bg-sky-50 p-2.5 border border-sky-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.applicantName} onChange={e => handleChange('applicantName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Passport Number</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.passportNo} onChange={e => handleChange('passportNo', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Relation to Sponsor</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none" value={data.relation} onChange={e => handleChange('relation', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'embassy' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-indigo-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Globe2 size={14} className="text-indigo-600"/> Travel & Embassy Info
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Destination Country</label>
                                <input className="w-full bg-indigo-50 p-2.5 border border-indigo-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.destinationCountry} onChange={e => handleChange('destinationCountry', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Purpose of Visit</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.visitPurpose} onChange={e => handleChange('visitPurpose', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Travel Date</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.travelDate} onChange={e => handleChange('travelDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Duration</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.duration} onChange={e => handleChange('duration', e.target.value)} />
                            </div>
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Embassy Details</h4>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Embassy Name</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.embassyName} onChange={e => handleChange('embassyName', e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Embassy Address</label>
                                <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.embassyAddress} onChange={e => handleChange('embassyAddress', e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Reference / Letter Number</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={data.refNumber} onChange={e => handleChange('refNumber', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Sponsorship_${data.applicantName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
