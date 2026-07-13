'use client';

/**
 * FILE: PerintahBayarPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Perintah Bayar (SPB) / Payment Order
 * FIX: Corporate Finance / ERP Theme Redesign
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Banknote, Building2, 
  ChevronDown, Edit3, RotateCcw, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface PaymentData {
  city: string;
  date: string;
  docNo: string;
  companyName: string;
  companyAddress: string;
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  amount: number;
  amountText: string;
  purpose: string;
  approverName: string;
  approverJob: string;
  treasurerName: string;
  treasurerJob: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PaymentData = {
  city: 'JAKARTA',
  date: '',
  docNo: 'SPB/FIN/001/I/2026',
  companyName: 'PT. DINAMIKA CIPTA MANDIRI',
  companyAddress: 'Gedung Office 8, Lantai 12, Senopati, Jakarta Selatan',
  recipientName: 'RIZKY RAMADHAN',
  recipientBank: 'Bank Central Asia (BCA)',
  recipientAccount: '123-456-7890',
  amount: 15500000,
  amountText: 'Lima Belas Juta Lima Ratus Ribu Rupiah',
  purpose: 'Pembayaran tagihan invoice vendor IT support periode bulan Desember 2025.',
  approverName: 'HENDRA KUSUMA',
  approverJob: 'Direktur Operasional',
  treasurerName: 'SITI AMINAH',
  treasurerJob: 'Bendahara Keuangan'
};

export default function PerintahBayarPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 text-xs bg-slate-900 uppercase tracking-widest font-bold">Initializing ERP Module...</div>}>
      <PaymentOrderBuilder />
    </Suspense>
  );
}

function PaymentOrderBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PaymentData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: keyof PaymentData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
    }
  };

  // --- KOMPONEN ISI SURAT (CORPORATE FINANCE THEME) ---
  const DocumentContent = () => (
    <div className="bg-white flex flex-col box-border text-black leading-normal p-[15mm] md:p-[20mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0 mx-auto font-sans text-[10pt]">
      
      {/* HEADER / KOP */}
      <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-8 shrink-0">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 bg-slate-900 text-white flex items-center justify-center print:border-2 print:border-black print:text-black print:bg-white rounded-sm shrink-0">
            <Building2 size={32} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">{data.companyName}</h1>
            <p className="text-[9pt] text-slate-600 print:text-black max-w-[250px] leading-snug mt-1">{data.companyAddress}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900">Payment Voucher</h2>
          <p className="text-[9pt] tracking-[0.2em] text-slate-500 print:text-black mt-1 font-bold">SURAT PERINTAH BAYAR</p>
          
          <table className="mt-4 ml-auto text-left text-[9pt] border-collapse">
            <tbody>
              <tr>
                <td className="py-1 pr-4 font-bold text-slate-500 print:text-black uppercase text-[8pt]">Doc No.</td>
                <td className="py-1 font-mono font-bold">{data.docNo}</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 font-bold text-slate-500 print:text-black uppercase text-[8pt]">Date</td>
                <td className="py-1">{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year: 'numeric'}) : ''}</td>
              </tr>
              <tr>
                <td className="py-1 pr-4 font-bold text-slate-500 print:text-black uppercase text-[8pt]">Location</td>
                <td className="py-1">{data.city}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BODY / TABULAR DATA */}
      <div className="flex-grow space-y-6">
        <table className="w-full border-collapse border-2 border-black text-[10pt] break-inside-avoid">
          <tbody>
            {/* Pay To */}
            <tr className="border-b border-black">
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt]">Pay To<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Kepada</span></td>
              <td className="p-4 font-black text-[12pt] uppercase">{data.recipientName}</td>
            </tr>
            
            {/* Bank Info */}
            <tr className="border-b border-black">
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt]">Bank Details<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Info Rekening</span></td>
              <td className="p-4">
                <div className="grid grid-cols-[120px_10px_1fr] gap-y-2">
                  <span className="text-slate-500 print:text-black uppercase text-[8pt] font-bold self-center">Bank Name</span>
                  <span className="self-center">:</span>
                  <span className="font-bold">{data.recipientBank}</span>
                  
                  <span className="text-slate-500 print:text-black uppercase text-[8pt] font-bold self-center">Account No.</span>
                  <span className="self-center">:</span>
                  <span className="font-mono font-black text-[11pt] tracking-wider">{data.recipientAccount}</span>
                </div>
              </td>
            </tr>

            {/* Amount */}
            <tr className="border-b border-black">
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt]">Amount<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Nominal</span></td>
              <td className="p-4">
                <div className="text-2xl font-black mb-3">{formatRupiah(data.amount)}</div>
                <div className="bg-slate-50 print:bg-white p-3 border border-dashed border-slate-300 print:border-black">
                  <span className="text-slate-500 print:text-black uppercase text-[8pt] font-bold mr-2">In Words:</span>
                  <span className="font-bold italic capitalize leading-relaxed text-[10.5pt]"># {data.amountText} #</span>
                </div>
              </td>
            </tr>

            {/* Purpose */}
            <tr>
              <td className="border-r border-black p-4 font-black w-1/4 bg-slate-100 print:bg-white uppercase tracking-wider text-[9pt] align-top">Description<br/><span className="font-normal text-[8pt] text-slate-500 print:text-black">Keperluan</span></td>
              <td className="p-4 min-h-[100px] align-top leading-relaxed text-[10.5pt]">
                {data.purpose}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FOOTER / TTD / APPROVAL MATRIX */}
      <div className="mt-12 break-inside-avoid">
         <table className="w-full border-collapse border-2 border-black text-center table-fixed">
            <thead>
               <tr className="bg-slate-100 print:bg-white border-b border-black uppercase text-[8pt] font-black tracking-widest text-slate-600 print:text-black">
                  <td className="border-r border-black p-3">Prepared By</td>
                  <td className="border-r border-black p-3">Reviewed By</td>
                  <td className="p-3">Approved By</td>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td className="border-r border-black h-32 align-bottom p-4">
                     <div className="font-black underline uppercase tracking-tight text-[10pt] truncate">{data.treasurerName}</div>
                     <div className="text-[8pt] font-bold text-slate-500 print:text-black uppercase mt-1 truncate">{data.treasurerJob}</div>
                  </td>
                  <td className="border-r border-black h-32 align-bottom p-4">
                     <div className="font-black underline uppercase tracking-tight text-[10pt]">___________________</div>
                     <div className="text-[8pt] font-bold text-slate-500 print:text-black uppercase mt-1">Finance Manager</div>
                  </td>
                  <td className="h-32 align-bottom p-4">
                     <div className="font-black underline uppercase tracking-tight text-[10pt] truncate">{data.approverName}</div>
                     <div className="text-[8pt] font-bold text-slate-500 print:text-black uppercase mt-1 truncate">{data.approverJob}</div>
                  </td>
               </tr>
            </tbody>
         </table>
         <div className="mt-4 flex justify-between text-[7pt] text-slate-400 print:text-black uppercase font-mono font-bold tracking-widest">
           <span>Form ID: FIN-SPB-001/REV.2</span>
           <span>Generated on: {isClient ? new Date().toLocaleString('en-GB') : ''}</span>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
        /* Custom Scrollbar for ERP look */
        .erp-scrollbar::-webkit-scrollbar { width: 6px; }
        .erp-scrollbar::-webkit-scrollbar-track { background: #0f172a; }
        .erp-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .erp-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-950 border-b border-slate-800 text-white shadow-md sticky top-0 z-50 h-14 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
            <ArrowLeftCircle size={16} /> Back to Hub
          </Link>
          <div className="h-4 w-px bg-slate-700 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
            <CheckCircle2 size={14} /> <span>Financial Operations Module</span>
          </div>
        </div>
        <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-1.5 rounded text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center gap-2 border border-indigo-400/30">
          <Printer size={14}/> Print Voucher
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-56px)] print:block print:h-auto print:overflow-visible">
        {/* SIDEBAR INPUT (ERP THEME) */}
        <div className={`no-print w-full md:w-[420px] bg-slate-900 border-r border-slate-800 flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                <h2 className="font-bold text-[10px] uppercase text-slate-300 tracking-widest flex items-center gap-2">
                  <Edit3 size={14} className="text-indigo-400" /> Voucher Entry
                </h2>
                <button onClick={handleReset} className="text-slate-500 hover:text-rose-400 transition-colors p-1" title="Reset Form">
                  <RotateCcw size={14}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6 erp-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
                
                {/* SECTION 1 */}
                <div className="space-y-4">
                  <h3 className="text-[9px] font-bold uppercase text-slate-500 border-b border-slate-700 pb-2 tracking-[0.2em] flex items-center gap-2">
                    <Building2 size={12}/> Corporate Entity
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Company Name</label>
                      <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs font-bold text-slate-200 uppercase focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Address</label>
                      <textarea className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-slate-300 h-16 resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={data.companyAddress} onChange={e => handleDataChange('companyAddress', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Document No.</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-indigo-300 focus:border-indigo-500 outline-none transition-all uppercase" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Location</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-slate-300 focus:border-indigo-500 outline-none transition-all uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-[9px] font-bold uppercase text-slate-500 border-b border-slate-700 pb-2 tracking-[0.2em] flex items-center gap-2">
                    <Banknote size={12}/> Beneficiary Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Payee Name</label>
                      <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs font-bold text-slate-200 uppercase focus:border-indigo-500 outline-none transition-all" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-[1fr_2fr] gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Bank</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-slate-300 focus:border-indigo-500 outline-none transition-all" value={data.recipientBank} onChange={e => handleDataChange('recipientBank', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Account No.</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs font-mono text-slate-300 focus:border-indigo-500 outline-none transition-all" value={data.recipientAccount} onChange={e => handleDataChange('recipientAccount', e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Amount (IDR)</label>
                      <input className="w-full p-3 bg-slate-950 border border-slate-700 rounded text-sm font-black text-emerald-400 focus:border-indigo-500 outline-none transition-all" type="number" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} />
                    </div>
                    
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Amount in Words</label>
                      <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-[10px] text-slate-400 italic focus:border-indigo-500 outline-none transition-all" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} placeholder="Terbilang..." />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Description / Purpose</label>
                      <textarea className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-xs text-slate-300 h-24 focus:border-indigo-500 outline-none transition-all leading-relaxed" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-[9px] font-bold uppercase text-slate-500 border-b border-slate-700 pb-2 tracking-[0.2em] flex items-center gap-2">
                    <ChevronDown size={12}/> Approval Matrix
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Prepared By</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-[10px] font-bold text-slate-200 uppercase focus:border-indigo-500 outline-none transition-all" value={data.treasurerName} onChange={e => handleDataChange('treasurerName', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Job Title</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-[10px] text-slate-400 focus:border-indigo-500 outline-none transition-all" value={data.treasurerJob} onChange={e => handleDataChange('treasurerJob', e.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Approved By</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-[10px] font-bold text-slate-200 uppercase focus:border-indigo-500 outline-none transition-all" value={data.approverName} onChange={e => handleDataChange('approverName', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Job Title</label>
                        <input className="w-full p-2 bg-slate-950 border border-slate-700 rounded text-[10px] text-slate-400 focus:border-indigo-500 outline-none transition-all" value={data.approverJob} onChange={e => handleDataChange('approverJob', e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-800 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static erp-scrollbar`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.85] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block print:shadow-none">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-12 bg-slate-950 border border-slate-800 rounded-lg flex p-1 shadow-2xl z-50 font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-md text-[10px] uppercase tracking-widest transition-all ${mobileView === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Data Entry</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-md text-[10px] uppercase tracking-widest transition-all ${mobileView === 'preview' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>Doc Preview</button>
      </div>

      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Payment Voucher" price={10000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static">
        <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
