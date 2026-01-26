'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Plane, UserCircle2, Globe2, Landmark,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, X, Briefcase, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

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

const INITIAL_DATA: VisaData = {
  city: 'JAKARTA',
  date: '', 
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

export default function SponsorVisaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs">Memuat Editor...</div>}>
      <VisaSponsorBuilder />
    </Suspense>
  );
}

function VisaSponsorBuilder() {
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

  const handleDataChange = (field: keyof VisaData, val: any) => setData(prev => ({ ...prev, [field]: val }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(confirm('Reset formulir?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[12mm] md:p-[15mm] print:p-[15mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[10.5pt]' : 'font-sans text-[10pt]'}`}>
      
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div className="shrink-0">
          {logo && <img src={logo} alt="Kop" className="h-14 w-auto object-contain" />}
        </div>
        <div className="text-right font-sans text-[9pt] font-bold uppercase">
          {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : ''}
        </div>
      </div>

      <div className="mb-6 space-y-0.5 text-left shrink-0">
        <p className="font-bold">To: Visa Section</p>
        <p className="font-bold uppercase">{data.embassyName}</p>
        <p className="italic text-slate-600 print:text-black">{data.embassyAddress}</p>
      </div>

      <div className="text-center mb-6 shrink-0 leading-tight">
        <h1 className="text-lg font-black underline uppercase tracking-widest">SPONSORSHIP LETTER</h1>
      </div>

      <div className="space-y-4 overflow-visible text-left text-justify">
        <p>Dear Sir/Madam,</p>
        <p>I, the undersigned below / <i>Saya yang bertanda tangan di bawah ini</i>:</p>
        
        <div className="ml-6 space-y-1 font-sans border-l-4 border-slate-100 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase">{data.sponsorName}</span></div>
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Occupation</span><span>:</span><span>{data.sponsorJob}</span></div>
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Address</span><span>:</span><span>{data.sponsorAddress}</span></div>
        </div>

        <p>Hereby declare that I am the <b>{data.relation}</b> of / <i>Dengan ini menyatakan bahwa saya adalah <b>{data.relation}</b> dari</i>:</p>
        
        <div className="ml-6 space-y-1 font-sans border-l-4 border-blue-50 pl-4 italic print:border-slate-300">
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase">{data.applicantName}</span></div>
            <div className="grid grid-cols-[120px_10px_1fr]"><span>Passport No.</span><span>:</span><span className="font-mono font-bold">{data.passportNo}</span></div>
        </div>

        <p>
          I would like to guarantee that my {data.relation} is going to <b>{data.destinationCountry}</b> for <b>{data.visitPurpose}</b> for <b>{data.duration}</b>, starting from <b>{isClient && data.travelDate ? new Date(data.travelDate).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : '...'}</b>.
        </p>

        <div className="italic text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-200 leading-relaxed print:bg-transparent print:border-black">
          "I guarantee that I will be fully responsible for all of his/her expenses during the entire trip and stay in your country, and I also guarantee that he/she will return to Indonesia promptly after the visit is over."
        </div>
        
        <p>Thank you for your kind attention and assistance regarding this visa application.</p>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 print:border-black">
        <div className="flex justify-end text-center">
          <div className="w-64">
            <p className="mb-1 font-bold uppercase text-[8pt] text-slate-400 print:text-black">Sincerely Yours,</p>
            <div className="mt-2 flex flex-col items-center">
               <div className="border border-slate-200 w-20 h-12 flex items-center justify-center text-[6pt] text-slate-300 italic print:border-black print:text-black uppercase">Materai 10.000</div>
               <p className="font-bold underline uppercase text-base mt-2">{data.sponsorName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const activeTemplateName = templateId === 1 ? 'Formal Personal' : 'Business Sponsored';

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white">
      <style jsx global>{`@media print {@page {size: A4 portrait; margin: 0;} body {background: white;} .no-print {display: none !important;} #print-only-root {display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999;}}`}</style>
      
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 font-bold uppercase text-xs"><ArrowLeft size={18} /> Dashboard</Link>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase italic"><Globe2 size={16} /> Visa Sponsorship</div>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 text-white px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-2">
                <LayoutTemplate size={14} /> {activeTemplateName} <ChevronDown size={12} />
            </button>
            <button onClick={() => window.print()} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs uppercase flex items-center gap-2"><Printer size={16}/> Print</button>
        </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        <div className={`no-print w-full lg:w-[400px] bg-white border-r overflow-y-auto p-4 space-y-6 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-bold text-slate-700 text-sm">VISA DETAILS</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
            </div>
            <div className="space-y-4">
                <input className="w-full p-2 border rounded text-xs" value={data.sponsorName} onChange={e => handleDataChange('sponsorName', e.target.value)} placeholder="Sponsor Name" />
                <input className="w-full p-2 border rounded text-xs" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} placeholder="Applicant Name" />
                <input className="w-full p-2 border rounded text-xs" value={data.passportNo} onChange={e => handleDataChange('passportNo', e.target.value)} placeholder="Passport No" />
                <input className="w-full p-2 border rounded text-xs" value={data.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} placeholder="Country" />
                <textarea className="w-full p-2 border rounded text-xs h-20" value={data.sponsorAddress} onChange={e => handleDataChange('sponsorAddress', e.target.value)} placeholder="Address" />
            </div>
        </div>

        <div className={`flex-1 bg-slate-200/50 relative overflow-hidden flex justify-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="overflow-y-auto w-full flex justify-center p-4 md:p-12">
               <div className="origin-top transition-transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 shadow-2xl h-fit">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 z-50 shadow-2xl">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>Preview</button>
      </div>

      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
