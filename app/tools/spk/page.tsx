'use client';

/**
 * FILE: SPKPage.tsx
 * STATUS: FIXED PREVIEW & FULL CODE
 * DESC: Generator Surat Perintah Kerja (SPK)
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, Briefcase, FileText, 
  ChevronDown, Edit3, Eye, RotateCcw, Building2, UserCircle2, X, ImagePlus 
} from 'lucide-react';
import Link from 'next/link';

interface SPKData {
  compName: string;
  compAddress: string;
  city: string;
  date: string;
  no: string;
  clientName: string;
  clientAddress: string;
  projectName: string;
  contractValue: string;
  duration: string;
  scope: string;
  signerName: string;
  signerJob: string;
}

const INITIAL_DATA: SPKData = {
  compName: 'PT. TEKNOLOGI CIPTA MANDIRI',
  compAddress: 'Jl. Merdeka No. 123, Jakarta Selatan\nTelp: (021) 888-9999 | Email: office@tcm.co.id',
  city: 'JAKARTA',
  date: '',
  no: '001/SPK/I/2026',
  clientName: 'AHMAD SUBARJO',
  clientAddress: 'Perumahan Indah Permai Bekasi',
  projectName: 'Pembuatan Website E-Commerce',
  contractValue: '15.000.000',
  duration: '30 Hari Kalender',
  scope: '1. Desain UI/UX Responsive\n2. Pengembangan Frontend & Backend\n3. Integrasi Payment Gateway\n4. Hosting & Domain Setup',
  signerName: 'BAMBANG HARTANTO',
  signerJob: 'Direktur Utama'
};

export default function SPKPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs uppercase tracking-widest">Memuat Editor SPK...</div>}>
      <SPKBuilder />
    </Suspense>
  );
}

function SPKBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<SPKData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof SPKData, val: any) => setData(prev => ({ ...prev, [field]: val }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(confirm('Reset semua data?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const activeTemplateName = templateId === 1 ? 'Format Klasik' : 'Format Modern';

  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER KOP */}
      <div className={`flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 ${templateId === 1 ? 'flex-row text-center' : 'flex-row-reverse text-left'}`}>
        {logo ? (
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0 block print:block" />
        ) : (
          <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 shrink-0 print:border print:border-black print:hidden">
            <Building2 size={32} />
          </div>
        )}
        <div className="flex-grow">
          <h1 className="text-xl font-black uppercase tracking-tight leading-none mb-2 print:text-black">{data.compName}</h1>
          <p className="text-[9pt] font-sans whitespace-pre-line text-slate-500 print:text-black italic leading-tight">{data.compAddress}</p>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERINTAH KERJA (SPK)</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.no}</p>
      </div>

      {/* ISI SURAT */}
      <div className="space-y-6 overflow-visible text-left">
        <p>Pada hari ini, bertanda tangan di bawah ini kami memberikan tugas instruksi kerja kepada:</p>
        
        <div className="ml-8 space-y-1 font-sans italic border-l-4 border-emerald-100 pl-4 print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Penerima Tugas</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.clientName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.clientAddress}</span></div>
        </div>

        <p>Untuk segera melaksanakan pekerjaan dengan ketentuan sebagai berikut:</p>

        <table className="w-full border-collapse border border-slate-900 font-sans text-[10pt]">
            <tbody>
              <tr>
                 <td className="border border-slate-900 p-3 font-bold bg-slate-50 w-[30%] uppercase tracking-tighter print:bg-transparent">Nama Proyek</td>
                 <td className="border border-slate-900 p-3">{data.projectName}</td>
              </tr>
              <tr>
                 <td className="border border-slate-900 p-3 font-bold bg-slate-50 uppercase tracking-tighter print:bg-transparent">Nilai Kontrak</td>
                 <td className="border border-slate-900 p-3 font-bold text-emerald-700 print:text-black italic underline decoration-double">Rp {data.contractValue}</td>
              </tr>
              <tr>
                 <td className="border border-slate-900 p-3 font-bold bg-slate-50 uppercase tracking-tighter print:bg-transparent">Waktu Kerja</td>
                 <td className="border border-slate-900 p-3">{data.duration}</td>
              </tr>
            </tbody>
        </table>

        <div className="space-y-2">
            <p className="font-bold underline uppercase text-[9pt] tracking-widest">Lingkup Pekerjaan:</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 whitespace-pre-line italic leading-relaxed text-[10pt] print:bg-transparent print:border-black">
                {data.scope}
            </div>
        </div>

        <p className="text-justify leading-relaxed">Demikian Surat Perintah Kerja ini dibuat untuk dilaksanakan dengan penuh tanggung jawab sesuai dengan standar kualitas yang telah disepakati.</p>
      </div>

      {/* AREA TANDA TANGAN */}
      <div className="mt-auto pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Penerima Tugas,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.clientName}</p>
                  <p className="text-[8pt] mt-1 italic opacity-50 print:opacity-100">Kontraktor / Vendor</p>
               </div>
            </div>

            <div className="flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pemberi Tugas,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.signerName}</p>
                  <p className="text-[9pt] font-sans mt-1">{data.signerJob}</p>
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
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
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
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <FileText size={16} /> <span>Work Order Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-2 text-slate-900">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 rounded-lg text-sm font-medium hover:bg-blue-50 ${templateId === 1 ? 'bg-blue-50 text-blue-700' : ''}`}>Format Klasik</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 rounded-lg text-sm font-medium hover:bg-blue-50 ${templateId === 2 ? 'bg-blue-50 text-blue-700' : ''}`}>Format Modern</button>
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 text-left">
                <h2 className="font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-tight"><Edit3 size={16} /> Data SPK</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar text-left">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop Perusahaan</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
                 <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.compAddress} onChange={e => handleDataChange('compAddress', e.target.value)} />
                 
                 <div className="flex items-center gap-4 mt-2 border-t pt-4">
                    <div onClick={() => fileInputRef.current?.click()} className="w-14 h-14 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" /> : <ImagePlus size={16} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 font-bold uppercase underline">Hapus</button>}
                    <span className="text-[10px] text-slate-400">Gunakan Logo</span>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Briefcase size={12}/> Proyek & Kontrak</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} placeholder="Nama Proyek" />
                 <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2 border rounded text-xs font-bold text-emerald-600" value={data.contractValue} onChange={e => handleDataChange('contractValue', e.target.value)} placeholder="Nilai (Cth: 10.000.000)" />
                    <input className="w-full p-2 border rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} placeholder="Waktu (Cth: 30 Hari)" />
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="Nomor Surat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Penerima & Pemberi</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Nama Penerima Tugas" />
                 <textarea className="w-full p-2 border rounded text-xs h-20 resize-none leading-relaxed" value={data.scope} onChange={e => handleDataChange('scope', e.target.value)} placeholder="Lingkup Kerja" />
                 
                 <div className="grid grid-cols-2 gap-2 border-t pt-4">
                    <input className="w-full p-2 border rounded text-xs font-bold" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Pemberi Tugas" />
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.45] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <DocumentContent />
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
      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
