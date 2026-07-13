'use client';

/**
 * FILE: SponsorshipPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Proposal Sponsorship Event (Sponsorship Pitch Letter)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Target, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, Briefcase, Zap, Banknote,
  LayoutTemplate, ChevronDown, Check, Edit3, Eye, ImagePlus, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

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
  date: '', 
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Proposal...</div>}>
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
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Organisasi' : 'Format Bisnis';

  const TemplateMenu = () => (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
        <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Organisasi (Formal)
        </button>
        <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-blue-500' : 'bg-slate-300'}`}></div> 
            Format Bisnis (Modern)
        </button>
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
        
        {templateId === 1 ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
                <div className="flex items-center gap-4 flex-grow">
                    {logo ? (
                    <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
                    ) : (
                    <div className="w-16 h-16 bg-blue-50 border-2 border-dashed border-blue-200 rounded flex items-center justify-center text-blue-300 shrink-0 print:hidden">
                        <Zap size={32} />
                    </div>
                    )}
                    <div className="text-left font-sans">
                      <h1 className="text-[14pt] font-black uppercase tracking-tighter text-blue-900 leading-none">{data.orgName}</h1>
                      <p className="text-[8.5pt] mt-1 italic text-slate-500 print:text-black leading-tight">{data.orgAddress}</p>
                    </div>
                </div>
                <div className="text-right border-l-2 border-slate-200 pl-6 ml-6 shrink-0 print:border-slate-400 font-sans">
                    <p className="text-[10pt] font-black uppercase tracking-widest text-slate-800">PROPOSAL</p>
                    <p className="text-[8pt] font-mono text-slate-400 italic print:text-black">Ref: {data.docNo}</p>
                </div>
            </div>

            <div className="space-y-6 flex-grow overflow-hidden text-justify leading-relaxed">
                <div className="flex justify-between items-start font-sans">
                    <div className="space-y-1">
                        <p>Hal: <strong>Permohonan Sponsorship & Kerja Sama</strong></p>
                        <div className="pt-4 leading-snug">
                          <p>Yth. <strong>{data.targetCompany}</strong></p>
                          <p className="text-slate-500 print:text-black">{data.companyAddress}</p>
                          <p className="italic">Di Tempat</p>
                        </div>
                    </div>
                    <p className="text-right font-bold text-slate-400 print:text-black">{data.city}, {formatDateSafe(data.date)}</p>
                </div>

                <p>Dengan hormat,</p>
                <p>Sehubungan dengan penyelenggaraan kegiatan <strong>{data.eventName}</strong>, kami dari panitia pelaksana bermaksud menawarkan kemitraan strategis kepada instansi Bapak/Ibu yang akan dilaksanakan pada:</p>
                
                <div className="ml-8 space-y-1.5 font-sans text-[10pt] border-l-4 border-blue-800 pl-6 py-1 bg-slate-50 print:bg-transparent print:border-black italic break-inside-avoid">
                    <div className="grid grid-cols-[120px_10px_1fr]"><span>Waktu Acara</span><span>:</span><span className="font-bold text-slate-900">{data.eventDate}</span></div>
                    <div className="grid grid-cols-[120px_10px_1fr]"><span>Lokasi</span><span>:</span><span>{data.eventLocation}</span></div>
                    <div className="grid grid-cols-[120px_10px_1fr]"><span>Target Peserta</span><span>:</span><span>{data.targetAudience}</span></div>
                </div>

                <p>Melalui proposal ini, kami menawarkan paket <strong>{data.packageSelected}</strong> dengan nilai investasi sebesar <strong>{data.investmentValue}</strong>. Adapun benefit eksklusif yang akan diterima oleh mitra adalah:</p>

                <div className="p-6 border-2 border-slate-100 rounded-2xl bg-slate-50 italic text-[10.5pt] leading-relaxed print:bg-transparent print:border-2 print:border-black break-inside-avoid">
                    "{data.benefitSummary}"
                </div>

                <p>Besar harapan kami agar Bapak/Ibu dapat berpartisipasi dalam menyukseskan agenda besar ini. Kami siap mendiskusikan detail teknis kerja sama ini secara lebih mendalam. Atas perhatiannya, kami ucapkan terima kasih.</p>
            </div>

            <div className="shrink-0 mt-8 pt-8 border-t-2 border-slate-50 print:border-black font-sans" style={{ pageBreakInside: 'avoid' }}>
                <table className="w-full table-fixed text-center">
                  <tbody>
                      <tr className="uppercase text-[8pt] font-black text-slate-300 tracking-[0.2em] print:text-black">
                          <td className="pb-24">Ketua Panitia,</td>
                          <td className="pb-24">Sekretaris,</td>
                      </tr>
                      <tr className="font-black text-[10.5pt] text-slate-900">
                          <td className="underline uppercase tracking-tighter">{data.contactPerson.split(' (')[0]}</td>
                          <td className="underline uppercase tracking-tighter">(...........................)</td>
                      </tr>
                  </tbody>
                </table>
                <div className="mt-8 text-[8.5pt] text-slate-400 text-center italic print:text-black border-t pt-4 border-slate-50 print:border-black">
                    Contact Person: {data.contactPerson}
                </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full font-sans">
            <div className="flex justify-between items-start mb-12 border-b-2 border-slate-900 pb-6 shrink-0 print:border-black">
               <div>
                  <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1 text-slate-900">{data.eventName}</h1>
                  <p className="text-sm font-bold text-blue-600 uppercase tracking-widest print:text-black">Sponsorship Partnership</p>
               </div>
               <div className="text-right">
                  <p className="font-black text-2xl text-slate-900 leading-none">{data.investmentValue}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-400 mt-1 tracking-widest">{data.packageSelected}</p>
               </div>
            </div>

            <div className="flex-grow space-y-10 text-justify">
               <div>
                  <h3 className="font-black uppercase text-[9px] tracking-[0.3em] mb-4 text-slate-300 print:text-black">Executive Summary</h3>
                  <p className="leading-relaxed text-[11pt]">
                      Dear <strong>{data.targetCompany}</strong>,<br/><br/>
                      We invite you to join us as a strategic partner for <strong>{data.eventName}</strong>. This event aims to connect with <strong>{data.targetAudience}</strong> and will be held at <strong>{data.eventLocation}</strong>.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-10 break-inside-avoid">
                  <div className="bg-slate-900 text-white p-6 rounded-[2rem] print:bg-transparent print:text-black print:border-2 print:border-black">
                     <h3 className="font-black uppercase text-[9px] tracking-widest mb-4 text-blue-400 print:text-black">Core Benefits</h3>
                     <p className="text-[10pt] leading-relaxed italic">"{data.benefitSummary}"</p>
                  </div>
                  <div className="p-6 border-2 border-slate-100 rounded-[2rem] print:border-black">
                     <h3 className="font-black uppercase text-[9px] tracking-widest mb-4 text-slate-300 print:text-black">Event Schedule</h3>
                     <ul className="text-[10pt] space-y-2">
                        <li className="flex gap-2"><b>Date:</b> {data.eventDate}</li>
                        <li className="flex gap-2"><b>Venue:</b> {data.eventLocation}</li>
                        <li className="flex gap-2 font-bold text-blue-600 print:text-black"><b>Host:</b> {data.orgName}</li>
                     </ul>
                  </div>
               </div>

               <div className="pt-6">
                  <h3 className="font-black uppercase text-[9px] tracking-[0.3em] mb-4 text-slate-300 print:text-black">Action Requirement</h3>
                  <p className="leading-relaxed text-[11pt]">
                      We are confident this partnership will offer significant ROI and brand exposure. We look forward to discussing how we can tailor this opportunity to meet your marketing objectives.
                  </p>
               </div>
            </div>

            <div className="mt-12 pt-10 border-t-2 border-slate-50 print:border-black flex justify-between items-end shrink-0 break-inside-avoid">
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-300 mb-16 tracking-[0.3em] print:text-black">Authorized by</p>
                  <p className="text-xl font-black border-b-4 border-slate-900 inline-block pb-1 uppercase tracking-tighter">{data.contactPerson.split(' (')[0]}</p>
                  <p className="text-[10px] font-bold text-blue-600 mt-2 uppercase tracking-widest">Event Director</p>
               </div>
               <div className="text-right text-[9pt] text-slate-500 print:text-black space-y-1">
                  <p className="font-black uppercase text-[8px] text-slate-300 mb-2">Connect with us</p>
                  <p className="font-bold">{data.contactPerson}</p>
                  <p className="max-w-[200px] leading-tight">{data.orgAddress}</p>
               </div>
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
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Zap size={16} /> <span>Sponsorship Pitcher Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Proposal</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Proposal</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:hidden print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Penyelenggara</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.orgName} onChange={e => handleDataChange('orgName', e.target.value)} placeholder="Nama Organisasi" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.orgAddress} onChange={e => handleDataChange('orgAddress', e.target.value)} placeholder="Alamat Sekretariat" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="No. Proposal" />
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.contactPerson} onChange={e => handleDataChange('contactPerson', e.target.value)} placeholder="Contact Person" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Target size={12}/> Detail Event</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.eventName} onChange={e => handleDataChange('eventName', e.target.value)} placeholder="Nama Event" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.eventDate} onChange={e => handleDataChange('eventDate', e.target.value)} placeholder="Waktu Pelaksanaan" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.eventLocation} onChange={e => handleDataChange('eventLocation', e.target.value)} placeholder="Lokasi Acara" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.targetAudience} onChange={e => handleDataChange('targetAudience', e.target.value)} placeholder="Target Peserta" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><Briefcase size={12}/> Target & Penawaran</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-amber-500 outline-none" value={data.targetCompany} onChange={e => handleDataChange('targetCompany', e.target.value)} placeholder="Nama Perusahaan Target" />
                 <input className="w-full p-2 border rounded-lg text-xs font-black text-blue-700 focus:ring-2 focus:ring-amber-500 outline-none" value={data.packageSelected} onChange={e => handleDataChange('packageSelected', e.target.value)} placeholder="Paket Sponsorship" />
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.investmentValue} onChange={e => handleDataChange('investmentValue', e.target.value)} placeholder="Nilai Investasi" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.benefitSummary} onChange={e => handleDataChange('benefitSummary', e.target.value)} placeholder="Benefit Utama..." />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><PenTool size={12}/> Administrasi</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}