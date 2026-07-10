'use client';

/**
 * FILE: IncomeStatementPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Keterangan Penghasilan
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, 
  ChevronDown, Check, LayoutTemplate, 
  User, Wallet, MapPin, FileText, BadgeDollarSign, Edit3, Eye, RotateCcw, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface IncomeData {
  city: string;
  date: string;
  name: string;
  nik: string;
  address: string;
  businessType: string;
  monthlyIncome: number;
  monthlyIncomeText: string;
  purpose: string;
  signerName: string; 
  signerJob: string; 
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: IncomeData = {
  city: 'JAKARTA',
  date: '', 
  name: 'AHMAD FAUZI',
  nik: '3171010101800001',
  address: 'Jl. Melati No. 12, Tebet, Jakarta Selatan',
  businessType: 'Freelance Graphic Designer',
  monthlyIncome: 7500000,
  monthlyIncomeText: 'Tujuh Juta Lima Ratus Ribu Rupiah',
  purpose: 'Persyaratan Pengajuan KPR',
  signerName: 'AHMAD FAUZI',
  signerJob: 'Pemilik Usaha'
};

// --- 3. KOMPONEN UTAMA ---
export default function IncomeStatementPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <IncomeToolBuilder />
    </Suspense>
  );
}

function IncomeToolBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IncomeData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof IncomeData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };
  
  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Pernyataan Diri' : 'Pihak Ketiga';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-relaxed text-[11pt] p-[25mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto">
          {templateId === 1 && (
              <>
                  <div className="text-center mb-10 shrink-0">
                     <h1 className="font-black text-xl uppercase underline underline-offset-8 decoration-2 tracking-widest leading-relaxed">SURAT PERNYATAAN PENGHASILAN</h1>
                  </div>
                  <div className="flex-grow">
                      <p className="mb-6">Saya yang bertanda tangan di bawah ini:</p>
                      <div className="ml-8 mb-8 space-y-2 break-inside-avoid">
                         <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
                         <div className="grid grid-cols-[150px_10px_1fr]"><span>NIK</span><span>:</span><span className="font-mono">{data.nik}</span></div>
                         <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                         <div className="grid grid-cols-[150px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.businessType}</span></div>
                      </div>
                      <p className="mb-4 break-inside-avoid">Dengan ini menyatakan sesungguhnya bahwa saya memiliki penghasilan rata-rata per bulan sebesar:</p>
                      <div className="bg-slate-50 border-2 border-slate-200 p-4 text-center mb-6 print:bg-transparent print:border-black break-inside-avoid">
                         <div className="text-xl font-black">{formatRupiah(data.monthlyIncome)}</div>
                         <div className="text-sm italic">({data.monthlyIncomeText})</div>
                      </div>
                      <p className="mb-4 text-justify break-inside-avoid">
                         Demikian surat pernyataan ini saya buat dengan sebenar-benarnya untuk keperluan <strong>{data.purpose}</strong>.
                      </p>
                  </div>
                  <div className="flex justify-end text-center mt-12 shrink-0 break-inside-avoid">
                     <div className="w-64">
                        <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                        <p className="mb-4 font-bold">Hormat saya,</p>
                        <div className="h-24 flex items-center justify-center border border-dashed border-slate-200 text-[10px] text-slate-400 mb-2 print:border-black uppercase font-sans">Materai 10.000</div>
                        <p className="font-bold underline uppercase">{data.name}</p>
                     </div>
                  </div>
              </>
          )}
          {templateId === 2 && (
              <div className="font-sans text-[10.5pt] leading-relaxed flex flex-col h-full">
                  <div className="border-b-4 border-slate-800 pb-4 mb-8 shrink-0">
                     <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">SURAT KETERANGAN PENGHASILAN</h1>
                     <p className="text-slate-500 font-bold text-xs">Pihak Ketiga / Perusahaan / Instansi</p>
                  </div>
                  <div className="flex-grow">
                      <p className="mb-6">Diterangkan bahwa orang yang tercantum di bawah ini:</p>
                      <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-transparent print:border-black break-inside-avoid">
                         <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nama Lengkap</span><span className="text-lg font-black text-slate-900 uppercase">{data.name}</span></div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">NIK</span><span className="font-bold text-slate-700 font-mono">{data.nik}</span></div>
                            <div className="flex flex-col"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pekerjaan</span><span className="font-bold text-slate-700">{data.businessType}</span></div>
                         </div>
                      </div>
                      <p className="mb-4 break-inside-avoid">Memiliki pendapatan finansial bulanan rata-rata sebesar <strong>{formatRupiah(data.monthlyIncome)}</strong>.</p>
                      <div className="border-l-4 border-emerald-500 pl-4 py-2 mb-8 italic text-slate-600 bg-emerald-50/30 print:bg-transparent print:text-black break-inside-avoid">"{data.monthlyIncomeText}"</div>
                      <p className="mb-8 leading-relaxed break-inside-avoid">Keperluan: <strong>{data.purpose}</strong>.</p>
                  </div>
                  <div className="mt-auto flex justify-between items-end border-t pt-10 shrink-0 break-inside-avoid">
                     <div className="text-[9px] text-slate-400 italic max-w-[250px]">Pernyataan ini merupakan data keuangan pihak terkait sesuai permintaan.</div>
                     <div className="text-center w-64">
                        <p className="text-sm text-slate-500 mb-16">{data.city}, {formatDateSafe(data.date)}</p>
                        <p className="font-black text-slate-900 uppercase text-sm leading-none mb-1 border-b border-black pb-1">{data.signerName}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{data.signerJob}</p>
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
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
      
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Wallet size={16} className="text-emerald-500" /> <span>Income Statement Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Pernyataan Diri {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-xs font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Pihak Ketiga {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Data</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Identitas</h3>
                <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                  <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.businessType} onChange={e => handleDataChange('businessType', e.target.value)} placeholder="Pekerjaan" />
                </div>
                <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat Lengkap" />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Wallet size={12}/> Finansial</h3>
                <input className="w-full p-2 border rounded-lg text-sm font-black text-emerald-700 focus:ring-2 focus:ring-emerald-500 outline-none" type="number" value={data.monthlyIncome} onChange={e => handleDataChange('monthlyIncome', parseInt(e.target.value) || 0)} />
                <textarea className="w-full p-2 border rounded-lg text-xs h-12 italic focus:ring-2 focus:ring-emerald-500 outline-none" value={data.monthlyIncomeText} onChange={e => handleDataChange('monthlyIncomeText', e.target.value)} placeholder="Terbilang..." />
              </div>
              <div className="border-t pt-4 space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Otorisasi</h3>
                <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Keperluan Surat" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                  <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
                {templateId === 2 && (
                    <div className="space-y-2">
                        <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penandatangan" />
                        <input className="w-full p-2 border rounded-lg text-xs" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan (HRD/Pimpinan)" />
                    </div>
                )}
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}