'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Plane, UserCircle2, Globe2, Landmark,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, X, Briefcase, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

export default function SponsorVisaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor...</div>}>
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

  const [data, setData] = useState({
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
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(confirm('Reset semua data ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({
            city: 'Jakarta',
            date: today,
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
        });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? "Formal Personal" : "Business Sponsored";

  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[12mm] md:p-[15mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      <div className="flex justify-between items-start mb-8 shrink-0">
        <div className="shrink-0">
          {logo ? (
            <img src={logo} alt="Kop" className="h-16 w-auto object-contain" />
          ) : (
            <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 no-print">
               <Plane size={24} />
            </div>
          )}
        </div>
        <div className="text-right font-sans text-[10pt] font-bold uppercase">
          {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : ''}
        </div>
      </div>

      <div className="mb-6 space-y-1 text-left shrink-0">
        <p className="font-bold">To: Visa Section</p>
        <p className="font-bold uppercase tracking-tight">{data.embassyName}</p>
        <p className="italic text-slate-600 print:text-black">{data.embassyAddress}</p>
      </div>

      <div className="text-center mb-8 shrink-0 leading-tight">
        <h1 className="text-xl font-black underline uppercase decoration-1 underline-offset-8 tracking-widest">SPONSORSHIP LETTER</h1>
      </div>

      <div className="space-y-5 overflow-visible text-left text-justify">
        <p>Dear Sir/Madam,</p>
        <p>I, the undersigned below / <i>Saya yang bertanda tangan di bawah ini</i>:</p>
        
        <div className="ml-8 space-y-1 font-sans border-l-4 border-slate-100 pl-6 italic print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.sponsorName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Occupation</span><span>:</span><span>{data.sponsorJob}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Address</span><span>:</span><span>{data.sponsorAddress}</span></div>
        </div>

        <p>Hereby declare that I am the <b>{data.relation}</b> of / <i>Dengan ini menyatakan bahwa saya adalah <b>{data.relation}</b> dari</i>:</p>
        
        <div className="ml-8 space-y-1 font-sans border-l-4 border-blue-50 pl-6 italic print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Name</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.applicantName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Passport No.</span><span>:</span><span className="font-mono font-bold tracking-widest">{data.passportNo}</span></div>
        </div>

        <p className="leading-relaxed">
          I would like to guarantee that my {data.relation} is going to <b>{data.destinationCountry}</b> for the purpose of <b>{data.visitPurpose}</b> for a duration of <b>{data.duration}</b>, starting from <b>{isClient && data.travelDate ? new Date(data.travelDate).toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'}) : '...'}</b>.
        </p>

        <div className="italic text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed print:bg-transparent print:border-black">
          "I guarantee that I will be fully responsible for all of his/her expenses during the entire trip and stay in your country, and I also guarantee that he/she will return to Indonesia promptly after the visit is over."
        </div>
        
        <p>Thank you for your kind attention and assistance regarding this visa application.</p>
      </div>

      <div className="shrink-0 mt-8 pt-6 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-end text-center">
          <div className="w-64">
            <p className="mb-2 font-bold uppercase text-[9pt] tracking-widest text-slate-400 print:text-black">Sincerely Yours,</p>
            <div className="mt-4 mb-2 flex flex-col items-center">
               <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic print:border-black print:text-black uppercase">Materai 10.000</div>
               <p className="font-bold underline uppercase text-base tracking-tight mt-4">{data.sponsorName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, header, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Globe2 size={16} /> <span>Visa Sponsor Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden">
                  <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false);}} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50">Formal Personal</button>
                  <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false);}} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50">Business Sponsored</button>
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden relative">
        {/* SIDEBAR */}
        <div className={`w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full no-print ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-bold text-slate-700 uppercase text-xs tracking-widest">Editor Visa</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors"><RotateCcw size={16}/></button>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Landmark size={12}/> Embassy Info</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.embassyName} onChange={e => handleDataChange('embassyName', e.target.value)} placeholder="Embassy Name" />
              <input className="w-full p-2 border rounded text-xs" value={data.embassyAddress} onChange={e => handleDataChange('embassyAddress', e.target.value)} placeholder="Embassy Address" />
              <div className="flex items-center gap-4 border-t pt-4">
                 {logo ? (
                    <div className="relative w-14 h-14 border rounded overflow-hidden group shrink-0">
                       <img src={logo} className="w-full h-full object-contain" />
                       <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                    </div>
                 ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 shrink-0"><ImagePlus size={20} /></button>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <p className="text-[9px] text-slate-400 leading-tight">Gunakan Logo (Opsional)</p>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Sponsor & Applicant</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.sponsorName} onChange={e => handleDataChange('sponsorName', e.target.value)} placeholder="Sponsor Name" />
              <input className="w-full p-2 border rounded text-xs" value={data.applicantName} onChange={e => handleDataChange('applicantName', e.target.value)} placeholder="Applicant Name" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.passportNo} onChange={e => handleDataChange('passportNo', e.target.value)} placeholder="Passport No." />
                 <input className="w-full p-2 border rounded text-xs" value={data.relation} onChange={e => handleDataChange('relation', e.target.value)} placeholder="Relation" />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Plane size={12}/> Trip Details</h3>
              <input className="w-full p-2 border rounded text-xs" value={data.destinationCountry} onChange={e => handleDataChange('destinationCountry', e.target.value)} placeholder="Destination Country" />
              <input className="w-full p-2 border rounded text-xs" value={data.visitPurpose} onChange={e => handleDataChange('visitPurpose', e.target.value)} placeholder="Visit Purpose" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="City" />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                  <DocumentContent />
                  <div className="h-24 lg:hidden"></div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
