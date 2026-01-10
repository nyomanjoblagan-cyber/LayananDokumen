'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Target, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Briefcase, Zap, Banknote,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus
} from 'lucide-react';
import Link from 'next/link';

export default function SponsorshipPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Proposal...</div>}>
      <SponsorshipBuilder />
    </Suspense>
  );
}

function SponsorshipBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '',
    docNo: '04/SPONSOR/HIMATIKA/I/2026',
    orgName: 'HIMPUNAN MAHASISWA TEKNOLOGI INFORMASI',
    orgAddress: 'Kampus Sudirman, Jl. PB Sudirman, Denpasar, Bali',
    contactPerson: 'BAGUS RAMADHAN (0812-3456-7890)',
    eventName: 'TECHFEST 2026: INNOVATION FOR BALI',
    eventDate: '25 - 27 Maret 2026',
    eventLocation: 'Gedung Ksirarnawa, Art Center Denpasar',
    targetAudience: '1.500 Mahasiswa & Pelaku Industri Kreatif',
    targetCompany: 'Marketing Manager PT. TELKOM INDONESIA',
    companyAddress: 'Jl. Teuku Umar No. 10, Denpasar',
    packageSelected: 'PLATINUM SPONSORSHIP',
    benefitSummary: 'Pemasangan Logo Utama di Backdrop acara, Ad-Lips oleh MC setiap 30 menit, Space Stand 3x3m di area utama, dan publikasi eksklusif di seluruh media sosial resmi event.',
    investmentValue: 'Rp 15.000.000,-'
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

  const TEMPLATES = [
    { id: 1, name: "Format Organisasi", desc: "Layout formal dengan kop surat" },
    { id: 2, name: "Format Bisnis", desc: "Layout modern & minimalis" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER SURAT */}
      <div className="flex justify-between items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-4 flex-grow">
           {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
           ) : (
              <div className="w-16 h-16 bg-blue-50 border-2 border-dashed border-blue-200 rounded flex items-center justify-center text-blue-300 shrink-0 no-print">
                 <Zap size={24} />
              </div>
           )}
           <div className="text-left">
              <h1 className="text-[14pt] font-black uppercase tracking-tighter text-blue-900 leading-none">{data.orgName}</h1>
              <p className="text-[8.5pt] font-sans mt-1 italic text-slate-600 print:text-black leading-tight">{data.orgAddress}</p>
           </div>
        </div>
        <div className="text-right border-l-2 border-slate-200 pl-6 ml-6 shrink-0">
           <p className="text-[10pt] font-bold uppercase tracking-widest text-slate-800">PROPOSAL</p>
           <p className="text-[8pt] font-mono text-slate-500 italic">No: {data.docNo}</p>
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

      {/* TANDA TANGAN (NORMAL FLOW) */}
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
        <div className="mt-8 text-[8.5pt] text-slate-400 text-center font-sans italic print:text-black border-t pt-4">
           Konfirmasi Kerja Sama: {data.contactPerson}
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

      {/* HEADER NAV (SERAGAM) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Zap size={16} /> <span>Sponsorship Pitcher Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print Proposal</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Penyelenggara</h3>
              <div className="flex items-center gap-4">
                 {logo ? (
                    <div className="relative w-14 h-14 border rounded overflow-hidden shrink-0 group">
                       <img src={logo} className="w-full h-full object-contain" />
                       <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                    </div>
                 ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 transition-all shrink-0"><ImagePlus size={20} /></button>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.orgName} onChange={e => handleDataChange('orgName', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-[10px] h-14" value={data.orgAddress} onChange={e => handleDataChange('orgAddress', e.target.value)} placeholder="Alamat Sekretariat" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Zap size={12}/> Detail Event</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} placeholder="Waktu Pelaksanaan" />
              <input className="w-full p-2 border rounded text-xs" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} placeholder="Lokasi Acara" />
              <input className="w-full p-2 border rounded text-xs" value={data.targetAudience} onChange={e => handleDataChange('targetAudience', e.target.value)} placeholder="Target Peserta" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Banknote size={12}/> Penawaran</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase text-blue-700" value={data.packageSelected} onChange={e => handleDataChange('packageSelected', e.target.value)} placeholder="Paket Sponsor" />
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed italic" value={data.benefitSummary} onChange={e => handleDataChange('benefitSummary', e.target.value)} placeholder="Ringkasan Benefit" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.investmentValue} onChange={e => handleDataChange('investmentValue', e.target.value)} placeholder="Nilai Investasi" />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12 shadow-2xl">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}