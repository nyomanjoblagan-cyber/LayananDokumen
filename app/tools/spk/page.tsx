'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, Briefcase, FileText, ChevronDown, Edit3, Eye, RotateCcw
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
  compAddress: 'Jl. Merdeka No. 123, Jakarta Selatan\nTelp: (021) 888-9999',
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
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs">Loading...</div>}>
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
  const [data, setData] = useState<SPKData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof SPKData, val: any) => setData(prev => ({ ...prev, [field]: val }));

  const handleReset = () => {
    if(confirm('Reset formulir?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] print:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 mx-auto ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 text-center">
        <div className="flex-grow">
          <h1 className="text-xl font-black uppercase tracking-tight leading-none mb-2 print:text-black">{data.compName}</h1>
          <p className="text-[9pt] font-sans whitespace-pre-line text-slate-500 print:text-black italic leading-tight">{data.compAddress}</p>
        </div>
      </div>

      <div className="text-center mb-8 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERINTAH KERJA (SPK)</h2>
        <p className="text-[9pt] font-sans mt-1 italic font-bold">Nomor: {data.no}</p>
      </div>

      <div className="space-y-6 text-left overflow-visible">
        <p>Pada hari ini, bertanda tangan di bawah ini kami memberikan tugas instruksi kerja kepada:</p>
        <div className="ml-8 space-y-1 font-sans italic border-l-4 border-emerald-100 pl-4 print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Penerima Tugas</span><span>:</span><span className="font-bold uppercase">{data.clientName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.clientAddress}</span></div>
        </div>
        <p>Untuk segera melaksanakan pekerjaan dengan ketentuan sebagai berikut:</p>
        <table className="w-full border-collapse border border-slate-900 font-sans text-[10pt]">
            <tbody>
              <tr><td className="border border-slate-900 p-3 font-bold bg-slate-50 w-[30%] uppercase print:bg-transparent">Nama Proyek</td><td className="border border-slate-900 p-3">{data.projectName}</td></tr>
              <tr><td className="border border-slate-900 p-3 font-bold bg-slate-50 uppercase print:bg-transparent">Nilai Kontrak</td><td className="border border-slate-900 p-3 font-bold text-emerald-700 print:text-black italic">Rp {data.contractValue}</td></tr>
              <tr><td className="border border-slate-900 p-3 font-bold bg-slate-50 uppercase print:bg-transparent">Waktu Kerja</td><td className="border border-slate-900 p-3">{data.duration}</td></tr>
            </tbody>
        </table>
        <div className="space-y-2">
            <p className="font-bold underline uppercase text-[9pt] tracking-widest">Lingkup Pekerjaan:</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 whitespace-pre-line italic leading-relaxed text-[10pt] print:bg-transparent print:border-black">{data.scope}</div>
        </div>
        <p className="text-justify leading-relaxed">Demikian Surat Perintah Kerja ini dibuat untuk dilaksanakan dengan penuh tanggung jawab sesuai dengan standar kualitas yang telah disepakati.</p>
      </div>

      <div className="mt-auto pt-8 border-t border-slate-100 print:border-black">
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Penerima Tugas,</p>
               <div className="mt-auto"><p className="font-bold underline uppercase text-[11pt]">{data.clientName}</p><p className="text-[8pt] italic opacity-50 print:opacity-100">Kontraktor / Vendor</p></div>
            </div>
            <div className="flex flex-col h-40">
               <p className="text-[10pt] mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pemberi Tugas,</p>
               <div className="mt-auto"><p className="font-bold underline uppercase text-[11pt]">{data.signerName}</p><p className="text-[9pt] font-sans mt-1">{data.signerJob}</p></div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white">
      <style jsx global>{`@media print {@page {size: A4 portrait; margin: 0;} body {background: white;} .no-print {display: none !important;} #print-only-root {display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999;}}`}</style>
      
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 font-bold uppercase text-xs"><ArrowLeft size={18} /> Dashboard</Link>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase italic"><FileText size={16} /> Work Order</div>
        </div>
        <button onClick={() => window.print()} className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg flex items-center gap-2"><Printer size={16}/> Print</button>
      </div>

      <main className="flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        <div className={`no-print w-full lg:w-[400px] bg-white border-r overflow-y-auto p-4 space-y-4 ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="font-bold text-slate-700 text-sm">EDITOR SPK</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
            </div>
            <input className="w-full p-2 border rounded text-xs" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="Company Name" />
            <input className="w-full p-2 border rounded text-xs" value={data.clientName} onChange={e => handleDataChange('clientName', e.target.value)} placeholder="Receiver Name" />
            <input className="w-full p-2 border rounded text-xs" value={data.projectName} onChange={e => handleDataChange('projectName', e.target.value)} placeholder="Project Name" />
            <textarea className="w-full p-2 border rounded text-xs h-32" value={data.scope} onChange={e => handleDataChange('scope', e.target.value)} placeholder="Scope of Work" />
        </div>

        <div className={`flex-1 bg-slate-200/50 relative overflow-hidden flex justify-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="overflow-y-auto w-full flex justify-center p-4 md:p-12">
               <div className="origin-top transition-transform scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 shadow-2xl h-fit">
                 <DocumentContent />
               </div>
            </div>
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 z-50">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}>Preview</button>
      </div>

      <div id="print-only-root" className="hidden"><DocumentContent /></div>
    </div>
  );
}
