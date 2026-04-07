'use client';

/**
 * FILE: KuasaPajakPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Kuasa Khusus Pajak
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, FileText, Building2, UserCircle2, 
  ShieldCheck, LayoutTemplate, X, PenTool, Scale, Fingerprint, Edit3, Eye, Check, ChevronDown, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

// --- 1. TYPE DEFINITIONS ---
interface ProxyData {
  city: string;
  date: string;
  docNo: string;
  
  // PEMBERI KUASA
  p1Name: string;
  p1Nik: string;
  p1Npwp: string;
  p1Job: string;
  p1Company: string;
  p1Address: string;

  // PENERIMA KUASA
  p2Name: string;
  p2Nik: string;
  p2Address: string;
  p2Job: string;

  // DETAIL URUSAN PAJAK
  taxType: string;
  taxYear: string;
  kppName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ProxyData = {
  city: 'DENPASAR',
  date: '', 
  docNo: 'SK.PAJAK/001/I/2026',
  
  p1Name: 'AGUS SETIAWAN',
  p1Nik: '5171010101880001',
  p1Npwp: '01.234.567.8-901.000',
  p1Job: 'Direktur Utama',
  p1Company: 'PT. BALI MAJU SEJAHTERA',
  p1Address: 'Jl. Teuku Umar No. 10, Denpasar, Bali',

  p2Name: 'MADE ARYAWAN',
  p2Nik: '5171010202900005',
  p2Address: 'Jl. Gatot Subroto No. 45, Denpasar',
  p2Job: 'Tax Consultant / Staf Keuangan',

  taxType: 'Pajak Penghasilan (PPh) Pasal 21 & PPN',
  taxYear: 'Masa Januari s/d Desember 2025',
  kppName: 'KPP Pratama Denpasar Barat'
};

export default function KuasaPajakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <TaxProxyBuilder />
    </Suspense>
  );
}

function TaxProxyBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [data, setData] = useState<ProxyData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof ProxyData, val: any) => {
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

  const activeTemplateName = templateId === 1 ? 'Format Standar' : 'Format Perusahaan';

  const ProxyContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] w-[210mm] min-h-[296mm] p-[25mm] shadow-2xl print:shadow-none print:m-0 print:p-[25mm] print:w-full mx-auto">
        
        {templateId === 1 && (
          <>
            <div className="text-center mb-10 shrink-0">
              <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT KUASA KHUSUS</h2>
              <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
            </div>

            <div className="flex-grow leading-relaxed text-justify">
              <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
              <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic break-inside-avoid">
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p1Name}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>NPWP</span><span>:</span><span className="font-mono">{data.p1Npwp}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.p1Nik}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p1Address}</span></div>
              </div>
              <p className="mb-4">Selanjutnya disebut <b>PEMBERI KUASA</b>. Memberi kuasa khusus kepada:</p>
              <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic break-inside-avoid">
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.p2Name}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK/NPWP</span><span>:</span><span className="font-mono">{data.p2Nik}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.p2Job}</span></div>
                  <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.p2Address}</span></div>
              </div>
              <p className="mb-6 text-center font-bold tracking-widest uppercase text-sm">--- K H U S U S ---</p>
              <p className="mb-4 break-inside-avoid">
                Mewakili dalam melaksanakan hak/kewajiban perpajakan berupa <b>{data.taxType}</b> untuk <b>{data.taxYear}</b> pada <b>{data.kppName}</b>.
              </p>
              <p className="break-inside-avoid">
                Penerima Kuasa berwenang menghadap pejabat, menandatangani dokumen, serta melakukan tindakan lain yang diperlukan sesuai peraturan perpajakan yang berlaku.
              </p>
            </div>
          </>
        )}

        {templateId === 2 && (
          <>
            <div className="border-b-4 border-double border-black pb-4 mb-8 text-center shrink-0">
               {logo && <img src={logo} className="h-16 w-auto mx-auto mb-2 block" alt="Logo" />}
               <h1 className="text-xl font-black uppercase tracking-widest">{data.p1Company}</h1>
               <p className="text-[9pt] font-sans">{data.p1Address}</p>
            </div>
            <div className="text-center mb-8 shrink-0">
              <h2 className="text-lg font-black underline uppercase">SURAT KUASA KHUSUS PAJAK</h2>
              <p className="text-[10pt] font-bold">No: {data.docNo}</p>
            </div>
            <div className="flex-grow leading-relaxed text-justify">
              <p className="mb-4">Yang bertanda tangan di bawah ini:</p>
              <div className="ml-4 mb-6 break-inside-avoid">
                  <table className="w-full">
                     <tbody>
                       <tr><td className="w-32 py-1">Nama</td><td>:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                       <tr><td className="py-1">Jabatan</td><td>:</td><td>{data.p1Job}</td></tr>
                       <tr><td className="py-1">Perusahaan</td><td>:</td><td className="font-bold uppercase">{data.p1Company}</td></tr>
                       <tr><td className="py-1">NPWP Badan</td><td>:</td><td className="font-mono font-bold">{data.p1Npwp}</td></tr>
                     </tbody>
                  </table>
              </div>
              <p className="mb-4 text-center italic">--- Memberikan Kuasa Kepada ---</p>
              <div className="ml-4 mb-6 break-inside-avoid">
                  <table className="w-full">
                     <tbody>
                       <tr><td className="w-32 py-1">Nama</td><td>:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                       <tr><td className="py-1">Identitas</td><td>:</td><td className="font-mono">{data.p2Nik}</td></tr>
                       <tr><td className="py-1">Pekerjaan</td><td>:</td><td>{data.p2Job}</td></tr>
                     </tbody>
                  </table>
              </div>
              <div className="border p-4 mb-6 text-sm break-inside-avoid">
                 <strong>UNTUK:</strong><br/>
                 Pengurusan, perhitungan, dan pelaporan <u>{data.taxType}</u> masa <u>{data.taxYear}</u> di <u>{data.kppName}</u>.
              </div>
            </div>
          </>
        )}

        <div className="shrink-0 mt-8" style={{ pageBreakInside: 'avoid' }}>
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td colSpan={2} className="text-right font-bold text-[10.5pt] pb-10">
                  {data.city}, {formatDateSafe(data.date)}
                </td>
              </tr>
              <tr className="text-[8pt] font-black text-slate-400 uppercase tracking-widest text-center font-sans">
                <td className="pb-4">Penerima Kuasa,</td>
                <td className="pb-4">Pemberi Kuasa,</td>
              </tr>
              <tr>
                <td className="text-center align-bottom">
                  <div className="h-32 flex flex-col justify-end items-center">
                     <p className="font-bold underline uppercase">({data.p2Name})</p>
                  </div>
                </td>
                <td className="text-center align-bottom">
                  <div className="h-32 flex flex-col justify-end items-center">
                     <div className="border border-slate-300 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4 uppercase font-sans">Materai</div>
                     <p className="font-bold underline uppercase text-[11pt]">{data.p1Name}</p>
                     {templateId === 2 && <p className="text-[9pt] font-sans">{data.p1Job}</p>}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white; margin: 0; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <FileText size={16} className="text-blue-500" /> <span>Tax Proxy Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold`}>Format Standar</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold`}>Format Korporat</button>
                </div>
              )}
            </div>
            <button onClick={() => { window.print(); setShowDonation(true); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Fingerprint size={12}/> Pemberi Kuasa</h3>
                 <div className="flex items-center gap-4">
                    {templateId === 2 && (
                        <div className="w-16 h-16 rounded border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-all overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                            {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <PenTool size={16} className="text-slate-300" />}
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Direktur/WP" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Npwp} onChange={e => handleDataChange('p1Npwp', e.target.value)} placeholder="NPWP Wajib Pajak" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Penerima</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Penerima" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} placeholder="Identitas NIK/NPWP" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Penerima" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Lingkup Kuasa</h3>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-bold" value={data.taxType} onChange={e => handleDataChange('taxType', e.target.value)} placeholder="Jenis Pajak" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.taxYear} onChange={e => handleDataChange('taxYear', e.target.value)} placeholder="Masa/Tahun Pajak" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" value={data.kppName} onChange={e => handleDataChange('kppName', e.target.value)} placeholder="KPP" />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <ProxyContent />
            </div>
            <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
        </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><ProxyContent /></div></div>
    </div>
  );
}